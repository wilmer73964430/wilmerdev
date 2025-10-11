<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use App\Models\Coupon;
use App\Models\Plan;

class CouponController extends Controller
{
    public function index(): View
    {
        return view('admin.coupons.index', [
            'coupons' => Coupon::paginate(),
        ]);
    }

    public function create(): View
    {
        return view('admin.coupons.create', [
            'plans' => Plan::all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'code' => ['required', 'unique:coupons,code'],
            'type' => ['required', 'in:percent,fixed'],
            'value' => ['required', 'numeric', 'min:0'],
            'valid_from' => ['nullable', 'date'],
            'valid_to' => ['nullable', 'date', 'after_or_equal:valid_from'],
            'max_uses' => ['nullable', 'integer', 'min:1'],
            'applicable_plan_ids' => ['nullable', 'array'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $data['is_active'] = $request->boolean('is_active');

        Coupon::create($data);

        return redirect()->route('admin.cupones.index')->with('status', __('Cupón creado.'));
    }

    public function edit(Coupon $cupone): View
    {
        return view('admin.coupons.edit', [
            'coupon' => $cupone,
            'plans' => Plan::all(),
        ]);
    }

    public function update(Request $request, Coupon $cupone): RedirectResponse
    {
        $data = $request->validate([
            'code' => ['required', 'unique:coupons,code,'.$cupone->id],
            'type' => ['required', 'in:percent,fixed'],
            'value' => ['required', 'numeric', 'min:0'],
            'valid_from' => ['nullable', 'date'],
            'valid_to' => ['nullable', 'date', 'after_or_equal:valid_from'],
            'max_uses' => ['nullable', 'integer', 'min:1'],
            'applicable_plan_ids' => ['nullable', 'array'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $data['is_active'] = $request->boolean('is_active');

        $cupone->update($data);

        return redirect()->route('admin.cupones.index')->with('status', __('Cupón actualizado.'));
    }

    public function destroy(Coupon $cupone): RedirectResponse
    {
        $cupone->delete();

        return back()->with('status', __('Cupón eliminado.'));
    }
}
