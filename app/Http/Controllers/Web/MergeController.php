<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\CartService;
use App\Services\WishlistService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class MergeController extends Controller
{
    public function index()
    {
        abort_unless(session('merge_needed'), 403);
        return inertia('Web/MergeChoice');
    }

    public function resolve(Request $request, CartService $cartService, WishlistService $wishlistService)
    {
        $user = Auth::user();
        $action = $request->input('action');

        match ($action) {
            'merge' => [
                $cartService->merge($user),
                $wishlistService->merge($user)
            ],
            'use_session' => [
                $cartService->replaceWithSession($user),
                $wishlistService->replaceWithSession($user)
            ],
            'keep_db' => Session::forget(['cart', 'wishlist']),
        };

        session()->forget('merge_needed');

        return redirect()->intended('/profile');
    }

    public static function hasCartConflict($user): bool
    {
        return Session::has('cart') && $user->cart()->first()?->items()->exists();
    }

    public static function hasWishlistConflict($user): bool
    {
        return Session::has('wishlist') && $user->wishlist()->exists();
    }

    public static function handleConflict($user)
    {
        $hasSessionCart = session()->has('cart') && !empty(session('cart'));
        $hasDbCart = $user->cart && $user->cart->items()->exists();

        $hasSessionWishlist = session()->has('wishlist') && !empty(session('wishlist'));
        $hasDbWishlist = $user->wishlist()->exists();

        if (($hasSessionCart && $hasDbCart) || ($hasSessionWishlist && $hasDbWishlist)) {
            session(['merge_needed' => true]);
            return redirect('/merge-choice');
        }

        if ($hasSessionCart && !$hasDbCart) {
            app(\App\Services\CartService::class)->replaceWithSession($user);
        }

        if ($hasSessionWishlist && !$hasDbWishlist) {
            app(\App\Services\WishlistService::class)->replaceWithSession($user);
        }

        return null;
    }
}
