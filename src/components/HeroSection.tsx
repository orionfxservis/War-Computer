import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Building2, 
  CheckCircle2, 
  Truck, 
  Laptop, 
  Monitor, 
  Tablet, 
  Boxes,
  Cpu,
  BadgeCheck,
  Tag,
  MessageCircle
} from 'lucide-react';
import { ProductCategory, PricingMode } from '../types';
import { ContinuousImageMarquee } from './ContinuousImageMarquee';

interface HeroSectionProps {
  pricingMode: PricingMode;
  onExploreCollections: () => void;
  onOpenRFQ: () => void;
  onOpenAiAdvisor: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  pricingMode,
  onExploreCollections,
  onOpenRFQ,
  onOpenAiAdvisor,
  onSelectCategory,
}) => {
  const handleShopLaptops = () => {
    onSelectCategory('laptops');
    onExploreCollections();
  };

  const handleShopComputers = () => {
    onSelectCategory('desktops');
    onExploreCollections();
  };

  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello War Computers! I want to order / inquire about laptops, desktops & accessories in Pakistan."
    );
    window.open(`https://wa.me/923330257246?text=${message}`, '_blank');
  };

  return (
    <section id="hero-main-section" className="relative overflow-hidden z-10 border-b border-slate-800/80 pt-8 sm:pt-12 pb-12">
      {/* Ambient background glow matching orange WAR COMPUTERS branding */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-orange-500/20 via-orange-600/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Header Block */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Pill / Authenticity Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-orange-500/40 text-orange-400 text-xs font-semibold shadow-lg shadow-orange-500/10">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping" />
            <span className="text-slate-200">WAR COMPUTERS PAKISTAN:</span>
            <span className="text-orange-400 font-bold">Wholesale & Retail Direct Supply</span>
          </div>

          {/* Heading */}
          <h1 
            id="hero-main-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            <span className="block">Computers &amp; Laptops</span>
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              You Can Trust
            </span>
          </h1>

          {/* Subheading */}
          <p 
            id="hero-main-subheading"
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed italic"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            New &amp; Tested Used Laptops, Desktops, Workstations &amp; Accessories at Competitive Prices. Nationwide Delivery Across Pakistan.
          </p>

          {/* Primary Action Buttons: [ Shop Laptops ] [ Shop Computers ] */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            
            {/* 1. Shop Laptops */}
            <button
              id="hero-shop-laptops-btn"
              onClick={handleShopLaptops}
              className="px-7 sm:px-9 py-4 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-bold text-base sm:text-lg shadow-xl shadow-orange-600/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 cursor-pointer border border-white/15"
            >
              <Laptop className="w-5 h-5 text-orange-200" />
              <span>Shop Laptops</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* 2. Shop Computers */}
            <button
              id="hero-shop-computers-btn"
              onClick={handleShopComputers}
              className="px-7 sm:px-9 py-4 bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-xl border-2 border-orange-500/60 hover:border-orange-400 text-white rounded-xl font-bold text-base sm:text-lg shadow-xl shadow-black/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 cursor-pointer"
            >
              <Monitor className="w-5 h-5 text-orange-400" />
              <span>Shop Computers</span>
              <ArrowRight className="w-5 h-5 text-orange-400" />
            </button>
          </div>

          {/* Smaller CTA: 📱 Order on WhatsApp */}
          <div className="flex justify-center pt-1 pb-1">
            <button
              id="hero-whatsapp-order-cta"
              onClick={handleOpenWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 font-semibold text-xs sm:text-sm shadow-md shadow-emerald-950/50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
              <span>📱 Order on WhatsApp (+92 333 0257246)</span>
            </button>
          </div>

          {/* Trust Badges Underneath */}
          <div 
            id="hero-trust-badges"
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-5 max-w-3xl mx-auto border-t border-white/10"
          >
            {/* 1. Tested Products */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/60 backdrop-blur-md py-2.5 px-3 rounded-xl border border-emerald-500/20 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>✓ Tested Products</span>
            </div>

            {/* 2. Competitive Prices */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/60 backdrop-blur-md py-2.5 px-3 rounded-xl border border-orange-500/20 shadow-sm">
              <Tag className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>✓ Competitive Prices</span>
            </div>

            {/* 3. Warranty Support */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/60 backdrop-blur-md py-2.5 px-3 rounded-xl border border-amber-500/20 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>✓ Warranty Support</span>
            </div>

            {/* 4. Nationwide Delivery */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/60 backdrop-blur-md py-2.5 px-3 rounded-xl border border-cyan-500/20 shadow-sm">
              <Truck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>✓ Nationwide Delivery</span>
            </div>
          </div>

          {/* Secondary AI Advisor link */}
          <div className="flex justify-center pt-2">
            <button
              id="hero-secondary-ai-advisor-btn"
              onClick={onOpenAiAdvisor}
              className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer bg-slate-900/40 hover:bg-slate-900/70 px-3 py-1.5 rounded-lg border border-slate-800"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ask AI Hardware Advisor</span>
            </button>
          </div>

        </div>

        {/* Continuous HD Quality Images Scrolling Ribbon */}
        <div className="mt-10">
          <div className="flex items-center justify-between px-2 mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              <Cpu className="w-4 h-4 text-orange-500" />
              <span>Live Inventory Spotlight (Continuous Stream)</span>
            </div>
            <span className="text-xs text-orange-400 font-semibold">Hover to pause</span>
          </div>

          <ContinuousImageMarquee onSelectCategory={onSelectCategory} />
        </div>

        {/* Category Quick Jump Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
          {[
            { id: 'desktops' as ProductCategory, name: 'Desktops & Rigs', count: '42 models', icon: <Monitor className="w-5 h-5 text-orange-400" /> },
            { id: 'laptops' as ProductCategory, name: 'Laptops & ThinkPads', count: '185 models', icon: <Laptop className="w-5 h-5 text-amber-400" /> },
            { id: 'chromebooks' as ProductCategory, name: 'Chromebooks', count: '460 in stock', icon: <Laptop className="w-5 h-5 text-orange-500" /> },
            { id: 'tablets' as ProductCategory, name: 'Tablets & 2-in-1', count: '120 models', icon: <Tablet className="w-5 h-5 text-amber-300" /> },
            { id: 'workstations' as ProductCategory, name: 'AI Workstations', count: '96-Core Compute', icon: <Zap className="w-5 h-5 text-orange-400" /> },
            { id: 'wholesale_lots' as ProductCategory, name: 'Bulk Pallets (B2B)', count: 'Up to 45% OFF', icon: <Boxes className="w-5 h-5 text-amber-500" /> }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onExploreCollections();
              }}
              className="p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-850/90 backdrop-blur-xl border border-slate-800/90 hover:border-orange-500/60 transition-all text-left group cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]"
            >
              <div className="mb-2 p-2 rounded-xl bg-slate-950/80 backdrop-blur-md w-fit group-hover:scale-110 transition-transform border border-slate-800">
                {cat.icon}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                {cat.name}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {cat.count}
              </p>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
