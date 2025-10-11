# Neon Subs

Sistema integral de suscripciones SaaS construido con Laravel 11 + Tailwind 3 siguiendo la estética "verde futurista".

> **Nota importante**: El esqueleto incluido en este repositorio está optimizado para entornos sin acceso directo a Composer durante la generación. Antes de ejecutar el proyecto en local o desplegarlo en cPanel debes ejecutar `composer install` para descargar el framework y dependencias oficiales.

## Características destacadas

- Landing page pública con secciones de beneficios, precios, testimonios y FAQ.
- Panel de usuario con gestión de suscripciones, métodos de pago, facturas, perfil y soporte.
- Panel de administración con métricas de MRR/ARR, CRUD de planes, cupones, impuestos, usuarios y configuración de pasarelas.
- Integración con Stripe, PayPal, Mercado Pago e Izipay mediante una capa común `PaymentProviderInterface`.
- Generación de facturas PDF, aplicación de impuestos y cupones, prorrateo básico y reintentos automáticos de cobro.
- Internacionalización (es/en), notificaciones por email e in-app, soporte 2FA, y pruebas con Pest.
- Preparado para hosting compartido: colas en base de datos, cron vía cPanel y assets precompilados con Vite.

## Instalación local

1. Copia `.env.example` a `.env` y completa las variables.
2. Instala dependencias:
   ```bash
   composer install
   npm install
   npm run build # o npm run dev
   ```
3. Genera la clave de la aplicación:
   ```bash
   php artisan key:generate
   ```
4. Ejecuta migraciones y seeders:
   ```bash
   php artisan migrate --seed
   ```
5. Levanta el servidor:
   ```bash
   php artisan serve
   ```
6. Opcional: `php artisan schedule:work` para programador local.

## Instalación en cPanel

Sigue la guía incluida en `docs/hosting-cpanel.md` para preparar la aplicación, subir los assets compilados y configurar cron jobs.

## Pruebas

Ejecuta la suite completa con Pest:

```bash
php artisan test
```

Los tests cubren: registro/login, flujo completo de suscripción con cada pasarela en modo sandbox, aplicación de cupones, prorrateo, generación de factura PDF, y procesamiento de webhooks.

## Estructura de carpetas

- `app/Services/Payments`: proveedores de pago (Stripe, PayPal, Mercado Pago, Izipay) y servicio de facturación.
- `app/Http/Controllers`: controladores para landing pública, panel de usuario, admin y webhooks.
- `database/migrations`: migraciones completas del modelo de datos.
- `resources/views`: vistas Blade estilizadas con Tailwind siguiendo la paleta verde futurista.
- `tests/`: pruebas unitarias y de integración utilizando Pest.

## Recursos adicionales

- `docs/architecture.md`: diseño técnico detallado, diagramas de flujo, estrategias de seguridad y cron.
- `docs/api-webhooks.postman_collection.json`: colección de Postman para probar endpoints y webhooks.

## Licencia

Uso interno del proyecto Neon Subs.

