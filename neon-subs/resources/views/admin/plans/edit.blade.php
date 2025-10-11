<x-layouts.app :title="'Editar plan '.$plan->name">
    <section class="py-16">
        <div class="mx-auto max-w-3xl px-6">
            <h1 class="section-title text-3xl">Editar plan</h1>
            <form method="POST" action="{{ route('admin.planes.update', $plan) }}" class="glow-card mt-8 space-y-4 p-6">
                @csrf
                @method('PUT')
                @include('admin.plans.partials.form', ['plan' => $plan])
                <button type="submit" class="btn-primary focus-ring">Actualizar</button>
            </form>
        </div>
    </section>
</x-layouts.app>
