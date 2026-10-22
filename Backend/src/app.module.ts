import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard.js';
import { RolesGuard } from './common/guards/roles.guard.js';
import { DatabaseModule } from './database/database.module.js';
import { ProgramasFormacionModule } from './modules/programas-formacion/programas-formacion.module.js';
import { UsuariosModule } from './modules/usuarios/usuarios.module.js';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        // Un módulo por dominio del negocio (ver src/modules/).
        UsuariosModule,
        ProgramasFormacionModule,
    ],
    providers: [
        // El orden importa: primero se valida el token y luego el rol.
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        { provide: APP_GUARD, useClass: RolesGuard },
    ],
})
export class AppModule {}
