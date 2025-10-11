<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Payments\PaymentGatewayManager;
use PayPalCheckoutSdk\Core\PayPalHttpClient;
use PayPalCheckoutSdk\Core\ProductionEnvironment;
use PayPalCheckoutSdk\Core\SandboxEnvironment;
use Stripe\StripeClient;
use Illuminate\Pagination\Paginator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(PaymentGatewayManager::class, function ($app) {
            return new PaymentGatewayManager($app, config('payments.providers', []));
        });

        $this->app->singleton(StripeClient::class, function () {
            return new StripeClient(config('services.stripe.secret'));
        });

        $this->app->singleton(PayPalHttpClient::class, function () {
            $environment = config('services.paypal.mode', 'sandbox') === 'production'
                ? new ProductionEnvironment(
                    config('services.paypal.client_id'),
                    config('services.paypal.client_secret')
                )
                : new SandboxEnvironment(
                    config('services.paypal.client_id'),
                    config('services.paypal.client_secret')
                );

            return new PayPalHttpClient($environment);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Paginator::useTailwind();
    }
}
