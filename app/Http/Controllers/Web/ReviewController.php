<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string',

        ]);

        $review = Review::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'product_id' => $validated['product_id'],
            ],
            [
                'rating' => $validated['rating'],
                'comment' => $validated['comment'],
                'is_reviewed' => false
            ]
        );

        return back()->with('success', 'Review submitted.');
    }

    public function destroy(Review $review)
    {
        if (Auth::id() !== $review->user_id) {
            return back()->with('error', 'You are not authorized to delete this review.');
        }

        try {
            $review->delete();
            return back()->with('success', 'Review deleted successfully!');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete review. Please try again.');
        }
    }
}
