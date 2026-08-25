import React, { createContext, useContext, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Bell, ChevronDown, ChevronLeft, ChevronRight, CircleUserRound,
  Clock3, Gift, Heart, Headphones, Menu, Minus, Package, Plus, Search, ShieldCheck,
  ShoppingBag, Sparkles, Star, Truck, UserRound, X, Zap, SlidersHorizontal,
  CreditCard, MapPin, Check, Trash2, Eye, Tag, LayoutGrid, LogOut
} from "lucide-react";
import "./styles.css";

const PRODUCTS = [
  { id: 1, name: "Alphabet Silicone Mold", category: "Silicone Molds", price: 1350, oldPrice: 1500, rating: 4.8, reviews: 120, discount: 10, image: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=900&q=85", tag: "Popular", desc: "Premium food-grade silicone alphabet mold for resin letters, charms and personalized crafts." },
  { id: 2, name: "Crystal Clear Epoxy Resin (1kg)", category: "Epoxy Resin", price: 2890, oldPrice: 3400, rating: 4.9, reviews: 98, discount: 15, image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=900&q=85", tag: "Bestseller", desc: "Crystal-clear, low-bubble epoxy resin designed for deep pours, coasters and decorative pieces." },
  { id: 3, name: "Resin Pigment Set (12 Colors)", category: "Pigments & Dyes", price: 1650, oldPrice: 1800, rating: 4.7, reviews: 76, discount: 8, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85", tag: "Trending", desc: "A vibrant set of 12 concentrated pigments for smooth color blending and marbling." },
  { id: 4, name: "Resin Tools Kit (20Pcs)", category: "Tools & Accessories", price: 1950, oldPrice: 2100, rating: 4.8, reviews: 64, discount: 8, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85", tag: "Pro Pick", desc: "A practical 20-piece kit for mixing, pouring, measuring and finishing resin projects." },
  { id: 5, name: "Complete Resin Starter Kit", category: "Resin Kits", price: 4950, oldPrice: 5600, rating: 4.9, reviews: 110, discount: 12, image: "https://images.unsplash.com/photo-1593487568720-92097fb8a3f7?auto=format&fit=crop&w=900&q=85", tag: "Best Value", desc: "Everything a beginner needs to start creating beautiful resin art from day one." },
  { id: 6, name: "Silicone Measuring Cups", category: "Tools & Accessories", price: 850, oldPrice: 950, rating: 4.6, reviews: 42, discount: 0, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85", tag: "Essential", desc: "Reusable flexible silicone measuring cups with easy-pour spouts." },
  { id: 7, name: "Ocean Blue Coaster Mold", category: "Silicone Molds", price: 1100, oldPrice: 1300, rating: 4.8, reviews: 55, discount: 12, image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85", tag: "New", desc: "Elegant coaster mold for ocean, terrazzo and floral resin techniques." },
  { id: 8, name: "Metallic Gold Mica Powder", category: "Pigments & Dyes", price: 750, oldPrice: 850, rating: 4.7, reviews: 88, discount: 0, image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85", tag: "Glow", desc: "Ultra-fine metallic mica for luminous gold accents and luxury finishes." },
  { id: 9, name: "UV Resin Crystal 500g", category: "Epoxy Resin", price: 2200, oldPrice: 2500, rating: 4.8, reviews: 71, discount: 10, image: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=900&q=85", tag: "Fast Cure", desc: "Clear UV resin for jewelry, small charms and quick decorative projects." },
  { id: 10, name: "Jewelry Findings Collection", category: "Jewelry Findings", price: 1250, oldPrice: 1450, rating: 4.6, reviews: 39, discount: 0, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85", tag: "Creator Pick", desc: "Mixed premium findings for earrings, pendants, keychains and custom jewelry." },
  { id: 11, name: "Silicone Geometric Tray Mold", category: "Silicone Molds", price: 3100, oldPrice: 3500, rating: 4.9, reviews: 83, discount: 11, image: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=900&q=85", tag: "Deal", desc: "Statement tray mold with clean geometric edges and a polished final look." },
  { id: 12, name: "MasterCast Pro 2:1 Epoxy Resin", category: "Epoxy Resin", price: 7500, oldPrice: 8200, rating: 4.8, reviews: 218, discount: 9, image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=900&q=85", tag: "Pro", desc: "Professional-grade 2:1 epoxy for premium casts, furniture accents and deep pours." }
];

const CATEGORIES = [
  ["Silicone Molds", "Molds", "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=700&q=85"],
  ["Epoxy Resin", "Resin", "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=700&q=85"],
  ["Pigments & Dyes", "Pigments", "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=85"],
  ["Tools & Accessories", "Tools", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=700&q=85"],
  ["Resin Kits", "Kits", "https://images.unsplash.com/photo-1593487568720-92097fb8a3f7?auto=format&fit=crop&w=700&q=85"],
  ["Additives", "Additives", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85"],
  ["Jewelry Findings", "Jewelry", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=85"]
];

const money = n => `PKR ${n.toLocaleString()}`;

const StoreContext = createContext(null);
function StoreProvider({ children }) {
  const [cart, setCart] = useState([{ product: PRODUCTS[1], qty: 1 }, { product: PRODUCTS[2], qty: 2 }]);
  const [wishlist, setWishlist] = useState([PRODUCTS[0], PRODUCTS[4]]);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState({ name: "Hira Khan", email: "hira@example.com" });
  const notify = (message) => { setToast(message); window.clearTimeout(window.__craftoToast); window.__craftoToast = setTimeout(() => setToast(null), 2200); };
  const addToCart = (product, qty = 1) => {
    setCart(c => {
      const found = c.find(x => x.product.id === product.id);
      return found ? c.map(x => x.product.id === product.id ? { ...x, qty: x.qty + qty } : x) : [...c, { product, qty }];
    });
    notify(`${product.name} added to cart`);
  };
  const updateQty = (id, delta) => setCart(c => c.map(x => x.product.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x));
  const removeFromCart = id => setCart(c => c.filter(x => x.product.id !== id));
  const toggleWishlist = product => {
    setWishlist(w => w.some(x => x.id === product.id) ? w.filter(x => x.id !== product.id) : [...w, product]);
    notify(wishlist.some(x => x.id === product.id) ? "Removed from wishlist" : "Saved to wishlist");
  };
  const subtotal = cart.reduce((a, x) => a + x.product.price * x.qty, 0);
  const shipping = subtotal >= 10000 || subtotal === 0 ? 0 : 250;
  return <StoreContext.Provider value={{ cart, wishlist, toast, user, setUser, addToCart, updateQty, removeFromCart, toggleWishlist, subtotal, shipping, notify }}>
    {children}
    <AnimatePresence>{toast && <motion.div className="toast" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}><Check size={18} />{toast}</motion.div>}</AnimatePresence>
  </StoreContext.Provider>
}
const useStore = () => useContext(StoreContext);

function App() {
  return <StoreProvider><Site /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/deal" element={<DealBuilder />} />
    <Route path="/category/:category" element={<Shop />} />
    <Route path="/product/:id" element={<Product />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/wishlist" element={<WishlistPage />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/account" element={<Account />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="*" element={<NotFound />} />
  </Routes></StoreProvider>
}

function Site() {
  const { cart, wishlist } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return <>
    <div className="topbar"><Gift size={15} /> Free Shipping on Orders over PKR 10,000</div>
    <header className="header">
      <div className="header-inner">
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}><Menu /></button>
        <Link to="/" className="brand"><span className="brand-mark">◇</span><span><b>Crafto.</b><small>Create. Inspire. Craft.</small></span></Link>
        <div className="searchbar">
          <button className="category-select">All Categories <ChevronDown size={15} /></button>
          <input onFocus={() => setSearchOpen(true)} placeholder="Search for molds, resin, tools..." />
          <button onClick={() => setSearchOpen(true)} className="search-btn"><Search size={21} /></button>
        </div>
        <div className="head-actions">
          <Link to="/account" className="head-action"><UserRound /><span>Login / Signup</span></Link>
          <Link to="/wishlist" className="icon-action"><Heart /><i>{wishlist.length}</i><span>Wishlist</span></Link>
          <Link to="/cart" className="icon-action"><ShoppingBag /><i>{cart.reduce((a, x) => a + x.qty, 0)}</i><span>Cart</span></Link>
        </div>
      </div>
      <nav className={`nav ${mobileOpen ? "open" : ""}`}>
        <Link className="active" to="/">Home</Link>
        <Link to="/shop">Shop <ChevronDown size={13} /></Link>
        <Link to="/category/Silicone Molds">Molds <ChevronDown size={13} /></Link>
        <Link to="/category/Epoxy Resin">Resin <ChevronDown size={13} /></Link>
        <Link to="/category/Tools & Accessories">Tools & Accessories <ChevronDown size={13} /></Link>
        <Link to="/category/Resin Kits">Kits <ChevronDown size={13} /></Link>
        <Link to="/shop?new=true">New Arrivals</Link>
        <Link to="/shop?sale=true">Sale <b className="hot">Hot</b></Link>
        <Link to="/deal" className="deal-link"><Sparkles size={14} /> Make Your Own Deal</Link>
        <a href="#ideas">Blogs</a><a href="#footer">Contact Us</a>
      </nav>
    </header>
    <SearchOverlay open={searchOpen} close={() => setSearchOpen(false)} />
  </>
}

function SearchOverlay({ open, close }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase())).slice(0, 6);
  return <AnimatePresence>{open && <motion.div className="search-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.div className="search-panel" initial={{ y: -30 }} animate={{ y: 0 }} exit={{ y: -30 }}>
      <div className="search-head"><h3>Search Crafto</h3><button onClick={close}><X /></button></div>
      <div className="big-search"><Search /><input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Try “epoxy resin” or “molds”" /></div>
      <div className="search-suggestions">
        <span>Popular:</span><button onClick={() => setQ("resin")}>resin</button><button onClick={() => setQ("mold")}>molds</button><button onClick={() => setQ("pigment")}>pigments</button>
      </div>
      <div className="search-results">{matches.map(p => <button key={p.id} onClick={() => { close(); navigate(`/product/${p.id}`) }}><img src={p.image} /><span><b>{p.name}</b><small>{p.category}</small></span><strong>{money(p.price)}</strong></button>)}</div>
    </motion.div>
  </motion.div>}</AnimatePresence>
}

function Hero() {
  const [slide, setSlide] = useState(0);
  const slides = [
    { title: "Premium Resin", accent: "Art Supplies", desc: "High quality resin, molds, tools & accessories for your creative projects.", image: "https://images.unsplash.com/photo-1593487568720-92097fb8a3f7?auto=format&fit=crop&w=1600&q=90" },
    { title: "Create Something", accent: "Beautiful Today", desc: "Everything you need for jewelry, coasters, trays and premium resin art.", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=90" },
    { title: "Your Ideas,", accent: "Our Materials", desc: "Discover creator-loved supplies with fast delivery across Pakistan.", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1600&q=90" }
  ];
  const s = slides[slide];
  return <section className="hero">
    <img className="hero-image" src={s.image} />
    <div className="hero-overlay" />
    <button className="hero-arrow left" onClick={() => setSlide((slide + slides.length - 1) % slides.length)}><ArrowLeft /></button>
    <div className="hero-content">
      <span className="eyebrow">CREATE YOUR IMAGINATION</span>
      <h1>{s.title}<br /><em>{s.accent}</em></h1>
      <p>{s.desc}</p>
      <div className="hero-buttons"><Link to="/shop" className="btn primary">Shop Now <ArrowRight /></Link><button className="btn secondary"><span className="play">▶</span> Watch Video</button></div>
    </div>
    <button className="hero-arrow right" onClick={() => setSlide((slide + 1) % slides.length)}><ArrowRight /></button>
    <div className="dots">{slides.map((_, i) => <button key={i} className={i === slide ? "on" : ""} onClick={() => setSlide(i)} />)}</div>
  </section>
}

function Benefits() {
  return <section className="benefits">
    <Benefit icon={<Sparkles />} title="Premium Quality" text="Best materials for best creations" />
    <Benefit icon={<Truck />} title="Fast Delivery" text="Nationwide delivery in Pakistan" />
    <Benefit icon={<ShieldCheck />} title="Secure Payment" text="100% secure & safe checkout" />
    <Benefit icon={<Headphones />} title="Customer Support" text="We're here to help you" />
  </section>
}
function Benefit({ icon, title, text }) { return <div className="benefit"><span>{icon}</span><div><b>{title}</b><small>{text}</small></div></div> }

function CategoryStrip() {
  return <section className="section"><div className="section-head"><h2>Shop by Category</h2><Link to="/shop">View All Categories <ArrowRight /></Link></div>
    <div className="category-row">{CATEGORIES.map(([name, short, img]) => <Link className="category-card" key={name} to={`/category/${name}`}><img src={img} /><b>{name}</b></Link>)}</div>
  </section>
}

function ProductCard({ p }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const saved = wishlist.some(x => x.id === p.id);
  return <motion.article className="product-card" whileHover={{ y: -5 }}>
    <div className="product-image">
      {p.discount > 0 && <span className="discount">-{p.discount}%</span>}
      <button className={`wish ${saved ? "saved" : ""}`} onClick={() => toggleWishlist(p)}><Heart fill={saved ? "currentColor" : "none"} /></button>
      <Link to={`/product/${p.id}`}><img src={p.image} /></Link>
      <button className="quick-add" onClick={() => addToCart(p)}>Quick Add <ShoppingBag size={15} /></button>
    </div>
    <div className="product-info"><small>{p.category}</small><Link to={`/product/${p.id}`}><h3>{p.name}</h3></Link><div className="price">{money(p.price)} {p.oldPrice && <del>{money(p.oldPrice)}</del>}</div><div className="rating"><Star fill="currentColor" />{p.rating} <span>({p.reviews})</span></div></div>
  </motion.article>
}

function ProductGrid({ products = PRODUCTS.slice(0, 6) }) { return <div className="product-grid">{products.map(p => <ProductCard p={p} key={p.id} />)}</div> }

function PromoBanners() {
  return <section className="promo-grid" id="ideas">
    <Promo title="New Arrivals" text="Check out our latest" button="Explore Now" img="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85" />
    <Promo title="DIY Resin Ideas" text="Get inspired with creative projects" button="Explore Now" img="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85" />
    <Promo title="Exclusive Kits" text="Everything you need in one place" button="Shop Now" img="https://images.unsplash.com/photo-1593487568720-92097fb8a3f7?auto=format&fit=crop&w=900&q=85" />
  </section>
}
function Promo({ title, text, button, img }) { return <div className="promo"><div><h3>{title}</h3><p>{text}</p><Link to="/shop" className="mini-btn">{button} <ArrowRight /></Link></div><img src={img} /></div> }

function Home() {
  return <><main className="page home"><Hero /><Benefits /><CategoryStrip />
    <section className="section"><div className="section-head"><h2>Bestsellers</h2><Link to="/shop">View All Products <ArrowRight /></Link></div><ProductGrid /></section>
    <PromoBanners />
    <Newsletter />
  </main><Footer /></>
}

function Newsletter() { return <section className="newsletter"><div><span className="eyebrow">CRAFT INSIDER</span><h2>Get inspired. Stay creative.</h2><p>New arrivals, exclusive deals and resin ideas — straight to your inbox.</p></div><div className="newsletter-form"><input placeholder="Enter your email address" /><button className="btn primary">Subscribe</button></div></section> }

function Shop() {
  const { category } = useParams(); const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [sort, setSort] = useState("featured"); const [query, setQuery] = useState(""); const [mobileFilters, setMobileFilters] = useState(false);
  let products = PRODUCTS.filter(p => !category || p.category === category);
  if (params.get("sale")) products = products.filter(p => p.discount > 0);
  if (params.get("new")) products = PRODUCTS.slice(6).filter(p => !category || p.category === category);
  if (query) products = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  if (sort === "low") products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "high") products = [...products].sort((a, b) => b.price - a.price);
  if (sort === "rating") products = [...products].sort((a, b) => b.rating - a.rating);
  return <><main className="page shop-page">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><b>{category || "Shop All"}</b></div>
    <div className="shop-title"><div><span className="eyebrow">CRAFT COLLECTION</span><h1>{category || "Shop All Products"}</h1><p>Premium supplies selected for makers, artists and resin creators.</p></div><button className="filter-mobile" onClick={() => setMobileFilters(!mobileFilters)}><SlidersHorizontal /> Filters</button></div>
    <div className="shop-layout">
      <aside className={`filters ${mobileFilters ? "show" : ""}`}><div className="filter-head"><b>Filters</b><button onClick={() => setMobileFilters(false)}><X /></button></div><Filter title="Categories">{CATEGORIES.map(([n]) => <label key={n}><input type="checkbox" checked={category === n} readOnly onClick={() => location.pathname !== `/category/${n}`} /><span>{n}</span></label>)}</Filter><Filter title="Price Range"><div className="range-values"><span>PKR 500</span><span>PKR 8,000</span></div><input type="range" min="500" max="8000" defaultValue="5000" /></Filter><Filter title="Rating">{[4, 3, 2].map(n => <label key={n}><input type="checkbox" /><span className="stars">{"★".repeat(n)}{"☆".repeat(5 - n)}</span> & up</label>)}</Filter><Filter title="Availability"><label><input type="checkbox" /><span>In stock</span></label><label><input type="checkbox" /><span>On sale</span></label></Filter></aside>
      <div className="shop-results"><div className="result-toolbar"><span><b>{products.length}</b> products</span><div className="toolbar-search"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products" /></div><select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Sort: Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="rating">Top Rated</option></select></div>{products.length ? <ProductGrid products={products} /> : <Empty title="No products found" text="Try another search or category." />}</div>
    </div>
  </main><Footer /></>
}
function Filter({ title, children }) { return <div className="filter"><h3>{title}</h3>{children}</div> }

function DealBuilder() {
  const { addToCart, notify } = useStore();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const selected = PRODUCTS.filter(p => quantities[p.id] > 0);
  const total = selected.reduce((sum, p) => sum + p.price * quantities[p.id], 0);
  const valid = total >= 1000 && total <= 20000;
  const update = (id, delta) => setQuantities(current => ({ ...current, [id]: Math.max(0, (current[id] || 0) + delta) }));
  const buyDeal = () => {
    if (!valid) return;
    selected.forEach(p => addToCart(p, quantities[p.id]));
    notify("Your custom deal is ready for checkout");
    navigate("/checkout");
  };
  return <><main className="page deal-page">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><b>Make Your Own Deal</b></div>
    <div className="deal-hero"><div><span className="eyebrow">BUILD YOUR CRAFT BOX</span><h1>Make Your Own Deal</h1><p>Pick the supplies you love and create a custom order between PKR 1,000 and PKR 20,000.</p></div><div className="deal-range"><span>Deal range</span><strong>PKR 1,000 - 20,000</strong></div></div>
    <div className="deal-layout"><section><div className="deal-section-head"><div><span className="eyebrow">STEP 1</span><h2>Choose your products</h2></div><span>{selected.length} selected</span></div><div className="deal-products">{PRODUCTS.map(p => <article className={`deal-product ${quantities[p.id] ? "chosen" : ""}`} key={p.id}><img src={p.image} /><div className="deal-product-copy"><small>{p.category}</small><h3>{p.name}</h3><strong>{money(p.price)}</strong></div><div className="deal-qty"><button aria-label={`Remove one ${p.name}`} onClick={() => update(p.id, -1)} disabled={!quantities[p.id]}><Minus size={15} /></button><b>{quantities[p.id] || 0}</b><button aria-label={`Add one ${p.name}`} onClick={() => update(p.id, 1)}><Plus size={15} /></button></div></article>)}</div></section><aside className="deal-summary"><span className="eyebrow">STEP 2</span><h2>Your custom deal</h2><div className="deal-total"><small>Current total</small><strong>{money(total)}</strong></div><div className="deal-meter"><span style={{ width: `${Math.min(100, Math.max(4, total / 200))}%` }} /></div><p className={valid ? "valid" : ""}>{total < 1000 ? `Add ${money(1000 - total)} more to unlock checkout.` : total > 20000 ? `Remove ${money(total - 20000)} to stay within the deal limit.` : "Your deal is ready to buy."}</p>{selected.length > 0 && <div className="deal-selected">{selected.map(p => <div key={p.id}><span>{quantities[p.id]} x {p.name}</span><b>{money(p.price * quantities[p.id])}</b></div>)}</div>}<button className="btn primary deal-buy" disabled={!valid} onClick={buyDeal}>Buy This Deal <ShoppingBag /></button><Link className="deal-back" to="/shop">Browse all products <ArrowRight size={15} /></Link></aside></div>
  </main><Footer /></>
}

function Product() {
  const { id } = useParams(); const p = PRODUCTS.find(x => x.id === Number(id)) || PRODUCTS[0]; const { addToCart, toggleWishlist, wishlist } = useStore(); const [qty, setQty] = useState(1); const [tab, setTab] = useState("description");
  return <><main className="page product-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/shop">{p.category}</Link><span>/</span><b>{p.name}</b></div>
    <div className="product-detail"><div className="gallery"><div className="main-product-img"><span className="discount">{p.discount ? `-${p.discount}%` : "New"}</span><img src={p.image} /></div><div className="thumbs"><img src={p.image} /><img src={p.image} /><img src={p.image} /></div></div>
      <div className="detail-copy"><span className="eyebrow">{p.category}</span><h1>{p.name}</h1><div className="detail-rating"><Star fill="currentColor" /><b>{p.rating}</b><span>{p.reviews} reviews</span><span className="stock"><Check size={14} /> In stock</span></div><div className="detail-price">{money(p.price)} {p.oldPrice && <del>{money(p.oldPrice)}</del>} {p.discount > 0 && <span>Save {p.discount}%</span>}</div><p>{p.desc}</p><div className="detail-divider" /><div className="qty-row"><div className="qty"><button onClick={() => setQty(Math.max(1, qty - 1))}><Minus /></button><b>{qty}</b><button onClick={() => setQty(qty + 1)}><Plus /></button></div><button className="btn primary add-cart" onClick={() => addToCart(p, qty)}>Add to Cart <ShoppingBag /></button><button className={`round-btn ${wishlist.some(x => x.id === p.id) ? "saved" : ""}`} onClick={() => toggleWishlist(p)}><Heart fill={wishlist.some(x => x.id === p.id) ? "currentColor" : "none"} /></button></div><div className="shipping-note"><Truck /><span><b>Free delivery</b> on orders over PKR 10,000<br /><small>Estimated delivery: 2–4 working days</small></span></div></div></div>
    <div className="product-tabs"><div className="tab-buttons">{["description", "shipping", "reviews"].map(t => <button className={tab === t ? "active" : ""} onClick={() => setTab(t)} key={t}>{t}</button>)}</div><div className="tab-content">{tab === "description" && <><h2>Made for your next great idea</h2><p>{p.desc} Our products are selected for consistent results, clean finishes and easy creative workflows.</p><ul><li>Premium creator-grade material</li><li>Carefully packed for safe delivery</li><li>Beginner friendly and professional ready</li></ul></>}{tab === "shipping" && <><h2>Delivery & Returns</h2><p>Nationwide delivery is available. Orders above PKR 10,000 qualify for free shipping. Returns are accepted for unused products within 7 days.</p></>}{tab === "reviews" && <><h2>Customer Reviews</h2><div className="review-summary"><strong>{p.rating}</strong><span>★★★★★</span><p>Based on {p.reviews} verified reviews</p></div></>}</div></div>
  </main><Footer /></>
}

function CartPage() {
  const { cart, subtotal, shipping, updateQty, removeFromCart } = useStore();
  return <><main className="page cart-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><b>Shopping Cart</b></div><div className="cart-heading"><div><span className="eyebrow">YOUR BAG</span><h1>Shopping Cart</h1></div><span>{cart.reduce((a, x) => a + x.qty, 0)} items</span></div>{cart.length ? <div className="cart-layout"><div className="cart-items">{cart.map(({ product, qty }) => <div className="cart-item" key={product.id}><img src={product.image} /><div className="cart-item-copy"><Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link><small>{product.category}</small><div className="cart-mobile-price">{money(product.price)}</div></div><div className="qty"><button onClick={() => updateQty(product.id, -1)}><Minus /></button><b>{qty}</b><button onClick={() => updateQty(product.id, 1)}><Plus /></button></div><strong>{money(product.price * qty)}</strong><button className="remove" onClick={() => removeFromCart(product.id)}><Trash2 /></button></div>)}<div className="continue"><Link to="/shop"><ArrowLeft /> Continue Shopping</Link><span><Tag /> Use code <b>CRAFT10</b> for 10% off</span></div></div><OrderSummary /></div> : <Empty title="Your cart is empty" text="Find something beautiful for your next project." button="Start Shopping" />}</main><Footer /></>
}
function OrderSummary() { const { subtotal, shipping } = useStore(); return <aside className="order-summary"><h2>Order Summary</h2><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Shipping</span><b>{shipping ? money(shipping) : "FREE"}</b></div><div className="coupon"><input placeholder="Promo code" /><button>Apply</button></div><div className="total"><span>Total</span><strong>{money(subtotal + shipping)}</strong></div><Link to="/checkout" className="btn primary checkout-btn">Proceed to Checkout <ArrowRight /></Link><small className="secure"><ShieldCheck /> Secure checkout • SSL protected</small></aside> }

function WishlistPage() { const { wishlist, addToCart, toggleWishlist } = useStore(); return <><main className="page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><b>Wishlist</b></div><div className="page-heading"><div><span className="eyebrow">SAVED FOR LATER</span><h1>My Wishlist</h1><p>Keep your favorite Crafto finds close.</p></div><Heart className="heading-icon" /></div>{wishlist.length ? <div className="wishlist-grid">{wishlist.map(p => <div className="wish-card" key={p.id}><button onClick={() => toggleWishlist(p)}><X /></button><img src={p.image} /><span>{p.category}</span><h3>{p.name}</h3><strong>{money(p.price)}</strong><button className="btn primary" onClick={() => addToCart(p)}>Add to Cart <ShoppingBag /></button></div>)}</div> : <Empty title="Your wishlist is empty" text="Tap the heart on any product to save it here." button="Explore Products" />}</main><Footer /></> }

function Checkout() { const { subtotal, shipping } = useStore(); const [done, setDone] = useState(false); if (done) return <main className="page success-page"><div className="success-icon"><Check /></div><span className="eyebrow">ORDER CONFIRMED</span><h1>Thank you for your order!</h1><p>Your Crafto order <b>#CR-2101</b> has been placed successfully. We’ll email your tracking details soon.</p><Link className="btn primary" to="/orders">View My Orders <ArrowRight /></Link></main>; return <main className="page checkout-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><b>Checkout</b></div><h1>Secure Checkout</h1><div className="checkout-layout"><div className="checkout-form"><div className="checkout-card"><h2>Contact Information</h2><div className="form-grid"><input placeholder="First name" /><input placeholder="Last name" /><input className="full" placeholder="Email address" /><input className="full" placeholder="Phone number" /></div></div><div className="checkout-card"><h2><MapPin /> Shipping Address</h2><div className="form-grid"><input className="full" placeholder="Street address" /><input placeholder="City" /><input placeholder="Postal code" /><select className="full"><option>Pakistan</option></select></div></div><div className="checkout-card"><h2><CreditCard /> Payment</h2><label className="pay-option"><input type="radio" checked readOnly /> Cash on Delivery <span>COD</span></label><label className="pay-option"><input type="radio" readOnly /> Card / Bank Transfer <span>Secure</span></label></div></div><aside className="order-summary"><h2>Your Order</h2><div className="checkout-mini"><span>Crafto essentials</span><b>{money(subtotal)}</b></div><div><span>Shipping</span><b>{shipping ? "PKR 250" : "FREE"}</b></div><div className="total"><span>Total</span><strong>{money(subtotal + shipping)}</strong></div><button className="btn primary checkout-btn" onClick={() => setDone(true)}>Place Order <Check /></button></aside></div></main> }

function Account() { const { user } = useStore(); return <><main className="page account-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><b>My Account</b></div><div className="account-layout"><aside className="account-side"><div className="avatar">HK</div><h2>{user.name}</h2><p>{user.email}</p><Link to="/account" className="active"><UserRound /> My Account</Link><Link to="/orders"><Package /> Order History</Link><Link to="/wishlist"><Heart /> Wishlist</Link><button><LogOut /> Sign Out</button></aside><section className="account-main"><span className="eyebrow">WELCOME BACK</span><h1>Hello, {user.name.split(" ")[0]}!</h1><div className="dashboard-cards"><Dash icon={<Package />} title="Orders" value="3" link="/orders" /><Dash icon={<Heart />} title="Wishlist" value="2" link="/wishlist" /><Dash icon={<Tag />} title="Rewards" value="1,250 pts" link="/account" /></div><div className="account-panel"><h2>Recent Order</h2><div className="recent-order"><div><b>#CR-2101</b><span>Aug 21, 2026 • 3 items</span></div><span className="status">Shipped</span><strong>PKR 9,800</strong><Link to="/orders">View</Link></div></div></section></div></main><Footer /></> }
function Dash({ icon, title, value, link }) { return <Link className="dash-card" to={link}>{icon}<span>{title}</span><strong>{value}</strong><ArrowRight /></Link> }
function Orders() { return <main className="page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><b>Orders</b></div><div className="page-heading"><div><span className="eyebrow">MY CRAFT JOURNEY</span><h1>Order History</h1></div><Package className="heading-icon" /></div><div className="orders-list">{["#CR-2101", "#CR-2034", "#CR-1887"].map((o, i) => <div className="order-row" key={o}><div><b>{o}</b><span>{["Aug 21, 2026", "Jul 16, 2026", "Jun 08, 2026"][i]}</span></div><div><span className={`status ${i === 0 ? "green" : ""}`}>{i === 0 ? "Shipped" : i === 1 ? "Delivered" : "Delivered"}</span><span>{i + 2} items</span></div><strong>{money([9800, 5600, 3200][i])}</strong><Link to="/product/2"><Eye /> Details</Link></div>)}</div></main> }

function Empty({ title, text, button }) { return <div className="empty"><div><ShoppingBag /></div><h2>{title}</h2><p>{text}</p>{button && <Link to="/shop" className="btn primary">{button} <ArrowRight /></Link>}</div> }
function NotFound() { return <main className="page success-page"><span className="eyebrow">404</span><h1>That page wandered off.</h1><p>Let's get you back to something creative.</p><Link to="/" className="btn primary">Back Home <ArrowRight /></Link></main> }

function Footer() { return <footer id="footer"><div className="footer-main"><div className="footer-brand"><Link to="/" className="brand"><span className="brand-mark">◇</span><span><b>Crafto.</b><small>Create. Inspire. Craft.</small></span></Link><p>Premium resin art supplies for makers who love to create something beautiful.</p><div className="socials"><span>f</span><span>◎</span><span>p</span><span>in</span></div></div><div><h4>Shop</h4><Link to="/category/Silicone Molds">Silicone Molds</Link><Link to="/category/Epoxy Resin">Epoxy Resin</Link><Link to="/category/Pigments & Dyes">Pigments & Dyes</Link><Link to="/category/Resin Kits">Resin Kits</Link></div><div><h4>Customer Care</h4><a href="#footer">Contact Us</a><a href="#footer">Shipping & Delivery</a><a href="#footer">Returns & Refunds</a><a href="#footer">FAQs</a></div><div><h4>Need Help?</h4><p className="contact-line"><Headphones /> +92 300 1234567</p><p className="contact-line"><Clock3 /> Mon–Sat, 9am–7pm</p><p className="contact-line"><Bell /> support@crafto.pk</p></div></div><div className="footer-bottom"><span>© 2026 Crafto. All rights reserved.</span><span>Secure payments • Privacy • Terms</span></div></footer> }

ReactDOM.createRoot(document.getElementById("root")).render(<BrowserRouter><App /></BrowserRouter>);
