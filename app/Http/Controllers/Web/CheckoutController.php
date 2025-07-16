<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        $address = Address::where('user_id', Auth::id())->where('is_default', true)->get();
        $addresses = Address::where('user_id', Auth::id())->where('is_default', false)->get();

        return Inertia::render('Web/CheckoutPage', [
            'defaultAddress' => $address,
            'addresses' => $addresses,
        ]);
    }

    public function process(Request $request)
    {
        $validated = $request->validate([
            'address_id' => 'nullable|exists:addresses,id,user_id,' . Auth::id(),
            'payment_method' => 'required|in:bank_transfer,mobile_money,cod',
            'cart_items' => 'required|array',
            'cart_items.*.product.id' => 'required|exists:products,id',
            'cart_items.*.quantity' => 'required|integer|min:1',

            'full_name' => 'required_if:address_id,null',
            'street' => 'required_if:address_id,null',
            'city' => 'required_if:address_id,null',
            'state' => 'required_if:address_id,null',
            'country' => 'required_if:address_id,null',
            'phone' => 'required_if:address_id,null',
        ]);

        DB::beginTransaction();

        try {
            $address = $request->address_id
                ? Address::find($request->address_id)
                : $this->createNewAddress($request);

            $order = $this->createOrder($request, $address);

            $paymentResult = $this->processPayment($order, $request->payment_method);

            if (!$paymentResult['success']) {
                throw new \Exception($paymentResult['message']);
            }

            $this->clearCart(Auth::id());

            DB::commit();

            return redirect()->route('order.confirmation', ['order' => $order->id])
                ->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Order failed: ' . $e->getMessage());
        }
    }

    protected function createNewAddress($request)
    {
        $address = Address::create([
            'user_id' => Auth::id(),
            'fullname' => $request->full_name,
            'phone' => $request->phone,
            'type' => 'shipping',
            'street' => $request->street,
            'city' => $request->city,
            'state' => $request->state,
            'zip_code' => $request->zip_code,
            'country' => $request->country,
            'is_default' => $request->is_default ?? false,
            'label' => 'Checkout Address'
        ]);

        return $address;
    }

    protected function createOrder($request, $address)
    {
        $subtotal = collect($request->cart_items)->sum(function ($item) {
            return $item['product']['price'] * $item['quantity'];
        });

        $total = $subtotal;

        $order = Order::create([
            'order_number' => 'AGRI-' . now()->format('Ymd') . '-' . Str::random(6),
            'user_id' => Auth::id(),
            'total_amount' => $total,
            'status' => 'pending',
            'total' => $total,
            'payment_method' => $request->payment_method,
            'payment_method' => $request->payment_method,
            'payment_status' => 'pending',
            'shipping_address_id' => $address->id,
            'billing_address_id' => $address->id,
            'notes' => $request->delivery_notes,
        ]);

        foreach ($request->cart_items as $item) {
            $order->items()->create([
                'order_id' => $order->id,
                'product_id' => $item['product']['id'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['product']['price'],
            ]);

            Product::where('id', $item['product']['id'])
                ->decrement('stock_quantity', $item['quantity']);
        }

        return $order;
    }

    protected function processPayment($order, $method)
    {
        switch ($method) {
            case 'bank_transfer':
                return [
                    'success' => true,
                    'message' => 'Bank transfer payment initiated'
                ];

                // case 'mobile_money':
                //     // Integrate with mobile money API
                //     return $this->processMobileMoneyPayment($order);

            case 'cod':
                return [
                    'success' => true,
                    'message' => 'Cash on delivery selected'
                ];

            default:
                throw new \Exception('Invalid payment method');
        }
    }

    protected function processMobileMoneyPayment($order)
    {
        // Example: Integrate with MTN Mobile Money API
        try {
            $response = Http::post('https://mobile-money-api.com/payment', [
                'amount' => $order->total,
                'phone' => $order->user->phone,
                'reference' => $order->order_number,
            ]);

            if ($response->successful()) {
                $order->update([
                    'payment_status' => 'pending',
                    'transaction_reference' => $response->json('transaction_id')
                ]);

                return [
                    'success' => true,
                    'message' => 'Mobile money payment initiated'
                ];
            }

            throw new \Exception($response->json('message', 'Mobile money payment failed'));
        } catch (\Exception $e) {
            throw new \Exception('Mobile money processing error: ' . $e->getMessage());
        }
    }

    protected function clearCart($userId)
    {
        $cart =  Cart::where('user_id', $userId)->first();
        $cart->items()->delete();
    }
}
