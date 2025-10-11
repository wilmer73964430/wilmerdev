<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use App\Models\Subscription;
use App\Services\Billing\SubscriptionService;

class SubscriptionController extends Controller
{
    public function __construct(private SubscriptionService $subscriptionService)
    {
    }

    public function index(): View
    {
        return view('admin.subscriptions.index', [
            'subscriptions' => Subscription::with(['user', 'plan'])->paginate(),
        ]);
    }

    public function show(Subscription $suscripcione): View
    {
        return view('admin.subscriptions.show', [
            'subscription' => $suscripcione->load(['user', 'plan', 'invoices']),
        ]);
    }

    public function update(Request $request, Subscription $suscripcione): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:trialing,active,past_due,canceled,incomplete'],
        ]);

        $suscripcione->update($data);

        return back()->with('status', __('Suscripción actualizada.'));
    }

    public function destroy(Subscription $suscripcione): RedirectResponse
    {
        $this->subscriptionService->cancelAtPeriodEnd($suscripcione);

        return back()->with('status', __('La suscripción será cancelada al finalizar el periodo.'));
    }
}
