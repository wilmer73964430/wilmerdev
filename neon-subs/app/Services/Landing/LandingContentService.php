<?php

namespace App\Services\Landing;

use Illuminate\Contracts\Cache\Repository as CacheRepository;

class LandingContentService
{
    public function __construct(private CacheRepository $cache)
    {
    }

    public function getLandingContent(): array
    {
        return $this->cache->remember('landing.home', now()->addHour(), function () {
            return [
                'hero' => [
                    'title' => 'Gestiona tus suscripciones con energía NEON',
                    'subtitle' => 'Automatiza cobros, facturación y soporte en un panel futurista.',
                    'cta_primary' => route('register'),
                    'cta_secondary' => route('pricing'),
                ],
                'benefits' => config('landing.benefits'),
                'testimonials' => config('landing.testimonials'),
                'pricing' => config('landing.pricing'),
                'faqs' => config('landing.faqs'),
            ];
        });
    }

    public function getFeaturesContent(): array
    {
        return $this->cache->remember('landing.features', now()->addHours(6), fn () => [
            'features' => config('landing.features'),
        ]);
    }
}
