<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileContorller extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $user->load([
            'addresses' => fn($q) => $q->latest(),
            'reviews' => fn($q) => $q->latest(),
            'reviews.product.image',
            'orders' => fn($q) => $q->latest(),
            'orders.items.product.image',
            'orders.shippingAddress'
        ]);

        return Inertia::render("Web/ProfilePage", [
            'user' => $user,
        ]);
    }

    public function update(User $user)
    {
        $validated = request()->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'avatar' => 'nullable',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if (request()->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $path = request()->file('avatar')->store('users', 'public');
            $user->avatar = '/storage/' . $path;
        }

        $user->save();

        return redirect()->back()->with('success', 'Profile updated successfully');
    }
}
