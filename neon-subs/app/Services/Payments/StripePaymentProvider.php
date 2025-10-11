<?php

namespace App\Services\Payments;

use App\Models\User;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\Invoice;
use App\Models\PaymentMethod;
use Stripe\StripeClient;

class StripePaymentProvider implements PaymentProviderInterface
{
    public function __construct(private StripeClient $client)
    {
    }

    public function createSubscriptionCheckout(User $user, Plan $plan, ?string $couponCode = null): object
    {
        // Implementación real pendiente: crear sesión de checkout.
        return (object) [
            'redirect_url' => 'https://checkout.stripe.com/test-session',
        ];
    }

    public function syncSubscription(Subscription $subscription, array $payload): void
    {
        // Actualizar estado desde webhook Stripe.
    }

    public function switchPlan(Subscription $subscription, Plan $newPlan, bool $prorate): void
    {
        // Cambio de plan con prorrateo.
    }

    public function cancelSubscription(Subscription $subscription): void
    {
        // Cancelar en Stripe.
    }

    public function addPaymentMethod(User $user, array $payload): PaymentMethod
    {
        return new PaymentMethod([
            'user_id' => $user->id,
            'provider' => 'stripe',
            'provider_customer_id' => $payload['customer'] ?? null,
            'provider_pm_id' => $payload['payment_method'] ?? null,
            'brand' => $payload['brand'] ?? 'visa',
            'last4' => $payload['last4'] ?? '4242',
            'exp_month' => $payload['exp_month'] ?? 12,
            'exp_year' => $payload['exp_year'] ?? 2030,
        ]);
    }

    public function handleInvoicePaid(Invoice $invoice, array $payload): void
    {
        $invoice->markAsPaid($payload['paid_at'] ?? now());
    }

    public function handleInvoiceFailed(Invoice $invoice, array $payload): void
    {
        $invoice->markAsFailed($payload['failed_at'] ?? now());
    }
}
