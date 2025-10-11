<x-layouts.app title="Crear cuenta">
    <section class="py-24">
        <div class="mx-auto max-w-md px-6">
            <h1 class="section-title text-center text-3xl">Crea tu cuenta NEON</h1>
            <form method="POST" action="{{ route('register') }}" class="glow-card mt-8 space-y-4 p-6">
                @csrf
                <div>
                    <label class="text-xs uppercase text-[#A3F7B5]">Nombre</label>
                    <input type="text" name="name" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm" required>
                </div>
                <div>
                    <label class="text-xs uppercase text-[#A3F7B5]">Email</label>
                    <input type="email" name="email" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm" required>
                </div>
                <div>
                    <label class="text-xs uppercase text-[#A3F7B5]">Contraseña</label>
                    <input type="password" name="password" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm" required>
                </div>
                <div>
                    <label class="text-xs uppercase text-[#A3F7B5]">Confirmar contraseña</label>
                    <input type="password" name="password_confirmation" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm" required>
                </div>
                <label class="inline-flex items-center gap-2 text-xs text-[#A3F7B5]">
                    <input type="checkbox" name="terms" required class="rounded border-[#00E676]/50 bg-black/30 text-[#00E676]">
                    Acepto los <a href="{{ route('legal.terms') }}" class="text-[#00FFD1] hover:underline">Términos</a> y <a href="{{ route('legal.privacy') }}" class="text-[#00FFD1] hover:underline">Privacidad</a>
                </label>
                <button type="submit" class="btn-primary w-full focus-ring">Crear cuenta</button>
            </form>
        </div>
    </section>
</x-layouts.app>
