import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jornada } from '../../../database/entities/index.js';
import { JornadasController } from './jornadas.controller.js';
import { JornadasService } from './jornadas.service.js';

@Module({
    imports: [TypeOrmModule.forFeature([Jornada])],
    controllers: [JornadasController],
    providers: [JornadasService],
})
export class JornadasModule {}
