import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    type Relation,
} from 'typeorm';
import { Rol } from './rol.entity.js';
import { TipoDocumento } from './tipo-documento.entity.js';

/** `id_usuarios` es BIGINT: el driver de PostgreSQL lo devuelve como string. */
@Entity('usuarios')
@Index('uq_usuarios_correo', ['correo_institucional'], { unique: true })
export class Usuario {
    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        primaryKeyConstraintName: 'usuarios_pkey',
    })
    pkfk_tdoc: string;

    @PrimaryColumn({
        type: 'bigint',
        primaryKeyConstraintName: 'usuarios_pkey',
    })
    id_usuarios: string;

    @Column({ type: 'int' })
    fk_rol: number;

    @Column({ type: 'varchar', length: 40 })
    nombres_usu: string;

    @Column({ type: 'varchar', length: 40 })
    apellidos_usu: string;

    @Column({ type: 'boolean', default: true })
    estado_usu: boolean;

    @Column({ type: 'varchar', length: 50 })
    correo_institucional: string;

    @Column({ type: 'varchar', length: 255 })
    pass_usu: string;

    @ManyToOne(() => Rol, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({
        name: 'fk_rol',
        referencedColumnName: 'id_roles',
        foreignKeyConstraintName: 'fk_usuarios_roles1',
    })
    roles: Relation<Rol>;

    @ManyToOne(() => TipoDocumento, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'pkfk_tdoc',
        referencedColumnName: 'tipo_doc',
        foreignKeyConstraintName: 'fk_usuarios_tipo_documento',
    })
    tipo_documento: Relation<TipoDocumento>;
}
