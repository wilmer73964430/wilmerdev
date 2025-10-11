<?php

namespace App\Services\Payments;

use App\Models\User;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\Invoice;
use App\Models\PaymentMethod;
use PayPalCheckoutSdk\Orders\OrdersCreateRequest;
use PayPalCheckoutSdk\Core\PayPalHttpClient;

class PayPalPaymentProvider implements PaymentProviderInterface
{
    public function __construct(private PayPalHttpClient $client)
    {
    }

    public function createSubscriptionCheckout(User $user, Plan $plan, ?string $couponCode = null): object
    {
        $request = new OrdersCreateRequest();
        $request->body = [
            'intent' => 'CAPTURE',
            'purchase_units' => [[
                'description' => $plan->name,
                'amount' => [
                    'currency_code' => $plan->currency,
                    'value' => $plan->price,
                ],
            ]],
        ];

        $response = $this->client->execute($request);
        $approve = collect($response->result->links)->firstWhere('rel', 'approve');

        return (object) [
            'redirect_url' => $approve->href ?? '#',
        ];
    }

    public function syncSubscription(Subscription $subscription, array $payload): void
    {
        // Actualización desde webhook PayPal.
    }

    public function switchPlan(Subscription $subscription, Plan $newPlan, bool $prorate): void
    {
        // Cambio de plan PayPal Billing Agreements.
    }

    public function cancelSubscription(Subscription $subscription): void
    {
        // Cancelar suscripción PayPal.
    }

    public function addPaymentMethod(User $user, array $payload): PaymentMethod
    {
        return new PaymentMethod([
            'user_id' => $user->id,
            'provider' => 'paypal',
            'provider_customer_id' => $payload['payer_id'] ?? null,
            'provider_pm_id' => $payload['order_id'] ?? null,
            'brand' => 'paypal',
            'last4' => substr($payload['order_id'] ?? 'PP', -4),
            'exp_month' => null,
            'exp_year' => null,
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
