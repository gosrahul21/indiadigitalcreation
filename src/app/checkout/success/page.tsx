"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

interface ProductAsset {
  id: string;
  slug: string;
  title: string;
  coverImage?: string;
  hostedLink?: string;
  hostedLinks: string[];
  formats?: string[];
}

interface OrderData {
  orderId: string;
  status: string;
  totalAmount: number;
  products: ProductAsset[];
}

function extractFilename(urlOrPath: string): string {
  // If it's a full URL, get the pathname
  try {
    const url = new URL(urlOrPath);
    urlOrPath = url.pathname;
  } catch (e) {
    // Not a URL, proceed
  }
  
  // Split by slash and get the last part
  const parts = urlOrPath.split('/');
  let filename = parts[parts.length - 1];
  
  // Remove the timestamp prefix (e.g. 1788942690529-filename.pdf -> filename.pdf)
  if (filename.includes('-')) {
    const firstDash = filename.indexOf('-');
    // Ensure the part before the dash is purely numeric (a timestamp)
    if (/^\d+$/.test(filename.substring(0, firstDash))) {
      filename = filename.substring(firstDash + 1);
    }
  }
  
  return decodeURIComponent(filename);
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "";
  
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    let isSubscribed = true;

    const checkOrderStatus = async () => {
      try {
        const res = await fetch(`/api/orders?order_id=${encodeURIComponent(orderId)}`);
        if (res.ok) {
          const data = await res.json();
          if (isSubscribed && data) {
            setOrderData(data);
            
            // Poll again if still PENDING
            if (data.status === "PENDING") {
              setTimeout(checkOrderStatus, 3000);
            } else if (data.status === "FAILED") {
              window.location.href = `/checkout/retry?orderId=${encodeURIComponent(orderId)}`;
            }
          }
        }
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    checkOrderStatus();

    return () => {
      isSubscribed = false;
    };
  }, [orderId]);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-space-3xl py-space-xl">
      <section className="w-full flex flex-col space-y-space-xl" id="success-view">
        {/* Hero Confirmation Banner */}
        <div className="bg-surface-canvas p-space-lg md:p-space-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-space-lg relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-surface-tint/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col space-y-space-2xs z-10">
            <div className="flex items-center gap-space-xs">
              <span className={`px-space-xs py-0.5 font-label-sm text-label-sm uppercase font-bold tracking-wider ${
                orderData?.status === "PAID" ? "bg-surface-tint text-on-primary" : 
                orderData?.status === "FAILED" ? "bg-error text-on-error" : 
                "bg-[#f59e0b] text-white"
              }`}>
                {orderData?.status === "PAID" ? "Payment Cleared" : 
                 orderData?.status === "FAILED" ? "Payment Failed" : "Payment Pending"}
              </span>
              <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">
                • Order #{orderId || "TEST-ORDER"}
              </span>
            </div>
            <h1 className="font-display-hero text-headline-lg md:text-display-hero text-text-editorial font-bold tracking-tight">
              {orderData?.status === "PAID" ? "THANK YOU." : 
               orderData?.status === "FAILED" ? "FAILED." : "PROCESSING..."}
            </h1>
            <p className="font-body-lg text-body-lg text-text-muted max-w-xl">
              {orderData?.status === "PAID" 
                ? "Your payment was successful. Your files are ready to download below." 
                : orderData?.status === "FAILED"
                ? "Your payment could not be processed. No money was deducted. Please try again."
                : "We are verifying your payment status with the gateway. This usually takes a few seconds..."}
            </p>
            {(orderData?.status === "FAILED" || orderData?.status === "PENDING") && orderData?.products?.[0]?.slug && (
              <div className="pt-space-md">
                <Link 
                  href={`/checkout?slug=${orderData.products[0].slug}`}
                  className="bg-surface-variant hover:bg-surface-bright text-text-editorial font-label-md text-label-md uppercase py-space-sm px-space-lg flex items-center justify-center gap-2 border border-border-subtle transition-colors shadow-sm inline-flex"
                >
                  <span className="material-symbols-outlined text-base">refresh</span>
                  Try Again
                </Link>
              </div>
            )}
          </div>
          <div className="bg-surface-deep p-space-md flex flex-col space-y-space-2xs z-10 shrink-0">
            <span className="font-label-sm text-label-sm uppercase text-text-muted">Save your Order ID</span>
            <code className="font-label-md text-label-md text-surface-tint tracking-widest bg-surface-container-lowest px-space-sm py-space-2xs select-all">
              {orderId ? orderId.substring(0, 16) : "test_order_id_123"}
            </code>
            <span className="font-body-sm text-body-sm text-text-muted">You can use this later to re-download files.</span>
          </div>
        </div>

        {/* SECURE DOWNLOAD VAULT TILES */}
        <div className="flex flex-col space-y-space-md">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
            <h2 className="font-headline-md text-headline-md text-text-editorial">
              Your Files ({orderData?.products ? orderData.products.length : 0})
            </h2>
            <span className="font-label-sm text-label-sm uppercase text-text-muted tracking-wider">
              Download Anytime • No Expiration
            </span>
          </div>

          {loading ? (
            <div className="p-space-xl bg-surface-card text-center text-text-muted font-mono text-label-md animate-pulse">
              [ LOADING YOUR FILES... ]
            </div>
          ) : orderData?.status === "PENDING" ? (
            <div className="p-space-xl bg-surface-card text-center text-[#f59e0b] font-mono text-label-md animate-pulse border border-[#f59e0b]/20">
              [ VERIFYING PAYMENT... ]
            </div>
          ) : orderData?.status === "FAILED" ? (
            <div className="p-space-xl bg-error-container text-center text-on-error-container font-mono text-label-md border border-error">
              [ ACCESS DENIED: PAYMENT FAILED ]
            </div>
          ) : orderData && orderData.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
              {orderData.products.map((prod) => (
                <div key={prod.id} className="bg-surface-card p-space-lg flex flex-col justify-between space-y-space-lg shadow-lg hover:bg-surface-card-hover transition-colors">
                  <div className="flex flex-col space-y-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="px-space-xs py-0.5 bg-surface-container text-text-editorial font-label-sm text-label-sm uppercase">
                        Digital Product
                      </span>
                      <span className="font-label-sm text-label-sm text-surface-tint">Ready to Download</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-text-editorial line-clamp-1">
                      {prod.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-text-muted">
                      Your files are secure and ready. Click below to download.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {prod.hostedLink && (
                      <a 
                        className="w-full bg-surface-tint hover:bg-primary-container text-on-primary-fixed font-label-md text-label-md uppercase py-space-sm px-space-md flex items-center justify-between transition-colors shadow" 
                        href={`/api/download?productId=${prod.id}&orderId=${orderId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="truncate pr-4 font-bold">{extractFilename(prod.hostedLink)}</span>
                        <span className="material-symbols-outlined text-base shrink-0">download</span>
                      </a>
                    )}
                    {prod.hostedLinks && prod.hostedLinks.map((link, idx) => (
                      <a 
                        key={idx}
                        className="w-full bg-surface-variant hover:bg-surface-bright text-text-editorial font-label-md text-label-md py-space-sm px-space-md flex items-center justify-between transition-colors shadow" 
                        href={`/api/download?productId=${prod.id}&orderId=${orderId}&fileKey=${encodeURIComponent(link)}`}
                        target="_blank"
                        rel="noreferrer"
                        title={extractFilename(link)}
                      >
                        <span className="truncate pr-4">{extractFilename(link)}</span>
                        <span className="material-symbols-outlined text-base shrink-0">folder_zip</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-space-lg bg-surface-card text-text-muted font-body-md text-center">
              No products found attached to this order ID. If this was a test transaction, make sure your order exists in the database.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-surface text-on-surface">
        <Suspense fallback={<div className="text-text-editorial py-20">Loading order verification...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
