import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { Product, PricingMode } from '../types';
import { ManageProductsSection } from './ManageProductsSection';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetToDefaults: () => void;
  onQuickView: (product: Product) => void;
  pricingMode: PricingMode;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetToDefaults,
  onQuickView,
  pricingMode
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-2xl flex items-start justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-7xl bg-slate-900/90 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden my-4">
        
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 p-0.5 shadow-lg shadow-orange-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-wide uppercase">
                WAR COMPUTERS • Admin Management Portal
              </h2>
              <p className="text-xs text-slate-400">
                Product Catalog Desk & Live Product Card Table Editor
              </p>
            </div>
          </div>

          <button
            id="close-admin-modal-btn"
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer shadow-md"
            title="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content: Full ManageProductsSection */}
        <div className="p-2 sm:p-6">
          <ManageProductsSection
            products={products}
            onAddProduct={onAddProduct}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
            onResetToDefaults={onResetToDefaults}
            onQuickView={onQuickView}
            pricingMode={pricingMode}
          />
        </div>

      </div>
    </div>
  );
};
