<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Contracts\View\View;
use App\Services\Billing\CheckoutService;
use App\Services\Billing\SubscriptionService;
use App\Http\Requests\User\SubscriptionStoreRequest;
use App\Http\Requests\User\SubscriptionUpdateRequest;

class SubscriptionController extends Controller
{
    public function __construct(
        private CheckoutService $checkoutService,
        private SubscriptionService $subscriptionService
    ) {
    }

    public function index(Request $request): View
    {
        return view('user.subscriptions.index', [
            'subscriptions' => $request->user()->subscriptions()->with('plan')->latest()->paginate(),
            'plans' => \App\Models\Plan::active()->get(),
        ]);
    }

    public function store(SubscriptionStoreRequest $request): RedirectResponse
    {
        $redirect = $this->checkoutService->startSubscriptionCheckout(
            $request->user(),
            $request->getPlan(),
            $request->validated('provider'),
            $request->validated('coupon_code')
        );

        return redirect()->away($redirect);
    }

    public function update(SubscriptionUpdateRequest $request, \App\Models\Subscription $subscription): RedirectResponse
    {
        $this->authorize('update', $subscription);

        $this->checkoutService->changePlan(
            $subscription,
            $request->getNewPlan(),
            $request->validated('prorate', true)
        );

        return redirect()->route('user.subscriptions')->with('status', __('Estamos procesando tu cambio de plan.'));
    }

    public function destroy(Request $request, \App\Models\Subscription $subscription): RedirectResponse
    {
        $this->authorize('cancel', $subscription);

        $this->subscriptionService->cancelAtPeriodEnd($subscription);

        return redirect()->route('user.subscriptions')->with('status', __('La suscripción será cancelada al finalizar el periodo actual.'));
    }
}
