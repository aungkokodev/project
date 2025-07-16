<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileContorller extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $user->load(['addresses', 'reviews.product.image', 'orders.items.product.image']);

        return Inertia::render("Web/Profile", [
            'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }
}
