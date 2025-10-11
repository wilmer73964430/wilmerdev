# Arquitectura Técnica de Neon Subs

## Visión General

Neon Subs es una plataforma SaaS monolítica construida con Laravel 11 que ofrece una experiencia completa de suscripciones, facturación y administración. La solución prioriza compatibilidad con hosting compartido, seguridad PCI SAQ-A y una estética "verde futurista".

La aplicación se divide en tres áreas principales:

1. **Landing pública**: páginas estáticas con contenido editable desde el panel admin, caches optimizados y SEO listo.
2. **Panel de usuario**: gestión de suscripciones, métodos de pago, facturas, perfil y soporte.
3. **Panel de administración**: analíticas, gestión de planes, cupones, impuestos, usuarios, contenidos y configuraciones.

## Componentes Principales

### Autenticación y Seguridad
- Laravel Fortify para autenticación email/password, verificación de correo, recuperación y 2FA TOTP.
- Gate `is_admin` y `spatie/laravel-permission` para permisos granular.
- Rate limiting en login/registro/webhooks.
- Policies para entidades sensibles (suscripciones, facturas, tickets).
- CSRF y protección XSS usando Blade + Alpine (sin eval).

### Suscripciones y Pagos
- `PaymentProviderInterface` con implementaciones: Stripe, PayPal, Mercado Pago e Izipay.
- `PaymentService` orquesta creación de checkout, almacenamiento de método (token), webhooks y reconciliación.
- Webhooks almacenados en `webhooks` con estado de procesamiento/idempotencia.
- Estrategia de reintentos: job `RetryFailedPaymentJob` (3 intentos en 7 días).
- Prorrateo simple calculado en `ProrationService` usando Carbon.

### Facturación e Impuestos
- `InvoiceService` genera registros + PDFs (dompdf) y envía notificaciones.
- `TaxEngine` aplica reglas según país/estado e impuestos específicos.
- Soporte de cupones porcentuales/fijos y créditos pro-rata.

### Experiencia de Usuario
- Tailwind + Inter (Google Fonts) con temática verde. Componentes con `@apply` y gradientes en `resources/css/app.css`.
- Componentes Blade reutilizables (`<x-badge>`, `<x-card>`, `<x-button>`, `<x-nav>`).
- Livewire 3 para tablas interactivas (suscripciones, facturas) y formularios de pago.
- Alpine.js para toggles (planes mensual/anual, modales).

### Infraestructura
- Queue driver `database` y scheduler vía cron.
- Backups automáticos con `spatie/laravel-backup` semanalmente.
- Storage link para facturas PDF y assets subidos.

### Testing
- Pest + Pest plugin Laravel.
- Fábricas en `database/factories` para usuarios, planes, suscripciones.
- Tests unitarios: cálculos de impuestos, cupones, prorrateo.
- Tests de integración: flujos sandbox (usando HTTP fake y respuestas stub), webhooks firmados, generación de PDF.
- Tests feature: registro, login, cambio de plan, cancelación, reintentos.

## Base de Datos

La base de datos se organiza conforme al esquema del prompt. Las migraciones incluyen índices, claves foráneas y campos de auditoría (`created_by`, `updated_by` opcional). Principales tablas:

- `plans`, `subscriptions`, `invoices`, `payments`, `coupons`, `tax_rates`, `users`, `payment_methods`, `webhooks`, `tickets`.
- Tabla pivot `coupon_plan` para elegibilidad, y `subscription_items` para soporte futuro multi-add-on.

## Flujo de Suscripción

1. Usuario selecciona plan en landing (`PlanController@showPricing`).
2. `CheckoutController` crea intención de pago con proveedor seleccionado.
3. Usuario completa pago en checkout (redirect/overlay). Se registra `provider_pm_id` y `provider_subscription_id`.
4. Webhook confirma pago → `WebhookController` valida firma, guarda payload en `webhooks` y despacha `ProcessWebhookJob`.
5. Job actualiza estado de suscripción, genera factura y dispara notificaciones.
6. Scheduler verifica suscripciones `past_due` y programa reintentos.

## Despliegue en Hosting Compartido

- Compilar assets antes de subir (`npm run build`).
- Subir `public/build` y `public/assets` al hosting.
- Configurar cron job `php artisan schedule:run` cada minuto.
- Activar `config:cache`, `route:cache`, `view:cache`.
- Recomendado: directorio `storage` fuera del público, usar `storage:link`.

## Observabilidad

- Monolog con canal diario + `payment` channel para transacciones.
- Dashboard admin incluye KPIs (MRR, ARR, churn, LTV) calculados con queries agregadas en `AnalyticsService`.
- Página `/status` para health check (cache, DB, queue).

## Extensibilidad

- La capa de pagos permite agregar nuevos proveedores implementando `PaymentProviderInterface` y registrándolo en `config/payments.php`.
- Livewire components desacoplados: `BillingOverview`, `SubscriptionTable`, `PaymentMethodManager`.
- Sistema de plantillas de email con Markdown y traducciones.

## Diagramas (resumen textual)

```text
[Usuario] --selecciona plan--> [CheckoutController]
[CheckoutController] --PaymentProvider-> [Stripe/PayPal/MP/Izi]
[WebhookProvider] --evento--> [WebhookController] --job--> [ProcessWebhookJob]
[ProcessWebhookJob] --actualiza--> [Subscription] --genera--> [Invoice/PDF] --notifica--> [Usuario/Admin]
```

## Próximos pasos sugeridos

- Implementar dashboard público de estado con estadísticas de uptime.
- Añadir integración opcional con WhatsApp para recordatorios de pago.
- Evaluar multi-tenant por subdominios utilizando `stancl/tenancy` si se requiere escalar a múltiples clientes.

