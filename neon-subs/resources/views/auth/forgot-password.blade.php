<x-layouts.app title="Recuperar contraseña">
    <section class="py-24">
        <div class="mx-auto max-w-md px-6">
            <h1 class="section-title text-center text-3xl">Recupera tu acceso</h1>
            <form method="POST" action="{{ route('password.email') }}" class="glow-card mt-8 space-y-4 p-6">
                @csrf
                <div>
                    <label class="text-xs uppercase text-[#A3F7B5]">Email</label>
                    <input type="email" name="email" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm" required>
                </div>
                <button type="submit" class="btn-primary w-full focus-ring">Enviar enlace</button>
            </form>
        </div>
    </section>
</x-layouts.app>
