<?php

namespace App\Services\Analytics;

use App\Models\Subscription;
use App\Models\Invoice;
use App\Models\Payment;

class AdminAnalyticsService
{
    public function getDashboardMetrics(): array
    {
        $monthlyRevenue = Invoice::whereBetween('issued_at', [now()->startOfMonth(), now()->endOfMonth()])
            ->where('status', 'paid')
            ->sum('amount_total');

        $annualRevenue = Invoice::whereBetween('issued_at', [now()->startOfYear(), now()->endOfYear()])
            ->where('status', 'paid')
            ->sum('amount_total');

        return [
            'mrr' => $monthlyRevenue,
            'arr' => $annualRevenue,
            'churn' => $this->calculateChurnRate(),
            'ltv' => $this->estimateLtv(),
            'activeSubscriptions' => Subscription::where('status', 'active')->count(),
            'paymentsByProvider' => Payment::selectRaw('provider, SUM(amount) as total')
                ->where('status', 'paid')
                ->groupBy('provider')
                ->pluck('total', 'provider')
                ->toArray(),
        ];
    }

    private function calculateChurnRate(): float
    {
        $canceled = Subscription::where('status', 'canceled')
            ->whereBetween('updated_at', [now()->startOfMonth(), now()->endOfMonth()])
            ->count();

        $activeStart = Subscription::where('status', 'active')
            ->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()])
            ->count();

        return $activeStart === 0 ? 0.0 : round(($canceled / $activeStart) * 100, 2);
    }

    private function estimateLtv(): float
    {
        $arpu = Invoice::where('status', 'paid')->avg('amount_total');
        $churnRate = max($this->calculateChurnRate(), 0.01);

        return round(($arpu ?? 0) / ($churnRate / 100), 2);
    }
}
