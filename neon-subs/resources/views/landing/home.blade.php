<x-layouts.app>
    <section class="hero-gradient py-24">
        <div class="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 text-center">
            <span class="rounded-full border border-[#00FFD1]/40 px-4 py-1 text-xs uppercase tracking-[0.4em] text-[#00FFD1]">Suscripciones Futuristas</span>
            <h1 class="section-title max-w-3xl">Impulsa tus ingresos recurrentes con un panel verde futurista</h1>
            <p class="max-w-2xl text-lg text-[#A3F7B5]">Neon Subs integra Stripe, PayPal, Mercado Pago e Izipay en una sola plataforma, con facturas fiscales y métricas de MRR listas.</p>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="{{ $hero['cta_primary'] }}" class="btn-primary focus-ring text-base">Comenzar gratis</a>
                <a href="{{ $hero['cta_secondary'] }}" class="btn-outline focus-ring text-base">Ver planes</a>
            </div>
            <img src="{{ asset('images/mockup-dashboard.png') }}" alt="Panel Neon Subs" class="w-full max-w-4xl rounded-3xl border border-[#00E676]/20 shadow-[0_0_60px_rgba(0,255,209,0.25)]" loading="lazy">
        </div>
    </section>

    <section class="py-20">
        <div class="mx-auto max-w-6xl px-6">
            <h2 class="section-title text-center">Beneficios que brillan</h2>
            <p class="mt-3 text-center text-[#A3F7B5]">Automatiza la gestión completa de tus suscripciones con un diseño llamativo y accesible.</p>
            <div class="card-grid mt-12">
                @foreach($benefits as $benefit)
                    <div class="glow-card p-8 transition hover:-translate-y-1">
                        <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#00E676]/10 text-2xl text-[#00E676]">
                            <i class="{{ $benefit['icon'] }}"></i>
                        </div>
                        <h3 class="text-xl font-semibold">{{ $benefit['title'] }}</h3>
                        <p class="mt-3 text-sm text-[#A3F7B5]">{{ $benefit['description'] }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    <section id="precios" class="py-20">
        <div class="mx-auto max-w-6xl px-6">
            <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                    <h2 class="section-title">Planes flexibles</h2>
                    <p class="mt-3 max-w-xl text-[#A3F7B5]">Elige entre ciclos mensuales o anuales. Precios en USD y PEN listos para tus clientes.</p>
                </div>
                <div x-data="{ yearly: false }" class="rounded-full border border-[#00E676]/30 bg-black/40 px-2 py-1">
                    <button @click="yearly=false" :class="!yearly ? 'bg-[#00E676] text-[#0A0F0D]' : 'text-[#A3F7B5]'" class="rounded-full px-4 py-2 text-sm focus-ring">Mensual</button>
                    <button @click="yearly=true" :class="yearly ? 'bg-[#00E676] text-[#0A0F0D]' : 'text-[#A3F7B5]'" class="rounded-full px-4 py-2 text-sm focus-ring">Anual</button>
                </div>
            </div>
            <div class="mt-12 grid gap-8 md:grid-cols-3">
                @foreach($pricing['monthly'] as $plan)
                    <div class="glow-card relative flex flex-col p-8">
                        @if($plan['badge'])
                            <span class="absolute right-6 top-6 rounded-full bg-[#00FFD1]/10 px-4 py-1 text-xs text-[#00FFD1]">{{ $plan['badge'] }}</span>
                        @endif
                        <h3 class="text-2xl font-semibold">{{ $plan['name'] }}</h3>
                        <p class="mt-6 text-4xl font-bold text-[#00E676]">${{ $plan['price'] }}<span class="text-base text-[#A3F7B5]">/{{ __('mes') }}</span></p>
                        <ul class="mt-6 space-y-3 text-sm text-[#A3F7B5]">
                            @foreach($plan['features'] as $feature)
                                <li class="flex items-center gap-3"><i class="ri-checkbox-circle-fill text-[#00E676]"></i>{{ $feature }}</li>
                            @endforeach
                        </ul>
                        <a href="{{ route('register') }}" class="btn-primary mt-8 focus-ring">Elegir plan</a>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    <section class="py-20">
        <div class="mx-auto max-w-5xl px-6">
            <h2 class="section-title text-center">Testimonios</h2>
            <div class="mt-12 grid gap-8 md:grid-cols-2">
                @foreach($testimonials as $testimonial)
                    <figure class="glow-card p-8">
                        <blockquote class="text-lg text-[#A3F7B5]">“{{ $testimonial['quote'] }}”</blockquote>
                        <figcaption class="mt-6 text-sm font-semibold text-[#00FFD1]">{{ $testimonial['name'] }} · {{ $testimonial['role'] }}</figcaption>
                    </figure>
                @endforeach
            </div>
        </div>
    </section>

    <section class="py-20">
        <div class="mx-auto max-w-5xl px-6">
            <h2 class="section-title text-center">Preguntas frecuentes</h2>
            <div class="mt-10 space-y-4">
                @foreach($faqs as $faq)
                    <details class="glow-card group overflow-hidden">
                        <summary class="cursor-pointer px-6 py-4 text-lg font-semibold text-[#00FFD1] focus-ring">{{ $faq['question'] }}</summary>
                        <div class="border-t border-[#00E676]/20 px-6 py-4 text-sm text-[#A3F7B5]">{{ $faq['answer'] }}</div>
                    </details>
                @endforeach
            </div>
        </div>
    </section>
</x-layouts.app>
