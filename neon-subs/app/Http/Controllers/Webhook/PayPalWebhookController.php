<?php

namespace App\Http\Controllers\Webhook;

use Illuminate\Http\Request;
use App\Models\WebhookCall;
use App\Services\Payments\PaymentGatewayManager;
use App\Models\Invoice;
use App\Models\Subscription;
use Illuminate\Support\Facades\Log;

class PayPalWebhookController extends BaseWebhookController
{
    protected string $provider = 'paypal';

    public function __construct(private PaymentGatewayManager $gatewayManager)
    {
    }

    protected function verifySignature(Request $request): void
    {
        // Validación básica usando cabeceras; la verificación completa requiere API PayPal.
        if (! $request->header('PayPal-Transmission-Id')) {
            abort(400, 'Cabecera inválida');
        }
    }

    protected function process(WebhookCall $webhook): void
    {
        $event = $webhook->payload;
        $eventType = $event['event_type'] ?? 'unknown';
        $gateway = $this->gatewayManager->forProvider('paypal');

        match ($eventType) {
            'PAYMENT.SALE.COMPLETED' => $this->handleSaleCompleted($event, $gateway),
            'PAYMENT.SALE.DENIED' => $this->handleSaleDenied($event, $gateway),
            'BILLING.SUBSCRIPTION.CANCELLED' => $this->handleSubscriptionCanceled($event, $gateway),
            default => Log::info('Evento PayPal ignorado', ['event_type' => $eventType]),
        };
    }

    private function handleSaleCompleted(array $event, $gateway): void
    {
        $invoice = Invoice::where('provider_invoice_id', data_get($event, 'resource.billing_agreement_id'))->first();
        if ($invoice) {
            $gateway->handleInvoicePaid($invoice, ['paid_at' => now()]);
        }
    }

    private function handleSaleDenied(array $event, $gateway): void
    {
        $invoice = Invoice::where('provider_invoice_id', data_get($event, 'resource.billing_agreement_id'))->first();
        if ($invoice) {
            $gateway->handleInvoiceFailed($invoice, ['failed_at' => now()]);
        }
    }

    private function handleSubscriptionCanceled(array $event, $gateway): void
    {
        $subscription = Subscription::where('provider_subscription_id', data_get($event, 'resource.id'))->first();
        if ($subscription) {
            $gateway->cancelSubscription($subscription);
        }
    }
}
