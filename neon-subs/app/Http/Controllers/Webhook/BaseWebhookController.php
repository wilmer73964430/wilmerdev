<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\WebhookCall;
use Illuminate\Support\Facades\Log;

abstract class BaseWebhookController extends Controller
{
    protected string $provider;

    public function handle(Request $request): Response
    {
        $this->verifySignature($request);

        $webhook = WebhookCall::create([
            'provider' => $this->provider,
            'event_type' => $request->input('type', 'unknown'),
            'signature' => $request->header('X-Signature', ''),
            'payload' => $request->all(),
        ]);

        $this->process($webhook);

        return response()->noContent();
    }

    abstract protected function verifySignature(Request $request): void;

    abstract protected function process(WebhookCall $webhook): void;
}
