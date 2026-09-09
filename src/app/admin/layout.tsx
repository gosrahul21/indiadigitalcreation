import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      
      <div className="flex-1 flex pt-16 max-w-[1440px] w-full mx-auto">
        {/* Admin Sidebar */}
        <aside className="w-64 shrink-0 bg-surface-deep border-r border-border-subtle hidden md:flex flex-col py-space-lg px-space-md min-h-[calc(100vh-4rem)]">
          <div className="font-label-sm text-label-sm uppercase text-text-muted mb-space-sm tracking-widest pl-space-xs">
            Admin Console
          </div>
          <nav className="flex flex-col space-y-1">
            <Link 
              href="/admin" 
              className="flex items-center gap-space-sm px-space-sm py-space-xs text-text-editorial hover:bg-surface-card rounded transition-colors font-label-md uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              Dashboard
            </Link>
            <Link 
              href="/admin/products" 
              className="flex items-center gap-space-sm px-space-sm py-space-xs text-text-editorial hover:bg-surface-card rounded transition-colors font-label-md uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              Products
            </Link>
            <Link 
              href="/admin/orders" 
              className="flex items-center gap-space-sm px-space-sm py-space-xs text-text-muted hover:text-text-editorial hover:bg-surface-card rounded transition-colors font-label-md uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              Orders
            </Link>
            <Link 
              href="/admin/customers" 
              className="flex items-center gap-space-sm px-space-sm py-space-xs text-text-muted hover:text-text-editorial hover:bg-surface-card rounded transition-colors font-label-md uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[20px]">group</span>
              Customers
            </Link>
          </nav>

          <div className="mt-auto pt-space-lg">
            <Link 
              href="/" 
              className="flex items-center gap-space-sm px-space-sm py-space-xs text-text-muted hover:text-text-editorial hover:bg-surface-card rounded transition-colors font-label-sm uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[18px]">storefront</span>
              Back to Store
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-space-md md:p-space-xl overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
