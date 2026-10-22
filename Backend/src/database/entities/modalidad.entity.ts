import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('modalidad')
export class Modalidad {
    @PrimaryGeneratedColumn({
        type: 'int',
        primaryKeyConstraintName: 'modalidad_pkey',
    })
    cod_modalidad: number;

    @Column({ type: 'varchar', length: 50 })
    tipo_modalidad: string;

    @Column({ type: 'boolean', default: true })
    estado_modalidad: boolean;
}
