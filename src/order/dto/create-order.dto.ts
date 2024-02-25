import { UUID } from "crypto";
import { Product } from "src/product/product.entity";
import { User } from "src/user/user.entity";


export class CreateOrderDto{
    user: User
    product: Array<UUID>
    userId: number
    productId: number[]
}