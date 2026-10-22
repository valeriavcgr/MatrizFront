import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modalidad } from '../../../database/entities/index.js';
import { ModalidadesController } from './modalidades.controller.js';
import { ModalidadesService } from './modalidades.service.js';

@Module({
    imports: [TypeOrmModule.forFeature([Modalidad])],
    controllers: [ModalidadesController],
    providers: [ModalidadesService],
})
export class ModalidadesModule {}
