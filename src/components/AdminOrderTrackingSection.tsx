import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  AlertCircle, 
  ExternalLink, 
  ChevronRight, 
  Plus, 
  Edit3, 
  FileText, 
  RotateCw, 
  Check, 
  ArrowUpRight,
  Send,
  Calendar,
  Layers,
  Copy,
  Printer
} from 'lucide-react';
import { OrderTrackingInfo } from '../types';
import { formatPrice } from '../utils/formatCurrency';

interface AdminOrderTrackingSectionProps {
  orders: OrderTrackingInfo[];
  onUpdateOrder: (updatedOrder: OrderTrackingInfo) => void;
  onAddOrder?: (newOrder: OrderTrackingInfo) => void;
}

export const AdminOrderTrackingSection: React.FC<AdminOrderTrackingSectionProps> = ({
  orders,
  onUpdateOrder,
  onAddOrder
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.orderId || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatusValue, setNewStatusValue] = useState<OrderTrackingInfo['status']>('Shipped');
  const [statusNote, setStatusNote] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const selectedOrder = orders.find(o => o.orderId === selectedOrderId) || orders[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const triggerFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchId = order.orderId.toLowerCase().includes(q);
      const matchCustomer = order.customerName.toLowerCase().includes(q);
      const matchCarrier = order.carrier.toLowerCase().includes(q);
      const matchTrackNum = order.trackingNumber.toLowerCase().includes(q);
      if (!matchId && !matchCustomer && !matchCarrier && !matchTrackNum) return false;
    }
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (typeFilter !== 'all' && order.orderType !== typeFilter) return false;
    return true;
  });

  // Advance or update status
  const handleSaveStatusUpdate = () => {
    if (!selectedOrder) return;

    const updatedTimeline = [...selectedOrder.timeline];
    
    // Add event to timeline
    const now = new Date();
    const formattedDate = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    
    // Mark previous as completed
    const adjustedTimeline = updatedTimeline.map(t => ({
      ...t,
      current: false
    }));

    adjustedTimeline.push({
      status: `Admin Status Update: ${newStatusValue}`,
      date: formattedDate,
      description: statusNote.trim() || `Status manually advanced to ${newStatusValue} by Depot Logistics Admin.`,
      completed: true,
      current: true
    });

    const updated: OrderTrackingInfo = {
      ...selectedOrder,
      status: newStatusValue,
      timeline: adjustedTimeline
    };

    onUpdateOrder(updated);
    setIsEditingStatus(false);
    setStatusNote('');
    triggerFeedback(`Order #${selectedOrder.orderId} status updated to "${newStatusValue}".`);
  };

  // Quick carrier update
  const handleUpdateTrackingNumber = (newTrackingNumber: string) => {
    if (!selectedOrder) return;
    const updated = {
      ...selectedOrder,
      trackingNumber: newTrackingNumber
    };
    onUpdateOrder(updated);
    triggerFeedback(`Tracking number updated for Order #${selectedOrder.orderId}`);
  };

  const totalWholesaleValue = orders
    .filter(o => o.orderType === 'wholesale')
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const activeInTransitCount = orders.filter(o => o.status === 'Shipped' || o.status === 'Out for Delivery').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & KPI Row */}
      <div className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              <span>Depot Logistics & Dispatch Operations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>Track Orders & Carrier Dispatch Desk</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Real-time central hub to track orders, manage freight dispatch, inspect live carrier progress (FedEx, DHL, UPS), advance fulfillment statuses, and communicate shipment tracking to clients.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                const sampleId = `WC-${Math.floor(1000 + Math.random() * 9000)}`;
                const newSampleOrder: OrderTrackingInfo = {
                  orderId: sampleId,
                  customerName: 'Enterprise Tech Partner LLC',
                  orderDate: 'Today',
                  orderType: 'wholesale',
                  status: 'Processing',
                  carrier: 'FedEx Freight Direct',
                  trackingNumber: `FXF-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
                  estimatedDelivery: '3-4 Business Days',
                  totalAmount: 14200.00,
                  itemsCount: 15,
                  timeline: [
                    { status: 'Order Authorized & Serial Logged', date: 'Just Now', description: 'B2B order generated and queued for hardware staging.', completed: true, current: true }
                  ]
                };
                if (onAddOrder) onAddOrder(newSampleOrder);
                else onUpdateOrder(newSampleOrder);
                setSelectedOrderId(sampleId);
                triggerFeedback(`Created dispatch queue for order #${sampleId}`);
              }}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Dispatch Order</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 shadow-inner flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Total Orders</p>
              <p className="text-lg sm:text-xl font-black text-white">{orders.length} Active</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 shadow-inner flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">In Transit / Freight</p>
              <p className="text-lg sm:text-xl font-black text-amber-400">{activeInTransitCount} Shipments</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 shadow-inner flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Delivered & Signed</p>
              <p className="text-lg sm:text-xl font-black text-emerald-400">{deliveredCount} Fulfilled</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 shadow-inner flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Wholesale Value</p>
              <p className="text-base sm:text-lg font-black text-slate-100 truncate">{formatPrice(totalWholesaleValue)}</p>
            </div>
          </div>
        </div>

        {/* Feedback Alert Toast */}
        {feedbackMsg && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 border border-orange-500/40 text-orange-200 text-xs font-bold flex items-center justify-between shadow-lg animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-orange-400" />
              <span>{feedbackMsg}</span>
            </div>
            <span className="text-[10px] text-orange-300 uppercase tracking-widest font-mono">LOGISTICS SYNCED</span>
          </div>
        )}
      </div>

      {/* Main Two-Column Layout: Left (Orders List & Search) + Right (Detailed Inspector & Live Tracker) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 Cols): Orders Search & Management Table */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 space-y-4 shadow-xl">
            
            {/* Search & Filters Header */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Order #, Customer, Carrier..."
                  className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 shadow-inner"
                />
              </div>

              {/* Status Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Orders' },
                  { id: 'Processing', label: 'Processing' },
                  { id: 'Assembled & Tested', label: 'Testing QA' },
                  { id: 'Shipped', label: 'In Transit' },
                  { id: 'Delivered', label: 'Delivered' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                      statusFilter === tab.id
                        ? 'bg-orange-500 text-white border-orange-400 shadow-sm'
                        : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List Cards */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredOrders.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/50 rounded-2xl border border-dashed border-white/10 space-y-2">
                  <Package className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs font-semibold text-slate-400">No orders match your search filter</p>
                </div>
              ) : (
                filteredOrders.map(order => {
                  const isSelected = order.orderId === (selectedOrder?.orderId);
                  return (
                    <div
                      key={order.orderId}
                      onClick={() => setSelectedOrderId(order.orderId)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden group ${
                        isSelected
                          ? 'bg-slate-800/90 border-orange-500 shadow-lg shadow-orange-500/10'
                          : 'bg-slate-950/60 hover:bg-slate-850 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {/* Left status accent strip */}
                      <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                        order.status === 'Delivered' ? 'bg-emerald-500' :
                        order.status === 'Shipped' ? 'bg-amber-500' :
                        order.status === 'Assembled & Tested' ? 'bg-blue-500' : 'bg-orange-500'
                      }`} />

                      <div className="pl-2 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black text-white">
                              {order.orderId}
                            </span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                              order.orderType === 'wholesale'
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                            }`}>
                              {order.orderType}
                            </span>
                          </div>

                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300' :
                            order.status === 'Shipped' ? 'bg-amber-500/20 text-amber-300' :
                            'bg-orange-500/20 text-orange-300'
                          }`}>
                            {order.status}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-slate-200 truncate">
                          {order.customerName}
                        </p>

                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>{order.carrier}</span>
                          <span className="font-bold text-slate-100">{formatPrice(order.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        </div>

        {/* Right Column (7 Cols): Selected Order Deep Logistics Inspector & Status Controller */}
        <div className="lg:col-span-7 space-y-5">
          {selectedOrder ? (
            <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-6">
              
              {/* Order Header Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl font-black text-white font-mono">
                      Order #{selectedOrder.orderId}
                    </span>
                    <button
                      onClick={() => handleCopy(selectedOrder.orderId, 'orderId')}
                      className="text-slate-400 hover:text-white p-1 rounded-md bg-slate-950 border border-white/10 cursor-pointer"
                      title="Copy Order ID"
                    >
                      {copiedId === 'orderId' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-300">
                    Client: <strong className="text-white">{selectedOrder.customerName}</strong> • Date: {selectedOrder.orderDate}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditingStatus(!isEditingStatus)}
                    className="px-3.5 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 hover:text-white border border-orange-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Update Status</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-white/10 flex items-center gap-1.5 cursor-pointer"
                    title="Print Packing Slip"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Slip</span>
                  </button>
                </div>
              </div>

              {/* Status Updater Panel (Expands when clicking "Update Status") */}
              {isEditingStatus && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-orange-500/40 space-y-3.5 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> Admin Status & Dispatch Override
                    </span>
                    <button
                      onClick={() => setIsEditingStatus(false)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Target Fulfillment Status</label>
                      <select
                        value={newStatusValue}
                        onChange={(e) => setNewStatusValue(e.target.value as any)}
                        className="w-full bg-slate-900 text-white rounded-xl px-3 py-2 text-xs border border-white/10 focus:outline-none focus:border-orange-500"
                      >
                        <option value="Processing">Processing / Staging</option>
                        <option value="Assembled & Tested">Assembled & Hardware QA Passed</option>
                        <option value="Quality Passed">Quality Passed & Pallet Crated</option>
                        <option value="Shipped">Dispatched / Shipped (In Transit)</option>
                        <option value="Out for Delivery">Out for Local Delivery</option>
                        <option value="Delivered">Delivered & Signed for</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Carrier Dispatch Note / Checkpoint</label>
                      <input
                        type="text"
                        value={statusNote}
                        onChange={(e) => setStatusNote(e.target.value)}
                        placeholder="e.g. Scanned at Central Memphis Logistics Hub"
                        className="w-full bg-slate-900 text-white rounded-xl px-3 py-2 text-xs border border-white/10 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveStatusUpdate}
                      className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Apply & Broadcast Update</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Shipping & Freight Key Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Assigned Carrier</span>
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-orange-400" />
                    {selectedOrder.carrier}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Tracking Number</span>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-mono font-bold text-amber-300 truncate">
                      {selectedOrder.trackingNumber}
                    </p>
                    <button
                      onClick={() => handleCopy(selectedOrder.trackingNumber, 'trackNum')}
                      className="text-slate-400 hover:text-white cursor-pointer ml-1"
                    >
                      {copiedId === 'trackNum' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Estimated Delivery</span>
                  <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedOrder.estimatedDelivery}
                  </p>
                </div>
              </div>

              {/* Live Step-by-Step Dispatch Timeline */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    Official Logistics & Dispatch Timeline
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {selectedOrder.timeline.filter(t => t.completed).length} of {selectedOrder.timeline.length} Steps Complete
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4">
                  {selectedOrder.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 relative group">
                      {/* Vertical line connection */}
                      {idx < selectedOrder.timeline.length - 1 && (
                        <div 
                          className={`absolute left-[13px] top-[26px] bottom-[-16px] w-[2px] ${
                            step.completed ? 'bg-orange-500/50' : 'bg-slate-800'
                          }`} 
                        />
                      )}

                      {/* Status Icon Indicator */}
                      <div className="relative z-10 flex-shrink-0">
                        {step.completed ? (
                          <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        ) : step.current ? (
                          <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center animate-pulse">
                            <RotateCw className="w-4 h-4 animate-spin" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 text-slate-600 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-slate-700" />
                          </div>
                        )}
                      </div>

                      {/* Step Details */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <p className={`text-xs font-bold ${
                            step.completed ? 'text-white' : step.current ? 'text-amber-300' : 'text-slate-500'
                          }`}>
                            {step.status}
                          </p>
                          <span className="text-[10px] font-mono text-slate-400">
                            {step.date}
                          </span>
                        </div>
                        {step.description && (
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial & Package Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Order Valuation</p>
                  <p className="text-lg font-black text-orange-400">{formatPrice(selectedOrder.totalAmount)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Hardware Quantity</p>
                  <p className="text-sm font-bold text-white">{selectedOrder.itemsCount} Systems / Pallets</p>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center bg-slate-900/60 rounded-3xl border border-white/10 space-y-3">
              <Package className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-white">Select an order from the left column</h3>
              <p className="text-xs text-slate-400">View detailed carrier dispatch progress, tracking timelines, and update fulfillment.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
