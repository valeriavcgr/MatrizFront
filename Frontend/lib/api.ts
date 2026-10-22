/**
 * Cliente HTTP del backend (NestJS) - Plataforma SENA Matriz
 * Agrega el token de sesión y convierte los errores del API en mensajes en español.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

/** Clave de `sessionStorage` donde la pantalla de login guarda el token. */
export const CLAVE_TOKEN = 'accessToken';

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

/**
 * Llama al API. Lanza `ErrorApi` si la respuesta no es exitosa.
 */
export async function api<T>(ruta: string, opciones: { method?: string; body?: unknown } = {}): Promise<T> {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem(CLAVE_TOKEN) : null;

    let respuesta: Response;
    try {
        respuesta = await fetch(`${API_URL}${ruta}`, {
            method: opciones.method ?? 'GET',
            headers: {
                ...(opciones.body !== undefined && { 'Content-Type': 'application/json' }),
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: opciones.body !== undefined ? JSON.stringify(opciones.body) : undefined,
        });
    } catch {
        throw new ErrorApi('No fue posible conectar con el servidor', 0);
    }

    const datos: unknown = await respuesta.json().catch(() => null);
    if (!respuesta.ok) {
        // El backend responde { message: string | string[] }
        const mensaje = (datos as { message?: string | string[] } | null)?.message;
        throw new ErrorApi(
            Array.isArray(mensaje) ? mensaje.join('. ') : (mensaje ?? 'Ocurrió un error inesperado'),
            respuesta.status,
        );
    }
    return datos as T;
}
