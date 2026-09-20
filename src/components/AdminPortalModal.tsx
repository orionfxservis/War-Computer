import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { Product, PricingMode } from '../types';
import { ManageProductsSection } from './ManageProductsSection';
import { WarComputersLogo } from './WarComputersLogo';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 flex items-start justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-7xl bg-slate-900 border border-white/15 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden my-4">
        
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-30 bg-slate-950 border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WarComputersLogo size="sm" variant="full" className="max-w-[200px]" />
            <div className="border-l border-white/10 pl-3 hidden sm:block">
              <h2 className="text-sm font-black text-white tracking-wide uppercase flex items-center gap-1.5">
                <span className="text-orange-400">Admin Management Portal</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Product Catalog Desk & Live Inventory Controller
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
