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
        $products = Product::with(['category', 'images'])->where('status', 'active')->get();
        $categories = Category::whereNull('parent_id')->with(['children'])->get();

        return Inertia::render("Web/Home/Index", ['products' => $products, 'categories' => $categories]);
    }
}
