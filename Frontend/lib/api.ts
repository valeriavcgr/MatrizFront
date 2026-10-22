/**
 * Cliente HTTP del backend (NestJS) con Axios - Plataforma SENA Matriz
 * Agrega el token de sesión y convierte los errores del API en mensajes en español.
 */

import axios, { AxiosError } from 'axios';
import { cerrarSesion, leerToken } from './sesion';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

/**
 * Error devuelto por el API con el mensaje listo para mostrar al usuario
 */
export class ErrorApi extends Error {
    constructor(
        message: string,
        public readonly status: number,
    ) {
        super(message);
    }
}

/** Instancia de Axios que usan todos los servicios (`services/`). */
export const http = axios.create({ baseURL: API_URL });

http.interceptors.request.use((config) => {
    const token = leerToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.response.use(
    (respuesta) => respuesta,
    (error: AxiosError<{ message?: string | string[] }>) => {
        if (!error.response) {
            throw new ErrorApi('No fue posible conectar con el servidor', 0);
        }
        const { status, data } = error.response;

        // Token vencido o inválido: se cierra la sesión y se vuelve al login.
        // (En el login todavía no hay token, así que su 401 solo se muestra.)
        if (status === 401 && leerToken()) {
            cerrarSesion();
            window.location.replace('/');
        }

        // El backend responde { message: string | string[] }
        const mensaje = data?.message;
        throw new ErrorApi(
            Array.isArray(mensaje) ? mensaje.join('. ') : (mensaje ?? 'Ocurrió un error inesperado'),
            status,
        );
    },
);

/**
 * Llama al API y devuelve el cuerpo de la respuesta. Lanza `ErrorApi` si falla.
 */
export async function api<T>(ruta: string, opciones: { method?: string; body?: unknown } = {}): Promise<T> {
    const respuesta = await http.request<T>({
        url: ruta,
        method: opciones.method ?? 'GET',
        data: opciones.body,
    });
    return respuesta.data;
}
