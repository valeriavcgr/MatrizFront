import { Column, Entity, PrimaryColumn } from 'typeorm';

/** `version` es DECIMAL: el driver de PostgreSQL lo devuelve como string. */
@Entity('matriz_priorizacion')
export class MatrizPriorizacion {
    @PrimaryColumn({
        type: 'int',
        primaryKeyConstraintName: 'matriz_priorizacion_pkey',
    })
    id_matriz_priorizacion: number;

    @Column({ type: 'decimal', precision: 3, scale: 1 })
    version: string;

    @Column({ type: 'int' })
    year_oferta: number;
}
