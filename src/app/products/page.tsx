"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AllProductsPage() {
  return (
    <>
      <Header />
      <main  className="w-full pt-16 bg-surface min-h-screen">
        <div className="flex flex-col w-full">
{/*  SECTION 1: EDITORIAL SHOP HERO  */}
<section className="w-full bg-surface-deep text-on-surface px-margin-mobile lg:px-margin-desktop pt-space-2xl pb-space-3xl relative overflow-hidden">
<div className="absolute right-0 top-0 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
<div className="max-w-[1440px] mx-auto flex flex-col gap-space-md relative z-10">
<div className="flex items-center gap-space-xs text-text-muted">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container">ARCHIVE // V2.4</span>
<span className="text-text-muted text-xs">•</span>
<span className="font-label-sm text-label-sm uppercase tracking-widest">DIGITAL CURATIONS</span>
</div>
<h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-text-editorial uppercase leading-none tracking-tighter">
        SHOP ALL DIGITAL<br className="hidden sm:inline"/> PRODUCTS.
      </h1>
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg pt-space-sm">
<p className="font-body-lg text-body-lg text-text-muted max-w-2xl font-light">
          Curated books, ebooks, guides, and production-ready templates. Engineered for thinkers, studio builders, and graphic designers who refuse mediocrity.
        </p>
<div className="flex items-center gap-space-xs shrink-0 self-start md:self-auto bg-surface-card/60 px-space-sm py-space-xs">
<span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-editorial">
            Displaying 28 Curated Digital Resources • Instant Download
          </span>
</div>
</div>
</div>
</section>
{/*  SECTION 2: SEARCH, PILLS, & CONTROLS INTERFACE  */}
<section className="w-full bg-surface-container-low px-margin-mobile lg:px-margin-desktop py-space-lg sticky top-16 z-30 shadow-md backdrop-blur-md bg-surface-container-low/95">
<div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
{/*  Category Pill Navigation  */}
<div className="flex items-center gap-space-xs overflow-x-auto pb-space-2xs lg:pb-0 scrollbar-none" id="categoryPillContainer">
<button className="cat-pill bg-primary-container text-on-primary-fixed font-label-sm text-label-sm uppercase px-space-sm py-space-xs shrink-0 font-bold transition-all" data-category="all">
          All Products (28)
        </button>
<button className="cat-pill bg-surface-card hover:bg-surface-card-hover text-text-muted hover:text-text-editorial font-label-sm text-label-sm uppercase px-space-sm py-space-xs shrink-0 font-bold transition-all" data-category="ebook">
          Ebooks (12)
        </button>
<button className="cat-pill bg-surface-card hover:bg-surface-card-hover text-text-muted hover:text-text-editorial font-label-sm text-label-sm uppercase px-space-sm py-space-xs shrink-0 font-bold transition-all" data-category="book">
          Books (6)
        </button>
<button className="cat-pill bg-surface-card hover:bg-surface-card-hover text-text-muted hover:text-text-editorial font-label-sm text-label-sm uppercase px-space-sm py-space-xs shrink-0 font-bold transition-all" data-category="guide">
          Guides (5)
        </button>
<button className="cat-pill bg-surface-card hover:bg-surface-card-hover text-text-muted hover:text-text-editorial font-label-sm text-label-sm uppercase px-space-sm py-space-xs shrink-0 font-bold transition-all" data-category="template">
          Templates (3)
        </button>
<button className="cat-pill bg-surface-card hover:bg-surface-card-hover text-text-muted hover:text-text-editorial font-label-sm text-label-sm uppercase px-space-sm py-space-xs shrink-0 font-bold transition-all" data-category="bundle">
          Bundles (2)
        </button>
</div>
{/*  Quick Search + Mobile Filter Toggle  */}
<div className="flex items-center gap-space-sm w-full lg:w-auto">
<div className="relative flex-1 lg:w-80">
<span className="material-symbols-outlined absolute left-space-xs top-1/2 -translate-y-1/2 text-text-muted text-[18px]">search</span>
<input className="w-full bg-surface-deep text-text-editorial placeholder:text-text-muted text-body-sm font-body-sm pl-9 pr-space-sm py-2 focus:outline-none focus:bg-surface-container transition-all" id="searchInput" placeholder="Search by keyword, author, or topic..." type="text"/>
</div>
<button className="lg:hidden flex items-center gap-space-2xs bg-surface-card hover:bg-surface-card-hover text-text-editorial px-space-sm py-2 font-label-sm text-label-sm uppercase" id="mobileFilterBtn">
<span className="material-symbols-outlined text-[18px]">tune</span>
<span>Filters</span>
</button>
</div>
</div>
</section>
{/*  SECTION 3: MAIN CATALOG AREA WITH SIDEBAR + GRID  */}
<section className="w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin-desktop py-space-2xl">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
{/*  LEFT SIDEBAR: ADVANCED SPECIFICATION FILTERS  */}
<aside className="hidden lg:block lg:col-span-3 space-y-space-xl" id="filterSidebar">
{/*  Filter Header  */}
<div className="flex items-center justify-between pb-space-xs bg-surface-container-high px-space-sm py-space-xs">
<span className="font-label-md text-label-md uppercase tracking-wider text-text-editorial flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px] text-primary-container">filter_list</span>
            Parameters
          </span>
<button className="font-label-sm text-label-sm text-primary-container uppercase hover:underline" id="resetFilters">
            Reset (0)
          </button>
</div>
{/*  Sort Select Box  */}
<div className="bg-surface-deep p-space-sm space-y-space-2xs">
<label className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted block">Sort Catalog By</label>
<div className="relative">
<select className="w-full bg-surface-card text-text-editorial font-body-sm text-body-sm px-space-sm py-space-xs appearance-none focus:outline-none focus:bg-surface-card-hover cursor-pointer" id="sortSelect">
<option value="featured">Featured Curations</option>
<option value="bestselling">Best Selling First</option>
<option value="price-low">Price: Low → High</option>
<option value="price-high">Price: High → Low</option>
<option value="newest">Newest Releases</option>
</select>
<span className="material-symbols-outlined pointer-events-none absolute right-space-xs top-1/2 -translate-y-1/2 text-text-muted text-[16px]">unfold_more</span>
</div>
</div>
{/*  Filter: Deliverable Formats  */}
<div className="bg-surface-deep p-space-sm space-y-space-sm">
<h4 className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container font-bold">Deliverable Format</h4>
<div className="space-y-space-xs font-body-sm text-body-sm">
<label className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-space-2xs">
<input className="accent-primary-container w-4 h-4 cursor-pointer" name="format" type="checkbox" value="PDF"/>
<span className="text-text-muted group-hover:text-text-editorial transition-colors">PDF Documents</span>
</div>
<span className="font-label-sm text-label-sm text-text-muted bg-surface-card px-1.5 py-0.5">14</span>
</label>
<label className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-space-2xs">
<input className="accent-primary-container w-4 h-4 cursor-pointer" name="format" type="checkbox" value="Notion"/>
<span className="text-text-muted group-hover:text-text-editorial transition-colors">Notion Workspaces</span>
</div>
<span className="font-label-sm text-label-sm text-text-muted bg-surface-card px-1.5 py-0.5">05</span>
</label>
<label className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-space-2xs">
<input className="accent-primary-container w-4 h-4 cursor-pointer" name="format" type="checkbox" value="Figma"/>
<span className="text-text-muted group-hover:text-text-editorial transition-colors">Figma Libraries</span>
</div>
<span className="font-label-sm text-label-sm text-text-muted bg-surface-card px-1.5 py-0.5">04</span>
</label>
<label className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-space-2xs">
<input className="accent-primary-container w-4 h-4 cursor-pointer" name="format" type="checkbox" value="EPUB"/>
<span className="text-text-muted group-hover:text-text-editorial transition-colors">EPUB (Apple Books/Kindle)</span>
</div>
<span className="font-label-sm text-label-sm text-text-muted bg-surface-card px-1.5 py-0.5">08</span>
</label>
<label className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-space-2xs">
<input className="accent-primary-container w-4 h-4 cursor-pointer" name="format" type="checkbox" value="Printable"/>
<span className="text-text-muted group-hover:text-text-editorial transition-colors">Print-Ready Matrices</span>
</div>
<span className="font-label-sm text-label-sm text-text-muted bg-surface-card px-1.5 py-0.5">03</span>
</label>
</div>
</div>
{/*  Filter: Price Range  */}
<div className="bg-surface-deep p-space-sm space-y-space-sm">
<h4 className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container font-bold">Price Matrix</h4>
<div className="space-y-space-xs font-body-sm text-body-sm">
<label className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-space-2xs">
<input checked={true} className="accent-primary-container w-4 h-4 cursor-pointer" name="priceRange" type="radio" value="all"/>
<span className="text-text-editorial">All Tiers</span>
</div>
<span className="font-label-sm text-label-sm text-text-muted">28</span>
</label>
<label className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-space-2xs">
<input className="accent-primary-container w-4 h-4 cursor-pointer" name="priceRange" type="radio" value="under-199"/>
<span className="text-text-muted group-hover:text-text-editorial transition-colors">Under ₹199</span>
</div>
<span className="font-label-sm text-label-sm text-text-muted">08</span>
</label>
<label className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-space-2xs">
<input className="accent-primary-container w-4 h-4 cursor-pointer" name="priceRange" type="radio" value="200-499"/>
<span className="text-text-muted group-hover:text-text-editorial transition-colors">₹200 – ₹499</span>
</div>
<span className="font-label-sm text-label-sm text-text-muted">14</span>
</label>
<label className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-space-2xs">
<input className="accent-primary-container w-4 h-4 cursor-pointer" name="priceRange" type="radio" value="500-plus"/>
<span className="text-text-muted group-hover:text-text-editorial transition-colors">₹500+ (Master Bundles)</span>
</div>
<span className="font-label-sm text-label-sm text-text-muted">06</span>
</label>
</div>
</div>
{/*  Filter: Domain / Topics  */}
<div className="bg-surface-deep p-space-sm space-y-space-sm">
<h4 className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container font-bold">Knowledge Domain</h4>
<div className="flex flex-wrap gap-space-2xs">
<button className="topic-chip font-label-sm text-label-sm uppercase px-space-xs py-1 bg-surface-card hover:bg-surface-card-hover text-text-muted hover:text-text-editorial" data-topic="Typography">Typography &amp; Layout</button>
<button className="topic-chip font-label-sm text-label-sm uppercase px-space-xs py-1 bg-surface-card hover:bg-surface-card-hover text-text-muted hover:text-text-editorial" data-topic="Business">Creative Business</button>
<button className="topic-chip font-label-sm text-label-sm uppercase px-space-xs py-1 bg-surface-card hover:bg-surface-card-hover text-text-muted hover:text-text-editorial" data-topic="Systems">Systems &amp; Code</button>
<button className="topic-chip font-label-sm text-label-sm uppercase px-space-xs py-1 bg-surface-card hover:bg-surface-card-hover text-text-muted hover:text-text-editorial" data-topic="Publishing">Writing &amp; Publishing</button>
</div>
</div>
{/*  Library Pledge Callout  */}
<div className="bg-surface-canvas p-space-md text-on-surface space-y-space-xs">
<span className="material-symbols-outlined text-primary-container text-2xl">verified_user</span>
<h5 className="font-headline-sm text-headline-sm text-text-editorial leading-tight">Permanent Ownership Pledge</h5>
<p className="font-body-sm text-body-sm text-text-muted">
            All purchases trigger instant file token creation. Free updates distributed indefinitely to your verified IDC library.
          </p>
</div>
</aside>
{/*  RIGHT COLUMN: HIGH FIDELITY PRODUCT GRID  */}
<main className="col-span-1 lg:col-span-9 flex flex-col gap-space-xl">
{/*  Live Status Bar  */}
<div className="flex items-center justify-between bg-surface-container px-space-md py-space-sm">
<div className="flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted">Active Filter:</span>
<span className="font-label-sm text-label-sm uppercase text-text-editorial font-bold bg-surface-card px-2 py-0.5" id="activeFilterLabel">All Products</span>
</div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted" id="productCount">Showing 8 of 28 Items</span>
</div>
{/*  Product Cards Grid (4 columns on wide screens, 2 on tablet, 1 on mobile)  */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md" id="productsGrid">
{/*  ITEM 1  */}
<article className="product-item group bg-surface-card hover:bg-surface-card-hover transition-all flex flex-col justify-between p-space-sm shadow-md" data-category="template guide" data-price="299" data-topic="Business Systems">
<div className="space-y-space-sm">
<div className="relative w-full aspect-[3/4] bg-surface-canvas overflow-hidden flex items-center justify-center">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Editorial visual cover for The Creative Director's Operating System publication, featuring brutalist typographic hierarchy, monochrome charcoal textures, bold chartreuse geometric accents, and structured technical data layout in a high-contrast European art catalog style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS98QpbtsRl8k3C3beyughTdHG4ApPrkRFVKZAupUiF_ftqNZ1CTPT7YvQix-5G9eKPTuhddf_1BYLeet-3I2TSQstFX1aYPn5dT6TB7sriAvGCv-To333E-1UGBLpjG61rkrKdCHHLn__OuGmXNiXa9Tu2AKN5oEgEhD908ibW0BK5csU27zrzsoXtKacwsgtPZ98xb6z9ThS6UtQf1VXM79ZkfLsrnvHSWK2A8mxcs2oHS3LU19v"/>
<div className="absolute top-space-xs left-space-xs flex flex-col gap-1">
<span className="bg-primary-container text-on-primary-fixed font-label-sm text-label-sm uppercase px-space-xs py-0.5 font-extrabold tracking-wider">
                    50% OFF
                  </span>
<span className="bg-surface-deep/90 text-text-editorial font-label-sm text-label-sm px-space-xs py-0.5 backdrop-blur-sm">
                    4.9 ★ (142)
                  </span>
</div>
</div>
<div className="space-y-space-2xs">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-text-muted">Notion + Guide</span>
<h3 className="font-headline-sm text-headline-sm text-text-editorial group-hover:text-primary-container transition-colors leading-tight line-clamp-2">
                  The Creative Director's Operating System
                </h3>
<p className="font-body-sm text-body-sm text-text-muted">
                  42 Templates • Complete Studio OS
                </p>
</div>
</div>
<div className="pt-space-md space-y-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-sm text-headline-sm text-primary-container font-bold">₹299</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">₹599</span>
<span className="font-label-sm text-label-sm text-text-muted uppercase ml-auto">INR</span>
</div>
<div className="grid grid-cols-5 gap-space-2xs">
<button className="col-span-4 bg-primary-container hover:bg-surface-tint active:bg-surface-tint text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider py-space-xs font-bold transition-all text-center buy-now-btn">
                  Buy Now
                </button>
<button aria-label="Add to cart" className="col-span-1 bg-surface-deep hover:bg-surface-container text-text-editorial flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-[20px]">shopping_bag</span>
</button>
</div>
</div>
</article>
{/*  ITEM 2  */}
<article className="product-item group bg-surface-card hover:bg-surface-card-hover transition-all flex flex-col justify-between p-space-sm shadow-md" data-category="book" data-price="199" data-topic="Typography">
<div className="space-y-space-sm">
<div className="relative w-full aspect-[3/4] bg-surface-canvas overflow-hidden flex items-center justify-center">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Monochrome typographic book specimen cover featuring huge serif Bodoni letters, Swiss grid lines, high-contrast black and off-white editorial composition with small chartreuse accent badges." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhqC3avnQGBIdnSQOpyTSBLvK4xGmmQ80EvtMeChBppxgWx-zT1jhCue0S69EnvCyz7tfCF17uP5d9u3_wqyT2CzhkM7e4YacLd0J-MxjBrIQE3Q50fnEITzg1046oNqEBMRTCOVERcARzxqQu8k0XD4eYi2vMzm6GFMwQ5QySplaFEUB8Exwntk8GNTpZ49sYR8pwN92vCgmynJVrmHD22Vnww0_QUNeXFlefFjPa_sWArH5uVNxD"/>
<div className="absolute top-space-xs left-space-xs">
<span className="bg-primary-container text-on-primary-fixed font-label-sm text-label-sm uppercase px-space-xs py-0.5 font-extrabold tracking-wider">
                    BESTSELLER
                  </span>
</div>
</div>
<div className="space-y-space-2xs">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-text-muted">PDF Book</span>
<h3 className="font-headline-sm text-headline-sm text-text-editorial group-hover:text-primary-container transition-colors leading-tight line-clamp-2">
                  Brier Typography Specimen &amp; Guidebook
                </h3>
<p className="font-body-sm text-body-sm text-text-muted">
                  184 Pages • 48MB High-Res PDF
                </p>
</div>
</div>
<div className="pt-space-md space-y-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-sm text-headline-sm text-primary-container font-bold">₹199</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">₹399</span>
<span className="font-label-sm text-label-sm text-text-muted uppercase ml-auto">INR</span>
</div>
<div className="grid grid-cols-5 gap-space-2xs">
<button className="col-span-4 bg-primary-container hover:bg-surface-tint active:bg-surface-tint text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider py-space-xs font-bold transition-all text-center buy-now-btn">
                  Buy Now
                </button>
<button aria-label="Add to cart" className="col-span-1 bg-surface-deep hover:bg-surface-container text-text-editorial flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-[20px]">shopping_bag</span>
</button>
</div>
</div>
</article>
{/*  ITEM 3  */}
<article className="product-item group bg-surface-card hover:bg-surface-card-hover transition-all flex flex-col justify-between p-space-sm shadow-md" data-category="guide" data-price="349" data-topic="Systems">
<div className="space-y-space-sm">
<div className="relative w-full aspect-[3/4] bg-surface-canvas overflow-hidden flex items-center justify-center">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Digital editorial manual showcasing interactive web animations, code frames, sleek dark interface mockup with neon lime accents, structured code snippets and responsive UI diagrams on a charcoal slate backdrop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuABOA68-kfE1c0OD1SIEypHGnbbecP4RAiQ2LFtSV2YS8XRSJHTtasA-5dg7PfBA4kbOyjD1AHN0C5lKH-67lo3-JTkZPlrWblF4sPAkkqBnMooL3f-m6hvXYEuYDReI9M1kjL06bV5R62vdDYJgZaDKk2q5Ihbnv_j5x21oBZMVtyFBUQaRnygOLVIbOkUvqfky-wgCfO7ON5ziGpHsZkaKokIOXE_GeUYbFbVcSe7HRNw9Da0-tkL"/>
<div className="absolute top-space-xs left-space-xs">
<span className="bg-surface-deep/90 text-text-editorial font-label-sm text-label-sm uppercase px-space-xs py-0.5 font-bold tracking-wider">
                    NEW RELEASE
                  </span>
</div>
</div>
<div className="space-y-space-2xs">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-text-muted">Interactive Guide</span>
<h3 className="font-headline-sm text-headline-sm text-text-editorial group-hover:text-primary-container transition-colors leading-tight line-clamp-2">
                  Modern Web Layouts &amp; Micro-Interactions
                </h3>
<p className="font-body-sm text-body-sm text-text-muted">
                  Interactive HTML + Figma Source
                </p>
</div>
</div>
<div className="pt-space-md space-y-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-sm text-headline-sm text-primary-container font-bold">₹349</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">₹699</span>
<span className="font-label-sm text-label-sm text-text-muted uppercase ml-auto">INR</span>
</div>
<div className="grid grid-cols-5 gap-space-2xs">
<button className="col-span-4 bg-primary-container hover:bg-surface-tint active:bg-surface-tint text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider py-space-xs font-bold transition-all text-center buy-now-btn">
                  Buy Now
                </button>
<button aria-label="Add to cart" className="col-span-1 bg-surface-deep hover:bg-surface-container text-text-editorial flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-[20px]">shopping_bag</span>
</button>
</div>
</div>
</article>
{/*  ITEM 4  */}
<article className="product-item group bg-surface-card hover:bg-surface-card-hover transition-all flex flex-col justify-between p-space-sm shadow-md" data-category="bundle" data-price="699" data-topic="Business Systems">
<div className="space-y-space-sm">
<div className="relative w-full aspect-[3/4] bg-surface-canvas overflow-hidden flex items-center justify-center">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Editorial product showcase box mockup of an all-in-one studio bundle with layered digital books, disk token graphic, Notion templates, and tactile design artifacts in dark olive and luminous electric yellow." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQWpgn9LVuj4r8pUCDiZx5U5foJGVBsZwP26RYIpnniLcbNZwUf7mWjOyTnMQ9yMcSdn0gcmsnJt6IpgZuiB-H7R_HXblBPFFYsTevbo8_0gGS8VF1UcKG3scRDsTHBuqSipOy8p6GQ9fxQlVc92JG6E0kNsAw8Nd6jq4rgs2wsNHXnjJsKhDX7dHqFGevL_FakzZKp9i11-hKOdS_hX0yzKo9OeqFu_mSIiJg3JHessep3yL8q8L4"/>
<div className="absolute top-space-xs left-space-xs">
<span className="bg-primary-container text-on-primary-fixed font-label-sm text-label-sm uppercase px-space-xs py-0.5 font-extrabold tracking-wider">
                    61% BUNDLE OFF
                  </span>
</div>
</div>
<div className="space-y-space-2xs">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-text-muted">Master Bundle</span>
<h3 className="font-headline-sm text-headline-sm text-text-editorial group-hover:text-primary-container transition-colors leading-tight line-clamp-2">
                  The Solo Creator Business Stack
                </h3>
<p className="font-body-sm text-body-sm text-text-muted">
                  5 Resources • 1.2GB Complete Pack
                </p>
</div>
</div>
<div className="pt-space-md space-y-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-sm text-headline-sm text-primary-container font-bold">₹699</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">₹1,799</span>
<span className="font-label-sm text-label-sm text-text-muted uppercase ml-auto">INR</span>
</div>
<div className="grid grid-cols-5 gap-space-2xs">
<button className="col-span-4 bg-primary-container hover:bg-surface-tint active:bg-surface-tint text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider py-space-xs font-bold transition-all text-center buy-now-btn">
                  Buy Now
                </button>
<button aria-label="Add to cart" className="col-span-1 bg-surface-deep hover:bg-surface-container text-text-editorial flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-[20px]">shopping_bag</span>
</button>
</div>
</div>
</article>
{/*  ITEM 5  */}
<article className="product-item group bg-surface-card hover:bg-surface-card-hover transition-all flex flex-col justify-between p-space-sm shadow-md" data-category="ebook" data-price="149" data-topic="Publishing">
<div className="space-y-space-sm">
<div className="relative w-full aspect-[3/4] bg-surface-canvas overflow-hidden flex items-center justify-center">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Digital publishing manual cover presentation with refined typography, minimal print pagination accents, slate charcoal matte texture with subtle lime registration crosshairs." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbVgj19wLFr40DGc9ZCFa2H4B_YIZnFnMP2BFn-LMekR8HGyicLb48DvPxZW0neqbjHYuY0Eiu_A-rddbpGWR5zwRbanY3Ny4-BAUdQkUKDApnDf2nGyBJqs4u_gAQTduUqaA3xJekZih6vRMS4hLwtfgOl4MSger_6LVpoRmZyHhUNqU_Kjxour4bwuNWC6hQPaiNekg7MVwvjoQicKVsNJ9WMSLk8-Qe0QXf4ElLQ4ypMBzBHl95"/>
<div className="absolute top-space-xs left-space-xs">
<span className="bg-surface-deep/90 text-text-editorial font-label-sm text-label-sm uppercase px-space-xs py-0.5 font-bold tracking-wider">
                    EPUB + PDF
                  </span>
</div>
</div>
<div className="space-y-space-2xs">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-text-muted">Ebook</span>
<h3 className="font-headline-sm text-headline-sm text-text-editorial group-hover:text-primary-container transition-colors leading-tight line-clamp-2">
                  Digital Publishing from Scratch
                </h3>
<p className="font-body-sm text-body-sm text-text-muted">
                  96 Pages • Self-distribution blueprint
                </p>
</div>
</div>
<div className="pt-space-md space-y-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-sm text-headline-sm text-primary-container font-bold">₹149</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">₹299</span>
<span className="font-label-sm text-label-sm text-text-muted uppercase ml-auto">INR</span>
</div>
<div className="grid grid-cols-5 gap-space-2xs">
<button className="col-span-4 bg-primary-container hover:bg-surface-tint active:bg-surface-tint text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider py-space-xs font-bold transition-all text-center buy-now-btn">
                  Buy Now
                </button>
<button aria-label="Add to cart" className="col-span-1 bg-surface-deep hover:bg-surface-container text-text-editorial flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-[20px]">shopping_bag</span>
</button>
</div>
</div>
</article>
{/*  ITEM 6  */}
<article className="product-item group bg-surface-card hover:bg-surface-card-hover transition-all flex flex-col justify-between p-space-sm shadow-md" data-category="template guide" data-price="499" data-topic="Systems Typography">
<div className="space-y-space-sm">
<div className="relative w-full aspect-[3/4] bg-surface-canvas overflow-hidden flex items-center justify-center">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Figma design system architectural graphic cover, displaying token trees, dark mode variables, component matrix, and sharp design system engineering typography in stark contrast." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUMpGYgoCo5BI1TOi3vupNPUYvpnJLR3Kt6XzYTiIuCJG0EqQYLLomv3JJqC9qye7c5rTphg0tkkMaJ2fW1zTtqWRLzWG5ChFUNERujRtu7TeQFFnsLmI5Z7iP66q8xpscVzB7nOtu0Br_LEi8KyRVpWbTfyKmuEf3sMSNsf98p_0vKK6FNIoErjhEp0AJs7-RDLbHWED9HiziApeff5pXEPlczRygbgwYPJfVXnpqk2II9BM66i-E"/>
<div className="absolute top-space-xs left-space-xs">
<span className="bg-primary-container text-on-primary-fixed font-label-sm text-label-sm uppercase px-space-xs py-0.5 font-extrabold tracking-wider">
                    FIGMA 2026
                  </span>
</div>
</div>
<div className="space-y-space-2xs">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-text-muted">Template + Video</span>
<h3 className="font-headline-sm text-headline-sm text-text-editorial group-hover:text-primary-container transition-colors leading-tight line-clamp-2">
                  Figma Design System Architecture 2026
                </h3>
<p className="font-body-sm text-body-sm text-text-muted">
                  340 Components • 2h Deep Dive Video
                </p>
</div>
</div>
<div className="pt-space-md space-y-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-sm text-headline-sm text-primary-container font-bold">₹499</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">₹899</span>
<span className="font-label-sm text-label-sm text-text-muted uppercase ml-auto">INR</span>
</div>
<div className="grid grid-cols-5 gap-space-2xs">
<button className="col-span-4 bg-primary-container hover:bg-surface-tint active:bg-surface-tint text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider py-space-xs font-bold transition-all text-center buy-now-btn">
                  Buy Now
                </button>
<button aria-label="Add to cart" className="col-span-1 bg-surface-deep hover:bg-surface-container text-text-editorial flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-[20px]">shopping_bag</span>
</button>
</div>
</div>
</article>
{/*  ITEM 7  */}
<article className="product-item group bg-surface-card hover:bg-surface-card-hover transition-all flex flex-col justify-between p-space-sm shadow-md" data-category="guide ebook" data-price="199" data-topic="Publishing">
<div className="space-y-space-sm">
<div className="relative w-full aspect-[3/4] bg-surface-canvas overflow-hidden flex items-center justify-center">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Editorial workbook layout with classic literary serif typesetting, narrative diagram overlays, textured cream parchment on deep dark studio table, minimalist brutalist styling." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXbuSommyikh0RrSg2GRhoiQHHy0MBmZ3kihLf-Bvy9mPJrFBW5dBYhftVUTh13wxrtuzAaQBbBifVKoy0eMBmIzfyOcgmhKGINCN0AOD7xEXTUJpL43Kgiudu8TFU4iGdMRUqE2TY6cdckQVd_w8WI4gmLyMu_Ei6ILTuVeBEP2tTdv8XnImsbzK2a6tqE6jKJQ8kgKXKps2eh9Pdz6HuaYcHUnk-BFP-w-5iIfX_bCETQmtO7k-Z"/>
<div className="absolute top-space-xs left-space-xs">
<span className="bg-surface-deep/90 text-text-editorial font-label-sm text-label-sm uppercase px-space-xs py-0.5 font-bold tracking-wider">
                    WORKBOOK
                  </span>
</div>
</div>
<div className="space-y-space-2xs">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-text-muted">PDF Workbook</span>
<h3 className="font-headline-sm text-headline-sm text-text-editorial group-hover:text-primary-container transition-colors leading-tight line-clamp-2">
                  Editorial Writing &amp; Story Structuring
                </h3>
<p className="font-body-sm text-body-sm text-text-muted">
                  110 Pages • 25 Interactive Prompts
                </p>
</div>
</div>
<div className="pt-space-md space-y-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-sm text-headline-sm text-primary-container font-bold">₹199</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">₹399</span>
<span className="font-label-sm text-label-sm text-text-muted uppercase ml-auto">INR</span>
</div>
<div className="grid grid-cols-5 gap-space-2xs">
<button className="col-span-4 bg-primary-container hover:bg-surface-tint active:bg-surface-tint text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider py-space-xs font-bold transition-all text-center buy-now-btn">
                  Buy Now
                </button>
<button aria-label="Add to cart" className="col-span-1 bg-surface-deep hover:bg-surface-container text-text-editorial flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-[20px]">shopping_bag</span>
</button>
</div>
</div>
</article>
{/*  ITEM 8  */}
<article className="product-item group bg-surface-card hover:bg-surface-card-hover transition-all flex flex-col justify-between p-space-sm shadow-md" data-category="template" data-price="249" data-topic="Business">
<div className="space-y-space-sm">
<div className="relative w-full aspect-[3/4] bg-surface-canvas overflow-hidden flex items-center justify-center">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Legal creative contract document kit cover, showing modern invoice matrices, terms clauses, clean black and lime editorial design on rich deep graphite surface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBXEHzYBR5X8VA50KDS7s-LXNKDclaZ-XVYUvkndheQWKyXK-U4w-Sc21NOu0Sj_KwBTTQkyoKuMZIfOxgillRVlcT0TUGXir0BigGO3U0dR_Itt5l1DhYd2ac4aW5qnPRlEUYpsuTpAkIfvBe_NAaQzImk9A1Ky0_DavyUfrkXVQw1svDi6mq5YKhNgGxpfDLvcPXPp6QHv4uw-2Nt--qr2AoYL-rmmQ8FPKzrEgvEcY32QGyWsql"/>
<div className="absolute top-space-xs left-space-xs">
<span className="bg-primary-container text-on-primary-fixed font-label-sm text-label-sm uppercase px-space-xs py-0.5 font-extrabold tracking-wider">
                    LEGAL VERIFIED
                  </span>
</div>
</div>
<div className="space-y-space-2xs">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-text-muted">Legal Templates</span>
<h3 className="font-headline-sm text-headline-sm text-text-editorial group-hover:text-primary-container transition-colors leading-tight line-clamp-2">
                  Freelance Contract &amp; Invoice Toolkit
                </h3>
<p className="font-body-sm text-body-sm text-text-muted">
                  DOCX + PDF + Notion • India GST Ready
                </p>
</div>
</div>
<div className="pt-space-md space-y-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-sm text-headline-sm text-primary-container font-bold">₹249</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">₹499</span>
<span className="font-label-sm text-label-sm text-text-muted uppercase ml-auto">INR</span>
</div>
<div className="grid grid-cols-5 gap-space-2xs">
<button className="col-span-4 bg-primary-container hover:bg-surface-tint active:bg-surface-tint text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider py-space-xs font-bold transition-all text-center buy-now-btn">
                  Buy Now
                </button>
<button aria-label="Add to cart" className="col-span-1 bg-surface-deep hover:bg-surface-container text-text-editorial flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-[20px]">shopping_bag</span>
</button>
</div>
</div>
</article>
</div>
{/*  Empty Results Fallback State  */}
<div className="hidden flex-col items-center justify-center py-space-4xl text-center bg-surface-deep p-space-xl" id="noResultsState">
<span className="material-symbols-outlined text-4xl text-text-muted mb-space-sm">find_in_page</span>
<h3 className="font-headline-sm text-headline-sm text-text-editorial">No products match your criteria</h3>
<p className="font-body-sm text-body-sm text-text-muted mt-space-2xs max-w-sm">
            Try loosening search terms or selecting 'All Products' to explore the catalog archive.
          </p>
<button className="mt-space-md bg-primary-container text-on-primary-fixed font-label-md text-label-md uppercase px-space-md py-space-xs font-bold" id="clearFiltersBtn">
            Clear All Filters
          </button>
</div>
{/*  Bottom Pagination & Catalog Specs  */}
<div className="flex flex-col sm:flex-row items-center justify-between gap-space-md bg-surface-deep p-space-md">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted">
            Viewing Page 1 of 4 • 28 Total Publications
          </span>
<div className="flex items-center gap-space-2xs">
<button className="px-space-sm py-space-xs bg-surface-card text-text-muted font-label-sm text-label-sm uppercase disabled={true}:opacity-40" disabled={true}>
              ← Prev
            </button>
<button className="px-space-sm py-space-xs bg-primary-container text-on-primary-fixed font-label-sm text-label-sm uppercase font-bold">
              1
            </button>
<button className="px-space-sm py-space-xs bg-surface-card hover:bg-surface-card-hover text-text-editorial font-label-sm text-label-sm uppercase transition-colors">
              2
            </button>
<button className="px-space-sm py-space-xs bg-surface-card hover:bg-surface-card-hover text-text-editorial font-label-sm text-label-sm uppercase transition-colors">
              3
            </button>
<button className="px-space-sm py-space-xs bg-surface-card hover:bg-surface-card-hover text-text-editorial font-label-sm text-label-sm uppercase transition-colors">
              Next →
            </button>
</div>
</div>
</main>
</div>
</section>
{/*  SECTION 4: INSTITUTIONAL TRUST & FULFILLMENT BANNER  */}
<section className="w-full bg-surface-deep px-margin-mobile lg:px-margin-desktop py-space-2xl my-space-2xl">
<div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-space-lg">
<div className="flex items-start gap-space-sm p-space-sm bg-surface-card/40">
<div className="w-10 h-10 bg-primary-container/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary-container text-2xl">bolt</span>
</div>
<div className="space-y-1">
<h4 className="font-label-md text-label-md uppercase text-text-editorial tracking-wider">Zero Latency Delivery</h4>
<p className="font-body-sm text-body-sm text-text-muted">
            Instant token generation upon checkout. Download links sent to email &amp; available in IDC Library immediately.
          </p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm bg-surface-card/40">
<div className="w-10 h-10 bg-primary-container/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary-container text-2xl">all_inclusive</span>
</div>
<div className="space-y-1">
<h4 className="font-label-md text-label-md uppercase text-text-editorial tracking-wider">Perpetual Studio Access</h4>
<p className="font-body-sm text-body-sm text-text-muted">
            No recurring subscriptions or locked walls. Download original files as often as needed across devices.
          </p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm bg-surface-card/40">
<div className="w-10 h-10 bg-primary-container/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary-container text-2xl">verified</span>
</div>
<div className="space-y-1">
<h4 className="font-label-md text-label-md uppercase text-text-editorial tracking-wider">Commercial Standard</h4>
<p className="font-body-sm text-body-sm text-text-muted">
            Ready for professional freelance, enterprise studio deployments, and production client presentations.
          </p>
</div>
</div>
</div>
</section>
{/*  SECTION 5: FLOATING TOAST NOTIFICATION ON "BUY NOW" / CART  */}
<div className="fixed bottom-6 right-6 z-50 transform translate-y-24 opacity-0 transition-all duration-300 pointer-events-none bg-surface-card p-space-md shadow-2xl flex items-center gap-space-sm max-w-sm" id="cartToast">
<span className="w-8 h-8 rounded-full bg-primary-container text-on-primary-fixed flex items-center justify-center font-bold shrink-0">
<span className="material-symbols-outlined text-base">check</span>
</span>
<div>
<h5 className="font-label-md text-label-md uppercase text-text-editorial">Added to Instant Queue</h5>
<p className="font-body-sm text-body-sm text-text-muted" id="toastMessage">Product added to cart.</p>
</div>
</div>
</div>

      </main>
      <Footer />
    </>
  );
}
