import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Star, 
  ShieldCheck, 
  Truck, 
  Cpu, 
  Zap, 
  HardDrive, 
  Monitor, 
  Battery, 
  Building2, 
  Layers, 
  Check, 
  PackageCheck,
  FileText
} from 'lucide-react';
import { Product, PricingMode } from '../types';
import { formatPrice } from '../utils/formatCurrency';
import { ConditionBadge, getConditionInfo } from './ConditionBadge';
import { StockBadge } from './StockBadge';

interface ProductQuickViewModalProps {
  product: Product | null;
  pricingMode: PricingMode;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, isWholesale: boolean) => void;
  onOpenRFQWithProduct: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  pricingMode,
  onClose,
  onAddToCart,
  onOpenRFQWithProduct,
  onToggleCompare,
  isCompared
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const isWholesale = pricingMode === 'wholesale';
  const [quantity, setQuantity] = useState<number>(isWholesale ? product.wholesaleMOQ : 1);
  const [activeTab, setActiveTab] = useState<'specs' | 'wholesale-tiers' | 'warranty'>('specs');

  // Calculate unit price based on tiered volume
  const getCalculatedPrice = (qty: number) => {
    if (!isWholesale) return product.retailPrice;
    const tier = [...product.wholesaleTiers].reverse().find(t => qty >= t.minUnits);
    return tier ? tier.pricePerUnit : product.wholesalePrice;
  };

  const currentUnitPrice = getCalculatedPrice(quantity);
  const subtotal = currentUnitPrice * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
              {product.brand} • SKU: {product.sku}
            </span>
            {product.isBulkLot && (
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                Pallet Lot ({product.lotUnitCount} Units)
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left: Gallery Column */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-video sm:aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <ConditionBadge condition={product.condition} />
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                        selectedImageIndex === i
                          ? 'border-orange-500 shadow-md shadow-orange-500/20'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}

              {/* Condition Guarantee Card */}
              <div className="bg-slate-950/80 rounded-xl p-3.5 border border-white/10 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Verified Condition:</span>
                  <ConditionBadge condition={product.condition} size="sm" />
                </div>
                <p className="text-slate-300 text-[11px]">
                  {getConditionInfo(product.condition).subLabel}
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-emerald-400 font-bold text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {product.specs?.warranty || getConditionInfo(product.condition).defaultWarranty}
                  </span>
                  <span className="text-slate-400 font-normal">100% Tested OK</span>
                </div>
              </div>
            </div>

            {/* Right: Info & Pricing Column */}
            <div className="space-y-5">
              
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">({product.reviewsCount} customer reviews)</span>
                  </div>

                  <StockBadge stockQuantity={product.stockQuantity} size="sm" showExactUnits />
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Dynamic Price Box */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-white">
                        {formatPrice(currentUnitPrice)}
                      </span>
                      <span className="text-xs text-slate-400">/ unit</span>
                    </div>
                    {isWholesale && (
                      <p className="text-xs text-orange-400 font-bold mt-0.5">
                        Wholesale Tier Active (MOQ: {product.wholesaleMOQ} Units)
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Subtotal</span>
                    <p className="text-lg font-black text-orange-400">
                      {formatPrice(subtotal)}
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <label className="text-xs font-bold text-slate-300 uppercase">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(isWholesale ? product.wholesaleMOQ : 1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold hover:bg-slate-800 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold hover:bg-slate-800 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Tab Navigation (Specs, Wholesale Tiers, Warranty) */}
              <div className="flex border-b border-slate-800">
                {[
                  { id: 'specs', label: 'Technical Specs' },
                  { id: 'wholesale-tiers', label: 'Volume Tiers' },
                  { id: 'warranty', label: 'SLA & Logistics' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`px-3.5 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                      activeTab === t.id
                        ? 'border-orange-500 text-orange-400'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[140px] text-xs">
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-500 font-medium block">Processor (CPU):</span>
                      <span className="font-semibold text-slate-100">{product.specs.cpu}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-500 font-medium block">Graphics (GPU):</span>
                      <span className="font-semibold text-slate-100">{product.specs.gpu}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-500 font-medium block">System RAM:</span>
                      <span className="font-semibold text-slate-100">{product.specs.ram}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-500 font-medium block">Primary Storage:</span>
                      <span className="font-semibold text-slate-100">{product.specs.storage}</span>
                    </div>
                    {product.specs.display && (
                      <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 col-span-full">
                        <span className="text-slate-500 font-medium block">Display:</span>
                        <span className="font-semibold text-slate-100">{product.specs.display}</span>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'wholesale-tiers' && (
                  <div className="space-y-2">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-800">
                          <th className="pb-1 font-semibold">Tier Volume</th>
                          <th className="pb-1 font-semibold">Price per Unit</th>
                          <th className="pb-1 font-semibold">Discount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {product.wholesaleTiers.map((tier, idx) => (
                          <tr key={idx} className={quantity >= tier.minUnits && (!tier.maxUnits || quantity <= tier.maxUnits) ? 'bg-orange-500/10 text-orange-300 font-bold' : 'text-slate-300'}>
                            <td className="py-1.5">{tier.minUnits} {tier.maxUnits ? `- ${tier.maxUnits} units` : '+ units'}</td>
                            <td className="py-1.5">{formatPrice(tier.pricePerUnit)}</td>
                            <td className="py-1.5 text-emerald-400">{tier.discountPercentage > 0 ? `${tier.discountPercentage}% OFF` : 'MSRP'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'warranty' && (
                  <div className="space-y-2 text-slate-300">
                    <p>• <strong>Warranty Coverage:</strong> {product.specs.warranty}</p>
                    <p>• <strong>Packaging:</strong> Factory master sealed with individualized barcoded asset labels.</p>
                    <p>• <strong>Shipping:</strong> Domestic express air freight or shrink-wrapped wooden pallet delivery.</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={() => {
                    onAddToCart(product, quantity, isWholesale);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add {quantity} to Cart (${subtotal.toLocaleString()})</span>
                </button>

                <button
                  id="modal-request-quote-btn"
                  onClick={() => {
                    onClose();
                    onOpenRFQWithProduct(product);
                  }}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-orange-300 border border-orange-500/30 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Custom RFQ</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
