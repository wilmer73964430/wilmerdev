<?php

namespace App\Services\Billing;

use App\Models\User;
use App\Models\Plan;
use App\Models\Subscription;
use App\Services\Payments\PaymentGatewayManager;

class CheckoutService
{
    public function __construct(private PaymentGatewayManager $gatewayManager)
    {
    }

    public function startSubscriptionCheckout(User $user, Plan $plan, string $provider, ?string $couponCode = null): string
    {
        $gateway = $this->gatewayManager->forProvider($provider);

        $checkoutSession = $gateway->createSubscriptionCheckout($user, $plan, $couponCode);

        return $checkoutSession->redirect_url;
    }

    public function changePlan(Subscription $subscription, Plan $newPlan, bool $prorate = true): void
    {
        $gateway = $this->gatewayManager->forProvider($subscription->provider);

        $gateway->switchPlan($subscription, $newPlan, $prorate);
    }
}
