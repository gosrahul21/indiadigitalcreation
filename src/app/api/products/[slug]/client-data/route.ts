import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        reviews: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // Fetch related products (same category, excluding current)
    let relatedProducts: any[] = [];
    if (product.category) {
      relatedProducts = await prisma.product.findMany({
        where: {
          category: product.category,
          id: { not: product.id }
        },
        take: 3,
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          price: true,
          formats: true,
          coverImage: true,
          labels: true,
        }
      });
    }

    // If no related by category, just grab the most recent
    if (relatedProducts.length === 0) {
      relatedProducts = await prisma.product.findMany({
        where: { id: { not: product.id } },
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          price: true,
          formats: true,
          coverImage: true,
          labels: true,
        }
      });
    }

    return NextResponse.json({
      deliverables: product.deliverables || [],
      personas: product.personas || [],
      faqs: product.faqs || [],
      spreadImages: product.spreadImages || [],
      reviews: product.reviews || [],
      relatedProducts: relatedProducts || []
    });

  } catch (error) {
    console.error('Error fetching client product data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
