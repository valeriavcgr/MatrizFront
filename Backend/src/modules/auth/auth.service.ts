import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Usuario } from '../../database/entities/index.js';
import type { UsuarioToken } from '../../common/interfaces/usuario-token.interface.js';
import { LoginDto } from './dto/login.dto.js';

const CREDENCIALES_INVALIDAS = 'Documento o contraseña incorrectos';

/** Inicio de sesión y consulta del usuario autenticado. */
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarios: Repository<Usuario>,
        private readonly jwt: JwtService,
    ) {}

    async login(dto: LoginDto) {
        const usuario = await this.usuarios.findOne({
            where: {
                pkfk_tdoc: dto.tipoDocumento,
                id_usuarios: dto.numeroDocumento,
            },
            relations: { roles: true },
        });

        // Mismo mensaje si no existe o si la contraseña no coincide,
        // para no revelar qué documentos están registrados.
        if (
            !usuario ||
            !(await bcrypt.compare(dto.contrasena, usuario.pass_usu))
        ) {
            throw new UnauthorizedException(CREDENCIALES_INVALIDAS);
        }
        if (!usuario.estado_usu) {
            throw new ForbiddenException(
                'El usuario está inactivo, comuníquese con el administrador',
            );
        }

        const payload: UsuarioToken = {
            tipoDocumento: usuario.pkfk_tdoc,
            numeroDocumento: usuario.id_usuarios,
            rol: usuario.roles.rol,
        };

        return {
            accessToken: await this.jwt.signAsync(payload),
            usuario: this.aRespuesta(usuario),
        };
    }

    async perfil(token: UsuarioToken) {
        const usuario = await this.usuarios.findOne({
            where: {
                pkfk_tdoc: token.tipoDocumento,
                id_usuarios: token.numeroDocumento,
            },
            relations: { roles: true },
        });
        if (!usuario || !usuario.estado_usu) {
            throw new UnauthorizedException(
                'La sesión ya no es válida, inicie sesión de nuevo',
            );
        }
        return this.aRespuesta(usuario);
    }

    /** Datos del usuario que se envían al front (nunca la contraseña). */
    private aRespuesta(usuario: {
        pkfk_tdoc: string;
        id_usuarios: string;
        nombres_usu: string;
        apellidos_usu: string;
        correo_institucional: string;
        roles: { rol: string };
    }) {
        return {
            tipoDocumento: usuario.pkfk_tdoc,
            numeroDocumento: usuario.id_usuarios,
            nombres: usuario.nombres_usu,
            apellidos: usuario.apellidos_usu,
            correo: usuario.correo_institucional,
            rol: usuario.roles.rol,
        };
    }
}
