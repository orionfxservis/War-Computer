import React, { useState, useEffect } from 'react';
import { MessageCircle, Bot, ArrowUp, Sparkles, ShieldCheck } from 'lucide-react';

interface FloatingActionBarProps {
  onOpenAiSupport: () => void;
  onOpenAdmin?: () => void;
  onScrollToManageProducts?: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  onOpenAiSupport,
  onOpenAdmin,
  onScrollToManageProducts
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello War Computers Team! I'm interested in inquiring about retail computers or bulk wholesale pallet supply."
    );
    window.open(`https://wa.me/923330257246?text=${message}`, '_blank');
  };

  return (
    <div 
      id="floating-action-bar-container"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 sm:gap-3 bg-slate-950/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800 shadow-2xl shadow-black/80"
    >
      
      {/* 1. Floating WhatsApp Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={handleOpenWhatsApp}
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title="Chat on WhatsApp (+92 333 0257246)"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        
        {/* Tooltip */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-slate-100 text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-700 shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp Sales Desk
        </span>
      </button>

      {/* 2. Floating Online AI Support Button */}
      <button
        id="floating-online-support-btn"
        onClick={onOpenAiSupport}
        className="group relative flex items-center gap-2 px-3.5 sm:px-4 h-11 sm:h-12 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-orange-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title="24/7 AI Hardware Support & Recommender"
      >
        <div className="relative">
          <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse" />
        </div>
        <span className="hidden sm:inline">AI Online Support</span>

        {/* Tooltip for mobile */}
        <span className="sm:hidden absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-slate-100 text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-700 shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          AI Hardware Support
        </span>
      </button>

      {/* 3. Floating Admin Portal Button */}
      <button
        id="floating-admin-manager-btn"
        onClick={() => {
          if (onOpenAdmin) onOpenAdmin();
          else if (onScrollToManageProducts) onScrollToManageProducts();
        }}
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-orange-950/80 hover:bg-orange-900 border border-orange-500/40 hover:border-orange-400 text-orange-300 hover:text-white shadow-lg shadow-orange-950/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title="Admin Portal (/admin.html)"
      >
        <ShieldCheck className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />

        {/* Tooltip */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-orange-300 text-[11px] font-bold px-2.5 py-1 rounded-md border border-orange-500/30 shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Admin Portal (/admin.html)
        </span>
      </button>

      {/* 4. Floating Go to Top Button */}
      <button
        id="floating-go-to-top-btn"
        onClick={scrollToTop}
        className={`group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-orange-500/50 text-slate-200 hover:text-white shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer ${
          showScrollTop ? 'opacity-100' : 'opacity-60'
        }`}
        title="Scroll to Top"
      >
        <ArrowUp className="w-5 h-5 text-orange-400 group-hover:-translate-y-0.5 transition-transform" />

        {/* Tooltip */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-slate-100 text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-700 shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Go to Top
        </span>
      </button>

    </div>
  );
};
