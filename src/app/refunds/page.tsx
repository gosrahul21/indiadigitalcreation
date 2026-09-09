import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'Refunds & Cancellations | India Digital Creatives',
};

export default function RefundsPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen pt-24 pb-16 bg-surface text-on-surface">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-headline-lg text-headline-lg text-text-editorial mb-space-lg">Refunds & Cancellations</h1>
          
          <div className="bg-surface-card p-space-xl border border-border-subtle shadow-sm prose prose-invert max-w-none">
            <h2 className="font-headline-sm text-text-editorial mt-4 mb-4">Digital Products Policy</h2>
            <p className="font-body-md text-text-muted mb-4">
              Due to the nature of digital products, all sales are considered final and non-refundable once the download link has been accessed or the files have been delivered. We do not offer returns or exchanges for digital items.
            </p>

            <h2 className="font-headline-sm text-text-editorial mt-8 mb-4">Exceptions</h2>
            <p className="font-body-md text-text-muted mb-4">
              We may, at our sole discretion, issue a refund under the following exceptional circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6 text-text-muted font-body-md space-y-2">
              <li>The file is corrupted or significantly defective and we are unable to provide a working replacement within 3 business days.</li>
              <li>You made a duplicate purchase of the exact same product by accident.</li>
              <li>The product description was materially misleading regarding the contents or format of the file.</li>
            </ul>

            <h2 className="font-headline-sm text-text-editorial mt-8 mb-4">Cancellations</h2>
            <p className="font-body-md text-text-muted mb-4">
              Since our products are delivered instantly upon purchase, orders cannot be cancelled once the payment has been processed successfully.
            </p>

            <h2 className="font-headline-sm text-text-editorial mt-8 mb-4">Requesting Support</h2>
            <p className="font-body-md text-text-muted mb-4">
              If you experience any technical issues downloading or opening your purchased files, please reach out to us at <strong>support@indiadigitalcreatives.com</strong> within 7 days of your purchase. We are committed to ensuring you get access to the files you paid for.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
