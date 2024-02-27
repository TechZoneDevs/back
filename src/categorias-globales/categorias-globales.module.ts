import { Module } from '@nestjs/common';
import { CategoriasGlobalesController } from './controllers/categorias-globales.controller';
import { CategoriasGlobalesService } from './service/categorias-globales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { categoriaGlobal } from './categoriasGlobales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([categoriaGlobal])],
  controllers: [CategoriasGlobalesController],
  providers: [CategoriasGlobalesService]
})
export class CategoriasGlobalesModule {}
