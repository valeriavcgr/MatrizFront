import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import type { UsuarioToken } from '../interfaces/usuario-token.interface.js';

/** Guard global: si la ruta tiene `@Roles(...)`, valida el rol del usuario. */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const rolesPermitidos = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!rolesPermitidos?.length) return true;

        const { usuario } = context
            .switchToHttp()
            .getRequest<Request & { usuario?: UsuarioToken }>();
        if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
            throw new ForbiddenException(
                'No tiene permisos para realizar esta acción',
            );
        }
        return true;
    }
}
