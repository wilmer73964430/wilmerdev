<?php

namespace App\Http\Controllers\Webhook;

use Illuminate\Http\Request;
use App\Models\WebhookCall;
use App\Services\Payments\PaymentGatewayManager;
use App\Models\Invoice;
use App\Models\Subscription;
use App\Support\Izipay\SignatureGenerator;
use Illuminate\Support\Facades\Log;

class IzipayWebhookController extends BaseWebhookController
{
    protected string $provider = 'izipay';

    public function __construct(
        private PaymentGatewayManager $gatewayManager,
        private SignatureGenerator $signatureGenerator
    ) {
    }

    protected function verifySignature(Request $request): void
    {
        $payload = $request->all();
        $provided = $request->header('X-Izipay-Signature');
        $expected = $this->signatureGenerator->make($payload);

        if (! hash_equals($expected, (string) $provided)) {
            abort(400, 'Firma inválida');
        }
    }

    protected function process(WebhookCall $webhook): void
    {
        $event = $webhook->payload;
        $gateway = $this->gatewayManager->forProvider('izipay');
        $status = $event['status'] ?? 'pending';

        if ($status === 'paid') {
            $invoice = Invoice::where('provider_invoice_id', $event['invoice_id'] ?? null)->first();
            if ($invoice) {
                $gateway->handleInvoicePaid($invoice, ['paid_at' => now()]);
            }
        } elseif ($status === 'failed') {
            $invoice = Invoice::where('provider_invoice_id', $event['invoice_id'] ?? null)->first();
            if ($invoice) {
                $gateway->handleInvoiceFailed($invoice, ['failed_at' => now()]);
            }
        } elseif ($status === 'canceled') {
            $subscription = Subscription::where('provider_subscription_id', $event['subscription_id'] ?? null)->first();
            if ($subscription) {
                $gateway->cancelSubscription($subscription);
            }
        } else {
            Log::info('Evento Izipay ignorado', ['status' => $status]);
        }
    }
}
