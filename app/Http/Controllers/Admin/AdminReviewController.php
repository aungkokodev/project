<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with(['user', 'product.images'])->latest()->get();
        $total_count = Review::all()->count();
        $recent_count = Review::where('created_at', '>=', Carbon::now()->subDays(30))->count();
        $flagged_count = Review::where('is_flagged', '1')->count();
        $blocked_count = Review::where('is_blocked', '1')->count();

        return Inertia::render('Admin/Review/Index', [
            'reviews' => $reviews,
            'count' => [
                'total' => $total_count,
                'recent' => $recent_count,
                'flagged' => $flagged_count,
                'blocked' => $blocked_count,
            ]
        ]);
    }

    public function show(string $id)
    {
        //
    }

    public function blocked(Request $request, Review $review)
    {
        $review->update([
            'is_blocked' => $request->is_blocked
        ]);
    }

    public function flagged(Request $request, Review $review)
    {
        $review->update([
            'is_flagged' => $request->is_flagged
        ]);
    }
}
