import React from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  CreditCard, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Printer, 
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { WarComputersLogo } from '../components/WarComputersLogo';
import { SiteThemeId } from '../types';

interface PageProps {
  onBackToStore: () => void;
  currentTheme?: SiteThemeId;
}

export const PrivacyPolicyPage: React.FC<PageProps> = ({ onBackToStore, currentTheme }) => {
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
              title="Print Policy Document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              Official Policy
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        
        {/* Document Header */}
        <div className="space-y-3 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 tracking-wider uppercase font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal Compliance &amp; Client Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Last Revised: October 2026</span>
            </span>
            <span>•</span>
            <span>Version: 3.2 (Retail &amp; B2B Wholesale)</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">100% Confidential Guarantee</span>
          </p>
        </div>

        {/* Executive Summary Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-orange-500/30 shadow-lg space-y-3 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
          <h3 className="text-sm font-bold text-orange-300 uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-orange-400" />
            Executive Summary for War Computers Customers
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            War Computers operates as Pakistan’s dedicated wholesale and retail distributor for enterprise laptops, gaming desktops, Chromebooks, and computer accessories. We treat all client records, quotations, dispatch addresses, and B2B orders with the strictest confidentiality. We do not sell, rent, or trade your personal information with external advertising syndicates.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-orange-400" />
            <span>1. Information We Collect</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            When you browse our catalog, place an order online, request a wholesale volume quotation (RFQ), or contact our sales team via WhatsApp or telephone, we collect the necessary business and personal data required to service your order:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-4 list-disc marker:text-orange-400">
            <li><strong>Contact Details:</strong> Customer name, business name, NTN/STRN (for corporate tax invoices), email address, and direct WhatsApp / mobile numbers.</li>
            <li><strong>Shipping &amp; Logistics Coordinates:</strong> Street address, city (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Quetta, and nationwide), postal codes, and special delivery notes.</li>
            <li><strong>Commercial Quotation Manifests:</strong> Requested hardware configurations, unit counts, target budget, and wholesale payment preferences.</li>
            <li><strong>Technical Session Records:</strong> Device hardware preferences, cart selections, and active visual color theme stored in browser LocalStorage.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-orange-400" />
            <span>2. How We Utilize Customer Information</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your data is utilized strictly for operational fulfillment and legitimate business correspondence:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
              <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dispatch &amp; Fulfillment
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Coordinating nationwide door-to-door courier deliveries with TCS, Leopards, Daewoo Cargo, and internal Karachi courier vans.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
              <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Warranty &amp; RMA Tracking
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Logging machine serial numbers, check-in timestamps, and testing reports for verified warranty coverage and technical repairs.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
              <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time Support
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Communicating order status updates, airway bill tracking numbers, and technical spec sheets directly to your WhatsApp.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
              <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Accounting &amp; Compliance
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Generating valid sales tax invoices, NTN clearance documentation, and bank wire reconciliation in compliance with Pakistani commercial laws.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-orange-400" />
            <span>3. Payment Security &amp; Banking Privacy</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We adhere to strict financial privacy standards across all supported payment channels:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-4 list-disc marker:text-orange-400">
            <li><strong>No Stored Financial Credentials:</strong> War Computers does not record, log, or store sensitive credit card CVV codes or internet banking passwords on its web servers.</li>
            <li><strong>Bank Transfers &amp; Raast:</strong> All bank wire reconciliations are matched directly against our verified corporate accounts (Meezan Bank / State Bank Raast Portal).</li>
            <li><strong>Mobile Wallets:</strong> Easypaisa and JazzCash payments are verified in real time through verified transaction IDs (TID).</li>
            <li><strong>Cash on Delivery (COD):</strong> Handled securely with physical receipts issued upon door-to-door handoff.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-orange-400" />
            <span>4. Non-Disclosure &amp; Third-Party Restrictions</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Under no circumstances do we monetize customer lists, corporate IT contacts, wholesale price quotes, or individual purchasing histories. Third-party data access is strictly limited to authorized logistics freight carriers solely for parcel routing purposes.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-400" />
            <span>5. Client Data Rights &amp; Rectification</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            You retain full ownership of your records. At any point, you may contact our customer privacy officer to request a complete summary of your registered purchase history, update contact coordinates, or request the purging of non-tax operational contact records.
          </p>
        </section>

        {/* Contact Desk Footer Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Mail className="w-4 h-4 text-orange-400" />
            Contact Privacy &amp; Data Compliance Officer
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            For questions or requests concerning your personal or institutional data privacy, reach our dedicated desk:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block mb-1 font-mono text-[10px]">DIRECT WHATSAPP</span>
              <strong className="text-white">+92 333 0257246</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block mb-1 font-mono text-[10px]">EMAIL INQUIRIES</span>
              <strong className="text-white">orionfxservis@gmail.com</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block mb-1 font-mono text-[10px]">PHYSICAL STORE DEPOT</span>
              <strong className="text-white">Saddar, Karachi, Pakistan</strong>
            </div>
          </div>
        </div>

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
