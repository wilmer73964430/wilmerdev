<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Contracts\View\View;
use App\Models\SupportTicket;

class SupportController extends Controller
{
    public function index(Request $request): View
    {
        return view('user.support.index', [
            'tickets' => $request->user()->tickets()->latest()->paginate(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'asunto' => ['required', 'string', 'max:255'],
            'mensaje' => ['required', 'string'],
        ]);

        $request->user()->tickets()->create(array_merge($data, [
            'estado' => 'abierto',
        ]));

        return back()->with('status', __('Ticket creado, te contactaremos pronto.'));
    }
}
