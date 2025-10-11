<x-layouts.app title="Planes y precios">
    <section class="py-24">
        <div class="mx-auto max-w-6xl px-6">
            <h1 class="section-title text-center">Planes pensados para tu SaaS</h1>
            <p class="mt-4 text-center text-[#A3F7B5]">Activa pagos en USD y PEN, con pruebas gratuitas y cupones desde el panel admin.</p>
            <div class="mt-12 grid gap-8 md:grid-cols-3">
                @foreach($pricing['monthly'] as $plan)
                    <div class="glow-card p-8">
                        <h2 class="text-2xl font-semibold text-[#00FFD1]">{{ $plan['name'] }}</h2>
                        <p class="mt-2 text-sm text-[#A3F7B5]">{{ $plan['description'] ?? 'Plan completo con soporte premium.' }}</p>
                        <p class="mt-6 text-4xl font-bold text-[#00E676]">${{ $plan['price'] }} <span class="text-base text-[#A3F7B5]">/mes</span></p>
                        <ul class="mt-6 space-y-3 text-sm text-[#A3F7B5]">
                            @foreach($plan['features'] as $feature)
                                <li class="flex items-center gap-3"><i class="ri-flashlight-fill text-[#00E676]"></i>{{ $feature }}</li>
                            @endforeach
                        </ul>
                        <a href="{{ route('register') }}" class="btn-primary mt-8 focus-ring">Elegir plan</a>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
</x-layouts.app>
