<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request, ?string $slug = null)
    {
        $sort = $request->input('sort', 'newest');
        $page = $request->input('page', 1);

        $categories = Category::with(['children'])
            ->whereNull('parent_id')
            ->get();

        $productsQuery = Product::with(['category', 'image'])
            ->where('is_active', true);

        if ($slug) {
            $category = Category::where('slug', $slug)
                ->with(['children', 'parent'])
                ->firstOrFail();

            $categoryIds = $this->getAllDescendantIds($category);
            $categoryIds[] = $category->id;

            $productsQuery->whereHas('category', function ($query) use ($categoryIds) {
                $query->whereIn('categories.id', $categoryIds);
            });
        }

        $products = $productsQuery->when($sort, function ($query) use ($sort) {
            return match ($sort) {
                'oldest' => $query->oldest(),
                'name_asc' => $query->orderBy('name'),
                'name_desc' => $query->orderBy('name', 'desc'),
                'price_asc' => $query->orderBy('price'),
                'price_desc' => $query->orderBy('price', 'desc'),
                default => $query->latest()
            };
        })->paginate(20, ['*'], 'page', $page);

        if (Auth::check()) {
            $wishlistProductIds = Auth::user()->wishlist()->pluck('products.id')->toArray();
        } else {
            $wishlistProductIds = array_keys(session('wishlist', []));
        }

        return Inertia::render('Web/CategoriesPage', [
            'categories' => $categories,
            'products' => $products,
            'sort' => $sort,
            'currentCategory' => $slug ? $category ?? null : null,
            'wishlistProductIds' => $wishlistProductIds
        ]);
    }

    protected function getAllDescendantIds(Category $category)
    {
        $ids = [];
        foreach ($category->children as $child) {
            $ids[] = $child->id;
            $ids = array_merge($ids, $this->getAllDescendantIds($child));
        }
        return $ids;
    }
}
