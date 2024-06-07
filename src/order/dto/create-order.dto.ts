import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';

export class CreateOrderDto {
  userId: number;
  productId: number[];
}
