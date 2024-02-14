import { Module } from '@nestjs/common';
import { ImgsController } from './controller/imgs.controller';
import { ImgsService } from './service/imgs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImgEntity } from './img.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImgEntity])],
  controllers: [ImgsController],
  providers: [ImgsService]
})
export class ImgsModule {}
