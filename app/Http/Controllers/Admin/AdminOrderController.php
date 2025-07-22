<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user', 'items.product.image', 'shippingAddress'])
            ->latest()
            ->get();

        $today_count = Order::whereDate('created_at', today())->count();
        $pending_count = Order::where('status', 'pending')->count();
        $shipped_count = Order::where('status', 'shipped')->count();
        $cancelled_count = Order::where('status', 'cancelled')->count();

        return Inertia::render('Admin/Order/Index', [
            'orders' => $orders,
            'counts' => [
                'today' => $today_count,
                'pending' => $pending_count,
                'shipped' => $shipped_count,
                'cancelled' => $cancelled_count,
            ]
        ]);
    }

    public function update(Order $order)
    {
        $validated = request()->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
            'payment_status' => 'required|in:pending,paid,refunded,failed',
            'admin_notes' => 'nullable|string|max:500',
        ]);

        $wasCancelled = $order->status === 'cancelled';
        $isNowCancelled = $validated['status'] === 'cancelled';

        DB::transaction(function () use ($order, $validated, $wasCancelled, $isNowCancelled) {

            if (!$wasCancelled && $isNowCancelled) {
                foreach ($order->items as $item) {
                    $item->product->increment('stock', $item->quantity);
                }
            } elseif ($wasCancelled && !$isNowCancelled) {
                foreach ($order->items as $item) {
                    if ($item->product->stock < $item->quantity) {
                        throw ValidationException::withMessages([
                            'status' => 'Cannot revert cancellation - insufficient stock for ' . $item->product->name,
                        ]);
                    }
                    $item->product->decrement('stock', $item->quantity);
                }
            }


            $order->update([
                'status' => $validated['status'],
                'payment_status' => $validated['payment_status'],
                'admin_notes' => $validated['admin_notes'],
                'cancelled_at' => $isNowCancelled ? now() : null,
            ]);
        });

        return back()->with(['message' => 'Order updated successfully']);
    }
}
