import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { Product } from '../models/Product';
import { productSchema } from '../validators/productValidators';

export const listProducts = async (_req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Product);
  const products = await repo.find();
  return res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const parsed = productSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
  const repo = AppDataSource.getRepository(Product);
  const product = repo.create(parsed.data);
  await repo.save(product);
  return res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const parsed = productSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
  const repo = AppDataSource.getRepository(Product);
  const product = await repo.findOne({ where: { id: req.params.id } });
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  repo.merge(product, parsed.data);
  await repo.save(product);
  return res.json(product);
};
