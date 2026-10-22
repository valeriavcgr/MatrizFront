import type { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Crea las 17 tablas de la BD matriz_priorizacion desde cero, igual a las
 * entidades de src/database/entities. Generada con `pnpm db:generate`.
 * Los datos base (roles, tipos de documento, administrador) van en el seed.
 */

export class EsquemaInicial1792656911498 implements MigrationInterface {
    name = 'EsquemaInicial1792656911498';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "roles" (
                "id_roles" integer NOT NULL,
                "rol" character varying(20) NOT NULL,
                CONSTRAINT "roles_pkey" PRIMARY KEY ("id_roles")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tipo_documento" (
                "tipo_doc" character varying(10) NOT NULL,
                "desc_tdoc" character varying(25) NOT NULL,
                CONSTRAINT "tipo_documento_pkey" PRIMARY KEY ("tipo_doc")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "usuarios" (
                "pkfk_tdoc" character varying(10) NOT NULL,
                "id_usuarios" bigint NOT NULL,
                "fk_rol" integer NOT NULL,
                "nombres_usu" character varying(40) NOT NULL,
                "apellidos_usu" character varying(40) NOT NULL,
                "estado_usu" boolean NOT NULL DEFAULT true,
                "correo_institucional" character varying(50) NOT NULL,
                "pass_usu" character varying(255) NOT NULL,
                CONSTRAINT "usuarios_pkey" PRIMARY KEY ("pkfk_tdoc", "id_usuarios")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "uq_usuarios_correo" ON "usuarios" ("correo_institucional")
        `);
        await queryRunner.query(`
            CREATE TABLE "subdirector" (
                "pkfk_tdoc_subdirec" character varying(10) NOT NULL,
                "pkfk_id_subdirec" bigint NOT NULL,
                "estado_subdirector" boolean NOT NULL DEFAULT true,
                CONSTRAINT "subdirector_pkey" PRIMARY KEY ("pkfk_tdoc_subdirec", "pkfk_id_subdirec")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "centro_formacion" (
                "id_centro_formacion" integer NOT NULL,
                "nom_centro_formacion" character varying(50) NOT NULL,
                "sigla" character varying(10) NOT NULL,
                "fk_tdoc_subdirector" character varying(10) NOT NULL,
                "fk_id_subdirector" bigint NOT NULL,
                CONSTRAINT "centro_formacion_pkey" PRIMARY KEY ("id_centro_formacion")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "glosario_estrategia" (
                "id_estrategia" integer NOT NULL,
                "glosario_estrategia" character varying(45) NOT NULL,
                "definicion_estrategia" text NOT NULL,
                "estado_estrategia" boolean NOT NULL DEFAULT true,
                CONSTRAINT "glosario_estrategia_pkey" PRIMARY KEY ("id_estrategia")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "criterio_priorizacion" (
                "n_variable" SERIAL NOT NULL,
                "variable" character varying(40) NOT NULL,
                "contexto_evidencia_reg" text NOT NULL,
                "estado_criterio" boolean NOT NULL DEFAULT true,
                "fk_glosario_estrategia" integer NOT NULL,
                CONSTRAINT "criterio_priorizacion_pkey" PRIMARY KEY ("n_variable")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "matriz_priorizacion" (
                "id_matriz_priorizacion" integer NOT NULL,
                "version" numeric(3, 1) NOT NULL,
                "year_oferta" integer NOT NULL,
                CONSTRAINT "matriz_priorizacion_pkey" PRIMARY KEY ("id_matriz_priorizacion")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "oferta" (
                "n_oferta" integer NOT NULL,
                "desc_oferta" character varying(50) NOT NULL,
                "estado_oferta" boolean NOT NULL DEFAULT true,
                CONSTRAINT "oferta_pkey" PRIMARY KEY ("n_oferta")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "referente_planeacion" (
                "pkfk_tdoc_referente" character varying(10) NOT NULL,
                "pkfk_id_referente" bigint NOT NULL,
                "estado_referente" boolean NOT NULL DEFAULT true,
                CONSTRAINT "referente_planeacion_pkey" PRIMARY KEY ("pkfk_tdoc_referente", "pkfk_id_referente")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "documento_trabajo" (
                "id_documento_trabajo" integer NOT NULL,
                "fk_n_oferta" integer NOT NULL,
                "fecha_diligenciamiento" TIMESTAMP(6) NOT NULL,
                "fk_centro_formacion" integer NOT NULL,
                "fk_matriz_priorizacion" integer NOT NULL,
                "fk_referente_tdoc" character varying(10) NOT NULL,
                "fk_referente_id" bigint NOT NULL,
                CONSTRAINT "documento_trabajo_pkey" PRIMARY KEY ("id_documento_trabajo")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "jornadas" (
                "cod_jornada" SERIAL NOT NULL,
                "jornada" character varying(50) NOT NULL,
                "estado_jornada" boolean NOT NULL DEFAULT true,
                CONSTRAINT "jornadas_pkey" PRIMARY KEY ("cod_jornada")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "modalidad" (
                "cod_modalidad" SERIAL NOT NULL,
                "tipo_modalidad" character varying(50) NOT NULL,
                "estado_modalidad" boolean NOT NULL DEFAULT true,
                CONSTRAINT "modalidad_pkey" PRIMARY KEY ("cod_modalidad")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "programas" (
                "n_programa" integer NOT NULL,
                "nom_programa" character varying(50) NOT NULL,
                "sigla_prog" character varying(15) NOT NULL,
                "version_prog" character varying(5) NOT NULL,
                "estado_programa" boolean NOT NULL DEFAULT true,
                "fk_linea_medular" integer NOT NULL,
                CONSTRAINT "programas_pkey" PRIMARY KEY ("n_programa")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tipo_oferta" (
                "cod_tipo_oferta" SERIAL NOT NULL,
                "desc_tipo_oferta" character varying(50) NOT NULL,
                "estado_tipo_oferta" boolean NOT NULL DEFAULT true,
                CONSTRAINT "tipo_oferta_pkey" PRIMARY KEY ("cod_tipo_oferta")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "doc_trabajo_programa" (
                "pkfk_n_programa" integer NOT NULL,
                "pkfk_doc_trabajo" integer NOT NULL,
                "fk_modalidad" integer NOT NULL,
                "fk_tipo_oferta" integer NOT NULL,
                "fk_jornada" integer NOT NULL,
                CONSTRAINT "doc_trabajo_programa_pkey" PRIMARY KEY ("pkfk_n_programa", "pkfk_doc_trabajo")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "programa_criterio" (
                "pkfk_programa" integer NOT NULL,
                "pkfk_docu_trabajo" integer NOT NULL,
                "pkfk_criterio_priorizacion" integer NOT NULL,
                "argumento" text NOT NULL,
                "soporte_argumento" bytea NOT NULL,
                CONSTRAINT "programa_criterio_pkey" PRIMARY KEY (
                    "pkfk_programa",
                    "pkfk_docu_trabajo",
                    "pkfk_criterio_priorizacion"
                )
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD CONSTRAINT "fk_usuarios_roles1" FOREIGN KEY ("fk_rol") REFERENCES "roles"("id_roles") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD CONSTRAINT "fk_usuarios_tipo_documento" FOREIGN KEY ("pkfk_tdoc") REFERENCES "tipo_documento"("tipo_doc") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "subdirector"
            ADD CONSTRAINT "fk_subdirector_usuarios" FOREIGN KEY ("pkfk_tdoc_subdirec", "pkfk_id_subdirec") REFERENCES "usuarios"("pkfk_tdoc", "id_usuarios") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "centro_formacion"
            ADD CONSTRAINT "fk_centro_formacion_subdirector1" FOREIGN KEY ("fk_tdoc_subdirector", "fk_id_subdirector") REFERENCES "subdirector"("pkfk_tdoc_subdirec", "pkfk_id_subdirec") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "criterio_priorizacion"
            ADD CONSTRAINT "fk_criterio_priorizacion_glosario_estrategia1" FOREIGN KEY ("fk_glosario_estrategia") REFERENCES "glosario_estrategia"("id_estrategia") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "referente_planeacion"
            ADD CONSTRAINT "fk_referente_planeacion_usuarios1" FOREIGN KEY ("pkfk_tdoc_referente", "pkfk_id_referente") REFERENCES "usuarios"("pkfk_tdoc", "id_usuarios") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "documento_trabajo"
            ADD CONSTRAINT "fk_documento_trabajo_centro_formacion1" FOREIGN KEY ("fk_centro_formacion") REFERENCES "centro_formacion"("id_centro_formacion") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "documento_trabajo"
            ADD CONSTRAINT "fk_documento_trabajo_matriz_priorizacion1" FOREIGN KEY ("fk_matriz_priorizacion") REFERENCES "matriz_priorizacion"("id_matriz_priorizacion") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "documento_trabajo"
            ADD CONSTRAINT "fk_documento_trabajo_oferta1" FOREIGN KEY ("fk_n_oferta") REFERENCES "oferta"("n_oferta") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "documento_trabajo"
            ADD CONSTRAINT "fk_documento_trabajo_referente_planeacion1" FOREIGN KEY ("fk_referente_tdoc", "fk_referente_id") REFERENCES "referente_planeacion"("pkfk_tdoc_referente", "pkfk_id_referente") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "programas"
            ADD CONSTRAINT "fk_programas_centro_formacion1" FOREIGN KEY ("fk_linea_medular") REFERENCES "centro_formacion"("id_centro_formacion") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "doc_trabajo_programa"
            ADD CONSTRAINT "fk_programas_has_documento_trabajo_documento_trabajo1" FOREIGN KEY ("pkfk_doc_trabajo") REFERENCES "documento_trabajo"("id_documento_trabajo") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "doc_trabajo_programa"
            ADD CONSTRAINT "fk_programas_has_documento_trabajo_jornadas1" FOREIGN KEY ("fk_jornada") REFERENCES "jornadas"("cod_jornada") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "doc_trabajo_programa"
            ADD CONSTRAINT "fk_programas_has_documento_trabajo_modalidad1" FOREIGN KEY ("fk_modalidad") REFERENCES "modalidad"("cod_modalidad") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "doc_trabajo_programa"
            ADD CONSTRAINT "fk_programas_has_documento_trabajo_programas" FOREIGN KEY ("pkfk_n_programa") REFERENCES "programas"("n_programa") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "doc_trabajo_programa"
            ADD CONSTRAINT "fk_programas_has_documento_trabajo_tipo_oferta1" FOREIGN KEY ("fk_tipo_oferta") REFERENCES "tipo_oferta"("cod_tipo_oferta") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "programa_criterio"
            ADD CONSTRAINT "fk_programas_has_documento_trabajo_has_criterio_c1" FOREIGN KEY ("pkfk_criterio_priorizacion") REFERENCES "criterio_priorizacion"("n_variable") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "programa_criterio"
            ADD CONSTRAINT "fk_programas_has_documento_trabajo_has_criterio_p1" FOREIGN KEY ("pkfk_programa", "pkfk_docu_trabajo") REFERENCES "doc_trabajo_programa"("pkfk_n_programa", "pkfk_doc_trabajo") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "programa_criterio" DROP CONSTRAINT "fk_programas_has_documento_trabajo_has_criterio_p1"
        `);
        await queryRunner.query(`
            ALTER TABLE "programa_criterio" DROP CONSTRAINT "fk_programas_has_documento_trabajo_has_criterio_c1"
        `);
        await queryRunner.query(`
            ALTER TABLE "doc_trabajo_programa" DROP CONSTRAINT "fk_programas_has_documento_trabajo_tipo_oferta1"
        `);
        await queryRunner.query(`
            ALTER TABLE "doc_trabajo_programa" DROP CONSTRAINT "fk_programas_has_documento_trabajo_programas"
        `);
        await queryRunner.query(`
            ALTER TABLE "doc_trabajo_programa" DROP CONSTRAINT "fk_programas_has_documento_trabajo_modalidad1"
        `);
        await queryRunner.query(`
            ALTER TABLE "doc_trabajo_programa" DROP CONSTRAINT "fk_programas_has_documento_trabajo_jornadas1"
        `);
        await queryRunner.query(`
            ALTER TABLE "doc_trabajo_programa" DROP CONSTRAINT "fk_programas_has_documento_trabajo_documento_trabajo1"
        `);
        await queryRunner.query(`
            ALTER TABLE "programas" DROP CONSTRAINT "fk_programas_centro_formacion1"
        `);
        await queryRunner.query(`
            ALTER TABLE "documento_trabajo" DROP CONSTRAINT "fk_documento_trabajo_referente_planeacion1"
        `);
        await queryRunner.query(`
            ALTER TABLE "documento_trabajo" DROP CONSTRAINT "fk_documento_trabajo_oferta1"
        `);
        await queryRunner.query(`
            ALTER TABLE "documento_trabajo" DROP CONSTRAINT "fk_documento_trabajo_matriz_priorizacion1"
        `);
        await queryRunner.query(`
            ALTER TABLE "documento_trabajo" DROP CONSTRAINT "fk_documento_trabajo_centro_formacion1"
        `);
        await queryRunner.query(`
            ALTER TABLE "referente_planeacion" DROP CONSTRAINT "fk_referente_planeacion_usuarios1"
        `);
        await queryRunner.query(`
            ALTER TABLE "criterio_priorizacion" DROP CONSTRAINT "fk_criterio_priorizacion_glosario_estrategia1"
        `);
        await queryRunner.query(`
            ALTER TABLE "centro_formacion" DROP CONSTRAINT "fk_centro_formacion_subdirector1"
        `);
        await queryRunner.query(`
            ALTER TABLE "subdirector" DROP CONSTRAINT "fk_subdirector_usuarios"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP CONSTRAINT "fk_usuarios_tipo_documento"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP CONSTRAINT "fk_usuarios_roles1"
        `);
        await queryRunner.query(`
            DROP TABLE "programa_criterio"
        `);
        await queryRunner.query(`
            DROP TABLE "doc_trabajo_programa"
        `);
        await queryRunner.query(`
            DROP TABLE "tipo_oferta"
        `);
        await queryRunner.query(`
            DROP TABLE "programas"
        `);
        await queryRunner.query(`
            DROP TABLE "modalidad"
        `);
        await queryRunner.query(`
            DROP TABLE "jornadas"
        `);
        await queryRunner.query(`
            DROP TABLE "documento_trabajo"
        `);
        await queryRunner.query(`
            DROP TABLE "referente_planeacion"
        `);
        await queryRunner.query(`
            DROP TABLE "oferta"
        `);
        await queryRunner.query(`
            DROP TABLE "matriz_priorizacion"
        `);
        await queryRunner.query(`
            DROP TABLE "criterio_priorizacion"
        `);
        await queryRunner.query(`
            DROP TABLE "glosario_estrategia"
        `);
        await queryRunner.query(`
            DROP TABLE "centro_formacion"
        `);
        await queryRunner.query(`
            DROP TABLE "subdirector"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."uq_usuarios_correo"
        `);
        await queryRunner.query(`
            DROP TABLE "usuarios"
        `);
        await queryRunner.query(`
            DROP TABLE "tipo_documento"
        `);
        await queryRunner.query(`
            DROP TABLE "roles"
        `);
    }
}
