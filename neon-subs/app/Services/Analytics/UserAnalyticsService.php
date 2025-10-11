<?php

namespace App\Services\Analytics;

use App\Models\User;

class UserAnalyticsService
{
    public function getUsageMetrics(User $user): array
    {
        return [
            'active_subscriptions' => $user->subscriptions()->active()->count(),
            'failed_payments' => $user->payments()->where('status', 'failed')->count(),
            'support_tickets_open' => $user->tickets()->where('estado', 'abierto')->count(),
        ];
    }
}
