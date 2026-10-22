import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator.js';
import {
    CambiarEstadoDto,
    FiltroTiposOfertaDto,
    GuardarTipoOfertaDto,
} from './dto/tipo-oferta.dto.js';
import { TiposOfertaService } from './tipos-oferta.service.js';

const codigoValido = new ParseIntPipe({
    exceptionFactory: () =>
        new BadRequestException('El código debe ser un número'),
});

/**
 * Consultar: cualquier usuario autenticado (otros módulos usan el catálogo).
 * Registrar, actualizar y activar/desactivar: solo ADMINISTRADOR.
 */
@Controller('parametrizacion/tipos-oferta')
export class TiposOfertaController {
    constructor(private readonly tiposOferta: TiposOfertaService) {}

    /** GET /api/v1/parametrizacion/tipos-oferta?estado=true|false */
    @Get()
    listar(@Query() filtro: FiltroTiposOfertaDto) {
        return this.tiposOferta.listar(filtro.estado);
    }

    /** GET /api/v1/parametrizacion/tipos-oferta/:codigo */
    @Get(':codigo')
    consultar(@Param('codigo', codigoValido) codigo: number) {
        return this.tiposOferta.consultar(codigo);
    }

    /** POST /api/v1/parametrizacion/tipos-oferta → { codigo, nombre, estado } */
    @Roles('ADMINISTRADOR')
    @Post()
    crear(@Body() dto: GuardarTipoOfertaDto) {
        return this.tiposOferta.crear(dto);
    }

    /** PATCH /api/v1/parametrizacion/tipos-oferta/:codigo */
    @Roles('ADMINISTRADOR')
    @Patch(':codigo')
    actualizar(
        @Param('codigo', codigoValido) codigo: number,
        @Body() dto: GuardarTipoOfertaDto,
    ) {
        return this.tiposOferta.actualizar(codigo, dto);
    }

    /** PATCH /api/v1/parametrizacion/tipos-oferta/:codigo/estado → activar / desactivar */
    @Roles('ADMINISTRADOR')
    @Patch(':codigo/estado')
    cambiarEstado(
        @Param('codigo', codigoValido) codigo: number,
        @Body() dto: CambiarEstadoDto,
    ) {
        return this.tiposOferta.cambiarEstado(codigo, dto.estado);
    }
}
