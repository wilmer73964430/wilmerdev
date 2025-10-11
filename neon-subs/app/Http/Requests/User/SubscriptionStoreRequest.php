<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Plan;

class SubscriptionStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'plan_id' => ['required', 'exists:plans,id'],
            'provider' => ['required', 'in:stripe,paypal,mercadopago,izipay'],
            'coupon_code' => ['nullable', 'string', 'exists:coupons,code'],
        ];
    }

    public function getPlan(): Plan
    {
        return Plan::findOrFail($this->validated('plan_id'));
    }
}
