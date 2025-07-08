<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminCategoryController extends Controller
{
    // 
    public function index()
    {
        $categories = Category::with(['parent'])
            ->latest()
            ->get();

        return Inertia::render('Admin/Category/Index', [
            'categories' => $categories
        ]);
    }

    // 
    public function create()
    {
        $categories = Category::whereNull('parent_id')
            ->get();

        return Inertia::render('Admin/Category/Create', [
            'categories' => $categories
        ]);
    }

    // 
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
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

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Category created successfully');
    }

    // 
    public function show(string $slug)
    {
        $category = Category::where('slug', $slug)
            ->with(['parent'])
            ->get()
            ->first();

        return Inertia::render('Admin/Category/Show', [
            'category' => $category,
        ]);
    }

    // 
    public function edit(string $slug)
    {
        $category = Category::where('slug', $slug)
            ->get()
            ->first();

        $categories = Category::whereNull('parent_id')
            ->with(['parent'])
            ->get();

        return Inertia::render('Admin/Category/Edit', [
            'category' => $category,
            'categories' => $categories
        ]);
    }

    // 
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
            'image' => 'nullable',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request
                ->file('image')
                ->store('categories', 'public');

            $validated['image'] = '/storage/' . $imagePath;
        }

        if ($category->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $category->image));
        }

        $category->update($validated);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Category updated successfully!');
    }

    // 
    public function destroy(string $id)
    {
        Category::destroy($id);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Category deleted successfully');
    }
}
