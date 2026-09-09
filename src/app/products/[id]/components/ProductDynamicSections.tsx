"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DynamicData {
  deliverables: any[];
  personas: any[];
  faqs: any[];
  spreadImages: any[];
  reviews: any[];
  relatedProducts: any[];
}

export default function ProductDynamicSections({ productSlug }: { productSlug: string }) {
  const [data, setData] = useState<DynamicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/products/${productSlug}/client-data`)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching dynamic data:", err);
        setLoading(false);
      });
  }, [productSlug]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-32 text-primary-container">
        <span className="material-symbols-outlined text-[32px] animate-spin">sync</span>
      </div>
    );
  }

  if (!data) return null;

  return (
    <>
      {/* SECTION 2: SPREAD VIEWER */}
      {data.spreadImages && data.spreadImages.length > 0 && (
        <section className="w-full bg-surface-deep py-space-3xl mt-space-xl" id="spread-preview">
          <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-space-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container">Preview</span>
                <h2 className="font-headline-lg text-headline-lg text-text-editorial mt-1">Take a Look Inside</h2>
                <p className="font-body-md text-body-md text-text-muted mt-space-2xs max-w-xl">
                  Browse sample pages before you buy. See the design, layout, and content quality for yourself.
                </p>
              </div>
              
              {/* Tab Navigation for Spread Images */}
              {data.spreadImages.length > 1 && (
                <div className="flex items-center gap-space-xs bg-surface-card p-space-2xs overflow-x-auto">
                  {data.spreadImages.map((tab, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      className={`px-4 py-2 font-label-md text-label-md uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === idx ? 'bg-primary-container text-on-primary-fixed' : 'bg-surface-variant hover:bg-surface text-text-editorial'}`}
                    >
                      {tab.tabName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full bg-surface-canvas p-space-md lg:p-space-2xl relative shadow-2xl overflow-hidden">
              <div className="mt-space-lg flex flex-wrap items-center justify-center gap-space-sm text-label-sm font-label-sm uppercase text-text-muted">
                {data.spreadImages[activeTab]?.images && data.spreadImages[activeTab].images.split(',').map((imgUrl: string, imgIdx: number) => (
                   <img 
                      key={imgIdx} 
                      src={imgUrl.trim()} 
                      alt="Spread Preview" 
                      onClick={() => setZoomImage(imgUrl.trim())}
                      className="max-w-full h-auto object-contain border border-border-subtle shadow-lg mb-8 cursor-zoom-in hover:shadow-2xl transition-all hover:scale-[1.01]" 
                   />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: DELIVERABLES */}
      {data.deliverables && data.deliverables.length > 0 && (
        <section className="w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin-desktop py-space-3xl">
          <div className="flex flex-col gap-space-2xl">
            <div className="max-w-2xl">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container">What's Included</span>
              <h2 className="font-headline-lg text-headline-lg text-text-editorial mt-1">Everything You Get With Your Purchase</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
              {data.deliverables.map((item, idx) => (
                <div key={idx} className="bg-surface-deep p-space-lg flex flex-col justify-between gap-space-lg hover:-translate-y-1 transition-transform shadow-lg group">
                  <div className="space-y-space-md">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm font-mono text-primary-container bg-surface-canvas px-2 py-1">0{idx + 1} / ITEM</span>
                      <span className="material-symbols-outlined text-text-muted group-hover:text-primary-container transition-colors text-[24px]">
                        {item.icon || 'star'}
                      </span>
                    </div>
                    {item.image && (
                      <div 
                        className="w-full h-32 bg-surface-canvas overflow-hidden border border-border-subtle cursor-zoom-in group/img relative"
                        onClick={() => setZoomImage(item.image)}
                      >
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span className="material-symbols-outlined text-white shadow-sm">zoom_in</span>
                        </div>
                        <img className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" src={item.image} alt={item.title} />
                      </div>
                    )}
                    <h3 className="font-headline-sm text-headline-sm text-text-editorial">{item.title}</h3>
                    <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {item.formatText && (
                    <div className="pt-space-sm font-label-sm text-[11px] text-text-editorial font-mono uppercase bg-surface-container p-2">
                      {item.formatText}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: PERSONAS */}
      {data.personas && data.personas.length > 0 && (
        <section className="w-full bg-surface-container py-space-3xl">
          <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-space-2xl">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container">Who Is This For?</span>
              <h2 className="font-headline-lg text-headline-lg text-text-editorial mt-1">Made For Creative Professionals</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
              {data.personas.map((persona, idx) => (
                <div key={idx} className="bg-surface-deep p-space-lg flex flex-col justify-between shadow">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-surface-canvas flex items-center justify-center text-primary-container mb-space-md">
                      <span className="material-symbols-outlined text-[20px]">{persona.icon || 'person'}</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-text-editorial">{persona.title}</h3>
                    <p className="font-body-sm text-body-sm text-text-muted mt-space-xs leading-relaxed">
                      {persona.description}
                    </p>
                  </div>
                  {persona.focus && (
                    <div className="mt-space-md pt-space-xs font-label-sm text-label-sm text-primary-container uppercase">
                      Focus: {persona.focus}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: REVIEWS */}
      {data.reviews && data.reviews.length > 0 && (
        <section className="w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin-desktop py-space-3xl" id="reviews">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
            <div className="lg:col-span-4 bg-surface-deep p-space-xl flex flex-col gap-space-lg shadow-xl">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container">Customer Reviews</span>
                <h2 className="font-headline-lg text-headline-lg text-text-editorial mt-1">4.9 / 5.0</h2>
                <div className="flex items-center gap-1 text-primary-container my-space-xs">
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
              </div>
              <div className="p-space-sm bg-surface-canvas text-text-muted font-body-sm text-body-sm leading-relaxed">
                Only verified buyers who have completed a purchase can leave a review.
              </div>
            </div>
            
            <div className="lg:col-span-8 flex flex-col gap-space-md">
              {data.reviews.map((review, idx) => (
                <div key={idx} className="bg-surface-deep p-space-lg shadow-md space-y-space-sm">
                  <div className="flex flex-wrap items-center justify-between gap-space-xs">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center font-bold text-primary-container font-mono text-xs">
                        {review.author.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-[16px] text-text-editorial font-bold">{review.author}</h4>
                        {review.role && <p className="font-label-sm text-[11px] text-text-muted">{review.role}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="bg-surface-canvas text-primary-container text-label-sm font-label-sm px-2 py-0.5 uppercase tracking-widest flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified</span> Verified Buyer
                      </span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-text-editorial leading-relaxed">
                    "{review.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: FAQ */}
      <section className="w-full bg-surface-deep py-space-3xl">
        <div className="max-w-4xl mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-space-xl">
          <div className="text-center">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container">Common Questions</span>
            <h2 className="font-headline-lg text-headline-lg text-text-editorial mt-1">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-space-xs">
            {/* Global FAQs */}
            <details className="group bg-surface-container p-space-md cursor-pointer transition-colors open:bg-surface-container-high" open={true}>
              <summary className="flex items-center justify-between font-headline-sm text-[18px] text-text-editorial list-none">
                <span>How do I access and download my ebook after paying?</span>
                <span className="material-symbols-outlined text-primary-container transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="pt-space-sm font-body-md text-body-md text-text-muted leading-relaxed">
                Right after your payment goes through, you'll be taken to a download page with one-click download buttons for all your files. You'll also receive an email with a permanent download link you can use anytime.
              </div>
            </details>
            <details className="group bg-surface-container p-space-md cursor-pointer transition-colors open:bg-surface-container-high">
              <summary className="flex items-center justify-between font-headline-sm text-[18px] text-text-editorial list-none">
                <span>Can I read this comfortably on Kindle, iPad, and phone?</span>
                <span className="material-symbols-outlined text-primary-container transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="pt-space-sm font-body-md text-body-md text-text-muted leading-relaxed">
                Yes. Your download includes both a layout-fixed Master PDF and a reflowable EPUB file designed for the Apple Books app, Amazon Kindle (Send-to-Kindle compliant), and standard e-readers.
              </div>
            </details>

            {/* Product Specific FAQs */}
            {data.faqs && data.faqs.map((faq, idx) => (
              <details key={idx} className="group bg-surface-container p-space-md cursor-pointer transition-colors open:bg-surface-container-high">
                <summary className="flex items-center justify-between font-headline-sm text-[18px] text-text-editorial list-none">
                  <span>{faq.question}</span>
                  <span className="material-symbols-outlined text-primary-container transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="pt-space-sm font-body-md text-body-md text-text-muted leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: RELATED PRODUCTS */}
      {data.relatedProducts && data.relatedProducts.length > 0 && (
        <section className="w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin-desktop py-space-3xl">
          <div className="flex flex-col gap-space-2xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container">You May Also Like</span>
                <h2 className="font-headline-lg text-headline-lg text-text-editorial mt-1">Often Bought Together</h2>
              </div>
              <Link href="/products" className="font-label-md text-label-md uppercase tracking-wider text-primary-container hover:text-text-editorial transition-colors flex items-center gap-1">
                <span>View Complete IDC Library</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
              {data.relatedProducts.map((p) => (
                <div key={p.id} className="bg-surface-deep p-space-md flex flex-col justify-between group hover:-translate-y-1 transition-transform shadow-lg">
                  <Link href={`/products/${p.slug}`} className="block space-y-space-md">
                    <div className="relative w-full aspect-[4/3] bg-surface-canvas overflow-hidden">
                      {p.coverImage ? (
                        <img className="w-full h-full object-cover" src={p.coverImage} alt={p.title} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-muted">No Image</div>
                      )}
                      {p.labels && p.labels.length > 0 && (
                        <span className="absolute top-2 right-2 bg-surface-deep/90 text-primary-container font-label-sm text-[10px] px-2 py-0.5 uppercase">
                          {p.labels[0]}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-text-editorial group-hover:text-primary-container transition-colors">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                  <div className="mt-space-md pt-space-sm flex items-center justify-between">
                    <span className="font-headline-sm text-[20px] font-bold text-text-editorial">₹{p.price}</span>
                    <Link href={`/checkout?slug=${p.slug}`} className="px-space-sm py-1.5 bg-surface-card hover:bg-primary-container hover:text-on-primary-fixed text-text-editorial font-label-sm text-label-sm uppercase transition-colors">
                      Add to Order
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LIGHTBOX MODAL FOR ZOOM PREVIEW */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-[100] bg-surface-deep/95 backdrop-blur-md flex items-center justify-center p-space-md" 
          onClick={() => setZoomImage(null)}
        >
          <div 
            className="relative bg-surface-canvas max-w-5xl w-full h-[90vh] p-space-lg shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()} // prevent click inside modal from closing it
          >
            <button 
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 z-10 text-text-muted hover:text-text-editorial text-label-lg uppercase flex items-center gap-1 bg-surface-deep/80 backdrop-blur px-3 py-1 shadow"
            >
              <span className="material-symbols-outlined">close</span> Close
            </button>
            <div className="w-full h-full bg-surface-deep overflow-hidden flex items-center justify-center p-4">
              <img className="max-w-full max-h-full object-contain shadow-xl" alt="High-resolution zoomed view" src={zoomImage} />
            </div>
            <div className="mt-space-sm text-center font-mono text-[11px] text-text-muted uppercase">
              High-Res Preview • India Digital Creatives
            </div>
          </div>
        </div>
      )}

    </>
  );
}
