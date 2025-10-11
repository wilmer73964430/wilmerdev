<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use App\Models\Plan;

class PlanController extends Controller
{
    public function index(): View
    {
        return view('admin.plans.index', [
            'plans' => Plan::paginate(),
        ]);
    }

    public function create(): View
    {
        return view('admin.plans.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'slug' => ['required', 'string', 'unique:plans,slug'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'string'],
            'interval' => ['required', 'in:monthly,yearly'],
            'features' => ['nullable', 'array'],
            'trial_days' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $data['features'] = $this->normalizeFeatures($data['features'] ?? []);
        $data['is_active'] = $request->boolean('is_active');

        Plan::create($data);

        return redirect()->route('admin.planes.index')->with('status', __('Plan creado.'));
    }

    public function edit(Plan $plane): View
    {
        return view('admin.plans.edit', [
            'plan' => $plane,
        ]);
    }

    public function update(Request $request, Plan $plane): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'slug' => ['required', 'string', 'unique:plans,slug,'.$plane->id],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'string'],
            'interval' => ['required', 'in:monthly,yearly'],
            'features' => ['nullable', 'array'],
            'trial_days' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $data['features'] = $this->normalizeFeatures($data['features'] ?? []);
        $data['is_active'] = $request->boolean('is_active');

        $plane->update($data);

        return redirect()->route('admin.planes.index')->with('status', __('Plan actualizado.'));
    }

    public function destroy(Plan $plane): RedirectResponse
    {
        $plane->delete();

        return back()->with('status', __('Plan eliminado.'));
    }
}

    private function normalizeFeatures(array|string $features): array
    {
        if (is_string($features)) {
            $features = preg_split('/\r?\n/', $features, -1, PREG_SPLIT_NO_EMPTY);
        }

        if (count($features) === 1 && is_string($features[0]) && str_contains($features[0], "\n")) {
            $features = preg_split('/\r?\n/', $features[0], -1, PREG_SPLIT_NO_EMPTY);
        }

        return array_values(array_filter(array_map('trim', is_array($features) ? $features : [])));
    }
