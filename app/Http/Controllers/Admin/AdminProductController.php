<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminProductController extends Controller
{
    // 
    public function index()
    {
        $products =  Product::with(['category', 'images'])
            ->latest()
            ->get();

        return Inertia::render('Admin/Product/Index', [
            'products' => $products
        ]);
    }

    // 
    public function create()
    {
        $categories = Category::whereNull('parent_id')
            ->with(['children'])
            ->get();

        return Inertia::render('Admin/Product/Create', [
            'categories' => $categories
        ]);
    }

    //
    public function store(Request $request)
    {
        $validated = $request
            ->validate([
                'name' => 'required|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'description' => 'required|string',
                'unit' => 'required|string',
                'price' => 'required|numeric',
                'stock_quantity' => 'required|numeric',
                'images' => 'required|array|min:1|max:4',
                'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
            ]);

        $product = Product::create($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('product_images', 'public');
                $product->images()->create([
                    'path' => '/storage/' . $path,
                    'is_default' => $index === 0
                ]);
            }
        }

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product created successfully');
    }

    public function show(string $id)
    {
        $product = Product::where('slug', $id)
            ->with(['category', 'images'])
            ->get()
            ->first();

        return Inertia::render('Admin/Product/Show', [
            'product' => $product
        ]);
    }

    //
    public function edit(string $slug)
    {
        $product = Product::where('slug', $slug)
            ->with(['category', 'images'])
            ->get()
            ->first();

        $categories = Category::whereNull('parent_id')
            ->with(['children'])
            ->get();

        return Inertia::render('Admin/Product/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    //
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'unit' => 'required|string',
            'price' => 'required|numeric',
            'stock_quantity' => 'required|numeric',
            'defaultImage' => 'required',
            'existing_additionalImages' => 'array',
            'existing_additionalImages.*' => 'string',
            'new_additionalImages' => 'array',
            'new_additionalImages.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $newUploadedPaths = [];

        if ($request->hasFile('defaultImage')) {
            $stored = $request->file('defaultImage')->store('product_images', 'public');
            $newUploadedPaths[] = '/storage/' . $stored;
        }

        if ($request->hasFile('new_additionalImages')) {
            foreach ($request->file('new_additionalImages') as $file) {
                $stored = $file->store('product_images', 'public');
                $newUploadedPaths[] = '/storage/' . $stored;
            }
        }

        foreach ($product->images() as $image) {
            if (!in_array($image->path, $request->input('existing_additionalImages', []))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $image->path));
            }
        }

        $product->images()->delete();

        $allImages = [];

        if ($request->hasFile('defaultImage')) {
            $allImages[] = [
                'path' => $newUploadedPaths[0],
                'is_default' => true,
            ];
        } else {
            $allImages[] = [
                'path' => $request->defaultImage,
                'is_default' => true,
            ];
        }

        foreach ($request->input('existing_additionalImages', []) as $path) {
            $allImages[] = [
                'path' => $path,
                'is_default' => false,
            ];
        }

        foreach (array_slice($newUploadedPaths, $request->hasFile('defaultImage') ? 1 : 0) as $path) {
            $allImages[] = [
                'path' => $path,
                'is_default' => false,
            ];
        }

        foreach ($allImages as $img) {
            $product->images()->create($img);
        }

        $product->update($validated);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product updated successfully');
    }

    //
    public function status(Request $request, Product $product)
    {
        $product->update([
            'is_active' => $request->is_active
        ]);
    }


    // 
    public function destroy(string $id)
    {
        Product::destroy($id);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product deleted successfully');
    }
}
