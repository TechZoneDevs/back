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
  // userId?: UUID;
  locationId?: number;
  brandId?: number;
  categories: Category[]
  ordersId: []
  categoriesId: [];
  productsOrder: Order[]
}
