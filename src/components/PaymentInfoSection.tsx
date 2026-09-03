import React, { useState } from 'react';
import { 
  CreditCard, 
  Banknote, 
  Building2, 
  Smartphone, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Check, 
  Copy, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  Lock,
  BadgeAlert
} from 'lucide-react';

interface PaymentInfoSectionProps {
  onOpenAiAdvisor?: () => void;
}

export const PaymentInfoSection: React.FC<PaymentInfoSectionProps> = ({ onOpenAiAdvisor }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'cod' | 'bank' | 'easypaisa' | 'jazzcash' | 'online'>('cod');

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const paymentMethods = [
    {
      id: 'cod' as const,
      name: 'Cash on Delivery',
      subtitle: 'Doorstep Courier & Showroom Pickup',
      icon: <Truck className="w-5 h-5 text-orange-400" />,
      badge: 'Popular for Retail',
      badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      summary: 'Pay with physical cash to the courier representative upon doorstep parcel delivery across all major cities.',
      details: [
        'Available nationwide in Pakistan (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta & 150+ towns).',
        'Delivered via certified logistics partners (TCS, Leopards, Trax, Call Courier).',
        'Open-box physical inspection allowed at our Saddar, Karachi retail showroom.',
        'Official printed warranty card and itemized commercial invoice included with the parcel.'
      ],
      notice: 'For expensive laptops and custom workstation rigs, advance delivery fee or payment confirmation is required before dispatch.'
    },
    {
      id: 'bank' as const,
      name: 'Bank Transfer',
      subtitle: 'Direct IBAN & Raast Instant Transfer',
      icon: <Building2 className="w-5 h-5 text-blue-400" />,
      badge: 'Recommended for B2B',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      summary: 'Instant 0% fee interbank settlement via Meezan Bank, HBL, Bank Alfalah, or any Raast-enabled banking app.',
      details: [
        'Meezan Bank & HBL corporate escrow accounts available for seamless transfers.',
        'Raast instant payments: 0% transaction fee across all Pakistani banks 24/7.',
        'Direct settlement for corporate procurement orders, B2B wholesale pallets, and tenders.',
        'Digital payment confirmation slip verified within 15 minutes.'
      ],
      bankInfo: {
        bankName: 'Meezan Bank Limited',
        accountTitle: 'WAR COMPUTERS PRIVATE LIMITED',
        accountNumber: '02010104829104',
        iban: 'PK14MEZN0002010104829104',
        raastId: '03002598858'
      }
    },
    {
      id: 'easypaisa' as const,
      name: 'Easypaisa',
      subtitle: 'Mobile Wallet & QR Payment',
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
      badge: 'Instant Wallet',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      summary: 'Send instant digital payments via your Easypaisa mobile app using our verified business mobile number or QR code.',
      details: [
        'Instant payment validation with immediate SMS receipt confirmation.',
        'Accessible from any Easypaisa account or authorized retailer shop nationwide.',
        'No hidden surcharges or extra gateway processing fees.',
        'Ideal for quick advance tokens and accessory orders.'
      ],
      walletInfo: {
        provider: 'Easypaisa Mobile Account',
        accountTitle: 'WAR COMPUTERS - SALES',
        accountNumber: '0300-2598858'
      }
    },
    {
      id: 'jazzcash' as const,
      name: 'JazzCash',
      subtitle: 'Mobile Account & Retailer Till',
      icon: <Banknote className="w-5 h-5 text-amber-400" />,
      badge: 'Fast & Secure',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      summary: 'Transfer directly using the JazzCash app or via any biometric JazzCash franchise agent across Pakistan.',
      details: [
        'Instant transaction ID validation with automated order status updates.',
        'Available via app transfer or OTC (Over-The-Counter) cash deposit at local retailers.',
        'Zero commission on direct wallet-to-wallet transfers.',
        'Instant confirmation screenshot can be shared on WhatsApp for express dispatch.'
      ],
      walletInfo: {
        provider: 'JazzCash Merchant / Mobile',
        accountTitle: 'WAR COMPUTERS KARACHI',
        accountNumber: '0300-2598858'
      }
    },
    {
      id: 'online' as const,
      name: 'Online Payment',
      subtitle: 'Debit / Credit Cards & 3D Secure',
      icon: <CreditCard className="w-5 h-5 text-purple-400" />,
      badge: '256-Bit SSL Encrypted',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      summary: 'Pay securely using Visa, Mastercard, PayPak, or UnionPay debit and credit cards with mandatory 3D Secure OTP verification.',
      details: [
        'Protected by bank-grade 256-bit SSL encryption and tokenized vault storage.',
        'Visa, Mastercard, PayPak, and international cards accepted.',
        'Mandatory One-Time Password (OTP) sent directly to your phone by your issuing bank.',
        'Immediate digital invoice and automated receipt generated upon success.'
      ]
    }
  ];

  const currentMethod = paymentMethods.find(m => m.id === activeTab) || paymentMethods[0];

  return (
    <section 
      id="payment-and-cod-info" 
      className="py-12 sm:py-16 relative z-10 border-t border-slate-800/80 overflow-hidden bg-slate-950/40"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">💳</span>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest font-mono">
                TRANSPARENT TRANSACTION METHODS • VERIFIED LOGISTICS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mt-1">
              Payment Options & COD Policy
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Clear, transparent, and secure payment methods for retail customers and corporate procurement across Pakistan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Accounts
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-orange-400" />
              256-Bit Escrow Vault
            </span>
          </div>
        </div>

        {/* PROMINENT EXPENSIVE LAPTOPS POLICY CALLOUT */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-orange-950/30 to-slate-900/60 border border-amber-500/40 shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
              <BadgeAlert className="w-6 h-6" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-500/30 font-mono">
                  Dispatch Safety Policy
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  Payment confirmation required before dispatch
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                For expensive laptops, high-performance workstation towers, and custom gaming rigs, our policy requires <strong className="text-white">payment confirmation or an advance delivery token</strong> before parcel dispatch. This ensures dedicated insured shipping, protects high-value hardware during transit, and prevents fraudulent consignments.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>30-min telephone/WhatsApp confirmation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>100% insured transit with fragile sealing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800">
                  <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Tracking ID dispatched immediately</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 SUPPORTED PAYMENT METHODS GRID / TABS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Method Selection List (5 columns on desktop) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 font-mono">
              Supported Payment Methods
            </h4>

            <div className="space-y-2.5">
              {paymentMethods.map((method) => {
                const isActive = activeTab === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setActiveTab(method.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-slate-900 border-orange-500/80 shadow-lg shadow-orange-500/10'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {method.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-200'}`}>
                            {method.name}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{method.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${method.badgeColor}`}>
                        {method.badge}
                      </span>
                      <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'text-orange-400 translate-x-0.5' : 'text-slate-600'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Method Information Card */}
          <div className="lg:col-span-7 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-5 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center">
                  {currentMethod.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">{currentMethod.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentMethod.badgeColor}`}>
                      {currentMethod.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{currentMethod.subtitle}</p>
                </div>
              </div>

              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Method
              </span>
            </div>

            {/* Summary description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {currentMethod.summary}
            </p>

            {/* Key details list */}
            <div className="space-y-2.5 mb-6">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Method Highlights & Features
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentMethod.details.map((detail, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300"
                  >
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Transfer Specifics */}
            {currentMethod.bankInfo && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-wider font-mono">
                    Official Escrow Banking Credentials
                  </span>
                  <span className="text-[11px] text-slate-400">0% Interbank Fee</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                    <span className="text-slate-400">Bank Name:</span>
                    <strong className="text-white font-mono">{currentMethod.bankInfo.bankName}</strong>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                    <span className="text-slate-400">Account Title:</span>
                    <strong className="text-white font-mono">{currentMethod.bankInfo.accountTitle}</strong>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                    <span className="text-slate-400">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <strong className="text-orange-400 font-mono">{currentMethod.bankInfo.accountNumber}</strong>
                      <button
                        onClick={() => handleCopy(currentMethod.bankInfo!.accountNumber, 'acc')}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                        title="Copy Account Number"
                      >
                        {copiedKey === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                    <span className="text-slate-400">IBAN:</span>
                    <div className="flex items-center gap-2">
                      <strong className="text-orange-400 font-mono text-[11px]">{currentMethod.bankInfo.iban}</strong>
                      <button
                        onClick={() => handleCopy(currentMethod.bankInfo!.iban, 'iban')}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                        title="Copy IBAN"
                      >
                        {copiedKey === 'iban' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                    <span className="text-slate-400">Raast Instant ID:</span>
                    <div className="flex items-center gap-2">
                      <strong className="text-emerald-400 font-mono">{currentMethod.bankInfo.raastId}</strong>
                      <button
                        onClick={() => handleCopy(currentMethod.bankInfo!.raastId, 'raast')}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                        title="Copy Raast ID"
                      >
                        {copiedKey === 'raast' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Wallet Info (Easypaisa / JazzCash) */}
            {currentMethod.walletInfo && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    Mobile Wallet Details
                  </span>
                  <span className="text-[11px] text-slate-400">Instant Verification</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                    <span className="text-slate-400">Service:</span>
                    <strong className="text-white font-mono">{currentMethod.walletInfo.provider}</strong>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                    <span className="text-slate-400">Account Title:</span>
                    <strong className="text-white font-mono">{currentMethod.walletInfo.accountTitle}</strong>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                    <span className="text-slate-400">Account / Mobile Number:</span>
                    <div className="flex items-center gap-2">
                      <strong className="text-emerald-400 font-mono text-sm">{currentMethod.walletInfo.accountNumber}</strong>
                      <button
                        onClick={() => handleCopy(currentMethod.walletInfo!.accountNumber, 'wallet')}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                        title="Copy Number"
                      >
                        {copiedKey === 'wallet' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* COD Specific Notice */}
            {currentMethod.id === 'cod' && (
              <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-start gap-3 mb-6">
                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Nationwide Cash Handling Policy:</strong>
                  <span>{currentMethod.notice}</span>
                </div>
              </div>
            )}

            {/* Footer Support Quick Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Need payment assistance or receipt submission?</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/923002598858?text=Hello%20War%20Computers,%20I%20have%20a%20question%20about%20payment%20and%20COD%20options"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Billing Desk</span>
                </a>

                {onOpenAiAdvisor && (
                  <button
                    onClick={onOpenAiAdvisor}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                    <span>Ask AI Advisor</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
