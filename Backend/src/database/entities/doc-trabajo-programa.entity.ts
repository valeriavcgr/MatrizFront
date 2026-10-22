import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    type Relation,
} from 'typeorm';
import { DocumentoTrabajo } from './documento-trabajo.entity.js';
import { Jornada } from './jornada.entity.js';
import { Modalidad } from './modalidad.entity.js';
import { Programa } from './programa.entity.js';
import { TipoOferta } from './tipo-oferta.entity.js';

/** Programa incluido en un documento de trabajo, con su modalidad, jornada y tipo de oferta. */
@Entity('doc_trabajo_programa')
export class DocTrabajoPrograma {
    @PrimaryColumn({
        type: 'int',
        primaryKeyConstraintName: 'doc_trabajo_programa_pkey',
    })
    pkfk_n_programa: number;

    @PrimaryColumn({
        type: 'int',
        primaryKeyConstraintName: 'doc_trabajo_programa_pkey',
    })
    pkfk_doc_trabajo: number;

    @Column({ type: 'int' })
    fk_modalidad: number;

    @Column({ type: 'int' })
    fk_tipo_oferta: number;

    @Column({ type: 'int' })
    fk_jornada: number;

    @ManyToOne(() => DocumentoTrabajo, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'pkfk_doc_trabajo',
        referencedColumnName: 'id_documento_trabajo',
        foreignKeyConstraintName:
            'fk_programas_has_documento_trabajo_documento_trabajo1',
    })
    documento_trabajo: Relation<DocumentoTrabajo>;

    @ManyToOne(() => Jornada, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({
        name: 'fk_jornada',
        referencedColumnName: 'cod_jornada',
        foreignKeyConstraintName:
            'fk_programas_has_documento_trabajo_jornadas1',
    })
    jornadas: Relation<Jornada>;

    @ManyToOne(() => Modalidad, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({
        name: 'fk_modalidad',
        referencedColumnName: 'cod_modalidad',
        foreignKeyConstraintName:
            'fk_programas_has_documento_trabajo_modalidad1',
    })
    modalidad: Relation<Modalidad>;

    @ManyToOne(() => Programa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({
        name: 'pkfk_n_programa',
        referencedColumnName: 'n_programa',
        foreignKeyConstraintName:
            'fk_programas_has_documento_trabajo_programas',
    })
    programas: Relation<Programa>;

    @ManyToOne(() => TipoOferta, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({
        name: 'fk_tipo_oferta',
        referencedColumnName: 'cod_tipo_oferta',
        foreignKeyConstraintName:
            'fk_programas_has_documento_trabajo_tipo_oferta1',
    })
    tipo_oferta: Relation<TipoOferta>;
}
