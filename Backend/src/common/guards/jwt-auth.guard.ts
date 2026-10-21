import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator.js';
import type { UsuarioToken } from '../interfaces/usuario-token.interface.js';

/**
 * Guard global: toda ruta exige el header `Authorization: Bearer <token>`,
 * salvo las marcadas con `@Public()`.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwt: JwtService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const esPublica = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (esPublica) return true;

        const request = context
            .switchToHttp()
            .getRequest<Request & { usuario?: UsuarioToken }>();
        const [tipo, token] = request.headers.authorization?.split(' ') ?? [];
        if (tipo !== 'Bearer' || !token) {
            throw new UnauthorizedException('Debe iniciar sesión');
        }

        try {
            request.usuario = await this.jwt.verifyAsync<UsuarioToken>(token);
        } catch {
            throw new UnauthorizedException(
                'La sesión expiró o no es válida, inicie sesión de nuevo',
            );
        }
        return true;
    }
}
