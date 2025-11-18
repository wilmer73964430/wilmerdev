import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { env } from '../config/env';

export const metrics = async (_req: Request, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const productRepo = AppDataSource.getRepository(Product);
  const userRepo = AppDataSource.getRepository(User);

  const totalOrders = await orderRepo.count();
  const paidOrders = await orderRepo.count({ where: { status: 'access_available' } });
  const products = await productRepo.find({ relations: ['items'] });
  const revenue = (await orderRepo.find()).reduce((sum, o) => sum + Number(o.total), 0);
  const topProducts = products.map((p) => ({
    title: p.title,
    downloads: p.items?.length || 0
  }));
  const users = await userRepo.count();

  res.json({ totalOrders, paidOrders, revenue, topProducts, users, purchaseCap: env.purchaseCap });
};

export const adminUsers = async (_req: Request, res: Response) => {
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();
  res.json(users);
};

export const updatePurchaseSettings = async (req: Request, res: Response) => {
  const { minItems, maxItems } = req.body;
  if (typeof minItems === 'number') env.minItems = minItems;
  if (typeof maxItems === 'number') env.maxItems = maxItems;
  res.json({ minItems: env.minItems, maxItems: env.maxItems });
};
