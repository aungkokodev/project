<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $products = Product::where('is_active', 1)
            ->with(['category', 'images'])
            ->get();

        $categories = Category::whereNull('parent_id')
            ->with(['children'])
            ->get();

        return Inertia::render("Web/Home", [
            'products' => $products,
            'categories' => $categories
        ]);
    }
}
