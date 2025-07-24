<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Web\{
  AddressController,
  HomeController,
  CategoryController,
  ProductController,
  CartController,
  CheckoutController,
  MergeController,
  OrderController,
  WishlistController,
  ProfileContorller,
  ReviewController,
  PageController
};

use App\Http\Controllers\Admin\{
  AdminDashboardController,
  AdminCategoryController,
  AdminProductController,
  AdminReviewController,
  AdminCustomerController,
  AdminProfileController,
  AdminOrderController,
  AdminOrderItemController,
  AdminReportController,
  AdminInventoryController,
};


Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/products/{product:slug}', [ProductController::class, 'show']);

Route::get('/collections', [CategoryController::class, 'index']);
Route::get('/collections/{category:slug}', [CategoryController::class, 'index']);

Route::get('/cart', [CartController::class, 'index']);
Route::post('/cart/add', [CartController::class, 'add']);
Route::post('/cart/update', [CartController::class, 'update']);
Route::post('/cart/remove', [CartController::class, 'remove']);

Route::get('/wishlist', [WishlistController::class, 'index']);
Route::post('/wishlist/add', [WishlistController::class, 'add']);
Route::post('/wishlist/toggle', [WishlistController::class, 'toggle']);
Route::post('/wishlist/remove', [WishlistController::class, 'remove']);

Route::get('/about', [PageController::class, 'about']);
Route::get('/contact', [PageController::class, 'contact']);



Route::middleware(['auth', 'role:customer'])->group(function () {
  Route::get('/checkout', [CheckoutController::class, 'index'])->middleware('auth');
  Route::get('/merge-choice', [MergeController::class, 'index'])->middleware('auth');
  Route::post('/merge-choice/resolve', [MergeController::class, 'resolve'])->middleware('auth');

  Route::get('/profile', [ProfileContorller::class, 'index'])->name('profile');
  Route::post('/profile/{user}', [ProfileContorller::class, 'update']);

  Route::post('/reviews', [ReviewController::class, 'store']);
  Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);

  Route::post('/checkout/process', [CheckoutController::class, 'process']);

  Route::get('/orders', [OrderController::class, 'index']);
  Route::get('/orders/{order}/confirmation', [OrderController::class, 'confirmation'])->name('orders.confirmation');
  Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel'])->name('orders.cancel');

  Route::post('/addresses/{address}', [AddressController::class, 'store'])->name('addresses.store');
  Route::post('/addresses/{address}/update', [AddressController::class, 'update'])->name('addresses.update');
  Route::delete('/addresses/{address}', [AddressController::class, 'destroy'])->name('addresses.destroy');
});

Route::prefix('/admin')->middleware(['auth', 'role:admin'])->name('admin.')->group(function () {
  Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

  Route::get('categories', [AdminCategoryController::class, 'index']);
  Route::post('maincategories', [AdminCategoryController::class, 'store_main']);
  Route::post('subcategories', [AdminCategoryController::class, 'store_sub']);
  Route::post('maincategories/{category}', [AdminCategoryController::class, 'update_main']);
  Route::post('subcategories/{category}', [AdminCategoryController::class, 'update_sub']);
  Route::delete('categories/{category}', [AdminCategoryController::class, 'destroy']);

  Route::resource('products', AdminProductController::class);
  Route::post('products/{product}', [AdminProductController::class, 'update']);
  Route::put('products/{product}/status', [AdminProductController::class, 'status'])->name('products.status');
  Route::put('products/{product}/featured', [AdminProductController::class, 'featured'])->name('products.featured');

  Route::get('/inventory', [AdminInventoryController::class, 'index'])->name('inventory');

  Route::get('reviews', [AdminReviewController::class, 'index'])->name('reviews.index');
  Route::put('reviews/{review}/approved', [AdminReviewController::class, 'approved'])->name('reviews.approved');
  Route::put('reviews/{review}/reviewed', [AdminReviewController::class, 'reviewed'])->name('reviews.reviewed');

  Route::get('orders', [AdminOrderController::class, 'index'])->name('orders.index');
  Route::post('orders/{order}', [AdminOrderController::class, 'update'])->name('orders.update');

  Route::get('/profile', [AdminProfileController::class, 'index'])->name('profile.index');
  Route::get('/profile/edit', [AdminProfileController::class, 'edit'])->name('profile.edit');
  Route::put('/profile', [AdminProfileController::class, 'update'])->name('profile.update');

  Route::get('customers', [AdminCustomerController::class, 'index'])->name('customers.index');

  Route::get('insights/sales', [AdminReportController::class, 'sales']);
  Route::get('insights/products', [AdminReportController::class, 'products']);
});

require __DIR__ . '/auth.php';
