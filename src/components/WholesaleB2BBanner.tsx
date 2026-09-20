import React, { useState } from 'react';
import { 
  Building2, 
  Percent, 
  Truck, 
  FileCheck2, 
  ShieldAlert, 
  ArrowRight, 
  Layers, 
  Download,
  Boxes
} from 'lucide-react';
import { PricingMode } from '../types';
import { SectionCollapseButton } from './SectionCollapseButton';

interface WholesaleB2BBannerProps {
  pricingMode: PricingMode;
  onTogglePricingMode: (mode: PricingMode) => void;
  onOpenRFQ: () => void;
}

export const WholesaleB2BBanner: React.FC<WholesaleB2BBannerProps> = ({
  pricingMode,
  onTogglePricingMode,
  onOpenRFQ
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <section className="py-10 relative z-10 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`rounded-3xl bg-slate-900 border border-orange-500/30 p-6 sm:p-10 shadow-2xl shadow-orange-950/20 relative overflow-hidden transition-all ${isCollapsed ? 'py-6' : ''}`}>
          
          {/* Decorative subtle background accents */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(249,115,22,0.1),transparent)] pointer-events-none" />
          
          <div className="relative z-10">
            {/* Top Badge & Heading Row */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Building2 className="w-3.5 h-3.5" />
                War Computers B2B Wholesale Hub
              </div>

              {/* Heading aligned with SectionCollapseButton */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight flex-1">
                  Bulk Orders & Fleet Deployments With{' '}
                  <span className="text-orange-400">Guaranteed Tier Discounts</span>
                </h2>

                <SectionCollapseButton
                  isCollapsed={isCollapsed}
                  onToggle={() => setIsCollapsed(!isCollapsed)}
                  id="wholesale-banner-collapse-btn"
                />
              </div>
            </div>

            {/* Content when expanded */}
            {!isCollapsed && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-5">
                
                {/* Left Content */}
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Whether you are outfitting a 30-station engineering office, deploying 500 Chromebooks to a school district, or restocking an electronics retail storefront — our dedicated account executives provide factory-direct wholesale pricing, net-30 credit terms, and insured pallet freight.
                  </p>

                  {/* Tier Breakdown Chips */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="bg-slate-950 border border-slate-800/90 p-3 rounded-2xl shadow-sm hover:border-slate-700 transition-colors">
                      <div className="text-orange-400 font-black text-lg">15% - 20% OFF</div>
                      <div className="text-xs text-slate-300 font-semibold">Tier 1: 5 - 19 Units</div>
                      <div className="text-[10px] text-slate-400 mt-1">Small Business / Labs</div>
                    </div>

                    <div className="bg-slate-950 border border-orange-500/30 p-3 rounded-2xl shadow-sm hover:border-orange-500/50 transition-colors">
                      <div className="text-orange-400 font-black text-lg">25% - 30% OFF</div>
                      <div className="text-xs text-slate-200 font-semibold">Tier 2: 20 - 49 Units</div>
                      <div className="text-[10px] text-slate-400 mt-1">Mid-Size Corporate Fleets</div>
                    </div>

                    <div className="bg-slate-950 border border-orange-500/50 p-3 rounded-2xl bg-orange-950/20 shadow-md shadow-orange-950/30">
                      <div className="text-amber-400 font-black text-lg">Up to 40% OFF</div>
                      <div className="text-xs text-slate-200 font-bold">Tier 3: 50+ / Pallets</div>
                      <div className="text-[10px] text-orange-300/80 mt-1">Schools & Enterprise</div>
                    </div>
                  </div>
                </div>

                {/* Right Action Box */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-800/90 rounded-2xl p-6 space-y-5 shadow-2xl">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Boxes className="w-5 h-5 text-orange-500" />
                    Quick Wholesale Action
                  </h3>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <FileCheck2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span>Tax-Exempt Invoicing & VAT validation for certified resellers & schools.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Truck className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span>Custom shrink-wrapped pallet freight with liftgate delivery & tracking.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Percent className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span>Real-time dynamic wholesale price switch enabled on the entire catalog.</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      id="wholesale-banner-toggle-btn"
                      onClick={() => onTogglePricingMode('wholesale')}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                        pricingMode === 'wholesale'
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                          : 'bg-slate-900 hover:bg-slate-800 text-orange-400 border border-orange-500/40'
                      }`}
                    >
                      {pricingMode === 'wholesale' ? '✓ Wholesale Mode Active' : 'Switch To Wholesale Mode'}
                    </button>

                    <button
                      id="wholesale-banner-rfq-btn"
                      onClick={onOpenRFQ}
                      className="py-3 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Submit Custom RFQ</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
