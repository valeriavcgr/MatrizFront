import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('glosario_estrategia')
export class GlosarioEstrategia {
    @PrimaryColumn({
        type: 'int',
        primaryKeyConstraintName: 'glosario_estrategia_pkey',
    })
    id_estrategia: number;

    @Column({ type: 'varchar', length: 45 })
    glosario_estrategia: string;

    @Column({ type: 'text' })
    definicion_estrategia: string;

    @Column({ type: 'boolean', default: true })
    estado_estrategia: boolean;
}
