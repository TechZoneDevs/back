import { Order } from "src/order/order.entity";
import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Payment{
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(()=> Order, order => order.pago)
    payment: Order
}