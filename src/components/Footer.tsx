import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-deep border-t border-border-subtle">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin-desktop py-space-3xl">
        <div className="border-b border-border-subtle pb-space-2xl mb-space-2xl">
          <h2 className="font-display-hero text-display-hero-mobile md:text-display-hero text-text-editorial uppercase leading-none tracking-tight">INDIA DIGITAL CREATIVES</h2>
          <p className="font-headline-sm text-headline-sm text-text-muted mt-space-sm italic">Ideas worth keeping. Knowledge worth owning.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl border-b border-border-subtle pb-space-3xl mb-space-2xl">
          <div className="lg:col-span-3">
            <h3 className="font-label-md text-label-md uppercase text-primary-container tracking-wider mb-space-md">Shop</h3>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-text-muted">
              <li className="hover:text-text-editorial transition-colors"><Link href="/?category=Books">Books</Link></li>
              <li className="hover:text-text-editorial transition-colors"><Link href="/?category=Ebooks">Ebooks</Link></li>
              <li className="hover:text-text-editorial transition-colors"><Link href="/?category=Templates">Templates</Link></li>
              <li className="hover:text-text-editorial transition-colors"><Link href="/?category=Bundles">Bundles</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="font-label-md text-label-md uppercase text-primary-container tracking-wider mb-space-md">Company</h3>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-text-muted">
              <li className="hover:text-text-editorial transition-colors"><Link href="#">About IDC</Link></li>
              <li className="hover:text-text-editorial transition-colors"><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="font-label-md text-label-md uppercase text-primary-container tracking-wider mb-space-md">Customer Care</h3>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-text-muted">
              <li className="hover:text-text-editorial transition-colors"><Link href="/refunds">Refunds & Cancellations</Link></li>
              <li className="hover:text-text-editorial transition-colors"><Link href="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="font-label-md text-label-md uppercase text-text-editorial tracking-wider mb-space-xs">GET THE GOOD STUFF</h3>
            <p className="font-body-sm text-body-sm text-text-muted mb-space-md">Curated releases, design dissertations, and studio drops.</p>
            <form className="flex flex-col gap-space-xs">
              <input className="w-full bg-surface-canvas border border-border-subtle px-space-sm py-space-xs font-body-sm text-body-sm text-text-editorial placeholder:text-text-muted focus:outline-none focus:border-border-active" placeholder="Your direct email" type="email" />
              <button className="w-full bg-primary-container text-on-primary-fixed font-label-lg text-label-lg uppercase tracking-wider py-space-xs font-bold hover:bg-surface-tint transition-colors flex items-center justify-center gap-space-2xs" type="submit">
                <span>SUBSCRIBE</span><span>→</span>
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md font-label-sm text-label-sm uppercase tracking-wider text-text-muted">
          <div className="flex flex-wrap items-center gap-space-xs text-text-muted">
            <span>Instant digital delivery</span><span>•</span><span>Protected download links</span><span>•</span><span>No physical shipping required</span>
          </div>
          <div>© {new Date().getFullYear()} India Digital Creatives. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
