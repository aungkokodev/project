<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Web\{
  HomeController,
  CategoryController,
  ProductController,
  CartController,
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
  AdminDiscountController,
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

Route::post('/reviews', [ReviewController::class, 'store']);

Route::get('/about', [PageController::class, 'about']);
Route::get('/contact', [PageController::class, 'contact']);


Route::middleware(['auth', 'role:customer'])->name('user.')->group(function () {
  Route::get('/profile', [ProfileContorller::class, 'index'])->name('profile');
});


Route::prefix('/admin')->middleware(['auth', 'role:admin'])->name('admin.')->group(function () {
  Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

  Route::resource('categories', AdminCategoryController::class);
  Route::post('categories/{category}', [AdminCategoryController::class, 'update']);

  Route::resource('products', AdminProductController::class);
  Route::post('products/{product}', [AdminProductController::class, 'update']);
  Route::put('products/{product}/status', [AdminProductController::class, 'status'])->name('products.status');
  Route::put('products/{product}/featured', [AdminProductController::class, 'featured'])->name('products.featured');

  Route::get('reviews', [AdminReviewController::class, 'index'])->name('reviews.index');
  Route::put('reviews/{review}/approved', [AdminReviewController::class, 'approved'])->name('reviews.approved');
  Route::put('reviews/{review}/flagged', [AdminReviewController::class, 'flagged'])->name('reviews.flagged');



  Route::get('/profile', [AdminProfileController::class, 'index'])->name('profile.index');
  Route::get('/profile/edit', [AdminProfileController::class, 'edit'])->name('profile.edit');
  Route::put('/profile', [AdminProfileController::class, 'update'])->name('profile.update');

  Route::get('orders', [AdminOrderController::class, 'index'])->name('orders.index');
  Route::get('orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
  Route::put('orders/{order}/status', [AdminOrderController::class, 'updateStatus'])
    ->name('orders.update-status');
  Route::post('orders/{order}/cancel', [AdminOrderController::class, 'cancel'])
    ->name('orders.cancel');
  Route::post('orders/{order}/items', [AdminOrderItemController::class, 'store'])
    ->name('orders.items.store');

  Route::get('customers', [AdminCustomerController::class, 'index'])->name('customers.index');
  Route::get('customers/{user}', [AdminCustomerController::class, 'show'])->name('customers.show');
  Route::delete('customers/{user}', [AdminCustomerController::class, 'destroy'])
    ->name('customers.destroy');

  Route::resource('discounts', AdminDiscountController::class)->except('show');

  Route::get('reports/sales', [AdminReportController::class, 'sales'])->name('reports.sales');
  Route::get('reports/products', [AdminReportController::class, 'products'])
    ->name('reports.products');
  Route::get('reports/customers', [AdminReportController::class, 'customers'])
    ->name('reports.customers');
  Route::get('reports/export/sales', [AdminReportController::class, 'exportSales'])
    ->name('reports.export.sales');
});

require __DIR__ . '/auth.php';
