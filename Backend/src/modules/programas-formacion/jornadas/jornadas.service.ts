import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NombreCatalogoDto } from '../../../common/dto/nombre-catalogo.dto.js';
import { Jornada } from '../../../database/entities/index.js';

/**
 * Catálogo de jornadas de formación. No se borran: se activan o desactivan
 * para no afectar los documentos de trabajo que ya las usan.
 */
@Injectable()
export class JornadasService {
    constructor(
        @InjectRepository(Jornada)
        private readonly jornadas: Repository<Jornada>,
    ) {}

    async listar(estado?: boolean) {
        const jornadas = await this.jornadas.find({
            where: estado === undefined ? {} : { estado_jornada: estado },
            order: { jornada: 'ASC' },
        });
        return jornadas.map((jornada) => this.aRespuesta(jornada));
    }

    async consultar(codigo: number) {
        return this.aRespuesta(await this.buscar(codigo));
    }

    async crear(dto: NombreCatalogoDto) {
        await this.validarNombreDisponible(dto.nombre);
        const jornada = await this.jornadas.save(
            this.jornadas.create({ jornada: dto.nombre }),
        );
        return this.aRespuesta(jornada);
    }

    async actualizar(codigo: number, dto: NombreCatalogoDto) {
        const jornada = await this.buscar(codigo);
        await this.validarNombreDisponible(dto.nombre, codigo);
        jornada.jornada = dto.nombre;
        return this.aRespuesta(await this.jornadas.save(jornada));
    }

    async cambiarEstado(codigo: number, estado: boolean) {
        const jornada = await this.buscar(codigo);
        jornada.estado_jornada = estado;
        return this.aRespuesta(await this.jornadas.save(jornada));
    }

    private async buscar(codigo: number) {
        const jornada = await this.jornadas.findOneBy({
            cod_jornada: codigo,
        });
        if (!jornada) {
            throw new NotFoundException(
                `No existe la jornada con código ${codigo}`,
            );
        }
        return jornada;
    }

    /** El nombre no se puede repetir, sin importar mayúsculas ni si está inactiva. */
    private async validarNombreDisponible(nombre: string, excepto?: number) {
        const existente = await this.jornadas
            .createQueryBuilder('j')
            .where('LOWER(j.jornada) = LOWER(:nombre)', { nombre })
            .getOne();
        if (existente && existente.cod_jornada !== excepto) {
            throw new ConflictException(
                existente.estado_jornada
                    ? `Ya existe la jornada "${existente.jornada}"`
                    : `Ya existe la jornada "${existente.jornada}" pero está inactiva, actívela en lugar de crearla`,
            );
        }
    }

    /** Datos que se envían al front. */
    private aRespuesta(jornada: Jornada) {
        return {
            codigo: jornada.cod_jornada,
            nombre: jornada.jornada,
            estado: jornada.estado_jornada,
        };
    }
}
