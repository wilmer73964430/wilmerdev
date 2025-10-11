<x-layouts.app :title="$post['title']">
    <section class="py-24">
        <div class="mx-auto max-w-3xl px-6">
            <a href="{{ route('blog.index') }}" class="text-sm text-[#00FFD1] hover:underline">← Volver al blog</a>
            <h1 class="mt-4 text-4xl font-bold">{{ $post['title'] }}</h1>
            <div class="mt-2 text-sm text-[#A3F7B5]">{{ $post['author'] }} · {{ \Illuminate\Support\Carbon::parse($post['published_at'])->translatedFormat('d M Y') }}</div>
            <div class="prose mt-8 max-w-none prose-invert">
                {!! nl2br(e($post['content'])) !!}
            </div>
        </div>
    </section>
</x-layouts.app>
