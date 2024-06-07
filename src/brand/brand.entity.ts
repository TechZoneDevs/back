import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/product/product.entity';

@Entity()

export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column( { unique: true } )
    name: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAd: Date;

    @OneToMany( () => Product, (product) => product.brand)
    products: Product[];
    
}