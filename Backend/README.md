# SENA Matriz – Backend

API REST en NestJS + Prisma sobre PostgreSQL (`matriz_priorizacion`). Corre en `http://localhost:4000/api/v1`.

## Arranque

```bash
pnpm install
cp .env.example .env   # completar DATABASE_URL, JWT_SECRET y ADMIN_*
pnpm db:generate       # genera el cliente de Prisma
pnpm db:seed           # crea/actualiza el usuario ADMINISTRADOR
pnpm start:dev
```

Si cambian las tablas en la BD: `pnpm db:pull && pnpm db:generate`.

## Autenticación

- `POST /api/v1/auth/login` (pública) — `{ tipoDocumento, numeroDocumento, contrasena }` → `{ accessToken, usuario }`
- `GET /api/v1/auth/perfil` — requiere `Authorization: Bearer <token>`

Todas las rutas exigen token salvo las marcadas con `@Public()`; `@Roles('ADMINISTRADOR')` restringe por rol.
Reglas de validación en `src/common/validators/reglas.ts`.
