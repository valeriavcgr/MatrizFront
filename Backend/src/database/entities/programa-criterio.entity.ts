import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    type Relation,
} from 'typeorm';
import { CriterioPriorizacion } from './criterio-priorizacion.entity.js';
import { DocTrabajoPrograma } from './doc-trabajo-programa.entity.js';

/** Argumento y soporte de un criterio para un programa dentro de un documento de trabajo. */
@Entity('programa_criterio')
export class ProgramaCriterio {
    @PrimaryColumn({
        type: 'int',
        primaryKeyConstraintName: 'programa_criterio_pkey',
    })
    pkfk_programa: number;

    @PrimaryColumn({
        type: 'int',
        primaryKeyConstraintName: 'programa_criterio_pkey',
    })
    pkfk_docu_trabajo: number;

    @PrimaryColumn({
        type: 'int',
        primaryKeyConstraintName: 'programa_criterio_pkey',
    })
    pkfk_criterio_priorizacion: number;

    @Column({ type: 'text' })
    argumento: string;

    @Column({ type: 'bytea' })
    soporte_argumento: Buffer;

    @ManyToOne(() => CriterioPriorizacion, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'pkfk_criterio_priorizacion',
        referencedColumnName: 'n_variable',
        foreignKeyConstraintName:
            'fk_programas_has_documento_trabajo_has_criterio_c1',
    })
    criterio_priorizacion: Relation<CriterioPriorizacion>;

    @ManyToOne(() => DocTrabajoPrograma, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([
        {
            name: 'pkfk_programa',
            referencedColumnName: 'pkfk_n_programa',
            foreignKeyConstraintName:
                'fk_programas_has_documento_trabajo_has_criterio_p1',
        },
        { name: 'pkfk_docu_trabajo', referencedColumnName: 'pkfk_doc_trabajo' },
    ])
    doc_trabajo_programa: Relation<DocTrabajoPrograma>;
}
