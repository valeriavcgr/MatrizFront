import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    type Relation,
} from 'typeorm';
import { CentroFormacion } from './centro-formacion.entity.js';
import { EN_CASCADA } from './en-cascada.js';

@Entity('programas')
export class Programa {
    @PrimaryColumn({ type: 'int', primaryKeyConstraintName: 'programas_pkey' })
    n_programa: number;

    @Column({ type: 'varchar', length: 50 })
    nom_programa: string;

    @Column({ type: 'varchar', length: 15 })
    sigla_prog: string;

    @Column({ type: 'varchar', length: 5 })
    version_prog: string;

    @Column({ type: 'boolean', default: true })
    estado_programa: boolean;

    @Column({ type: 'int' })
    fk_linea_medular: number;

    @ManyToOne(() => CentroFormacion, EN_CASCADA)
    @JoinColumn({
        name: 'fk_linea_medular',
        referencedColumnName: 'id_centro_formacion',
        foreignKeyConstraintName: 'fk_programas_centro_formacion1',
    })
    centro_formacion: Relation<CentroFormacion>;
}
