import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import type { UsuarioToken } from '../interfaces/usuario-token.interface.js';

/** Inyecta en el controlador el usuario autenticado (lo que viene en el token). */
export const UsuarioActual = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): UsuarioToken => {
        const request = ctx
            .switchToHttp()
            .getRequest<Request & { usuario: UsuarioToken }>();
        return request.usuario;
    },
);
