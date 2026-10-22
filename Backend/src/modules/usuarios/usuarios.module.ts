import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';

/**
 * Dominio Usuarios: autenticación (y más adelante la gestión de usuarios).
 * Cada submódulo nuevo se agrega aquí, no en AppModule.
 */
@Module({
    imports: [AuthModule],
})
export class UsuariosModule {}
