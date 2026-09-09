import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      let product = await prisma.product.findUnique({
        where: { slug }
      });

      if (!product) {
        product = await prisma.product.findUnique({
          where: { id: slug }
        }).catch(() => null);
      }

      if (!product) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }

      return NextResponse.json(product);
    }

    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, slug, description, price, formats, coverImage, galleryImages, hostedLink, hostedLinks, category, subcategory, labels, deliverables, personas, faqs, spreadImages } = body;

    if (!title || !slug || price === undefined) {
      return NextResponse.json({ message: 'Missing required fields (title, slug, price)' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        price: parseFloat(price),
        formats,
        coverImage: coverImage || null,
        galleryImages: galleryImages || [],
        hostedLink: hostedLink || null,
        hostedLinks: hostedLinks || [],
        category: category || null,
        subcategory: subcategory || null,
        labels: labels || [],
        deliverables: deliverables || null,
        personas: personas || null,
        faqs: faqs || null,
        spreadImages: spreadImages || null
      }
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'A product with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
