<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use App\Services\Content\BlogService;

class BlogController extends Controller
{
    public function __construct(private BlogService $blogService)
    {
    }

    public function index(Request $request): View
    {
        $posts = $this->blogService->paginatePosts($request->query('page', 1));

        return view('landing.blog.index', [
            'posts' => $posts,
        ]);
    }

    public function show(string $slug): View
    {
        return view('landing.blog.show', [
            'post' => $this->blogService->getPostBySlug($slug),
        ]);
    }
}
