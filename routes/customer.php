<?php

// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Customer\{
//   DashboardController,
//   OrderController,
//   ProfileController,
//   AddressController,
//   ReviewController,
//   WishlistController
// };

// Route::middleware(['auth', 'verified', 'role:customer'])->prefix('my-account')->name('customer.')->group(function () {

//   Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

//   Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
//   Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');

//   Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//   Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

//   Route::get('/addresses', [AddressController::class, 'index'])->name('addresses.index');
//   Route::post('/addresses', [AddressController::class, 'store'])->name('addresses.store');
//   Route::put('/addresses/{address}', [AddressController::class, 'update'])->name('addresses.update');

//   Route::post('/products/{product}/reviews', [ReviewController::class, 'store'])->name('reviews.store');

//   Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
//   Route::post('/wishlist/{product}', [WishlistController::class, 'store'])->name('wishlist.store');

//   Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
// });
