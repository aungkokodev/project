<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
            'categories' => function () {
                return Cache::remember('global_categories', now()->addDay(), function () {
                    return Category::with(['children'])
                        ->whereNull('parent_id')
                        ->get();
                });
            },
            'cart' => fn() => $this->getCart($request),
            'wishlist' => fn() =>  $this->getWishlist($request),
            'backUrl' => url()->previous(),

        ];
    }
    protected function getWishlist()
    {
        return Auth::check()
            ? Auth::user()->wishlist()
            ->where('is_active', true)
            ->with(['image', 'category'])
            ->get()
            : collect(session('wishlist', []))
            ->map(function ($id) {
                return Product::with(['image', 'category'])
                    ->where('is_active', true)
                    ->find($id);
            })
            ->filter()
            ->values()
            ->toArray();
    }

    protected function getCart(Request $request)
    {
        if ($request->user()) {
            $cart = $request->user()->cart()
                ->with(['items.product' => function ($query) {
                    $query->where('is_active', true)
                        ->with(['image', 'category']);
                }])
                ->first();

            return $cart?->items
                ->filter(fn($item) => $item->product !== null)
                ->map(function ($item) {
                    return [
                        'product' => $item->product,
                        'quantity' => $item->quantity,
                    ];
                })
                ->values()
                ->toArray() ?? [];
        }

        return collect($request->session()->get('cart', []))
            ->map(function ($data, $productId) {
                return [
                    'product' => Product::with(['image', 'category'])
                        ->where('is_active', true)
                        ->find($productId),
                    'quantity' => $data['quantity'] ?? 1,
                ];
            })
            ->filter(fn($item) => $item['product'] !== null)
            ->values()
            ->toArray();
    }

    // protected function getWishlist()
    // {
    //     return  Auth::check()
    //         ? Auth::user()->wishlist()->with(['image', 'category'])->get()
    //         : collect(session('wishlist', []))->map(function ($id) {
    //             return Product::with(['image', 'category'])->find($id);
    //         })->values()->toArray();
    // }

    // protected function getCart(Request $request)
    // {
    //     if ($request->user()) {
    //         $cart = $request->user()->cart()->with(['items.product.image', 'items.product.category'])->first();
    //         return $cart?->items->map(function ($item) {
    //             return [
    //                 'product' => $item->product,
    //                 'quantity' => $item->quantity,
    //             ];
    //         })->values()->toArray() ?? [];
    //     }

    //     return collect($request->session()->get('cart', []))->map(function ($data, $productId) {
    //         return [
    //             'product' => Product::with(['image', 'category'])->find($productId),
    //             'quantity' => $data['quantity'] ?? 1,
    //         ];
    //     })->values()->toArray();
    // }
}
