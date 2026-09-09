"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { load } from "@cashfreepayments/cashfree-js";

function RetryContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRetry = async () => {
    if (!orderId) return;
    setLoading(true);
    setError("");
    
    try {
      // Create a NEW transaction session for the EXISTING order
      const res = await fetch("/api/retry-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      
      if (data.payment_session_id) {
        const cashfree = await load({ mode: "sandbox" });
        cashfree.checkout({ paymentSessionId: data.payment_session_id });
      } else {
        setError("Failed to initialize retry session. Please try again.");
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred while retrying the payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto space-y-space-xl py-space-3xl px-margin-mobile md:px-margin-desktop">
      <div className="bg-surface-canvas p-space-2xl shadow-2xl text-center border-t-4 border-error">
        <span className="material-symbols-outlined text-[64px] text-error mb-space-md">error</span>
        <h1 className="font-headline-lg text-headline-lg text-text-editorial mb-space-sm">Payment Failed</h1>
        <p className="font-body-md text-text-muted max-w-lg mx-auto mb-space-xl">
          We couldn't process your payment for Order <span className="font-mono text-text-editorial">{orderId}</span>. 
          Your bank may have declined the transaction or the session timed out. Don't worry, your order is saved!
        </p>
        
        {error && (
          <div className="mb-space-md bg-error/10 text-error p-space-sm border border-error/20 font-body-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md">
          <button 
            onClick={handleRetry}
            disabled={loading || !orderId}
            className="w-full sm:w-auto bg-surface-tint hover:bg-primary-container active:bg-primary-fixed text-on-primary-fixed font-label-md uppercase px-space-xl py-space-sm flex items-center justify-center gap-2 tracking-wider shadow-md disabled:opacity-50 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">{loading ? 'hourglass_empty' : 'refresh'}</span>
            {loading ? 'Initializing...' : 'Retry Payment'}
          </button>
          
          <Link 
            href="/products" 
            className="w-full sm:w-auto bg-surface hover:bg-surface-card border border-border-subtle text-text-editorial font-label-md uppercase px-space-xl py-space-sm flex items-center justify-center tracking-wider transition-colors"
          >
            Cancel Order
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RetryPage() {
  return (
    <>
      <Header />
      <main className="w-full pt-16 bg-surface min-h-screen flex items-center justify-center">
        <Suspense fallback={<div className="p-32 text-center text-text-muted animate-pulse">Loading...</div>}>
          <RetryContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
