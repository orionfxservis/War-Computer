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
  CreditCard
} from 'lucide-react';
import { ProductCategory, PricingMode } from '../types';

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
  onTogglePricingMode
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-slate-950/80 backdrop-blur-2xl border-t border-white/10 text-slate-400 text-xs relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.6)]">
      
      {/* Top Value Assurance Ribbon */}
      <div className="border-b border-white/10 py-6 bg-slate-900/40 backdrop-blur-xl">
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
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-orange-500/20">
                W
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-wider">
                  WAR <span className="text-orange-500">COMPUTERS</span>
                </span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                  Wholesale & Retail Direct
                </span>
              </div>
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

          {/* Column 3: Wholesale & B2B Solutions */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Wholesale & B2B
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
                <button 
                  onClick={() => {
                    if (onOpenAdmin) onOpenAdmin();
                    else if (onScrollToManageProducts) onScrollToManageProducts();
                  }} 
                  className="hover:text-orange-300 text-orange-400 font-bold flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal & Orders (/admin.html)</span>
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

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
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
          <div className="flex items-center gap-4 flex-wrap">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Escrow</span>
            <span className="hover:text-slate-300 cursor-pointer">B2B Net-30 Terms</span>
            <span className="text-orange-500 font-semibold">Tier-1 OEM Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
