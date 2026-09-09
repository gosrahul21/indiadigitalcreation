import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/"); // Not logged in, redirect home
  }

  // Find user by email to get their user ID
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) {
    redirect("/");
  }

  // Fetch orders
  const orders = await prisma.order.findMany({
    where: { 
      userId: user.id,
      status: "PAID" // Only show paid orders for now
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <Header />
      <main className="w-full pt-24 bg-surface min-h-screen pb-space-4xl">
        <div className="max-w-[1024px] mx-auto px-margin-mobile lg:px-margin-desktop">
          <h1 className="font-headline-lg text-headline-lg text-text-editorial uppercase mb-space-xs border-b border-border-subtle pb-space-sm">
            My Orders
          </h1>
          <p className="font-body-md text-body-md text-text-muted mb-space-xl">
            Access your purchased digital files and invoices below.
          </p>

          {orders.length === 0 ? (
            <div className="bg-surface-canvas border border-border-subtle p-space-2xl text-center flex flex-col items-center justify-center space-y-space-md">
              <span className="material-symbols-outlined text-4xl text-text-muted">receipt_long</span>
              <p className="font-body-lg text-body-lg text-text-editorial">You haven't placed any orders yet.</p>
              <Link href="/" className="px-space-xl py-space-sm bg-primary-container text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider hover:bg-surface-tint transition-colors">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-space-xl">
              {orders.map((order) => (
                <div key={order.id} className="bg-surface-card border border-border-subtle shadow-sm flex flex-col">
                  {/* Order Header */}
                  <div className="bg-surface-container p-space-md flex flex-wrap items-center justify-between gap-space-md border-b border-border-subtle">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">Order Placed</span>
                      <span className="font-body-md text-body-md text-text-editorial font-medium">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">Total Amount</span>
                      <span className="font-body-md text-body-md text-text-editorial font-medium">₹{order.totalAmount}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">Order ID</span>
                      <span className="font-body-md text-body-md text-text-editorial font-medium">#{order.id.substring(order.id.length - 8).toUpperCase()}</span>
                    </div>
                    <div className="flex gap-space-sm mt-space-sm sm:mt-0 ml-auto">
                      <Link 
                        href={`/orders/${order.id}/invoice`} 
                        className="px-space-md py-space-xs bg-surface text-text-editorial border border-border-subtle font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-hover transition-colors flex items-center gap-2"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[16px]">receipt</span>
                        Invoice
                      </Link>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-space-lg flex flex-col space-y-space-lg">
                    {order.orderItems.map((item) => {
                      const product = item.product;
                      return (
                        <div key={item.id} className="flex gap-space-lg">
                          <div className="w-24 h-32 shrink-0 bg-surface-canvas border border-border-subtle overflow-hidden">
                            {product.coverImage ? (
                              <img src={product.coverImage} alt={product.title} className="w-full h-full object-cover opacity-80" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-text-muted">No IMG</div>
                            )}
                          </div>
                          <div className="flex-grow flex flex-col">
                            <h3 className="font-headline-sm text-headline-sm text-text-editorial">{product.title}</h3>
                            <p className="font-body-sm text-body-sm text-text-muted mt-1 mb-space-md">{product.category || "Digital Download"}</p>
                            
                            <div className="mt-auto flex flex-col space-y-space-xs">
                              {product.hostedLinks && product.hostedLinks.map((link: string, idx: number) => {
                                // Extract filename nicely
                                let filename = "Download File";
                                try {
                                  const url = new URL(link);
                                  const parts = url.pathname.split('/');
                                  filename = parts[parts.length - 1];
                                  if (filename.includes('-')) {
                                    const firstDash = filename.indexOf('-');
                                    if (/^\d+$/.test(filename.substring(0, firstDash))) {
                                      filename = filename.substring(firstDash + 1);
                                    }
                                  }
                                  filename = decodeURIComponent(filename);
                                } catch(e) {}

                                return (
                                  <a 
                                    key={idx}
                                    href={`/api/download?productId=${product.id}&orderId=${order.id}&fileKey=${encodeURIComponent(link)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-primary-container text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-tint transition-colors w-max shadow-sm"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">download</span>
                                    {filename}
                                  </a>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
