<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
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

        $order->load(['user', 'items.product.image', 'shippingAddress', 'billingAddress']);

        return Inertia::render('Web/OrderConfirmationPage', [
            'order' => $order
        ]);
    }
}
