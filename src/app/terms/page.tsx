import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'Terms & Conditions | India Digital Creatives',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen pt-24 pb-16 bg-surface text-on-surface">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-headline-lg text-headline-lg text-text-editorial mb-space-lg">Terms & Conditions</h1>
          
          <div className="bg-surface-card p-space-xl border border-border-subtle shadow-sm prose prose-invert max-w-none">
            <p className="font-body-md text-text-muted mb-6">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
            
            <h2 className="font-headline-sm text-text-editorial mt-8 mb-4">1. Introduction</h2>
            <p className="font-body-md text-text-muted mb-4">
              Welcome to India Digital Creatives. By accessing or using our website, you agree to be bound by these Terms and Conditions and our Privacy Policy.
            </p>

            <h2 className="font-headline-sm text-text-editorial mt-8 mb-4">2. Digital Products</h2>
            <p className="font-body-md text-text-muted mb-4">
              All products sold on India Digital Creatives are digital downloads. No physical products will be shipped. Upon successful payment, you will receive instant access to download your purchased files.
            </p>

            <h2 className="font-headline-sm text-text-editorial mt-8 mb-4">3. License & Usage</h2>
            <p className="font-body-md text-text-muted mb-4">
              When you purchase a digital product, you are granted a non-exclusive, non-transferable license to use the product for personal or commercial purposes as specified in the product description. You may not resell, redistribute, or share the original files.
            </p>

            <h2 className="font-headline-sm text-text-editorial mt-8 mb-4">4. Pricing & Payments</h2>
            <p className="font-body-md text-text-muted mb-4">
              All prices are listed in Indian Rupees (INR) and are subject to change without notice. We use Cashfree Payments as our secure payment gateway to process all transactions.
            </p>

            <h2 className="font-headline-sm text-text-editorial mt-8 mb-4">5. Contact Information</h2>
            <p className="font-body-md text-text-muted mb-4">
              If you have any questions about these Terms, please contact us at support@indiadigitalcreatives.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
