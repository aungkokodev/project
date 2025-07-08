<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with(['user', 'product.images'])->latest()->get();

        return Inertia::render('Admin/Review/Index', [
            'reviews' => $reviews
        ]);
    }

    public function show(string $id)
    {
        //
    }

    public function status(Request $request, Review $review)
    {
        $review->update([
            'is_active' => $request->is_active
        ]);
    }
}
