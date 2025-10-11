<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Plan;

class SubscriptionUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'plan_id' => ['required', 'exists:plans,id'],
            'prorate' => ['sometimes', 'boolean'],
        ];
    }

    public function getNewPlan(): Plan
    {
        return Plan::findOrFail($this->validated('plan_id'));
    }
}
