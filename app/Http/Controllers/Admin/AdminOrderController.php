<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user.addresses', 'items.product.image'])->get();

        return Inertia::render('Admin/Order/Index', [
            'orders' => $orders
        ]);
    }

    public function show(string $id)
    {
        return Inertia::render('Admin/Order/Show');
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
