import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Truck, 
  BarChart3, 
  ArrowLeft, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Package, 
  RefreshCw, 
  Boxes,
  Database,
  Globe,
  Sliders,
  Laptop
} from 'lucide-react';
import { Product, PricingMode, OrderTrackingInfo } from '../types';
import { ManageProductsSection } from './ManageProductsSection';
import { AdminOrderTrackingSection } from './AdminOrderTrackingSection';
import { formatPrice } from '../utils/formatCurrency';

interface AdminPortalPageProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetToDefaults: () => void;
  onQuickView: (product: Product) => void;
  orders: OrderTrackingInfo[];
  onUpdateOrder: (updatedOrder: OrderTrackingInfo) => void;
  onAddOrder?: (newOrder: OrderTrackingInfo) => void;
  pricingMode: PricingMode;
  onTogglePricingMode: (mode: PricingMode) => void;
  onNavigateToStore: () => void;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetToDefaults,
  onQuickView,
  orders,
  onUpdateOrder,
  onAddOrder,
  pricingMode,
  onTogglePricingMode,
  onNavigateToStore
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'depot'>('products');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyAdminUrl = () => {
    const adminUrl = `${window.location.origin}/admin.html`;
    navigator.clipboard.writeText(adminUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const totalStock = products.reduce((acc, p) => acc + (p.stockQuantity || 0), 0);
  const totalValuation = products.reduce((acc, p) => acc + (p.retailPrice * (p.stockQuantity || 0)), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative selection:bg-orange-500 selection:text-white pb-20">
      
      {/* Admin Sticky Header */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Left: Brand & Admin Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-0.5 shadow-lg shadow-orange-500/25 flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-orange-500" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white tracking-wider uppercase font-brand">
                  WAR COMPUTERS <span className="text-orange-500">• ADMIN HUB</span>
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AUTHENTICATED
                </span>
              </div>
              
              {/* Separate Link Badge indicator */}
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-white/10">
                  warcomputers.com/admin.html
                </span>
                <button
                  onClick={handleCopyAdminUrl}
                  className="text-[10px] text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
                  title="Copy Admin Link"
                >
                  {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUrl ? 'Copied Link!' : 'Copy Direct Link'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Center: Admin Module Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 shadow-inner">
            <button
              id="admin-tab-products"
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Manage Products</span>
            </button>

            <button
              id="admin-tab-orders"
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Track Orders ({orders.length})</span>
            </button>

            <button
              id="admin-tab-depot"
              onClick={() => setActiveTab('depot')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'depot'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Depot Stats</span>
            </button>
          </div>

          {/* Right: Return to Store Front button */}
          <div className="flex items-center gap-3">
            <button
              id="return-to-store-btn"
              onClick={onNavigateToStore}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/15 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-orange-400" />
              <span>Return to Store Front</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Body Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Tab 1: Manage Products Section */}
        {activeTab === 'products' && (
          <div className="space-y-6">
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
        )}

        {/* Tab 2: Track Orders & Dispatch Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <AdminOrderTrackingSection
              orders={orders}
              onUpdateOrder={onUpdateOrder}
              onAddOrder={onAddOrder}
            />
          </div>
        )}

        {/* Tab 3: Depot Inventory & System Stats */}
        {activeTab === 'depot' && (
          <div className="space-y-6">
            
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="space-y-1.5 pb-5 border-b border-white/10">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-orange-500" />
                  Depot Inventory Valuation & Infrastructure Status
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time catalog analytics and depot logistics telemetry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
                  <p className="text-xs text-slate-400 font-semibold uppercase">Total Catalog SKUs</p>
                  <p className="text-3xl font-black text-white">{products.length} Products</p>
                  <p className="text-[11px] text-slate-500">Across Desktops, Laptops, Chromebooks, Tablets, Workstations</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
                  <p className="text-xs text-slate-400 font-semibold uppercase">Warehoused Stock Units</p>
                  <p className="text-3xl font-black text-orange-400">{totalStock} Units</p>
                  <p className="text-[11px] text-slate-500">Allocated in Central Logistics Depot</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
                  <p className="text-xs text-slate-400 font-semibold uppercase">Total Inventory Value</p>
                  <p className="text-3xl font-black text-emerald-400">{formatPrice(totalValuation)}</p>
                  <p className="text-[11px] text-slate-500">Based on MSRP Retail Valuation</p>
                </div>
              </div>

              {/* Category Breakdown Table */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Category Distribution in Live Catalog
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {[
                    { cat: 'desktops', label: 'Desktops' },
                    { cat: 'laptops', label: 'Laptops' },
                    { cat: 'chromebooks', label: 'Chromebooks' },
                    { cat: 'tablets', label: 'Tablets' },
                    { cat: 'workstations', label: 'Workstations' },
                    { cat: 'wholesale_lots', label: 'Wholesale Lots' }
                  ].map(item => {
                    const count = products.filter(p => p.category === item.cat).length;
                    return (
                      <div key={item.cat} className="p-3 rounded-xl bg-slate-900 border border-white/5 text-center">
                        <p className="text-[11px] text-slate-400">{item.label}</p>
                        <p className="text-lg font-black text-white">{count}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fast Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('products')}
                  className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Package className="w-4 h-4" />
                  <span>Go to Manage Products</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-white/10 text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Go to Track Orders</span>
                </button>
                <button
                  onClick={onResetToDefaults}
                  className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-500/30 text-red-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset Catalog to Defaults</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
};
