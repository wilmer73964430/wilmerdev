<x-layouts.app title="Crear plan">
    <section class="py-16">
        <div class="mx-auto max-w-3xl px-6">
            <h1 class="section-title text-3xl">Nuevo plan</h1>
            <form method="POST" action="{{ route('admin.planes.store') }}" class="glow-card mt-8 space-y-4 p-6">
                @csrf
                @include('admin.plans.partials.form')
                <button type="submit" class="btn-primary focus-ring">Guardar</button>
            </form>
        </div>
    </section>
</x-layouts.app>
