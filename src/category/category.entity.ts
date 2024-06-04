import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Product } from 'src/product/product.entity';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    image: string;

    @ManyToMany( () => Product, (product) => product.categories)
    products: Product[]

}