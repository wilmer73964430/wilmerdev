# NeoMarket SaaS Full Stack

Infraestructura base para marketplace digital multirrol (SuperAdministrador, Administrador, Vendedor, Usuario) con Node.js/Express/Sequelize/MySQL en el backend y React + Vite + TailwindCSS en el frontend.

## Estructura
- `backend/`: API Express con JWT, Sequelize y servicios de conversión de moneda.
- `frontend/`: SPA Vite con diseño futurista verde/negro y paneles básicos.
- `database.sql`: esquema inicial MySQL con todas las tablas principales solicitadas.

## Variables de entorno backend
```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secret
DB_NAME=marketplace
JWT_SECRET=supersecret
```

## Ejecutar backend
```
cd backend
npm install
npm run dev
```

## Ejecutar frontend
```
cd frontend
npm install
npm run dev
```

El build para hosting compartido queda en `frontend/dist` tras `npm run build`.
