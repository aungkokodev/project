<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\{
  AdminAuthController,
  AdminDashboardController,
  AdminProfileController,
  AdminProductController,
  AdminProductImageController,
  AdminCategoryController,
  AdminOrderController,
  AdminOrderItemController,
  AdminCustomerController,
  AdminReviewController,
  AdminReportController,
  AdminSettingController,
  AdminPaymentSettingController,
  AdminDiscountController,
  AdminInventoryController
};


Route::prefix('admin')->name('admin.')->group(function () {
  Route::get('/login', [AdminAuthController::class, 'showLoginForm'])->name('login');
  Route::post('/login', [AdminAuthController::class, 'login']);
  Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

  Route::get('/forgot-password', [AdminAuthController::class, 'showForgotPasswordForm'])
    ->name('password.request');
  Route::post('/forgot-password', [AdminAuthController::class, 'sendResetLinkEmail'])
    ->name('password.email');
  Route::get('/reset-password/{token}', [AdminAuthController::class, 'showResetPasswordForm'])
    ->name('password.reset');
  Route::post('/reset-password', [AdminAuthController::class, 'resetPassword'])
    ->name('password.update');
});

Route::prefix('admin')->middleware(['auth', 'role:admin'])->name('admin.')->group(function () {
  Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
  Route::get('/profile', [AdminProfileController::class, 'index'])->name('profile.index');
  Route::get('/profile/edit', [AdminProfileController::class, 'edit'])->name('profile.edit');
  Route::put('/profile', [AdminProfileController::class, 'update'])->name('profile.update');

  Route::resource('products', AdminProductController::class)->except('show');

  Route::post('products/{product}/images', [AdminProductImageController::class, 'store'])
    ->name('products.images.store');
  Route::delete('products/images/{image}', [AdminProductImageController::class, 'destroy'])
    ->name('products.images.destroy');
  Route::post('products/bulk-delete', [AdminProductController::class, 'bulkDelete'])
    ->name('products.bulk-delete');

  Route::resource('categories', AdminCategoryController::class)->except('show');
  Route::post('categories/reorder', [AdminCategoryController::class, 'reorder'])
    ->name('categories.reorder');

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

  Route::get('reviews', [AdminReviewController::class, 'index'])->name('reviews.index');
  Route::get('reviews/{review}', [AdminReviewController::class, 'show'])->name('reviews.show');
  Route::delete('reviews/{review}', [AdminReviewController::class, 'destroy'])
    ->name('reviews.destroy');
  Route::post('reviews/{review}/approve', [AdminReviewController::class, 'approve'])
    ->name('reviews.approve');
  Route::post('reviews/{review}/reject', [AdminReviewController::class, 'reject'])
    ->name('reviews.reject');

  Route::resource('discounts', AdminDiscountController::class)->except('show');

  Route::get('inventory', [AdminInventoryController::class, 'index'])->name('inventory.index');
  Route::put('inventory/{product}/update-stock', [AdminInventoryController::class, 'updateStock'])
    ->name('inventory.update-stock');

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
