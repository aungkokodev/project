<?php

use App\Http\Controllers\Web\CartController;
use App\Http\Controllers\Web\CategoryController;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\PageController;
use App\Http\Controllers\Web\ProductController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\{
  AdminDashboardController,
  AdminProfileController,
  AdminProductController,
  AdminCategoryController,
  AdminOrderController,
  AdminOrderItemController,
  AdminCustomerController,
  AdminReviewController,
  AdminReportController,
  AdminSettingController,
  AdminPaymentSettingController,
  AdminDiscountController,
};

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');

Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
Route::get('/categories/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');

Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'add'])->name('cart.add');

Route::get('/whishlist', [CartController::class, 'index'])->name('whishlist.index');
Route::post('/whishlist', [CartController::class, 'store'])->name('whishlist.store');

Route::get('/l', [PageController::class, 'login'])->name('pages.login');
Route::get('/about', [PageController::class, 'about'])->name('pages.about');
Route::get('/contact', [PageController::class, 'contact'])->name('pages.contact');


Route::middleware(['auth', 'role:customer'])->name('user.')->group(function () {
  Route::get('/profile', function () {
    return "user profile";
  })->name('profile');
});

Route::prefix('/admin')->middleware(['auth', 'role:admin'])->name('admin.')->group(function () {
  Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

  //
  Route::resource('categories', AdminCategoryController::class);

  //
  Route::resource('products', AdminProductController::class);
  Route::put('products/{product}/status', [AdminProductController::class, 'status'])->name('products.status');
  Route::put('products/{product}/featured', [AdminProductController::class, 'featured'])->name('products.featured');

  // 
  Route::get('reviews', [AdminReviewController::class, 'index'])->name('reviews.index');
  Route::put('reviews/{review}/blocked', [AdminReviewController::class, 'blocked'])->name('reviews.blocked');
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

  Route::get('settings', [AdminSettingController::class, 'edit'])->name('settings.edit');
  Route::put('settings', [AdminSettingController::class, 'update'])->name('settings.update');
  Route::get('settings/payments', [AdminPaymentSettingController::class, 'index'])
    ->name('settings.payments');
  Route::put('settings/payments', [AdminPaymentSettingController::class, 'update'])
    ->name('settings.payments.update');
});

require __DIR__ . '/auth.php';
