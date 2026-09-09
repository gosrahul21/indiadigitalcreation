import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import PrintButton from "./PrintButton";

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) {
    redirect("/");
  }

  const order = await prisma.order.findUnique({
    where: { 
      id: id,
      userId: user.id 
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order) {
    redirect("/orders");
  }

  return (
    <div className="bg-surface-lowest text-text-editorial min-h-screen font-body-md py-space-4xl print:py-0">
      <div className="max-w-[800px] mx-auto bg-surface-container-lowest p-space-4xl shadow-xl print:shadow-none print:p-0">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-text-editorial pb-space-xl mb-space-2xl">
          <div>
            <h1 className="font-display-hero text-[2rem] font-bold tracking-tight uppercase leading-none mb-space-xs">INVOICE</h1>
            <p className="font-label-md text-text-muted uppercase tracking-wider">India Digital Creatives</p>
          </div>
          <div className="text-right">
            <p className="font-label-sm uppercase tracking-wider text-text-muted mb-1">Invoice Number</p>
            <p className="font-headline-sm font-medium">#{order.id.substring(order.id.length - 8).toUpperCase()}</p>
            
            <p className="font-label-sm uppercase tracking-wider text-text-muted mt-space-sm mb-1">Date of Issue</p>
            <p className="font-body-md font-medium">
              {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Billing Details */}
        <div className="grid grid-cols-2 gap-space-xl mb-space-3xl">
          <div>
            <p className="font-label-sm uppercase tracking-wider text-text-muted mb-space-xs border-b border-border-subtle pb-1 inline-block">Billed To</p>
            <p className="font-body-md font-bold mt-space-xs">{user.name || "Customer"}</p>
            <p className="font-body-md text-text-muted">{user.email}</p>
            {order.phone && <p className="font-body-md text-text-muted">{order.phone}</p>}
          </div>
          <div>
            <p className="font-label-sm uppercase tracking-wider text-text-muted mb-space-xs border-b border-border-subtle pb-1 inline-block">Issued By</p>
            <p className="font-body-md font-bold mt-space-xs">India Digital Creatives</p>
            <p className="font-body-md text-text-muted">Bangalore, Karnataka</p>
            <p className="font-body-md text-text-muted">contact@indiadigitalcreatives.com</p>
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-space-3xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-text-editorial">
                <th className="py-space-sm font-label-sm uppercase tracking-wider text-text-muted w-2/3">Description</th>
                <th className="py-space-sm font-label-sm uppercase tracking-wider text-text-muted text-center w-1/6">Qty</th>
                <th className="py-space-sm font-label-sm uppercase tracking-wider text-text-muted text-right w-1/6">Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item.id} className="border-b border-border-subtle">
                  <td className="py-space-md">
                    <p className="font-body-md font-medium">{item.product.title}</p>
                    <p className="font-body-sm text-text-muted mt-1">{item.product.category || "Digital Product"}</p>
                  </td>
                  <td className="py-space-md text-center font-body-md">1</td>
                  <td className="py-space-md text-right font-body-md font-medium">₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-space-4xl">
          <div className="w-1/2">
            <div className="flex justify-between py-space-xs border-b border-border-subtle">
              <span className="font-body-md text-text-muted">Subtotal</span>
              <span className="font-body-md font-medium">₹{order.totalAmount}</span>
            </div>
            <div className="flex justify-between py-space-xs border-b border-border-subtle">
              <span className="font-body-md text-text-muted">Tax (0%)</span>
              <span className="font-body-md font-medium">₹0.00</span>
            </div>
            <div className="flex justify-between py-space-sm border-b-2 border-text-editorial mt-space-xs">
              <span className="font-headline-sm font-bold uppercase tracking-wider">Total</span>
              <span className="font-headline-sm font-bold">₹{order.totalAmount}</span>
            </div>
            <div className="mt-space-sm text-right">
              <span className="inline-block bg-primary-container/20 text-primary px-space-sm py-space-3xs font-label-sm uppercase tracking-wider font-bold rounded-sm border border-primary/20">
                {order.status === "PAID" ? "PAID IN FULL" : order.status}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-text-muted font-body-sm border-t border-border-subtle pt-space-lg">
          <p>Thank you for your purchase.</p>
          <p className="mt-1">If you have any questions about this invoice, please contact support.</p>
        </div>

        {/* Print Button (Hidden when printing) */}
        <div className="mt-space-xl text-center print:hidden">
          <PrintButton />
        </div>
      </div>
    </div>
  );
}
