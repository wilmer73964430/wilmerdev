<x-layouts.app title="Contacto">
    <section class="py-24">
        <div class="mx-auto max-w-4xl px-6">
            <h1 class="section-title text-center">Conversemos</h1>
            <p class="mt-4 text-center text-[#A3F7B5]">Completa el formulario y nuestro equipo te responderá en menos de 24 horas.</p>
            <form class="glow-card mt-10 space-y-6 p-8">
                <div>
                    <label class="block text-sm font-semibold text-[#00FFD1]" for="name">Nombre</label>
                    <input id="name" type="text" class="focus-ring mt-2 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-3 text-sm" placeholder="Tu nombre">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-[#00FFD1]" for="email">Email</label>
                    <input id="email" type="email" class="focus-ring mt-2 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-3 text-sm" placeholder="tu@empresa.com">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-[#00FFD1]" for="message">Mensaje</label>
                    <textarea id="message" rows="4" class="focus-ring mt-2 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-3 text-sm" placeholder="Cuéntanos sobre tu proyecto"></textarea>
                </div>
                <button type="submit" class="btn-primary focus-ring">Enviar mensaje</button>
            </form>
        </div>
    </section>
</x-layouts.app>
