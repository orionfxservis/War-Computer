import React from 'react';
import { 
  ArrowLeft, 
  Cookie, 
  ShieldCheck, 
  Sliders, 
  Database, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Sparkles,
  Info
} from 'lucide-react';
import { WarComputersLogo } from '../components/WarComputersLogo';
import { SiteThemeId } from '../types';

interface PageProps {
  onBackToStore: () => void;
  currentTheme?: SiteThemeId;
}

export const CookiePolicyPage: React.FC<PageProps> = ({ onBackToStore, currentTheme }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleClearPreferences = () => {
    try {
      localStorage.removeItem('war_computers_site_theme');
      localStorage.removeItem('war_computers_cart');
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
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
              title="Print Cookie Policy"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
              Storage &amp; Cookies
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        
        {/* Document Header */}
        <div className="space-y-3 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase font-mono">
            <Cookie className="w-4 h-4" />
            <span>Browser Storage &amp; Session Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-sm text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Last Revised: October 2026</span>
            </span>
            <span>•</span>
            <span>Zero Third-Party Advertising Trackers</span>
          </p>
        </div>

        {/* Preamble Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            This Cookie Policy explains how <strong>War Computers</strong> uses cookies, browser storage tokens, and LocalStorage to power your digital shopping experience. We prioritize client privacy: our application relies strictly on functional first-party storage needed to operate shopping carts, remember your wholesale mode, and preserve your chosen color theme. We never employ third-party tracking beacons or sell your browsing history to advertising networks.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-orange-400" />
            <span>1. What Storage Technologies Do We Use?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            When you visit War Computers, small data files may be saved directly onto your device:
          </p>
          <div className="space-y-2.5 pt-1">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <strong className="text-white text-sm">HTML5 LocalStorage:</strong>
              <p className="text-slate-400">
                A modern client-side storage technology that allows fast, reliable persistence of your shopping cart, preferred visual palette (War Blue, Tech Cyan, Premium Gold, Modern Red, Clean White), and custom product manifests without slowing down your network connection.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <strong className="text-white text-sm">Session Cookies:</strong>
              <p className="text-slate-400">
                Temporary tokens created while you browse, automatically removed or expired when you close your browser tab.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-orange-400" />
            <span>2. Categories of Storage We Deploy</span>
          </h2>
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Strictly Essential &amp; Functional Storage
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold uppercase">Required</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Retains your cart contents, pricing toggle (Retail vs. Wholesale MOQ), quick-view specsheet modals, and consignment tracking lookups so you do not lose your selections while browsing our catalog.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> User Experience &amp; Theme Personalization
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-400 font-bold uppercase">Functional</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Saves your selected theme preference (e.g. Clean White or War Blue) under <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono">war_computers_site_theme</code>, preventing eye strain and ensuring visual consistency.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 opacity-75">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-slate-400" /> Third-Party Commercial Ad Trackers
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 font-bold uppercase">Disabled (None)</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                War Computers DOES NOT partner with third-party retargeting pixels, social media ad scrapers, or behavioral tracking networks.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-orange-400" />
            <span>3. How to Manage or Clear Your Browser Storage</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            You can configure your browser (Google Chrome, Microsoft Edge, Apple Safari, Mozilla Firefox) to block or delete cookies and LocalStorage at any time. You can also purge stored session tokens directly using the button below:
          </p>
          <div className="pt-2">
            <button
              onClick={handleClearPreferences}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>Reset Local Storage &amp; Theme Preferences</span>
            </button>
          </div>
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
