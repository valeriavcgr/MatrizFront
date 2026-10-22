import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    type Relation,
} from 'typeorm';
import { Usuario } from './usuario.entity.js';

@Entity('subdirector')
export class Subdirector {
    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        primaryKeyConstraintName: 'subdirector_pkey',
    })
    pkfk_tdoc_subdirec: string;

    @PrimaryColumn({
        type: 'bigint',
        primaryKeyConstraintName: 'subdirector_pkey',
    })
    pkfk_id_subdirec: string;

    @Column({ type: 'boolean', default: true })
    estado_subdirector: boolean;

    @OneToOne(() => Usuario, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([
        {
            name: 'pkfk_tdoc_subdirec',
            referencedColumnName: 'pkfk_tdoc',
            foreignKeyConstraintName: 'fk_subdirector_usuarios',
        },
        { name: 'pkfk_id_subdirec', referencedColumnName: 'id_usuarios' },
    ])
    usuarios: Relation<Usuario>;
}
