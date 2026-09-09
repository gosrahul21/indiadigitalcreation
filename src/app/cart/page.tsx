"use client";

import { useCart } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeFromCart, totalPrice } = useCart();
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="w-full pt-24 bg-surface min-h-screen pb-space-4xl">
        <div className="max-w-[1024px] mx-auto px-margin-mobile lg:px-margin-desktop">
          <h1 className="font-headline-lg text-headline-lg text-text-editorial uppercase mb-space-xl border-b border-border-subtle pb-space-sm">
            Your Cart
          </h1>

          {items.length === 0 ? (
            <div className="bg-surface-canvas border border-border-subtle p-space-2xl text-center flex flex-col items-center justify-center space-y-space-md">
              <span className="material-symbols-outlined text-4xl text-text-muted">shopping_cart</span>
              <p className="font-body-lg text-body-lg text-text-editorial">Your cart is empty.</p>
              <Link href="/" className="px-space-xl py-space-sm bg-primary-container text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider hover:bg-surface-tint transition-colors">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-space-2xl">
              {/* Cart Items List */}
              <div className="flex-grow space-y-space-md">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-space-md bg-surface-card p-space-md border border-border-subtle shadow-sm">
                    <div className="w-20 h-24 bg-surface-canvas border border-border-subtle shrink-0">
                      {item.coverImage && (
                        <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover opacity-80" />
                      )}
                    </div>
                    <div className="flex flex-col flex-grow justify-center">
                      <Link href={`/products/${item.slug}`} className="font-headline-sm text-headline-sm text-text-editorial hover:text-primary-container transition-colors">
                        {item.title}
                      </Link>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted mt-1">Digital Download</span>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <span className="font-headline-sm text-headline-sm text-text-editorial font-bold">₹{item.price}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-text-muted hover:text-error transition-colors flex items-center gap-1 font-label-sm text-label-sm uppercase"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Checkout Panel */}
              <div className="w-full lg:w-80 shrink-0">
                <div className="bg-surface-container p-space-lg border border-border-subtle sticky top-24">
                  <h2 className="font-label-lg text-label-lg uppercase tracking-wider text-text-editorial mb-space-md border-b border-border-subtle pb-space-sm">
                    Order Summary
                  </h2>
                  <div className="flex justify-between items-center mb-space-xs font-body-md text-text-muted">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center mb-space-md font-body-md text-text-muted">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between items-center py-space-sm border-t border-b border-border-subtle mb-space-lg">
                    <span className="font-headline-sm text-text-editorial uppercase">Total</span>
                    <span className="font-headline-sm text-text-editorial font-bold">₹{totalPrice}</span>
                  </div>
                  
                  {/* Since checkout expects a slug for single product currently, we'll route to the first item for now until multi-item checkout is fully built. 
                      Since they only sell single digital goods, this is acceptable for now. */}
                  <button 
                    onClick={() => router.push(`/checkout?slug=${items[0].slug}`)}
                    className="w-full py-space-md bg-primary-container text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider hover:bg-surface-tint font-bold shadow-lg flex items-center justify-center gap-space-sm transition-transform active:scale-[0.99]"
                  >
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Proceed to Checkout
                  </button>
                  <p className="font-body-sm text-body-sm text-center text-text-muted mt-space-sm flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Secure SSL Encrypted Checkout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
