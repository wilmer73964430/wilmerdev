<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request): View
    {
        $query = User::query();

        if ($search = $request->query('search')) {
            $query->where(fn ($q) => $q->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"));
        }

        return view('admin.users.index', [
            'users' => $query->paginate(),
        ]);
    }

    public function create(): View
    {
        return view('admin.users.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8'],
            'is_admin' => ['boolean'],
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        $roles = $request->boolean('is_admin') ? ['admin'] : ['user'];
        $user->syncRoles($roles);

        return redirect()->route('admin.usuarios.index')->with('status', __('Usuario creado.'));
    }

    public function edit(User $usuario): View
    {
        return view('admin.users.edit', ['user' => $usuario]);
    }

    public function update(Request $request, User $usuario): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email,'.$usuario->id],
            'password' => ['nullable', 'min:8'],
            'is_admin' => ['boolean'],
        ]);

        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $usuario->update($data);

        $usuario->syncRoles($request->boolean('is_admin') ? ['admin'] : ['user']);

        return redirect()->route('admin.usuarios.index')->with('status', __('Usuario actualizado.'));
    }

    public function destroy(User $usuario): RedirectResponse
    {
        $usuario->delete();

        return back()->with('status', __('Usuario eliminado.'));
    }
}
