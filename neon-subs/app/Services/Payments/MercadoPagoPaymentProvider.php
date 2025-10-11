<?php

namespace App\Services\Payments;

use App\Models\User;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\Invoice;
use App\Models\PaymentMethod;
use MercadoPago\SDK;
use MercadoPago\Preference;

class MercadoPagoPaymentProvider implements PaymentProviderInterface
{
    public function __construct()
    {
        SDK::setAccessToken(config('services.mercadopago.access_token'));
    }

    public function createSubscriptionCheckout(User $user, Plan $plan, ?string $couponCode = null): object
    {
        $preference = new Preference();
        $preference->items = [[
            'title' => $plan->name,
            'quantity' => 1,
            'currency_id' => $plan->currency,
            'unit_price' => $plan->price,
        ]];
        $preference->payer = [
            'email' => $user->email,
        ];
        $preference->back_urls = [
            'success' => route('user.subscriptions'),
            'failure' => route('user.subscriptions'),
            'pending' => route('user.subscriptions'),
        ];
        $preference->save();

        return (object) [
            'redirect_url' => $preference->init_point,
        ];
    }

    public function syncSubscription(Subscription $subscription, array $payload): void
    {
        // Actualizar estado desde webhook Mercado Pago.
    }

    public function switchPlan(Subscription $subscription, Plan $newPlan, bool $prorate): void
    {
        // Cambio de plan Mercado Pago.
    }

    public function cancelSubscription(Subscription $subscription): void
    {
        // Cancelar preferencia o suscripción.
    }

    public function addPaymentMethod(User $user, array $payload): PaymentMethod
    {
        return new PaymentMethod([
            'user_id' => $user->id,
            'provider' => 'mercadopago',
            'provider_customer_id' => $payload['customer_id'] ?? null,
            'provider_pm_id' => $payload['payment_id'] ?? null,
            'brand' => $payload['card']['brand'] ?? 'mp',
            'last4' => $payload['card']['last_four_digits'] ?? '0000',
            'exp_month' => $payload['card']['expiration_month'] ?? null,
            'exp_year' => $payload['card']['expiration_year'] ?? null,
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
