<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\SubscriptionController as UserSubscriptionController;
use App\Http\Controllers\User\PaymentMethodController as UserPaymentMethodController;
use App\Http\Controllers\User\InvoiceController as UserInvoiceController;
use App\Http\Controllers\User\ProfileController as UserProfileController;
use App\Http\Controllers\User\SupportController as UserSupportController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\PlanController as AdminPlanController;
use App\Http\Controllers\Admin\CouponController as AdminCouponController;
use App\Http\Controllers\Admin\TaxController as AdminTaxController;
use App\Http\Controllers\Admin\SubscriptionController as AdminSubscriptionController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\ContentController as AdminContentController;
use App\Http\Controllers\Admin\GatewayController as AdminGatewayController;
use App\Http\Controllers\Webhook\StripeWebhookController;
use App\Http\Controllers\Webhook\PayPalWebhookController;
use App\Http\Controllers\Webhook\MercadoPagoWebhookController;
use App\Http\Controllers\Webhook\IzipayWebhookController;

Route::get('/', [LandingController::class, 'index'])->name('landing');
Route::get('/precios', [PricingController::class, 'index'])->name('pricing');
Route::get('/caracteristicas', [LandingController::class, 'features'])->name('features');
Route::get('/faq', [FaqController::class, 'index'])->name('faq');
Route::get('/contacto', [LandingController::class, 'contact'])->name('contact');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/legal/terminos', [LegalController::class, 'terms'])->name('legal.terms');
Route::get('/legal/privacidad', [LegalController::class, 'privacy'])->name('legal.privacy');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('user.dashboard');
    Route::get('/suscripciones', [UserSubscriptionController::class, 'index'])->name('user.subscriptions');
    Route::post('/suscripciones', [UserSubscriptionController::class, 'store'])->name('user.subscriptions.store');
    Route::patch('/suscripciones/{subscription}', [UserSubscriptionController::class, 'update'])->name('user.subscriptions.update');
    Route::delete('/suscripciones/{subscription}', [UserSubscriptionController::class, 'destroy'])->name('user.subscriptions.destroy');

    Route::resource('/metodos-pago', UserPaymentMethodController::class)->except(['show', 'create', 'edit']);
    Route::get('/facturas', [UserInvoiceController::class, 'index'])->name('user.invoices');
    Route::get('/facturas/{invoice}', [UserInvoiceController::class, 'show'])->name('user.invoices.show');
    Route::get('/facturas/{invoice}/descargar', [UserInvoiceController::class, 'download'])->name('user.invoices.download');
    Route::get('/perfil', [UserProfileController::class, 'edit'])->name('user.profile');
    Route::put('/perfil', [UserProfileController::class, 'update'])->name('user.profile.update');
    Route::get('/soporte', [UserSupportController::class, 'index'])->name('user.support');
    Route::post('/soporte', [UserSupportController::class, 'store'])->name('user.support.store');
});

Route::middleware(['auth', 'verified', 'can:is-admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('planes', AdminPlanController::class);
    Route::resource('cupones', AdminCouponController::class);
    Route::resource('impuestos', AdminTaxController::class);
    Route::resource('suscripciones', AdminSubscriptionController::class)->only(['index', 'show', 'update', 'destroy']);
    Route::resource('pagos', AdminPaymentController::class)->only(['index', 'show']);
    Route::resource('usuarios', AdminUserController::class);
    Route::get('contenido', [AdminContentController::class, 'edit'])->name('content.edit');
    Route::put('contenido', [AdminContentController::class, 'update'])->name('content.update');
    Route::get('configuracion/pasarelas', [AdminGatewayController::class, 'edit'])->name('gateways.edit');
    Route::put('configuracion/pasarelas', [AdminGatewayController::class, 'update'])->name('gateways.update');
});

Route::post('/webhooks/stripe', [StripeWebhookController::class, 'handle'])->name('webhooks.stripe');
Route::post('/webhooks/paypal', [PayPalWebhookController::class, 'handle'])->name('webhooks.paypal');
Route::post('/webhooks/mercadopago', [MercadoPagoWebhookController::class, 'handle'])->name('webhooks.mercadopago');
Route::post('/webhooks/izipay', [IzipayWebhookController::class, 'handle'])->name('webhooks.izipay');

