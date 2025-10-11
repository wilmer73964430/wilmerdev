<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function edit(Request $request): View
    {
        return view('user.profile.edit', [
            'user' => $request->user(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'timezone' => ['required', 'string'],
            'locale' => ['required', 'string'],
            'billing_name' => ['nullable', 'string', 'max:255'],
            'billing_tax_id' => ['nullable', 'string', 'max:100'],
            'billing_address' => ['nullable', 'string'],
            'password' => ['nullable', 'confirmed', 'min:8'],
        ]);

        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return back()->with('status', __('Perfil actualizado correctamente.'));
    }
}
