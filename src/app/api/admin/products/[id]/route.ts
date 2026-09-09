import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { title, slug, description, price, formats, coverImage, galleryImages, hostedLink, hostedLinks, category, subcategory, labels, deliverables, personas, faqs, spreadImages } = body;

    if (!title || !slug || price === undefined) {
      return NextResponse.json({ message: 'Missing required fields (title, slug, price)' }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id },
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
    console.error('Error updating product:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'A product with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
