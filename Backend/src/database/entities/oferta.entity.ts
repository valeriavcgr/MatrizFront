import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('oferta')
export class Oferta {
    @PrimaryColumn({ type: 'int', primaryKeyConstraintName: 'oferta_pkey' })
    n_oferta: number;

    @Column({ type: 'varchar', length: 50 })
    desc_oferta: string;

    @Column({ type: 'boolean', default: true })
    estado_oferta: boolean;
}
