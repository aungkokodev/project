<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
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
                'reviews' => function ($q) {
                    $q->where(function ($q2) {
                        $q2->where('is_approved', true)
                            ->orWhere('user_id', Auth::id());
                    });
                },
                'reviews.user',
            ])
            ->withAvg(['reviews' => fn($q) => $q->where('is_approved', true)], 'rating')
            ->withCount(['reviews' => fn($q) => $q->where('is_approved', true)])
            ->firstOrFail();


        return Inertia::render('Web/ProductPage', [
            'product' => $product
        ]);
    }
}
