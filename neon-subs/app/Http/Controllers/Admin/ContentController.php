<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;

class ContentController extends Controller
{
    public function edit(): View
    {
        return view('admin.content.edit', [
            'content' => Cache::get('landing.home'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'hero.title' => ['required', 'string'],
            'hero.subtitle' => ['required', 'string'],
            'benefits' => ['required', 'array'],
        ]);

        Cache::put('landing.home', $data, now()->addDay());

        return back()->with('status', __('Contenido actualizado.'));
    }
}
