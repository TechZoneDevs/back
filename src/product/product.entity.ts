import { Category } from 'src/category/category.entity';
import { Location } from 'src/location/location.entity';
import { Order } from 'src/order/order.entity';
import { User } from 'src/user/user.entity';
import { UUID } from 'crypto';
import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( { nullable: false, default: 'Default_Name' })
  name: string;

  @Column( { nullable: false, default: 321321 } )
  price: number;

  @Column( { nullable: true } )
  imgs: string;

  @Column( { nullable: true } )
  marca: string;

  @Column( { nullable: true } )
  descuento: number;

  @Column( { nullable: true } )
  status: string;

  @Column( { nullable: false, default: 'Default_Description' } )
  description: string;

  @Column( { nullable: true } )
  stock: number;

  @Column( { nullable: true})
  userId: UUID;

  @ManyToMany( () => Category, (category) => category.products)
  @JoinTable({
    name: 'categories_products',
    joinColumn: {
        name: 'categoriesId'
    },
    inverseJoinColumn: {
        name: 'productsId'
    }
})
  categories: Category[];

  @Column( { nullable: true } )
  locationId: number;

  @ManyToOne(() => Location, (location) => location.locationProducto, { nullable: true } )
  location = Location;

  // @ManyToOne(() => User, (user) => user.products, { nullable: true } )
  // vendedor: User;

  @ManyToMany( () => Order, (order) => order.products, )
  @JoinTable({
    name: 'order_products',
    joinColumn: {
        name: 'orderId'
    },
    inverseJoinColumn: {
        name: 'productsId'
    }
})
  productsOrder: Order[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAd: Date;
}
