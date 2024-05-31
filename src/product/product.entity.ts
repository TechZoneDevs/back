import { Category } from 'src/category/category.entity';
import { Location } from 'src/location/location.entity';
import { Order } from 'src/order/order.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column( { nullable: true } )
  imgs: string;

  @Column({ nullable: true })
  marca: string;

  @Column({ nullable: true })
  descuento: number;

  @Column( { nullable: true } )
  status: string;

  @Column( { nullable: true } )
  description: string;

  @Column( { nullable: true } )
  stock: number;

  @ManyToMany( () => Category, (category) => category.products)
  categorias: Category[];

  @OneToMany(() => Location, (location) => location.locationProducto)
  location = Location;

  @OneToMany(() => User, (user) => user.publicaciones)
  vendedor: User;

  @ManyToMany(() => Order, (order) => order.products)
  productsOrder: Order[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAd: Date;
}
