import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { OrderItem } from './OrderItem';

export type OrderStatus = 'pending' | 'paid' | 'access_available';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @Column({ default: 'pending' })
  status!: OrderStatus;

  @Column('decimal', { default: 0 })
  total!: number;

  @Column({ nullable: true })
  downloadUrl?: string;

  @Column({ nullable: true })
  paymentIntentId?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items!: OrderItem[];
}
