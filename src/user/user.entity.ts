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

  @Column()
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
  idLocation: number;

  @OneToMany(() => Order, (order) => order.user)
  userOrder: Order[];

  // @OneToMany(() => Product, (product) => product.vendedor)
  // products: Product[];

  @OneToMany(() => Location, (location) => location.locationUser)
  location: Location;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAd: Date;
}
