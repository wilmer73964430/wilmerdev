<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;
use App\Services\Analytics\AdminAnalyticsService;

class DashboardController extends Controller
{
    public function __construct(private AdminAnalyticsService $analyticsService)
    {
    }

    public function index(): View
    {
        return view('admin.dashboard', $this->analyticsService->getDashboardMetrics());
    }
}
