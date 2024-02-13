import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private ProductService: Repository<Product>
    ){}

    async findAll(){
        return this.ProductService.find()
    }

    async findOne(id: number){
        const productFound = await this.ProductService.findOne({where: {id}})
        if(!productFound) return new HttpException('Product no encontrado', HttpStatus.CONFLICT)

        return productFound
    }

    async createProduct(newProduct: CreateProductDto){
        const productFound = await this.ProductService.findOne({where: {name: newProduct.name}})
        if(productFound)return new HttpException('Product ya existente', HttpStatus.CONFLICT)
        const ProductCreated = await this.ProductService.create(newProduct)

        if(ProductCreated) return this.ProductService.save(ProductCreated)
    }

    async updateProduct(id: number, ProductUpdate: UpdateProductDto){
        const productFound = await this.ProductService.findOne({where: {id}})
        if(!productFound) return new HttpException('Product no encontrado', HttpStatus.CONFLICT)
        return this.ProductService.update({id}, ProductUpdate)
    }

    async deleteProduct(id: number){
        const deletedProduct = await this.ProductService.delete({id})
        if(deletedProduct.affected === 0) return  new HttpException('Product no eliminado', HttpStatus.CONFLICT)
        return deletedProduct
    }
}
