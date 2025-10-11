# Guía de despliegue en cPanel

1. **Preparación local**
   - Ejecuta `composer install --no-dev --optimize-autoloader`.
   - Compila assets: `npm ci && npm run build`.
   - Ejecuta `php artisan config:cache`, `route:cache`, `view:cache`.
   - Comprime la carpeta del proyecto (excluyendo `node_modules` y `.git`).

2. **Subida de archivos**
   - Entra a cPanel > Administrador de archivos.
   - Sube y extrae el paquete en `~/neon-subs`.
   - Si el DocumentRoot no apunta a `public/`, mueve el contenido de `public/` al root y actualiza las rutas de `index.php` según guía oficial de Laravel.

3. **Configuración del entorno**
   - Copia `.env.example` a `.env` y ajusta:
     - `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL=https://tu-dominio`
     - Variables de base de datos proporcionadas por cPanel.
     - Credenciales SMTP.
     - Claves sandbox/producción de Stripe, PayPal, Mercado Pago e Izipay.
     - `QUEUE_CONNECTION=database`.
   - Genera la clave: `php artisan key:generate --ansi` (vía Terminal o Task Scheduler temporal).

4. **Base de datos**
   - Crea la base y usuario en cPanel MySQL.
   - Ejecuta migraciones y seeders: `php artisan migrate --force --seed`.
   - Crea enlace de almacenamiento: `php artisan storage:link`.

5. **Cron Jobs**
   - Configura cron cada minuto:
     ```
     php /home/USUARIO/neon-subs/artisan schedule:run >> /dev/null 2>&1
     ```
   - Opcional: cron semanal para backups (`php artisan backup:run`).

6. **Webhooks**
   - Configura URLs en cada pasarela:
     - Stripe: `https://tu-dominio/webhooks/stripe`
     - PayPal: `https://tu-dominio/webhooks/paypal`
     - Mercado Pago: `https://tu-dominio/webhooks/mercadopago`
     - Izipay: `https://tu-dominio/webhooks/izipay`
   - Verifica que las IPs de las pasarelas no estén bloqueadas por firewall.

7. **Post-despliegue**
   - Ejecuta `php artisan queue:work --tries=3` temporalmente para procesar trabajos pendientes, luego deja cron encargado.
   - Revisa `/status` y panel admin > Configuración > Pasarelas para confirmar conectividad.

