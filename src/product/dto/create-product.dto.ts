import { UUID } from "crypto";
import { Category } from "src/category/category.entity";
import { Order } from "src/order/order.entity";

export class CreateProductDto {
  name: string;
  price: number;
  imgs?: string;  
  marca?: string;
  descuento?: number;
  status?: string;
  description: string;
  stock?: number;
  userId?: UUID;
  categories: Category[]
  orders: []
  categoriesId: [];
  locationId?: number;
  productsOrder: Order[]
}
