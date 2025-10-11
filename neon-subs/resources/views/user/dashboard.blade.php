<x-layouts.app title="Mi panel">
    <section class="py-16">
        <div class="mx-auto max-w-6xl px-6">
            <h1 class="section-title">Bienvenido de nuevo</h1>
            <div class="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div class="glow-card p-6">
                    <p class="text-sm text-[#A3F7B5]">Suscripciones activas</p>
                    <p class="mt-2 text-3xl font-bold text-[#00E676]">{{ $usage['active_subscriptions'] ?? 0 }}</p>
                </div>
                <div class="glow-card p-6">
                    <p class="text-sm text-[#A3F7B5]">Pagos fallidos</p>
                    <p class="mt-2 text-3xl font-bold text-[#00FFD1]">{{ $usage['failed_payments'] ?? 0 }}</p>
                </div>
                <div class="glow-card p-6">
                    <p class="text-sm text-[#A3F7B5]">Tickets abiertos</p>
                    <p class="mt-2 text-3xl font-bold text-[#00FFD1]">{{ $usage['support_tickets_open'] ?? 0 }}</p>
                </div>
                <div class="glow-card p-6">
                    <p class="text-sm text-[#A3F7B5]">Próximo cobro</p>
                    <p class="mt-2 text-3xl font-bold text-[#00E676]">
                        @if($upcomingInvoice)
                            {{ money_format_locale($upcomingInvoice['amount'], $upcomingInvoice['currency']) }}
                        @else
                            —
                        @endif
                    </p>
                </div>
            </div>

            <div class="mt-12 grid gap-6 lg:grid-cols-2">
                <div class="glow-card p-8">
                    <h2 class="text-xl font-semibold text-[#00FFD1]">Suscripciones</h2>
                    <ul class="mt-4 space-y-3 text-sm text-[#A3F7B5]">
                        @forelse($subscriptions as $subscription)
                            <li class="flex items-center justify-between rounded-2xl bg-black/30 px-4 py-3">
                                <span>{{ $subscription['plan'] }} · {{ $subscription['status'] }}</span>
                                <span>{{ optional($subscription['current_period_end'])->format('d M Y') }}</span>
                            </li>
                        @empty
                            <li class="text-center text-[#A3F7B5]">Aún no tienes suscripciones activas.</li>
                        @endforelse
                    </ul>
                </div>
                <div class="glow-card p-8">
                    <h2 class="text-xl font-semibold text-[#00FFD1]">Alertas</h2>
                    <ul class="mt-4 space-y-3 text-sm text-[#A3F7B5]">
                        @forelse($alerts as $alert)
                            <li class="rounded-2xl border border-[#00E676]/30 bg-black/40 px-4 py-3">{{ $alert['message'] }}</li>
                        @empty
                            <li class="text-center text-[#A3F7B5]">No tienes alertas pendientes.</li>
                        @endforelse
                    </ul>
                </div>
            </div>
        </div>
    </section>
</x-layouts.app>
