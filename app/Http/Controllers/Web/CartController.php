<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function index()
    {
        //
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        if (Auth::guest()) {
            $cart = session()->get('cart', []);
            $cart[$validated['product_id']] = [
                'quantity' => ($cart[$validated['product_id']]['quantity'] ?? 0) + $validated['quantity'],
                'added_at' => now()
            ];
            session()->put('cart', $cart);
        }
        // For logged-in users
        else {
            Cart::updateOrCreate(
                [
                    'user_id' => Auth::user()->id,
                    'product_id' => $validated['product_id']
                ],
                [
                    'quantity' => DB::raw("quantity + {$validated['quantity']}")
                ]
            );
        }

        return back()->with('success', 'Item added to cart');
    }

    protected function syncWithDatabase($user, $sessionCart)
    {
        $user->cartItems()->delete();

        foreach ($sessionCart as $productId => $quantity) {
            $user->cartItems()->create([
                'product_id' => $productId,
                'quantity' => $quantity
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
