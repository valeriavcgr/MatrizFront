import type { DataSourceOptions } from 'typeorm';
import { ENTIDADES } from './entities/index.js';

/**
 * Configuración de TypeORM compartida por la API, el seed y el CLI.
 * `synchronize` siempre en false: la estructura de la BD se cambia con SQL,
 * nunca automáticamente al arrancar la API.
 */
export function opcionesBaseDatos(url: string): DataSourceOptions {
    return {
        type: 'postgres',
        url,
        entities: ENTIDADES,
        synchronize: false,
    };
}
