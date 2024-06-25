import { Payment } from 'src/payment/payment.entity';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAd: Date;

  @OneToOne(() => Payment, (payment) => payment.payment)
  pago: Payment;

  @Column( { nullable: true})
  userId: number;

  @ManyToOne(() => User, (user) => user.userOrder)
  user: User;

  @ManyToMany(() => Product, (product) => product.orders)
  products: Product[];
}
