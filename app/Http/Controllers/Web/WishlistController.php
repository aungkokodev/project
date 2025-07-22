<?php

namespace App\Http\Controllers\Web;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Web/WishlistPage');
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        if (Auth::check()) {
            Auth::user()->wishlist()->syncWithoutDetaching([$validated['product_id']]);
        } else {
            $wishlist = session()->get('wishlist', []);
            $wishlist[$validated['product_id']] = $validated['product_id'];
            session()->put('wishlist', $wishlist);
        }

        return back()->with('success', 'Item added to wishlist.');
    }

    public function remove(Request $request)
    {
        $productId = $request->product_id;

        if (Auth::check()) {
            Auth::user()->wishlist()->detach($productId);
        } else {
            $wishlist = session()->get('wishlist', []);
            unset($wishlist[$productId]);
            session()->put('wishlist', $wishlist);
        }

        return back()->with('success', 'Item removed from wishlist.');
    }

    public function toggle(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $productId = $validated['product_id'];

        if (Auth::check()) {
            $user = Auth::user();

            if ($user->wishlist()->where('product_id', $productId)->exists()) {
                $user->wishlist()->detach($productId);
                return back()->with('success', 'Item removed from wishlist.');
            } else {
                $user->wishlist()->attach($productId);
                return back()->with('success', 'Item added to wishlist.');
            }
        } else {
            $wishlist = session()->get('wishlist', []);

            if (isset($wishlist[$productId])) {
                unset($wishlist[$productId]);
                session()->put('wishlist', $wishlist);
                return back()->with('success', 'Item removed from wishlist.');
            } else {
                $wishlist[$productId] = $productId;
                session()->put('wishlist', $wishlist);
                return back()->with('success', 'Item added to wishlist.');
            }
        }
    }
}
