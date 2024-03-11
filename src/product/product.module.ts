import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { User } from 'src/user/user.entity';
import { ProtectedProductController } from './protected/protectedProduct.controller';
import { ProtectedProductService } from './protected/protectedProduct.service';
import { ProductMiddleware } from './protected/product.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Product,User])],
  controllers: [ProtectedProductController,ProductController],
  providers: [ProductService,ProtectedProductService,ProductMiddleware],
  exports: [ProductService,ProtectedProductService]
})
export class ProductModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(ProductMiddleware)
    .forRoutes(ProtectedProductController)
  }
}
