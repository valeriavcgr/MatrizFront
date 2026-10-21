import { Transform } from 'class-transformer';
import {
    IsIn,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import {
    TieneCaracterEspecial,
    TieneMayuscula,
} from '../../../common/validators/contrasena.validator.js';
import { EsNumeroDocumento } from '../../../common/validators/documento.validator.js';
import {
    CONTRASENA,
    TIPOS_DOCUMENTO,
} from '../../../common/validators/reglas.js';

const recortar = ({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value;

/** Datos de inicio de sesión: tipo y número de documento + contraseña. */
export class LoginDto {
    @Transform(recortar)
    @IsIn(TIPOS_DOCUMENTO, {
        message: `El tipo de documento debe ser uno de: ${TIPOS_DOCUMENTO.join(', ')}`,
    })
    tipoDocumento: string;

    @Transform(recortar)
    @IsNotEmpty({ message: 'El número de documento es obligatorio' })
    @EsNumeroDocumento('tipoDocumento')
    numeroDocumento: string;

    @IsString({ message: 'La contraseña es obligatoria' })
    @MinLength(CONTRASENA.min, {
        message: `La contraseña debe tener mínimo ${CONTRASENA.min} caracteres`,
    })
    @MaxLength(CONTRASENA.max, {
        message: `La contraseña debe tener máximo ${CONTRASENA.max} caracteres`,
    })
    @TieneMayuscula()
    @TieneCaracterEspecial()
    contrasena: string;
}
