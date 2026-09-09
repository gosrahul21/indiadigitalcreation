import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col space-y-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-text-editorial mb-space-2xs">Product catalog</h1>
          <p className="font-body-md text-body-md text-text-muted">Manage your digital products, pricing, and files.</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 bg-surface-tint hover:bg-primary-container text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider px-space-lg py-space-sm transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Product
        </Link>
      </div>

      <div className="bg-surface-container-lowest border border-border-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-card">
                <th className="p-space-md font-label-sm text-label-sm uppercase text-text-muted tracking-wider">Product</th>
                <th className="p-space-md font-label-sm text-label-sm uppercase text-text-muted tracking-wider">Price</th>
                <th className="p-space-md font-label-sm text-label-sm uppercase text-text-muted tracking-wider">Formats</th>
                <th className="p-space-md font-label-sm text-label-sm uppercase text-text-muted tracking-wider">Added On</th>
                <th className="p-space-md font-label-sm text-label-sm uppercase text-text-muted tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-space-xl text-center text-text-muted font-body-md">
                    No products found. Click "New Product" to add your first item.
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product.id} className="hover:bg-surface-card/50 transition-colors">
                    <td className="p-space-md">
                      <div className="flex items-center gap-space-sm">
                        {product.coverImage ? (
                          <img src={product.coverImage} alt={product.title} className="w-12 h-12 object-cover border border-border-subtle bg-surface-deep" />
                        ) : (
                          <div className="w-12 h-12 border border-border-subtle bg-surface-deep flex items-center justify-center">
                            <span className="material-symbols-outlined text-border-active">image</span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-text-editorial">{product.title}</span>
                          <span className="font-body-sm text-body-sm text-text-muted truncate max-w-[200px]">{product.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-space-md font-body-md text-text-editorial">₹{product.price}</td>
                    <td className="p-space-md">
                      <div className="flex flex-wrap gap-1">
                        {(product.formats as string[] || []).map(format => (
                          <span key={format} className="px-2 py-0.5 bg-surface-deep border border-border-subtle font-label-sm text-label-sm uppercase text-text-muted text-[10px]">
                            {format}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-space-md font-body-sm text-text-muted">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-space-md text-right">
                      <Link href={`/admin/products/${product.id}/edit`} className="text-surface-tint hover:text-primary-container font-label-sm uppercase tracking-widest transition-colors">Edit</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
