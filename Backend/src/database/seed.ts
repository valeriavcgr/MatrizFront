/**
 * Crea (o actualiza) el usuario ADMINISTRADOR inicial con los datos ADMIN_* del .env.
 * Uso: pnpm db:seed
 */
import bcrypt from 'bcrypt';
import { CONTRASENA, REGLAS_DOCUMENTO } from '../common/validators/reglas.js';
import baseDatos from './data-source.js';
import { Usuario } from './entities/index.js';

const ROL_ADMINISTRADOR = 1;

function requerida(nombre: string): string {
    const valor = process.env[nombre]?.trim();
    if (!valor) throw new Error(`Falta la variable ${nombre} en el .env`);
    return valor;
}

async function main() {
    const tipo = requerida('ADMIN_TIPO_DOCUMENTO');
    const numero = requerida('ADMIN_NUMERO_DOCUMENTO');
    const contrasena = requerida('ADMIN_CONTRASENA');

    const regla = REGLAS_DOCUMENTO[tipo];
    if (!regla) throw new Error(`Tipo de documento no válido: ${tipo}`);
    if (!new RegExp(`^\\d{${regla.min},${regla.max}}$`).test(numero)) {
        throw new Error(
            `El documento debe tener solo dígitos, entre ${regla.min} y ${regla.max}`,
        );
    }
    if (
        contrasena.length < CONTRASENA.min ||
        contrasena.length > CONTRASENA.max ||
        !CONTRASENA.mayuscula.test(contrasena) ||
        !CONTRASENA.especial.test(contrasena)
    ) {
        throw new Error(
            `La contraseña debe tener mínimo ${CONTRASENA.min} caracteres, una mayúscula y un carácter especial`,
        );
    }

    await baseDatos.initialize();

    // save() inserta si el documento no existe y actualiza si ya existe.
    await baseDatos.getRepository(Usuario).save({
        pkfk_tdoc: tipo,
        id_usuarios: numero,
        fk_rol: ROL_ADMINISTRADOR,
        nombres_usu: requerida('ADMIN_NOMBRES'),
        apellidos_usu: requerida('ADMIN_APELLIDOS'),
        correo_institucional: requerida('ADMIN_CORREO'),
        pass_usu: await bcrypt.hash(contrasena, 10),
        estado_usu: true,
    });
    await baseDatos.destroy();

    console.log(`Administrador ${tipo} ${numero} listo`);
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
});
