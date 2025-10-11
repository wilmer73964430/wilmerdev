<?php

use App\Services\Payments\StripePaymentProvider;
use App\Services\Payments\PayPalPaymentProvider;
use App\Services\Payments\MercadoPagoPaymentProvider;
use App\Services\Payments\IzipayPaymentProvider;

return [
    'providers' => [
        'stripe' => StripePaymentProvider::class,
        'paypal' => PayPalPaymentProvider::class,
        'mercadopago' => MercadoPagoPaymentProvider::class,
        'izipay' => IzipayPaymentProvider::class,
    ],
];
