import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');
  const orderId = searchParams.get('orderId');
  const fileKey = searchParams.get('fileKey');

  if (!productId) {
    return NextResponse.json({ message: 'Product ID required' }, { status: 400 });
  }

  try {
    let hasAccess = false;

    // 1. Check access via Order ID (Guest Checkout)
    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { orderItems: true }
      });
      
      if (order && order.status === 'PAID') {
        const hasProduct = order.orderItems.some(item => item.productId === productId);
        if (hasProduct) {
          hasAccess = true;
        }
      }
    }

    // 2. Fallback to Session-based access
    if (!hasAccess) {
      const session = await getServerSession(authOptions);
      if (session && session.user) {
        const userId = (session.user as any).id;
        const isAdmin = (session.user as any).role === 'ADMIN';
        
        if (isAdmin) {
          hasAccess = true;
        } else {
          const paidOrder = await prisma.orderItem.findFirst({
            where: {
              productId: productId,
              order: {
                userId: userId,
                status: 'PAID'
              }
            }
          });
          if (paidOrder) hasAccess = true;
        }
      }
    }

    if (!hasAccess) {
      return NextResponse.json({ message: 'Forbidden. You do not have access to this item.' }, { status: 403 });
    }

    // Fetch product to verify file keys
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    let targetKey = product.hostedLink;
    if (fileKey) {
      // Verify requested fileKey belongs to this product
      const isValidKey = product.hostedLink === fileKey || (product.hostedLinks && product.hostedLinks.includes(fileKey));
      if (!isValidKey) {
        return NextResponse.json({ message: 'Invalid file requested' }, { status: 400 });
      }
      targetKey = fileKey;
    }

    if (!targetKey) {
      return NextResponse.json({ message: 'File not configured for this product' }, { status: 404 });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: targetKey,
    });

    // Generate Pre-Signed URL valid for 15 minutes (900 seconds)
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

    // Instantly redirect customer to their self-destructing secure download link
    return NextResponse.redirect(signedUrl);

  } catch (error) {
    console.error('Error generating download link:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
