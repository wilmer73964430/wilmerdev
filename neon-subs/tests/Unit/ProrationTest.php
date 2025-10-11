<?php

use App\Services\Billing\SubscriptionService;
use Carbon\Carbon;

it('calculates proration amounts', function () {
    $service = new SubscriptionService();
    $periodEnd = Carbon::parse('2024-02-01');
    $changeDate = Carbon::parse('2024-01-15');

    $amount = $service->calculateProration(100, $periodEnd, $changeDate);

    expect($amount)->toBeFloat()->toBeGreaterThan(0);
});
