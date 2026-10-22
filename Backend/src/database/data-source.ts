/**
 * Conexión de TypeORM para usar fuera de Nest: el seed y el CLI (`pnpm db:diff`).
 * La API se conecta desde DatabaseModule.
 */
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { opcionesBaseDatos } from './opciones-base-datos.js';

const url = process.env['DATABASE_URL'];
if (!url) throw new Error('Falta la variable DATABASE_URL en el .env');

export default new DataSource(opcionesBaseDatos(url));
