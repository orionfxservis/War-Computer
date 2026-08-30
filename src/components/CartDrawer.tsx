import React from 'react';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  FileText, 
  AlertTriangle,
  PackageCheck
} from 'lucide-react';
import { CartItem, PricingMode } from '../types';
import { formatPrice } from '../utils/formatCurrency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  pricingMode: PricingMode;
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpenCheckout: () => void;
  onOpenRFQ: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  pricingMode,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
  onOpenRFQ
}) => {
  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const isWholesale = pricingMode === 'wholesale';

  // Check if any wholesale items do not meet MOQ
  const hasMoqViolation = cart.some(
    item => item.isWholesaleOrder && item.quantity < item.product.wholesaleMOQ
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm transition-all">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Your Hardware Cart</h3>
              <p className="text-xs text-slate-400">{totalItems} units configured</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">Your Cart is Empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore our RTX 4090 desktop rigs, ThinkPads, Chromebook fleets, or bulk wholesale pallets.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow cursor-pointer"
              >
                Browse Hardware Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const moqViolated = item.isWholesaleOrder && item.quantity < item.product.wholesaleMOQ;
              
              return (
                <div
                  key={item.product.id}
                  className={`p-3 rounded-2xl bg-slate-950 border transition-all ${
                    moqViolated ? 'border-amber-500/80 bg-amber-950/10' : 'border-slate-800'
                  }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-800 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-500 hover:text-red-400 p-0.5 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-400 truncate">{item.product.specs.cpu}</p>

                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <span className="text-xs font-black text-orange-400">
                            {formatPrice(item.unitPrice)}
                          </span>
                          <span className="text-[10px] text-slate-500 ml-1">/ unit</span>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-slate-800 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-slate-800 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {moqViolated && (
                        <p className="text-[10px] text-amber-400 flex items-center gap-1 mt-1.5 font-semibold">
                          <AlertTriangle className="w-3 h-3" />
                          Wholesale minimum is {item.product.wholesaleMOQ} units for this item.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
            
            {/* Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({totalItems} Units):</span>
                <span className="font-bold text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Freight Logistics:</span>
                <span className="text-emerald-400 font-bold">Free Insured Air/Pallet</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Warranty Coverage:</span>
                <span className="text-slate-300">3-Year War Depot SLA</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Estimated Total:</span>
                <span className="text-orange-400">{formatPrice(subtotal)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                id="cart-proceed-checkout-btn"
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                disabled={hasMoqViolation}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="cart-convert-rfq-btn"
                onClick={() => {
                  onClose();
                  onOpenRFQ();
                }}
                className="w-full py-2 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-orange-400 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Export to Official B2B RFQ Quotation</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>256-Bit Escrow Encrypted • PCI-DSS Certified</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
