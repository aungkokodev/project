<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = $this->getCartData($request);

        return Inertia::render(
            "Web/CartPage",
            [
                'cart' => $cart
            ]
        );
    }

    public function add(Request $request)
    {
        if (Auth::user()?->role === 'admin') return;

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $this->handleCartOperation('add', $validated['product_id'], $validated['quantity']);

        return back()->with('success', 'Item added to cart.');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $this->handleCartOperation('update', $validated['product_id'], $validated['quantity']);

        return back()->with('success', 'Cart updated.');
    }

    public function remove(Request $request)
    {
        $product_id = $request->product_id;

        $this->handleCartOperation('remove', $product_id);

        return back()->with('success', 'Item removed.');
    }

    protected function getCartData(Request $request)
    {
        if ($request->user()) {
            $cart = $request->user()->cart()->with(['items.product.image', 'items.product.category'])->first();
            return $cart?->items->map(function ($item) {
                return [
                    'product' => $item->product,
                    'quantity' => $item->quantity,
                ];
            })->values()->toArray() ?? [];
        }

        return collect($request->session()->get('cart', []))->map(function ($data, $productId) {
            return [
                'product' => Product::with(['image', 'category'])->find($productId),
                'quantity' => $data['quantity'] ?? 1,
            ];
        })->values()->toArray();
    }

    protected function handleCartOperation(string $operation, $productId, $quantity = null)
    {
        if (Auth::check()) {
            $this->handleDatabaseCart($operation, $productId, $quantity);
        } else {
            $this->handleSessionCart($operation, $productId, $quantity);
        }
    }

    protected function handleDatabaseCart(string $operation, $productId, $quantity = null)
    {
        $cart = Cart::firstOrCreate(['user_id' => Auth::id()]);

        switch ($operation) {
            case 'add':
                $item = $cart->items()->firstOrNew(['product_id' => $productId]);
                $item->quantity += $quantity;
                $item->save();
                break;

            case 'update':
                $item = $cart->items()->where('product_id', $productId)->first();
                if ($item) {
                    $item->quantity = $quantity;
                    $item->save();
                }
                break;

            case 'remove':
                $cart->items()->where('product_id', $productId)->delete();
                break;
        }
    }

    protected function handleSessionCart(string $operation, $productId, $quantity = null)
    {
        $cart = session()->get('cart', []);

        switch ($operation) {
            case 'add':
                $cart[$productId] = [
                    'quantity' => ($cart[$productId]['quantity'] ?? 0) + $quantity
                ];
                break;

            case 'update':
                if (isset($cart[$productId])) {
                    $cart[$productId]['quantity'] = $quantity;
                }
                break;

            case 'remove':
                unset($cart[$productId]);
                break;
        }

        session()->put('cart', $cart);
    }
}
