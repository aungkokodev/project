<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return 'orders page';
    }

    public function show(string $id)
    {
        return Inertia::render('Web/OrderDetailsPage');
    }

    public function confirmation(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        $order->load(['user', 'items.product.image', 'items.product.category', 'shippingAddress', 'billingAddress']);

        return Inertia::render('Web/OrderConfirmationPage', [
            'order' => $order
        ]);
    }

    public function cancel(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        if ($order->status !== 'pending') {
            return back()->with('error', 'Only pending orders can be canceled.');
        }

        foreach ($order->items as $item) {
            $product = $item->product;
            $product->increment('stock', $item->quantity);
        }

        $order->status = 'cancelled';
        $order->save();

        return redirect('/profile')->with('success', 'Order cancelled successfully. Items restocked.');
    }
}
