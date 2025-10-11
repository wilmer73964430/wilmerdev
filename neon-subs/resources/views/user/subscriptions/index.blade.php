<x-layouts.app title="Mis suscripciones">
    <section class="py-16">
        <div class="mx-auto max-w-6xl px-6">
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 class="section-title text-3xl">Suscripciones</h1>
                    <p class="text-sm text-[#A3F7B5]">Gestiona tus planes activos, aplica cupones y cambia de ciclo cuando quieras.</p>
                </div>
                <form method="POST" action="{{ route('user.subscriptions.store') }}" class="glow-card flex flex-col gap-3 p-4 md:flex-row md:items-center">
                    @csrf
                    <div>
                        <label class="text-xs uppercase text-[#A3F7B5]">Plan</label>
                        <select name="plan_id" class="focus-ring mt-1 rounded-xl border border-[#00E676]/30 bg-black/40 px-4 py-2 text-sm">
                            @foreach($plans as $plan)
                                <option value="{{ $plan->id }}">{{ $plan->name }} - {{ money_format_locale($plan->price, $plan->currency) }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div>
                        <label class="text-xs uppercase text-[#A3F7B5]">Proveedor</label>
                        <select name="provider" class="focus-ring mt-1 rounded-xl border border-[#00E676]/30 bg-black/40 px-4 py-2 text-sm">
                            <option value="stripe">Stripe</option>
                            <option value="paypal">PayPal</option>
                            <option value="mercadopago">Mercado Pago</option>
                            <option value="izipay">Izipay</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-xs uppercase text-[#A3F7B5]">Cupón</label>
                        <input type="text" name="coupon_code" class="focus-ring mt-1 rounded-xl border border-[#00E676]/30 bg-black/40 px-4 py-2 text-sm" placeholder="Opcional">
                    </div>
                    <button type="submit" class="btn-primary focus-ring">Crear suscripción</button>
                </form>
            </div>

            <div class="mt-10 overflow-hidden rounded-3xl border border-[#00E676]/20">
                <table class="min-w-full divide-y divide-[#00E676]/10 text-sm">
                    <thead class="bg-black/40 text-[#A3F7B5]">
                        <tr>
                            <th class="px-6 py-3 text-left">Plan</th>
                            <th class="px-6 py-3 text-left">Estado</th>
                            <th class="px-6 py-3 text-left">Próximo corte</th>
                            <th class="px-6 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-[#00E676]/10 bg-black/20">
                        @foreach($subscriptions as $subscription)
                            <tr>
                                <td class="px-6 py-4">{{ $subscription->plan->name }}</td>
                                <td class="px-6 py-4 capitalize">{{ __($subscription->status) }}</td>
                                <td class="px-6 py-4">{{ optional($subscription->current_period_end)->format('d M Y') }}</td>
                                <td class="px-6 py-4">
                                    <form method="POST" action="{{ route('user.subscriptions.destroy', $subscription) }}" onsubmit="return confirm('¿Cancelar al final del periodo?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-sm text-red-400 hover:underline">Cancelar</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="border-t border-[#00E676]/10 bg-black/40 px-6 py-3">{{ $subscriptions->links() }}</div>
            </div>
        </div>
    </section>
</x-layouts.app>
