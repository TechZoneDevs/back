import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/CreateBrand.dto';
import { UpdateBrandDto } from './dto/UpdateBrand.dto';

@Controller('brand')
export class BrandController {
    constructor(private brandService: BrandService){}

    @Get()
    findBrands(){
        return this.brandService.findAllBrands();
    };

    @Get(':id')
    findBrand(@Param('id') id: number){
        return this.brandService.findBrand(id);
    }

    @Post()
    createBrand(@Body() newBrand: CreateBrandDto){
        return this.brandService.createBrand(newBrand);
    }

    @Delete(':id')
    deleteBrand(@Param('id') id: number){
        return this.brandService.deleteBrand(id);
    }

    @Patch(':id')
    updateBrand(@Body() updateToBrand: UpdateBrandDto, @Param('id') id: number){
        return this.brandService.updateBrand(id, updateToBrand);
    }
}
