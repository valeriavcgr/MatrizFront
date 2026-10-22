import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

/** Quita espacios al inicio / final y deja uno solo entre palabras. */
const normalizarEspacios = ({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : value;

/**
 * Crear y actualizar un catálogo simple (código automático + nombre + estado).
 * El nombre es de 3 a 50 caracteres, igual que las columnas VARCHAR(50).
 */
export class NombreCatalogoDto {
    @Transform(normalizarEspacios)
    @IsString({ message: 'El nombre es obligatorio' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MinLength(3, { message: 'El nombre debe tener mínimo 3 caracteres' })
    @MaxLength(50, { message: 'El nombre debe tener máximo 50 caracteres' })
    nombre: string;
}
