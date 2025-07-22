<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard/Index', [
            'sales' => $this->getMetricData('sales'),
            'orders' => $this->getMetricData('orders'),
            'customers' => $this->getMetricData('customers'),
            'products' => $this->getMetricData('products'),
            'categorySales' => $this->getCategorySalesData(),
            'inventory' => $this->getInventoryData(),
            'recentOrders' => $this->getRecentOrders(),
            'topProducts' => $this->getTopProducts()
        ]);
    }

    protected function getRecentOrders()
    {
        return Order::with(['user'])->latest()->take(5)->get();
    }

    protected function getTopProducts()
    {
        return Product::query()
            ->select([
                'products.*',
                DB::raw('SUM(order_items.quantity) as sales_count'),
                DB::raw('SUM(order_items.quantity * order_items.price) as sales_total')
            ])
            ->join('order_items', 'order_items.product_id', '=', 'products.id')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.status', 'delivered')
            ->groupBy('products.id')
            ->orderByDesc('sales_total')
            ->take(5)
            ->get();
    }

    protected function getMetricData(string $metricType)
    {
        return [
            'today' => $this->calculateMetric($metricType, 'day', 1),
            'last_7_days' => $this->calculateMetric($metricType, 'day', 7),
            'last_30_days' => $this->calculateMetric($metricType, 'day', 30),
            'this_month' => $this->calculateMetric($metricType, 'month', 1),
            'this_year' => $this->calculateMetric($metricType, 'year', 1),
        ];
    }

    protected function calculateMetric(string $metricType, string $timeUnit, int $timeRange)
    {
        $currentPeriod = $this->getDateRange($timeUnit, $timeRange, $timeRange);
        $previousPeriod = $this->getDateRange($timeUnit, $timeRange * 2, $timeRange);

        $currentValue = $this->getMetricValue($metricType, $currentPeriod['start'], $currentPeriod['end']);
        $previousValue = $this->getMetricValue($metricType, $previousPeriod['start'], $previousPeriod['end']);

        return [
            'total' => $currentValue,
            'previous_total' => $previousValue,
            'change' => $this->calculatePercentageChange($currentValue, $previousValue),
            'daily' => $this->getDailyData($metricType, $currentPeriod['start'], $currentPeriod['end']),
        ];
    }

    protected function getDateRange(string $timeUnit, int $timeRange, int $subtractFrom = 0)
    {
        return match ($timeUnit) {
            'day' => [
                'start' => Carbon::today()
                    ->startOfDay()
                    ->subDays($timeRange - 1),
                'end' => Carbon::today()
                    ->endOfDay()
                    ->subDays($timeRange - $subtractFrom)
            ],
            'month' => [
                'start' => Carbon::today()
                    ->startOfDay()
                    ->subMonths($timeRange - 1)
                    ->startOfMonth(),
                'end' => Carbon::today()
                    ->endOfDay()
                    ->subMonths($timeRange - $subtractFrom)
                    ->endOfMonth()
            ],
            'year' => [
                'start' => Carbon::today()
                    ->startOfDay()
                    ->subYears($timeRange - 1)
                    ->startOfYear(),
                'end' => Carbon::today()
                    ->startOfDay()
                    ->subYears($timeRange - $subtractFrom)
                    ->endOfYear()
                    ->subYear($timeRange - 1)
            ],
            default => [
                'start' => Carbon::today()
                    ->startOfDay()
                    ->subDays($timeRange - 1),
                'end' => Carbon::today()
                    ->endOfDay()
                    ->subDays($timeRange - $subtractFrom)
            ]
        };
    }

    protected function getMetricValue(string $metricType, Carbon $start, Carbon $end)
    {
        return match ($metricType) {
            'sales' => Order::whereBetween('created_at', [$start, $end])
                ->where('status', 'delivered')
                ->sum('total_amount'),

            'orders' => Order::whereBetween('created_at', [$start, $end])
                ->where('status', 'delivered')
                ->count(),

            'customers' => User::whereBetween('created_at', [$start, $end])
                ->where('role', 'customer')
                ->count(),

            'products' => Order::join('order_items', 'orders.id', '=', 'order_items.order_id')
                ->whereBetween('orders.created_at', [$start, $end])
                ->where('status', 'delivered')
                ->sum('order_items.quantity'),

            default => 0
        };
    }

    protected function getDailyData(string $metricType, Carbon $start, Carbon $end)
    {
        if ($start->diffInDays($end) > 180) {
            return $this->getMonthlyData($metricType, $start, $end);
        }

        $query = match ($metricType) {
            'sales' => Order::selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
                ->whereBetween('created_at', [$start, $end])
                ->where('status', 'delivered'),

            'orders' => Order::selectRaw('DATE(created_at) as date, COUNT(id) as total')
                ->whereBetween('created_at', [$start, $end])
                ->where('status', 'delivered'),

            'customers' => User::selectRaw('DATE(created_at) as date, COUNT(id) as total')
                ->whereBetween('created_at', [$start, $end])
                ->where('role', 'customer'),

            'products' => Order::join('order_items', 'orders.id', '=', 'order_items.order_id')
                ->selectRaw('DATE(orders.created_at) as date, SUM(order_items.quantity) as total')
                ->whereBetween('orders.created_at', [$start, $end])
                ->where('status', 'delivered'),

            default => null
        };

        if (!$query) {
            return [];
        }

        $data = $query->groupBy('date')
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

    protected function getMonthlyData(string $metricType, Carbon $start, Carbon $end)
    {
        $query = match ($metricType) {
            'sales' => Order::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, SUM(total_amount) as total')
                ->whereBetween('created_at', [$start, $end])
                ->where('status', 'delivered'),

            'orders' => Order::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(id) as total')
                ->whereBetween('created_at', [$start, $end])
                ->where('status', 'delivered'),

            'customers' => User::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(id) as total')
                ->whereBetween('created_at', [$start, $end])
                ->where('role', 'customer'),

            'products' => Order::join('order_items', 'orders.id', '=', 'order_items.order_id')
                ->selectRaw('YEAR(orders.created_at) as year, MONTH(orders.created_at) as month, SUM(order_items.quantity) as total')
                ->whereBetween('orders.created_at', [$start, $end])
                ->where('status', 'delivered'),

            default => null
        };

        $data = $query->groupBy('year', 'month')
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

    protected function getCategorySalesData()
    {
        $startDate = Carbon::now()->subMonths(11)->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();

        $mainCategories = Category::whereNull('parent_id')
            ->with(['children'])
            ->get();

        $monthlyData = [];
        $period = CarbonPeriod::create($startDate, '1 month', $endDate);

        foreach ($period as $date) {
            $monthKey = $date->format('Y-m');
            $monthLabel = $date->format('M Y');
            $monthStart = $date->copy()->startOfMonth();
            $monthEnd = $date->copy()->endOfMonth();

            foreach ($mainCategories as $category) {
                $monthlyData[$monthKey]['date'] = $monthLabel;

                $categorySales = OrderItem::whereHas('product', function ($query) use ($category) {
                    $query->where('category_id', $category->id);
                })
                    ->whereHas('order', function ($query) use ($monthStart, $monthEnd) {
                        $query->where('status', 'delivered')
                            ->whereBetween('created_at', [$monthStart, $monthEnd]);
                    })
                    ->sum(DB::raw('quantity * price'));

                $monthlyData[$monthKey]['categories'][$category->id]['name'] = $category->name;
                $monthlyData[$monthKey]['categories'][$category->id]['total'] = (int)$categorySales ?? 0;

                foreach ($category->children as $subcategory) {
                    $subcategorySales = OrderItem::whereHas('product', function ($query) use ($subcategory) {
                        $query->where('category_id', $subcategory->id);
                    })
                        ->whereHas('order', function ($query) use ($monthStart, $monthEnd) {
                            $query->where('status', 'delivered')
                                ->whereBetween('created_at', [$monthStart, $monthEnd]);
                        })
                        ->sum(DB::raw('quantity * price'));

                    $monthlyData[$monthKey]['categories'][$category->id]['total'] += $subcategorySales;
                }
            }
        }

        return array_values($monthlyData);
    }

    protected function getInventoryData()
    {
        $in_stock = Product::where('stock', '>', '5')->count();
        $low_stock = Product::where('stock', '<=', '5')->where('stock', '>', '0')->count();
        $out_of_stock = Product::where('stock', '<', '1')->count();

        return [
            ['value' => $in_stock, 'label' => 'In Stock'],
            ['value' => $low_stock, 'label' => 'Low Stock'],
            ['value' => $out_of_stock, 'label' => 'Out of Stock'],
        ];
    }

    protected function calculatePercentageChange($current, $previous)
    {
        if ($previous == 0) {
            return $current > 0 ? 100 : 0;
        }
        return round((($current - $previous) / $previous) * 100);
    }
}
