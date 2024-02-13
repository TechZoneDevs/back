import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Location } from '../location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Location) private locationService: Repository<Location>
    ){}

    async findAll(){
        return this.locationService.find()
    }

    async findOne(id: number){
        const locationFound = await this.locationService.findOne({where: {id}})
        if(!locationFound) return new HttpException('Location no encontrado', HttpStatus.CONFLICT)

        return locationFound
    }

    async createLocation(newLocation: CreateLocationDto){
        const locationCreated = await this.locationService.create(newLocation)

        if(locationCreated) return this.locationService.save(locationCreated)
    }

    async updateLocation(id: number, update: UpdateLocationDto ){
        const locationFound = await this.locationService.findOne({where: {id}})
        if(!locationFound) return new HttpException('Location no encontrado', HttpStatus.CONFLICT)
        return this.locationService.update({id}, update)
    }

    async deleteLocation(id: number){
        const deletedLocation = await this.locationService.delete({id})
        if(deletedLocation.affected === 0) return  new HttpException('Location no eliminado', HttpStatus.CONFLICT)
        return deletedLocation
    }
}
