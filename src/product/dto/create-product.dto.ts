import { UUID } from "crypto";
import { Category } from "src/category/category.entity";
import { Order } from "src/order/order.entity";

export class CreateProductDto {
  name: string;
  price: number;
  imgs?: string;
  descuento?: number;
  status?: string;
  description: string;
  stock?: number;
  userId?: number;
  locationId?: number;
  brandId?: number;
  ordersId: []
  categoriesId: [];
  categories: Category[]
  orders: Order[]
}
