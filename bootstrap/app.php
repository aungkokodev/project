<?php

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role' => \App\Http\Middleware\Role::class
        ]);
    })
    ->withExceptions(function (Illuminate\Foundation\Configuration\Exceptions $exceptions) {
        $exceptions->render(function (Throwable $e, Illuminate\Http\Request $request) {
            $status = 500;
            if ($e instanceof AuthenticationException) {
                $status = 401;
            } elseif ($e instanceof AuthorizationException) {
                $status = 403;
            } elseif ($e instanceof HttpExceptionInterface) {
                $status = $e->getStatusCode();
            }

            if (in_array($status, [401, 403, 404, 419, 429, 503])) {
                return Inertia::render("Errors/Error", [
                    'status' => $status,
                    'message' => $e->getMessage(),
                    'categories' => function () {
                        return Cache::remember('global_categories', now()->addDay(), function () {
                            return \App\Models\Category::with(['children'])
                                ->whereNull('parent_id')
                                ->get();
                        });
                    },
                    'backUrl' => url()->previous()
                ])->toResponse($request)->setStatusCode($status);
            }
            return null;
        });
    })->create();
