<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function about()
    {
        return Inertia::render('Web/AboutPage');
    }

    public function contact()
    {
        return Inertia::render('Web/ContactPage');
    }
}
