"use client";

import { useState } from "react";

interface ProductHeroGalleryProps {
  title: string;
  coverImage: string;
  galleryImages: string[];
}

export default function ProductHeroGallery({ title, coverImage, galleryImages }: ProductHeroGalleryProps) {
  const gallery = galleryImages && galleryImages.length > 0 ? galleryImages : [coverImage];
  const [activeImage, setActiveImage] = useState(coverImage);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className="lg:col-span-6 flex flex-col gap-space-md">
        {/* Main Book Stage */}
        <div className="relative w-full bg-surface-deep p-space-lg lg:p-space-2xl flex flex-col items-center justify-center min-h-[460px] lg:min-h-[560px] overflow-hidden group shadow-2xl">
          {/* Background Glow Element */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
          
          {/* Realistic Editorial Book Mockup with Spine Depth */}
          <div className="relative flex items-center justify-center scale-95 md:scale-100 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
            {/* Subtle cast drop-shadow */}
            <div className="absolute -bottom-6 w-[86%] h-8 bg-surface-container-lowest/80 blur-xl"></div>
            
            {/* Book Construct: Spine + Hardcover Face */}
            <div className="flex items-stretch shadow-2xl">
              {/* Physical Simulated Spine */}
              <div className="w-5 md:w-7 bg-surface-container-highest flex flex-col justify-between items-center py-6 px-0.5 shadow-inner">
                <span className="font-label-sm text-[8px] uppercase tracking-widest text-text-muted [writing-mode:vertical-rl] rotate-180">IDC STUDIO</span>
                <span className="font-headline-sm text-[11px] font-bold text-text-editorial [writing-mode:vertical-rl] rotate-180 tracking-widest">MODERN CREATIVE</span>
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              </div>
              
              {/* Book Front Cover */}
              <div className="w-[280px] sm:w-[320px] md:w-[350px] aspect-[1/1.42] bg-surface-card relative overflow-hidden flex flex-col justify-between p-space-lg">
                <img 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" 
                  alt={title} 
                  src={activeImage} 
                />
                {/* Gloss / Lighting reflection sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-surface-deep/40 via-transparent to-primary/10 pointer-events-none"></div>
                
                {/* Interactive zoom trigger badge */}
                <button 
                  onClick={() => setIsZoomed(true)}
                  className="absolute top-space-sm right-space-sm bg-surface-deep/90 text-text-editorial hover:text-primary-container px-space-xs py-1 text-label-sm font-label-sm uppercase flex items-center gap-1 backdrop-blur-sm shadow-md transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">fullscreen</span>
                  <span>Zoom Cover</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom quick inspect badge */}
          <div className="mt-space-lg z-10 flex items-center gap-space-sm">
            <a className="inline-flex items-center gap-space-2xs px-space-sm py-1.5 bg-surface-variant hover:bg-surface-card text-text-editorial font-label-sm text-label-sm uppercase tracking-wider transition-colors" href="#spread-preview">
              <span className="material-symbols-outlined text-primary-container text-[16px]">menu_book</span>
              <span>View Samples</span>
            </a>
          </div>
        </div>

        {/* Carousel Thumbnails */}
        {gallery.length > 1 && (
          <div className="grid grid-cols-5 gap-space-xs">
            {gallery.slice(0, 5).map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`thumb-btn flex flex-col items-center gap-1 p-space-xs hover:bg-surface-card-hover text-left transition-colors ${activeImage === img ? 'bg-surface-card ring-1 ring-border-active' : 'bg-surface-deep'}`}
              >
                <div className="w-full aspect-[3/4] bg-surface-canvas overflow-hidden">
                  <img className="w-full h-full object-cover" src={img} alt={`Preview ${idx + 1}`} />
                </div>
                <span className="font-label-sm text-[9px] uppercase tracking-wider text-text-editorial truncate w-full text-center">
                  0{idx + 1}. PREVIEW
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL FOR ZOOM PREVIEW */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-surface-deep/95 backdrop-blur-md flex items-center justify-center p-space-md" 
          onClick={() => setIsZoomed(false)}
        >
          <div 
            className="relative bg-surface-canvas max-w-2xl w-full p-space-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-editorial text-label-lg uppercase flex items-center gap-1"
            >
              <span className="material-symbols-outlined">close</span> Close
            </button>
            <div className="w-full aspect-[3/4] bg-surface-deep mt-space-md overflow-hidden flex items-center justify-center">
              <img className="w-full h-full object-contain" alt="High-resolution zoomed view" src={activeImage} />
            </div>
            <div className="mt-space-sm text-center font-mono text-[11px] text-text-muted uppercase">
              High-Res Folio Preview • {title}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
