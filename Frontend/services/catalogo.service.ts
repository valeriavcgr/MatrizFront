/**
 * Servicio genérico de catálogos de parametrización - Plataforma SENA Matriz
 * Tipos de oferta, modalidades y jornadas exponen los mismos endpoints en el backend.
 */

import { api } from '@/lib/api';
import { ItemCatalogo } from '@/types';

export interface ServicioCatalogo {
    /** GET {ruta} → todos (activos e inactivos) */
    listar: () => Promise<ItemCatalogo[]>;
    /** POST {ruta} */
    crear: (nombre: string) => Promise<ItemCatalogo>;
    /** PATCH {ruta}/:codigo */
    actualizar: (codigo: number, nombre: string) => Promise<ItemCatalogo>;
    /** PATCH {ruta}/:codigo/estado → activar (true) / desactivar (false) */
    cambiarEstado: (codigo: number, estado: boolean) => Promise<ItemCatalogo>;
}

/** Crea las funciones de un catálogo a partir de su ruta en el backend. */
export function crearServicioCatalogo(ruta: string): ServicioCatalogo {
    return {
        listar: () => api<ItemCatalogo[]>(ruta),
        crear: (nombre) => api<ItemCatalogo>(ruta, { method: 'POST', body: { nombre } }),
        actualizar: (codigo, nombre) => api<ItemCatalogo>(`${ruta}/${codigo}`, { method: 'PATCH', body: { nombre } }),
        cambiarEstado: (codigo, estado) =>
            api<ItemCatalogo>(`${ruta}/${codigo}/estado`, { method: 'PATCH', body: { estado } }),
    };
}
