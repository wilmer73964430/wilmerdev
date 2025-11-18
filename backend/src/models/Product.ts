import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { OrderItem } from './OrderItem';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column('decimal')
  price!: number;

  @Column({ default: 0 })
  inventory!: number;

  @Column({ nullable: true })
  deliveryUrl?: string;

  @Column({ nullable: true })
  previewUrl?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => OrderItem, (item) => item.product)
  items!: OrderItem[];
}
