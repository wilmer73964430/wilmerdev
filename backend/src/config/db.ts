import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { Payment } from '../models/Payment';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: env.databaseUrl,
  synchronize: true,
  logging: false,
  entities: [User, Product, Order, OrderItem, Payment]
});

export const connectDb = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
