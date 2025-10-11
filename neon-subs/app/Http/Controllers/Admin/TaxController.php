<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use App\Models\TaxRate;

class TaxController extends Controller
{
    public function index(): View
    {
        return view('admin.taxes.index', [
            'taxes' => TaxRate::paginate(),
        ]);
    }

    public function create(): View
    {
        return view('admin.taxes.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'country' => ['required', 'string'],
            'region' => ['nullable', 'string'],
            'percentage' => ['required', 'numeric'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $data['is_active'] = $request->boolean('is_active');

        TaxRate::create($data);

        return redirect()->route('admin.impuestos.index')->with('status', __('Impuesto creado.'));
    }

    public function edit(TaxRate $impuesto): View
    {
        return view('admin.taxes.edit', [
            'tax' => $impuesto,
        ]);
    }

    public function update(Request $request, TaxRate $impuesto): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'country' => ['required', 'string'],
            'region' => ['nullable', 'string'],
            'percentage' => ['required', 'numeric'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $data['is_active'] = $request->boolean('is_active');

        $impuesto->update($data);

        return redirect()->route('admin.impuestos.index')->with('status', __('Impuesto actualizado.'));
    }

    public function destroy(TaxRate $impuesto): RedirectResponse
    {
        $impuesto->delete();

        return back()->with('status', __('Impuesto eliminado.'));
    }
}
