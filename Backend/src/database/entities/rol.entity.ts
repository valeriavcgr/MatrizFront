import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('roles')
export class Rol {
    @PrimaryColumn({ type: 'int', primaryKeyConstraintName: 'roles_pkey' })
    id_roles: number;

    @Column({ type: 'varchar', length: 20 })
    rol: string;
}
