<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AdminReportController extends Controller
{
    public function sales()
    {
        return Inertia::render("Admin/Report/Sale");
    }

    public function products()
    {
        return Inertia::render("Admin/Report/Product");
    }

    public function customers()
    {
        return Inertia::render("Admin/Report/Customer");
    }
}
