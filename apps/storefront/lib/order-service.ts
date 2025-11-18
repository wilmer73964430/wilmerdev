import { PrismaClient, DeliveryType, OrderStatus, PaymentStatus } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

export const checkoutInput = z.object({
  userId: z.string(),
  variantId: z.string(),
  quantity: z.number().int().positive(),
  coupon: z.string().optional()
});

export async function allocateDigitalCode(variantId: string) {
  const code = await prisma.digitalCode.findFirst({ where: { variantId, consumed: false } });
  if (!code) return null;
  return prisma.digitalCode.update({
    where: { id: code.id },
    data: { consumed: true, consumedAt: new Date() }
  });
}

export async function markOrderPaid(orderId: string) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: OrderStatus.PAID }
  });

  const items = await prisma.orderItem.findMany({ where: { orderId } });
  for (const item of items) {
    if (item.deliveredCodeId) continue;
    const code = await allocateDigitalCode(item.variantId);
    if (code) {
      await prisma.orderItem.update({
        where: { id: item.id },
        data: { deliveredCodeId: code.id }
      });
    }
  }

  return order;
}

export async function recordPayment({
  orderId,
  providerId,
  amountCents,
  currency
}: {
  orderId: string;
  providerId: string;
  amountCents: number;
  currency: string;
}) {
  await prisma.payment.upsert({
    where: { orderId },
    update: { providerId, status: PaymentStatus.SUCCEEDED, amountCents, currency },
    create: {
      orderId,
      provider: 'stripe',
      providerId,
      status: PaymentStatus.SUCCEEDED,
      amountCents,
      currency
    }
  });
  return markOrderPaid(orderId);
}
