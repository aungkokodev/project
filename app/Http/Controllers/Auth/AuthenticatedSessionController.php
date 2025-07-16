<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Web\MergeController;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();
        $role = $user->role;

        if ($role === 'admin') {
            $route = '/admin/dashboard';
        } else if ($role === 'customer') {
            $route = '/profile';
        }

        $response =  MergeController::handleConflict($user);

        if ($response) {
            return $response;
        }

        return redirect()->intended($route);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        session()->forget('cart');
        session()->forget('wishlist');

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
