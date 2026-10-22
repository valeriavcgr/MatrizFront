import { BadRequestException, ParseIntPipe } from '@nestjs/common';

/** Valida el `:codigo` de la URL: debe ser un número entero. */
export const codigoValido = new ParseIntPipe({
    exceptionFactory: () =>
        new BadRequestException('El código debe ser un número'),
});
