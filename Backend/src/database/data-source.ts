/**
 * Conexión de TypeORM para usar fuera de Nest: el seed y el CLI de migraciones.
 * La API se conecta desde DatabaseModule.
 */
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { opcionesBaseDatos } from './opciones-base-datos.js';

// Carpeta Backend/, calculada desde este archivo y no desde donde se ejecuta el
// comando. Con "/" porque TypeORM no reconoce el patrón de migraciones con "\".
const backend = fileURLToPath(new URL('../../', import.meta.url)).replaceAll(
    '\\',
    '/',
);

config({ path: `${backend}.env`, quiet: true });

const url = process.env['DATABASE_URL'];
if (!url) throw new Error('Falta la variable DATABASE_URL en Backend/.env');

export default new DataSource({
    ...opcionesBaseDatos(url),
    migrations: [`${backend}src/database/migrations/*.ts`],
});
