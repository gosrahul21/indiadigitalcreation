import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('order_id');

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Extract products and assets
    const products = order.orderItems.map((item) => ({
      id: item.product.id,
      title: item.product.title,
      coverImage: item.product.coverImage,
      hostedLink: item.product.hostedLink,
      hostedLinks: item.product.hostedLinks,
      formats: item.product.formats
    }));

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      totalAmount: order.totalAmount,
      products
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
