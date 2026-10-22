import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

/**
 * DTOs compartidos por los catálogos que no se borran sino que se
 * activan / desactivan (tipos de oferta, modalidades, jornadas...).
 */

/** Cuerpo de `PATCH /:codigo/estado`. */
export class CambiarEstadoDto {
    @IsBoolean({
        message: 'El estado debe ser true (activo) o false (inactivo)',
    })
    estado: boolean;
}

/** `?estado=true|false` en el listado; sin el parámetro devuelve todos. */
export class FiltroEstadoDto {
    @IsOptional()
    @Transform(({ value }: { value: unknown }) =>
        value === 'true' ? true : value === 'false' ? false : value,
    )
    @IsBoolean({ message: 'El filtro estado debe ser true o false' })
    estado?: boolean;
}
