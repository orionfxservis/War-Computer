import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Layers, 
  BarChart3, 
  Truck, 
  FileText, 
  Sparkles, 
  Menu, 
  X, 
  Laptop, 
  Monitor, 
  Tablet, 
  PackageCheck, 
  Building2, 
  ShieldCheck,
  Flame,
  ArrowRight
} from 'lucide-react';
import { ProductCategory, PricingMode, Product } from '../types';
import { formatPrice } from '../utils/formatCurrency';

interface NavbarProps {
  pricingMode: PricingMode;
  onTogglePricingMode: (mode: PricingMode) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  comparisonCount?: number;
  onOpenComparison?: () => void;
  onOpenAnalytics: () => void;
  onOpenTracking: () => void;
  onOpenRFQ: () => void;
  onOpenAiSupport?: () => void;
  onOpenAiAdvisor?: () => void;
  onOpenAdmin?: () => void;
  onScrollToManageProducts?: () => void;
  allProducts?: Product[];
  onSelectProduct?: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  pricingMode,
  onTogglePricingMode,
  selectedCategory,
  onSelectCategory,
  searchQuery = '',
  onSearchChange = (_query: string) => {},
  cartCount = 0,
  onOpenCart,
  comparisonCount = 0,
  onOpenComparison = () => {},
  onOpenAnalytics,
  onOpenTracking,
  onOpenRFQ,
  onOpenAiSupport,
  onOpenAiAdvisor,
  onOpenAdmin,
  onScrollToManageProducts,
  allProducts = [],
  onSelectProduct = (_product: Product) => {}
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const safeQuery = (searchQuery || '').trim();
  const searchResults = safeQuery
    ? allProducts.filter(p => 
        (p.name && p.name.toLowerCase().includes(safeQuery.toLowerCase())) ||
        (p.specs?.cpu && p.specs.cpu.toLowerCase().includes(safeQuery.toLowerCase())) ||
        (p.specs?.gpu && p.specs.gpu.toLowerCase().includes(safeQuery.toLowerCase())) ||
        (p.brand && p.brand.toLowerCase().includes(safeQuery.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(safeQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const categories: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Catalog', icon: <Layers className="w-4 h-4" /> },
    { id: 'desktops', label: 'Desktops & Gaming', icon: <Monitor className="w-4 h-4" /> },
    { id: 'laptops', label: 'Laptops & ThinkPads', icon: <Laptop className="w-4 h-4" /> },
    { id: 'chromebooks', label: 'Chromebooks', icon: <Laptop className="w-4 h-4 text-orange-400" /> },
    { id: 'tablets', label: 'Tablets & 2-in-1', icon: <Tablet className="w-4 h-4" /> },
    { id: 'workstations', label: 'AI Workstations', icon: <Flame className="w-4 h-4 text-orange-500" /> },
    { id: 'wholesale_lots', label: 'Bulk Pallets (B2B)', icon: <PackageCheck className="w-4 h-4 text-amber-400" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/75 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all">
      {/* Top Notification & Wholesale Announcement Bar */}
      <div className="bg-gradient-to-r from-orange-600/90 via-amber-600/90 to-orange-700/90 backdrop-blur-md text-white text-xs font-medium py-1.5 px-4 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-black/30 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 border border-white/10">
              <ShieldCheck className="w-3 h-3 text-orange-200" /> Authorized OEM Distributor
            </span>
            <span className="hidden sm:inline">
              Wholesale Bulk Discount: Up to <strong>40% OFF</strong> Pallet Lots & Education Fleets • Free Insured Freight
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button 
              id="nav-manage-products-top-btn"
              onClick={() => {
                if (onOpenAdmin) onOpenAdmin();
                else if (onScrollToManageProducts) onScrollToManageProducts();
              }} 
              className="bg-orange-950/70 hover:bg-orange-900 text-orange-200 hover:text-white px-3 py-0.5 rounded-full border border-orange-500/40 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm font-semibold"
              title="Open Separate Admin Portal (/admin.html)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>Admin Portal</span>
              <span className="text-[10px] text-orange-300 font-mono opacity-80 hidden md:inline">(/admin.html)</span>
            </button>
            <span className="opacity-40">|</span>
            <button 
              id="nav-track-order-top-btn"
              onClick={onOpenTracking} 
              className="hover:text-orange-100 flex items-center gap-1 transition-colors underline-offset-2 hover:underline cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5" /> Track Order
            </button>
            <span className="opacity-40">|</span>
            <button 
              id="nav-analytics-top-btn"
              onClick={onOpenAnalytics} 
              className="hover:text-orange-100 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5" /> Sales & Inventory Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo with WAR COMPUTERS branding in custom orange/slate industrial styling */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { onSelectCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
              id="brand-logo-btn"
            >
              {/* Glowing Icon Badge */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 p-0.5 shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all flex items-center justify-center">
                <div className="w-full h-full bg-slate-950/90 backdrop-blur-md rounded-[10px] flex items-center justify-center border border-white/10">
                  <span className="font-brand font-black text-xl text-orange-500 tracking-tighter group-hover:scale-105 transition-transform">
                    W
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="font-brand font-black text-2xl tracking-wider text-orange-500 leading-none group-hover:text-orange-400 transition-colors uppercase drop-shadow-[0_2px_10px_rgba(249,115,22,0.3)]">
                  WAR <span className="text-white">COMPUTER</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase">
                  Wholesale & Retail Direct
                </span>
              </div>
            </button>
          </div>

          {/* Global Search Bar with Live Suggestions */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 text-orange-500" />
              </div>
              <input
                id="global-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder="Search RTX 4090, ThinkPad, Chromebooks, Bulk lots, M4 iPad..."
                className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl pl-10 pr-10 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-orange-500/70 focus:bg-slate-900/80 focus:ring-2 focus:ring-orange-500/20 shadow-inner transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/90 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800/80">
                <div className="p-2 text-xs font-semibold text-slate-400 bg-slate-950/80 backdrop-blur-md uppercase tracking-wider flex justify-between">
                  <span>Matching Hardware</span>
                  <span>{searchResults.length} results</span>
                </div>
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onMouseDown={() => {
                      onSelectProduct(product);
                      onSearchChange('');
                    }}
                    className="w-full p-2.5 text-left hover:bg-slate-800/80 flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg bg-slate-950 border border-slate-800"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-100 truncate">{product.name}</p>
                      <p className="text-xs text-slate-400 truncate">{product.specs.cpu} • {product.specs.gpu}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-orange-400">
                        {formatPrice(pricingMode === 'wholesale' ? product.wholesalePrice : product.retailPrice)}
                      </p>
                      <span className="text-[10px] text-slate-500 uppercase">{pricingMode === 'wholesale' ? `MOQ ${product.wholesaleMOQ}+` : 'Retail'}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing Switcher + Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Wholesale vs. Retail Mode Switcher */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-1 rounded-xl flex items-center shadow-inner">
              <button
                id="toggle-retail-mode-btn"
                onClick={() => onTogglePricingMode('retail')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  pricingMode === 'retail'
                    ? 'bg-slate-800/90 text-white shadow-sm border border-white/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Retail
              </button>
              <button
                id="toggle-wholesale-mode-btn"
                onClick={() => onTogglePricingMode('wholesale')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  pricingMode === 'wholesale'
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30 border border-orange-400/40'
                    : 'text-orange-400 hover:text-orange-300'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Wholesale B2B
                <span className="bg-black/30 text-[9px] px-1 py-0.2 rounded text-orange-200">Save 35%</span>
              </button>
            </div>

            {/* B2B Quote Button */}
            <button
              id="nav-b2b-quote-btn"
              onClick={onOpenRFQ}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-xl border border-orange-500/40 text-orange-400 hover:text-orange-300 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              Request Bulk RFQ
            </button>

            {/* AI Advisor Button in Nav */}
            <button
              id="nav-ai-advisor-btn"
              onClick={() => (onOpenAiSupport || onOpenAiAdvisor)?.()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-orange-500/15 hover:bg-orange-500/25 backdrop-blur-xl border border-orange-500/40 text-orange-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>AI Advisor</span>
            </button>

            {/* Admin & Manage Products Quick Nav Button */}
            <button
              id="nav-manage-products-btn"
              onClick={() => {
                if (onScrollToManageProducts) onScrollToManageProducts();
                else if (onOpenAdmin) onOpenAdmin();
              }}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-xl border border-orange-500/30 hover:border-orange-500 text-orange-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title="Manage Products Table & Editor"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>Manage Products</span>
            </button>

            {/* Compare Drawer Trigger */}
            {comparisonCount > 0 && (
              <button
                id="nav-compare-trigger-btn"
                onClick={onOpenComparison}
                className="relative p-2.5 bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-xl border border-white/10 text-slate-200 rounded-xl transition-all cursor-pointer shadow-sm"
                title="Compare Selected Products"
              >
                <Layers className="w-4 h-4 text-orange-400" />
                <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {comparisonCount}
                </span>
              </button>
            )}

            {/* Cart Button */}
            <button
              id="nav-cart-trigger-btn"
              onClick={onOpenCart}
              className="relative p-2.5 bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-xl border border-white/10 hover:border-orange-500/50 text-slate-100 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <ShoppingCart className="w-4 h-4 text-orange-400" />
              <span className="hidden sm:inline text-xs font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-[11px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-lg shadow-orange-500/30">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900/70 backdrop-blur-md border border-white/10 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Field */}
        <div className="md:hidden mt-3">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4 text-orange-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search laptops, desktops, bulk lots..."
              className="w-full bg-slate-900/70 backdrop-blur-md border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <nav className="bg-slate-950/60 backdrop-blur-xl border-t border-white/5 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 py-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-nav-${cat.id}-btn`}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('product-catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            );
          })}

          <div className="h-4 w-px bg-white/10 mx-1 flex-shrink-0" />

          {/* Direct Jump to Shop By Budget */}
          <button
            id="nav-jump-shop-by-budget-btn"
            onClick={() => {
              const el = document.getElementById('shop-by-budget');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 hover:text-white border border-orange-500/40 hover:border-orange-400 transition-all cursor-pointer shadow-sm ml-auto"
          >
            <span>💰 Shop By Budget</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-3">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => { 
                if (onOpenAdmin) onOpenAdmin();
                else if (onScrollToManageProducts) onScrollToManageProducts();
                setMobileMenuOpen(false); 
              }}
              className="flex items-center justify-between p-3 bg-orange-950/40 rounded-xl text-orange-300 font-semibold text-sm border border-orange-500/30"
            >
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-400" /> Admin Portal (/admin.html)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => { onOpenRFQ(); setMobileMenuOpen(false); }}
              className="flex items-center justify-between p-3 bg-slate-900 rounded-xl text-orange-400 font-semibold text-sm border border-slate-800"
            >
              <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Request Wholesale Bulk RFQ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => { onOpenAiSupport(); setMobileMenuOpen(false); }}
              className="flex items-center justify-between p-3 bg-slate-900 rounded-xl text-orange-300 font-semibold text-sm border border-slate-800"
            >
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> AI Tech Hardware Advisor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => { onOpenAnalytics(); setMobileMenuOpen(false); }}
              className="flex items-center justify-between p-3 bg-slate-900 rounded-xl text-slate-200 font-semibold text-sm border border-slate-800"
            >
              <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Sales Trends & Inventory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => { onOpenTracking(); setMobileMenuOpen(false); }}
              className="flex items-center justify-between p-3 bg-slate-900 rounded-xl text-slate-200 font-semibold text-sm border border-slate-800"
            >
              <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Track Active Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
