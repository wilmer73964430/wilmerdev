<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use App\Services\Landing\LandingContentService;

class LandingController extends Controller
{
    public function __construct(private LandingContentService $contentService)
    {
    }

    public function index(): View
    {
        $content = $this->contentService->getLandingContent();

        return view('landing.home', $content);
    }

    public function features(): View
    {
        return view('landing.features', $this->contentService->getFeaturesContent());
    }

    public function contact(): View
    {
        return view('landing.contact');
    }
}
