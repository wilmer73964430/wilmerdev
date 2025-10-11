<?php

namespace App\Services\Billing;

use App\Models\User;
use App\Models\Subscription;
use Illuminate\Support\Carbon;

class SubscriptionService
{
    public function getUserSubscriptionsSummary(User $user): array
    {
        return $user->subscriptions
            ->map(fn (Subscription $subscription) => [
                'id' => $subscription->id,
                'plan' => $subscription->plan->name,
                'status' => $subscription->status,
                'current_period_end' => $subscription->current_period_end,
                'cancel_at_period_end' => $subscription->cancel_at_period_end,
            ])->toArray();
    }

    public function getUpcomingInvoice(User $user): ?array
    {
        $invoice = $user->invoices()->where('status', 'pending')->orderBy('issued_at')->first();

        if (! $invoice) {
            return null;
        }

        return [
            'id' => $invoice->id,
            'amount' => $invoice->amount_total,
            'currency' => $invoice->currency,
            'due_date' => $invoice->issued_at?->copy()->addDays(7),
        ];
    }

    public function getBillingAlerts(User $user): array
    {
        return $user->subscriptions
            ->filter(fn (Subscription $subscription) => in_array($subscription->status, ['past_due', 'incomplete']))
            ->map(fn (Subscription $subscription) => [
                'message' => trans('messages.subscription_issue', ['plan' => $subscription->plan->name]),
                'subscription_id' => $subscription->id,
            ])->values()->toArray();
    }

    public function calculateProration(float $currentAmount, Carbon $periodEnd, Carbon $changeDate): float
    {
        $daysRemaining = $changeDate->diffInDays($periodEnd, false);

        if ($daysRemaining <= 0) {
            return 0.0;
        }

        $periodLength = $periodEnd->copy()->subMonth()->diffInDays($periodEnd);

        if ($periodLength === 0) {
            return 0.0;
        }

        return round(($currentAmount / $periodLength) * $daysRemaining, 2);
    }

    public function cancelAtPeriodEnd(Subscription $subscription): void
    {
        $subscription->update([
            'cancel_at_period_end' => true,
        ]);
    }
}
