import { Location } from 'src/location/location.entity';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  imgAvatar: string;

  @Column({ nullable: true })
  biografia: string;

  @Column()
  status: boolean;

  @Column()
  idLocation: number;

  @OneToMany(() => Order, (order) => order.user)
  userOrder: Order[];

  @ManyToOne(() => Product, (product) => product.vendedor)
  publicaciones: Product[];

  @OneToMany(() => Location, (location) => location.locationUser)
  location: Location;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAd: Date;
}
