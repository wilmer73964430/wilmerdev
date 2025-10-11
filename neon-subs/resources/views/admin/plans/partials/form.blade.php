@php($plan = $plan ?? new \App\Models\Plan())

<div class="grid gap-4 md:grid-cols-2">
    <div>
        <label class="text-xs uppercase text-[#A3F7B5]">Nombre</label>
        <input type="text" name="name" value="{{ old('name', $plan->name ?? '') }}" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">
    </div>
    <div>
        <label class="text-xs uppercase text-[#A3F7B5]">Slug</label>
        <input type="text" name="slug" value="{{ old('slug', $plan->slug ?? '') }}" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">
    </div>
    <div>
        <label class="text-xs uppercase text-[#A3F7B5]">Precio</label>
        <input type="number" step="0.01" name="price" value="{{ old('price', $plan->price ?? '') }}" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">
    </div>
    <div>
        <label class="text-xs uppercase text-[#A3F7B5]">Moneda</label>
        <input type="text" name="currency" value="{{ old('currency', $plan->currency ?? 'USD') }}" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">
    </div>
</div>
<div>
    <label class="text-xs uppercase text-[#A3F7B5]">Descripción</label>
    <textarea name="description" rows="3" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">{{ old('description', $plan->description ?? '') }}</textarea>
</div>
<div>
    <label class="text-xs uppercase text-[#A3F7B5]">Características (una por línea)</label>
    <textarea name="features[]" rows="3" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">{{ implode("\n", old('features', $plan->features ?? [])) }}</textarea>
</div>
<div class="grid gap-4 md:grid-cols-2">
    <div>
        <label class="text-xs uppercase text-[#A3F7B5]">Intervalo</label>
        <select name="interval" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">
            <option value="monthly" @selected(old('interval', $plan->interval ?? 'monthly') === 'monthly')>Mensual</option>
            <option value="yearly" @selected(old('interval', $plan->interval ?? 'monthly') === 'yearly')>Anual</option>
        </select>
    </div>
    <div>
        <label class="text-xs uppercase text-[#A3F7B5]">Días de prueba</label>
        <input type="number" name="trial_days" value="{{ old('trial_days', $plan->trial_days ?? 0) }}" class="focus-ring mt-1 w-full rounded-xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">
    </div>
</div>
<label class="inline-flex items-center gap-2 text-sm text-[#A3F7B5]">
    <input type="checkbox" name="is_active" value="1" @checked(old('is_active', $plan->is_active ?? true)) class="rounded border-[#00E676]/50 bg-black/30 text-[#00E676]">
    Activo
</label>
