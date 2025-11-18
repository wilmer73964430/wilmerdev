# DigitalSubs Monorepo

Sistema de venta de suscripciones y códigos digitales con Turborepo, Next.js 14 (App Router) y Prisma.

## Requisitos
- pnpm 8+
- Docker + Docker Compose
- Node.js 18+

## Configuración rápida

```bash
pnpm i
cp .env.example .env
```

## Variables de entorno
Ejemplo en `.env.example` (MySQL):

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=digitalsubs
DB_USER=digitalsubs
DB_PASSWORD=digitalsubs
DATABASE_URL=mysql://digitalsubs:digitalsubs@localhost:3306/digitalsubs
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXTAUTH_SECRET=supersecret
NEXTAUTH_URL=http://localhost:3000
EMAIL_FROM=no-reply@demo.local
SMTP_HOST=mailhog
SMTP_PORT=1025
```

## Ejecutar en local

1. **Bases de datos y mailhog (MySQL)**
```bash
docker-compose up -d
```
2. **Migraciones y seed**
```bash
pnpm db:push && pnpm db:seed
```
3. **Desarrollo**
```bash
pnpm dev
```
4. **Pruebas**
```bash
pnpm test && pnpm test:e2e
```
5. **Smoke test end-to-end**
```bash
pnpm test:smoke
```

## Scripts principales
- `pnpm dev`: orquesta ambos apps con Turborepo.
- `pnpm build` / `pnpm start`: build y arranque productivo.
- `pnpm lint`, `pnpm typecheck`, `pnpm test`: calidad continua.
- `pnpm db:push`, `pnpm db:migrate`, `pnpm db:seed`: ciclo de base de datos.
- `pnpm test:e2e`: Playwright.
- `pnpm test:smoke`: levanta docker-compose, migra, seed y corre E2E.

## Arquitectura
- `apps/storefront`: sitio público + cuenta de usuario (header y footer visibles globalmente).
- `apps/admin`: panel de administración independiente con menú lateral.
- `packages/ui`: componentes compartidos accesibles (header, footer, sidebar, botones, toggle de tema).
- `packages/config`: configuraciones compartidas de ESLint, Tailwind, Prettier y TS.
- `prisma/schema.prisma`: modelos de negocio (usuarios, pedidos, productos, códigos digitales, cupones, pagos, logs).
- `scripts/seed.ts`: datos de ejemplo (admin + 3 clientes, 3 productos * 2 variantes, 50 códigos por variante y 3 cupones).
- `scripts/smoke.ts`: automatiza el flujo de smoke (docker-compose + migración + seed + E2E).

## Pago y webhooks
- Stripe como proveedor principal (intercambiable). Webhooks validados por firma y pensados para reintentos.
- Endpoint de webhook en `/api/webhooks/stripe` (se añade en las apps) listo para conectar con Stripe CLI.

## Emails
- Plantillas en React/MJML listas para usarse con Nodemailer o Resend. Mailhog está en docker-compose para pruebas locales.

## Seguridad
- NextAuth con credenciales + OAuth opcional, roles ADMIN/CUSTOMER/SUPPORT.
- Hash de contraseñas con argon2, rate limiting recomendado en auth y webhooks.
- Logs de auditoría en `AuditLog` para acciones sensibles.

## CI/CD
- Workflow de GitHub Actions en `.github/workflows/ci.yml` con lint + typecheck + tests + build y artefactos.

## Colección de API
- Archivo `postman_collection.json` con endpoints base para storefront y webhooks.

## Docker
- `docker-compose.yml` lanza MySQL 8 + Mailhog + apps Next (storefront y admin) con variables de entorno productivas.
- Dockerfiles por app en `apps/storefront/Dockerfile` y `apps/admin/Dockerfile`.

## Instalación en cPanel (manual, compatible con MySQL)
### Pasos principales (phpMyAdmin + despliegue rápido)
1) **Base de datos**: en cPanel crea tu base y usuario (phpMyAdmin). Importa el dump `prisma/schema.mysql.sql` y confirma que aparecen las tablas (`User`, `Product`, `Order`, etc.).
2) **Configurar credenciales**: copia `.env.example` a `.env` y pon tus valores reales: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DATABASE_URL=mysql://USER:PASS@HOST:PORT/DBNAME`, `NEXTAUTH_URL` con tu dominio/subdominio y llaves de Stripe/NextAuth.
3) **Build en local**: `pnpm i && pnpm build`. Si quieres semillas de demo en la base remota, ejecuta `pnpm db:seed` apuntando a esa base (puedes omitirlo si ya importaste el SQL y prefieres empezar vacío).
4) **Empaquetar y subir**: crea un `.zip` con `apps/storefront/.next`, `apps/admin/.next`, `package.json`, `pnpm-lock.yaml`, `.env` y `prisma/` (incluye `node_modules/` solo si tu hosting no instala dependencias). Sube y descomprime en tu app Node de cPanel.
5) **Configurar apps Node**: en cPanel crea dos apps:
   - **Storefront**: ruta `apps/storefront`, comando `pnpm start --filter storefront`.
   - **Admin**: ruta `apps/admin`, comando `pnpm start --filter admin`.
   Ambas deben leer la misma `.env` con tu `DATABASE_URL` y claves reales.
