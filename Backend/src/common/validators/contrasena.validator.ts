import { ValidateBy, ValidationOptions } from 'class-validator';
import { CONTRASENA } from './reglas.js';

// Cada regla tiene su propio nombre para que se muestren todos los errores a la vez
// (dos @Matches en el mismo campo comparten nombre y solo se ve uno).

/** La contraseña debe tener al menos una letra mayúscula. */
export const TieneMayuscula = (opciones?: ValidationOptions) =>
    ValidateBy(
        {
            name: 'tieneMayuscula',
            validator: {
                validate: (valor: unknown) =>
                    typeof valor === 'string' &&
                    CONTRASENA.mayuscula.test(valor),
                defaultMessage: () =>
                    'La contraseña debe tener al menos una letra mayúscula',
            },
        },
        opciones,
    );

/** La contraseña debe tener al menos un carácter especial (p. ej. * . # @). */
export const TieneCaracterEspecial = (opciones?: ValidationOptions) =>
    ValidateBy(
        {
            name: 'tieneCaracterEspecial',
            validator: {
                validate: (valor: unknown) =>
                    typeof valor === 'string' &&
                    CONTRASENA.especial.test(valor),
                defaultMessage: () =>
                    'La contraseña debe tener al menos un carácter especial',
            },
        },
        opciones,
    );
