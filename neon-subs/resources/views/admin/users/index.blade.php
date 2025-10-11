<x-layouts.app title="Admin - Usuarios">
    <section class="py-16">
        <div class="mx-auto max-w-6xl px-6">
            <div class="flex items-center justify-between">
                <h1 class="section-title text-3xl">Usuarios</h1>
                <a href="{{ route('admin.usuarios.create') }}" class="btn-primary focus-ring">Nuevo usuario</a>
            </div>
            <form method="GET" class="mt-6 flex items-center gap-3">
                <input type="search" name="search" value="{{ request('search') }}" placeholder="Buscar por nombre o email" class="focus-ring w-full max-w-sm rounded-2xl border border-[#00E676]/30 bg-black/30 px-4 py-2 text-sm">
                <button class="btn-outline focus-ring" type="submit">Buscar</button>
            </form>
            <div class="mt-8 overflow-hidden rounded-3xl border border-[#00E676]/20">
                <table class="min-w-full divide-y divide-[#00E676]/10 text-sm">
                    <thead class="bg-black/40 text-[#A3F7B5]">
                        <tr>
                            <th class="px-6 py-3 text-left">Nombre</th>
                            <th class="px-6 py-3 text-left">Email</th>
                            <th class="px-6 py-3 text-left">Rol</th>
                            <th class="px-6 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-[#00E676]/10 bg-black/20">
                        @foreach($users as $user)
                            <tr>
                                <td class="px-6 py-4">{{ $user->name }}</td>
                                <td class="px-6 py-4">{{ $user->email }}</td>
                                <td class="px-6 py-4">{{ $user->is_admin ? 'Admin' : 'Usuario' }}</td>
                                <td class="px-6 py-4 space-x-3">
                                    <a href="{{ route('admin.usuarios.edit', $user) }}" class="text-[#00FFD1] hover:underline">Editar</a>
                                    <form action="{{ route('admin.usuarios.destroy', $user) }}" method="POST" class="inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-red-400 hover:underline">Eliminar</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="border-t border-[#00E676]/10 bg-black/40 px-6 py-3">{{ $users->links() }}</div>
            </div>
        </div>
    </section>
</x-layouts.app>
