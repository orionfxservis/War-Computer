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
  CheckCircle2,
  X,
  ArrowRight
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
import { SectionCollapseButton } from './SectionCollapseButton';

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
  const [isCatalogCollapsed, setIsCatalogCollapsed] = useState<boolean>(false);

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

  // Live Category Counts matching warcomputer.com imported inventory
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: products.length,
      business_laptops: 0,
      gaming_laptops: 0,
      workstations: 0,
      chromebooks: 0,
      desktops: 0,
      wholesale_lots: 0,
    };
    products.forEach(p => {
      if (p.category === 'laptops' || p.category === 'business_laptops') {
        counts.business_laptops++;
      } else if (p.category === 'gaming_laptops') {
        counts.gaming_laptops++;
      } else if (p.category === 'workstations') {
        counts.workstations++;
      } else if (p.category === 'chromebooks') {
        counts.chromebooks++;
      } else if (p.category === 'desktops') {
        counts.desktops++;
      } else if (p.category === 'wholesale_lots' || p.isBulkLot) {
        counts.wholesale_lots++;
      }
    });
    return counts;
  }, [products]);

  const warCategories: { id: ProductCategory; label: string; icon: string; count: number; desc: string }[] = [
    { id: 'all', label: 'All Equipment', icon: '💻', count: categoryCounts.all, desc: 'Complete Inventory' },
    { id: 'business_laptops', label: 'Business Laptops', icon: '💼', count: categoryCounts.business_laptops, desc: 'Dell, HP, Lenovo' },
    { id: 'gaming_laptops', label: 'Gaming Laptops', icon: '🎮', count: categoryCounts.gaming_laptops, desc: 'Alienware High-FPS' },
    { id: 'workstations', label: 'Laptop Workstations', icon: '⚡', count: categoryCounts.workstations, desc: 'Xeon & Quadro GPUs' },
    { id: 'chromebooks', label: 'Chromebooks', icon: '🌐', count: categoryCounts.chromebooks, desc: 'Samsung, Dell Education' },
    { id: 'desktops', label: 'Desktops', icon: '🖥️', count: categoryCounts.desktops, desc: 'Mini PCs & Desktops' },
    { id: 'wholesale_lots', label: 'Bulk Orders', icon: '📦', count: categoryCounts.wholesale_lots, desc: 'High-Margin Lots' },
  ];

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
          const matchRam = p.specs?.ram && p.specs.ram.toLowerCase().includes(safeQuery);
          const matchStorage = p.specs?.storage && p.specs.storage.toLowerCase().includes(safeQuery);
          const matchSku = p.sku && p.sku.toLowerCase().includes(safeQuery);
          const matchDesc = p.description && p.description.toLowerCase().includes(safeQuery);
          const matchCondition = p.condition && p.condition.toLowerCase().includes(safeQuery);
          if (!matchName && !matchBrand && !matchCpu && !matchGpu && !matchRam && !matchStorage && !matchSku && !matchDesc && !matchCondition) {
            return false;
          }
        }

        // Category filter matching warcomputer.com categories
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'business_laptops' || selectedCategory === 'laptops') {
            if (p.category !== 'business_laptops' && p.category !== 'laptops') return false;
          } else if (selectedCategory === 'gaming_laptops') {
            if (p.category !== 'gaming_laptops') return false;
          } else if (selectedCategory === 'workstations') {
            if (p.category !== 'workstations') return false;
          } else if (selectedCategory === 'chromebooks') {
            if (p.category !== 'chromebooks') return false;
          } else if (selectedCategory === 'desktops') {
            if (p.category !== 'desktops') return false;
          } else if (selectedCategory === 'wholesale_lots') {
            if (p.category !== 'wholesale_lots' && !p.isBulkLot) return false;
          } else if (p.category !== selectedCategory) {
            return false;
          }
        }

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

    // Enforce strict uniqueness by product ID, SKU, and core model to eliminate any duplicate entries
    const seenIds = new Set<string>();
    const seenSkus = new Set<string>();
    const seenModels = new Set<string>();
    const deduplicatedResult: Product[] = [];

    for (const item of sorted) {
      if (!item || !item.id) continue;
      const idKey = item.id.toLowerCase().trim();
      const skuKey = item.sku ? item.sku.toLowerCase().trim() : '';
      const modelKey = item.name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 16);

      if (seenIds.has(idKey)) continue;
      if (skuKey && seenSkus.has(skuKey)) continue;
      if (modelKey && seenModels.has(modelKey)) continue;

      seenIds.add(idKey);
      if (skuKey) seenSkus.add(skuKey);
      if (modelKey) seenModels.add(modelKey);
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

        {/* Section Header - Persistent layout matching 832.JPG */}
        <div className={`relative z-10 ${isCatalogCollapsed ? '' : 'pb-6 border-b border-white/10'}`}>
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">
              WAR COMPUTERS CERTIFIED INVENTORY
            </span>
          </div>

          {/* Heading - Collapse/Expand - Sort on the EXACT same line */}
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              {selectedCategory === 'all' 
                ? 'Hardware & System Catalog' 
                : selectedCategory === 'business_laptops' 
                ? 'Business Laptops' 
                : selectedCategory === 'gaming_laptops' 
                ? 'Gaming Laptops' 
                : selectedCategory === 'workstations' 
                ? 'Laptop Workstations' 
                : selectedCategory === 'chromebooks' 
                ? 'Chromebooks' 
                : selectedCategory === 'desktops' 
                ? 'Chromebox & Desktops' 
                : `${selectedCategory.replace('_', ' ')} Collection`}
            </h2>

            {/* Right: Collapse + Mobile Filters + Sort in same line with fixed placement */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              {/* Collapse / Expand Button - maintains fixed width and placement */}
              <SectionCollapseButton
                isCollapsed={isCatalogCollapsed}
                onToggle={() => setIsCatalogCollapsed(!isCatalogCollapsed)}
                id="catalog-collapse-btn"
              />

              <button
                id="mobile-filters-trigger-btn"
                onClick={() => {
                  if (isCatalogCollapsed) setIsCatalogCollapsed(false);
                  setTimeout(() => {
                    document.getElementById('horizontal-refine-catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
                className="lg:hidden px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm hover:bg-slate-800"
              >
                <Filter className="w-4 h-4 text-orange-400" />
                <span>Filters ({activeFiltersCount})</span>
              </button>

              <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-300 shadow-sm">
                <span className="text-slate-400 font-semibold">Sort:</span>
                <select
                  id="sort-by-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as any);
                    if (isCatalogCollapsed) setIsCatalogCollapsed(false);
                  }}
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

          {/* Subtitle description below heading line - Always visible as shown in 832.JPG */}
          <p className="text-sm text-slate-400 mt-2">
            {finderUseCase || finderBudget ? (
              <span className="text-orange-300 font-semibold">
                Showing {filteredProducts.length} matching laptops for {activeUseCaseObj ? activeUseCaseObj.label : 'Any Use Case'} {activeBudgetObj ? `within ${activeBudgetObj.label}` : ''}
              </span>
            ) : (
              `Showing ${filteredProducts.length} certified machines from warcomputer.com with clear condition badges & checking warranties`
            )}
          </p>
        </div>

        {/* Collapsible Content: Condition Tabs, Filters, and Product Grid */}
        <div 
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isCatalogCollapsed 
              ? 'max-h-0 opacity-0 pointer-events-none mt-0' 
              : 'max-h-[25000px] opacity-100'
          }`}
        >
          {/* 1. CONDITION SEPARATION TABS BAR - Transparently Separates NEW / USED / REFURBISHED / OPEN BOX */}
          <div className="mt-6 p-3 sm:p-4 bg-slate-900 border border-white/10 rounded-2xl shadow-xl">
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

          {/* 2. SEARCH & REFINE SECTION IN HORIZONTAL DIRECTION (Placed Under Condition Filter as shown in 887.JPG) */}
          <div id="horizontal-refine-catalog" className="mt-6 p-4 sm:p-5 bg-slate-900 border border-white/10 rounded-2xl shadow-xl space-y-4">
            
            {/* Top Toolbar: Refine Catalog Title + Live Search Input Bar + In-Stock Toggle + Reset All */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 flex-shrink-0">
                <SlidersHorizontal className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">Refine Catalog</span>
                <span className="text-xs text-slate-400 font-medium">({filteredProducts.length} Items)</span>
              </div>

              {/* Prominent Live Search Input */}
              <div className="relative flex-1 max-w-xl">
                <Search className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder="Search catalog by model (e.g. Latitude 5440, ThinkPad, EliteBook, i5, i7, 16GB)..."
                  className="w-full pl-9 pr-8 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange?.('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* In-Stock Toggle & Quick Reset */}
              <div className="flex items-center gap-4 self-end lg:self-auto flex-wrap">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded accent-orange-500 w-4 h-4 bg-slate-950 cursor-pointer"
                  />
                  <span>In-Stock Ready Units Only</span>
                </label>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer font-semibold ml-2"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset All
                  </button>
                )}
              </div>
            </div>

            {/* CATEGORY (Horizontal Direction - matching 887.JPG) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>CATEGORY</span>
                </label>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => onSelectCategory('all')}
                    className="text-[10px] text-orange-400 hover:text-orange-300 font-semibold cursor-pointer"
                  >
                    View All Categories ({categoryCounts.all})
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
                {warCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      id={`cat-chip-${cat.id}`}
                      onClick={() => {
                        onSelectCategory(cat.id as ProductCategory);
                        if (cat.id === 'wholesale_lots') {
                          window.dispatchEvent(new CustomEvent('expand-wholesale-hub'));
                          const el = document.getElementById('b2b-wholesale-hub');
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-md shadow-orange-500/15 ring-1 ring-orange-500/30'
                          : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="text-sm">{cat.icon}</span>
                      <span>{cat.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {cat.count}
                      </span>
                      {isSelected && <Check className="w-3 h-3 text-orange-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RS. SHOP BY BUDGET (Horizontal Direction - matching 887.JPG) */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-orange-400 font-extrabold">RS.</span>
                  <span>SHOP BY BUDGET</span>
                </label>
                {finderBudget && (
                  <button
                    onClick={() => setFinderBudget(null)}
                    className="text-[10px] text-orange-400 hover:text-orange-300 font-semibold cursor-pointer"
                  >
                    Clear Budget
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
                {BUDGET_BRACKETS.map((b) => {
                  const isSelected = finderBudget === b.id;
                  const matchingList = products.filter(p => matchesBudget(pricingMode === 'wholesale' ? p.wholesalePrice : p.retailPrice, b.id));
                  const totalBracketStock = matchingList.reduce((acc, p) => acc + (p.stockQuantity || 0), 0);
                  const stockDot = totalBracketStock <= 0 ? '🔴' : totalBracketStock <= 3 ? '🟡' : '🟢';

                  return (
                    <button
                      key={b.id}
                      onClick={() => setFinderBudget(isSelected ? null : b.id)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-md ring-1 ring-orange-500/30'
                          : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="text-[10px]">{stockDot}</span>
                      <span className="font-semibold text-xs">{b.label}</span>
                      <span className="text-[10px] text-slate-500 font-bold ml-0.5">({matchingList.length})</span>
                      {isSelected && <Check className="w-3 h-3 text-orange-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MANUFACTURER / BRAND (Horizontal Direction) */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Manufacturer / Brand
                </label>
                {selectedBrand !== 'all' && (
                  <button
                    onClick={() => setSelectedBrand('all')}
                    className="text-[10px] text-orange-400 hover:text-orange-300 font-semibold cursor-pointer"
                  >
                    All Brands
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
                {brands.map((b) => {
                  const isSelected = selectedBrand === b;
                  return (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(b)}
                      className={`flex-shrink-0 px-3 py-1 rounded-xl text-xs font-medium text-center transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/25 border-orange-400/40'
                          : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20 hover:bg-slate-800/60'
                      }`}
                    >
                      {b === 'all' ? 'All Brands' : b}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Filters Summary Bar */}
            {(activeFiltersCount > 0 || safeQuery) && (
              <div className="pt-2 border-t border-white/10 flex items-center gap-2 flex-wrap text-xs">
                <span className="text-slate-400 text-[11px] font-semibold">Active:</span>
                {safeQuery && (
                  <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 flex items-center gap-1.5">
                    <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                    <button onClick={() => onSearchChange?.('')} className="hover:text-white cursor-pointer font-bold">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCondition !== 'all' && (
                  <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 flex items-center gap-1.5">
                    <span>Condition: {selectedCondition}</span>
                    <button onClick={() => setSelectedCondition('all')} className="hover:text-white cursor-pointer font-bold">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 flex items-center gap-1.5">
                    <span>Category: {warCategories.find(c => c.id === selectedCategory)?.label || selectedCategory}</span>
                    <button onClick={() => onSelectCategory('all')} className="hover:text-white cursor-pointer font-bold">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {finderBudget && (
                  <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 flex items-center gap-1.5">
                    <span>Budget: {BUDGET_BRACKETS.find(b => b.id === finderBudget)?.label}</span>
                    <button onClick={() => setFinderBudget(null)} className="hover:text-white cursor-pointer font-bold">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedBrand !== 'all' && (
                  <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 flex items-center gap-1.5">
                    <span>Brand: {selectedBrand}</span>
                    <button onClick={() => setSelectedBrand('all')} className="hover:text-white cursor-pointer font-bold">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 flex items-center gap-1.5">
                    <span>In-Stock Only</span>
                    <button onClick={() => setInStockOnly(false)} className="hover:text-white cursor-pointer font-bold">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-orange-400 hover:text-orange-300 underline font-semibold ml-auto cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* 3. THEN SHOWS THE SEARCH RESULTS */}
          <div id="catalog-product-list" className="pt-8">
            
            {/* Results status and quick RFQ prompt bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  Showing {filteredProducts.length} Verified Systems
                </span>
                {safeQuery && (
                  <span className="text-xs text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/30">
                    for &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenRFQ}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 cursor-pointer bg-slate-900 border border-orange-500/30 px-3 py-1.5 rounded-xl hover:bg-orange-500/10 transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Need 20+ Bulk Units? Request B2B Quote</span>
                </button>
              </div>
            </div>

            {/* Dedicated War Computers B2B Wholesale Hub Spotlight Banner */}
            {selectedCategory === 'wholesale_lots' && (
              <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-950/60 via-slate-900 to-amber-950/40 border border-orange-500/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 mt-0.5 flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-orange-500/20 text-orange-300 text-[11px] font-bold uppercase tracking-wider">
                      War Computers B2B Wholesale Hub
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-white">
                      Bulk Orders &amp; Fleet Deployments With <span className="text-orange-400">Guaranteed Tier Discounts</span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Tier 1 (15-20% OFF) • Tier 2 (25-30% OFF) • Tier 3 (Up to 40% OFF / Pallets). Net-30 credit terms &amp; insured pallet freight.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto flex-shrink-0">
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('expand-wholesale-hub'));
                      const el = document.getElementById('b2b-wholesale-hub');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="flex-1 md:flex-none px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Jump to Wholesale Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onOpenRFQ}
                    className="flex-1 md:flex-none px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-orange-400 border border-orange-500/40 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Request Custom RFQ</span>
                  </button>
                </div>
              </div>
            )}

            {/* Product Cards Grid - Full Width (1 to 4 cols) */}
            {filteredProducts.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white">No hardware matching current search & filters</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Try adjusting your budget bracket, clearing your search keyword, or resetting filters to explore all tested machines.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleResetFinder}
                    className="px-4 py-2 bg-orange-500 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer hover:bg-orange-400 transition-colors"
                  >
                    Reset Laptop Finder
                  </button>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl border border-white/10 cursor-pointer hover:bg-slate-700 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          </div>
        </div>

      </div>
    </section>
  );
};
