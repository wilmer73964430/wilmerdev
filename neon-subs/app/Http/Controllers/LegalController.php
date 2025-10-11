<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;

class LegalController extends Controller
{
    public function terms(): View
    {
        return view('landing.legal.terms');
    }

    public function privacy(): View
    {
        return view('landing.legal.privacy');
    }
}
