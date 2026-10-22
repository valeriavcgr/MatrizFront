/**
 * Sesión del usuario autenticado - Plataforma SENA Matriz
 * Se guarda en `sessionStorage`: dura mientras la pestaña esté abierta.
 */

import { UsuarioSesion } from '@/types';

const CLAVE_TOKEN = 'accessToken';
const CLAVE_USUARIO = 'usuario';
/** Evento que avisa a las pantallas abiertas que la sesión se abrió o se cerró. */
const EVENTO_SESION = 'sena-sesion';

const enNavegador = () => typeof window !== 'undefined';

/** Guarda el token y los datos del usuario que devuelve POST /auth/login. */
export function guardarSesion(token: string, usuario: UsuarioSesion): void {
    sessionStorage.setItem(CLAVE_TOKEN, token);
    sessionStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
    window.dispatchEvent(new Event(EVENTO_SESION));
}

export function leerToken(): string | null {
    return enNavegador() ? sessionStorage.getItem(CLAVE_TOKEN) : null;
}

/** Usuario de la sesión, o null si no hay sesión (o está dañada). */
export function leerUsuario(): UsuarioSesion | null {
    if (!enNavegador() || !leerToken()) return null;
    try {
        return JSON.parse(sessionStorage.getItem(CLAVE_USUARIO) ?? 'null') as UsuarioSesion | null;
    } catch {
        return null;
    }
}

/** El token JWT no se guarda en el backend: cerrar sesión es borrarlo del navegador. */
export function cerrarSesion(): void {
    sessionStorage.removeItem(CLAVE_TOKEN);
    sessionStorage.removeItem(CLAVE_USUARIO);
    window.dispatchEvent(new Event(EVENTO_SESION));
}

/**
 * Ejecuta `alCambiar` cuando la sesión se abre / cierra y cuando el navegador
 * restaura la página desde su caché (botón Atrás), para volver a verificarla.
 * Devuelve la función que cancela la suscripción.
 */
export function suscribirSesion(alCambiar: () => void): () => void {
    window.addEventListener(EVENTO_SESION, alCambiar);
    window.addEventListener('pageshow', alCambiar);
    return () => {
        window.removeEventListener(EVENTO_SESION, alCambiar);
        window.removeEventListener('pageshow', alCambiar);
    };
}
