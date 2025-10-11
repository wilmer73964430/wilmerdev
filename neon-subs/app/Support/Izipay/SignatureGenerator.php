<?php

namespace App\Support\Izipay;

class SignatureGenerator
{
    public function make(array $payload): string
    {
        $secret = config('services.izipay.api_key');
        $json = json_encode($payload, JSON_UNESCAPED_SLASHES);

        return base64_encode(hash_hmac('sha256', $json, $secret, true));
    }
}
