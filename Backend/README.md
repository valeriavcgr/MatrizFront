# SENA Matriz – Backend

API REST en NestJS + TypeORM sobre PostgreSQL (`matriz_priorizacion`). Corre en `http://localhost:4000/api/v1`.

## Arranque

```bash
pnpm install
cp .env.example .env   # completar DATABASE_URL, JWT_SECRET y ADMIN_*
pnpm db:diff           # muestra el SQL que le falta a tu BD (no la modifica)
pnpm db:seed           # crea/actualiza el usuario ADMINISTRADOR
pnpm start:dev
```

## Base de datos

Las tablas están descritas como entidades en `src/database/entities/` (una por tabla, mismos nombres de columnas que en la BD).
La API **nunca** modifica la estructura de la BD (`synchronize: false`): los cambios se hacen con SQL.

- Scripts en `sql/`, en orden: `001_estados_codigos_contrasena.sql` (estructura) y `002_datos_base.sql` (roles y tipos de documento, se puede repetir).
  `psql -U postgres -d matriz_priorizacion -v ON_ERROR_STOP=1 -f sql/001_estados_codigos_contrasena.sql -f sql/002_datos_base.sql`
- Si tu BD está desactualizada, `pnpm db:diff` lista los `ALTER`/`CREATE` necesarios para que coincida con las entidades; revísalos y aplícalos en tu cliente SQL.
- Si cambias una tabla, actualiza también su entidad (y agrégala a `ENTIDADES` en `entities/index.ts` si es nueva).
- Las columnas `BIGINT` y `DECIMAL` llegan como `string` desde PostgreSQL.

## Autenticación

- `POST /api/v1/auth/login` (pública) — `{ tipoDocumento, numeroDocumento, contrasena }` → `{ accessToken, usuario }`
- `GET /api/v1/auth/perfil` — requiere `Authorization: Bearer <token>`

## Tipos de oferta

`/api/v1/parametrizacion/tipos-oferta` — respuesta `{ codigo, nombre, estado }`. No se borran: se activan / desactivan.

- `GET /` (`?estado=true|false` opcional) y `GET /:codigo` — cualquier usuario autenticado
- `POST /` y `PATCH /:codigo` con `{ nombre }` — ADMINISTRADOR; el nombre no se repite (sin importar mayúsculas)
- `PATCH /:codigo/estado` con `{ estado: boolean }` — ADMINISTRADOR

Todas las rutas exigen token salvo las marcadas con `@Public()`; `@Roles('ADMINISTRADOR')` restringe por rol.
Reglas de validación en `src/common/validators/reglas.ts`.