6) **Verificar**: abre tus dominios, inicia sesión, realiza un checkout de prueba y valida que los pedidos aparezcan. Revisa logs de Node en cPanel ante cualquier variable faltante.

### Detalles ampliados (opcional)
- **Proxy/Enrutamiento**: apunta dominios/subdominios a los puertos internos asignados por cPanel (Passenger/Proxy) y usa HTTPS.
- **Cron/Workers**: si tu hosting lo permite, agenda reintentos de webhooks o tareas de limpieza.
- **Datos iniciales**: si prefieres no usar el seed, puedes importar únicamente `prisma/schema.mysql.sql` (estructura + algunos cupones) y luego crear tus productos/usuarios desde el panel.

## Guía paso a paso en Visual Studio Code
Sigue este flujo para construir todo el proyecto desde VS Code y dejarlo listo para subir a cPanel:

1. **Preparar el entorno en VS Code**
   - Instala las extensiones recomendadas: *ESLint*, *Prisma*, *Tailwind CSS IntelliSense*, *Prettier*, *Thunder Client* (o Postman externo) y *GitHub Actions* para ver pipelines.
   - Abre la carpeta del repo en VS Code y asegúrate de tener **Node 18+**, **pnpm 8+** y **Docker Desktop** en ejecución para levantar MySQL/Mailhog.

2. **Configurar variables de entorno**
   - Copia `.env.example` a `.env` y coloca tus credenciales: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` y `DATABASE_URL` (ejemplo `mysql://USER:PASS@HOST:PORT/DBNAME`).
   - Ajusta `NEXTAUTH_URL` con el dominio local (ej. `http://localhost:3000`) y agrega tus llaves de Stripe (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`).

3. **Instalar dependencias**
   - En la terminal integrada de VS Code (``Ctrl+` ``) ejecuta:
     ```bash
     pnpm i
     ```

4. **Levantar infraestructura local**
   - En la misma terminal lanza MySQL y Mailhog con Docker:
     ```bash
     docker-compose up -d
     ```
   - Confirma que MySQL está arriba (`docker ps`) y que el puerto 3306 está libre si usas host local.

5. **Migraciones y seed contra tu base**
   - Con la `.env` ya apuntando a MySQL, ejecuta:
     ```bash
     pnpm db:push && pnpm db:seed
     ```
   - Alternativa manual: importa `prisma/schema.mysql.sql` en phpMyAdmin y luego, si deseas datos de ejemplo, corre solo `pnpm db:seed`.

6. **Desarrollo y verificación rápida**
   - Arranca el entorno dev orquestado por Turborepo:
     ```bash
     pnpm dev
     ```
   - Navega a `http://localhost:3000` (storefront) y `http://localhost:3001` (admin) para validar UI, login y navegación.
   - Corre chequeos locales desde VS Code para detectar errores antes del despliegue:
     ```bash
     pnpm lint
     pnpm typecheck
     pnpm test
     pnpm test:e2e
     ```

7. **Build de producción**
   - Genera artefactos optimizados:
     ```bash
     pnpm build
     ```
   - Verifica que `.next` se genere en `apps/storefront/.next` y `apps/admin/.next`.

8. **Empaquetar para cPanel**
   - Crea un `.zip` incluyendo:
     - `apps/storefront/.next`, `apps/admin/.next`
     - `package.json`, `pnpm-lock.yaml`, `.env`, `prisma/`
     - `node_modules/` (si tu hosting no instala dependencias) o, preferiblemente, solo el lockfile si tu proveedor permite `pnpm install --prod` en destino.
   - Documenta los puertos asignados por cPanel y los subdominios que usarás.

9. **Despliegue en cPanel**
   - Sube y descomprime el `.zip` en el directorio de la app Node.
   - Configura las dos apps en el selector de aplicaciones de cPanel:
     - **Storefront**: ruta de proyecto `apps/storefront`, comando de inicio `pnpm start --filter storefront`.
     - **Admin**: ruta `apps/admin`, comando `pnpm start --filter admin`.
   - Reemplaza la `.env` con las credenciales reales del MySQL de cPanel y los dominios finales (`NEXTAUTH_URL`/subdominios). Asegura que ambas apps lean la misma configuración de base de datos.

10. **Conectar con la base de datos en cPanel**
    - Si aún no existen las tablas en el MySQL de cPanel, importa `prisma/schema.mysql.sql` desde phpMyAdmin o ejecuta `pnpm db:push` desde la terminal de cPanel (ajustando `DATABASE_URL`).
    - Usa `pnpm db:seed` para generar datos demo (admin + productos + cupones) o crea tus propios registros.

11. **Smoke test post-despliegue**
    - Si tu hosting permite ejecución de scripts, corre `pnpm test:smoke` apuntando a la base y dominios remotos para verificar login, checkout y entrega digital. De lo contrario, ejecuta el smoke test en local apuntando a la base remota para validar el entorno antes de abrirlo a usuarios.

12. **Tips de VS Code para mantenimiento**
    - Usa *Tasks* (`.vscode/tasks.json`) si quieres atajos para `pnpm dev`, `pnpm lint`, etc.
    - Habilita *Format on Save* con Prettier y *Code Actions on Save* para ESLint.
    - Activa *Terminal Profiles* en VS Code para abrir shells ya posicionados en `apps/storefront` o `apps/admin` según trabajes en frontend o backend.
