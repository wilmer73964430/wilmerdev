import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { recordPayment } from '../../../../lib/order-service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-04-10' });

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    return NextResponse.json({ error: `Firma inválida: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.metadata?.orderId) {
      await recordPayment({
        orderId: session.metadata.orderId,
        providerId: session.id,
        amountCents: Number(session.amount_total ?? 0),
        currency: session.currency ?? 'usd'
      });
    }
  }

  return NextResponse.json({ received: true });
}
