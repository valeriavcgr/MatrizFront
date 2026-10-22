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
import { ModalidadesService } from './modalidades.service.js';

/**
 * Consultar: cualquier usuario autenticado (otros módulos usan el catálogo).
 * Registrar, actualizar y activar/desactivar: solo ADMINISTRADOR.
 */
@Controller('parametrizacion/modalidades')
export class ModalidadesController {
    constructor(private readonly modalidades: ModalidadesService) {}

    /** GET /parametrizacion/modalidades?estado=true|false */
    @Get()
    listar(@Query() filtro: FiltroEstadoDto) {
        return this.modalidades.listar(filtro.estado);
    }

    /** GET /parametrizacion/modalidades/:codigo */
    @Get(':codigo')
    consultar(@Param('codigo', codigoValido) codigo: number) {
        return this.modalidades.consultar(codigo);
    }

    /** POST /parametrizacion/modalidades → { codigo, nombre, estado } */
    @Roles('ADMINISTRADOR')
    @Post()
    crear(@Body() dto: NombreCatalogoDto) {
        return this.modalidades.crear(dto);
    }

    /** PATCH /parametrizacion/modalidades/:codigo */
    @Roles('ADMINISTRADOR')
    @Patch(':codigo')
    actualizar(
        @Param('codigo', codigoValido) codigo: number,
        @Body() dto: NombreCatalogoDto,
    ) {
        return this.modalidades.actualizar(codigo, dto);
    }

    /** PATCH /parametrizacion/modalidades/:codigo/estado → activar / desactivar */
    @Roles('ADMINISTRADOR')
    @Patch(':codigo/estado')
    cambiarEstado(
        @Param('codigo', codigoValido) codigo: number,
        @Body() dto: CambiarEstadoDto,
    ) {
        return this.modalidades.cambiarEstado(codigo, dto.estado);
    }
}
