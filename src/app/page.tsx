import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const activeCategory = params.category;
  
  const products = await prisma.product.findMany({
    where: activeCategory ? { category: activeCategory } : undefined,
    orderBy: { createdAt: 'desc' },
  });

  const heroProduct1 = products[0];
  const heroProduct2 = products[1] || products[0]; // fallback if only 1 product exists

  return (
    <>
      <Header />
      <main className="w-full pt-16 bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          {/* 1. HERO SECTION */}
          <section className="relative w-full bg-surface-deep overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-container via-surface to-transparent"></div>
            <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin-desktop pt-space-3xl pb-space-4xl relative z-10">
              {/* <div className="flex flex-wrap items-center justify-between gap-space-xs pb-space-lg mb-space-xl border-b border-border-subtle">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 bg-primary-container inline-block"></span>
                  <span className="font-label-sm text-label-sm text-primary-container tracking-widest uppercase">CATALOG VOL. 04 • DIGITAL DOWNLOADS</span>
                </div>
              </div> */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
                <div className="lg:col-span-7 flex flex-col space-y-space-lg">
                  <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-space-3xs bg-surface-canvas text-primary-container font-label-sm text-label-sm uppercase tracking-wider border border-primary/20">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    <span>INSTANT DOWNLOAD ON CHECKOUT</span>
                  </div>
                  <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-text-editorial uppercase leading-none tracking-tight">
                    Digital Products <br/>
                    <span className="italic font-headline-lg text-primary-container font-normal lowercase tracking-normal">worth</span> Keeping.
                  </h1>
                  <p className="font-body-lg text-body-lg text-text-muted max-w-xl">
                    Books, ebooks, operational guides and creative design systems engineered to help you master modern craft and launch your ventures.
                  </p>
                  <div className="pt-space-md flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md">
                    <Link className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md bg-primary-container text-on-primary-fixed font-label-lg text-label-lg uppercase tracking-wider shadow-lg hover:bg-surface-tint transition-all group" href="#featured-products">
                      <span>Shop Products</span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                </div>

                {/* Right Side: Overlapping Mockup Showcase */}
                <div className="lg:col-span-5 relative mt-space-xl lg:mt-0">
                  <div className="relative w-full h-[460px] bg-surface-canvas p-space-lg flex items-center justify-center shadow-2xl">
                    {/* Background Ambient Accents */}
                    <div className="absolute -top-6 -right-6 w-36 h-36 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>
                    
                    {/* Overlapping Product 1 (Main Focal) */}
                    {heroProduct1 && (
                      <Link href={`/products/${heroProduct1.slug}`} className="absolute left-6 top-8 w-60 z-20 transition-transform hover:-translate-y-2 duration-300 group block">
                        <div className="bg-surface-card p-space-sm shadow-2xl border border-border-subtle group-hover:border-primary-container/50 transition-colors">
                          <div className="w-full h-72 bg-surface-container-high relative overflow-hidden flex flex-col justify-between p-space-md">
                            <img 
                              src={heroProduct1.coverImage || (heroProduct1.galleryImages && heroProduct1.galleryImages[0]) || 'https://via.placeholder.com/400x500?text=Product'} 
                              alt={heroProduct1.title}
                              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:opacity-80 transition-opacity" 
                            />
                            <div className="relative z-10 flex justify-between items-start">
                              <span className="bg-primary-container text-on-primary-fixed font-label-sm text-label-sm uppercase px-1.5 py-0.5">FOLIO #01</span>
                              <span className="font-headline-sm text-headline-sm text-text-editorial font-bold">₹{heroProduct1.price}</span>
                            </div>
                            <div className="relative z-10 bg-surface-deep/80 backdrop-blur-sm p-2 -mx-2 -mb-2 border-t border-border-subtle">
                              <p className="font-label-sm text-label-sm uppercase text-text-muted tracking-widest">{heroProduct1.category || 'PUBLICATION'}</p>
                              <h3 className="font-headline-sm text-headline-sm text-text-editorial leading-tight mt-1 line-clamp-1">{heroProduct1.title}</h3>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* Overlapping Product 2 (Behind) */}
                    {heroProduct2 && (
                      <Link href={`/products/${heroProduct2.slug}`} className="absolute right-4 bottom-6 w-64 z-10 transition-transform hover:-translate-y-2 duration-300 group block">
                        <div className="bg-surface-variant p-space-sm shadow-xl border border-border-subtle group-hover:border-primary-container/50 transition-colors">
                          <div className="w-full h-72 bg-surface-deep relative overflow-hidden flex flex-col justify-between p-space-md">
                            <img 
                              src={heroProduct2.coverImage || (heroProduct2.galleryImages && heroProduct2.galleryImages[0]) || 'https://via.placeholder.com/400x500?text=Product'} 
                              alt={heroProduct2.title}
                              className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-40 group-hover:opacity-70 transition-opacity" 
                            />
                            <div className="relative z-10 flex justify-between items-start">
                              <span className="bg-surface-card text-text-editorial font-label-sm text-label-sm uppercase px-1.5 py-0.5">NOTION OS</span>
                              <span className="font-headline-sm text-headline-sm text-primary-container font-bold">₹{heroProduct2.price}</span>
                            </div>
                            <div className="relative z-10 bg-surface-container-high/80 backdrop-blur-sm p-2 -mx-2 -mb-2 border-t border-border-subtle">
                              <p className="font-label-sm text-label-sm uppercase text-text-muted tracking-widest">{heroProduct2.category || 'TOOLKIT'}</p>
                              <h3 className="font-headline-sm text-headline-sm text-text-editorial leading-tight mt-1 line-clamp-1">{heroProduct2.title}</h3>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* Floating Stamp Badge */}
                    <div className="absolute -bottom-4 -left-4 z-30 bg-surface-deep p-space-sm shadow-2xl flex items-center gap-space-xs border border-border-subtle">
                      <span className="material-symbols-outlined text-primary-container text-[24px]">verified_user</span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm uppercase text-text-editorial tracking-wider">100% DRM-Free</span>
                        <span className="font-label-sm text-label-sm text-text-muted">Instant PDF, ePub & Files</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. FEATURED PRODUCTS */}
          <section className="w-full bg-surface py-space-4xl" id="featured-products">
            <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin-desktop">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg mb-space-2xl border-b border-border-subtle pb-space-lg">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-text-editorial uppercase">
                    {activeCategory ? `${activeCategory} Collection` : 'All Products'}
                  </h2>
                  <p className="font-body-md text-body-md text-text-muted mt-space-2xs">Curated selection of our best digital assets.</p>
                </div>
                <div className="flex flex-wrap items-center gap-space-xs">
                  <Link href="/" className={`px-space-md py-space-xs font-label-md text-label-md uppercase tracking-wider transition-colors border ${!activeCategory ? 'bg-primary-container text-on-primary-fixed border-primary' : 'bg-surface-card text-text-editorial hover:bg-surface-card-hover border-border-subtle'}`}>All Items</Link>
                  <Link href="/?category=Ebooks" className={`px-space-md py-space-xs font-label-md text-label-md uppercase tracking-wider transition-colors border ${activeCategory === 'Ebooks' ? 'bg-primary-container text-on-primary-fixed border-primary' : 'bg-surface-card text-text-editorial hover:bg-surface-card-hover border-border-subtle'}`}>Ebooks</Link>
                  <Link href="/?category=Templates" className={`px-space-md py-space-xs font-label-md text-label-md uppercase tracking-wider transition-colors border ${activeCategory === 'Templates' ? 'bg-primary-container text-on-primary-fixed border-primary' : 'bg-surface-card text-text-editorial hover:bg-surface-card-hover border-border-subtle'}`}>Templates</Link>
                </div>
              </div>

              {products.length === 0 ? (
                <div className="py-space-4xl text-center text-text-muted font-label-lg uppercase">
                  No products found in this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
                  {products.map((product) => {
                    const coverImg = product.coverImage || (product.galleryImages && product.galleryImages[0]) || 'https://via.placeholder.com/400x600?text=No+Cover';
                    return (
                      <Link href={`/products/${product.slug}`} key={product.id} className="bg-surface-card p-space-lg flex flex-col justify-between hover:bg-surface-card-hover hover:-translate-y-1 transition-all duration-200 group border border-border-subtle hover:border-primary/30 shadow-sm hover:shadow-xl">
                        <div>
                          <div className="relative w-full aspect-[3/4] bg-surface-canvas overflow-hidden mb-space-md flex flex-col justify-between p-space-md">
                            <img className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" src={coverImg} alt={product.title} />
                            <div className="relative z-10 flex items-center justify-between">
                              {product.labels && product.labels.map((label: string) => (
                                <span key={label} className="bg-primary-container text-on-primary-fixed font-label-sm text-label-sm font-bold uppercase px-2 py-0.5">{label}</span>
                              ))}
                            </div>
                            <div className="relative z-10">
                              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container bg-surface-deep/90 px-2 py-0.5 backdrop-blur-sm">
                                {product.category || 'DIGITAL DOWNLOAD'}
                              </span>
                            </div>
                          </div>
                          <h3 className="font-headline-sm text-headline-sm text-text-editorial group-hover:text-primary-container transition-colors leading-snug">{product.title}</h3>
                          <p className="font-body-sm text-body-sm text-text-muted mt-space-2xs line-clamp-2">{product.description}</p>
                        </div>
                        <div className="pt-space-md mt-space-md bg-surface-variant/40 p-space-sm border border-border-subtle/50">
                          <div className="flex items-baseline justify-between mb-space-sm">
                            <span className="font-headline-sm text-headline-sm text-text-editorial font-bold">₹{product.price}</span>
                            <span className="font-label-sm text-label-sm uppercase text-primary-container tracking-wider font-semibold">Instant Access</span>
                          </div>
                          <div className="w-full py-space-xs bg-surface-deep text-text-editorial font-label-md text-label-md uppercase tracking-wider text-center border border-border-subtle group-hover:border-primary-container transition-colors">
                            View Details
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
