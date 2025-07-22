<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminCategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('parent')
            ->withCount('products')
            ->latest()
            ->get();

        $main_categories = Category::whereNull('parent_id')
            ->with(['parent', 'children'])
            ->withCount('products')
            ->latest()
            ->get();

        $sub_categories = Category::whereNotNull('parent_id')
            ->with(['parent', 'children'])
            ->withCount('products')
            ->latest()
            ->get();

        $total_count = Category::all()->count();
        $main_count = Category::whereNull('parent_id')->count();
        $sub_count = Category::whereNotNull('parent_id')->count();
        $new_count = Category::where('created_at', '>=', Carbon::now()->subDays(7))->count();

        return Inertia::render('Admin/Category/Index', [
            'main_categories' => $main_categories,
            'sub_categories' => $sub_categories,
            'categories' => $categories,
            'counts' =>  [
                'total' => $total_count,
                'main' => $main_count,
                'sub' => $sub_count,
                'new' => $new_count
            ]
        ]);
    }

    public function store_main(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request
                ->file('image')
                ->store('categories', 'public');

            $validated['image'] = '/storage/' . $imagePath;
        }

        Category::create($validated);

        return back()->with('success', 'Category created successfully');
    }

    public function store_sub(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'required|exists:categories,id',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request
                ->file('image')
                ->store('categories', 'public');

            $validated['image'] = '/storage/' . $imagePath;
        }

        Category::create($validated);

        return back()->with('success', 'Category created successfully');
    }

    public function update_main(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id|not_in:' . $category->id,
            'image' => 'required',
        ]);

        if ($validated['parent_id'] !== null && $category->children()->exists()) {
            return back()->withErrors([
                'parent_id' => 'Cannot assign a parent to a category that has child categories.',
            ])->withInput();
        }

        if ($request->hasFile('image')) {
            $imagePath = $request
                ->file('image')
                ->store('categories', 'public');

            $validated['image'] = '/storage/' . $imagePath;

            if ($category->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $category->image));
            }
        }

        $category->update($validated);

        return back()->with('success', 'Category updated successfully!');
    }

    public function update_sub(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'required|exists:categories,id|not_in:' . $category->id,
            'image' => 'required',
        ]);

        if ($validated['parent_id'] !== null && $category->children()->exists()) {
            return back()->withErrors([
                'parent_id' => 'Cannot assign a parent to a category that has child categories.',
            ])->withInput();
        }

        if ($request->hasFile('image')) {
            $imagePath = $request
                ->file('image')
                ->store('categories', 'public');

            $validated['image'] = '/storage/' . $imagePath;

            if ($category->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $category->image));
            }
        }

        $category->update($validated);

        return back()->with('success', 'Category updated successfully!');
    }

    public function destroy(string $id)
    {
        $category = Category::with(['children', 'products'])->findOrFail($id);

        if ($category->children()->exists()) {
            return back()->with(['error' => 'Cannot delete a category that has subcategories.']);
        }

        if ($category->products()->exists()) {
            return back()->with(['error' => 'Cannot delete a category that has products.']);
        }

        if ($category->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $category->image));
        }

        $category->delete();

        return back()->with('success', 'Category deleted successfully.');
    }
}
