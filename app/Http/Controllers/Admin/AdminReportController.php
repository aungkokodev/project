<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use App\Models\Review;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminReportController extends Controller
{
    public function sales(Request $request)
    {
        $start = Carbon::parse($request->input('start_date'))->startOfDay();

        $end = Carbon::parse($request->input('end_date'))->endOfDay();

        $days = $start->diffInDays($end) + 1;
        $prevEnd = $start->copy()->subDay()->endOfDay();
        $prevStart = $prevEnd->copy()->subDays($days - 1)->startOfDay();

        $statusCounts = Order::whereBetween('orders.created_at', [$start, $end])
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        $paymentMethods = Order::whereBetween('orders.created_at', [$start, $end])
            ->selectRaw('payment_method, COUNT(*) as count')
            ->groupBy('payment_method')
            ->pluck('count', 'payment_method');

        $ratingCounts = Review::whereBetween('reviews.created_at', [$start, $end])
            ->selectRaw('rating, COUNT(*) as count')
            ->groupBy('rating')
            ->pluck('count', 'rating');

        $deliveredOrders = Order::whereBetween('orders.created_at', [$start, $end])
            ->where('status', 'delivered');

        $totalSalesAmount = $deliveredOrders->sum('total_amount');

        $totalOrderCount = $deliveredOrders->count();

        $totalProductQuantity = $deliveredOrders
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->where('status', 'delivered')
            ->sum('order_items.quantity');

        $totalCount = Order::whereBetween('orders.created_at', [$start, $end])->count();
        $cancelledCount = $statusCounts['cancelled'] ?? 0;
        $cancelRate = $totalCount > 0
            ? round(($cancelledCount / $totalCount) * 100, 2)
            : 0;

        $averageOrderValue = $totalOrderCount > 0
            ? $totalSalesAmount / $totalOrderCount
            : 0;

        $topCategories = Category::select('categories.*')
            ->withCount(['products as product_count'])
            ->withCount(['orderItems as sales_count' => function ($query) use ($start, $end) {
                $query->whereHas('order', function ($q) use ($start, $end) {
                    $q->where('status', 'delivered')
                        ->whereBetween('created_at', [$start, $end]);
                });
            }])
            ->withSum(['orderItems as sales_amount' => function ($query) use ($start, $end) {
                $query->select(DB::raw('SUM(order_items.price * order_items.quantity)'))
                    ->whereHas('order', function ($q) use ($start, $end) {
                        $q->where('status', 'delivered')
                            ->whereBetween('created_at', [$start, $end]);
                    });
            }], 'order_items.price')
            ->orderByDesc('sales_amount')
            ->get();

        $topProducts = Product::withSum(['orderItems as sales_count' => function ($query) use ($start, $end) {
            $query->whereHas('order', function ($q) use ($start, $end) {
                $q->where('status', 'delivered')
                    ->whereBetween('created_at', [$start, $end]);
            });
        }], 'quantity')
            ->withSum(['orderItems as sales_amount' => function ($query) use ($start, $end) {
                $query->whereHas('order', function ($q) use ($start, $end) {
                    $q->where('status', 'delivered')
                        ->whereBetween('created_at', [$start, $end]);
                });
            }], DB::raw('price * quantity'))
            ->withAvg(['reviews as reviews_avg_rating' => function ($q) {
                $q->where('is_approved', true);
            }], 'rating')
            ->withCount(['reviews as reviews_count' => function ($q) {
                $q->where('is_approved', true);
            }])
            ->with(['image'])
            ->orderByDesc('sales_amount')
            ->get();

        $topCustomers = User::where('role', 'customer')
            ->withCount(['orders as total_orders' => function ($query) use ($start, $end) {
                $query
                    ->whereBetween('created_at', [$start, $end]);
            }])
            ->withCount(['orders as cancelled_orders' => function ($query) use ($start, $end) {
                $query->where('status', 'cancelled')
                    ->whereBetween('created_at', [$start, $end]);
            }])
            ->withSum(['orders as total_spent' => function ($query) use ($start, $end) {
                $query->where('status', 'delivered')
                    ->whereBetween('created_at', [$start, $end]);
            }], 'total_amount')
            ->with(['orders' => function ($query) use ($start, $end) {
                $query->where('status', 'delivered')
                    ->whereBetween('created_at', [$start, $end]);
            }])
            ->withAvg(['reviews as avg_rating' => function ($query) {
                $query->where('is_approved', true);
            }], 'rating')
            ->orderByDesc('total_spent')
            ->get();

        return Inertia::render('Admin/Report/Sales', [
            'filters' => [
                'start_date' => $start->toDateString(),
                'end_date' => $end->toDateString(),
            ],
            'metrics' => [
                'total_sales' => $totalSalesAmount,
                'total_orders' => $totalOrderCount,
                'total_quantity' => $totalProductQuantity,
                'average_order_value' => $averageOrderValue,
                'cancel_rate' => $cancelRate,
                'status_counts' => $statusCounts,
                'payment_methods' => $paymentMethods,
                'rating_counts' => $ratingCounts,
            ],
            'sales' => $this->getDailySalesData($start, $end),
            'top_categories' => $topCategories,
            'top_products' => $topProducts,
            'top_customers' => $topCustomers,
            'category_trends' => $this->getCategoryTrends($start, $end),
            'product_trends' => $this->getProductTrends($start, $end),

        ]);
    }

    protected function getDailySalesData(Carbon $start, Carbon $end)
    {
        if ($start->diffInDays($end) > 180) {
            return $this->getMonthlySalesData($start, $end);
        }

        $data = Order::selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
            ->whereBetween('created_at', [$start, $end])
            ->where('status', 'delivered')
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('total', 'date');

        $period = CarbonPeriod::create($start, $end);
        $result = [];

        foreach ($period as $date) {
            $day = $date->toDateString();
            $result[] = [
                'date' => $date->format('M d'),
                'total' => $data[$day] ?? 0,
            ];
        }

        return $result;
    }

    protected function getMonthlySalesData($start, $end)
    {
        $data = Order::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, SUM(total_amount) as total')
            ->whereBetween('created_at', [$start, $end])
            ->where('status', 'delivered')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->mapWithKeys(fn($item) => [
                Carbon::create($item->year, $item->month)->format('Y-m') => $item->total
            ]);

        $period = CarbonPeriod::create($start, '1 month', $end);
        $result = [];

        foreach ($period as $date) {
            $key = $date->format('Y-m');
            $result[] = [
                'date' => $date->format('M Y'),
                'total' => $data[$key] ?? 0,
            ];
        }

        return $result;
    }

    protected function getCategoryTrends(Carbon $start, Carbon $end)
    {
        $isMonthly = $start->diffInDays($end) > 180;

        $query = Category::with(['orderItems' => function ($query) use ($start, $end) {
            $query->whereHas('order', function ($q) use ($start, $end) {
                $q->where('status', 'delivered')
                    ->whereBetween('created_at', [$start, $end]);
            });
        }])
            ->withCount(['orderItems as sales_count' => function ($query) use ($start, $end) {
                $query->whereHas('order', function ($q) use ($start, $end) {
                    $q->where('status', 'delivered')
                        ->whereBetween('created_at', [$start, $end]);
                });
            }])
            ->orderByDesc('sales_count')
            ->limit(5)
            ->get();

        $trends = [];
        $period = $isMonthly
            ? CarbonPeriod::create($start, '1 month', $end)
            : CarbonPeriod::create($start, $end);

        foreach ($query as $category) {
            $categoryTrend = [
                'name' => $category->name,
                'data' => []
            ];

            foreach ($period as $date) {
                $key = $isMonthly ? $date->format('Y-m') : $date->toDateString();
                $label = $isMonthly ? $date->format('M Y') : $date->format('M d');

                $count = $category->orderItems()
                    ->whereHas('order', function ($q) use ($date, $isMonthly) {
                        if ($isMonthly) {
                            $q->whereMonth('created_at', $date->month)
                                ->whereYear('created_at', $date->year);
                        } else {
                            $q->whereDate('created_at', $date);
                        }
                    })
                    ->count();

                $categoryTrend['data'][] = [
                    'date' => $label,
                    'count' => $count
                ];
            }

            $trends[] = $categoryTrend;
        }

        return $trends;
    }

    protected function getProductTrends(Carbon $start, Carbon $end)
    {
        $isMonthly = $start->diffInDays($end) > 180;

        $query = Product::with(['orderItems' => function ($query) use ($start, $end) {
            $query->whereHas('order', function ($q) use ($start, $end) {
                $q->where('status', 'delivered')
                    ->whereBetween('created_at', [$start, $end]);
            });
        }])
            ->withCount(['orderItems as sales_count' => function ($query) use ($start, $end) {
                $query->whereHas('order', function ($q) use ($start, $end) {
                    $q->where('status', 'delivered')
                        ->whereBetween('created_at', [$start, $end]);
                });
            }])
            ->orderByDesc('sales_count')
            ->limit(5)
            ->get();

        $trends = [];
        $period = $isMonthly
            ? CarbonPeriod::create($start, '1 month', $end)
            : CarbonPeriod::create($start, $end);

        foreach ($query as $product) {
            $productTrend = [
                'name' => $product->name,
                'data' => []
            ];

            foreach ($period as $date) {
                $key = $isMonthly ? $date->format('Y-m') : $date->toDateString();
                $label = $isMonthly ? $date->format('M Y') : $date->format('M d');

                $count = $product->orderItems()
                    ->whereHas('order', function ($q) use ($date, $isMonthly) {
                        if ($isMonthly) {
                            $q->whereMonth('created_at', $date->month)
                                ->whereYear('created_at', $date->year);
                        } else {
                            $q->whereDate('created_at', $date);
                        }
                    })
                    ->count();

                $productTrend['data'][] = [
                    'date' => $label,
                    'count' => $count
                ];
            }

            $trends[] = $productTrend;
        }

        return $trends;
    }

    public function products()
    {
        return Inertia::render("Admin/Report/Products");
    }
}
