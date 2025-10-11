# SocialMentorify Platform

Monorepo futurista para la plataforma tipo SocialMentorify con paneles multi-rol, marketplace SMM y gestión de suscripciones de streaming. Incluye aplicaciones para frontend (Next.js 14), backend (NestJS + Prisma) y worker de colas (BullMQ).

## Tecnologías Clave

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, shadcn/ui, Zustand, React Query.
- **Backend**: NestJS + Prisma, PostgreSQL.
- **Infraestructura**: Docker Compose, Redis, BullMQ, Stripe, OpenTelemetry, Sentry (placeholders).

## Estructura de Carpetas

```
apps/
  api/          # API REST NestJS + Prisma
  web/          # Frontend Next.js App Router
  worker/       # Procesamiento de colas BullMQ
packages/
  config/       # Configuración compartida (eslint, tsconfig)
  ui/           # Componentes compartidos de interfaz
shared/         # Utilidades compartidas (RBAC, tipos)
```

## Requerimientos Previos

- Node.js >= 18
- pnpm >= 8
- Docker + Docker Compose

## Configuración Inicial

```bash
pnpm install
cp .env.example .env
pnpm run dev:api
pnpm run dev:web
```

Para levantar toda la plataforma con Docker Compose:

```bash
docker compose up --build
```

## Migraciones y Seed

```bash
pnpm --filter api prisma migrate dev
pnpm --filter api prisma db seed
```

## Scripts Principales

- `pnpm dev:web`: UI Next.js en modo desarrollo.
- `pnpm dev:api`: API NestJS con recarga en caliente.
- `pnpm dev:worker`: Worker BullMQ en modo watch.
- `pnpm lint`: Ejecuta lint en todos los paquetes.
- `pnpm test`: Ejecuta pruebas unitarias.

## Colección API

Se incluyen contratos OpenAPI en `apps/api/openapi` y colección de referencia para Insomnia en `docs/insomnia` (pendiente de completar con endpoints reales).

## Licencia

Proyecto interno de demostración.
