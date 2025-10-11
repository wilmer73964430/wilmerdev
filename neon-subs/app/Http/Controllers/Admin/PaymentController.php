<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;
use App\Models\Payment;

class PaymentController extends Controller
{
    public function index(): View
    {
        return view('admin.payments.index', [
            'payments' => Payment::with('invoice')->latest()->paginate(),
        ]);
    }

    public function show(Payment $pago): View
    {
        return view('admin.payments.show', [
            'payment' => $pago->load('invoice.subscription.user'),
        ]);
    }
}
