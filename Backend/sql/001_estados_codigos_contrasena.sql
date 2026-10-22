-- =====================================================================
-- 001 · Alinea la BD con las entidades de src/database/entities
--   - Estados: SMALLINT (0/1) -> BOOLEAN, y se agregan a los catálogos
--     que no los tenían (modalidad, jornadas, tipo_oferta).
--   - Códigos automáticos en modalidad, jornadas y tipo_oferta.
--   - Nombres de los catálogos a VARCHAR(50).
--   - Contraseña a VARCHAR(255) (hash bcrypt) y correo único.
-- Conserva los datos existentes. Se ejecuta completo o no se ejecuta.
-- Verificar después con: pnpm db:diff  (no debe listar cambios)
-- =====================================================================
BEGIN;

-- ---------- Estados: SMALLINT -> BOOLEAN ----------
ALTER TABLE usuarios
    ALTER COLUMN estado_usu DROP DEFAULT,
    ALTER COLUMN estado_usu TYPE BOOLEAN USING estado_usu <> 0,
    ALTER COLUMN estado_usu SET DEFAULT true;
ALTER TABLE subdirector
    ALTER COLUMN estado_subdirector DROP DEFAULT,
    ALTER COLUMN estado_subdirector TYPE BOOLEAN USING estado_subdirector <> 0,
    ALTER COLUMN estado_subdirector SET DEFAULT true;
ALTER TABLE referente_planeacion
    ALTER COLUMN estado_referente DROP DEFAULT,
    ALTER COLUMN estado_referente TYPE BOOLEAN USING estado_referente <> 0,
    ALTER COLUMN estado_referente SET DEFAULT true;
ALTER TABLE programas
    ALTER COLUMN estado_programa DROP DEFAULT,
    ALTER COLUMN estado_programa TYPE BOOLEAN USING estado_programa <> 0,
    ALTER COLUMN estado_programa SET DEFAULT true;
ALTER TABLE oferta
    ALTER COLUMN estado_oferta DROP DEFAULT,
    ALTER COLUMN estado_oferta TYPE BOOLEAN USING estado_oferta <> 0,
    ALTER COLUMN estado_oferta SET DEFAULT true;
ALTER TABLE glosario_estrategia
    ALTER COLUMN estado_estrategia DROP DEFAULT,
    ALTER COLUMN estado_estrategia TYPE BOOLEAN USING estado_estrategia <> 0,
    ALTER COLUMN estado_estrategia SET DEFAULT true;
ALTER TABLE criterio_priorizacion
    ALTER COLUMN estado_criterio DROP DEFAULT,
    ALTER COLUMN estado_criterio TYPE BOOLEAN USING estado_criterio <> 0,
    ALTER COLUMN estado_criterio SET DEFAULT true;

-- ---------- Catálogos: estado, código automático y nombre de 50 ----------
ALTER TABLE modalidad
    ADD COLUMN estado_modalidad BOOLEAN NOT NULL DEFAULT true,
    ALTER COLUMN tipo_modalidad TYPE VARCHAR(50);
CREATE SEQUENCE modalidad_cod_modalidad_seq OWNED BY modalidad.cod_modalidad;
ALTER TABLE modalidad
    ALTER COLUMN cod_modalidad SET DEFAULT nextval('modalidad_cod_modalidad_seq');
SELECT setval('modalidad_cod_modalidad_seq', COALESCE(MAX(cod_modalidad), 0) + 1, false)
FROM modalidad;

ALTER TABLE jornadas
    ADD COLUMN estado_jornada BOOLEAN NOT NULL DEFAULT true,
    ALTER COLUMN jornada TYPE VARCHAR(50);
CREATE SEQUENCE jornadas_cod_jornada_seq OWNED BY jornadas.cod_jornada;
ALTER TABLE jornadas
    ALTER COLUMN cod_jornada SET DEFAULT nextval('jornadas_cod_jornada_seq');
SELECT setval('jornadas_cod_jornada_seq', COALESCE(MAX(cod_jornada), 0) + 1, false)
FROM jornadas;

ALTER TABLE tipo_oferta
    ADD COLUMN estado_tipo_oferta BOOLEAN NOT NULL DEFAULT true,
    ALTER COLUMN desc_tipo_oferta TYPE VARCHAR(50);
CREATE SEQUENCE tipo_oferta_cod_tipo_oferta_seq OWNED BY tipo_oferta.cod_tipo_oferta;
ALTER TABLE tipo_oferta
    ALTER COLUMN cod_tipo_oferta SET DEFAULT nextval('tipo_oferta_cod_tipo_oferta_seq');
SELECT setval('tipo_oferta_cod_tipo_oferta_seq', COALESCE(MAX(cod_tipo_oferta), 0) + 1, false)
FROM tipo_oferta;

-- ---------- Usuarios ----------
ALTER TABLE usuarios ALTER COLUMN pass_usu TYPE VARCHAR(255);
CREATE UNIQUE INDEX uq_usuarios_correo ON usuarios (correo_institucional);

COMMIT;
