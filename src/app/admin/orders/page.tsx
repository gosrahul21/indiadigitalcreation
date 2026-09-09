import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });

  return (
    <div className="space-y-space-xl pb-24">
      <div className="flex items-end justify-between border-b border-border-subtle pb-space-sm">
        <div>
          <h1 className="font-headline-md text-headline-md text-text-editorial uppercase tracking-wider">Orders</h1>
          <p className="font-body-sm text-text-muted mt-1">Manage and view all customer orders.</p>
        </div>
      </div>

      <div className="bg-surface-deep border border-border-subtle overflow-x-auto shadow-xl">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-surface-canvas border-b border-border-subtle">
              <th className="p-space-sm font-label-sm text-label-sm uppercase tracking-wider text-text-muted">Order ID</th>
              <th className="p-space-sm font-label-sm text-label-sm uppercase tracking-wider text-text-muted">Date</th>
              <th className="p-space-sm font-label-sm text-label-sm uppercase tracking-wider text-text-muted">Customer</th>
              <th className="p-space-sm font-label-sm text-label-sm uppercase tracking-wider text-text-muted">Products</th>
              <th className="p-space-sm font-label-sm text-label-sm uppercase tracking-wider text-text-muted text-right">Total</th>
              <th className="p-space-sm font-label-sm text-label-sm uppercase tracking-wider text-text-muted text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-space-xl text-center text-text-muted font-body-sm border-t border-border-subtle bg-surface">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-border-subtle bg-surface-deep hover:bg-surface-card transition-colors">
                  <td className="p-space-sm font-mono text-[11px] text-text-editorial truncate max-w-[120px]" title={order.id}>
                    {order.id.slice(-8).toUpperCase()}
                  </td>
                  <td className="p-space-sm font-body-sm text-text-muted">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-space-sm font-body-sm text-text-editorial">
                    <div className="font-bold">{order.customerName || 'Guest'}</div>
                    <div className="text-[11px] text-text-muted">{order.customerEmail}</div>
                  </td>
                  <td className="p-space-sm font-body-sm text-text-muted">
                    {order.orderItems.map(item => item.product.title).join(', ') || 'Unknown'}
                  </td>
                  <td className="p-space-sm font-headline-sm text-[14px] text-text-editorial text-right font-bold">
                    ₹{order.totalAmount}
                  </td>
                  <td className="p-space-sm text-center">
                    <span className={`inline-flex px-2 py-1 font-label-sm text-[10px] uppercase tracking-widest ${
                      order.status === 'COMPLETED' ? 'bg-[#E6F4EA] text-[#137333] border border-[#137333]/20' : 
                      order.status === 'PENDING' ? 'bg-[#FFF8E1] text-[#F57F17] border border-[#F57F17]/20' : 
                      'bg-surface-variant text-text-muted border border-border-active'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
