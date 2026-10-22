import type { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * - centro_formacion: estado para activar / desactivar (los existentes quedan activos).
 * - programas.nom_programa: de 50 a 150 caracteres (hay programas con nombres largos).
 * Ajustada a mano: TypeORM generaba DROP + ADD de nom_programa, que borra los nombres.
 */
export class EstadoCentroYNombrePrograma1792658997421 implements MigrationInterface {
    name = 'EstadoCentroYNombrePrograma1792658997421';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "centro_formacion"
            ADD "estado_centro" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "programas"
            ALTER COLUMN "nom_programa" TYPE character varying(150)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Falla (sin borrar nada) si ya hay nombres de más de 50 caracteres.
        await queryRunner.query(`
            ALTER TABLE "programas"
            ALTER COLUMN "nom_programa" TYPE character varying(50)
        `);
        await queryRunner.query(`
            ALTER TABLE "centro_formacion" DROP COLUMN "estado_centro"
        `);
    }
}
