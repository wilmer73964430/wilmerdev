<x-layouts.app title="Admin - Planes">
    <section class="py-16">
        <div class="mx-auto max-w-6xl px-6">
            <div class="flex items-center justify-between">
                <h1 class="section-title text-3xl">Planes</h1>
                <a href="{{ route('admin.planes.create') }}" class="btn-primary focus-ring">Nuevo plan</a>
            </div>
            <div class="mt-8 overflow-hidden rounded-3xl border border-[#00E676]/20">
                <table class="min-w-full divide-y divide-[#00E676]/10 text-sm">
                    <thead class="bg-black/40 text-[#A3F7B5]">
                        <tr>
                            <th class="px-6 py-3 text-left">Nombre</th>
                            <th class="px-6 py-3 text-left">Precio</th>
                            <th class="px-6 py-3 text-left">Intervalo</th>
                            <th class="px-6 py-3 text-left">Estado</th>
                            <th class="px-6 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-[#00E676]/10 bg-black/20">
                        @foreach($plans as $plan)
                            <tr>
                                <td class="px-6 py-4">{{ $plan->name }}</td>
                                <td class="px-6 py-4">{{ money_format_locale($plan->price, $plan->currency) }}</td>
                                <td class="px-6 py-4">{{ $plan->interval }}</td>
                                <td class="px-6 py-4">{{ $plan->is_active ? 'Activo' : 'Inactivo' }}</td>
                                <td class="px-6 py-4 space-x-3">
                                    <a href="{{ route('admin.planes.edit', $plan) }}" class="text-[#00FFD1] hover:underline">Editar</a>
                                    <form action="{{ route('admin.planes.destroy', $plan) }}" method="POST" class="inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-red-400 hover:underline">Eliminar</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="border-t border-[#00E676]/10 bg-black/40 px-6 py-3">{{ $plans->links() }}</div>
            </div>
        </div>
    </section>
</x-layouts.app>
