import { Product } from "src/product/product.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAd: Date;

    @Column({default:"NOT_PAYED"})
    status: string;

    @ManyToOne(()=> User, user => user.id)
    user: User;

    @ManyToMany(() => Product, product => product.productsOrder)
    products: Product[];
    
}