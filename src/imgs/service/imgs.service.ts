import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImgEntity } from '../img.entity';
import { Repository } from 'typeorm';
import { CreateimgDto } from '../dto/create-img.dto';
import { UpdateImgDto } from '../dto/update-img.dto';

@Injectable()
export class ImgsService {
    constructor(
        @InjectRepository(ImgEntity) private imgService: Repository<ImgEntity>
    ){}

    async findAll(){
        return await this.imgService.find()
    }

    async findOne(id: number){
        const imgFound = await this.imgService.findOne({where: {id}})
        if(!imgFound) return new HttpException('img no encontrada', HttpStatus.CONFLICT)

        return imgFound
    }

    async createimg(newimg: CreateimgDto){
        const imgCreated = await this.imgService.create(newimg)

        if(imgCreated) return this.imgService.save(imgCreated)
    }

    async updateimg(id: number, imgUpdate: UpdateImgDto){
        const imgFound = await this.imgService.findOne({where: {id}})
        if(!imgFound) return new HttpException('img no encontrada', HttpStatus.CONFLICT)
        return this.imgService.update({id}, imgUpdate)
    }

    async deleteimg(id: number){
        const deletedimg = await this.imgService.delete({id})
        if(deletedimg.affected === 0) return  new HttpException('img no eliminada', HttpStatus.CONFLICT)
        return deletedimg
    }
}
