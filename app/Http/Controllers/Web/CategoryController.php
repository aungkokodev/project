<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
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
            ->where('is_active', true)
            ->withAvg(['reviews' => fn($q) => $q->where('is_approved', true)], 'rating')
            ->withCount(['reviews' => fn($q) => $q->where('is_approved', true)]);

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

        return Inertia::render('Web/CategoriesPage', [
            'categories' => $categories,
            'products' => $products,
            'sort' => $sort,
            'currentCategory' => $slug ? $category ?? null : null,
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
