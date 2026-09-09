import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'Contact Us | India Digital Creatives',
  description: 'Get in touch with the India Digital Creatives team.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen pt-24 pb-16 bg-surface text-on-surface">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-headline-lg text-headline-lg text-text-editorial mb-space-lg">Contact Us</h1>
          
          <div className="bg-surface-card p-space-xl border border-border-subtle mb-space-2xl shadow-sm">
            <h2 className="font-headline-sm mb-space-sm text-text-editorial">We'd love to hear from you</h2>
            <p className="font-body-md text-text-muted mb-space-lg">
              Whether you have a question about our digital products, need help with an order, or just want to say hi, we're here for you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
              <div className="flex flex-col gap-2">
                <h3 className="font-label-md uppercase tracking-wider text-surface-tint">Email Support</h3>
                <a href="mailto:support@indiadigitalcreatives.com" className="font-body-md font-bold text-text-editorial hover:text-surface-tint transition-colors">
                  support@indiadigitalcreatives.com
                </a>
                <p className="font-body-sm text-text-muted">We typically reply within 24 hours.</p>
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="font-label-md uppercase tracking-wider text-surface-tint">Operating Address</h3>
                <p className="font-body-md text-text-editorial font-medium">
                  India Digital Creatives
                </p>
                <p className="font-body-sm text-text-muted">
                  Bangalore, Karnataka, India<br />
                  PIN: 560001
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
