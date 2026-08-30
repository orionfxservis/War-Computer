import React from 'react';
import { X, ShoppingCart, Trash2, Check, Layers, Cpu, Zap, HardDrive, ShieldCheck } from 'lucide-react';
import { Product, PricingMode } from '../types';
import { formatPrice } from '../utils/formatCurrency';

interface ComparisonModalProps {
  products: Product[];
  pricingMode: PricingMode;
  onClose: () => void;
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
  onAddToCart: (product: Product, quantity: number, isWholesale: boolean) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  products,
  pricingMode,
  onClose,
  onRemoveProduct,
  onClearAll,
  onAddToCart
}) => {
  if (products.length === 0) return null;
  const isWholesale = pricingMode === 'wholesale';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-bold text-white">Side-by-Side Hardware Comparison ({products.length}/4)</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="p-6 overflow-x-auto flex-1">
          <table className="w-full min-w-[700px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-3 text-xs font-bold text-slate-400 uppercase w-48 bg-slate-950/40">Specification</th>
                {products.map((product) => (
                  <th key={product.id} className="p-3 min-w-[220px] align-top">
                    <div className="relative bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2">
                      <button
                        onClick={() => onRemoveProduct(product.id)}
                        className="absolute top-2 right-2 text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-24 object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                      <h4 className="text-xs font-bold text-white line-clamp-2">{product.name}</h4>
                      <p className="text-sm font-black text-orange-400">
                        {formatPrice(isWholesale ? product.wholesalePrice : product.retailPrice)}
                        {isWholesale && <span className="text-[10px] text-slate-400 font-normal ml-1">(MOQ {product.wholesaleMOQ}+)</span>}
                      </p>
                      <button
                        onClick={() => onAddToCart(product, isWholesale ? product.wholesaleMOQ : 1, isWholesale)}
                        className="w-full py-1.5 px-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 shadow cursor-pointer"
                      >
                        <ShoppingCart className="w-3 h-3" /> Add to Cart
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-300">
              <tr>
                <td className="p-3 font-bold text-slate-400 bg-slate-950/20">Category</td>
                {products.map(p => <td key={p.id} className="p-3 capitalize">{p.category.replace('_', ' ')}</td>)}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-400 bg-slate-950/20">Brand / OEM</td>
                {products.map(p => <td key={p.id} className="p-3">{p.brand}</td>)}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-400 bg-slate-950/20">Processor (CPU)</td>
                {products.map(p => <td key={p.id} className="p-3 font-semibold text-white">{p.specs.cpu}</td>)}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-400 bg-slate-950/20">Graphics (GPU)</td>
                {products.map(p => <td key={p.id} className="p-3 font-semibold text-orange-300">{p.specs.gpu}</td>)}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-400 bg-slate-950/20">System Memory (RAM)</td>
                {products.map(p => <td key={p.id} className="p-3">{p.specs.ram}</td>)}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-400 bg-slate-950/20">Storage</td>
                {products.map(p => <td key={p.id} className="p-3">{p.specs.storage}</td>)}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-400 bg-slate-950/20">Display / Screen</td>
                {products.map(p => <td key={p.id} className="p-3">{p.specs.display || 'Desktop Output (Multi-Monitor)'}</td>)}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-400 bg-slate-950/20">Operating System</td>
                {products.map(p => <td key={p.id} className="p-3">{p.specs.os}</td>)}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-400 bg-slate-950/20">Warranty & SLA</td>
                {products.map(p => <td key={p.id} className="p-3">{p.specs.warranty}</td>)}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-400 bg-slate-950/20">Condition</td>
                {products.map(p => <td key={p.id} className="p-3"><span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-semibold">{p.condition}</span></td>)}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
