-- =====================================================================
-- 002 · Datos base que el backend necesita para funcionar
--   - roles: el seed crea el administrador con id_roles = 1 y
--     @Roles('ADMINISTRADOR') compara el texto exacto.
--   - tipo_documento: deben coincidir con REGLAS_DOCUMENTO
--     (src/common/validators/reglas.ts).
-- Se puede ejecutar varias veces sin duplicar.
-- =====================================================================
BEGIN;

INSERT INTO roles (id_roles, rol) VALUES
    (1, 'ADMINISTRADOR'),
    (2, 'LIDER_PLANEACION'),
    (3, 'SUBDIRECTOR')
ON CONFLICT (id_roles) DO UPDATE SET rol = EXCLUDED.rol;

INSERT INTO tipo_documento (tipo_doc, desc_tdoc) VALUES
    ('CC', 'Cédula de ciudadanía'),
    ('CE', 'Cédula de extranjería')
ON CONFLICT (tipo_doc) DO UPDATE SET desc_tdoc = EXCLUDED.desc_tdoc;

COMMIT;
