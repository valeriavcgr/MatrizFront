import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { opcionesBaseDatos } from './opciones-base-datos.js';

/**
 * Conexión a PostgreSQL usando la variable DATABASE_URL del .env.
 * Cada módulo registra los repositorios que usa con `TypeOrmModule.forFeature([...])`.
 */
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) =>
                opcionesBaseDatos(config.getOrThrow<string>('DATABASE_URL')),
        }),
    ],
})
export class DatabaseModule {}
