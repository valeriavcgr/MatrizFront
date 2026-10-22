import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

const recortar = ({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : value;

/** Crear y actualizar usan los mismos datos: el código lo asigna la BD. */
export class GuardarTipoOfertaDto {
    @Transform(recortar)
    @IsString({ message: 'El nombre es obligatorio' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MinLength(3, { message: 'El nombre debe tener mínimo 3 caracteres' })
    @MaxLength(50, { message: 'El nombre debe tener máximo 50 caracteres' })
    nombre: string;
}

export class CambiarEstadoDto {
    @IsBoolean({
        message: 'El estado debe ser true (activo) o false (inactivo)',
    })
    estado: boolean;
}

/** `?estado=true|false` en el listado; sin el parámetro devuelve todos. */
export class FiltroTiposOfertaDto {
    @IsOptional()
    @Transform(({ value }: { value: unknown }) =>
        value === 'true' ? true : value === 'false' ? false : value,
    )
    @IsBoolean({ message: 'El filtro estado debe ser true o false' })
    estado?: boolean;
}
