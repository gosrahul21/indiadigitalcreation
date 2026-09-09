import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [productCount, orderCount, userCount, revenueResult] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: "PAID" }
    })
  ]);

  const totalRevenue = revenueResult._sum.totalAmount || 0;

  return (
    <div className="flex flex-col space-y-space-xl">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-text-editorial mb-space-2xs">Dashboard overview</h1>
        <p className="font-body-md text-body-md text-text-muted">High-level metrics for your storefront.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="bg-surface-card border border-border-subtle p-space-lg flex flex-col hover:border-border-active transition-colors">
          <span className="font-label-sm text-label-sm uppercase text-text-muted mb-space-sm">Total Revenue</span>
          <span className="font-headline-md text-headline-md text-surface-tint">₹{totalRevenue.toLocaleString()}</span>
        </div>
        
        <div className="bg-surface-card border border-border-subtle p-space-lg flex flex-col hover:border-border-active transition-colors">
          <span className="font-label-sm text-label-sm uppercase text-text-muted mb-space-sm">Total Orders</span>
          <span className="font-headline-md text-headline-md text-text-editorial">{orderCount}</span>
        </div>
        
        <div className="bg-surface-card border border-border-subtle p-space-lg flex flex-col hover:border-border-active transition-colors">
          <span className="font-label-sm text-label-sm uppercase text-text-muted mb-space-sm">Active Products</span>
          <span className="font-headline-md text-headline-md text-text-editorial">{productCount}</span>
        </div>
        
        <div className="bg-surface-card border border-border-subtle p-space-lg flex flex-col hover:border-border-active transition-colors">
          <span className="font-label-sm text-label-sm uppercase text-text-muted mb-space-sm">Total Customers</span>
          <span className="font-headline-md text-headline-md text-text-editorial">{userCount}</span>
        </div>
      </div>

      <div className="bg-surface-deep border border-border-subtle p-space-xl text-center flex flex-col items-center justify-center py-20">
        <span className="material-symbols-outlined text-[48px] text-border-active mb-space-md">analytics</span>
        <h2 className="font-headline-sm text-headline-sm text-text-editorial mb-space-xs">Advanced analytics pending</h2>
        <p className="font-body-md text-body-md text-text-muted max-w-md mx-auto">
          Detailed charting and historical revenue data will appear here once more transactions are processed.
        </p>
      </div>
    </div>
  );
}
