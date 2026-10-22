import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    type Relation,
} from 'typeorm';
import { Usuario } from './usuario.entity.js';

@Entity('referente_planeacion')
export class ReferentePlaneacion {
    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        primaryKeyConstraintName: 'referente_planeacion_pkey',
    })
    pkfk_tdoc_referente: string;

    @PrimaryColumn({
        type: 'bigint',
        primaryKeyConstraintName: 'referente_planeacion_pkey',
    })
    pkfk_id_referente: string;

    @Column({ type: 'boolean', default: true })
    estado_referente: boolean;

    @OneToOne(() => Usuario, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([
        {
            name: 'pkfk_tdoc_referente',
            referencedColumnName: 'pkfk_tdoc',
            foreignKeyConstraintName: 'fk_referente_planeacion_usuarios1',
        },
        { name: 'pkfk_id_referente', referencedColumnName: 'id_usuarios' },
    ])
    usuarios: Relation<Usuario>;
}
