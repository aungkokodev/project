<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function create()
    {
        //
    }

    public function show(string $slug)
    {
        return Inertia::render('Web/Product', [
            'product' => Product::where('slug', $slug)->with(['category', 'images', 'reviews.user'])->get()->first()
        ]);
    }
}
