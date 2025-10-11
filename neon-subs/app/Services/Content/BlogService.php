<?php

namespace App\Services\Content;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;
use Illuminate\Support\Collection;

class BlogService
{
    public function paginatePosts(int $page = 1): LengthAwarePaginator
    {
        $collection = Collection::make(config('blog.posts', []));

        $perPage = 6;
        $items = $collection->forPage($page, $perPage);

        return new Paginator(
            $items,
            $collection->count(),
            $perPage,
            $page,
            [
                'path' => route('blog.index'),
            ]
        );
    }

    public function getPostBySlug(string $slug): array
    {
        $post = collect(config('blog.posts', []))->firstWhere('slug', $slug);

        abort_if(is_null($post), 404);

        return $post;
    }
}
