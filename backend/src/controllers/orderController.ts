import { Response } from 'express';
import { AppDataSource } from '../config/db';
import { Order } from '../models/Order';
import { AuthRequest } from '../middleware/auth';
import { verifyDownloadToken } from '../utils/tokens';

export const myOrders = async (req: AuthRequest, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const orders = await orderRepo.find({ where: { user: { id: req.user?.id } }, relations: ['items', 'items.product'] });
  return res.json(orders);
};

export const download = async (req: AuthRequest, res: Response) => {
  const token = req.query.token as string;
  if (!token) return res.status(400).json({ message: 'Token requerido' });
  try {
    const payload = verifyDownloadToken(token) as { orderId: string; userId: string };
    if (payload.userId !== req.user?.id) return res.status(403).json({ message: 'No autorizado' });
    const orderRepo = AppDataSource.getRepository(Order);
    const order = await orderRepo.findOne({ where: { id: payload.orderId }, relations: ['items', 'items.product'] });
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    if (order.status !== 'access_available') return res.status(400).json({ message: 'Acceso aún no disponible' });
    return res.json({ downloadUrls: order.items.map((i) => i.product.deliveryUrl) });
  } catch (e) {
    return res.status(400).json({ message: 'Token inválido' });
  }
};
