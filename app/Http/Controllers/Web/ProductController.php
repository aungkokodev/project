<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show(string $slug)
    {
        $product = Product::where('slug', $slug)
            ->where('is_active', true)
            ->with([
                'category.parent',
                'images',
                'tags',
                'reviews' => function ($query) {
                    $query->where('reviews.is_approved', true);
                },
                'reviews.user'
            ])
            ->firstOrFail();

        return Inertia::render('Web/ProductPage', [
            'product' => $product
        ]);
    }
}
