import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { CreateBrandDto } from './dto/CreateBrand.dto';
import { UpdateBrandDto } from './dto/UpdateBrand.dto';


@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand) private brandService: Repository <Brand>
    ){}

    async createBrand(newBrand: CreateBrandDto){
        const verifyBrand = await this.brandService.findOne({ where: {name: newBrand.name }});
        if(verifyBrand){
            return new HttpException('Esta marca ya existe.', 400);
        } else {
            const nuevaMarca = this.brandService.create(newBrand);
            return await this.brandService.save(nuevaMarca);
        }
    }

    async findBrand(id: number){
        const findBrand = await this.brandService.findOne({ where: { id }});
        if(findBrand){
            return findBrand;
        } else {
            return new HttpException('Esta marca no existe.', 400);
        }
    }

    async findAllBrands(){
        return this.brandService.find();
    }

    async updateBrand(id: number, updatedBrand: UpdateBrandDto){
        const verifyBrand = await this.brandService.findOne({ where: { id }});
        if (verifyBrand){
            return await this.brandService.update({id}, updatedBrand)
        } else {
            return new HttpException('Esta marca no existe.', 400);
        }
    }

    async deleteBrand(id: number){
        const verifyBrand = await this.brandService.findOne({ where: { id }});
        if (verifyBrand){
            return await this.brandService.delete({ id });
        } else {
            return new HttpException('Esta marca no existe.', 400);
        }
    }
}
