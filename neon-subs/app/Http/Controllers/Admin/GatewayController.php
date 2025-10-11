<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Artisan;

class GatewayController extends Controller
{
    public function edit(): View
    {
        return view('admin.gateways.edit');
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'stripe.key' => ['required', 'string'],
            'stripe.secret' => ['required', 'string'],
            'paypal.client_id' => ['required', 'string'],
            'paypal.client_secret' => ['required', 'string'],
            'mercadopago.access_token' => ['required', 'string'],
            'izipay.api_key' => ['required', 'string'],
        ]);

        foreach ($data as $namespace => $values) {
            foreach ($values as $key => $value) {
                Config::set("services.{$namespace}.{$key}", $value);
            }
        }

        Artisan::call('config:clear');

        return back()->with('status', __('Credenciales actualizadas.'));
    }
}
