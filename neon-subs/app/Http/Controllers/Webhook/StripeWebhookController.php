<?php

namespace App\Http\Controllers\Webhook;

use Illuminate\Http\Request;
use App\Models\WebhookCall;
use App\Services\Payments\PaymentGatewayManager;
use App\Models\Subscription;
use App\Models\Invoice;
use Stripe\Webhook;
use Illuminate\Support\Facades\Log;

class StripeWebhookController extends BaseWebhookController
{
    protected string $provider = 'stripe';

    public function __construct(private PaymentGatewayManager $gatewayManager)
    {
    }

    protected function verifySignature(Request $request): void
    {
        $secret = config('services.stripe.webhook_secret');

        if (! $secret) {
            return;
        }

        try {
            Webhook::constructEvent(
                $request->getContent(),
                $request->header('Stripe-Signature'),
                $secret
            );
        } catch (\UnexpectedValueException|\Stripe\Exception\SignatureVerificationException $exception) {
            abort(400, 'Firma inválida');
        }
    }

    protected function process(WebhookCall $webhook): void
    {
        $event = $webhook->payload;
        $type = $event['type'] ?? 'unknown';

        $gateway = $this->gatewayManager->forProvider('stripe');

        match ($type) {
            'invoice.payment_succeeded' => $this->handleInvoicePaid($event, $gateway),
            'invoice.payment_failed' => $this->handleInvoiceFailed($event, $gateway),
            'customer.subscription.updated' => $this->handleSubscriptionUpdated($event, $gateway),
            default => Log::info('Evento Stripe ignorado', ['type' => $type]),
        };
    }

    private function handleInvoicePaid(array $event, $gateway): void
    {
        if (! isset($event['data']['object']['id'])) {
            return;
        }
        $invoice = Invoice::where('provider_invoice_id', $event['data']['object']['id'])->first();
        if ($invoice) {
            $gateway->handleInvoicePaid($invoice, ['paid_at' => now()]);
        }
    }

    private function handleInvoiceFailed(array $event, $gateway): void
    {
        $invoice = Invoice::where('provider_invoice_id', $event['data']['object']['id'] ?? null)->first();
        if ($invoice) {
            $gateway->handleInvoiceFailed($invoice, ['failed_at' => now()]);
        }
    }

    private function handleSubscriptionUpdated(array $event, $gateway): void
    {
        $subscription = Subscription::where('provider_subscription_id', $event['data']['object']['id'] ?? null)->first();
        if ($subscription) {
            $gateway->syncSubscription($subscription, $event);
        }
    }
}
