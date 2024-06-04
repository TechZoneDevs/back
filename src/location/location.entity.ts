import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( { default: "Default_City"} )
  city: string;

  @Column( { default: "Default_Locality"} )
  localidad: string;

  @OneToMany(() => Product, (product) => product.location)
  locationProducto: Product[];

  @OneToMany(() => User, (user) => user.location)
  locationUser: User[];
}
