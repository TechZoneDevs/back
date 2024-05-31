import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LocationService } from '../service/location.service';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { CreateLocationDto } from '../dto/create-location.dto';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  findLocations() {
    return this.locationService.findAll();
  }

  @Post()
  createLocation(@Body() location: CreateLocationDto) {
    return this.locationService.createLocation(location);
  }

  @Get(':id')
  findLocation(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @Delete(':id')
  deletedLocation(@Param('id') id: string) {
    return this.locationService.deleteLocation(+id);
  }

  @Patch(':id')
  updateLocation(@Param('id') id: string, @Body() update: UpdateLocationDto) {
    return this.locationService.updateLocation(+id, update);
  }
}
