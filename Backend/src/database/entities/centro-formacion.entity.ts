import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    type Relation,
} from 'typeorm';
import { EN_CASCADA } from './en-cascada.js';
import { Subdirector } from './subdirector.entity.js';

@Entity('centro_formacion')
export class CentroFormacion {
    @PrimaryColumn({
        type: 'int',
        primaryKeyConstraintName: 'centro_formacion_pkey',
    })
    id_centro_formacion: number;

    @Column({ type: 'varchar', length: 50 })
    nom_centro_formacion: string;

    @Column({ type: 'varchar', length: 10 })
    sigla: string;

    @Column({ type: 'varchar', length: 10 })
    fk_tdoc_subdirector: string;

    @Column({ type: 'bigint' })
    fk_id_subdirector: string;

    @ManyToOne(() => Subdirector, EN_CASCADA)
    @JoinColumn([
        {
            name: 'fk_tdoc_subdirector',
            referencedColumnName: 'pkfk_tdoc_subdirec',
            foreignKeyConstraintName: 'fk_centro_formacion_subdirector1',
        },
        { name: 'fk_id_subdirector', referencedColumnName: 'pkfk_id_subdirec' },
    ])
    subdirector: Relation<Subdirector>;
}
