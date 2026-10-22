# SENA Matriz – Backend

API REST en NestJS + TypeORM sobre PostgreSQL (`matriz_priorizacion`). Corre en `http://localhost:4000`.

## Arranque

```bash
pnpm install
cp .env.example .env   # completar DATABASE_URL, JWT_SECRET y ADMIN_*
pnpm db:migrate        # crea las tablas en la BD (vacía) matriz_priorizacion
pnpm db:seed           # roles, tipos de documento y usuario ADMINISTRADOR
pnpm start:dev
```

## Base de datos

Las tablas están descritas como entidades en `src/database/entities/` (una por tabla, mismos nombres de columnas que en la BD).
La API **nunca** modifica la estructura de la BD (`synchronize: false`): los cambios se hacen con migraciones en `src/database/migrations/`.
TypeORM anota en la tabla `migrations` cuáles ya se aplicaron, así que `pnpm db:migrate` solo ejecuta las que faltan.

| Comando | Qué hace |
|---|---|
| `pnpm db:migrate` | Aplica las migraciones pendientes |
| `pnpm db:revert` | Deshace la última migración aplicada |
| `pnpm db:generate src/database/migrations/NombreDelCambio` | Crea una migración con la diferencia entre las entidades y la BD |
| `pnpm db:diff` | Muestra esa diferencia sin crear nada (debe decir "Your schema is up to date") |
| `pnpm db:seed` | Carga los datos base; se puede repetir |

Para cambiar una tabla:
1. Modifica su entidad (si es nueva, agrégala a `ENTIDADES` en `entities/index.ts`).
2. `pnpm db:generate src/database/migrations/NombreDelCambio` y revisa el SQL generado: si propone `DROP COLUMN` + `ADD COLUMN` para un cambio de tipo, reescríbelo como `ALTER COLUMN ... TYPE ... USING` para no perder datos.
3. `pnpm db:migrate` y sube la migración junto con la entidad.

Nunca edites una migración que ya está en `main`: crea una nueva.

**BD creada antes de las migraciones** (la del script original o con `sql/001`): si no tiene datos que conservar, bórrala, créala vacía y ejecuta `pnpm db:migrate` + `pnpm db:seed`. Si ya está igual a las entidades (`pnpm db:diff` sin cambios), marca la migración inicial como aplicada sin ejecutarla: `pnpm typeorm migration:run --fake`.

- Las columnas `BIGINT` y `DECIMAL` llegan como `string` desde PostgreSQL.

## Estructura

```
src/
├── common/            ← compartido: guards, decoradores, validadores, dto/ y pipes/ reutilizables
├── database/          ← conexión, entidades (una por tabla), migraciones y seed
└── modules/           ← un módulo por dominio del negocio
    ├── usuarios/              (usuarios.module.ts)
    │   └── auth/
    └── programas-formacion/   (programas-formacion.module.ts)
        ├── tipos-oferta/
        ├── modalidades/
        └── jornadas/
```

Cada funcionalidad es una carpeta con `*.controller.ts` (rutas y roles), `*.service.ts` (reglas de negocio), `*.module.ts` y, si tiene datos propios, `dto/`.
Un submódulo nuevo se registra en el módulo de su dominio, no en `app.module.ts`.

### Agregar un catálogo simple (código automático + nombre + estado)

Copiar `modules/programas-formacion/tipos-oferta/`, cambiar la entidad y los nombres de columna en el service, y reutilizar de `common/`:
`NombreCatalogoDto` (nombre de 3 a 50), `CambiarEstadoDto`, `FiltroEstadoDto` y el pipe `codigoValido`.
En el front, la página es `<CatalogoParametrizacion>` con un servicio de `crearServicioCatalogo(ruta)`.

## Autenticación

- `POST /auth/login` (pública) — `{ tipoDocumento, numeroDocumento, contrasena }` → `{ accessToken, usuario }`
- `GET /auth/perfil` — requiere `Authorization: Bearer <token>`

## Tipos de oferta, modalidades y jornadas

`/parametrizacion/tipos-oferta`, `/parametrizacion/modalidades` y `/parametrizacion/jornadas` (mismas reglas) — respuesta `{ codigo, nombre, estado }`. No se borran: se activan / desactivan.

- `GET /` (`?estado=true|false` opcional) y `GET /:codigo` — cualquier usuario autenticado
- `POST /` y `PATCH /:codigo` con `{ nombre }` — ADMINISTRADOR; el nombre no se repite (sin importar mayúsculas)
- `PATCH /:codigo/estado` con `{ estado: boolean }` — ADMINISTRADOR

Todas las rutas exigen token salvo las marcadas con `@Public()`; `@Roles('ADMINISTRADOR')` restringe por rol.
Reglas de validación en `src/common/validators/reglas.ts`.
