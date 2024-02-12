import { Module } from '@nestjs/common';
import { LocationsController } from './controller/locations.controller';
import { LocationsService } from './service/locations.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {}
