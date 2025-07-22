<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Carbon\Carbon;
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

        $total_count = Product::all()->count();
        $active_count = Product::where('is_active', '1')->count();
        $featured_count = Product::where('is_featured', '1')->count();
        $empty_count = Product::where('stock', '<', 1)->count();
        $new_count =  Product::where('created_at', '>=', Carbon::now()->subDays(30))->count();

        return Inertia::render('Admin/Product/Index', [
            'products' => $products,
            'count' => [
                'total' => $total_count,
                'active' => $active_count,
                'featured' => $featured_count,
                'empty' => $empty_count,
                'new' => $new_count
            ]
        ]);
    }

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
                'stock' => 'required|numeric',
                'images' => 'required|array|size:4',
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

        return redirect('/admin/products')->with('success', 'Product created successfully');
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
            ->with(['category', 'images' => fn($q) => $q->orderByDesc('is_default'),])
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
            'stock' => 'required|numeric',
            'defaultImage' => 'required',
            'additionalImages' => 'required|array|size:3',
            'additionalImages.*' => 'required',
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
    public function featured(Request $request, Product $product)
    {
        $product->update([
            'is_featured' => $request->is_featured
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
