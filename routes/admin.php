<?php

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

// Route::prefix('admin')->name('admin.')->group(function () {
//   Route::get('/login', [AdminAuthController::class, 'showLoginForm'])->name('login');
//   Route::post('/login', [AdminAuthController::class, 'login']);
//   Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

//   Route::get('/forgot-password', [AdminAuthController::class, 'showForgotPasswordForm'])
//     ->name('password.request');
//   Route::post('/forgot-password', [AdminAuthController::class, 'sendResetLinkEmail'])
//     ->name('password.email');
//   Route::get('/reset-password/{token}', [AdminAuthController::class, 'showResetPasswordForm'])
//     ->name('password.reset');
//   Route::post('/reset-password', [AdminAuthController::class, 'resetPassword'])
//     ->name('password.update');
// });

Route::prefix('admin')->middleware(['auth', 'role:admin'])->name('admin.')->group(function () {
  Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

  //
  Route::resource('categories', AdminCategoryController::class);

  //
  Route::resource('products', AdminProductController::class);
  Route::put('products/{product}/status', [AdminProductController::class, 'status'])->name('products.status');
  Route::put('products/{product}/featured', [AdminProductController::class, 'featured'])->name('products.featured');

  // 
  Route::get('reviews', [AdminReviewController::class, 'index'])->name('reviews.index');
  Route::put('reviews/{review}/status', [AdminReviewController::class, 'status'])->name('reviews.status');

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

  // Route::get('inventory', [AdminInventoryController::class, 'index'])->name('inventory.index');
  // Route::put('inventory/{product}/update-stock', [AdminInventoryController::class, 'updateStock'])
  //   ->name('inventory.update-stock');

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
