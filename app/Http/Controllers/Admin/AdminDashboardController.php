<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
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
        ]);
    }

    protected function getMetricData(string $metricType)
    {
        return [
            'today' => $this->calculateMetric($metricType, 'day', 1),
            'last_7_days' => $this->calculateMetric($metricType, 'day', 7),
            'last_30_days' => $this->calculateMetric($metricType, 'day', 30),
            'this_month' => $this->calculateMetric($metricType, 'month', 1),
            // 'last_month' => $this->calculateMetric($metricType, 'month', 2),
            'this_year' => $this->calculateMetric($metricType, 'year', 1),
            // 'last_year' => $this->calculateMetric($metricType, 'year', 2),
        ];
    }

    protected function calculateMetric(string $metricType, string $timeUnit, int $timeRange)
    {
        $currentPeriod = $this->getDateRange($timeUnit, $timeRange, $timeRange);
        $previousPeriod = $this->getDateRange($timeUnit, $timeRange * 2, $timeRange);

        $currentValue = $this->getMetricValue($metricType, $currentPeriod['start'], $currentPeriod['end']);
        $previousValue = $this->getMetricValue($metricType, $previousPeriod['start'], $previousPeriod['end']);
        // dd($currentPeriod, $previousPeriod);
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
                // ->subMonth($timeRange - 1),
                'end' => Carbon::today()
                    ->endOfDay()
                    ->subMonths($timeRange - $subtractFrom)
                    ->endOfMonth()
                // ->subMonth($timeRange - 1)
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

    protected function calculatePercentageChange($current, $previous)
    {
        if ($previous == 0) {
            return $current > 0 ? 100 : 0;
        }
        return round((($current - $previous) / $previous) * 100);
    }
}

// {
//     public function index()
//     {

//         return Inertia::render('Admin/Dashboard/Index', [
//             'sales' => [
//                 'today' => $this->getSalesData('day', 1),
//                 'last_7_days' => $this->getSalesData('day', 7),
//                 'last_30_days' => $this->getSalesData('day', 30),
//                 'this_month' => $this->getSalesData('month', 0),
//                 'last_month' => $this->getSalesData('month', 1),
//             ],
//             'orders' => [
//                 'today' => $this->getOrdersData('day', 1),
//                 'last_7_days' => $this->getOrdersData('day', 7),
//                 'last_30_days' => $this->getOrdersData('day', 30),
//                 'this_month' => $this->getOrdersData('month', 0),
//                 'last_month' => $this->getOrdersData('month', 1),
//             ],
//             'customers' => [
//                 'today' => $this->getCustomersData('day', 1),
//                 'last_7_days' => $this->getCustomersData('day', 7),
//                 'last_30_days' => $this->getCustomersData('day', 30),
//                 'this_month' => $this->getCustomersData('month', 0),
//                 'last_month' => $this->getCustomersData('month', 1),
//             ],
//             'products' => [
//                 'today' => $this->getProductData('day', 1),
//                 'last_7_days' => $this->getProductData('day', 7),
//                 'last_30_days' => $this->getProductData('day', 30),
//                 'this_month' => $this->getProductData('month', 0),
//                 'last_month' => $this->getProductData('month', 1),
//             ],
//         ]);
//     }

//     protected function getCustomersData(string $timeUnit, int $timeRange)
//     {
//         $currentStart = $timeUnit === 'day'
//             ? Carbon::now()->subDays($timeRange)
//             : Carbon::now()->subMonths($timeRange)->startOfMonth();

//         $currentEnd = $timeUnit === 'day'
//             ? Carbon::now()
//             : Carbon::now()->subMonths($timeRange)->endOfMonth();

//         $previousStart = $timeUnit === 'day'
//             ? Carbon::now()->subDays($timeRange * 2)
//             : $currentStart->copy()->subMonth();

//         $current = User::whereBetween('created_at', [$currentStart, $currentEnd])
//             ->where('role', 'customer')
//             ->count();

//         $previous = User::whereBetween('created_at', [$previousStart, $currentStart])
//             ->where('role', 'customer')
//             ->count();

//         $daily = $this->getDailyCustomersData($currentStart, $currentEnd);

//         return [
//             'total' => $current,
//             'previous_total' => $previous,
//             'change' => $this->calculatePercentageChange($current, $previous),
//             'daily' => $daily,
//         ];
//     }

//     protected function getDailyCustomersData(Carbon $start, Carbon $end)
//     {
//         $sales = User::selectRaw('DATE(created_at) as date, COUNT(id) as total')
//             ->whereBetween('created_at', [$start, $end])
//             ->where('role', 'customer')
//             ->groupBy('date')
//             ->pluck('total', 'date');

//         $period = CarbonPeriod::create($start, $end);
//         $salesByDay = [];

//         foreach ($period as $date) {
//             $day = $date->toDateString();
//             $salesByDay[] = [
//                 'date' => $date->format('M d'),
//                 'total' => $sales[$day] ?? 0,
//             ];
//         }

//         return $salesByDay;
//     }

//     protected function getOrdersData(string $timeUnit, int $timeRange)
//     {
//         $currentStart = $timeUnit === 'day'
//             ? Carbon::now()->subDays($timeRange)
//             : Carbon::now()->subMonths($timeRange)->startOfMonth();

//         $currentEnd = $timeUnit === 'day'
//             ? Carbon::now()
//             : Carbon::now()->subMonths($timeRange)->endOfMonth();

