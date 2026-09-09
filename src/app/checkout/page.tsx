"use client";
import { useSession, signIn } from "next-auth/react";
import { load } from "@cashfreepayments/cashfree-js";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  coverImage?: string;
  galleryImages: string[];
  formats?: string[];
}

function CheckoutContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("slug") || searchParams.get("product") || "";

  const [product, setProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (session?.user) {
      if (session.user.email) setEmail(session.user.email);
      if (session.user.name) setName(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    if (!productSlug) {
      setLoadingProduct(false);
      return;
    }

    fetch(`/api/admin/products?slug=${encodeURIComponent(productSlug)}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data && data.id) {
          setProduct(data);
        }
      })
      .catch((e) => console.error("Error fetching product for checkout:", e))
      .finally(() => setLoadingProduct(false));
  }, [productSlug]);

  const handlePayment = async () => {
    if (!session?.user?.email && !email) {
      alert("Please provide an email address for license delivery.");
      return;
    }
    if (!phone || phone.length !== 10) {
      alert("Please provide a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_email: session?.user?.email || email,
          customer_name: session?.user?.name || name || "Customer",
          customer_phone: phone,
          order_amount: product ? product.price : 299.00,
          product_id: product?.id
        }),
      });
      const data = await res.json();
      if (data.payment_session_id) {
        const cashfree = await load({ mode: "sandbox" });
        cashfree.checkout({ paymentSessionId: data.payment_session_id });
      } else {
        alert("Payment initialization failed");
      }
    } catch (e) {
      console.error(e);
      alert("Error starting payment");
    } finally {
      setLoading(false);
    }
  };

  const coverImage = product?.coverImage || product?.galleryImages[0] || 'https://via.placeholder.com/200x300?text=No+Cover';
  const price = product ? product.price : 299.00;
  const originalPrice = Math.round(price * 1.5);
  const discountAmount = originalPrice - price;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-space-3xl">
      <section className="w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start" id="checkout-view">
        {/* LEFT COLUMN: STREAMLINED FORM (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-space-xl bg-surface-deep p-space-lg md:p-space-2xl shadow-xl relative">
          <div className="absolute -top-3 -right-3 w-16 h-16 bg-surface-tint/5 rounded-full blur-xl pointer-events-none"></div>
          
          <header className="flex flex-col space-y-space-2xs">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-label-sm uppercase text-surface-tint tracking-widest">[ EXPRESS FLOW ]</span>
              <span className="text-text-muted text-body-sm">•</span>
              <span className="font-label-sm text-label-sm text-text-muted uppercase">Zero Physical Shipping</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-text-editorial tracking-tight">CHECKOUT</h1>
            <p className="font-body-md text-body-md text-text-muted">
              You'll get instant access to your digital files as soon as your payment is confirmed.
            </p>
          </header>

          {/* STEP 1: CUSTOMER DETAILS */}
          <fieldset className="flex flex-col space-y-space-md border-0 p-0 m-0">
            <legend className="flex items-center justify-between w-full pb-space-xs">
              <span className="font-label-lg text-label-lg uppercase text-text-editorial tracking-wider flex items-center gap-space-xs">
                <span className="w-5 h-5 flex items-center justify-center bg-surface-canvas text-surface-tint font-label-sm text-label-sm">01</span>
                Customer Credentials
              </span>
              <span className="font-label-sm text-label-sm text-text-muted uppercase">Access Authentication</span>
            </legend>
            {status === "authenticated" && session?.user ? (
              <div className="flex flex-col space-y-space-md">
                <div className="bg-surface-container-lowest p-space-md flex items-center justify-between border border-border-subtle">
                  <div>
                    <div className="font-label-sm text-label-sm uppercase text-text-muted mb-1">Logged in securely as</div>
                    <div className="font-headline-sm text-headline-sm text-text-editorial">{session.user.name}</div>
                    <div className="font-body-sm text-body-sm text-surface-tint">{session.user.email}</div>
                  </div>
                  <span className="material-symbols-outlined text-surface-tint text-3xl">verified_user</span>
                </div>
                <div className="flex flex-col space-y-space-3xs">
                  <label className="font-label-sm text-label-sm uppercase text-text-muted" htmlFor="cust-phone-auth">Phone Number</label>
                  <input 
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} 
                    value={phone} 
                    className="w-full bg-surface-container-lowest text-text-editorial px-space-md py-space-sm font-body-md text-body-md outline-none focus:ring-1 focus:ring-surface-tint transition-all" 
                    id="cust-phone-auth" 
                    placeholder="10-digit mobile number" 
                    required 
                    type="tel" 
                    pattern="[0-9]{10}"
                    maxLength={10}
                    minLength={10}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-space-md">
                <button type="button" onClick={() => signIn("google")} className="w-full bg-surface-variant hover:bg-surface-bright text-text-editorial font-label-md text-label-md uppercase py-space-sm flex items-center justify-center gap-2 border border-border-subtle transition-colors shadow-sm">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Login with Google to Skip
                </button>
                <div className="flex items-center gap-space-sm">
                  <div className="h-px bg-border-subtle flex-1"></div>
                  <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-widest">Or Continue as Guest</span>
                  <div className="h-px bg-border-subtle flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="flex flex-col space-y-space-3xs md:col-span-2">
                    <label className="font-label-sm text-label-sm uppercase text-text-muted" htmlFor="cust-email">Email Address (Where we'll send your files)</label>
                    <div className="relative">
                      <input onChange={e => setEmail(e.target.value)} value={email} className="w-full bg-surface-container-lowest text-text-editorial px-space-md py-space-sm font-body-md text-body-md outline-none focus:ring-1 focus:ring-surface-tint transition-all" id="cust-email" placeholder="name@domain.com" required type="email" />
                      {email && <span className="material-symbols-outlined absolute right-space-sm top-1/2 -translate-y-1/2 text-surface-tint text-base">verified</span>}
                    </div>
                    <span className="font-body-sm text-body-sm text-text-muted pt-1">Your download links and order receipt will be sent here.</span>
                  </div>
                  <div className="flex flex-col space-y-space-3xs md:col-span-1">
                    <label className="font-label-sm text-label-sm uppercase text-text-muted" htmlFor="cust-name">Full Legal Name</label>
                    <input onChange={e => setName(e.target.value)} value={name} className="w-full bg-surface-container-lowest text-text-editorial px-space-md py-space-sm font-body-md text-body-md outline-none focus:ring-1 focus:ring-surface-tint transition-all" id="cust-name" placeholder="First &amp; Last Name" required type="text" />
                  </div>
                  <div className="flex flex-col space-y-space-3xs md:col-span-1">
                    <label className="font-label-sm text-label-sm uppercase text-text-muted" htmlFor="cust-phone-guest">Phone Number</label>
                    <input 
                      onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} 
                      value={phone} 
                      className="w-full bg-surface-container-lowest text-text-editorial px-space-md py-space-sm font-body-md text-body-md outline-none focus:ring-1 focus:ring-surface-tint transition-all" 
                      id="cust-phone-guest" 
                      placeholder="10-digit mobile number" 
                      required 
                      type="tel" 
                      pattern="[0-9]{10}"
                      maxLength={10}
                      minLength={10}
                    />
                  </div>
                </div>
              </div>
            )}
          </fieldset>

          {/* STEP 2: PAYMENT METHOD SELECTION */}
          <fieldset className="flex flex-col space-y-space-md pt-space-xs border-0 p-0 m-0">
            <legend className="flex items-center justify-between w-full pb-space-xs">
              <span className="font-label-lg text-label-lg uppercase text-text-editorial tracking-wider pt-4 flex items-center gap-space-xs">
                <span className="w-5 h-5 flex items-center justify-center bg-surface-canvas text-surface-tint font-label-sm text-label-sm">02</span>
                Payment Gateway
              </span>
              <span className="flex items-center gap-1 font-label-sm text-label-sm text-surface-tint uppercase">
                {/* <span className="material-symbols-outlined text-sm">lock</span> 256-Bit SSL Encrypted */}
              </span>
            </legend>
            
            <div className="bg-surface-container-lowest p-space-md flex flex-col md:flex-row items-center gap-space-md border border-border-subtle">
              <div className="w-16 h-16 bg-surface-canvas p-2 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-surface-tint text-4xl">payments</span>
              </div>
              <div className="flex flex-col space-y-space-2xs w-full">
                <span className="font-headline-sm text-headline-sm text-text-editorial">Cashfree Secured Checkout</span>
                <span className="font-body-sm text-body-sm text-text-muted">Supports UPI (GPay/PhonePe), Credit/Debit Cards, NetBanking, and Wallets.</span>
              </div>
            </div>
          </fieldset>

          {/* SUBMIT CTA */}
          <div className="flex flex-col space-y-space-xs pt-space-xs">
            <button 
              disabled={loading || loadingProduct} 
              className="w-full group bg-surface-tint hover:bg-primary-container active:bg-primary-fixed text-on-primary-fixed font-label-lg text-label-lg uppercase py-space-md px-space-xl flex items-center justify-between tracking-wider shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={handlePayment}
            >
              <span className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-lg">{loading ? 'hourglass_empty' : 'bolt'}</span>
                {loading ? 'Processing payment...' : `Pay ₹${price}`}
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <p className="font-body-sm text-body-sm text-text-muted text-center pt-space-2xs">
              No shipping. Your files will be available to download immediately after payment.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY & INSTANT PREVIEW (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-space-lg">
          <div className="bg-surface-card p-space-lg shadow-xl relative overflow-hidden">
            {loadingProduct ? (
              <div className="p-space-xl text-center font-mono text-label-sm text-text-muted animate-pulse">
                [ LOADING PRODUCT DETAILS... ]
              </div>
            ) : (
              <div className="flex items-start gap-space-md">
                <div className="w-28 h-40 shrink-0 bg-surface-canvas overflow-hidden relative shadow-md">
                  <img 
                    className="w-full h-full object-cover" 
                    src={coverImage} 
                    alt={product?.title || "Product Cover"}
                  />
                  <span className="absolute bottom-1 right-1 bg-surface-container-lowest/90 px-1 py-0.5 font-label-sm text-label-sm uppercase text-surface-tint">
                    Digital
                  </span>
                </div>
                
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="inline-block bg-surface-container-high px-space-xs py-0.5 font-label-sm text-label-sm uppercase text-text-editorial mb-space-2xs">
                      Digital Product
                    </div>
                    <h2 className="font-headline-sm text-headline-sm text-text-editorial leading-tight line-clamp-2">
                      {product?.title || "Digital Asset Edition"}
                    </h2>
                    <p className="font-body-sm text-body-sm text-text-muted mt-1 line-clamp-2">
                      {product?.description || "High-resolution digital product download"}
                    </p>
                  </div>
                  <div className="mt-space-md flex items-baseline gap-space-xs">
                    <span className="font-headline-md text-headline-md text-text-editorial font-bold">₹{price}</span>
                    <span className="font-body-sm text-body-sm text-text-muted line-through">₹{originalPrice}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Line Item Summary */}
            <div className="mt-space-lg pt-space-md border-t border-border-subtle flex flex-col space-y-space-xs">
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted mb-space-2xs">
                Order Summary
              </div>
              <div className="flex justify-between font-body-sm text-body-sm text-text-muted">
                <span>Original Price (MRP)</span>
                <span>₹{originalPrice}</span>
              </div>
              <div className="flex justify-between font-body-sm text-body-sm text-surface-tint">
                <span>Discount</span>
                <span>-₹{discountAmount}</span>
              </div>
              <div className="flex justify-between font-body-sm text-body-sm text-text-muted">
                <span>GST / Tax</span>
                <span>Included</span>
              </div>
              <div className="pt-space-xs border-t border-border-subtle flex justify-between items-baseline">
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg uppercase text-text-editorial font-bold">Total</span>
                  <span className="font-label-sm text-[10px] uppercase text-text-muted">Payable (INR)</span>
                </div>
                <span className="font-display-hero text-headline-lg text-surface-tint font-bold">₹{price}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-surface text-on-surface">
        <Suspense fallback={<div className="text-text-editorial py-20">Loading Checkout...</div>}>
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
