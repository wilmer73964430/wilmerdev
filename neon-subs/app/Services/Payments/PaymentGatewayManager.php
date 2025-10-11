<?php

namespace App\Services\Payments;

use Illuminate\Contracts\Container\Container;
use InvalidArgumentException;

class PaymentGatewayManager
{
    /**
     * @param  array<string,class-string<PaymentProviderInterface>>  $providers
     */
    public function __construct(
        private Container $container,
        private array $providers
    ) {
    }

    public function forProvider(string $provider): PaymentProviderInterface
    {
        if (! array_key_exists($provider, $this->providers)) {
            throw new InvalidArgumentException("Proveedor de pago {$provider} no soportado");
        }

        return $this->container->make($this->providers[$provider]);
    }
}
