"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface StickyBuyBarProps {
  product: {
    title: string;
    slug: string;
    price: number;
    coverImage?: string;
    formats: string[];
  };
}

const INDIAN_NAMES = ["Priya", "Rahul", "Amit", "Sneha", "Karan", "Neha", "Vikram", "Pooja", "Arjun", "Anjali"];

export default function StickyBuyBar({ product }: StickyBuyBarProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [recentBuyer, setRecentBuyer] = useState<string | null>(null);
  const [showBuyer, setShowBuyer] = useState(false);

  useEffect(() => {
    // 1. Random Timer Logic (15-30 minutes) saved in localStorage
    const storageKey = `timer_${product.slug}`;
    const savedEndTime = localStorage.getItem(storageKey);
    
    if (savedEndTime && parseInt(savedEndTime, 10) > Date.now()) {
      setTimeLeft(Math.floor((parseInt(savedEndTime, 10) - Date.now()) / 1000));
    } else {
      // Set new random timer between 15 and 30 minutes
      const randomMinutes = Math.floor(Math.random() * 15) + 15;
      const endTime = Date.now() + randomMinutes * 60 * 1000;
      localStorage.setItem(storageKey, endTime.toString());
      setTimeLeft(randomMinutes * 60);
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    // 2. Fake "Recent Buyer" Notification Logic
    const triggerBuyerNotification = () => {
      const randomName = INDIAN_NAMES[Math.floor(Math.random() * INDIAN_NAMES.length)];
      const randomMins = Math.floor(Math.random() * 59) + 1;
      setRecentBuyer(`${randomName} bought ${product.title} ${randomMins} mins ago`);
      setShowBuyer(true);
      
      // Hide after 4 seconds
      setTimeout(() => setShowBuyer(false), 4000);
      
      // Schedule next notification randomly between 10 and 25 seconds
      const nextTrigger = Math.floor(Math.random() * 15000) + 10000;
      setTimeout(triggerBuyerNotification, nextTrigger);
    };

    // Start first notification after a short delay
    const initialDelay = setTimeout(triggerBuyerNotification, 3000);

    return () => {
      clearInterval(timerInterval);
      clearTimeout(initialDelay);
    };
  }, [product.slug, product.title]);

  // Format time (MM:SS)
  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "00:00";
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      {/* Floating Notification Toast */}
      <div 
        className={`fixed bottom-[100px] sm:bottom-[90px] left-4 sm:left-auto sm:right-4 z-50 max-w-xs bg-surface-card border border-border-active shadow-2xl p-space-sm flex items-center gap-3 transition-all duration-500 transform ${showBuyer ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
      >
        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-fixed flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
        </div>
        <p className="font-body-sm text-[12px] text-text-editorial leading-tight">
          {recentBuyer}
        </p>
      </div>

      {/* STICKY FLOATING BUY BAR */}
      <div className="sticky bottom-0 z-40 w-full bg-surface-deep/95 backdrop-blur-md py-space-sm shadow-2xl">
        {/* Timer Banner (Absolute on top of bar on mobile, inline on desktop) */}
        {timeLeft !== null && timeLeft > 0 && (
          <div className="absolute -top-8 left-0 w-full py-1 px-4 text-center font-mono text-[11px] uppercase tracking-widest flex items-center justify-center gap-2" style={{backgroundColor: '#FF6B35', color: '#ffffff'}}>
            <span className="material-symbols-outlined text-[14px]">timer</span>
            Offer expires in: <span className="font-bold text-[13px]">{formatTime(timeLeft)}</span>
          </div>
        )}

        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between gap-space-md">
          {/* Left: Product Info */}
          <div className="hidden sm:flex items-center gap-space-sm">
            <div className="w-10 h-10 bg-surface-canvas overflow-hidden shrink-0 border border-border-subtle">
              {product.coverImage ? (
                <img className="w-full h-full object-cover" alt={product.title} src={product.coverImage} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-text-muted">No IMG</div>
              )}
            </div>
            <div>
              <div className="font-headline-sm text-[15px] font-bold text-text-editorial leading-tight truncate max-w-xs md:max-w-md">{product.title}</div>
              <div className="font-label-sm text-[10px] text-text-muted uppercase">Instant Download {product.formats.length > 0 && `• ${product.formats.join(' + ')}`}</div>
            </div>
          </div>
          
          {/* Right: Price & Buy Button */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-space-sm">
              <span className="font-headline-sm text-[22px] font-bold text-primary-container leading-none">₹{product.price}</span>
            </div>
            
            <Link href={`/checkout?slug=${product.slug}`} className="px-space-lg py-2.5 bg-primary-container hover:bg-surface-tint text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider font-bold shadow-md flex items-center gap-1.5 transition-transform active:scale-95 whitespace-nowrap">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span>Checkout</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
