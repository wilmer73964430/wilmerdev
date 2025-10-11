<x-layouts.app title="Admin - Dashboard">
    <section class="py-16">
        <div class="mx-auto max-w-6xl px-6">
            <h1 class="section-title text-3xl">Métricas</h1>
            <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div class="glow-card p-6">
                    <p class="text-sm text-[#A3F7B5]">MRR</p>
                    <p class="mt-2 text-3xl font-bold text-[#00E676]">{{ money_format_locale($mrr ?? 0, 'USD') }}</p>
                </div>
                <div class="glow-card p-6">
                    <p class="text-sm text-[#A3F7B5]">ARR</p>
                    <p class="mt-2 text-3xl font-bold text-[#00FFD1]">{{ money_format_locale($arr ?? 0, 'USD') }}</p>
                </div>
                <div class="glow-card p-6">
                    <p class="text-sm text-[#A3F7B5]">Churn</p>
                    <p class="mt-2 text-3xl font-bold text-[#00FFD1]">{{ $churn ?? 0 }}%</p>
                </div>
                <div class="glow-card p-6">
                    <p class="text-sm text-[#A3F7B5]">LTV estimado</p>
                    <p class="mt-2 text-3xl font-bold text-[#00E676]">{{ money_format_locale($ltv ?? 0, 'USD') }}</p>
                </div>
                <div class="glow-card p-6">
                    <p class="text-sm text-[#A3F7B5]">Suscripciones activas</p>
                    <p class="mt-2 text-3xl font-bold text-[#00FFD1]">{{ $activeSubscriptions ?? 0 }}</p>
                </div>
            </div>

            <div class="mt-12 glow-card p-8">
                <h2 class="text-xl font-semibold text-[#00FFD1]">Ingresos por pasarela</h2>
                <div class="mt-4 space-y-2 text-sm text-[#A3F7B5]">
                    @foreach($paymentsByProvider as $provider => $total)
                        <div class="flex items-center justify-between">
                            <span class="uppercase tracking-wide">{{ $provider }}</span>
                            <span>{{ money_format_locale($total, 'USD') }}</span>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>
</x-layouts.app>
