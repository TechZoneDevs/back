import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../order.entity';
import { UserService } from 'src/user/service/user.service';
import { ProductService } from 'src/product/service/product.service';
import { DeepPartial, Repository } from 'typeorm';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private OrderService: Repository<Order>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async createOrder(OrderDto: CreateOrderDto) {
    const userId = OrderDto.userId || OrderDto.user.id;
    const userFound = await this.userService.findOne(userId);

    if (!(userFound instanceof User)) {
      throw new Error('Usuario no encontrado');
    }

    const productIds = Array.isArray(OrderDto.productId)
      ? OrderDto.productId
      : [OrderDto.productId];
    const productsFound = await Promise.all(
      productIds.map(async (productId) => {
        try {
          const product = await this.productService.findOne(productId);
          if (product instanceof Product) {
            return product;
          } else {
            throw new Error('Producto no encontrado');
          }
        } catch (error) {
          throw new Error(
            `Error al buscar el producto con ID ${productId}: ${error.message}`,
          );
        }
      }),
    );

    const validProductsFound = productsFound.filter(
      (product) => product instanceof Product,
    );

    if (validProductsFound.length !== productIds.length) {
      throw new Error('Al menos uno de los productos no fue encontrado');
    }

    const OrderPartial: DeepPartial<Order> = {
      user: userFound,
      products: validProductsFound,
    };

    const createdOrder = await this.OrderService.create(OrderPartial);
    await this.OrderService.save(createdOrder);

    return createdOrder;
  }

  async findByUserId(userId: number) {
    return await this.OrderService.find({
      relations: ['user', 'products'],
      where: { user: { id: userId } },
    });
  }

  async findById(id: number) {
    return await this.OrderService.findOne({ where: { id } });
  }

  async findAll() {
    return await this.OrderService.find({ relations: ['user', 'products'] });
  }
}
