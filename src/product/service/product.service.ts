import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private ProductService: Repository<Product>,
        @InjectRepository(User) private UserService: Repository<User> 
    ){}

    async findAll(){
        return this.ProductService.find({
          relations: ["vendedor"]
      });

    }
    async findOne(id: number){
      const productFound = await this.ProductService.findOne({where: {id}})
      if(!productFound) return new HttpException('Product no encontrado', HttpStatus.CONFLICT)

      return productFound
    }
    async createProduct(newProduct: CreateProductDto) {
      try {
        const productFound = await this.ProductService.findOne({ where: { name: newProduct.name } });
        if (productFound) {
          throw new HttpException('Producto ya existente', HttpStatus.CONFLICT);
        }

        const productToCreate: DeepPartial<Product> = {
          name: newProduct.name,
          price: newProduct.price,
          marca: newProduct.marca,
          descuento: newProduct.descuento,
          status: newProduct.status,
          description: newProduct.description,
          stock: newProduct.stock,
        };

        if (Array.isArray(newProduct.vendedor) && newProduct.vendedor.length > 0) {
          const allUsers = await Promise.all(newProduct.vendedor.map(async (userId) => {
            const user = await this.UserService.findOne({ where: { id: Number(userId) } });

            if (!user) {
              throw new HttpException(`Usuario con ID ${userId} no encontrado`, HttpStatus.NOT_FOUND);
            }
            return user;
          }));

          productToCreate.vendedor = allUsers;
        }

        if (newProduct.descuento && newProduct.descuento > 0 && newProduct.descuento < 100) {
          productToCreate.price -= (productToCreate.price * (newProduct.descuento / 100));
        }

        const createdProduct = await this.ProductService.save(productToCreate);

        console.log('Producto creado:', createdProduct);
        return createdProduct;

      } catch (error) {
        console.error('Error al crear el producto:', error);
        throw new HttpException('Error al crear el producto', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    

    async updateProduct(id: number, ProductUpdate: UpdateProductDto){
        const productFound = await this.ProductService.findOne({where: {id}})
        if(!productFound) return new HttpException('Product no encontrado', HttpStatus.CONFLICT)
        if (ProductUpdate.descuento && ProductUpdate.descuento > 0 && ProductUpdate.descuento < 100) {
            ProductUpdate.price -= (ProductUpdate.price * (ProductUpdate.descuento / 100));
        }

        return this.ProductService.update({id}, ProductUpdate)
    }

    async deleteProduct(id: number){
        const deletedProduct = await this.ProductService.delete({id})
        if(deletedProduct.affected === 0) return  new HttpException('Product no eliminado', HttpStatus.CONFLICT)
        return deletedProduct
    }
}
