<?php

namespace App\Services\Payments;

use App\Models\User;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\Invoice;
use App\Models\PaymentMethod;
use App\Support\Izipay\SignatureGenerator;
use Illuminate\Support\Facades\Http;

class IzipayPaymentProvider implements PaymentProviderInterface
{
    public function __construct(private SignatureGenerator $signatureGenerator)
    {
    }

    public function createSubscriptionCheckout(User $user, Plan $plan, ?string $couponCode = null): object
    {
        $payload = [
            'amount' => $plan->price * 100,
            'currency' => $plan->currency,
            'orderId' => uniqid('izi_'),
            'customer' => [
                'email' => $user->email,
                'id' => $user->id,
            ],
        ];
        $signature = $this->signatureGenerator->make($payload);

        $response = Http::withHeaders([
            'Authorization' => $signature,
        ])->post(config('services.izipay.base_uri').'/checkout', $payload);

        return (object) [
            'redirect_url' => $response->json('redirectUrl'),
        ];
    }

    public function syncSubscription(Subscription $subscription, array $payload): void
    {
        // Mapear notificaciones Izipay a estados internos.
    }

    public function switchPlan(Subscription $subscription, Plan $newPlan, bool $prorate): void
    {
        // Solicitud REST para actualizar monto recurrente.
    }

    public function cancelSubscription(Subscription $subscription): void
    {
        // Cancelación vía API Izipay.
    }

    public function addPaymentMethod(User $user, array $payload): PaymentMethod
    {
        return new PaymentMethod([
            'user_id' => $user->id,
            'provider' => 'izipay',
            'provider_customer_id' => $payload['customer_id'] ?? null,
            'provider_pm_id' => $payload['token'] ?? null,
            'brand' => $payload['brand'] ?? 'izipay',
            'last4' => $payload['last4'] ?? '0000',
            'exp_month' => $payload['exp_month'] ?? null,
            'exp_year' => $payload['exp_year'] ?? null,
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
