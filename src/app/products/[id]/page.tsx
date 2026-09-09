import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDynamicSections from "./components/ProductDynamicSections";
import AddToCartButton from "./AddToCartButton";
import Link from 'next/link';
import StickyBuyBar from "./components/StickyBuyBar";
import ProductHeroGallery from "./components/ProductHeroGallery";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let product = await prisma.product.findUnique({
    where: { slug: id }
  });

  if (!product) {
    product = await prisma.product.findUnique({
      where: { id }
    }).catch(() => null);
  }

  if (!product) {
    notFound();
  }

  const formats: string[] = Array.isArray(product.formats) ? product.formats as string[] : [];
  const coverImage = product.coverImage || product.galleryImages[0] || 'https://via.placeholder.com/400x600?text=No+Cover';
  const gallery = product.galleryImages.length > 0 ? product.galleryImages : [coverImage];

  return (
    <>
      <Header />
      <main className="w-full pt-16 bg-surface min-h-screen">
        <div className="flex flex-col w-full bg-surface text-on-surface">
          {/*  BREADCRUMB & METADATA OVERLINE  */}
          <div className="w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin-desktop pt-space-lg pb-space-sm flex flex-wrap items-center justify-between gap-space-sm font-label-sm text-label-sm uppercase tracking-widest text-text-muted">
            <div className="flex items-center gap-space-2xs">
              <a className="hover:text-primary transition-colors" href="#">Catalogue</a>
              <span>/</span>
              <a className="hover:text-primary transition-colors" href="#">Ebooks</a>
              <span>/</span>
              <span className="text-primary-container">Digital Products</span>
            </div>
            <div className="flex items-center gap-space-md">
              <span className="flex items-center gap-1 text-primary-container font-bold"><span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span> 2,418 SOLD THIS MONTH</span>
              <span className="hidden md:inline text-border-subtle">•</span>
              <span className="hidden md:inline">LATEST EDITION (2025)</span>
            </div>
          </div>
          {/*  SECTION 1: DUAL COLUMN HERO PURCHASE SUITE  */}
          <section className="w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin-desktop py-space-md lg:py-space-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
              {/*  LEFT COLUMN: BOOK SIMULATION & INTERACTIVE CAROUSEL  */}
              <ProductHeroGallery 
                title={product.title} 
                coverImage={coverImage} 
                galleryImages={gallery} 
              />
              {/*  RIGHT COLUMN: PRODUCT PURCHASING ENGINE  */}
              <div className="lg:col-span-6 flex flex-col gap-space-md bg-surface-deep p-space-lg lg:p-space-xl shadow-xl">
                {/*  Category & Format Meta  */}
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="bg-surface-canvas text-primary-container font-label-sm text-label-sm px-2.5 py-1 tracking-widest uppercase">DIGITAL DOWNLOAD</span>
                  {formats.map((f, i) => (
                    <span key={i} className="bg-surface-container-high text-text-editorial font-label-sm text-label-sm px-2.5 py-1 tracking-widest uppercase">{f}</span>
                  ))}
                </div>
                {/*  Main Title & Hook  */}
                <div className="space-y-space-xs">
                  <h1 className="font-headline-lg text-headline-lg text-text-editorial tracking-tight">
                    {product.title}
                  </h1>
                  <p className="font-body-lg text-body-lg text-text-muted leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
                {/*  Social Proof Metrics Bar  */}
                <div className="flex flex-wrap items-center gap-space-md py-space-xs bg-surface-container px-space-md">
                  <div className="flex items-center gap-1 text-primary-container">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-label-md text-label-md text-text-editorial ml-1 font-bold">5.0</span>
                  </div>
                  <span className="hidden sm:inline text-text-muted">•</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted">Instant Access</span>
                </div>
                {/*  Pricing Engine Box  */}
                <div className="bg-surface-canvas p-space-md flex items-end justify-between gap-space-md">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted">Price</span>
                    <div className="flex items-baseline gap-space-sm mt-1">
                      <span className="font-headline-lg text-headline-lg font-bold text-primary-container">₹{product.price}</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-text-muted">Taxes Included</span>
                    <span className="font-label-sm text-[11px] text-text-editorial font-mono">INR (₹)</span>
                  </div>
                </div>
                {/*  CTAs & Action Buttons  */}
                <AddToCartButton product={product} />
                {/*  Trust Guarantee Checklist  */}
                <div className="bg-surface-container p-space-md space-y-space-xs font-body-sm text-body-sm text-text-muted">
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span className="text-text-editorial"><strong className="font-semibold text-primary">Instant Download:</strong> Get your files immediately after payment — no waiting, no shipping.</span>
                  </div>
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">devices</span>
                    <span><strong className="font-semibold text-text-editorial">Universal Access:</strong> Read your files on any screen or app.</span>
                  </div>
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">lock</span>
                    <span><strong className="font-semibold text-text-editorial">Secure Checkout:</strong> Your payment is encrypted and completely secure.</span>
                  </div>
                </div>
                {/*  Small Metadata Key/Value Grid  */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs pt-space-xs font-mono text-[11px] text-text-muted uppercase">
                  <div className="bg-surface-container-low p-2">
                    <span className="block text-[9px] text-text-muted">File Size</span>
                    <span className="text-text-editorial font-bold">42.8 MB</span>
                  </div>
                  <div className="bg-surface-container-low p-2">
                    <span className="block text-[9px] text-text-muted">Languages</span>
                    <span className="text-text-editorial font-bold">English (US)</span>
                  </div>
                  <div className="bg-surface-container-low p-2">
                    <span className="block text-[9px] text-text-muted">Print Ready</span>
                    <span className="text-text-editorial font-bold">300 DPI CMYK</span>
                  </div>
                  <div className="bg-surface-container-low p-2">
                    <span className="block text-[9px] text-text-muted">Licensing</span>
                    <span className="text-text-editorial font-bold">Studio Sole</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <ProductDynamicSections productSlug={product.slug} />

          {/*  STICKY FLOATING BUY BAR FOR RAPID CONVERSIONS (MOBILE/DESKTOP)  */}
          <StickyBuyBar 
            product={{
              title: product.title,
              slug: product.slug,
              price: product.price,
              coverImage: coverImage,
              formats: formats
            }} 
          />


        </div>
      </main>
      <Footer />
    </>
  );
}
