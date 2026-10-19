import React from 'react';
import { 
  ArrowLeft, 
  AlertTriangle, 
  ShieldAlert, 
  Cpu, 
  DollarSign, 
  Sparkles, 
  Printer, 
  Clock, 
  CheckCircle2,
  Layers,
  Building2
} from 'lucide-react';
import { WarComputersLogo } from '../components/WarComputersLogo';
import { SiteThemeId } from '../types';

interface PageProps {
  onBackToStore: () => void;
  currentTheme?: SiteThemeId;
}

export const DisclaimerPage: React.FC<PageProps> = ({ onBackToStore, currentTheme }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStore}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer shadow-sm active:scale-95"
              title="Return to War Computers Catalog"
            >
              <ArrowLeft className="w-4 h-4 text-orange-400" />
              <span>Back to Store</span>
            </button>
            <div className="h-5 w-px bg-slate-800 hidden sm:block" />
            <WarComputersLogo size="sm" themeOverride={currentTheme} variant="wordmark" className="hidden sm:inline-flex" />
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
              title="Print Disclaimer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
              Legal Notice
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        
        {/* Document Header */}
        <div className="space-y-3 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase font-mono">
            <ShieldAlert className="w-4 h-4" />
            <span>Product Specifications &amp; Market Disclosure</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Disclaimer
          </h1>
          <p className="text-sm text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Effective Date: October 2026</span>
            </span>
            <span>•</span>
            <span>Applies to Online, WhatsApp &amp; In-Store Purchases</span>
          </p>
        </div>

        {/* Important Advisory Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-lg space-y-3 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white block font-bold">Important Notice Regarding Hardware Information</strong>
              <p>
                The information, pricing, technical benchmarks, and inventory levels presented across the War Computers website and promotional materials are published in good faith. We endeavor to ensure all specs (processors, dedicated graphics cards, NVMe storage speeds, screen resolutions, battery cycle counts) are accurate and validated through physical depot diagnostic benchmarking.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-400" />
            <span>1. Pricing &amp; Market Fluctuations</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Due to rapid fluctuations in international foreign exchange rates (USD / PKR), semiconductor import tariffs, and global logistics freight surcharges:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-4 list-disc marker:text-orange-400">
            <li>Retail prices and wholesale pallet quotation manifests are subject to real-time market reconfirmation upon checkout or invoice issuance.</li>
            <li>In the unlikely event that a computer is listed at an incorrect price due to typographical error or automated database import sync, War Computers reserves the right to decline or correct the order prior to dispatch.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-orange-400" />
            <span>2. Refurbished &amp; Pre-Owned Hardware Transparency</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            War Computers specializes heavily in Tier-1 corporate surplus and factory certified laptops:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-4 list-disc marker:text-orange-400">
            <li><strong>Cosmetic Condition:</strong> Grade-A refurbished machines are fully tested and certified 100% operational internally, but may carry minor exterior signs of handling, keyboard wear, or casing marks typical of commercial off-lease hardware.</li>
            <li><strong>Battery Expectancy:</strong> Batteries in pre-owned laptops are tested to hold a healthy operational charge (typically 75% to 95%+ of original design capacity). However, as chemical consumables, exact runtime varies depending on workload, brightness, and ambient temperatures.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-orange-400" />
            <span>3. Gaming FPS &amp; Technical Benchmark Estimates</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Any gaming frame rate estimates (e.g. 144+ FPS in CS2, GTA V, Valorant, Cyberpunk 2077) or AI training metrics referenced by our AI Hardware Advisor or spec sheets represent typical laboratory bench tests under specific resolutions and graphics presets. Real-world performance may vary depending on driver updates, background software, thermal ventilation, and resolution settings.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-400" />
            <span>4. Trademark &amp; Brand Attribution Notice</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Apple, ASUS, Dell, HP, Lenovo, ThinkPad, MSI, Razer, Acer, Samsung, Intel, AMD, NVIDIA, GeForce, and Microsoft Windows trademarks, brand names, and logos are the registered intellectual property of their respective manufacturer corporations. Their appearance on this platform is strictly descriptive to identify genuine hardware compatibility and original OEM component specifications.
          </p>
        </section>

        {/* Bottom Navigation */}
        <div className="pt-6 border-t border-slate-800 flex justify-center">
          <button
            onClick={onBackToStore}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm shadow-lg shadow-orange-600/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Hardware Store</span>
          </button>
        </div>

      </main>
    </div>
  );
};
