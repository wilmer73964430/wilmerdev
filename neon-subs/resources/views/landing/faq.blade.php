<x-layouts.app title="Preguntas frecuentes">
    <section class="py-24">
        <div class="mx-auto max-w-4xl px-6">
            <h1 class="section-title text-center">Resolvemos tus dudas</h1>
            <div class="mt-10 space-y-4">
                @foreach($faqs as $faq)
                    <details class="glow-card">
                        <summary class="cursor-pointer px-6 py-4 text-lg font-semibold text-[#00FFD1] focus-ring">{{ $faq['question'] }}</summary>
                        <div class="border-t border-[#00E676]/20 px-6 py-4 text-sm text-[#A3F7B5]">{{ $faq['answer'] }}</div>
                    </details>
                @endforeach
            </div>
        </div>
    </section>
</x-layouts.app>
