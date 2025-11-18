import { Response } from 'express';
import Stripe from 'stripe';
import { env } from '../config/env';
import { checkoutSchema } from '../validators/checkoutValidators';
import { AppDataSource } from '../config/db';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { signDownloadToken } from '../utils/tokens';

const stripe = new Stripe(env.stripeSecretKey || 'sk_test');

export const checkout = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'No autenticado' });
  const parsed = checkoutSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
  const { items } = parsed.data;

  if (req.user.purchaseCount >= env.purchaseCap) {
    return res.status(400).json({ message: 'Solo puedes realizar una compra en total' });
  }

  if (items.length < env.minItems || items.length > env.maxItems) {
    return res
      .status(400)
      .json({ message: `Debes seleccionar entre ${env.minItems} y ${env.maxItems} productos` });
  }

  const productRepo = AppDataSource.getRepository(Product);
  const orderRepo = AppDataSource.getRepository(Order);
  const itemRepo = AppDataSource.getRepository(OrderItem);

  let total = 0;
  const order = orderRepo.create({ user: req.user, status: 'pending', total: 0 });
  order.items = [];

  for (const item of items) {
    const product = await productRepo.findOne({ where: { id: item.productId } });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    if (product.inventory <= 0) return res.status(400).json({ message: 'Sin stock' });
    const orderItem = itemRepo.create({ product, order, quantity: item.quantity, price: product.price });
    total += Number(product.price) * item.quantity;
    order.items.push(orderItem);
  }

  order.total = total;
  await orderRepo.save(order);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100),
    currency: 'usd',
    metadata: { orderId: order.id, userId: req.user.id }
  });

  order.paymentIntentId = paymentIntent.id;
  await orderRepo.save(order);

  return res.json({ clientSecret: paymentIntent.client_secret, orderId: order.id, total });
};

export const webhook = async (req: AuthRequest, res: Response) => {
  const sig = req.headers['stripe-signature'];
  if (!sig) return res.status(400).send('Missing signature');
  let event;
  try {
    event = (await new Stripe(env.stripeSecretKey).webhooks.constructEventAsync(
      (req as any).rawBody,
      sig,
      env.stripeWebhookSecret
    )) as Stripe.Event;
  } catch (err) {
    return res.status(400).send('Webhook error');
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object as Stripe.PaymentIntent;
    const orderRepo = AppDataSource.getRepository(Order);
    const userRepo = AppDataSource.getRepository(User);
    const order = await orderRepo.findOne({ where: { id: intent.metadata?.orderId }, relations: ['user', 'items', 'items.product'] });
    if (order && order.status !== 'paid') {
      order.status = 'access_available';
      order.downloadUrl = signDownloadToken({ orderId: order.id, userId: order.user.id });
      await orderRepo.save(order);
      const user = order.user;
      user.purchaseCount += 1;
      await userRepo.save(user);
    }
  }
  return res.json({ received: true });
};
