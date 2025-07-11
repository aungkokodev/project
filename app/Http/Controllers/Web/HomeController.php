<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'images'])
            ->where('is_active', 1)
            ->get();

        $categories = Category::with(['children'])
            ->whereNull('parent_id')
            ->get();

        $featured = Product::with(['category', 'images', 'reviews'])
            ->where('is_active', 1)
            ->where('is_featured', 1)
            ->take(8)
            ->get();

        $topRated = Product::with(['category', 'images', 'reviews'])
            ->where('is_active', 1)
            ->withAvg('reviews', 'rating')
            ->orderByDesc('reviews_avg_rating')
            ->take(8)
            ->get();

        $bestSelling = Product::with(['category', 'images', 'reviews'])
            ->where('is_active', 1)
            ->withSum([
                'orderItems as total_sold' => function ($query) {
                    $query->whereHas('order', function ($orderQuery) {
                        $orderQuery->where('status', 'delivered');
                    });
                }
            ], 'quantity')
            ->orderByDesc('total_sold')
            ->take(8)
            ->get();

        $newArrivals = Product::with(['category', 'images', 'reviews'])
            ->where('is_active', 1)
            ->latest()
            ->take(8)
            ->get();

        $happyCustomers = Review::query()
            ->with(['user:id,name,avatar', 'product:id,name,slug'])
            ->where('rating', '>=', 5)
            ->where('is_blocked', false)
            ->latest()
            ->take(8)
            ->get();

        return Inertia::render("Web/Home", [
            'products' => $products,
            'categories' => $categories,
            'featured' => $featured,
            'bestSelling' => $bestSelling,
            'topRated' => $topRated,
            'newArrivals' => $newArrivals,
            'happyCustomers' => $happyCustomers
        ]);
    }
}
