import { Location } from 'src/location/location.entity';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( { nullable: true } )
  name: string;

  @Column( { unique: true } )
  email: string;

  @Column()
  password: string;

  @Column( { nullable: true } )
  imgAvatar: string;

  @Column( { nullable: true } )
  biografia: string;

  @Column( { nullable: true })
  status: boolean;

  @Column( { nullable: true })
  locationId: number;

  @ManyToOne(() => Location, (location) => location.locationUser)
  location: Location;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAd: Date;
}
