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
  Building2,
  CheckCircle2
} from 'lucide-react';
import { Product, ProductCategory, PricingMode, FilterState } from '../types';
import { ProductCard } from './ProductCard';
import { formatPrice } from '../utils/formatCurrency';
import { normalizeCondition } from './ConditionBadge';
import { 
  LaptopFinder, 
  LaptopUseCase, 
  BudgetBracket, 
  USE_CASES, 
  BUDGET_BRACKETS 
} from './LaptopFinder';
import { ShopByBudget } from './ShopByBudget';

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
  // Traditional Filter States
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Dedicated "Laptop Finder" States
  const [finderUseCase, setFinderUseCase] = useState<LaptopUseCase | null>(null);
  const [finderBudget, setFinderBudget] = useState<BudgetBracket | null>(null);

  // Dynamically compute unique brands present in current inventory
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach(p => {
      if (p.brand && p.brand.trim()) brandSet.add(p.brand.trim());
    });
    return ['all', ...Array.from(brandSet).sort()];
  }, [products]);
  const conditionTabs = [
    { id: 'all', label: 'ALL CONDITIONS', icon: '⚡', desc: 'Browse full catalog' },
    { id: 'NEW', label: 'NEW', icon: '🟢', desc: 'Brand new / sealed' },
    { id: 'USED', label: 'USED', icon: '🔵', desc: 'Used but tested' },
    { id: 'REFURBISHED', label: 'REFURBISHED', icon: '🟠', desc: 'Professionally refurbished' },
    { id: 'OPEN BOX', label: 'OPEN BOX', icon: '🟣', desc: 'Opened / lightly used' },
  ];

  const safeQuery = (searchQuery || '').trim().toLowerCase();

  // Helper to check if a product matches a use case
  const matchesUseCase = (product: Product, useCase: LaptopUseCase): boolean => {
    // Look in tags, name, specs, and description
    const textCorpus = [
      product.name,
      product.brand,
      product.description,
      product.specs?.cpu,
      product.specs?.gpu,
      product.specs?.display,
      ...(product.tags || []),
      ...(product.highlights || [])
    ].join(' ').toLowerCase();

    switch (useCase) {
      case 'student':
        return (
          product.category === 'laptops' || 
          product.category === 'chromebooks' ||
          textCorpus.includes('student') ||
          textCorpus.includes('budget') ||
          textCorpus.includes('probook') ||
          textCorpus.includes('chromebook') ||
          textCorpus.includes('elitebook') ||
          textCorpus.includes('latitude')
        );

      case 'office':
        return (
          product.category === 'laptops' || 
          product.category === 'desktops' ||
          product.category === 'chromebooks' ||
          textCorpus.includes('office') ||
          textCorpus.includes('business') ||
          textCorpus.includes('latitude') ||
          textCorpus.includes('elitebook') ||
          textCorpus.includes('thinkpad') ||
          textCorpus.includes('probook')
        );

      case 'freelancing':
        return (
          product.category === 'laptops' ||
          textCorpus.includes('freelancing') ||
          textCorpus.includes('remote') ||
          textCorpus.includes('elitebook') ||
          textCorpus.includes('latitude') ||
          textCorpus.includes('thinkpad') ||
          textCorpus.includes('macbook')
        );

      case 'graphic_design':
        return (
          textCorpus.includes('graphic_design') ||
          textCorpus.includes('photoshop') ||
          textCorpus.includes('retina') ||
          textCorpus.includes('oled') ||
          textCorpus.includes('adobedrgb') ||
          textCorpus.includes('creator') ||
          textCorpus.includes('iris xe') ||
          textCorpus.includes('macbook') ||
          textCorpus.includes('rtx') ||
          textCorpus.includes('gtx') ||
          product.category === 'tablets'
        );

      case 'programming':
        return (
          textCorpus.includes('programming') ||
          textCorpus.includes('developer') ||
          textCorpus.includes('thinkpad') ||
          textCorpus.includes('ryzen 7') ||
          textCorpus.includes('core i7') ||
          textCorpus.includes('core ultra') ||
          textCorpus.includes('macbook') ||
          textCorpus.includes('latitude') ||
          textCorpus.includes('workstation')
        );

      case 'gaming':
        return (
          textCorpus.includes('gaming') ||
          textCorpus.includes('rtx') ||
          textCorpus.includes('gtx') ||
          textCorpus.includes('144hz') ||
          textCorpus.includes('victus') ||
          textCorpus.includes('tuf') ||
          textCorpus.includes('titan')
        );

      case 'business':
        return (
          textCorpus.includes('business') ||
          textCorpus.includes('elitebook') ||
          textCorpus.includes('latitude') ||
          textCorpus.includes('thinkpad') ||
          textCorpus.includes('macbook') ||
          textCorpus.includes('vpro')
        );

      case 'video_editing':
        return (
          textCorpus.includes('video_editing') ||
          textCorpus.includes('video') ||
          textCorpus.includes('render') ||
          textCorpus.includes('rtx') ||
          textCorpus.includes('gtx') ||
          textCorpus.includes('macbook') ||
          textCorpus.includes('creator') ||
          textCorpus.includes('threadripper')
        );

      default:
        return true;
    }
  };

  // Helper to check if a product matches a budget bracket
  const matchesBudget = (price: number, bracket: BudgetBracket): boolean => {
    switch (bracket) {
      case 'under_30k':
        return price <= 30000;
      case '30k_50k':
        return price >= 30000 && price <= 50000;
      case '50k_75k':
        return price >= 50000 && price <= 75000;
      case '75k_100k':
        return price >= 75000 && price <= 100000;
      case '100k_150k':
        return price >= 100000 && price <= 150000;
      case '150k_plus':
        return price >= 150000;
      default:
        return true;
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const sorted = products
      .filter((p) => {
        const price = pricingMode === 'wholesale' ? p.wholesalePrice : p.retailPrice;

        // LAPTOP FINDER CRITERIA (If activated)
        if (finderUseCase) {
          if (!matchesUseCase(p, finderUseCase)) return false;
        }

        if (finderBudget) {
          if (!matchesBudget(price, finderBudget)) return false;
        }

        // Search query filter
        if (safeQuery) {
          const matchName = p.name && p.name.toLowerCase().includes(safeQuery);
          const matchBrand = p.brand && p.brand.toLowerCase().includes(safeQuery);
          const matchCpu = p.specs?.cpu && p.specs.cpu.toLowerCase().includes(safeQuery);
          const matchGpu = p.specs?.gpu && p.specs.gpu.toLowerCase().includes(safeQuery);
          const matchDesc = p.description && p.description.toLowerCase().includes(safeQuery);
          const matchCondition = p.condition && p.condition.toLowerCase().includes(safeQuery);
          if (!matchName && !matchBrand && !matchCpu && !matchGpu && !matchDesc && !matchCondition) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

        // Brand filter
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;

        // Condition filter
        if (selectedCondition !== 'all') {
          const normP = normalizeCondition(p.condition);
          if (normP !== selectedCondition) return false;
        }

        // In stock only
        if (inStockOnly && p.stockQuantity <= 0) return false;

        // Max Price filter slider (only if finder budget is not explicitly set)
        if (!finderBudget && price > maxPrice) return false;

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

    // Enforce strict uniqueness by product ID to eliminate duplicate entries
    const seenIds = new Set<string>();
    const deduplicatedResult: Product[] = [];
    for (const item of sorted) {
      if (!item || !item.id) continue;
      if (seenIds.has(item.id)) continue;
      seenIds.add(item.id);
      deduplicatedResult.push(item);
    }
    return deduplicatedResult;
  }, [
    products, 
    safeQuery, 
    selectedCategory, 
    selectedBrand, 
    selectedCondition, 
    inStockOnly, 
    maxPrice, 
    sortBy, 
    pricingMode,
    finderUseCase,
    finderBudget
  ]);

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) + 
    (selectedBrand !== 'all' ? 1 : 0) + 
    (selectedCondition !== 'all' ? 1 : 0) + 
    (inStockOnly ? 1 : 0) + 
    (maxPrice < 500000 ? 1 : 0) +
    (finderUseCase ? 1 : 0) +
    (finderBudget ? 1 : 0);

  const handleResetFilters = () => {
    onSelectCategory('all');
    setSelectedBrand('all');
    setSelectedCondition('all');
    setInStockOnly(false);
    setMaxPrice(500000);
    setSortBy('featured');
    setFinderUseCase(null);
    setFinderBudget(null);
  };

  const handleResetFinder = () => {
    setFinderUseCase(null);
    setFinderBudget(null);
  };

  const activeUseCaseObj = USE_CASES.find(u => u.id === finderUseCase);
  const activeBudgetObj = BUDGET_BRACKETS.find(b => b.id === finderBudget);

  return (
    <section id="product-catalog-section" className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* 🔎 PROMINENT "FIND YOUR LAPTOP" INTERACTIVE ASSISTANT    */}
        {/* ======================================================== */}
        <LaptopFinder
          selectedUseCase={finderUseCase}
          selectedBudget={finderBudget}
          onSelectUseCase={setFinderUseCase}
          onSelectBudget={setFinderBudget}
          onReset={handleResetFinder}
          matchCount={filteredProducts.length}
        />

        {/* ======================================================== */}
        {/* 💰 "SHOP BY BUDGET" (MERA BUDGET) PAKISTANI PRICE GUIDE  */}
        {/* ======================================================== */}
        <ShopByBudget
          products={products}
          selectedBudget={finderBudget}
          onSelectBudget={setFinderBudget}
          pricingMode={pricingMode}
        />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
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
              {finderUseCase || finderBudget ? (
                <span className="text-orange-300 font-semibold">
                  Showing {filteredProducts.length} matching laptops for {activeUseCaseObj ? activeUseCaseObj.label : 'Any Use Case'} {activeBudgetObj ? `within ${activeBudgetObj.label}` : ''}
                </span>
              ) : (
                `Showing ${filteredProducts.length} certified machines with clear condition badges & checking warranties`
              )}
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

        {/* CONDITION SEPARATION TABS BAR - Transparently Separates NEW / USED / REFURBISHED / OPEN BOX */}
        <div className="mt-6 p-3 sm:p-4 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              <span>Filter by Condition (Clearly Separated):</span>
            </div>
            {selectedCondition !== 'all' && (
              <button
                onClick={() => setSelectedCondition('all')}
                className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer font-semibold self-start sm:self-auto"
              >
                <RotateCcw className="w-3 h-3" /> Reset Condition
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {conditionTabs.map((cond) => {
              const isSelected = selectedCondition === cond.id;
              return (
                <button
                  key={cond.id}
                  onClick={() => setSelectedCondition(cond.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-orange-500/20 border-orange-500 text-white shadow-lg shadow-orange-500/15 ring-1 ring-orange-500/30'
                      : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs uppercase flex items-center gap-1.5">
                      <span>{cond.icon}</span>
                      <span className={isSelected ? 'text-orange-300' : 'text-slate-200'}>{cond.label}</span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {cond.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Catalog Layout */}
        <div id="catalog-product-list" className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
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
                    <RotateCcw className="w-3 h-3" /> Reset All
                  </button>
                )}
              </div>

              {/* Laptop Finder Quick Status in Sidebar */}
              {(finderUseCase || finderBudget) && (
                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Finder Active
                    </span>
                    <button
                      onClick={handleResetFinder}
                      className="text-[10px] text-orange-300 hover:text-white underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1">
                    {finderUseCase && (
                      <div>• Role: <strong>{activeUseCaseObj?.emoji} {activeUseCaseObj?.label}</strong></div>
                    )}
                    {finderBudget && (
                      <div>• Budget: <strong>{activeBudgetObj?.label}</strong></div>
                    )}
                  </div>
                </div>
              )}

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Category</label>
                <div className="space-y-1">
                  {[
                    { id: 'all', label: 'All Equipment' },
                    { id: 'laptops', label: 'Laptops & Ultrabooks' },
                    { id: 'desktops', label: 'Desktop & Gaming PCs' },
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

              {/* Shop By Budget Sidebar Selector */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>💰 Shop By Budget</span>
                  </label>
                  {finderBudget && (
                    <button
                      onClick={() => setFinderBudget(null)}
                      className="text-[10px] text-orange-400 hover:text-orange-300 font-bold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {BUDGET_BRACKETS.map((b) => {
                    const isSelected = finderBudget === b.id;
                    const matchingList = products.filter(p => matchesBudget(pricingMode === 'wholesale' ? p.wholesalePrice : p.retailPrice, b.id));
                    const totalBracketStock = matchingList.reduce((acc, p) => acc + (p.stockQuantity || 0), 0);
                    const stockDot = totalBracketStock <= 0 ? '🔴' : totalBracketStock <= 3 ? '🟡' : '🟢';

                    return (
                      <button
                        key={b.id}
                        onClick={() => setFinderBudget(isSelected ? null : b.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-[10px]">{stockDot}</span>
                          <span className="font-semibold text-[11px] truncate">{b.label}</span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-[10px] text-slate-500">{matchingList.length}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
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

              {/* In Stock Toggle */}
              <div className="pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2.5 text-xs font-medium text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded accent-orange-500 w-4 h-4 bg-slate-950"
                  />
                  <span>In-Stock Ready Units Only</span>
                </label>
              </div>

              {/* Bulk RFQ helper card in sidebar */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-orange-950/40 to-slate-950 border border-orange-500/30 text-xs space-y-2">
                <div className="font-bold text-orange-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  Need 20+ Custom Systems?
                </div>
                <p className="text-slate-400 text-[11px]">
                  Submit our custom B2B configuration sheet for tailored CPU/GPU specs and volume rates.
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
                  Try adjusting your budget bracket, clearing your use-case selection, or resetting filters to explore all tested machines.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleResetFinder}
                    className="px-4 py-2 bg-orange-500 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer"
                  >
                    Reset Laptop Finder
                  </button>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl border border-white/10 cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
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
