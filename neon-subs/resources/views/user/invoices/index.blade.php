<x-layouts.app title="Facturas">
    <section class="py-16">
        <div class="mx-auto max-w-5xl px-6">
            <h1 class="section-title text-3xl">Facturas y recibos</h1>
            <p class="mt-2 text-sm text-[#A3F7B5]">Descarga tus comprobantes con desglose de impuestos y descuentos.</p>
            <div class="mt-8 overflow-hidden rounded-3xl border border-[#00E676]/20">
                <table class="min-w-full divide-y divide-[#00E676]/10 text-sm">
                    <thead class="bg-black/40 text-[#A3F7B5]">
                        <tr>
                            <th class="px-6 py-3 text-left">Fecha</th>
                            <th class="px-6 py-3 text-left">Monto</th>
                            <th class="px-6 py-3 text-left">Estado</th>
                            <th class="px-6 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-[#00E676]/10 bg-black/20">
                        @foreach($invoices as $invoice)
                            <tr>
                                <td class="px-6 py-4">{{ optional($invoice->issued_at)->format('d M Y') }}</td>
                                <td class="px-6 py-4">{{ money_format_locale($invoice->amount_total, $invoice->currency) }}</td>
                                <td class="px-6 py-4 capitalize">{{ __($invoice->status) }}</td>
                                <td class="px-6 py-4 space-x-3">
                                    <a href="{{ route('user.invoices.show', $invoice) }}" class="text-[#00FFD1] hover:underline">Ver</a>
                                    <a href="{{ route('user.invoices.download', $invoice) }}" class="text-[#00E676] hover:underline">Descargar PDF</a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="border-t border-[#00E676]/10 bg-black/40 px-6 py-3">{{ $invoices->links() }}</div>
            </div>
        </div>
    </section>
</x-layouts.app>
