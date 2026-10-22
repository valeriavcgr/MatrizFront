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
import { MatrizPriorizacion } from './matriz-priorizacion.entity.js';
import { Oferta } from './oferta.entity.js';
import { ReferentePlaneacion } from './referente-planeacion.entity.js';

@Entity('documento_trabajo')
export class DocumentoTrabajo {
    @PrimaryColumn({
        type: 'int',
        primaryKeyConstraintName: 'documento_trabajo_pkey',
    })
    id_documento_trabajo: number;

    @Column({ type: 'int' })
    fk_n_oferta: number;

    @Column({ type: 'timestamp', precision: 6 })
    fecha_diligenciamiento: Date;

    @Column({ type: 'int' })
    fk_centro_formacion: number;

    @Column({ type: 'int' })
    fk_matriz_priorizacion: number;

    @Column({ type: 'varchar', length: 10 })
    fk_referente_tdoc: string;

    @Column({ type: 'bigint' })
    fk_referente_id: string;

    @ManyToOne(() => CentroFormacion, EN_CASCADA)
    @JoinColumn({
        name: 'fk_centro_formacion',
        referencedColumnName: 'id_centro_formacion',
        foreignKeyConstraintName: 'fk_documento_trabajo_centro_formacion1',
    })
    centro_formacion: Relation<CentroFormacion>;

    @ManyToOne(() => MatrizPriorizacion, EN_CASCADA)
    @JoinColumn({
        name: 'fk_matriz_priorizacion',
        referencedColumnName: 'id_matriz_priorizacion',
        foreignKeyConstraintName: 'fk_documento_trabajo_matriz_priorizacion1',
    })
    matriz_priorizacion: Relation<MatrizPriorizacion>;

    @ManyToOne(() => Oferta, EN_CASCADA)
    @JoinColumn({
        name: 'fk_n_oferta',
        referencedColumnName: 'n_oferta',
        foreignKeyConstraintName: 'fk_documento_trabajo_oferta1',
    })
    oferta: Relation<Oferta>;

    @ManyToOne(() => ReferentePlaneacion, EN_CASCADA)
    @JoinColumn([
        {
            name: 'fk_referente_tdoc',
            referencedColumnName: 'pkfk_tdoc_referente',
            foreignKeyConstraintName:
                'fk_documento_trabajo_referente_planeacion1',
        },
        { name: 'fk_referente_id', referencedColumnName: 'pkfk_id_referente' },
    ])
    referente_planeacion: Relation<ReferentePlaneacion>;
}
