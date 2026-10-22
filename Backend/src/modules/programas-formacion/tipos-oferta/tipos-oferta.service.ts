import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoOferta } from '../../../database/entities/index.js';
import { NombreCatalogoDto } from '../../../common/dto/nombre-catalogo.dto.js';

/**
 * Catálogo de tipos de oferta. No se borran: se activan o desactivan
 * para no afectar los documentos de trabajo que ya los usan.
 */
@Injectable()
export class TiposOfertaService {
    constructor(
        @InjectRepository(TipoOferta)
        private readonly tiposOferta: Repository<TipoOferta>,
    ) {}

    async listar(estado?: boolean) {
        const tipos = await this.tiposOferta.find({
            where: estado === undefined ? {} : { estado_tipo_oferta: estado },
            order: { desc_tipo_oferta: 'ASC' },
        });
        return tipos.map((tipo) => this.aRespuesta(tipo));
    }

    async consultar(codigo: number) {
        return this.aRespuesta(await this.buscar(codigo));
    }

    async crear(dto: NombreCatalogoDto) {
        await this.validarNombreDisponible(dto.nombre);
        const tipo = await this.tiposOferta.save(
            this.tiposOferta.create({ desc_tipo_oferta: dto.nombre }),
        );
        return this.aRespuesta(tipo);
    }

    async actualizar(codigo: number, dto: NombreCatalogoDto) {
        const tipo = await this.buscar(codigo);
        await this.validarNombreDisponible(dto.nombre, codigo);
        tipo.desc_tipo_oferta = dto.nombre;
        return this.aRespuesta(await this.tiposOferta.save(tipo));
    }

    async cambiarEstado(codigo: number, estado: boolean) {
        const tipo = await this.buscar(codigo);
        tipo.estado_tipo_oferta = estado;
        return this.aRespuesta(await this.tiposOferta.save(tipo));
    }

    private async buscar(codigo: number) {
        const tipo = await this.tiposOferta.findOneBy({
            cod_tipo_oferta: codigo,
        });
        if (!tipo) {
            throw new NotFoundException(
                `No existe el tipo de oferta con código ${codigo}`,
            );
        }
        return tipo;
    }

    /** El nombre no se puede repetir, sin importar mayúsculas ni si está inactivo. */
    private async validarNombreDisponible(nombre: string, excepto?: number) {
        const existente = await this.tiposOferta
            .createQueryBuilder('t')
            .where('LOWER(t.desc_tipo_oferta) = LOWER(:nombre)', { nombre })
            .getOne();
        if (existente && existente.cod_tipo_oferta !== excepto) {
            throw new ConflictException(
                existente.estado_tipo_oferta
                    ? `Ya existe el tipo de oferta "${existente.desc_tipo_oferta}"`
                    : `Ya existe el tipo de oferta "${existente.desc_tipo_oferta}" pero está inactivo, actívelo en lugar de crearlo`,
            );
        }
    }

    /** Datos que se envían al front. */
    private aRespuesta(tipo: TipoOferta) {
        return {
            codigo: tipo.cod_tipo_oferta,
            nombre: tipo.desc_tipo_oferta,
            estado: tipo.estado_tipo_oferta,
        };
    }
}
