import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CategoryService } from 'src/category/category.service';
import { LocationService } from 'src/location/service/location.service';
import { Category } from 'src/category/category.entity';
import { OrderService } from 'src/order/service/order.service';
import { Order } from 'src/order/order.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private ProductService: Repository<Product>,
    @Inject (forwardRef(() => OrderService))
     private readonly CategoryService: CategoryService,
     private readonly LocationService: LocationService,
     private readonly OrderService: OrderService
  ) {}

  async findAll() {
    return this.ProductService.find({
      relations: ['categories', 'location']
    });
  }

  async findOne(id: number) {
    const productFound = await this.ProductService.findOne({ where: { id }, relations: ['categories', 'location'] });
    if (!productFound)
      return new HttpException('Product no encontrado', HttpStatus.CONFLICT);

    return productFound;
  }

  async createProduct(newProduct: CreateProductDto) {
    const productFound = await this.ProductService.findOne({
      where: { name: newProduct.name },
    });
    if (productFound){
      return new HttpException('Ya existe un producto con ese nombre.', HttpStatus.CONFLICT);
    } else {
    if (newProduct.locationId){
      const verifyLocation = await this.LocationService.findOne(newProduct.locationId);
      console.log(verifyLocation);
      if(!verifyLocation){
        console.log(verifyLocation);
        return new HttpException(`La location donde intentas crear el producto no existe.`, 400);
      }
    }
    if(newProduct.categoriesId){
      const categoriasToAdd = newProduct.categoriesId;
      const cateEncontradas = await this.CategoryService.findCategories(categoriasToAdd);
      console.log(cateEncontradas);
      let respose = <Category[]>cateEncontradas
      newProduct.categories = respose;
    }
    if (newProduct.orders){
      const ordersToAdd = newProduct.orders;
      const ordersEncontradas = await this.OrderService.findOrderProductsById(ordersToAdd);
      let respuesta = <Order[]>ordersEncontradas
      newProduct.productsOrder = respuesta;
    }
    return this.ProductService.save(newProduct);

    }
  }

  // async getProductsByCategoryId(id: number) {
  //   return this.ProductService.find({ where: { idCategory: id } });
  // }

  async updateProduct(id: number, ProductUpdate: UpdateProductDto) {
    const productFound = await this.ProductService.findOne({ where: { id } });
    if (!productFound){
      return new HttpException('Product no encontrado', HttpStatus.CONFLICT);
    } else {
      return this.ProductService.update({ id }, ProductUpdate);
    }
  }

  async deleteProduct(id: number) {
    const deletedProduct = await this.ProductService.delete({ id });
    if (deletedProduct.affected === 0)
      return new HttpException('Product no eliminado', HttpStatus.CONFLICT);
    return deletedProduct;
  }
}
