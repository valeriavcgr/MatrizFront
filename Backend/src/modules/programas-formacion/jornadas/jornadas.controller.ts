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
import { JornadasService } from './jornadas.service.js';

/**
 * Consultar: cualquier usuario autenticado (otros módulos usan el catálogo).
 * Registrar, actualizar y activar/desactivar: solo ADMINISTRADOR.
 */
@Controller('parametrizacion/jornadas')
export class JornadasController {
    constructor(private readonly jornadas: JornadasService) {}

    /** GET /parametrizacion/jornadas?estado=true|false */
    @Get()
    listar(@Query() filtro: FiltroEstadoDto) {
        return this.jornadas.listar(filtro.estado);
    }

    /** GET /parametrizacion/jornadas/:codigo */
    @Get(':codigo')
    consultar(@Param('codigo', codigoValido) codigo: number) {
        return this.jornadas.consultar(codigo);
    }

    /** POST /parametrizacion/jornadas → { codigo, nombre, estado } */
    @Roles('ADMINISTRADOR')
    @Post()
    crear(@Body() dto: NombreCatalogoDto) {
        return this.jornadas.crear(dto);
    }

    /** PATCH /parametrizacion/jornadas/:codigo */
    @Roles('ADMINISTRADOR')
    @Patch(':codigo')
    actualizar(
        @Param('codigo', codigoValido) codigo: number,
        @Body() dto: NombreCatalogoDto,
    ) {
        return this.jornadas.actualizar(codigo, dto);
    }

    /** PATCH /parametrizacion/jornadas/:codigo/estado → activar / desactivar */
    @Roles('ADMINISTRADOR')
    @Patch(':codigo/estado')
    cambiarEstado(
        @Param('codigo', codigoValido) codigo: number,
        @Body() dto: CambiarEstadoDto,
    ) {
        return this.jornadas.cambiarEstado(codigo, dto.estado);
    }
}
