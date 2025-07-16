<?php

namespace App\Services;

use App\Models\CartItem;
use Illuminate\Support\Facades\Session;

class CartService
{
  public function merge($user)
  {
    $sessionCart = Session::get('cart', []);

    foreach ($sessionCart as $productId => $item) {
      $existing = $user->cart()->first()?->items()->where('product_id', $productId)->first();

      if ($existing) {
        $existing->quantity += $item['quantity'];
        $existing->save();
      } else {
        $user->cart()->first()?->items()->create([
          'product_id' => $productId,
          'quantity' => $item['quantity'],
        ]);
      }
    }

    Session::forget('cart');
  }

  public function replaceWithSession($user)
  {
    $sessionCart = Session::get('cart', []);

    $cart = $user->cart()->first();

    if (!$cart) {
      $cart = $user->cart()->create();
    }

    $cart->items()->delete();

    foreach ($sessionCart as $productId => $item) {
      $user->cart()->first()?->items()->create([
        'product_id' => $productId,
        'quantity' => $item['quantity'],
      ]);
    }

    Session::forget('cart');
  }
}
