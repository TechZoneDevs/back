import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CategoryModule } from 'src/category/category.module';
import { LocationModule } from 'src/location/location.module';
import { UserModule } from 'src/user/user.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule, LocationModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
