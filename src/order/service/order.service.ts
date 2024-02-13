import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../order.entity';
import { UserService } from 'src/user/service/user.service';
import { ProductService } from 'src/product/service/product.service';
import { DeepPartial } from 'typeorm';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private OrderService: Repository<Order>,
        private userService: UserService,
        private productService: ProductService,
    ) {}

    async createUserCarrito(userCarritoDto: CreateUserCarritoDto) {
        const userId = userCarritoDto.userId || userCarritoDto.user.id;
        const userFound = await this.userService.findOne(userId);

        if (!(userFound instanceof User)) {
            throw new Error("Usuario no encontrado");
        }

        const productIds = Array.isArray(userCarritoDto.productId) ? userCarritoDto.productId : [userCarritoDto.productId];
        const productsFound = await Promise.all(productIds.map(async (productId) =>
            await this.productService.(productId) 
        ));

        if (productsFound.some(product => !(product instanceof Product))) {
            throw new Error("Al menos uno de los productos no fue encontrado");
        }

        const userCarritoPartial: DeepPartial<Order> = {
            user: userFound,
            products: productsFound,
        };

        const createdUserCarrito = await this.OrderService.create(userCarritoPartial);
        await this.OrderService.save(createdUserCarrito);

        return createdUserCarrito;
    }

    async findByUserId(userId: number) {
        return await this.OrderService.find({ relations: ['user', 'products'], where: { user: { id: userId } } });
    }

    async findAll() {
        return await this.OrderService.find({ relations: ['user', 'products'] });
    }
}