//         $previousStart = $timeUnit === 'day'
//             ? Carbon::now()->subDays($timeRange * 2)
//             : $currentStart->copy()->subMonth();

//         $current = Order::whereBetween('created_at', [$currentStart, $currentEnd])
//             ->where('status', 'delivered')
//             ->count();

//         $previous = Order::whereBetween('created_at', [$previousStart, $currentStart])
//             ->where('status', 'delivered')
//             ->count();

//         $daily = $this->getDailyOrdersData($currentStart, $currentEnd);

//         return [
//             'total' => $current,
//             'previous_total' => $previous,
//             'change' => $this->calculatePercentageChange($current, $previous),
//             'daily' => $daily,
//         ];
//     }

//     protected function getDailyOrdersData(Carbon $start, Carbon $end)
//     {
//         $sales = Order::selectRaw('DATE(created_at) as date, COUNT(id) as total')
//             ->whereBetween('created_at', [$start, $end])
//             ->where('status', 'delivered')
//             ->groupBy('date')
//             ->pluck('total', 'date');

//         $period = CarbonPeriod::create($start, $end);
//         $salesByDay = [];

//         foreach ($period as $date) {
//             $day = $date->toDateString();
//             $salesByDay[] = [
//                 'date' => $date->format('M d'),
//                 'total' => $sales[$day] ?? 0,
//             ];
//         }

//         return $salesByDay;
//     }

//     protected function getProductData(string $timeUnit, int $timeRange)
//     {
//         $currentStart = $timeUnit === 'day'
//             ? Carbon::now()->subDays($timeRange)
//             : Carbon::now()->subMonths($timeRange)->startOfMonth();

//         $currentEnd = $timeUnit === 'day'
//             ? Carbon::now()
//             : Carbon::now()->subMonths($timeRange)->endOfMonth();

//         $previousStart = $timeUnit === 'day'
//             ? Carbon::now()->subDays($timeRange * 2)
//             : $currentStart->copy()->subMonth();

//         $current = Order::join('order_items', 'orders.id', '=', 'order_items.order_id')
//             ->whereBetween('orders.created_at', [$currentStart, $currentEnd])
//             ->where('status', 'delivered')
//             ->sum('order_items.quantity');

//         $previous = Order::join('order_items', 'orders.id', '=', 'order_items.order_id')
//             ->whereBetween('orders.created_at', [$previousStart, $currentStart])
//             ->where('status', 'delivered')
//             ->sum('order_items.quantity');

//         $daily = $this->getDailyProductsData($currentStart, $currentEnd);

//         return [
//             'total' => $current,
//             'previous_total' => $previous,
//             'change' => $this->calculatePercentageChange($current, $previous),
//             'daily' => $daily,
//         ];
//     }

//     protected function getDailyProductsData(Carbon $start, Carbon $end)
//     {
//         $sales = Order::join('order_items', 'orders.id', '=', 'order_items.order_id')
//             ->selectRaw('DATE(orders.created_at) as date, SUM(order_items.quantity) as total')
//             ->whereBetween('orders.created_at', [$start, $end])
//             ->where('status', 'delivered')
//             ->groupBy('date')
//             ->pluck('total', 'date');

//         $period = CarbonPeriod::create($start, $end);
//         $salesByDay = [];

//         foreach ($period as $date) {
//             $day = $date->toDateString();
//             $salesByDay[] = [
//                 'date' => $date->format('M d'),
//                 'total' => $sales[$day] ?? 0,
//             ];
//         }

//         return $salesByDay;
//     }

//     protected function getSalesData(string $timeUnit, int $timeRange)
//     {
//         $currentStart = $timeUnit === 'day'
//             ? Carbon::now()->subDays($timeRange)
//             : Carbon::now()->subMonths($timeRange)->startOfMonth();

//         $currentEnd = $timeUnit === 'day'
//             ? Carbon::now()
//             : Carbon::now()->subMonths($timeRange)->endOfMonth();

//         $previousStart = $timeUnit === 'day'
//             ? Carbon::now()->subDays($timeRange * 2)
//             : $currentStart->copy()->subMonth();

//         $currentSales = Order::whereBetween('created_at', [$currentStart, $currentEnd])
//             ->where('status', 'delivered')
//             ->sum('total_amount');

//         $previousSales = Order::whereBetween('created_at', [$previousStart, $currentStart])
//             ->where('status', 'delivered')
//             ->sum('total_amount');

//         $dailySales = $this->getDailySalesData($currentStart, $currentEnd);

//         return [
//             'total' => $currentSales,
//             'previous_total' => $previousSales,
//             'change' => $this->calculatePercentageChange($currentSales, $previousSales),
//             'daily' => $dailySales,
//         ];
//     }

//     protected function getDailySalesData(Carbon $start, Carbon $end)
//     {
//         $sales = Order::selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
//             ->whereBetween('created_at', [$start, $end])
//             ->where('status', 'delivered')
//             ->groupBy('date')
//             ->pluck('total', 'date');

//         $period = CarbonPeriod::create($start, $end);
//         $salesByDay = [];

//         foreach ($period as $date) {
//             $day = $date->toDateString();
//             $salesByDay[] = [
//                 'date' => $date->format('M d'),
//                 'total' => $sales[$day] ?? 0,
//             ];
//         }

//         return $salesByDay;
//     }

//     protected function calculatePercentageChange($current, $previous)
//     {
//         if ($previous == 0) return 0;
//         return round((($current - $previous) / $previous) * 100);
//     }
// }
