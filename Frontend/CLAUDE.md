# CLAUDE.md

Este archivo da contexto a Claude Code (claude.ai/code) para trabajar en este repositorio.

## Qué es el proyecto

**SENA Matriz** (`matriz_front`): frontend del sistema del SENA (Servicio Nacional de Aprendizaje, Colombia) para gestionar la **priorización de la oferta formativa institucional**. Cubre la matriz de priorización de programas articulada a las variables del Plan de Gobierno, la parametrización de catálogos, la trimestralización, las vigencias, el aval institucional y los reportes.

Se conecta al backend NestJS de `../Backend` (`NEXT_PUBLIC_API_URL`, por defecto `http://localhost:4000`). Ya conectados: login, tipos de oferta, modalidades y jornadas; el resto de pantallas sigue con **datos mock**. Todo el código, la UI, los comentarios y los nombres de dominio están en **español**.

## Stack y comandos

- Next.js 16 (App Router), React 19, TypeScript (strict) y Tailwind CSS v4 (configurado vía `@import "tailwindcss"` y `@theme` en `app/globals.css`; no hay `tailwind.config`).
- Gestor de paquetes: **pnpm** (`pnpm-lock.yaml`, `pnpm-workspace.yaml`).

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint     # ESLint 9 + eslint-config-next
```

No hay tests configurados.

## Estructura

```
app/                         # Rutas (App Router); cada page.tsx es 'use client'
  page.tsx                   # Inicio / dashboard
  matriz/                    # Matriz de priorización (criterios con pesos)
  parametrizacion/           # index redirige a /parametrizacion/programas
    programas/ centros/ modalidades/ jornadas/ tipos-oferta/
  trimestralizacion/  vigencias/  aval/  reportes/
components/
  layout/                    # AppShell (Sidebar + Header + footer), Sidebar, Header
  ui/                        # DataTable, Modal, Badge, EmptyState, RoleAvatar, SenaLogo, WeightProgressBar
  matriz/CriteriosModal.tsx
  parametrizacion/ProgramaModal.tsx
  parametrizacion/CatalogoParametrizacion.tsx  # pantalla común de tipos de oferta / modalidades / jornadas
lib/api.ts                   # Axios: URL del backend, token y errores en español
lib/sesion.ts                # token y usuario de la sesión (sessionStorage)
services/                    # una función por endpoint del backend (auth, catálogos...)
types/index.ts               # Todos los modelos de dominio y VARIABLES_PLAN_GOBIERNO
```

Alias de import: `@/*` → raíz del repo (p. ej. `@/types`, `@/components/ui/DataTable`).

## Convenciones

- **Cada página** se envuelve en `<AppShell title="..." subtitle="...">`. Al agregar una ruta nueva, añadirla también a `navItems` en `components/layout/Sidebar.tsx`.
- **Datos mock en `useState`** dentro de la página. Cada punto donde irá una llamada al API lleva un comentario `// [BACKEND INTEGRATION]: MÉTODO /...` (a veces con el `fetch` comentado). Mantener ese patrón al agregar operaciones; buscar `BACKEND INTEGRATION` para ver el contrato de endpoints esperado.
- Las páginas de parametrización siguen el mismo patrón: búsqueda + filtros con `useMemo`, paginación local (`pageSize`), `DataTable` con `TableColumn<T>[]` (de `@/types`), modal de crear/editar y notificación temporal.
- Componentes como `export const X: React.FC<Props>` con un docblock JSDoc en español; las páginas con `export default function`.
- Indentación de 4 espacios, comillas simples.
- Los tipos de dominio van en `types/index.ts`, no dispersos en los componentes.

## Reglas de dominio

- **Matriz de priorización**: los criterios (`CriterioPriorizacion`) usan una de las `VARIABLES_PLAN_GOBIERNO` y tienen un `peso` en %. **La suma de pesos debe ser exactamente 100%** para poder aprobar o enviar la matriz; `CriteriosModal` valida que el peso no supere lo disponible.
- Estados de la matriz: `Borrador | En Revisión | Aprobada | Rechazada`.
- Roles (`UserRole`): `ADMINISTRADOR`, `LIDER_PLANEACION` y `SUBDIRECTOR`. El rol viene del usuario autenticado (`lib/sesion.ts`); `AppShell` redirige al login si no hay sesión.

## Estilo visual

- Colores institucionales SENA definidos como tokens en `app/globals.css`: verde `#39A900` (`sena-green`, hover `#329600`, oscuro `#277700`) y azul marino `#00324D` (`sena-navy`). En el código existente se usan mucho los hex literales (`bg-[#39A900]`); se aceptan las dos formas, pero conviene preferir los tokens en código nuevo.
- Base neutra `slate-*`, bordes redondeados (`rounded-xl`), fuente Geist (`next/font`).
- Iconos como SVG inline (sin librería de iconos).
