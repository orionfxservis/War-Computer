import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Eye, 
  ShoppingCart, 
  MessageCircle, 
  Clock, 
  Check, 
  Zap, 
  BadgePercent,
  Star,
  ArrowRight
} from 'lucide-react';
import { Product, PricingMode } from '../types';
import { formatPrice } from '../utils/formatCurrency';
import { ConditionBadge } from './ConditionBadge';

interface TodaysDealsSectionProps {
  products: Product[];
  pricingMode: PricingMode;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, isWholesale: boolean) => void;
  onBuyNow: (product: Product) => void;
  onOpenRFQ?: (product?: Product) => void;
}

export const TodaysDealsSection: React.FC<TodaysDealsSectionProps> = ({
  products,
  pricingMode,
  onQuickView,
  onAddToCart,
  onBuyNow,
  onOpenRFQ
}) => {
  // Filter for products marked with isDealOfTheDay or having genuine originalPrice > currentPrice, deduplicating by ID
  const dealProducts = React.useMemo(() => {
    const seenIds = new Set<string>();
    const uniqueDeals: Product[] = [];
    for (const p of products) {
      if (!p || !p.id) continue;
      const currentPrice = pricingMode === 'wholesale' ? p.wholesalePrice : p.retailPrice;
      const orig = p.originalPrice || 0;
      const isEligible = p.isDealOfTheDay || (orig > currentPrice);
      if (isEligible && !seenIds.has(p.id)) {
        seenIds.add(p.id);
        uniqueDeals.push(p);
      }
    }
    return uniqueDeals;
  }, [products, pricingMode]);

  // Calculate live countdown until midnight PKT (UTC+5)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 11,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Calculate milliseconds until next midnight in local / PKT
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      
      if (diff > 0) {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppDeal = (product: Product, dealPrice: number, savings: number) => {
    const message = encodeURIComponent(
      `Hello War Computers! I want to order Today's Deal for *${product.name}* at *Rs. ${dealPrice.toLocaleString('en-PK')}* (Discount: SAVE Rs. ${savings.toLocaleString('en-PK')}). Please confirm availability & dispatch to my city in Pakistan.`
    );
    window.open(`https://wa.me/923330257246?text=${message}`, '_blank');
  };

  if (dealProducts.length === 0) {
    return null;
  }

  return (
    <section 
      id="todays-deals-section" 
      className="relative z-10 py-12 sm:py-16 border-b border-orange-500/20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950"
    >
      {/* Background Radial Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-orange-600/15 via-red-600/10 to-amber-500/15 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          
          <div className="space-y-3 max-w-2xl">
            {/* Top Deal Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-bold shadow-lg shadow-red-950/50">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
              <span>LIMITED TIME DAILY OFFERS • DIRECT PAKISTAN STOCK</span>
            </div>

            {/* Main Section Title */}
            <h2 
              id="todays-deals-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight flex items-center gap-3 flex-wrap"
            >
              <span>🔥 Today's Computer Deals</span>
            </h2>

            {/* Subtitle with Genuine Price Assurance */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              100% genuine market price drops on tested laptops &amp; desktops. No inflated pre-discount rates — real verified savings with 7-Day Checking Warranty and nationwide delivery across Pakistan.
            </p>
          </div>

          {/* Right Header Box: Live Deal Timer & Genuine Guarantee */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 flex-shrink-0">
            {/* Countdown Clock */}
            <div className="bg-slate-900/90 backdrop-blur-xl border border-orange-500/40 rounded-2xl p-3.5 shadow-xl shadow-orange-950/40 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                <Clock className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Today's Deals Expire In</p>
                <div className="flex items-center gap-1.5 font-mono text-base sm:text-lg font-extrabold text-white mt-0.5">
                  <span className="bg-slate-950 px-2 py-0.5 rounded-md border border-white/10 text-orange-400">
                    {String(timeLeft.hours).padStart(2, '0')}h
                  </span>
                  <span className="text-orange-500">:</span>
                  <span className="bg-slate-950 px-2 py-0.5 rounded-md border border-white/10 text-orange-400">
                    {String(timeLeft.minutes).padStart(2, '0')}m
                  </span>
                  <span className="text-orange-500">:</span>
                  <span className="bg-slate-950 px-2 py-0.5 rounded-md border border-white/10 text-red-400 animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>
            </div>

            {/* Genuine Price Tag Badge */}
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Genuine Direct-Import Rates (Zero Fake Markups)</span>
            </div>
          </div>

        </div>

        {/* Deals Cards Grid with Stunning Hover Glow Effects */}
        <div 
          id="todays-deals-cards-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dealProducts.map((product) => {
            const currentPrice = pricingMode === 'wholesale' ? product.wholesalePrice : product.retailPrice;
            const originalPrice = product.originalPrice || (currentPrice + 5000);
            const savings = Math.max(0, originalPrice - currentPrice);
            const discountPercent = originalPrice > 0 ? Math.round((savings / originalPrice) * 100) : 0;
            const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 3;
            const isOutOfStock = product.stockQuantity <= 0;

            return (
              <div
                key={product.id}
                id={`deal-card-${product.id}`}
                className="group relative bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 rounded-3xl border-2 border-orange-500/30 hover:border-orange-400 p-5 sm:p-6 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between shadow-xl hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] backdrop-blur-xl"
              >
                {/* Background Card Hover Glow Highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />

                {/* Top Badge Strip: Deal Tag + SAVE Rs. X */}
                <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-md shadow-red-600/30">
                    <Flame className="w-3.5 h-3.5 fill-white text-white animate-bounce" />
                    <span>Today's Deal</span>
                  </div>

                  {savings > 0 && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-950/90 border border-red-500/60 text-red-300 font-extrabold text-xs sm:text-sm shadow-inner">
                      <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>SAVE {formatPrice(savings)}</span>
                      {discountPercent > 0 && (
                        <span className="text-[10px] text-red-400 font-normal ml-0.5">({discountPercent}% OFF)</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Product Image Area */}
                <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 mb-4 group/img">
                  <img
                    src={product.images[0] || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  {/* Condition Tag */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <ConditionBadge condition={product.condition} />
                  </div>

                  {/* Quick View Button on Image Hover */}
                  <button
                    onClick={() => onQuickView(product)}
                    className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs cursor-pointer"
                  >
                    <span className="bg-slate-900/90 border border-orange-500/60 px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 text-orange-300 hover:text-white hover:bg-orange-600 transition-all">
                      <Eye className="w-4 h-4" /> Quick Specs
                    </span>
                  </button>
                </div>

                {/* Main Product Info */}
                <div className="space-y-3 relative z-10 flex-1">
                  
                  {/* Rating + Brand */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 bg-orange-950/40 px-2 py-0.5 rounded border border-orange-500/20">
                      {product.brand}
                    </span>

                    <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-500 font-normal">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 
                    onClick={() => onQuickView(product)}
                    className="text-lg sm:text-xl font-extrabold text-white group-hover:text-orange-400 transition-colors line-clamp-1 cursor-pointer"
                    title={product.name}
                  >
                    {product.name}
                  </h3>

                  {/* Key Hardware Specs Micro-Pills */}
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                    <div className="bg-slate-950/70 px-2 py-1 rounded-lg border border-slate-800 truncate" title={product.specs.cpu}>
                      ⚡ {product.specs.cpu.split('(')[0].trim()}
                    </div>
                    <div className="bg-slate-950/70 px-2 py-1 rounded-lg border border-slate-800 truncate" title={product.specs.ram}>
                      🧠 {product.specs.ram.split('(')[0].trim()}
                    </div>
                    <div className="bg-slate-950/70 px-2 py-1 rounded-lg border border-slate-800 truncate" title={product.specs.storage}>
                      💾 {product.specs.storage.split('(')[0].trim()}
                    </div>
                    <div className="bg-slate-950/70 px-2 py-1 rounded-lg border border-slate-800 truncate" title={product.specs.display || product.specs.gpu}>
                      🖥️ {product.specs.display || product.specs.gpu || 'FHD Tested'}
                    </div>
                  </div>

                  {/* Price Block as requested: Original Price + Deal Price + Savings */}
                  <div className="pt-2 pb-1 border-t border-slate-800/80 space-y-1">
                    
                    {/* Strikethrough Original Genuine Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-slate-400 line-through">
                        {formatPrice(originalPrice)}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase font-medium">Regular Rate</span>
                    </div>

                    {/* Today's Special Deal Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-orange-400 tracking-tight drop-shadow-[0_2px_10px_rgba(249,115,22,0.3)]">
                        {formatPrice(currentPrice)}
                      </span>
                      <span className="text-xs text-orange-300 font-semibold">
                        {pricingMode === 'wholesale' ? 'Wholesale B2B Deal' : "Today's Deal"}
                      </span>
                    </div>

                    {/* Savings Notification Text */}
                    {savings > 0 && (
                      <p className="text-xs font-extrabold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>SAVE {formatPrice(savings)} Today</span>
                      </p>
                    )}
                  </div>

                  {/* Availability Badge */}
                  <div className="pt-1">
                    {isOutOfStock ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <span>🔴 Out of Stock</span>
                      </div>
                    ) : isLowStock ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-bold animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                        <span>🟡 Only {product.stockQuantity} Available Today</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shadow-[0_0_8px_#34d399]" />
                        <span>🟢 Available Today</span>
                        <span className="text-[10px] text-emerald-400/80 font-normal">• Ready to Dispatch</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Primary Action Buttons */}
                <div className="pt-4 mt-3 border-t border-white/10 space-y-2 relative z-10">
                  
                  {/* [ Buy Now ] Primary Button */}
                  <button
                    id={`deal-buy-now-btn-${product.id}`}
                    onClick={() => onBuyNow(product)}
                    disabled={isOutOfStock}
                    className={`w-full py-3 px-4 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                      isOutOfStock
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-orange-600/40 hover:shadow-orange-500/60 hover:scale-[1.02] active:scale-[0.98] border border-white/15'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4 text-orange-200" />
                    <span>Buy Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Secondary WhatsApp Direct Order Button */}
                  <button
                    id={`deal-whatsapp-btn-${product.id}`}
                    onClick={() => handleWhatsAppDeal(product, currentPrice, savings)}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                    <span>Order Deal via WhatsApp</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Trust & Assurance Footer Strip */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30 flex-shrink-0">
              <BadgePercent className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">Genuine Price Savings</h5>
              <p className="text-[11px] text-slate-400">Zero artificial pre-discount markups.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">100% Tested Hardware</h5>
              <p className="text-[11px] text-slate-400">Motherboard, RAM, thermals verified.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">7-Day Checking Warranty</h5>
              <p className="text-[11px] text-slate-400">Complete peace of mind on delivery.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">Nationwide Express Delivery</h5>
              <p className="text-[11px] text-slate-400">Secure bubble packaging &amp; tracking.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
