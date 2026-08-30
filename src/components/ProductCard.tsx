import React from 'react';
import { 
  ShoppingCart, 
  Eye, 
  Layers, 
  Star, 
  Check, 
  Cpu, 
  HardDrive, 
  Zap, 
  Sparkles,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { Product, PricingMode } from '../types';
import { formatPrice } from '../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  pricingMode: PricingMode;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, isWholesale: boolean) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  pricingMode,
  onQuickView,
  onAddToCart,
  isCompared,
  onToggleCompare,
}) => {
  const isWholesale = pricingMode === 'wholesale';
  const displayPrice = isWholesale ? product.wholesalePrice : product.retailPrice;
  const savingsPercent = Math.round(((product.retailPrice - product.wholesalePrice) / product.retailPrice) * 100);

  const minUnits = isWholesale ? product.wholesaleMOQ : 1;

  return (
    <div className="group relative flex flex-col">
      {/* Radiant Glowing Aura on Hover */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 opacity-0 group-hover:opacity-75 blur-md group-hover:blur-lg transition-all duration-500 pointer-events-none" />

      {/* Card Body with Glassmorphism & Shadow Depth */}
      <div className="relative z-10 flex-1 flex flex-col bg-slate-900/50 backdrop-blur-2xl rounded-2xl border border-white/10 group-hover:border-orange-500/60 group-hover:bg-slate-900/70 transition-all duration-300 overflow-hidden shadow-xl group-hover:shadow-[0_0_35px_rgba(249,115,22,0.25)]">
        
        {/* Subtle Glass Light Sheen Sweep Effect on Hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none z-30 transform -skew-x-12" />

        {/* Top Media Banner */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-950/80">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-108"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {/* Glowing bottom border on image */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent group-hover:via-orange-500 transition-all" />

          {/* Condition & Lot Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isBulkLot ? (
              <span className="bg-amber-500/90 backdrop-blur-xl text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md shadow-lg shadow-amber-500/30 flex items-center gap-1 border border-white/20">
                <PackageCheck className="w-3 h-3" />
                {product.lotUnitCount}-Unit Pallet Lot
              </span>
            ) : (
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md shadow-md backdrop-blur-xl border ${
                product.condition === 'Brand New' 
                  ? 'bg-emerald-500/80 text-white border-emerald-300/40 shadow-emerald-500/20'
                  : 'bg-blue-500/80 text-white border-blue-300/40 shadow-blue-500/20'
              }`}>
                {product.condition}
              </span>
            )}

            {product.isFeatured && (
              <span className="bg-gradient-to-r from-orange-500/90 to-amber-500/90 backdrop-blur-xl text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md shadow-lg shadow-orange-500/30 flex items-center gap-1 border border-white/20">
                <Sparkles className="w-2.5 h-2.5 animate-pulse" /> Featured
              </span>
            )}
          </div>

          {/* Brand Chip with Glass Blur */}
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-slate-950/70 backdrop-blur-xl border border-white/15 text-slate-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow-sm">
              {product.brand}
            </span>
          </div>

          {/* Hover Quick View Button */}
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4 z-20">
            <button
              id={`quick-view-btn-${product.id}`}
              onClick={() => onQuickView(product)}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/30 flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all cursor-pointer border border-white/10"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View & Specs
            </button>
          </div>
        </div>

        {/* Product Information Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
          
          <div className="space-y-2.5">
            
            {/* Rating and Stock Indicator */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-500 font-normal">({product.reviewsCount})</span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                <span className={`w-2 h-2 rounded-full ${
                  product.stockQuantity > 20 
                    ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]' 
                    : product.stockQuantity > 5 
                      ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' 
                      : 'bg-red-400 shadow-[0_0_8px_#f87171]'
                }`} />
                <span className="text-[11px] text-slate-300 font-medium">
                  {product.stockQuantity > 0 ? `${product.stockQuantity} in depot` : 'Backorder'}
                </span>
              </div>
            </div>

            {/* Product Title */}
            <h3 
              onClick={() => onQuickView(product)}
              className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-orange-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
            >
              {product.name}
            </h3>

            {/* Specs Micro-Grid with Frosted Glass */}
            <div className="bg-slate-950/45 backdrop-blur-xl rounded-xl p-2.5 border border-white/5 group-hover:border-white/10 text-[11px] space-y-1 text-slate-300 shadow-inner">
              <div className="flex items-center gap-1.5 truncate">
                <Cpu className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span className="truncate">{product.specs.cpu}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <Zap className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span className="truncate">{product.specs.gpu}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <HardDrive className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span className="truncate">{product.specs.ram} • {product.specs.storage}</span>
              </div>
            </div>
          </div>

          {/* Pricing & Footer Actions */}
          <div className="pt-2 border-t border-white/10 space-y-3">
            
            {/* Price Layout */}
            <div className="flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-black text-white group-hover:text-orange-200 transition-colors">
                    {formatPrice(displayPrice)}
                  </span>
                  {isWholesale ? (
                    <span className="text-xs line-through text-slate-500">
                      {formatPrice(product.retailPrice)}
                    </span>
                  ) : null}
                </div>

                {isWholesale ? (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">
                      MOQ: {product.wholesaleMOQ} units
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      Save {savingsPercent}%
                    </span>
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-400">Retail Unit MSRP • Free 2-Day Air</p>
                )}
              </div>

              {/* Compare Checkbox Icon */}
              <button
                onClick={() => onToggleCompare(product)}
                className={`p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                  isCompared 
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/30' 
                    : 'bg-slate-950/60 backdrop-blur-md text-slate-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
                title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
              >
                <Layers className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                id={`card-specs-btn-${product.id}`}
                onClick={() => onQuickView(product)}
                className="py-2.5 px-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 backdrop-blur-xl border border-white/10 hover:border-orange-500/40 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>Full Specs</span>
              </button>

              <button
                id={`card-add-cart-btn-${product.id}`}
                onClick={() => onAddToCart(product, minUnits, isWholesale)}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold shadow-md shadow-orange-600/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{isWholesale ? `Add ${minUnits} (MOQ)` : 'Add to Cart'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
