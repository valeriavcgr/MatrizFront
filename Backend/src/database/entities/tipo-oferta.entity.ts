import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo_oferta')
export class TipoOferta {
    @PrimaryGeneratedColumn({
        type: 'int',
        primaryKeyConstraintName: 'tipo_oferta_pkey',
    })
    cod_tipo_oferta: number;

    @Column({ type: 'varchar', length: 50 })
    desc_tipo_oferta: string;

    @Column({ type: 'boolean', default: true })
    estado_tipo_oferta: boolean;
}
