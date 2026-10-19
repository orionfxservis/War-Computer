import React from 'react';
import { 
  ArrowLeft, 
  FileText, 
  ShieldCheck, 
  Truck, 
  Clock, 
  PackageCheck, 
  CheckCircle2, 
  CreditCard, 
  AlertCircle, 
  Printer, 
  Building2,
  RefreshCw
} from 'lucide-react';
import { WarComputersLogo } from '../components/WarComputersLogo';
import { SiteThemeId } from '../types';

interface PageProps {
  onBackToStore: () => void;
  currentTheme?: SiteThemeId;
}

export const TermsOfServicePage: React.FC<PageProps> = ({ onBackToStore, currentTheme }) => {
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
              title="Print Terms Document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
              Terms &amp; Conditions
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        
        {/* Document Header */}
        <div className="space-y-3 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 tracking-wider uppercase font-mono">
            <FileText className="w-4 h-4" />
            <span>Commercial Supply &amp; Customer Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Effective Date: October 2026</span>
            </span>
            <span>•</span>
            <span>Applicable across Pakistan</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Authorized OEM Supply</span>
          </p>
        </div>

        {/* Preamble Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            These Terms of Service ("Agreement") govern all orders, quotes, deliveries, warranty servicing, and commercial purchases placed with <strong>War Computers</strong> (operating our physical retail depot in Saddar, Karachi, and digital portals across Pakistan). By browsing our catalog, placing a cart order, issuing a Purchase Order (PO), or ordering via WhatsApp, you agree to be bound by these provisions.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-orange-400" />
            <span>1. Product Authenticity &amp; Condition Grading</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            War Computers sells both Brand New factory units and certified corporate surplus / refurbished hardware. Each product listing clearly specifies its condition grade:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="px-2 py-0.5 rounded font-black text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                Brand New
              </span>
              <p className="text-slate-300">
                Factory-sealed box units complete with all original accessories, direct manufacturer warranty cards, and untouched hardware.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="px-2 py-0.5 rounded font-black text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 uppercase">
                Factory Certified
              </span>
              <p className="text-slate-300">
                OEM certified open-box or surplus units, inspected for 100% operational integrity with factory chargers and verified serial tags.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="px-2 py-0.5 rounded font-black text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                Refurbished Grade-A
              </span>
              <p className="text-slate-300">
                Thoroughly tested enterprise workstations and laptops with minimal cosmetic marks, 100% genuine internal components, and clean batteries.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-orange-400" />
            <span>2. Pricing, Currencies &amp; Wholesale Tiers</span>
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-4 list-disc marker:text-orange-400">
            <li><strong>Currency:</strong> All prices are quoted in Pakistani Rupees (PKR / Rs.) inclusive of applicable sales taxes unless specifically invoiced under an NTN exemption.</li>
            <li><strong>Wholesale Minimum Order Quantity (MOQ):</strong> Bulk orders qualify for tiered volume discounts based on minimum quantities (e.g., 5, 10, or 25 units per lot).</li>
            <li><strong>Price Validity:</strong> Due to global silicon shortages and exchange rate variations, quotation prices on wholesale pallet lots are valid for 7 calendar days from issuance.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Truck className="w-5 h-5 text-orange-400" />
            <span>3. Shipping, Freight &amp; Delivery Inspection</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We provide nationwide delivery through tracked, insured courier networks (TCS, Leopards, Daewoo Cargo) and dedicated Karachi city dispatch:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-4 list-disc marker:text-orange-400">
            <li><strong>Transit Times:</strong> 24 to 48 hours for Karachi metro; 2 to 4 business days for Punjab, KPK, Balochistan, and northern regions.</li>
            <li><strong>Inspection upon Receipt:</strong> The recipient must verify that the outer courier security seal is intact before signing the consignment receipt.</li>
            <li><strong>Damage Claims:</strong> Any physical transit damage must be documented with photos/videos and reported to War Computers WhatsApp (+92 333 0257246) within 24 hours of delivery.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-orange-400" />
            <span>4. Warranty &amp; Return / Replacement Policy</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            War Computers stands firmly behind the reliability of every machine dispatched:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-300">
            <p>• <strong>Checking Period:</strong> All retail laptops and computers carry a minimum 1-Month War Depot hardware checking warranty (extendable up to 3 years under Enterprise SLAs).</p>
            <p>• <strong>Dead on Arrival (DOA):</strong> Units exhibiting internal hardware failure within 7 days of delivery will receive immediate direct swap replacement or technical repair at our Saddar depot.</p>
            <p>• <strong>Warranty Exclusions:</strong> Warranty does not cover accidental liquid spillage, intentional physical drops, burnt circuit boards from external electrical surges, or tampering with internal warranty stickers.</p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-400" />
            <span>5. Institutional B2B Orders &amp; Corporate Supply</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            For educational institutions, universities, call centers, and software companies purchasing fleet computers:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-4 list-disc marker:text-orange-400">
            <li>Official GST invoices, NTN certificates, and vendor registration documents are provided with every consignment.</li>
            <li>Purchase Orders (PO) must be signed by an authorized corporate signatory.</li>
            <li>Dedicated technician support is provided for bulk deployment and OS imaging.</li>
          </ul>
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
