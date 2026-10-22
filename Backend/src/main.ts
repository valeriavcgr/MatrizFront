import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    // El front (otro puerto) puede llamar a la API y enviar el header Authorization.
    app.enableCors({
        origin: config.get<string>('FRONTEND_URL', 'http://localhost:3000'),
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Aplica los decoradores de class-validator de todos los DTOs.
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            // Responde { message: [...] } en español, también para campos no permitidos.
            exceptionFactory: (errores) =>
                new BadRequestException(
                    errores.flatMap((error) =>
                        Object.entries(error.constraints ?? {}).map(
                            ([regla, mensaje]) =>
                                regla === 'whitelistValidation'
                                    ? `El campo ${error.property} no está permitido`
                                    : mensaje,
                        ),
                    ),
                ),
        }),
    );

    await app.listen(config.get<number>('PORT', 4000));
}
await bootstrap();
