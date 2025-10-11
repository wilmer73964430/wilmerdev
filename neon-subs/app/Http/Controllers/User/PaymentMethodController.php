<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Contracts\View\View;
use App\Services\Payments\PaymentGatewayManager;
use App\Models\PaymentMethod;

class PaymentMethodController extends Controller
{
    public function __construct(private PaymentGatewayManager $gatewayManager)
    {
    }

    public function index(Request $request): View
    {
        return view('user.payment-methods.index', [
            'methods' => $request->user()->paymentMethods,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'provider' => ['required', 'in:stripe,paypal,mercadopago,izipay'],
            'payload' => ['required', 'array'],
        ]);

        $provider = $this->gatewayManager->forProvider($data['provider']);
        $method = $provider->addPaymentMethod($request->user(), $data['payload']);
        $method->is_default = $request->boolean('is_default');
        $request->user()->paymentMethods()->save($method);

        return redirect()->route('metodos-pago.index')->with('status', __('Método de pago agregado.'));
    }

    public function update(Request $request, PaymentMethod $metodos_pago): RedirectResponse
    {
        $this->authorize('update', $metodos_pago);

        $metodos_pago->update([
            'is_default' => $request->boolean('is_default'),
        ]);

        return back()->with('status', __('Método de pago actualizado.'));
    }

    public function destroy(PaymentMethod $metodos_pago): RedirectResponse
    {
        $this->authorize('delete', $metodos_pago);
        $metodos_pago->delete();

        return back()->with('status', __('Método de pago eliminado.'));
    }
}
