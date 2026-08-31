import React, { useState } from 'react';
import { 
  DollarSign, 
  Sparkles, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  Laptop, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  HelpCircle,
  Table,
  LayoutGrid,
  Truck
} from 'lucide-react';
import { BUDGET_BRACKETS, BudgetBracket } from './LaptopFinder';
import { Product } from '../types';
import { StockBadge, getStockStatusInfo } from './StockBadge';

interface ShopByBudgetProps {
  products: Product[];
  selectedBudget: BudgetBracket | null;
  onSelectBudget: (budget: BudgetBracket | null) => void;
  pricingMode?: 'retail' | 'wholesale';
}

export const ShopByBudget: React.FC<ShopByBudgetProps> = ({
  products,
  selectedBudget,
  onSelectBudget,
  pricingMode = 'retail'
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter matching products for a bracket
  const getProductsForBracket = (bracketId: BudgetBracket): Product[] => {
    const bracket = BUDGET_BRACKETS.find(b => b.id === bracketId);
    if (!bracket) return [];

    return products.filter(p => {
      const price = pricingMode === 'wholesale' ? p.wholesalePrice : p.retailPrice;
      if (bracket.id === 'under_30k') return price <= 30000;
      if (bracket.id === '30k_50k') return price >= 30000 && price <= 50000;
      if (bracket.id === '50k_75k') return price >= 50000 && price <= 75000;
      if (bracket.id === '75k_100k') return price >= 75000 && price <= 100000;
      if (bracket.id === '100k_150k') return price >= 100000 && price <= 150000;
      if (bracket.id === '150k_plus') return price >= 150000;
      return true;
    });
  };

  // Get total units in stock for a bracket
  const getTotalStockForBracket = (bracketId: BudgetBracket): number => {
    const list = getProductsForBracket(bracketId);
    return list.reduce((acc, p) => acc + (p.stockQuantity || 0), 0);
  };

  const handleCardClick = (bracketId: BudgetBracket) => {
    if (selectedBudget === bracketId) {
      onSelectBudget(null);
    } else {
      onSelectBudget(bracketId);
      // Smoothly scroll down to the catalog list
      const catalogEl = document.getElementById('catalog-product-list');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div 
      id="shop-by-budget" 
      className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-900/90 border border-white/10 p-5 sm:p-7 shadow-2xl backdrop-blur-2xl mb-10 ring-1 ring-white/5"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mt-20" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mb-20" />

      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-black uppercase text-emerald-400 tracking-wider shadow-sm">
              <DollarSign className="w-3.5 h-3.5" /> MERA BUDGET • PAKISTAN PRICE BRACKETS
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">• 100% Bench Tested & Verified</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span className="text-orange-400">💰</span> Shop By Budget
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            In Pakistan, shopping by your exact budget saves time. Select your price range below to instantly view certified laptops with live ready-to-dispatch availability.
          </p>
        </div>

        {/* View Toggle & Clear Actions */}
        <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
          {selectedBudget && (
            <button
              id="clear-budget-filter-btn"
              onClick={() => onSelectBudget(null)}
              className="px-3 py-1.5 rounded-xl bg-orange-500/15 border border-orange-500/30 hover:bg-orange-500/25 text-orange-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Budget</span>
            </button>
          )}

          <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl p-0.5 text-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-orange-500 text-slate-950 shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'table' 
                  ? 'bg-orange-500 text-slate-950 shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Guide Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Budget Grid View */}
      {viewMode === 'grid' ? (
        <div className="relative z-10 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
            {BUDGET_BRACKETS.map((bracket) => {
              const isSelected = selectedBudget === bracket.id;
              const matchingList = getProductsForBracket(bracket.id);
              const modelCount = matchingList.length;
              const totalStock = getTotalStockForBracket(bracket.id);
              const isPopular = bracket.id === '50k_75k';
              const stockStatus = getStockStatusInfo(totalStock);

              return (
                <div
                  key={bracket.id}
                  id={`shop-budget-card-${bracket.id}`}
                  onClick={() => handleCardClick(bracket.id)}
                  className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[260px] ${
                    isSelected
                      ? 'bg-gradient-to-b from-orange-500/25 via-slate-900/90 to-slate-950 border-orange-500 text-white shadow-xl shadow-orange-500/20 ring-2 ring-orange-500/50 scale-[1.02]'
                      : 'bg-slate-950/70 border-white/10 hover:border-orange-500/50 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-orange-500/10 text-slate-300'
                  }`}
                >
                  {/* Top Badges */}
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">
                        {bracket.id === 'under_30k' ? 'ENTRY TIER' :
                         bracket.id === '30k_50k' ? 'BUDGET TIER' :
                         bracket.id === '50k_75k' ? 'POPULAR TIER' :
                         bracket.id === '75k_100k' ? 'PRO TIER' :
                         bracket.id === '100k_150k' ? 'HIGH-PERF TIER' : 'FLAGSHIP TIER'}
                      </span>
                      {isPopular && (
                        <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[9px] font-black uppercase">
                          🔥 Most Popular
                        </span>
                      )}
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center shadow-md font-bold">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Price Range Heading */}
                    <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight group-hover:text-orange-300 transition-colors">
                      {bracket.label}
                    </h3>

                    {/* Suggested Category Badge */}
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-black shadow-sm">
                      <span>{bracket.categoryEmoji}</span>
                      <span>{bracket.suggestedCategory}</span>
                    </div>

                    {/* Subtext Description */}
                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {bracket.subText}
                    </p>
                  </div>

                  {/* Stock Availability Indicator & Bottom Footer */}
                  <div className="mt-3.5 pt-3 border-t border-white/10 space-y-2">
                    {/* Stock Status Badge */}
                    <div className="flex items-center">
                      <StockBadge 
                        stockQuantity={totalStock} 
                        size="xs" 
                        className="w-full justify-center text-center font-bold"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="font-bold text-slate-300 flex items-center gap-1">
                        <Laptop className="w-3.5 h-3.5 text-orange-400" />
                        <span>{modelCount} {modelCount === 1 ? 'Model' : 'Models'}</span>
                      </span>
                      <span className={`text-[11px] font-bold flex items-center gap-0.5 transition-transform group-hover:translate-x-0.5 ${
                        isSelected ? 'text-orange-400 font-extrabold' : 'text-slate-400 group-hover:text-white'
                      }`}>
                        {isSelected ? 'Active' : 'Shop'}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>

                    {bracket.popularModels && (
                      <div className="text-[10px] text-slate-400 truncate">
                        e.g. {bracket.popularModels}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Budget Guide Table View */
        <div className="relative z-10 pt-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/15 text-slate-400 uppercase tracking-wider font-bold">
                <th className="py-3 px-4">💰 Budget Range</th>
                <th className="py-3 px-4">Suggested Category</th>
                <th className="py-3 px-4">Ideal Use Case</th>
                <th className="py-3 px-4">Popular Certified Models</th>
                <th className="py-3 px-4 text-center">Available Stock Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {BUDGET_BRACKETS.map((bracket) => {
                const isSelected = selectedBudget === bracket.id;
                const matchingList = getProductsForBracket(bracket.id);
                const totalStock = getTotalStockForBracket(bracket.id);
                return (
                  <tr 
                    key={bracket.id}
                    className={`transition-colors cursor-pointer ${
                      isSelected 
                        ? 'bg-orange-500/15 text-white font-bold' 
                        : 'hover:bg-slate-900/60'
                    }`}
                    onClick={() => handleCardClick(bracket.id)}
                  >
                    <td className="py-3.5 px-4 font-black text-sm text-white">
                      {bracket.label}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-orange-500/15 border border-orange-500/30 text-orange-300 font-bold">
                        <span>{bracket.categoryEmoji}</span>
                        <span>{bracket.suggestedCategory}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {bracket.subText}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                      {bracket.popularModels || 'Multiple verified units'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <StockBadge stockQuantity={totalStock} size="xs" showExactUnits />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(bracket.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-orange-500 text-slate-950'
                            : 'bg-slate-900 border border-white/10 hover:border-orange-500/50 text-slate-300 hover:text-white'
                        }`}
                      >
                        {isSelected ? 'Active Filter' : 'Filter Now'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Active Budget Banner with Direct Shortcut */}
      {selectedBudget && (
        <div className="relative z-10 mt-6 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0 border border-orange-500/40">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="text-white font-bold">
                Budget Filter Active: {BUDGET_BRACKETS.find(b => b.id === selectedBudget)?.label} ({BUDGET_BRACKETS.find(b => b.id === selectedBudget)?.suggestedCategory})
              </span>
              <div className="flex items-center gap-2 mt-1">
                <StockBadge 
                  stockQuantity={getTotalStockForBracket(selectedBudget)} 
                  size="xs"
                  showExactUnits
                />
                <span className="text-slate-300 text-[11px]">
                  • Genuine chargers & 7-day checking warranties included.
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => onSelectBudget(null)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
            >
              Clear Filter
            </button>
            <a
              href="#catalog-product-list"
              className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-black text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-md shadow-orange-500/20"
            >
              <span>View Results</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

