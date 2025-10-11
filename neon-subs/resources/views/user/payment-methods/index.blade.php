<x-layouts.app title="Métodos de pago">
    <section class="py-16">
        <div class="mx-auto max-w-4xl px-6">
            <h1 class="section-title text-3xl">Métodos de pago</h1>
            <p class="mt-2 text-sm text-[#A3F7B5]">Los datos sensibles nunca se almacenan en Neon Subs, usamos tokens seguros de cada pasarela.</p>

            <form method="POST" action="{{ route('metodos-pago.store') }}" class="glow-card mt-8 space-y-4 p-6">
                @csrf
                <div class="grid gap-4 md:grid-cols-2">
                    <div>
                        <label class="text-xs uppercase text-[#A3F7B5]">Proveedor</label>
                        <select name="provider" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/40 px-4 py-2 text-sm">
                            <option value="stripe">Stripe</option>
                            <option value="paypal">PayPal</option>
                            <option value="mercadopago">Mercado Pago</option>
                            <option value="izipay">Izipay</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-xs uppercase text-[#A3F7B5]">Token / Payload</label>
                        <input type="text" name="payload[token]" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/40 px-4 py-2 text-sm" placeholder="Token seguro de la pasarela">
                    </div>
                </div>
                <label class="inline-flex items-center gap-2 text-sm text-[#A3F7B5]">
                    <input type="checkbox" name="is_default" value="1" class="rounded border-[#00E676]/50 bg-black/40 text-[#00E676]">
                    Establecer como predeterminado
                </label>
                <button type="submit" class="btn-primary focus-ring">Guardar método</button>
            </form>

            <div class="mt-8 space-y-4">
                @foreach($methods as $method)
                    <div class="glow-card flex items-center justify-between p-6 text-sm text-[#A3F7B5]">
                        <div>
                            <div class="font-semibold text-[#00FFD1]">{{ strtoupper($method->provider) }}</div>
                            <div>**** {{ $method->last4 }} · {{ $method->brand }}</div>
                        </div>
                        <div class="flex items-center gap-3">
                            @if($method->is_default)
                                <span class="rounded-full bg-[#00E676]/10 px-3 py-1 text-xs text-[#00E676]">Predeterminado</span>
                            @endif
                            <form method="POST" action="{{ route('metodos-pago.destroy', $method) }}">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-400 hover:underline">Eliminar</button>
                            </form>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
</x-layouts.app>
