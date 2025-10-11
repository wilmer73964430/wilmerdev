<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use App\Services\Landing\LandingContentService;

class PricingController extends Controller
{
    public function __construct(private LandingContentService $contentService)
    {
    }

    public function index(): View
    {
        $content = $this->contentService->getLandingContent();

        return view('landing.pricing', [
            'pricing' => $content['pricing'],
        ]);
    }
}
