import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { EsNumeroDocumento } from '../../../../common/validators/documento.validator.js';
import {
    CONTRASENA,
    TIPOS_DOCUMENTO,
} from '../../../../common/validators/reglas.js';

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

    // Al iniciar sesión solo se exige que venga: las reglas de complejidad se
    // validan al crear la contraseña, y aquí revelarían cómo debe ser.
    @IsString({ message: 'La contraseña es obligatoria' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @MaxLength(CONTRASENA.max, {
        message: `La contraseña debe tener máximo ${CONTRASENA.max} caracteres`,
    })
    contrasena: string;
}
