import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get('x-webhook-signature');
    const timestamp = req.headers.get('x-webhook-timestamp');

    if (!signature || !timestamp) {
      return NextResponse.json({ error: 'Missing headers' }, { status: 400 });
    }

    // Verify signature
    const secret = process.env.CASHFREE_SECRET_KEY || 'dummy-cashfree-secret-key';
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(timestamp + bodyText)
      .digest('base64');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    const payload = JSON.parse(bodyText);

    if (payload.type === 'PAYMENT_SUCCESS_WEBHOOK') {
      const rawOrderId = payload.data?.order?.order_id;
      const cashfreeOrderId = String(payload.data?.payment?.cf_payment_id);
      
      if (rawOrderId) {
        // Strip out the _R timestamp suffix if this was a retried payment
        const orderId = rawOrderId.split('_R')[0];

        // Update Order
        await prisma.order.update({
          where: { id: orderId },
          data: { status: 'PAID' }
        });
        
        // Update or Create Transaction
        await prisma.transaction.upsert({
          where: { cashfreeOrderId },
          update: { status: 'SUCCESS' },
          create: {
            orderId,
            cashfreeOrderId,
            status: 'SUCCESS',
            amount: payload.data?.order?.order_amount || 0,
            paymentMethod: payload.data?.payment?.payment_group || 'UNKNOWN'
          }
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
