import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: { orders: true }
      }
    }
  });

  // Also fetch guests from Orders if they don't have a user account
  const guestOrders = await prisma.order.groupBy({
    by: ['customerEmail'],
    where: {
      userId: null,
      customerEmail: { not: null }
    },
    _count: {
      id: true
    },
    _sum: {
      totalAmount: true
    }
  });

  return (
    <div className="space-y-space-xl pb-24">
      <div className="flex items-end justify-between border-b border-border-subtle pb-space-sm">
        <div>
          <h1 className="font-headline-md text-headline-md text-text-editorial uppercase tracking-wider">Customers</h1>
          <p className="font-body-sm text-text-muted mt-1">Manage registered users and guest buyers.</p>
        </div>
      </div>

      <div className="bg-surface-deep border border-border-subtle overflow-x-auto shadow-xl">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-surface-canvas border-b border-border-subtle">
              <th className="p-space-sm font-label-sm text-label-sm uppercase tracking-wider text-text-muted">Type</th>
              <th className="p-space-sm font-label-sm text-label-sm uppercase tracking-wider text-text-muted">Name</th>
              <th className="p-space-sm font-label-sm text-label-sm uppercase tracking-wider text-text-muted">Email</th>
              <th className="p-space-sm font-label-sm text-label-sm uppercase tracking-wider text-text-muted text-center">Orders</th>
              <th className="p-space-sm font-label-sm text-label-sm uppercase tracking-wider text-text-muted text-center">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && guestOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-space-xl text-center text-text-muted font-body-sm border-t border-border-subtle bg-surface">
                  No customers found.
                </td>
              </tr>
            ) : (
              <>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border-subtle bg-surface-deep hover:bg-surface-card transition-colors">
                    <td className="p-space-sm">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-container text-on-primary-fixed font-bold text-[10px]">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </td>
                    <td className="p-space-sm font-body-sm text-text-editorial font-bold">
                      {user.name || 'Anonymous User'}
                    </td>
                    <td className="p-space-sm font-body-sm text-text-muted">
                      {user.email || '-'}
                    </td>
                    <td className="p-space-sm font-body-sm text-text-editorial text-center font-bold">
                      {user._count.orders}
                    </td>
                    <td className="p-space-sm text-center">
                      <span className={`inline-flex px-2 py-1 font-label-sm text-[10px] uppercase tracking-widest ${
                        user.role === 'ADMIN' ? 'bg-primary text-on-primary border border-primary' : 
                        'bg-surface-variant text-text-muted border border-border-active'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
                {guestOrders.map((guest, idx) => (
                  <tr key={`guest-${idx}`} className="border-b border-border-subtle bg-surface-deep hover:bg-surface-card transition-colors opacity-80">
                    <td className="p-space-sm">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-variant text-text-muted font-bold text-[10px]">
                        G
                      </span>
                    </td>
                    <td className="p-space-sm font-body-sm text-text-editorial font-bold italic">
                      Guest Checkout
                    </td>
                    <td className="p-space-sm font-body-sm text-text-muted">
                      {guest.customerEmail}
                    </td>
                    <td className="p-space-sm font-body-sm text-text-editorial text-center font-bold">
                      {guest._count.id}
                    </td>
                    <td className="p-space-sm text-center">
                      <span className="inline-flex px-2 py-1 font-label-sm text-[10px] uppercase tracking-widest bg-surface-variant text-text-muted border border-border-active">
                        GUEST
                      </span>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
