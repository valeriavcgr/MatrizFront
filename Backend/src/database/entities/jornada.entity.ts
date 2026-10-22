import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('jornadas')
export class Jornada {
    @PrimaryGeneratedColumn({
        type: 'int',
        primaryKeyConstraintName: 'jornadas_pkey',
    })
    cod_jornada: number;

    @Column({ type: 'varchar', length: 50 })
    jornada: string;

    @Column({ type: 'boolean', default: true })
    estado_jornada: boolean;
}
