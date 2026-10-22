import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NombreCatalogoDto } from '../../../common/dto/nombre-catalogo.dto.js';
import { Modalidad } from '../../../database/entities/index.js';

/**
 * Catálogo de modalidades de formación. No se borran: se activan o desactivan
 * para no afectar los documentos de trabajo que ya las usan.
 */
@Injectable()
export class ModalidadesService {
    constructor(
        @InjectRepository(Modalidad)
        private readonly modalidades: Repository<Modalidad>,
    ) {}

    async listar(estado?: boolean) {
        const modalidades = await this.modalidades.find({
            where: estado === undefined ? {} : { estado_modalidad: estado },
            order: { tipo_modalidad: 'ASC' },
        });
        return modalidades.map((modalidad) => this.aRespuesta(modalidad));
    }

    async consultar(codigo: number) {
        return this.aRespuesta(await this.buscar(codigo));
    }

    async crear(dto: NombreCatalogoDto) {
        await this.validarNombreDisponible(dto.nombre);
        const modalidad = await this.modalidades.save(
            this.modalidades.create({ tipo_modalidad: dto.nombre }),
        );
        return this.aRespuesta(modalidad);
    }

    async actualizar(codigo: number, dto: NombreCatalogoDto) {
        const modalidad = await this.buscar(codigo);
        await this.validarNombreDisponible(dto.nombre, codigo);
        modalidad.tipo_modalidad = dto.nombre;
        return this.aRespuesta(await this.modalidades.save(modalidad));
    }

    async cambiarEstado(codigo: number, estado: boolean) {
        const modalidad = await this.buscar(codigo);
        modalidad.estado_modalidad = estado;
        return this.aRespuesta(await this.modalidades.save(modalidad));
    }

    private async buscar(codigo: number) {
        const modalidad = await this.modalidades.findOneBy({
            cod_modalidad: codigo,
        });
        if (!modalidad) {
            throw new NotFoundException(
                `No existe la modalidad con código ${codigo}`,
            );
        }
        return modalidad;
    }

    /** El nombre no se puede repetir, sin importar mayúsculas ni si está inactiva. */
    private async validarNombreDisponible(nombre: string, excepto?: number) {
        const existente = await this.modalidades
            .createQueryBuilder('m')
            .where('LOWER(m.tipo_modalidad) = LOWER(:nombre)', { nombre })
            .getOne();
        if (existente && existente.cod_modalidad !== excepto) {
            throw new ConflictException(
                existente.estado_modalidad
                    ? `Ya existe la modalidad "${existente.tipo_modalidad}"`
                    : `Ya existe la modalidad "${existente.tipo_modalidad}" pero está inactiva, actívela en lugar de crearla`,
            );
        }
    }

    /** Datos que se envían al front. */
    private aRespuesta(modalidad: Modalidad) {
        return {
            codigo: modalidad.cod_modalidad,
            nombre: modalidad.tipo_modalidad,
            estado: modalidad.estado_modalidad,
        };
    }
}
