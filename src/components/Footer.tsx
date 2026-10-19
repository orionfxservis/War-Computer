import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Lock, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  BarChart3, 
  Building2,
  Sparkles,
  Bot,
  ArrowRight,
  CheckCircle2,
  Clock,
  Send,
  FileText,
  CreditCard,
  X
} from 'lucide-react';
import { ProductCategory, PricingMode, SiteThemeId } from '../types';
import { WarComputersLogo } from './WarComputersLogo';
import { EasypaisaLogo, JazzCashLogo } from './PaymentLogos';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenAnalytics: () => void;
  onOpenRFQ: () => void;
  onOpenTracking: () => void;
  onOpenAiAdvisor: () => void;
  onOpenAdmin?: () => void;
  onScrollToManageProducts?: () => void;
  pricingMode: PricingMode;
  onTogglePricingMode: (mode: PricingMode) => void;
  currentTheme?: SiteThemeId;
  onNavigatePage?: (page: 'privacy-policy' | 'terms-of-service' | 'cookie-policy' | 'disclaimer') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenAnalytics,
  onOpenRFQ,
  onOpenTracking,
  onOpenAiAdvisor,
  onOpenAdmin,
  onScrollToManageProducts,
  pricingMode,
  onTogglePricingMode,
  currentTheme,
  onNavigatePage
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<'privacy' | 'terms' | 'cookies' | 'disclaimer' | 'oem' | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 4000);
  };

  const legalContent: Record<'privacy' | 'terms' | 'cookies' | 'disclaimer' | 'oem', { title: string; tag: string; text: React.ReactNode }> = {
    privacy: {
      title: 'Privacy Policy',
      tag: 'Data Protection & Client Security',
      text: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>War Computers ("we", "our", or "us") is committed to protecting the privacy, security, and confidential records of all retail shoppers and institutional B2B wholesale partners across Pakistan.</p>
          <div>
            <h4 className="text-white font-bold mb-1">1. Information Collection</h4>
            <p>We collect essential order information including shipping addresses, customer contact details (phone, WhatsApp number, email), and transaction manifests solely to process orders, verify shipments, and coordinate door-to-door delivery across Karachi, Lahore, Islamabad, and nationwide.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">2. Payment Security</h4>
            <p>We do not store credit card numbers or sensitive banking PINs on our servers. Transactions processed via Bank Wire, Raast, POS, or Cash on Delivery (COD) adhere to strict PCI-DSS and financial privacy standards.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">3. Non-Disclosure Commitment</h4>
            <p>Customer contact lists, wholesale quotation pricing, and corporate dispatch manifests are strictly confidential. We never sell, rent, or distribute client credentials or transaction logs to any third-party marketing brokers.</p>
          </div>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      tag: 'Order, Warranty & Fulfillment Policy',
      text: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>Welcome to War Computers. By purchasing through our website, WhatsApp desk, or visiting our Saddar Karachi physical depot, you agree to our standard terms of service.</p>
          <div>
            <h4 className="text-white font-bold mb-1">1. Product Quality & Testing</h4>
            <p>All laptops, desktop workstations, and accessories undergo rigorous multi-point hardware diagnostic testing before dispatch. Technical specifications (RAM, SSD, GPU, display panel, battery health) are guaranteed as described.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">2. Depot Warranty & Checking Period</h4>
            <p>Brand New hardware carries full manufacturer warranty. Factory Certified and Refurbished Grade-A units include up to 1-Month to 3-Year War Depot checking & replacement warranty against internal hardware defects.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">3. Wholesale & Pallet Supply</h4>
            <p>Wholesale lots and institutional fleet orders adhere to agreed Minimum Order Quantities (MOQ). Advance pallet reservations require confirmed Purchase Order (PO) or initial token advance.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">4. Insured Nationwide Freight</h4>
            <p>Shipments across Pakistan are insured with reputable courier partners (TCS, Leopards, Daewoo Cargo). Customers must inspect parcel integrity upon handover.</p>
          </div>
        </div>
      )
    },
    cookies: {
      title: 'Cookie Policy',
      tag: 'Preferences & Storage Management',
      text: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>War Computers uses lightweight browser storage (cookies & LocalStorage) exclusively to maintain your shopping cart, pricing mode preferences (Retail vs. Wholesale), and customized visual theme settings.</p>
          <div>
            <h4 className="text-white font-bold mb-1">1. Essential Functional Storage</h4>
            <p>Stores cart items, quick-view session preferences, and order tracking queries so your session persists reliably without losing product selections.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">2. Theme & Display Preferences</h4>
            <p>Remembers your selected color theme (e.g., War Blue, Tech Cyan, Premium Gold, Modern Red, Clean White) for an optimal personal viewing experience across visits.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">3. No Invasive Tracking</h4>
            <p>We do not operate behavioral ad networks or cross-site tracking beacons. You may clear your browser cookies at any time without impacting basic browsing.</p>
          </div>
        </div>
      )
    },
    disclaimer: {
      title: 'Disclaimer',
      tag: 'Hardware Availability & Specifications',
      text: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>War Computers strives to keep pricing, specs, and real-time inventory counts up-to-date across all computing categories.</p>
          <div>
            <h4 className="text-white font-bold mb-1">1. Stock Availability & Market Rates</h4>
            <p>Due to dynamic international currency fluctuations and import freight schedules, wholesale lot prices and clearance inventory are subject to confirmation at the time of order issuance.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">2. Refurbished & Used Grading Standards</h4>
            <p>Grade-A refurbished hardware may carry minor cosmetic signs of handling consistent with pre-owned corporate surplus, but 100% operational hardware integrity and genuine internal components are verified.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">3. Brand Trademarks</h4>
            <p>Apple, ASUS, Dell, HP, Lenovo, MSI, Razer, Acer, Samsung, and Intel/AMD trademarks belong to their respective proprietary owners and are referenced strictly for hardware compatibility identification.</p>
          </div>
        </div>
      )
    },
    oem: {
      title: 'Tier-1 OEM Certified Distributor',
      tag: 'Direct Commercial Sourcing Standards',
      text: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>War Computers operates as an authorized distributor and tier-1 source for commercial business laptops, high-performance workstations, and enterprise computing hardware in Pakistan.</p>
          <div>
            <h4 className="text-white font-bold mb-1">1. Genuine Hardware Assurance</h4>
            <p>Every unit distributed through our wholesale channel is backed by genuine BIOS asset tags, authentic Intel/AMD silicon verification, and original power supply units (PSUs).</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">2. Comprehensive Hardware Stress Testing</h4>
            <p>Our technical depot subjects all machines to rigorous thermal stress tests, memory integrity verification (MemTest86), SSD health diagnostics (SMART 100%), and battery cycle life verification.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">3. Institutional B2B Fleet Supply</h4>
            <p>We support corporate IT deployments, university computer laboratories, software house bulk orders, and government institutions with official GST invoices and serial-tracked warranty manifests.</p>
          </div>
        </div>
      )
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 text-slate-400 text-xs relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.6)]">
      
      {/* Top Value Assurance Ribbon */}
      <div className="border-b border-white/10 py-6 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">3-Year War Depot SLA</h4>
              <p className="text-[11px] text-slate-400">Advance parts replacement & 24/7 technical support.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">Direct Pallet Freight</h4>
              <p className="text-[11px] text-slate-400">Insured express freight & dockside liftgate delivery.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">256-Bit Escrow Vault</h4>
              <p className="text-[11px] text-slate-400">PCI-DSS compliant, B2B ACH wire & secure settlement.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">WAR TECH AI Advisor</h4>
              <p className="text-[11px] text-slate-400">Real-time hardware matching & automated volume RFQs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand & Company Identity */}
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-1">
              <WarComputersLogo 
                size="md" 
                themeOverride={currentTheme} 
                variant="full" 
                className="max-w-[240px]"
              />
              <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-mono pl-1">
                Wholesale & Retail Direct
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Tier-1 computing hardware distributor supplying enterprise workstations, high-spec gaming rigs, educational Chromebook fleets, and wholesale liquidation lots worldwide.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Depots Online • Ready to Ship</span>
            </div>
          </div>

          {/* Column 2: Hardware Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Hardware Catalog
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('desktops')} className="hover:text-orange-400 transition-colors cursor-pointer text-left">
                  Desktops & RTX Gaming Rigs
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('laptops')} className="hover:text-orange-400 transition-colors cursor-pointer text-left">
                  Enterprise Laptops & ThinkPads
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('chromebooks')} className="hover:text-orange-400 transition-colors cursor-pointer text-left">
                  Education Chromebook Fleets
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('tablets')} className="hover:text-orange-400 transition-colors cursor-pointer text-left">
                  Tablets & 2-in-1 Hybrid Touch
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('workstations')} className="hover:text-orange-400 transition-colors cursor-pointer text-left">
                  AI & Deep Learning Compute
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('wholesale_lots')} className="hover:text-orange-400 font-bold text-orange-400 transition-colors cursor-pointer text-left">
                  Bulk Pallets & Liquidation Lots
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Wholesale Solutions */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Wholesale
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenRFQ} className="hover:text-orange-400 text-slate-200 font-semibold transition-colors cursor-pointer text-left">
                  Request Volume Quote (RFQ)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTogglePricingMode(pricingMode === 'wholesale' ? 'retail' : 'wholesale')} 
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Active Mode: <span className="font-bold text-orange-400">{pricingMode.toUpperCase()}</span> (Click to switch)
                </button>
              </li>
              <li>
                <button onClick={onOpenTracking} className="hover:text-orange-400 transition-colors cursor-pointer text-left">
                  Pallet Freight Tracking Portal
                </button>
              </li>
              <li>
                <button onClick={onOpenAnalytics} className="hover:text-orange-400 transition-colors cursor-pointer flex items-center gap-1.5 text-orange-300 font-semibold text-left">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Sales & Inventory Analytics</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenRFQ} className="hover:text-orange-400 transition-colors cursor-pointer text-left">
                  Net-30 B2B Credit Application
                </button>
              </li>
              <li>
                <button onClick={onOpenRFQ} className="hover:text-orange-400 transition-colors cursor-pointer text-left">
                  Tax-Exempt Reseller Validation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Support & Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenAiAdvisor} className="hover:text-orange-400 text-orange-400 font-bold flex items-center gap-1 cursor-pointer transition-colors text-left">
                  <Bot className="w-3.5 h-3.5" />
                  <span>WAR TECH AI Advisor</span>
                </button>
              </li>
              <li id="footer-whatsapp-link">
                <a href="https://wa.me/923330257246" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Live Representative</span>
                </a>
              </li>
              <li>
                <a href="#payment-and-cod-info" className="hover:text-orange-400 text-slate-300 font-medium flex items-center gap-1.5 transition-colors">
                  <CreditCard className="w-3.5 h-3.5 text-orange-400" />
                  <span>Payment Options & COD Policy</span>
                </a>
              </li>
              <li>
                <button onClick={onOpenTracking} className="hover:text-orange-400 transition-colors cursor-pointer text-left">
                  Warranty Claim & RMA Portal
                </button>
              </li>
              <li>
                <span className="text-slate-400">Custom BIOS & OS Imaging Available</span>
              </li>
              <li>
                <span className="text-slate-400">Pallet Manifest PDF Export</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Direct Contact & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Contact & Distribution
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>Office # 222, 2nd Floor, Regal Trade Center, Saddar, Karachi.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <a href="tel:+923330257246" className="hover:text-orange-400 transition-colors">+92 333 0257246</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <a href="mailto:info@warcomputer.com" className="hover:text-orange-400 transition-colors">info@warcomputer.com</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span>Mon - Sat 11:00 AM - 10:00 PM</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-[11px] text-slate-400 font-semibold mb-1.5">Wholesale Inventory Alerts:</p>
              {subscribed ? (
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed to stock manifests!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter business email"
                    required
                    className="flex-1 bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Payment Methods Verification Ribbon */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-orange-400" />
            <span className="font-bold text-slate-300">Supported Payment Methods:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-medium flex items-center gap-1.5">
              <span>💵</span>
              <span>Cash on Delivery (COD)</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-medium flex items-center gap-1.5">
              <span>🏦</span>
              <span>Bank Transfer (Meezan / Raast)</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-medium flex items-center gap-1.5 hover:border-emerald-500/40 transition-colors">
              <EasypaisaLogo className="w-4 h-4" />
              <span>Easypaisa</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-medium flex items-center gap-1.5 hover:border-amber-500/40 transition-colors">
              <JazzCashLogo className="w-4 h-4" />
              <span>JazzCash</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-medium flex items-center gap-1.5">
              <span>💳</span>
              <span>Online Payment (Visa / Master)</span>
            </span>
          </div>
        </div>

        {/* Bottom Bar: Links positioned directly under Copyright, spaced clear of bottom-right floating badge */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col items-start gap-3 text-[11px] text-slate-500 pb-16 md:pb-6 pr-0 md:pr-48">
          <div>
            © 2026 War Computers Inc. All rights reserved. Wholesale & Retail Computing Division. Designed by{' '}
            <a
              href="https://www.orionfx.net"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-slate-300 hover:text-orange-400 transition-colors underline decoration-orange-500/40 hover:decoration-orange-400"
            >
              "Orion Fx"
            </a>
          </div>

          {/* Legal Links under Copyright */}
          <div className="flex items-center gap-x-3 sm:gap-x-4 gap-y-2 flex-wrap text-[11px]">
            <button
              type="button"
              id="footer-privacy-policy-btn"
              onClick={() => {
                if (onNavigatePage) onNavigatePage('privacy-policy');
                else setActiveLegalDoc('privacy');
              }}
              className="hover:text-slate-300 hover:underline cursor-pointer transition-colors text-left"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <button
              type="button"
              id="footer-terms-service-btn"
              onClick={() => {
                if (onNavigatePage) onNavigatePage('terms-of-service');
                else setActiveLegalDoc('terms');
              }}
              className="hover:text-slate-300 hover:underline cursor-pointer transition-colors text-left"
            >
              Terms of Service
            </button>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <button
              type="button"
              id="footer-cookie-policy-btn"
              onClick={() => {
                if (onNavigatePage) onNavigatePage('cookie-policy');
                else setActiveLegalDoc('cookies');
              }}
              className="hover:text-slate-300 hover:underline cursor-pointer transition-colors text-left"
            >
              Cookie Policy
            </button>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <button
              type="button"
              id="footer-disclaimer-btn"
              onClick={() => {
                if (onNavigatePage) onNavigatePage('disclaimer');
                else setActiveLegalDoc('disclaimer');
              }}
              className="hover:text-slate-300 hover:underline cursor-pointer transition-colors text-left"
            >
              Disclaimer
            </button>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <button
              type="button"
              id="footer-oem-certified-btn"
              onClick={() => setActiveLegalDoc('oem')}
              className="text-orange-500 hover:text-orange-400 font-semibold cursor-pointer flex items-center gap-1.5 transition-colors text-left"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
              <span>Tier-1 OEM Certified</span>
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Legal Policy Modal Dialog */}
      {activeLegalDoc && (
        <div 
          id="legal-policy-modal-overlay"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveLegalDoc(null)}
        >
          <div 
            id="legal-policy-modal-container"
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {legalContent[activeLegalDoc].title}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {legalContent[activeLegalDoc].tag}
                  </p>
                </div>
              </div>

              <button
                id="close-legal-modal-btn"
                type="button"
                onClick={() => setActiveLegalDoc(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto">
              {legalContent[activeLegalDoc].text}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 text-[11px]">War Computers Legal &amp; Compliance Division</span>
              <button
                type="button"
                onClick={() => setActiveLegalDoc(null)}
                className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
              >
                Understood &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
