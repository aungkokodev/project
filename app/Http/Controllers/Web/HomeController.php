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
        $categories = Category::with('children')
            ->whereNull('parent_id')
            ->get();

        $baseProductQuery = Product::with(['category', 'image'])
            ->withAvg(['reviews' => fn($q) => $q->where('is_approved', true)], 'rating')
            ->withCount(['reviews' => fn($q) => $q->where('is_approved', true)])
            ->where('is_active', true);

        $featured = (clone $baseProductQuery)
            ->where('is_featured', true)
            ->take(6)
            ->get();

        $topRated = (clone $baseProductQuery)
            ->orderByDesc('reviews_avg_rating')
            ->orderByDesc('reviews_count')
            ->take(6)
            ->get();

        $newArrivals = (clone $baseProductQuery)
            ->latest()
            ->take(6)
            ->get();

        $happyCustomers = Review::with(['user:id,name,avatar', 'product:id,name,slug'])
            ->where('rating', '>=', 5)
            ->where('is_approved', true)
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render("Web/HomePage", [
            'categories' => $categories,
            'featured' => $featured,
            'topRated' => $topRated,
            'newArrivals' => $newArrivals,
            'happyCustomers' => $happyCustomers,
        ]);
    }
}
