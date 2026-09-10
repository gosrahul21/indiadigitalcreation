import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const dbOrder = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!dbOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (dbOrder.status === 'PAID') {
      return NextResponse.json({ error: 'Order is already paid' }, { status: 400 });
    }

    // Generate a unique Cashfree order ID by appending a timestamp to the original DB order ID
    // This circumvents Cashfree's unique order_id constraint while keeping our DB clean
    const cashfreeOrderId = `${dbOrder.id}_R${Date.now()}`;

    // Determine the base URL for the return redirect
    const baseUrl = process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3001');

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': process.env.CASHFREE_APP_ID || '',
        'x-client-secret': process.env.CASHFREE_SECRET_KEY || ''
      },
      body: JSON.stringify({
        order_id: cashfreeOrderId,
        customer_details: {
          customer_id: dbOrder.userId || 'cust_' + Date.now(),
          customer_phone: dbOrder.customerPhone || '9999999999',
          customer_name: dbOrder.customerName || 'Customer',
          customer_email: dbOrder.customerEmail || 'customer@example.com'
        },
        order_meta: {
          return_url: `${baseUrl}/checkout/success?order_id=${dbOrder.id}`,
          notify_url: `${baseUrl}/api/webhooks/cashfree`
        },
        order_amount: dbOrder.totalAmount || 299.00,
        order_currency: 'INR'
      })
    };

    const defaultApiUrl = process.env.NODE_ENV === 'production' ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';
    const apiUrl = process.env.CASHFREE_API_URL || defaultApiUrl;
    const response = await fetch(`${apiUrl}/orders`, options);
    
    if (!response.ok) {
      const err = await response.json();
      console.error('Cashfree Retry Order Error:', err);
      return NextResponse.json({ error: 'Failed to create retry order', details: err }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Order retry failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
