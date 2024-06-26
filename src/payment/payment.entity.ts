import { Order } from 'src/order/order.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  amount: number;

  @OneToOne(() => Order, (order) => order.pago)
  payment: Order;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAd: Date;
}
