import { Product, Currency } from '../models/index.js';
import { convertPrice } from '../services/currencyService.js';

export const listProducts = async (req, res) => {
  const currency = req.query.currency || 'USD';
  const products = await Product.findAll();
  const mapped = await Promise.all(products.map(async (p) => {
    const price = await convertPrice(p.priceUsd, currency);
    return { ...p.toJSON(), displayPrice: price.amount, currency: price.currency };
  }));
  res.json(mapped);
};

export const createProduct = async (req, res) => {
  const payload = { ...req.body, sellerId: req.user.id };
  const product = await Product.create(payload);
  res.json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'No encontrado' });
  await product.update(req.body);
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'No encontrado' });
  await product.destroy();
  res.json({ message: 'Eliminado' });
};
