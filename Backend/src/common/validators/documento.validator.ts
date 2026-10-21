import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';
import { REGLAS_DOCUMENTO } from './reglas.js';

const reglaDe = (args: ValidationArguments) =>
    REGLAS_DOCUMENTO[
        (args.object as Record<string, unknown>)[
            args.constraints[0] as string
        ] as string
    ];

/**
 * Valida que el número de documento tenga solo dígitos y la longitud
 * que corresponde al tipo de documento indicado en `campoTipo`.
 * Si el tipo no es válido no valida: ese error lo reporta el campo del tipo.
 */
export function EsNumeroDocumento(
    campoTipo: string,
    opciones?: ValidationOptions,
) {
    return (objeto: object, propiedad: string) => {
        registerDecorator({
            name: 'esNumeroDocumento',
            target: objeto.constructor,
            propertyName: propiedad,
            constraints: [campoTipo],
            options: opciones,
            validator: {
                validate(valor: unknown, args: ValidationArguments) {
                    const regla = reglaDe(args);
                    if (!regla) return true;
                    return (
                        typeof valor === 'string' &&
                        new RegExp(`^\\d{${regla.min},${regla.max}}$`).test(
                            valor,
                        )
                    );
                },
                defaultMessage(args: ValidationArguments) {
                    const regla = reglaDe(args);
                    return `El número de documento debe tener solo dígitos, entre ${regla.min} y ${regla.max}`;
                },
            },
        });
    };
}
