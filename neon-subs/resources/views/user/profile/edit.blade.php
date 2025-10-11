<x-layouts.app title="Mi perfil">
    <section class="py-16">
        <div class="mx-auto max-w-3xl px-6">
            <h1 class="section-title text-3xl">Perfil</h1>
            <form method="POST" action="{{ route('user.profile.update') }}" class="glow-card mt-8 space-y-4 p-6">
                @csrf
                @method('PUT')
                <div class="grid gap-4 md:grid-cols-2">
                    <div>
                        <label class="text-xs uppercase text-[#A3F7B5]">Nombre</label>
                        <input type="text" name="name" value="{{ old('name', $user->name) }}" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">
                    </div>
                    <div>
                        <label class="text-xs uppercase text-[#A3F7B5]">Email</label>
                        <input type="email" name="email" value="{{ old('email', $user->email) }}" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">
                    </div>
                    <div>
                        <label class="text-xs uppercase text-[#A3F7B5]">Zona horaria</label>
                        <input type="text" name="timezone" value="{{ old('timezone', $user->timezone) }}" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">
                    </div>
                    <div>
                        <label class="text-xs uppercase text-[#A3F7B5]">Idioma</label>
                        <select name="locale" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">
                            <option value="es" @selected($user->locale === 'es')>Español</option>
                            <option value="en" @selected($user->locale === 'en')>English</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="text-xs uppercase text-[#A3F7B5]">Nombre de facturación</label>
                    <input type="text" name="billing_name" value="{{ old('billing_name', $user->billing_name) }}" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">
                </div>
                <div>
                    <label class="text-xs uppercase text-[#A3F7B5]">RUC / Tax ID</label>
                    <input type="text" name="billing_tax_id" value="{{ old('billing_tax_id', $user->billing_tax_id) }}" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">
                </div>
                <div>
                    <label class="text-xs uppercase text-[#A3F7B5]">Dirección de facturación</label>
                    <textarea name="billing_address" rows="3" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">{{ old('billing_address', $user->billing_address) }}</textarea>
                </div>
                <div class="grid gap-4 md:grid-cols-2">
                    <div>
                        <label class="text-xs uppercase text-[#A3F7B5]">Contraseña</label>
                        <input type="password" name="password" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm" placeholder="Nueva contraseña">
                    </div>
                    <div>
                        <label class="text-xs uppercase text-[#A3F7B5]">Confirmar contraseña</label>
                        <input type="password" name="password_confirmation" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm" placeholder="Confirma la contraseña">
                    </div>
                </div>
                <button type="submit" class="btn-primary focus-ring">Guardar cambios</button>
            </form>
        </div>
    </section>
</x-layouts.app>
