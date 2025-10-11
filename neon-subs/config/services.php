<?php

return [
    'stripe' => [
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
        'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
    ],
    'paypal' => [
        'client_id' => env('PAYPAL_CLIENT_ID'),
        'client_secret' => env('PAYPAL_CLIENT_SECRET'),
        'mode' => env('PAYPAL_MODE', 'sandbox'),
        'webhook_id' => env('PAYPAL_WEBHOOK_ID'),
    ],
    'mercadopago' => [
        'access_token' => env('MERCADOPAGO_ACCESS_TOKEN'),
        'public_key' => env('MERCADOPAGO_PUBLIC_KEY'),
    ],
    'izipay' => [
        'merchant_id' => env('IZIPAY_MERCHANT_ID'),
        'api_key' => env('IZIPAY_API_KEY'),
        'username' => env('IZIPAY_USERNAME'),
        'password' => env('IZIPAY_PASSWORD'),
        'env' => env('IZIPAY_ENV', 'sandbox'),
        'base_uri' => env('IZIPAY_BASE_URI', 'https://sandbox.izipay.pe/api'),
    ],
];
