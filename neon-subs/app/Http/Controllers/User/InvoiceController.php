<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class InvoiceController extends Controller
{
    public function index(Request $request): View
    {
        return view('user.invoices.index', [
            'invoices' => $request->user()->invoices()->latest()->paginate(),
        ]);
    }

    public function show(Request $request, \App\Models\Invoice $invoice): View
    {
        $this->authorize('view', $invoice);

        return view('user.invoices.show', [
            'invoice' => $invoice,
        ]);
    }

    public function download(Request $request, \App\Models\Invoice $invoice): BinaryFileResponse
    {
        $this->authorize('view', $invoice);

        return response()->download(storage_path('app/'.$invoice->pdf_path));
    }
}
