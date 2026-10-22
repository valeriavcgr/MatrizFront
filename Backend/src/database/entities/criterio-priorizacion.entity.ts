import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    type Relation,
} from 'typeorm';
import { GlosarioEstrategia } from './glosario-estrategia.entity.js';

@Entity('criterio_priorizacion')
export class CriterioPriorizacion {
    @PrimaryGeneratedColumn({
        type: 'int',
        primaryKeyConstraintName: 'criterio_priorizacion_pkey',
    })
    n_variable: number;

    @Column({ type: 'varchar', length: 40 })
    variable: string;

    @Column({ type: 'text' })
    contexto_evidencia_reg: string;

    @Column({ type: 'boolean', default: true })
    estado_criterio: boolean;

    @Column({ type: 'int' })
    fk_glosario_estrategia: number;

    @ManyToOne(() => GlosarioEstrategia, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'fk_glosario_estrategia',
        referencedColumnName: 'id_estrategia',
        foreignKeyConstraintName:
            'fk_criterio_priorizacion_glosario_estrategia1',
    })
    glosario_estrategia: Relation<GlosarioEstrategia>;
}
