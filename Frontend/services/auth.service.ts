/**
 * Servicio de autenticación - Plataforma SENA Matriz
 * Una función por endpoint de `/auth` del backend.
 */

import { api } from '@/lib/api';
import { CredencialesLogin, RespuestaLogin, UsuarioSesion } from '@/types';

/** POST /auth/login → token y datos del usuario. */
export function iniciarSesion(credenciales: CredencialesLogin): Promise<RespuestaLogin> {
    return api<RespuestaLogin>('/auth/login', { method: 'POST', body: credenciales });
}

/** GET /auth/perfil → datos actuales del usuario del token. */
export function consultarPerfil(): Promise<UsuarioSesion> {
    return api<UsuarioSesion>('/auth/perfil');
}
