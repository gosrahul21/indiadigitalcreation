"use client";

import { useCart } from "@/components/CartContext";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart, items } = useCart();
  const [added, setAdded] = useState(false);

  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      coverImage: product.coverImage || product.galleryImages?.[0],
    });
    setAdded(true);
  };

  return (
    <div className="flex flex-col gap-space-xs pt-space-xs">
      <Link 
        href={`/checkout?slug=${product.slug}`} 
        className="w-full py-space-md bg-primary-container text-on-primary-fixed hover:bg-surface-tint font-label-lg text-label-lg uppercase tracking-wider py-3.5 font-bold shadow-lg flex items-center justify-center gap-space-sm transition-transform active:scale-[0.99]"
      >
        <span className="material-symbols-outlined text-[20px]">bolt</span>
        <span>BUY NOW — ₹{product.price}</span>
        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
      </Link>
      
      {isInCart || added ? (
        <Link 
          href="/cart"
          className="w-full py-3 bg-surface-card hover:bg-surface-card-hover text-text-editorial font-label-md text-label-md uppercase tracking-wider font-bold shadow-sm transition-colors flex items-center justify-center gap-space-xs"
        >
          <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
          <span>View in Cart</span>
        </Link>
      ) : (
        <button 
          onClick={handleAddToCart}
          className="w-full py-3 bg-surface-card hover:bg-surface-card-hover text-text-editorial font-label-md text-label-md uppercase tracking-wider font-bold shadow-sm transition-colors flex items-center justify-center gap-space-xs"
        >
          <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
          <span>Add to Cart • Continue Browsing</span>
        </button>
      )}
    </div>
  );
}
