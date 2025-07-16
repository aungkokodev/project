<?php

namespace App\Services;

use App\Models\Wishlist;
use Illuminate\Support\Facades\Session;

class WishlistService
{
  public function merge($user)
  {
    $sessionWishlist = Session::get('wishlist', []);

    $existingIds = $user->wishlist()->pluck('product_id')->toArray();

    $newItems = array_diff($sessionWishlist, $existingIds);

    foreach ($newItems as $productId) {
      Wishlist::create([
        'user_id' => $user->id,
        'product_id' => $productId,
      ]);
    }

    Session::forget('wishlist');
  }

  public function replaceWithSession($user)
  {
    $sessionWishlist = Session::get('wishlist', []);

    $user->wishlist()->detach();

    foreach ($sessionWishlist as $productId) {
      Wishlist::create([
        'user_id' => $user->id,
        'product_id' => $productId,
      ]);
    }

    Session::forget('wishlist');
  }
}
