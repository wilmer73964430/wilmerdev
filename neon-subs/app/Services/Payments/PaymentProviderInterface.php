<?php

namespace App\Services\Payments;

use App\Models\User;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\Invoice;
use App\Models\PaymentMethod;

interface PaymentProviderInterface
{
    public function createSubscriptionCheckout(User $user, Plan $plan, ?string $couponCode = null): object;

    public function syncSubscription(Subscription $subscription, array $payload): void;

    public function switchPlan(Subscription $subscription, Plan $newPlan, bool $prorate): void;

    public function cancelSubscription(Subscription $subscription): void;

    public function addPaymentMethod(User $user, array $payload): PaymentMethod;

    public function handleInvoicePaid(Invoice $invoice, array $payload): void;

    public function handleInvoiceFailed(Invoice $invoice, array $payload): void;
}
