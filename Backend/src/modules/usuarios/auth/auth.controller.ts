import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Public } from '../../../common/decorators/public.decorator.js';
import { UsuarioActual } from '../../../common/decorators/usuario-actual.decorator.js';
import type { UsuarioToken } from '../../../common/interfaces/usuario-token.interface.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /** POST /auth/login → { accessToken, usuario } */
    @Public()
    @Post('login')
    @HttpCode(200)
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    /** GET /auth/perfil → datos del usuario del token */
    @Get('perfil')
    perfil(@UsuarioActual() usuario: UsuarioToken) {
        return this.authService.perfil(usuario);
    }
}
