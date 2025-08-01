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
        $pending_count = Review::where('is_reviewed', '0')->count();
        $approved_count = Review::where('is_approved', '1')->count();

        return Inertia::render('Admin/Review/Index', [
            'reviews' => $reviews,
            'count' => [
                'total' => $total_count,
                'recent' => $recent_count,
                'pending' => $pending_count,
                'approved' => $approved_count,
            ]
        ]);
    }

    public function show(string $id)
    {
        //
    }

    public function approved(Request $request, Review $review)
    {
        $review->update([
            'is_approved' => $request->is_approved,
            'is_reviewed' => true
        ]);
    }

    public function reviewed(Request $request, Review $review)
    {
        $review->update([
            'is_reviewed' => $request->is_reviewed
        ]);
    }
}
