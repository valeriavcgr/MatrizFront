import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tipo_documento')
export class TipoDocumento {
    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        primaryKeyConstraintName: 'tipo_documento_pkey',
    })
    tipo_doc: string;

    @Column({ type: 'varchar', length: 25 })
    desc_tdoc: string;
}
