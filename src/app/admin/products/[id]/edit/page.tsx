"use client";
import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import JsonArrayEditor from "@/components/admin/JsonArrayEditor";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [formats, setFormats] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [labels, setLabels] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [hostedLink, setHostedLink] = useState("");
  const [hostedLinks, setHostedLinks] = useState<string[]>([]);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [deliverables, setDeliverables] = useState<any[]>([]);
  const [personas, setPersonas] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [spreadImages, setSpreadImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products?slug=${productId}`);
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title || "");
          setSlug(data.slug || "");
          setDescription(data.description || "");
          setPrice(data.price?.toString() || "");
          setFormats(data.formats?.join(", ") || "");
          setCategory(data.category || "");
          setSubcategory(data.subcategory || "");
          setLabels(data.labels?.join(", ") || "");
          setCoverImage(data.coverImage || "");
          setGalleryImages(data.galleryImages || []);
          setHostedLink(data.hostedLink || "");
          setHostedLinks(data.hostedLinks || []);
          setDeliverables(data.deliverables || []);
          setPersonas(data.personas || []);
          setFaqs(data.faqs || []);
          setSpreadImages(data.spreadImages || []);
        } else {
          alert("Product not found");
          router.push("/admin/products");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [productId, router]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isPrimary: boolean = true) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingFile(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const res = await fetch('/api/admin/upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, contentType: file.type })
        });
        const data = await res.json();
        if (!data.uploadUrl) throw new Error('Failed to get upload URL');

        const uploadRes = await fetch(data.uploadUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type }
        });
        
        if (uploadRes.ok) {
          if (isPrimary && i === 0) {
            setHostedLink(data.objectKey);
          } else {
            setHostedLinks(prev => [...prev, data.objectKey]);
          }
        } else {
          alert(`Failed to upload ${file.name}`);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file(s)');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          description,
          price: parseFloat(price),
          formats: formats ? formats.split(",").map(f => f.trim()) : [],
          coverImage,
          galleryImages,
          hostedLink,
          hostedLinks,
          category,
          subcategory,
          labels: labels ? labels.split(",").map(l => l.trim()) : [],
          deliverables,
          personas,
          faqs,
          spreadImages
        })
      });
      
      if (res.ok) {
        router.push("/admin/products");
      } else {
        const error = await res.json();
        alert(`Failed to save: ${error.message}`);
      }
    } catch (e) {
      console.error(e);
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-space-xl text-center text-text-muted">Loading product data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col space-y-space-xl pb-20">
      <div className="flex items-center justify-between border-b border-border-subtle pb-space-sm">
        <div>
          <Link href="/admin/products" className="font-label-sm text-text-muted hover:text-text-editorial uppercase tracking-wider mb-2 inline-flex items-center gap-1 transition-colors">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Products
          </Link>
          <h1 className="font-headline-lg text-headline-lg text-text-editorial">Edit Product</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-space-lg">
        
        {/* Basic Info */}
        <div className="bg-surface-container-lowest border border-border-subtle p-space-lg flex flex-col space-y-space-md">
          <h2 className="font-label-lg uppercase tracking-wider text-text-editorial border-b border-border-subtle pb-2">Primary Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col space-y-2">
              <label className="font-label-sm uppercase text-text-muted">Title</label>
              <input required value={title} onChange={e => setTitle(e.target.value)} className="bg-surface text-text-editorial p-space-sm border border-border-subtle focus:border-border-active outline-none font-body-md" placeholder="e.g. The Creative Handbook" />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-label-sm uppercase text-text-muted">URL Slug</label>
              <input required value={slug} onChange={e => setSlug(e.target.value)} className="bg-surface text-text-editorial p-space-sm border border-border-subtle focus:border-border-active outline-none font-body-md" placeholder="the-creative-handbook" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col space-y-2">
              <label className="font-label-sm uppercase text-text-muted">Price (INR)</label>
              <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="bg-surface text-text-editorial p-space-sm border border-border-subtle focus:border-border-active outline-none font-body-md" placeholder="299.00" />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-label-sm uppercase text-text-muted">Formats (Comma Separated)</label>
              <input value={formats} onChange={e => setFormats(e.target.value)} className="bg-surface text-text-editorial p-space-sm border border-border-subtle focus:border-border-active outline-none font-body-md" placeholder="PDF, EPUB, Notion" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="flex flex-col space-y-2">
              <label className="font-label-sm uppercase text-text-muted">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="bg-surface text-text-editorial p-space-sm border border-border-subtle focus:border-border-active outline-none font-body-md appearance-none">
                <option value="">Select Category...</option>
                <option value="Ebooks">Ebooks</option>
                <option value="Templates">Templates</option>
                <option value="Guides">Guides</option>
                <option value="Bundles">Bundles</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-label-sm uppercase text-text-muted">Subcategory</label>
              <input value={subcategory} onChange={e => setSubcategory(e.target.value)} className="bg-surface text-text-editorial p-space-sm border border-border-subtle focus:border-border-active outline-none font-body-md" placeholder="e.g. Design Systems" />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-label-sm uppercase text-text-muted">Labels (Comma Separated)</label>
              <input value={labels} onChange={e => setLabels(e.target.value)} className="bg-surface text-text-editorial p-space-sm border border-border-subtle focus:border-border-active outline-none font-body-md" placeholder="Bestseller, New Drop" />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-label-sm uppercase text-text-muted">Description</label>
            <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} className="bg-surface text-text-editorial p-space-sm border border-border-subtle focus:border-border-active outline-none font-body-md resize-y" placeholder="Detailed product description..." />
          </div>
        </div>

        {/* Media & Files */}
        <div className="bg-surface-container-lowest border border-border-subtle p-space-lg flex flex-col space-y-space-md">
          <h2 className="font-label-lg uppercase tracking-wider text-text-editorial border-b border-border-subtle pb-2">Media & Assets (Cloudinary)</h2>
          
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-label-sm uppercase text-text-muted">Cover Image</label>
              <div className="flex items-center gap-space-sm">
                <CldUploadWidget 
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset'}
                  onSuccess={(result: any) => {
                    if (result?.info?.secure_url) setCoverImage(result.info.secure_url);
                  }}
                >
                  {({ open }) => (
                    <button type="button" onClick={() => open()} className="bg-surface-deep border border-border-active hover:bg-surface-card text-text-editorial px-space-md py-space-sm font-label-md uppercase tracking-wider transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">upload</span>
                      Upload Cover
                    </button>
                  )}
                </CldUploadWidget>
                {coverImage && (
                  <img src={coverImage} alt="Cover" className="h-12 w-12 object-cover border border-border-subtle" />
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-label-sm uppercase text-text-muted">Gallery Images</label>
              <div className="flex flex-col items-start gap-space-sm">
                <CldUploadWidget 
                  options={{ multiple: true }}
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset'}
                  onSuccess={(result: any) => {
                    if (result?.info?.secure_url) setGalleryImages(prev => [...prev, result.info.secure_url]);
                  }}
                >
                  {({ open }) => (
                    <button type="button" onClick={() => open()} className="bg-surface-deep border border-border-active hover:bg-surface-card text-text-editorial px-space-md py-space-sm font-label-md uppercase tracking-wider transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">collections</span>
                      Upload Gallery
                    </button>
                  )}
                </CldUploadWidget>
                {galleryImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {galleryImages.map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={img} alt="" className="w-16 h-16 object-cover border border-border-subtle" />
                        <button type="button" onClick={() => setGalleryImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-0 right-0 bg-error text-on-error w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-2 pt-4 border-t border-border-subtle">
              <label className="font-label-sm uppercase text-text-muted">Primary Digital File (R2)</label>
              <div className="flex items-center gap-space-sm">
                <label className="cursor-pointer bg-surface-deep border border-border-active hover:bg-surface-card text-text-editorial px-space-md py-space-sm font-label-md uppercase tracking-wider transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    {uploadingFile ? 'sync' : 'cloud_upload'}
                  </span>
                  {uploadingFile ? 'Uploading...' : 'Replace File'}
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, true)} disabled={uploadingFile} />
                </label>
                {hostedLink && (
                  <span className="font-body-sm text-surface-tint truncate max-w-xs">{hostedLink}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-label-sm uppercase text-text-muted">Additional Bundle Files (R2)</label>
              <div className="flex flex-col items-start gap-space-sm">
                <label className="cursor-pointer bg-surface-deep border border-border-active hover:bg-surface-card text-text-editorial px-space-md py-space-sm font-label-md uppercase tracking-wider transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    {uploadingFile ? 'sync' : 'library_add'}
                  </span>
                  {uploadingFile ? 'Uploading...' : 'Add More Files'}
                  <input type="file" multiple className="hidden" onChange={(e) => handleFileUpload(e, false)} disabled={uploadingFile} />
                </label>
                {hostedLinks.length > 0 && (
                  <ul className="flex flex-col gap-1 mt-2">
                    {hostedLinks.map((link, i) => (
                      <li key={i} className="font-body-sm text-surface-tint truncate max-w-xs flex items-center gap-2">
                        <button type="button" onClick={() => setHostedLinks(prev => prev.filter((_, idx) => idx !== i))} className="text-error hover:text-error-container">
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                        {link}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Fields */}
        <JsonArrayEditor
          title="Deliverables (What's Included)"
          description="Cards shown in the 'Everything You Get' grid."
          fields={[
            { name: "title", label: "Title", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "formatText", label: "Format Note (e.g. FORMAT: PDF)", type: "text" },
            { name: "icon", label: "Material Icon Name (e.g. picture_as_pdf)", type: "text" },
            { name: "image", label: "Preview Image", type: "image" }
          ]}
          value={deliverables}
          onChange={setDeliverables}
        />

        <JsonArrayEditor
          title="Personas (Who Is This For?)"
          description="Cards showing the target audience."
          fields={[
            { name: "title", label: "Persona Title", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "focus", label: "Focus Area (e.g. Selling Digital Products)", type: "text" },
            { name: "icon", label: "Material Icon Name (e.g. brush)", type: "text" }
          ]}
          value={personas}
          onChange={setPersonas}
        />

        <JsonArrayEditor
          title="Product-Specific FAQs"
          description="These will be appended to the global FAQs."
          fields={[
            { name: "question", label: "Question", type: "text" },
            { name: "answer", label: "Answer", type: "textarea" }
          ]}
          value={faqs}
          onChange={setFaqs}
        />

        <JsonArrayEditor
          title="Spread Previews (Take a Look Inside)"
          description="Upload arrays of preview images grouped by tabs."
          fields={[
            { name: "tabName", label: "Tab Name (e.g. PDF Preview)", type: "text" },
            { name: "images", label: "Image URLs (Comma separated)", type: "textarea" }
          ]}
          value={spreadImages}
          onChange={setSpreadImages}
        />

        <button 
          type="submit" 
          disabled={loading}
          className="bg-surface-tint hover:bg-primary-container active:bg-primary-fixed text-on-primary-fixed py-space-md px-space-xl font-label-lg uppercase tracking-wider shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed self-end flex items-center gap-2"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              Saving...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">save</span>
              Save Changes
            </>
          )}
        </button>

      </form>
    </div>
  );
}
