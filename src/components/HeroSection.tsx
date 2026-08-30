import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Package, 
  Building2, 
  CheckCircle2, 
  Truck, 
  Laptop, 
  Monitor, 
  Tablet, 
  Boxes,
  Cpu
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
  return (
    <section className="relative overflow-hidden z-10 border-b border-slate-800/80 pt-8 pb-12">
      {/* Ambient background glow matching orange WAR COMPUTER logo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-orange-500/20 via-orange-600/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-5xl mx-auto space-y-6">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-xl border border-orange-500/40 text-orange-400 text-xs font-semibold shadow-lg shadow-orange-500/10">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping" />
            <span className="text-slate-200">Tier-1 OEM Distributor:</span>
            <span>Wholesale & Retail Direct Supply</span>
          </div>

          {/* Attractive Display Headline in Times New Roman matching high performance wholesale & retail tech */}
          <h1 
            className="font-serif-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.15] uppercase text-center select-none"
            style={{ fontFamily: "'Times New Roman', Times, 'Tinos', 'Liberation Serif', serif" }}
          >
            <span className="block text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] tracking-normal">
              HIGH PERFORMANCE COMPUTING.
            </span>
            <span className="block text-orange-500 drop-shadow-[0_2px_20px_rgba(249,115,22,0.4)] mt-1 sm:mt-1.5">
              <span className="block font-bold">WHOLESALE & RETAIL</span>
              <span className="block italic text-amber-400 font-semibold tracking-wide drop-shadow-[0_2px_16px_rgba(251,191,36,0.3)]">
                EXCELLENCE.
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            From single custom <strong className="text-white">RTX 4090 gaming battlestations</strong> and executive ultrabooks to <strong className="text-white">50-unit classroom Chromebook pallets</strong>. Instant inventory, secure escrow checkout, and 24/7 AI-guided technical support.
          </p>

          {/* Call-To-Action Button Group */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            
            {/* Primary CTA button linking directly to featured collections */}
            <button
              id="hero-explore-featured-cta-btn"
              onClick={onExploreCollections}
              className="px-6 sm:px-8 py-3.5 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-bold text-sm sm:text-base shadow-xl shadow-orange-600/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer border border-white/15"
            >
              <span>Explore Featured Collections</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* B2B Wholesale Quote CTA */}
            <button
              id="hero-wholesale-rfq-btn"
              onClick={onOpenRFQ}
              className="px-6 py-3.5 bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-xl border border-white/15 hover:border-orange-500/50 text-slate-100 rounded-xl font-semibold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-orange-500/10"
            >
              <Building2 className="w-4 h-4 text-orange-400" />
              <span>Request Wholesale Quote</span>
            </button>

            {/* AI Advisor CTA */}
            <button
              id="hero-ai-advisor-btn"
              onClick={onOpenAiAdvisor}
              className="px-5 py-3.5 bg-orange-500/10 hover:bg-orange-500/20 backdrop-blur-xl border border-orange-500/40 hover:border-orange-500 text-orange-300 rounded-xl font-semibold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>Ask AI Hardware Advisor</span>
            </button>
          </div>

          {/* Quick Value Metrics with glass styling */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto border-t border-white/10">
            <div className="flex items-center gap-2 justify-center text-xs text-slate-300 bg-slate-900/40 backdrop-blur-md py-2 px-3 rounded-xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>15,000+ Rigs Deployed</span>
            </div>
            <div className="flex items-center gap-2 justify-center text-xs text-slate-300 bg-slate-900/40 backdrop-blur-md py-2 px-3 rounded-xl border border-white/5">
              <ShieldCheck className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>3-Year Hardware SLA</span>
            </div>
            <div className="flex items-center gap-2 justify-center text-xs text-slate-300 bg-slate-900/40 backdrop-blur-md py-2 px-3 rounded-xl border border-white/5">
              <Truck className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>Same-Day Pallet Dispatch</span>
            </div>
            <div className="flex items-center gap-2 justify-center text-xs text-slate-300 bg-slate-900/40 backdrop-blur-md py-2 px-3 rounded-xl border border-white/5">
              <Zap className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>B2B Tax-Exempt Invoicing</span>
            </div>
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
