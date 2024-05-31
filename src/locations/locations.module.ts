import { Module } from '@nestjs/common';
import { LocationsController } from './controller/locations.controller';
import { LocationsService } from './service/locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
