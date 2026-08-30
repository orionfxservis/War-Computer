import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  Search, 
  Check, 
  Sparkles, 
  Laptop, 
  Monitor, 
  Tablet, 
  PackageCheck,
  Building2
} from 'lucide-react';
import { Product, ProductCategory, PricingMode, FilterState } from '../types';
import { ProductCard } from './ProductCard';
import { formatPrice } from '../utils/formatCurrency';

interface ProductGridProps {
  products: Product[];
  pricingMode: PricingMode;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, isWholesale: boolean) => void;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
  onOpenRFQ: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  pricingMode,
  selectedCategory,
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  onQuickView,
  onAddToCart,
  comparedProducts,
  onToggleCompare,
  onOpenRFQ
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const brands = ['all', 'Apple', 'ASUS', 'Dell', 'HP', 'Lenovo', 'Acer', 'Custom Rig'];
  const conditions = ['all', 'Brand New', 'Factory Certified'];

  const safeQuery = (searchQuery || '').trim().toLowerCase();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query filter
        if (safeQuery) {
          const matchName = p.name && p.name.toLowerCase().includes(safeQuery);
          const matchBrand = p.brand && p.brand.toLowerCase().includes(safeQuery);
          const matchCpu = p.specs?.cpu && p.specs.cpu.toLowerCase().includes(safeQuery);
          const matchGpu = p.specs?.gpu && p.specs.gpu.toLowerCase().includes(safeQuery);
          const matchDesc = p.description && p.description.toLowerCase().includes(safeQuery);
          if (!matchName && !matchBrand && !matchCpu && !matchGpu && !matchDesc) {
            return false;
          }
        }
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        // Brand filter
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
        // Condition filter
        if (selectedCondition !== 'all' && p.condition !== selectedCondition) return false;
        // In stock only
        if (inStockOnly && p.stockQuantity <= 0) return false;
        // Price filter
        const price = pricingMode === 'wholesale' ? p.wholesalePrice : p.retailPrice;
        if (price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = pricingMode === 'wholesale' ? a.wholesalePrice : a.retailPrice;
        const priceB = pricingMode === 'wholesale' ? b.wholesalePrice : b.retailPrice;

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        // featured default
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, safeQuery, selectedCategory, selectedBrand, selectedCondition, inStockOnly, maxPrice, sortBy, pricingMode]);

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) + 
    (selectedBrand !== 'all' ? 1 : 0) + 
    (selectedCondition !== 'all' ? 1 : 0) + 
    (inStockOnly ? 1 : 0) + 
    (maxPrice < 15000 ? 1 : 0);

  const handleResetFilters = () => {
    onSelectCategory('all');
    setSelectedBrand('all');
    setSelectedCondition('all');
    setInStockOnly(false);
    setMaxPrice(15000);
    setSortBy('featured');
  };

  return (
    <section id="product-catalog-section" className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316] animate-pulse" />
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest font-mono">
                WAR COMPUTERS CERTIFIED INVENTORY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mt-1">
              {selectedCategory === 'all' ? 'Hardware & System Catalog' : `${selectedCategory.replace('_', ' ')} Collection`}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Showing {filteredProducts.length} high-spec configurations • Mode: <strong className="text-orange-400 capitalize">{pricingMode}</strong>
            </p>
          </div>

          {/* Quick Sort & Mobile Filter Trigger */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-filters-trigger-btn"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-white/10 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Filter className="w-4 h-4 text-orange-400" />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 shadow-sm">
              <span className="text-slate-400 font-semibold">Sort:</span>
              <select
                id="sort-by-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-100 font-bold focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-slate-900">Featured First</option>
                <option value="price-low" className="bg-slate-900">Price: Low to High</option>
                <option value="price-high" className="bg-slate-900">Price: High to Low</option>
                <option value="rating" className="bg-slate-900">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          {/* Left Sidebar Filter Column (Desktop) */}
          <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 space-y-6 shadow-2xl sticky top-32">
              
              {/* Filter Title & Reset */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <SlidersHorizontal className="w-4 h-4 text-orange-400" />
                  <span>Refine Catalog</span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Category</label>
                <div className="space-y-1">
                  {[
                    { id: 'all', label: 'All Equipment' },
                    { id: 'desktops', label: 'Desktop & Gaming PCs' },
                    { id: 'laptops', label: 'Laptops & ThinkPads' },
                    { id: 'chromebooks', label: 'Chromebooks' },
                    { id: 'tablets', label: 'Tablets & 2-in-1' },
                    { id: 'workstations', label: 'AI Compute Workstations' },
                    { id: 'wholesale_lots', label: 'Bulk Wholesale Pallets' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.id as ProductCategory)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.id && <Check className="w-3.5 h-3.5 text-orange-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Manufacturer / Brand</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(b)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-center transition-all cursor-pointer ${
                        selectedBrand === b
                          ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/25 border border-orange-400/40'
                          : 'bg-slate-950/60 border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      {b === 'all' ? 'All Brands' : b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-300 uppercase tracking-wider">Max Price</label>
                  <span className="font-bold text-orange-400">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  id="price-range-slider"
                  type="range"
                  min={300}
                  max={15000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-orange-500 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>{formatPrice(300)}</span>
                  <span>{formatPrice(15000)}+</span>
                </div>
              </div>

              {/* Condition Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Hardware Condition</label>
                <div className="space-y-1">
                  {conditions.map((cond) => (
                    <button
                      key={cond}
                      onClick={() => setSelectedCondition(cond)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCondition === cond
                          ? 'bg-slate-800 text-orange-300 border border-slate-700'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{cond === 'all' ? 'Any Condition' : cond}</span>
                      {selectedCondition === cond && <Check className="w-3.5 h-3.5 text-orange-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2.5 text-xs font-medium text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded accent-orange-500 w-4 h-4 bg-slate-950"
                  />
                  <span>In-Stock Depot Units Only</span>
                </label>
              </div>

              {/* Bulk RFQ helper card in sidebar */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-orange-950/40 to-slate-950 border border-orange-500/30 text-xs space-y-2">
                <div className="font-bold text-orange-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  Need 20+ Custom Systems?
                </div>
                <p className="text-slate-400 text-[11px]">
                  Submit our custom B2B configuration sheet for tailored CPU/GPU specs and volume freight rates.
                </p>
                <button
                  onClick={onOpenRFQ}
                  className="w-full py-1.5 text-center text-xs font-bold text-orange-400 hover:text-white bg-slate-900 border border-orange-500/40 rounded-lg transition-colors cursor-pointer"
                >
                  Create Custom RFQ
                </button>
              </div>

            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white">No hardware matching current filters</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Try adjusting your price range or clearing selected categories to view available inventory.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-orange-500 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    pricingMode={pricingMode}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                    isCompared={comparedProducts.some((p) => p.id === product.id)}
                    onToggleCompare={onToggleCompare}
                  />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>
    </section>
  );
};
