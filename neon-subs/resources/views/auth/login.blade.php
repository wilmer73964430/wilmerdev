<x-layouts.app title="Ingresar">
    <section class="py-24">
        <div class="mx-auto max-w-md px-6">
            <h1 class="section-title text-center text-3xl">Ingresa a Neon Subs</h1>
            <form method="POST" action="{{ route('login') }}" class="glow-card mt-8 space-y-4 p-6">
                @csrf
                <div>
                    <label class="text-xs uppercase text-[#A3F7B5]">Email</label>
                    <input type="email" name="email" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm" required autofocus>
                </div>
                <div>
                    <label class="text-xs uppercase text-[#A3F7B5]">Contraseña</label>
                    <input type="password" name="password" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm" required>
                </div>
                <label class="inline-flex items-center gap-2 text-sm text-[#A3F7B5]">
                    <input type="checkbox" name="remember" class="rounded border-[#00E676]/50 bg-black/30 text-[#00E676]">
                    Recordarme
                </label>
                <button type="submit" class="btn-primary w-full focus-ring">Ingresar</button>
                <div class="text-center text-xs text-[#A3F7B5]">
                    <a href="{{ route('register') }}" class="text-[#00FFD1] hover:underline">Crear cuenta</a> ·
                    <a href="{{ route('password.request') }}" class="text-[#00FFD1] hover:underline">Olvidé mi contraseña</a>
                </div>
            </form>
        </div>
    </section>
</x-layouts.app>
