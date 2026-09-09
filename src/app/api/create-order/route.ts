import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();

    const { customer_email, customer_name, customer_phone, order_amount, product_id } = body;

    let orderUserId = (session?.user as any)?.id || undefined;
    
    // If no active session but email is provided, try to find or create a user
    if (!orderUserId && customer_email) {
      let existingUser = await prisma.user.findUnique({
        where: { email: customer_email }
      });
      
      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            email: customer_email,
            name: customer_name || 'Guest User',
            emailVerified: null // Verified false
          }
        });
      }
      orderUserId = existingUser.id;
    }

    // Save PENDING order in database first
    const dbOrder = await prisma.order.create({
      data: {
        userId: orderUserId,
        customerEmail: customer_email || (session?.user?.email) || null,
        customerName: customer_name || (session?.user?.name) || null,
        customerPhone: customer_phone || null,
        totalAmount: order_amount || 299.00,
        status: 'PENDING',
        orderItems: product_id ? {
          create: [
            {
              productId: product_id,
              price: order_amount || 299.00
            }
          ]
        } : undefined
      }
    });

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
        order_id: dbOrder.id,
        customer_details: {
          customer_id: orderUserId || 'cust_' + Date.now(),
          customer_phone: customer_phone || '9999999999',
          customer_name: customer_name || (session?.user?.name) || 'Customer',
          customer_email: customer_email || (session?.user?.email) || 'customer@example.com'
        },
        order_meta: {
          return_url: `${process.env.NEXTAUTH_URL}/checkout/success?order_id={order_id}`
        },
        order_amount: order_amount || 299.00,
        order_currency: 'INR'
      })
    };

    const apiUrl = process.env.CASHFREE_API_URL || 'https://sandbox.cashfree.com/pg';
    const response = await fetch(`${apiUrl}/orders`, options);
    
    if (!response.ok) {
      const err = await response.json();
      console.error('Cashfree Order Error:', err);
      return NextResponse.json({ error: 'Failed to create order', details: err }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Order creation failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
