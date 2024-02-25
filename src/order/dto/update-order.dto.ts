import { UUID } from "crypto";
import { Order } from "../order.entity";
import { OrderModule } from "../order.module";

export class updateOrderDto{
    id:UUID
    orderContent:OrderModule
}