<x-layouts.app title="Blog">
    <section class="py-24">
        <div class="mx-auto max-w-5xl px-6">
            <h1 class="section-title text-center">Insights NEON</h1>
            <p class="mt-4 text-center text-[#A3F7B5]">Tutoriales, comparativas y novedades del ecosistema de pagos.</p>
            <div class="mt-12 space-y-8">
                @foreach($posts as $post)
                    <article class="glow-card p-8">
                        <h2 class="text-2xl font-semibold text-[#00FFD1]"><a href="{{ route('blog.show', $post['slug']) }}" class="hover:underline">{{ $post['title'] }}</a></h2>
                        <p class="mt-2 text-sm text-[#A3F7B5]">{{ $post['excerpt'] }}</p>
                        <div class="mt-4 flex items-center justify-between text-xs text-[#A3F7B5]">
                            <span>{{ $post['author'] }}</span>
                            <span>{{ \Illuminate\Support\Carbon::parse($post['published_at'])->translatedFormat('d M Y') }}</span>
                        </div>
                    </article>
                @endforeach
            </div>
            <div class="mt-10">
                {{ $posts->links() }}
            </div>
        </div>
    </section>
</x-layouts.app>
