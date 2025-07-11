<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with(['children'])->whereNull('parent_id')->get();
        $products = Product::with(['category', 'images', 'reviews'])->get();

        return Inertia::render('Web/CategoryList',);
    }

    public function show(string $slug)
    {
        $category = Category::where('slug', $slug)->with(['children'])->firstOrFail();

        $products = Product::with(['category', 'images', 'reviews'])
            ->whereHas('category', function (Builder $query) use ($category) {
                $categoryIds = $this->getAllDescendantIds($category);
                $categoryIds[] = $category->id;

                $query->whereIn('categories.id', $categoryIds);
                $query->where('products.is_active', '1');
            })
            ->get();

        return Inertia::render('Web/Category', [
            'category' => $category,
            'products' => $products
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
