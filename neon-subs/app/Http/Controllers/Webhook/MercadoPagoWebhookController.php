<?php

namespace App\Http\Controllers\Webhook;

use Illuminate\Http\Request;
use App\Models\WebhookCall;
use App\Services\Payments\PaymentGatewayManager;
use App\Models\Invoice;
use Illuminate\Support\Facades\Log;

class MercadoPagoWebhookController extends BaseWebhookController
{
    protected string $provider = 'mercadopago';

    public function __construct(private PaymentGatewayManager $gatewayManager)
    {
    }

    protected function verifySignature(Request $request): void
    {
        if (! $request->header('X-Hub-Signature')) {
            abort(400, 'Firma requerida');
        }
    }

    protected function process(WebhookCall $webhook): void
    {
        $topic = $webhook->payload['type'] ?? null;
        $gateway = $this->gatewayManager->forProvider('mercadopago');

        if ($topic === 'payment') {
            $invoice = Invoice::where('provider_invoice_id', $webhook->payload['data']['id'] ?? null)->first();

            if ($invoice) {
                $status = $webhook->payload['data']['status'] ?? 'pending';
                if ($status === 'approved') {
                    $gateway->handleInvoicePaid($invoice, ['paid_at' => now()]);
                } elseif (in_array($status, ['rejected', 'cancelled'])) {
                    $gateway->handleInvoiceFailed($invoice, ['failed_at' => now()]);
                }
            }
        } else {
            Log::info('Webhook Mercado Pago ignorado', ['payload' => $webhook->payload]);
        }
    }
}
