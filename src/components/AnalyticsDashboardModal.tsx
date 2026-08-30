import React, { useState } from 'react';
import { 
  X, 
  BarChart3, 
  TrendingUp, 
  Package, 
  DollarSign, 
  Users, 
  Boxes, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  ArrowUpRight, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { MOCK_ANALYTICS_DATA, MOCK_PRODUCTS } from '../data/products';
import { formatPrice, CURRENCY_SYMBOL } from '../utils/formatCurrency';

interface AnalyticsDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLORS = ['#f97316', '#fbbf24', '#38bdf8', '#34d399', '#a855f7', '#ec4899'];

export const AnalyticsDashboardModal: React.FC<AnalyticsDashboardModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'sales'>('overview');

  const analytics = MOCK_ANALYTICS_DATA;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  War Computers Operations & Analytics Hub
                </h2>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Live Depot Sync
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sales Velocity, Revenue Trends & Depot Inventory Levels
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
              {(['7d', '30d', '90d'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    timeRange === range
                      ? 'bg-orange-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {range.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6">
          {[
            { id: 'overview', label: 'Executive Overview' },
            { id: 'inventory', label: 'Depot Inventory Health' },
            { id: 'sales', label: 'Sales & Channel Breakdown' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total 30D Revenue</span>
                <DollarSign className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-2xl font-black text-white">{formatPrice(analytics.totalRevenue)}</p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                <TrendingUp className="w-3 h-3" />
                <span>+24.8% vs last month</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Hardware Units Shipped</span>
                <Package className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-black text-white">{analytics.unitsSoldTotal.toLocaleString()}</p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                <TrendingUp className="w-3 h-3" />
                <span>+18.2% wholesale pallets</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Active Depot Stock</span>
                <Boxes className="w-4 h-4 text-sky-400" />
              </div>
              <p className="text-2xl font-black text-white">{analytics.activeInventoryCount.toLocaleString()}</p>
              <div className="text-[11px] text-slate-400">Across 10 Categories</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Wholesale B2B Share</span>
                <Users className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-2xl font-black text-white">{analytics.wholesaleRatio}%</p>
              <div className="text-[11px] text-orange-300 font-semibold">68% Total GMV</div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main Sales Trend Chart */}
            <div className="lg:col-span-8 p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Sales & Volume Trends</h3>
                  <p className="text-xs text-slate-400">Retail vs Wholesale B2B Revenue trajectory ({CURRENCY_SYMBOL})</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-orange-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span>Wholesale</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>Retail</span>
                  </div>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.salesTrend}>
                    <defs>
                      <linearGradient id="wholesaleGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="retailGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" textAnchor="end" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#64748b" tickFormatter={(v) => `${CURRENCY_SYMBOL} ${v/1000}k`} tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                      formatter={(val: any) => [formatPrice(Number(val)), '']}
                    />
                    <Area type="monotone" dataKey="wholesale" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#wholesaleGrad)" />
                    <Area type="monotone" dataKey="retail" stroke="#fbbf24" strokeWidth={2} fillOpacity={1} fill="url(#retailGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Revenue Distribution Pie */}
            <div className="lg:col-span-4 p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Revenue by Category</h3>
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="revenue"
                    >
                      {analytics.categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                      formatter={(val: any) => [formatPrice(Number(val)), 'Revenue']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                {analytics.categoryBreakdown.map((item, idx) => (
                  <div key={item.category} className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="truncate">{item.category} ({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Inventory Health & Low Stock Warning Table */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-400" />
                <h3 className="text-sm font-bold text-white">Inventory Status & Reorder Intelligence</h3>
              </div>
              <span className="text-xs text-slate-400">Threshold: &lt; 15 units auto-reorder trigger</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="pb-2 font-semibold">SKU</th>
                    <th className="pb-2 font-semibold">System Model</th>
                    <th className="pb-2 font-semibold">Depot Units</th>
                    <th className="pb-2 font-semibold">Stock Status</th>
                    <th className="pb-2 font-semibold">Monthly Run Rate</th>
                    <th className="pb-2 font-semibold">Reorder Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-slate-300">
                  {MOCK_PRODUCTS.slice(0, 6).map((p) => {
                    const isLow = p.stockQuantity < 15;
                    return (
                      <tr key={p.id}>
                        <td className="py-2.5 font-mono text-slate-400">{p.sku}</td>
                        <td className="py-2.5 font-semibold text-white truncate max-w-[220px]">{p.name}</td>
                        <td className="py-2.5 font-bold">{p.stockQuantity} units</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isLow 
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {isLow ? 'Low Stock' : 'Optimal Inventory'}
                          </span>
                        </td>
                        <td className="py-2.5 text-slate-400">~{p.stockQuantity + 12} units/mo</td>
                        <td className="py-2.5">
                          <button 
                            onClick={() => alert(`Purchase Order auto-generated for ${p.name} (Supplier: ${p.brand} OEM Direct)`)}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-orange-500/40 text-orange-300 rounded-lg text-[11px] font-semibold cursor-pointer"
                          >
                            Generate PO
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
