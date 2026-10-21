/**
 * Reglas de validación compartidas (DTOs y seed).
 * Si se agrega un tipo de documento en la tabla `tipo_documento`,
 * se debe agregar aquí su regla de longitud.
 */
export const REGLAS_DOCUMENTO: Record<string, { min: number; max: number }> = {
    CC: { min: 7, max: 10 },
    TI: { min: 7, max: 11 },
};

export const TIPOS_DOCUMENTO = Object.keys(REGLAS_DOCUMENTO);

/** Contraseña: mínimo 6 caracteres, al menos una mayúscula y un carácter especial. */
export const CONTRASENA = {
    min: 6,
    // bcrypt solo toma en cuenta los primeros 72 bytes
    max: 72,
    mayuscula: /[A-ZÑ]/,
    especial: /[^A-Za-zÑñ0-9\s]/,
};
