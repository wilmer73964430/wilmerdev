# Neon Vault // Plataforma futurista de ventas digitales

Arquitectura monorepo con frontend (Next.js + Tailwind + Framer Motion) y backend (Node + Express + TypeORM + Stripe) optimizada para una única compra por usuario.

## Estructura
- `frontend/`: Next.js con UI neón, dashboards y flujos de checkout.
- `backend/`: API REST segura con validación Zod, JWT httpOnly y reglas de negocio (compra única, min/max items).

## Variables de entorno
Configura ambos `.env` desde los ejemplos.

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Variables clave: `DATABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `MIN_ITEMS`, `MAX_ITEMS`, `PURCHASE_CAP`.

## Backend
```bash
cd backend
npm install
npm run dev # servidor en 4000
npm run seed # crea admin y productos
```
Endpoints clave: `/auth/register`, `/auth/login`, `/products`, `/checkout`, `/checkout/webhook`, `/orders/me`, `/admin/metrics`.

## Frontend
```bash
cd frontend
npm install
npm run dev # UI en 3000
```
Páginas: `/` landing, `/login`, `/register`, `/dashboard`, `/checkout`, `/order`, `/admin`.

## Seguridad y negocio
- JWT en cookie httpOnly + CORS restringido.
- Verificación de compra única (purchase cap) y min/max por transacción.
- Webhook de Stripe con firma para activar acceso y generar link seguro de descarga.
- Descargas digitales protegidas con tokens firmados y expirables.

## Docker
Puedes envolver backend/frontend en contenedores usando las configuraciones estándar de Node; variables se inyectan vía `.env`.
