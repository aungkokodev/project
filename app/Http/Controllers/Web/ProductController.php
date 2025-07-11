<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return redirect('categories.index');
    }

    public function show(string $slug)
    {
        $product = Product::where('slug', $slug)->with(['category', 'images', 'reviews.user'])->get()->first();

        if (!$product) {
            return Inertia::render("Web/NotFound");
        }

        return Inertia::render('Web/Product', [
            'product' => $product
        ]);
    }
}
