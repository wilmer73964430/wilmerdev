<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;
use App\Services\Billing\SubscriptionService;
use App\Services\Analytics\UserAnalyticsService;

class DashboardController extends Controller
{
    public function __construct(
        private SubscriptionService $subscriptionService,
        private UserAnalyticsService $analyticsService
    ) {
    }

    public function index(): View
    {
        $user = Auth::user();

        return view('user.dashboard', [
            'subscriptions' => $this->subscriptionService->getUserSubscriptionsSummary($user),
            'upcomingInvoice' => $this->subscriptionService->getUpcomingInvoice($user),
            'alerts' => $this->subscriptionService->getBillingAlerts($user),
            'usage' => $this->analyticsService->getUsageMetrics($user),
        ]);
    }
}
