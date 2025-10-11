<x-layouts.app :title="'Factura #'.$invoice->id">
    <section class="py-16">
        <div class="mx-auto max-w-3xl space-y-6 px-6">
            <a href="{{ route('user.invoices') }}" class="text-sm text-[#00FFD1] hover:underline">← Volver</a>
            <div class="glow-card space-y-4 p-8 text-sm text-[#A3F7B5]">
                <h1 class="text-2xl font-semibold text-[#00FFD1]">Factura #{{ $invoice->id }}</h1>
                <p><strong>Estado:</strong> {{ __($invoice->status) }}</p>
                <p><strong>Total:</strong> {{ money_format_locale($invoice->amount_total, $invoice->currency) }}</p>
                <p><strong>Subtotal:</strong> {{ money_format_locale($invoice->amount_subtotal, $invoice->currency) }}</p>
                <p><strong>Impuestos:</strong> {{ money_format_locale($invoice->tax_amount, $invoice->currency) }}</p>
                <p><strong>Descuentos:</strong> {{ money_format_locale($invoice->discount_amount, $invoice->currency) }}</p>
                <p><strong>Emitida:</strong> {{ optional($invoice->issued_at)->format('d M Y H:i') }}</p>
                <a href="{{ route('user.invoices.download', $invoice) }}" class="btn-primary focus-ring">Descargar PDF</a>
            </div>
        </div>
    </section>
</x-layouts.app>
