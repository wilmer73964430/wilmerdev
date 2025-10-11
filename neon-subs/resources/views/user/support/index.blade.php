<x-layouts.app title="Soporte">
    <section class="py-16">
        <div class="mx-auto max-w-4xl px-6">
            <h1 class="section-title text-3xl">Centro de soporte</h1>
            <p class="mt-2 text-sm text-[#A3F7B5]">Crea tickets y revisa respuestas del equipo.</p>

            <form method="POST" action="{{ route('user.support.store') }}" class="glow-card mt-8 space-y-4 p-6">
                @csrf
                <div>
                    <label class="text-xs uppercase text-[#A3F7B5]">Asunto</label>
                    <input type="text" name="asunto" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm" required>
                </div>
                <div>
                    <label class="text-xs uppercase text-[#A3F7B5]">Mensaje</label>
                    <textarea name="mensaje" rows="4" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm" required></textarea>
                </div>
                <button type="submit" class="btn-primary focus-ring">Enviar</button>
            </form>

            <div class="mt-8 space-y-4">
                @foreach($tickets as $ticket)
                    <article class="glow-card p-6 text-sm text-[#A3F7B5]">
                        <div class="flex items-center justify-between">
                            <h2 class="text-lg font-semibold text-[#00FFD1]">{{ $ticket->asunto }}</h2>
                            <span class="rounded-full bg-[#00E676]/10 px-3 py-1 text-xs text-[#00E676]">{{ ucfirst($ticket->estado) }}</span>
                        </div>
                        <p class="mt-3">{{ $ticket->mensaje }}</p>
                        @if($ticket->respuesta_admin)
                            <div class="mt-4 rounded-2xl border border-[#00FFD1]/30 bg-black/30 p-4 text-[#00FFD1]">
                                <strong>Respuesta:</strong> {{ $ticket->respuesta_admin }}
                            </div>
                        @endif
                    </article>
                @endforeach
            </div>
            <div class="mt-6">{{ $tickets->links() }}</div>
        </div>
    </section>
</x-layouts.app>
