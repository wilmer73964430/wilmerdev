import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './Product';
import { Order } from './Order';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Product, (product) => product.items)
  product!: Product;

  @ManyToOne(() => Order, (order) => order.items)
  order!: Order;

  @Column('int')
  quantity!: number;

  @Column('decimal')
  price!: number;
}
