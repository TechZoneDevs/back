import { Product } from "src/product/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ImgEntity{
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   img: string

   @Column()
   productId: number

   @OneToMany(()=> Product, product => product.imgs)
   productoImg: Product
}