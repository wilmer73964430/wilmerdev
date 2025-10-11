<x-layouts.app title="Características">
    <section class="py-24">
        <div class="mx-auto max-w-5xl px-6">
            <h1 class="section-title text-center">Características destacadas</h1>
            <p class="mt-4 text-center text-[#A3F7B5]">Cada módulo está pensado para la automatización, seguridad y compatibilidad con hosting compartido.</p>
            <div class="mt-12 space-y-8">
                @foreach($features['features'] as $feature)
                    <div class="glow-card p-8">
                        <h2 class="text-2xl font-semibold text-[#00FFD1]">{{ $feature['title'] }}</h2>
                        <p class="mt-3 text-[#A3F7B5]">{{ $feature['description'] }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
</x-layouts.app>
