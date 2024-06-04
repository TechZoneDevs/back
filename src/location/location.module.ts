import { Module } from '@nestjs/common';
import { LocationController } from './controller/location.controller';
import { LocationService } from './service/location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService]
})
export class LocationModule {}
