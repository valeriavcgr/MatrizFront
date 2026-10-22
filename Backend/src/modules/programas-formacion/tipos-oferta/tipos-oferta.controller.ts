import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { Roles } from '../../../common/decorators/roles.decorator.js';
import {
    CambiarEstadoDto,
    FiltroEstadoDto,
} from '../../../common/dto/estado.dto.js';
import { NombreCatalogoDto } from '../../../common/dto/nombre-catalogo.dto.js';
import { codigoValido } from '../../../common/pipes/codigo.pipe.js';
import { TiposOfertaService } from './tipos-oferta.service.js';

/**
 * Consultar: cualquier usuario autenticado (otros módulos usan el catálogo).
 * Registrar, actualizar y activar/desactivar: solo ADMINISTRADOR.
 */
@Controller('parametrizacion/tipos-oferta')
export class TiposOfertaController {
    constructor(private readonly tiposOferta: TiposOfertaService) {}

    /** GET /parametrizacion/tipos-oferta?estado=true|false */
    @Get()
    listar(@Query() filtro: FiltroEstadoDto) {
        return this.tiposOferta.listar(filtro.estado);
    }

    /** GET /parametrizacion/tipos-oferta/:codigo */
    @Get(':codigo')
    consultar(@Param('codigo', codigoValido) codigo: number) {
        return this.tiposOferta.consultar(codigo);
    }

    /** POST /parametrizacion/tipos-oferta → { codigo, nombre, estado } */
    @Roles('ADMINISTRADOR')
    @Post()
    crear(@Body() dto: NombreCatalogoDto) {
        return this.tiposOferta.crear(dto);
    }

    /** PATCH /parametrizacion/tipos-oferta/:codigo */
    @Roles('ADMINISTRADOR')
    @Patch(':codigo')
    actualizar(
        @Param('codigo', codigoValido) codigo: number,
        @Body() dto: NombreCatalogoDto,
    ) {
        return this.tiposOferta.actualizar(codigo, dto);
    }

    /** PATCH /parametrizacion/tipos-oferta/:codigo/estado → activar / desactivar */
    @Roles('ADMINISTRADOR')
    @Patch(':codigo/estado')
    cambiarEstado(
        @Param('codigo', codigoValido) codigo: number,
        @Body() dto: CambiarEstadoDto,
    ) {
        return this.tiposOferta.cambiarEstado(codigo, dto.estado);
    }
}
