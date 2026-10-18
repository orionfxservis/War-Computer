import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Receipt,
  PackageCheck,
  ShoppingBag,
  Plus,
  Trash2,
  Edit3,
  Search,
  Filter,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  CreditCard,
  Briefcase,
  PieChart,
  BarChart3,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  X,
  FileSpreadsheet,
  Printer,
  ChevronRight,
  Wallet,
  Coins,
  RefreshCw,
  Tag
} from 'lucide-react';
import { 
  PurchaseRecord, 
  SaleRecord, 
  ExpenseRecord, 
  ExpenseHead, 
  OrderTrackingInfo 
} from '../types';
import { formatPrice } from '../utils/formatCurrency';
import { EXPENSE_HEADS } from '../data/initialTransactions';

interface AdminTransactionsHubProps {
  purchases: PurchaseRecord[];
  sales: SaleRecord[];
  expenses: ExpenseRecord[];
  orders?: OrderTrackingInfo[];
  onAddPurchase: (record: PurchaseRecord) => void;
  onUpdatePurchase: (record: PurchaseRecord) => void;
  onDeletePurchase: (id: string) => void;
  onAddSale: (record: SaleRecord) => void;
  onUpdateSale: (record: SaleRecord) => void;
  onDeleteSale: (id: string) => void;
  onAddExpense: (record: ExpenseRecord) => void;
  onUpdateExpense: (record: ExpenseRecord) => void;
  onDeleteExpense: (id: string) => void;
  onImportOrdersToSales?: () => void;
}

type MainSectionTab = 'purchase' | 'sale' | 'expense' | 'profit';
type ProfitTimeframeTab = 'current_month' | 'last_month' | 'six_months' | 'statement';

export const AdminTransactionsHub: React.FC<AdminTransactionsHubProps> = ({
  purchases,
  sales,
  expenses,
  orders = [],
  onAddPurchase,
  onUpdatePurchase,
  onDeletePurchase,
  onAddSale,
  onUpdateSale,
  onDeleteSale,
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
  onImportOrdersToSales
}) => {
  const [activeSection, setActiveSection] = useState<MainSectionTab>('profit');
  const [profitTimeframe, setProfitTimeframe] = useState<ProfitTimeframeTab>('current_month');

  // Search & Filter States
  const [purchaseSearch, setPurchaseSearch] = useState('');
  const [purchaseCategoryFilter, setPurchaseCategoryFilter] = useState<string>('all');
  const [purchaseStatusFilter, setPurchaseStatusFilter] = useState<string>('all');

  const [saleSearch, setSaleSearch] = useState('');
  const [saleChannelFilter, setSaleChannelFilter] = useState<string>('all');
  const [saleStatusFilter, setSaleStatusFilter] = useState<string>('all');

  const [expenseSearch, setExpenseSearch] = useState('');
  const [expenseHeadFilter, setExpenseHeadFilter] = useState<string>('all');
  const [expenseStatusFilter, setExpenseStatusFilter] = useState<string>('all');

  // Modals
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isAddHeadModalOpen, setIsAddHeadModalOpen] = useState(false);

  // Dynamic Expense Heads with LocalStorage persistence
  const [expenseHeads, setExpenseHeads] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('war_computers_expense_heads');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return Array.from(new Set([...EXPENSE_HEADS, ...parsed, ...expenses.map(e => e.head)]));
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved expense heads:', e);
    }
    return Array.from(new Set([...EXPENSE_HEADS, ...expenses.map(e => e.head)]));
  });

  const [newHeadName, setNewHeadName] = useState('');
  const [newHeadError, setNewHeadError] = useState('');
  const [headSuccessToast, setHeadSuccessToast] = useState<string | null>(null);

  const handleAddExpenseHead = (nameToAdd?: string) => {
    const raw = (nameToAdd || newHeadName).trim();
    if (!raw) {
      setNewHeadError('Please enter an Expense Head title.');
      return;
    }
    const exists = expenseHeads.some(h => h.toLowerCase() === raw.toLowerCase());
    if (exists) {
      setNewHeadError(`Expense Head "${raw}" already exists in chart of accounts.`);
      return;
    }

    const updated = [...expenseHeads, raw];
    setExpenseHeads(updated);
    try {
      localStorage.setItem('war_computers_expense_heads', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save expense heads:', e);
    }

    // Auto-select this new head in the filter
    setExpenseHeadFilter(raw);
    // If expense voucher modal is open, auto-select it there too
    setExpenseForm(prev => ({ ...prev, head: raw as any }));
    setNewHeadName('');
    setNewHeadError('');
    setIsAddHeadModalOpen(false);
    setHeadSuccessToast(`Expense Head "${raw}" added successfully!`);
    setTimeout(() => setHeadSuccessToast(null), 3500);
  };

  // Edit record states
  const [editingPurchase, setEditingPurchase] = useState<PurchaseRecord | null>(null);
  const [editingSale, setEditingSale] = useState<SaleRecord | null>(null);
  const [editingExpense, setEditingExpense] = useState<ExpenseRecord | null>(null);

  // Forms state
  const todayStr = new Date().toISOString().split('T')[0];

  const [purchaseForm, setPurchaseForm] = useState<Omit<PurchaseRecord, 'id'>>({
    poNumber: `PO-26-${Math.floor(100 + Math.random() * 900)}`,
    date: todayStr,
    supplierName: '',
    itemDescription: '',
    category: 'Laptops',
    quantity: 1,
    unitCost: 0,
    totalCost: 0,
    paidAmount: 0,
    paymentStatus: 'Paid',
    paymentMethod: 'Bank Transfer',
    invoiceRef: '',
    notes: ''
  });

  const [saleForm, setSaleForm] = useState<Omit<SaleRecord, 'id'>>({
    invoiceNumber: `INV-26-${Math.floor(100 + Math.random() * 900)}`,
    date: todayStr,
    customerName: '',
    companyName: '',
    channel: 'Retail Store',
    itemDescription: '',
    quantity: 1,
    unitPrice: 0,
    totalAmount: 0,
    cogsUnitCost: 0,
    totalCogs: 0,
    grossProfit: 0,
    paymentStatus: 'Paid',
    paymentMethod: 'Cash',
    notes: ''
  });

  const [expenseForm, setExpenseForm] = useState<Omit<ExpenseRecord, 'id'>>({
    voucherNumber: `VCH-26-${Math.floor(100 + Math.random() * 900)}`,
    date: todayStr,
    head: 'Rent & Warehouse Lease',
    customHead: '',
    payee: '',
    description: '',
    amount: 0,
    paymentMethod: 'Bank Transfer',
    paidBy: 'Admin',
    status: 'Cleared',
    receiptRef: '',
    notes: ''
  });

  // Calculate current month and last month keys (format: YYYY-MM)
  // App simulated context: October 2026
  const currentMonthKey = '2026-10';
  const lastMonthKey = '2026-09';
  const sixMonthsKeys = ['2026-10', '2026-09', '2026-08', '2026-07', '2026-06', '2026-05'];

  // Helper for formatting month labels
  const getMonthName = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Month-by-month financial calculations
  const calculateMonthMetrics = (monthKey: string) => {
    const monthSales = sales.filter(s => s.date.startsWith(monthKey));
    const monthPurchases = purchases.filter(p => p.date.startsWith(monthKey));
    const monthExpenses = expenses.filter(e => e.date.startsWith(monthKey));

    const totalSales = monthSales.reduce((acc, s) => acc + s.totalAmount, 0);
    const totalCogs = monthSales.reduce((acc, s) => acc + (s.totalCogs || 0), 0);
    const grossProfit = totalSales - totalCogs;
    const grossMarginPercent = totalSales > 0 ? (grossProfit / totalSales) * 100 : 0;

    const totalExpenses = monthExpenses.reduce((acc, e) => acc + e.amount, 0);
    const totalPurchases = monthPurchases.reduce((acc, p) => acc + p.totalCost, 0);

    const netProfit = grossProfit - totalExpenses;
    const netMarginPercent = totalSales > 0 ? (netProfit / totalSales) * 100 : 0;

    const cashInflow = monthSales
      .filter(s => s.paymentStatus === 'Paid')
      .reduce((acc, s) => acc + s.totalAmount, 0);

    const cashOutflow = 
      monthPurchases.reduce((acc, p) => acc + (p.paidAmount || p.totalCost), 0) +
      monthExpenses.filter(e => e.status === 'Cleared').reduce((acc, e) => acc + e.amount, 0);

    const netCashFlow = cashInflow - cashOutflow;

    return {
      monthKey,
      monthLabel: getMonthName(monthKey),
      totalSales,
      totalPurchases,
      totalCogs,
      grossProfit,
      grossMarginPercent,
      totalExpenses,
      netProfit,
      netMarginPercent,
      cashInflow,
      cashOutflow,
      netCashFlow,
      salesCount: monthSales.length,
      purchasesCount: monthPurchases.length,
      expensesCount: monthExpenses.length
    };
  };

  // Metrics for Current Month, Last Month, and 6-Month Window
  const currentMonthMetrics = useMemo(() => calculateMonthMetrics(currentMonthKey), [sales, purchases, expenses]);
  const lastMonthMetrics = useMemo(() => calculateMonthMetrics(lastMonthKey), [sales, purchases, expenses]);
  
  const sixMonthsMetrics = useMemo(() => {
    return sixMonthsKeys.map(key => calculateMonthMetrics(key));
  }, [sales, purchases, expenses]);

  const sixMonthsAggregate = useMemo(() => {
    const totalSales = sixMonthsMetrics.reduce((acc, m) => acc + m.totalSales, 0);
    const totalCogs = sixMonthsMetrics.reduce((acc, m) => acc + m.totalCogs, 0);
    const grossProfit = totalSales - totalCogs;
    const totalExpenses = sixMonthsMetrics.reduce((acc, m) => acc + m.totalExpenses, 0);
    const totalPurchases = sixMonthsMetrics.reduce((acc, m) => acc + m.totalPurchases, 0);
    const netProfit = grossProfit - totalExpenses;
    const netMarginPercent = totalSales > 0 ? (netProfit / totalSales) * 100 : 0;
    const avgMonthlyProfit = netProfit / 6;

    const totalCashInflow = sixMonthsMetrics.reduce((acc, m) => acc + m.cashInflow, 0);
    const totalCashOutflow = sixMonthsMetrics.reduce((acc, m) => acc + m.cashOutflow, 0);
    const netCashFlow = totalCashInflow - totalCashOutflow;

    return {
      totalSales,
      totalCogs,
      grossProfit,
      totalExpenses,
      totalPurchases,
      netProfit,
      netMarginPercent,
      avgMonthlyProfit,
      totalCashInflow,
      totalCashOutflow,
      netCashFlow
    };
  }, [sixMonthsMetrics]);

  // All-time Grand Totals
  const grandTotals = useMemo(() => {
    const totalSales = sales.reduce((acc, s) => acc + s.totalAmount, 0);
    const totalPurchases = purchases.reduce((acc, p) => acc + p.totalCost, 0);
    const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
    const totalCogs = sales.reduce((acc, s) => acc + s.totalCogs, 0);
    const totalGrossProfit = totalSales - totalCogs;
    const totalNetProfit = totalGrossProfit - totalExpenses;
    const totalCashInflow = sales.filter(s => s.paymentStatus === 'Paid').reduce((acc, s) => acc + s.totalAmount, 0);
    const totalCashOutflow = purchases.reduce((acc, p) => acc + (p.paidAmount || p.totalCost), 0) + totalExpenses;
    const netCashFlow = totalCashInflow - totalCashOutflow;

    return {
      totalSales,
      totalPurchases,
      totalExpenses,
      totalGrossProfit,
      totalNetProfit,
      totalCashInflow,
      totalCashOutflow,
      netCashFlow
    };
  }, [sales, purchases, expenses]);

  // Head-wise expense distribution for selected period
  const headWiseExpenses = useMemo(() => {
    const periodExpenses = profitTimeframe === 'current_month'
      ? expenses.filter(e => e.date.startsWith(currentMonthKey))
      : profitTimeframe === 'last_month'
      ? expenses.filter(e => e.date.startsWith(lastMonthKey))
      : expenses.filter(e => sixMonthsKeys.some(k => e.date.startsWith(k)));

    const totalPeriodExpense = periodExpenses.reduce((acc, e) => acc + e.amount, 0) || 1;

    const breakdown = expenseHeads.map(head => {
      const items = periodExpenses.filter(e => e.head === head);
      const amount = items.reduce((acc, e) => acc + e.amount, 0);
      const percent = (amount / totalPeriodExpense) * 100;
      return {
        head,
        amount,
        percent,
        count: items.length
      };
    }).filter(item => item.amount > 0).sort((a, b) => b.amount - a.amount);

    return breakdown;
  }, [expenses, profitTimeframe, expenseHeads]);

  // Filtered Lists
  const filteredPurchases = useMemo(() => {
    return purchases.filter(p => {
      const matchesSearch = 
        p.poNumber.toLowerCase().includes(purchaseSearch.toLowerCase()) ||
        p.supplierName.toLowerCase().includes(purchaseSearch.toLowerCase()) ||
        p.itemDescription.toLowerCase().includes(purchaseSearch.toLowerCase());
      const matchesCategory = purchaseCategoryFilter === 'all' || p.category === purchaseCategoryFilter;
      const matchesStatus = purchaseStatusFilter === 'all' || p.paymentStatus === purchaseStatusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [purchases, purchaseSearch, purchaseCategoryFilter, purchaseStatusFilter]);

  const filteredSales = useMemo(() => {
    return sales.filter(s => {
      const matchesSearch = 
        s.invoiceNumber.toLowerCase().includes(saleSearch.toLowerCase()) ||
        s.customerName.toLowerCase().includes(saleSearch.toLowerCase()) ||
        (s.companyName && s.companyName.toLowerCase().includes(saleSearch.toLowerCase())) ||
        s.itemDescription.toLowerCase().includes(saleSearch.toLowerCase());
      const matchesChannel = saleChannelFilter === 'all' || s.channel === saleChannelFilter;
      const matchesStatus = saleStatusFilter === 'all' || s.paymentStatus === saleStatusFilter;
      return matchesSearch && matchesChannel && matchesStatus;
    });
  }, [sales, saleSearch, saleChannelFilter, saleStatusFilter]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(e => {
      const matchesSearch = 
        e.voucherNumber.toLowerCase().includes(expenseSearch.toLowerCase()) ||
        e.payee.toLowerCase().includes(expenseSearch.toLowerCase()) ||
        e.description.toLowerCase().includes(expenseSearch.toLowerCase());
      const matchesHead = expenseHeadFilter === 'all' || e.head === expenseHeadFilter;
      const matchesStatus = expenseStatusFilter === 'all' || e.status === expenseStatusFilter;
      return matchesSearch && matchesHead && matchesStatus;
    });
  }, [expenses, expenseSearch, expenseHeadFilter, expenseStatusFilter]);

  // Handlers for modal forms
  const handleSavePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Number(purchaseForm.quantity) || 1;
    const unit = Number(purchaseForm.unitCost) || 0;
    const total = qty * unit;
    const paid = purchaseForm.paymentStatus === 'Paid' ? total : Number(purchaseForm.paidAmount) || 0;

    if (editingPurchase) {
      onUpdatePurchase({
        ...editingPurchase,
        ...purchaseForm,
        quantity: qty,
        unitCost: unit,
        totalCost: total,
        paidAmount: paid
      });
      setEditingPurchase(null);
    } else {
      onAddPurchase({
        id: `PUR-${Date.now()}`,
        ...purchaseForm,
        quantity: qty,
        unitCost: unit,
        totalCost: total,
        paidAmount: paid
      });
    }
    setIsPurchaseModalOpen(false);
  };

  const handleSaveSale = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Number(saleForm.quantity) || 1;
    const unitPrice = Number(saleForm.unitPrice) || 0;
    const totalAmount = qty * unitPrice;
    const cogsUnit = Number(saleForm.cogsUnitCost) || 0;
    const totalCogs = qty * cogsUnit;
    const grossProfit = totalAmount - totalCogs;

    if (editingSale) {
      onUpdateSale({
        ...editingSale,
        ...saleForm,
        quantity: qty,
        unitPrice,
        totalAmount,
        cogsUnitCost: cogsUnit,
        totalCogs,
        grossProfit
      });
      setEditingSale(null);
    } else {
      onAddSale({
        id: `SALE-${Date.now()}`,
        ...saleForm,
        quantity: qty,
        unitPrice,
        totalAmount,
        cogsUnitCost: cogsUnit,
        totalCogs,
        grossProfit
      });
    }
    setIsSaleModalOpen(false);
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(expenseForm.amount) || 0;

    if (editingExpense) {
      onUpdateExpense({
        ...editingExpense,
        ...expenseForm,
        amount
      });
      setEditingExpense(null);
    } else {
      onAddExpense({
        id: `EXP-${Date.now()}`,
        ...expenseForm,
        amount
      });
    }
    setIsExpenseModalOpen(false);
  };

  // Export CSV Helper
  const handleExportCSV = (type: 'all' | 'purchases' | 'sales' | 'expenses') => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (type === 'purchases') {
      csvContent += "PO Number,Date,Supplier,Category,Item,Quantity,Unit Cost,Total Cost,Status\n";
      purchases.forEach(p => {
        csvContent += `"${p.poNumber}","${p.date}","${p.supplierName}","${p.category}","${p.itemDescription}",${p.quantity},${p.unitCost},${p.totalCost},"${p.paymentStatus}"\n`;
      });
    } else if (type === 'sales') {
      csvContent += "Invoice Number,Date,Customer,Channel,Item,Quantity,Unit Price,Total Revenue,COGS,Gross Profit,Status\n";
      sales.forEach(s => {
        csvContent += `"${s.invoiceNumber}","${s.date}","${s.customerName}","${s.channel}","${s.itemDescription}",${s.quantity},${s.unitPrice},${s.totalAmount},${s.totalCogs},${s.grossProfit},"${s.paymentStatus}"\n`;
      });
    } else if (type === 'expenses') {
      csvContent += "Voucher Number,Date,Expense Head,Payee,Description,Amount,Payment Method,Status\n";
      expenses.forEach(e => {
        csvContent += `"${e.voucherNumber}","${e.date}","${e.head}","${e.payee}","${e.description}",${e.amount},"${e.paymentMethod}","${e.status}"\n`;
      });
    } else {
      // Summary P&L
      csvContent += "Month,Total Sales,Total COGS,Gross Profit,Expenses,Net Profit,Net Margin %\n";
      sixMonthsMetrics.forEach(m => {
        csvContent += `"${m.monthLabel}",${m.totalSales},${m.totalCogs},${m.grossProfit},${m.totalExpenses},${m.netProfit},"${m.netMarginPercent.toFixed(1)}%"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `war_computers_${type}_report_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Financial Control Hub Header */}
      <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Coins className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>War Computers Depot Cash Flow & P&L Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Financial Ledger & Transactions Management</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Track warehouse inventory <strong>Purchases</strong>, commercial <strong>Sales</strong>, head-wise operating <strong>Expenses</strong>, and executive <strong>Profit & Cash Flow</strong> analytics.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleExportCSV(activeSection === 'purchase' ? 'purchases' : activeSection === 'sale' ? 'sales' : activeSection === 'expense' ? 'expenses' : 'all')}
              className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="Export Current Section to CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="Print Financial Ledger"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print Ledger</span>
            </button>

            {/* Quick Record Add Button based on active tab */}
            {activeSection === 'purchase' && (
              <button
                onClick={() => {
                  setEditingPurchase(null);
                  setPurchaseForm({
                    poNumber: `PO-26-${Math.floor(100 + Math.random() * 900)}`,
                    date: todayStr,
                    supplierName: '',
                    itemDescription: '',
                    category: 'Laptops',
                    quantity: 1,
                    unitCost: 0,
                    totalCost: 0,
                    paidAmount: 0,
                    paymentStatus: 'Paid',
                    paymentMethod: 'Bank Transfer',
                    invoiceRef: '',
                    notes: ''
                  });
                  setIsPurchaseModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Record Purchase</span>
              </button>
            )}

            {activeSection === 'sale' && (
              <button
                onClick={() => {
                  setEditingSale(null);
                  setSaleForm({
                    invoiceNumber: `INV-26-${Math.floor(100 + Math.random() * 900)}`,
                    date: todayStr,
                    customerName: '',
                    companyName: '',
                    channel: 'Retail Store',
                    itemDescription: '',
                    quantity: 1,
                    unitPrice: 0,
                    totalAmount: 0,
                    cogsUnitCost: 0,
                    totalCogs: 0,
                    grossProfit: 0,
                    paymentStatus: 'Paid',
                    paymentMethod: 'Cash',
                    notes: ''
                  });
                  setIsSaleModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Record Sale</span>
              </button>
            )}

            {activeSection === 'expense' && (
              <button
                onClick={() => {
                  setEditingExpense(null);
                  setExpenseForm({
                    voucherNumber: `VCH-26-${Math.floor(100 + Math.random() * 900)}`,
                    date: todayStr,
                    head: 'Rent & Warehouse Lease',
                    customHead: '',
                    payee: '',
                    description: '',
                    amount: 0,
                    paymentMethod: 'Bank Transfer',
                    paidBy: 'Admin',
                    status: 'Cleared',
                    receiptRef: '',
                    notes: ''
                  });
                  setIsExpenseModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-500/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Record Expense</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Live Cash Flow Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-5">
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ArrowDownRight className="w-3.5 h-3.5 text-emerald-400" />
              Cash Inflow (Sales)
            </span>
            <p className="text-xl font-black text-emerald-400">{formatPrice(grandTotals.totalCashInflow)}</p>
            <p className="text-[10px] text-slate-500">Collected from {sales.length} transactions</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" />
              Cash Outflow (Stock & Expenses)
            </span>
            <p className="text-xl font-black text-rose-400">{formatPrice(grandTotals.totalCashOutflow)}</p>
            <p className="text-[10px] text-slate-500">Purchases + Depot Overheads</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-amber-400" />
              Net Cash Flow
            </span>
            <p className={`text-xl font-black ${grandTotals.netCashFlow >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatPrice(grandTotals.netCashFlow)}
            </p>
            <p className="text-[10px] text-slate-500">Operating Cash Surplus</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
              Net Cumulative Profit
            </span>
            <p className={`text-xl font-black ${grandTotals.totalNetProfit >= 0 ? 'text-orange-400' : 'text-rose-400'}`}>
              {formatPrice(grandTotals.totalNetProfit)}
            </p>
            <p className="text-[10px] text-slate-500">Gross Margin less Overheads</p>
          </div>
        </div>

        {/* The 4 Main Section Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-white/10">
          <button
            id="trans-tab-profit"
            onClick={() => setActiveSection('profit')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSection === 'profit'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Profit & Cash Flow</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/30 text-[10px] font-mono">P&L</span>
          </button>

          <button
            id="trans-tab-purchase"
            onClick={() => setActiveSection('purchase')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSection === 'purchase'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-white/5'
            }`}
          >
            <PackageCheck className="w-4 h-4" />
            <span>Purchase</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/30 text-[10px] font-mono">{purchases.length}</span>
          </button>

          <button
            id="trans-tab-sale"
            onClick={() => setActiveSection('sale')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSection === 'sale'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-white/5'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Sale</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/30 text-[10px] font-mono">{sales.length}</span>
          </button>

          <button
            id="trans-tab-expense"
            onClick={() => setActiveSection('expense')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSection === 'expense'
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-500/30'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-white/5'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Expense</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/30 text-[10px] font-mono">{expenses.length}</span>
          </button>
        </div>

      </div>

      {/* ========================================================= */}
      {/* SECTION 4: PROFIT & CASH FLOW (REQUESTED PROFIT BOXES & TABS) */}
      {/* ========================================================= */}
      {activeSection === 'profit' && (
        <div className="space-y-6">

          {/* THE 3 + 1 EXECUTIVE PROFIT BOXES REQUESTED BY USER */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            
            {/* BOX 1: CURRENT MONTH PROFIT */}
            <div className={`p-6 rounded-3xl border transition-all relative overflow-hidden ${
              profitTimeframe === 'current_month' 
                ? 'bg-slate-900 border-emerald-500/40 shadow-2xl shadow-emerald-500/10' 
                : 'bg-slate-900/90 border-white/10 hover:border-white/20'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Current Month Profit
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  {currentMonthMetrics.monthLabel}
                </span>
              </div>

              <div className="pt-4 space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-medium">Net Profit (Take-Home)</span>
                  <p className="text-3xl font-black text-emerald-400 tracking-tight">
                    {formatPrice(currentMonthMetrics.netProfit)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
                  <div>
                    <span className="text-slate-500">Gross Sales</span>
                    <p className="font-bold text-white">{formatPrice(currentMonthMetrics.totalSales)}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Gross Margin</span>
                    <p className="font-bold text-emerald-400">{currentMonthMetrics.grossMarginPercent.toFixed(1)}%</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Purchases / COGS</span>
                    <p className="font-bold text-slate-300">{formatPrice(currentMonthMetrics.totalCogs)}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Head Expenses</span>
                    <p className="font-bold text-rose-400">{formatPrice(currentMonthMetrics.totalExpenses)}</p>
                  </div>
                </div>

                <button
                  onClick={() => setProfitTimeframe('current_month')}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    profitTimeframe === 'current_month'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{profitTimeframe === 'current_month' ? 'Viewing Details' : 'View Deep Dive'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* BOX 2: LAST MONTH PROFIT */}
            <div className={`p-6 rounded-3xl border transition-all relative overflow-hidden ${
              profitTimeframe === 'last_month' 
                ? 'bg-slate-900 border-blue-500/40 shadow-2xl shadow-blue-500/10' 
                : 'bg-slate-900/90 border-white/10 hover:border-white/20'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Last Month Profit
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold">
                  {lastMonthMetrics.monthLabel}
                </span>
              </div>

              <div className="pt-4 space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-medium">Net Profit (Audited)</span>
                  <p className="text-3xl font-black text-blue-400 tracking-tight">
                    {formatPrice(lastMonthMetrics.netProfit)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
                  <div>
                    <span className="text-slate-500">Gross Sales</span>
                    <p className="font-bold text-white">{formatPrice(lastMonthMetrics.totalSales)}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Gross Margin</span>
                    <p className="font-bold text-blue-400">{lastMonthMetrics.grossMarginPercent.toFixed(1)}%</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Purchases / COGS</span>
                    <p className="font-bold text-slate-300">{formatPrice(lastMonthMetrics.totalCogs)}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Head Expenses</span>
                    <p className="font-bold text-rose-400">{formatPrice(lastMonthMetrics.totalExpenses)}</p>
                  </div>
                </div>

                <button
                  onClick={() => setProfitTimeframe('last_month')}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    profitTimeframe === 'last_month'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{profitTimeframe === 'last_month' ? 'Viewing Details' : 'View Deep Dive'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* BOX 3: LAST 6 MONTHS PROFIT */}
            <div className={`p-6 rounded-3xl border transition-all relative overflow-hidden ${
              profitTimeframe === 'six_months' 
                ? 'bg-slate-900 border-amber-500/40 shadow-2xl shadow-amber-500/10' 
                : 'bg-slate-900/90 border-white/10 hover:border-white/20'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Last 6 Months Profit
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold">
                  May 26 – Oct 26
                </span>
              </div>

              <div className="pt-4 space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-medium">Cumulative 6-Mo Net Profit</span>
                  <p className="text-3xl font-black text-amber-400 tracking-tight">
                    {formatPrice(sixMonthsAggregate.netProfit)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
                  <div>
                    <span className="text-slate-500">6-Mo Revenue</span>
                    <p className="font-bold text-white">{formatPrice(sixMonthsAggregate.totalSales)}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Avg / Month</span>
                    <p className="font-bold text-amber-400">{formatPrice(sixMonthsAggregate.avgMonthlyProfit)}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">6-Mo COGS</span>
                    <p className="font-bold text-slate-300">{formatPrice(sixMonthsAggregate.totalCogs)}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">6-Mo Expenses</span>
                    <p className="font-bold text-rose-400">{formatPrice(sixMonthsAggregate.totalExpenses)}</p>
                  </div>
                </div>

                <button
                  onClick={() => setProfitTimeframe('six_months')}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    profitTimeframe === 'six_months'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{profitTimeframe === 'six_months' ? 'Viewing Details' : 'View Deep Dive'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* PROFIT DETAILS TABS CONTROLS */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h4 className="text-lg font-black text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-500" />
                  <span>Financial Statement & Timeframe Breakdown</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Select a tab below to inspect detailed P&L statements, cash inflows, and head-wise expense burdens.
                </p>
              </div>

              {/* Timeframe sub-tabs */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-white/10">
                <button
                  onClick={() => setProfitTimeframe('current_month')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    profitTimeframe === 'current_month'
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Current Month
                </button>

                <button
                  onClick={() => setProfitTimeframe('last_month')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    profitTimeframe === 'last_month'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Last Month
                </button>

                <button
                  onClick={() => setProfitTimeframe('six_months')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    profitTimeframe === 'six_months'
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Last 6 Months
                </button>

                <button
                  onClick={() => setProfitTimeframe('statement')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    profitTimeframe === 'statement'
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  P&L Statement
                </button>
              </div>
            </div>

            {/* TAB CONTENT A: CURRENT MONTH */}
            {profitTimeframe === 'current_month' && (
              <div className="space-y-6">
                
                {/* Visual Waterfall Flow */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">1. Total Revenue</span>
                    <p className="text-xl font-black text-white">{formatPrice(currentMonthMetrics.totalSales)}</p>
                    <p className="text-[11px] text-emerald-400 font-semibold">{currentMonthMetrics.salesCount} customer invoices</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">2. Less: COGS / Stock Cost</span>
                    <p className="text-xl font-black text-slate-300">{formatPrice(currentMonthMetrics.totalCogs)}</p>
                    <p className="text-[11px] text-slate-500">Direct hardware cost</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">3. Less: Operating Expenses</span>
                    <p className="text-xl font-black text-rose-400">{formatPrice(currentMonthMetrics.totalExpenses)}</p>
                    <p className="text-[11px] text-slate-500">{currentMonthMetrics.expensesCount} expense vouchers</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-400">4. Net Profit</span>
                    <p className="text-2xl font-black text-emerald-300">{formatPrice(currentMonthMetrics.netProfit)}</p>
                    <p className="text-[11px] text-emerald-400 font-bold">Net Margin: {currentMonthMetrics.netMarginPercent.toFixed(1)}%</p>
                  </div>
                </div>

                {/* Head-wise Expense Impact for Current Month */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-orange-400" />
                      <span>Current Month Expense Heads Burden</span>
                    </h5>
                    <span className="text-xs font-mono text-slate-400">
                      Total: {formatPrice(currentMonthMetrics.totalExpenses)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {headWiseExpenses.map(item => (
                      <div key={item.head} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">{item.head} ({item.count} items)</span>
                          <span className="font-mono text-slate-200 font-bold">
                            {formatPrice(item.amount)} <span className="text-slate-500 text-[10px]">({item.percent.toFixed(1)}%)</span>
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-rose-500" 
                            style={{ width: `${Math.min(item.percent, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT B: LAST MONTH */}
            {profitTimeframe === 'last_month' && (
              <div className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">September Revenue</span>
                    <p className="text-xl font-black text-white">{formatPrice(lastMonthMetrics.totalSales)}</p>
                    <p className="text-[11px] text-blue-400 font-semibold">{lastMonthMetrics.salesCount} closed sales</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">September COGS</span>
                    <p className="text-xl font-black text-slate-300">{formatPrice(lastMonthMetrics.totalCogs)}</p>
                    <p className="text-[11px] text-slate-500">Gross Margin: {lastMonthMetrics.grossMarginPercent.toFixed(1)}%</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">September Expenses</span>
                    <p className="text-xl font-black text-rose-400">{formatPrice(lastMonthMetrics.totalExpenses)}</p>
                    <p className="text-[11px] text-slate-500">{lastMonthMetrics.expensesCount} cleared vouchers</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-blue-400">September Net Profit</span>
                    <p className="text-2xl font-black text-blue-300">{formatPrice(lastMonthMetrics.netProfit)}</p>
                    <p className="text-[11px] text-blue-400 font-bold">Net Margin: {lastMonthMetrics.netMarginPercent.toFixed(1)}%</p>
                  </div>
                </div>

                {/* Month-over-Month Comparison Card */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Month-Over-Month Performance Analysis
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <span className="text-slate-400">Gross Margin Stability</span>
                      <p className="text-base font-black text-emerald-400">
                        {currentMonthMetrics.grossMarginPercent >= lastMonthMetrics.grossMarginPercent ? '+ ' : ''}
                        {(currentMonthMetrics.grossMarginPercent - lastMonthMetrics.grossMarginPercent).toFixed(1)}%
                      </p>
                      <p className="text-[10px] text-slate-500">Current vs Last Month Margin Delta</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <span className="text-slate-400">Expense Burden Control</span>
                      <p className="text-base font-black text-blue-400">
                        {((currentMonthMetrics.totalExpenses / (lastMonthMetrics.totalExpenses || 1)) * 100).toFixed(0)}%
                      </p>
                      <p className="text-[10px] text-slate-500">Current expense ratio of last month</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <span className="text-slate-400">Net Take-Home Delta</span>
                      <p className="text-base font-black text-white">
                        {formatPrice(currentMonthMetrics.netProfit - lastMonthMetrics.netProfit)}
                      </p>
                      <p className="text-[10px] text-slate-500">Net variance between months</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT C: LAST 6 MONTHS MATRIX TABLE */}
            {profitTimeframe === 'six_months' && (
              <div className="space-y-6">
                
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 border-b border-white/10 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Month</th>
                        <th className="py-3 px-4">Gross Revenue</th>
                        <th className="py-3 px-4">COGS (Stock)</th>
                        <th className="py-3 px-4">Gross Profit</th>
                        <th className="py-3 px-4">Head Expenses</th>
                        <th className="py-3 px-4">Net Profit</th>
                        <th className="py-3 px-4">Net Margin</th>
                        <th className="py-3 px-4">Cash Flow</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-slate-900/60 font-mono">
                      {sixMonthsMetrics.map((m, idx) => (
                        <tr key={m.monthKey} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4 font-sans font-bold text-white flex items-center gap-2">
                            {idx === 0 && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                            <span>{m.monthLabel}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-200">{formatPrice(m.totalSales)}</td>
                          <td className="py-3 px-4 text-slate-400">{formatPrice(m.totalCogs)}</td>
                          <td className="py-3 px-4 text-emerald-400 font-semibold">{formatPrice(m.grossProfit)}</td>
                          <td className="py-3 px-4 text-rose-400">{formatPrice(m.totalExpenses)}</td>
                          <td className="py-3 px-4 font-bold text-emerald-400 text-sm">
                            {formatPrice(m.netProfit)}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                              {m.netMarginPercent.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-bold ${m.netCashFlow >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {formatPrice(m.netCashFlow)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-950 font-bold border-t-2 border-white/20 text-xs">
                      <tr>
                        <td className="py-3.5 px-4 font-sans text-white">6-MONTH TOTAL</td>
                        <td className="py-3.5 px-4 text-white font-mono">{formatPrice(sixMonthsAggregate.totalSales)}</td>
                        <td className="py-3.5 px-4 text-slate-300 font-mono">{formatPrice(sixMonthsAggregate.totalCogs)}</td>
                        <td className="py-3.5 px-4 text-emerald-400 font-mono">{formatPrice(sixMonthsAggregate.grossProfit)}</td>
                        <td className="py-3.5 px-4 text-rose-400 font-mono">{formatPrice(sixMonthsAggregate.totalExpenses)}</td>
                        <td className="py-3.5 px-4 text-amber-400 font-mono text-sm">{formatPrice(sixMonthsAggregate.netProfit)}</td>
                        <td className="py-3.5 px-4 text-emerald-400 font-mono">{sixMonthsAggregate.netMarginPercent.toFixed(1)}%</td>
                        <td className="py-3.5 px-4 text-emerald-400 font-mono">{formatPrice(sixMonthsAggregate.netCashFlow)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

              </div>
            )}

            {/* TAB CONTENT D: FORMAL P&L STATEMENT */}
            {profitTimeframe === 'statement' && (
              <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 space-y-6">
                <div className="text-center pb-4 border-b border-white/10">
                  <h3 className="text-xl font-black text-white tracking-wider uppercase font-brand">
                    War Computers Depot & Wholesale
                  </h3>
                  <p className="text-xs text-slate-400">Statement of Profit & Loss and Retained Cash Flow</p>
                  <p className="text-[11px] font-mono text-orange-400 mt-1">Period: May 2026 – October 2026</p>
                </div>

                <div className="space-y-4 max-w-3xl mx-auto text-xs">
                  
                  {/* Revenue section */}
                  <div className="space-y-1.5 pb-3 border-b border-white/10">
                    <div className="flex justify-between font-bold text-white text-sm">
                      <span>1. REVENUE FROM SALES & WHOLESALE CONTRACTS</span>
                      <span className="font-mono text-emerald-400">{formatPrice(sixMonthsAggregate.totalSales)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 pl-4">
                      <span>• Wholesale B2B Contracts & Education Deployments</span>
                      <span className="font-mono">{formatPrice(sixMonthsAggregate.totalSales * 0.72)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 pl-4">
                      <span>• Walk-in Retail & Direct Store Customers</span>
                      <span className="font-mono">{formatPrice(sixMonthsAggregate.totalSales * 0.28)}</span>
                    </div>
                  </div>

                  {/* COGS */}
                  <div className="space-y-1.5 pb-3 border-b border-white/10">
                    <div className="flex justify-between font-bold text-slate-300">
                      <span>2. COST OF GOODS SOLD (DIRECT HARDWARE & UPGRADES)</span>
                      <span className="font-mono text-rose-400">({formatPrice(sixMonthsAggregate.totalCogs)})</span>
                    </div>
                    <div className="flex justify-between text-slate-400 pl-4">
                      <span>• Procurement of Grade-A Laptops, Desktops, Chromebooks & SSDs</span>
                      <span className="font-mono">({formatPrice(sixMonthsAggregate.totalCogs)})</span>
                    </div>
                  </div>

                  {/* Gross Profit */}
                  <div className="flex justify-between font-black text-white text-base py-2 px-3 rounded-xl bg-slate-900 border border-white/10">
                    <span>GROSS OPERATING PROFIT</span>
                    <span className="font-mono text-emerald-400">{formatPrice(sixMonthsAggregate.grossProfit)}</span>
                  </div>

                  {/* Operating expenses itemized */}
                  <div className="space-y-2 pb-3 border-b border-white/10 pt-2">
                    <div className="flex justify-between font-bold text-slate-300">
                      <span>3. OPERATING OVERHEAD EXPENSES (BY HEADS)</span>
                      <span className="font-mono text-rose-400">({formatPrice(sixMonthsAggregate.totalExpenses)})</span>
                    </div>
                    {headWiseExpenses.slice(0, 8).map(headItem => (
                      <div key={headItem.head} className="flex justify-between text-slate-400 pl-4">
                        <span>• {headItem.head}</span>
                        <span className="font-mono">({formatPrice(headItem.amount)})</span>
                      </div>
                    ))}
                  </div>

                  {/* Net Profit Final */}
                  <div className="flex justify-between font-black text-lg py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-500/40 text-emerald-300">
                    <span>NET PROFIT BEFORE TAX</span>
                    <span className="font-mono text-2xl font-black text-emerald-300">
                      {formatPrice(sixMonthsAggregate.netProfit)}
                    </span>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 1: PURCHASE (STOCK & HARDWARE PROCUREMENT) */}
      {/* ========================================================= */}
      {activeSection === 'purchase' && (
        <div className="space-y-6">
          
          {/* Purchase KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Purchases Value</span>
              <p className="text-xl font-black text-white">{formatPrice(grandTotals.totalPurchases)}</p>
              <p className="text-[10px] text-slate-500">All-time procurement cost</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Purchases This Month</span>
              <p className="text-xl font-black text-blue-400">{formatPrice(currentMonthMetrics.totalPurchases)}</p>
              <p className="text-[10px] text-slate-500">October 2026 acquisitions</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Pending Payables</span>
              <p className="text-xl font-black text-amber-400">
                {formatPrice(purchases.filter(p => p.paymentStatus !== 'Paid').reduce((acc, p) => acc + (p.totalCost - (p.paidAmount || 0)), 0))}
              </p>
              <p className="text-[10px] text-slate-500">Balance due to suppliers</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Units Procured</span>
              <p className="text-xl font-black text-emerald-400">
                {purchases.reduce((acc, p) => acc + p.quantity, 0)} Units
              </p>
              <p className="text-[10px] text-slate-500">Across {purchases.length} batch orders</p>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search PO #, supplier, or hardware item..."
                value={purchaseSearch}
                onChange={e => setPurchaseSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={purchaseCategoryFilter}
                onChange={e => setPurchaseCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="Laptops">Laptops</option>
                <option value="Desktops">Desktops</option>
                <option value="Chromebooks">Chromebooks</option>
                <option value="Workstations">Workstations</option>
                <option value="Components & Parts">Components & Parts</option>
                <option value="Packaging & Supplies">Packaging & Supplies</option>
                <option value="Accessories">Accessories</option>
              </select>

              <select
                value={purchaseStatusFilter}
                onChange={e => setPurchaseStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
              </select>
            </div>
          </div>

          {/* Purchases Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900 shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-white/10 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">PO # / Date</th>
                  <th className="py-3 px-4">Supplier & Reference</th>
                  <th className="py-3 px-4">Item & Category</th>
                  <th className="py-3 px-4">Qty & Unit Cost</th>
                  <th className="py-3 px-4">Total Cost</th>
                  <th className="py-3 px-4">Status & Method</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredPurchases.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500 font-sans">
                      No purchase records match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredPurchases.map(p => (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-blue-400">{p.poNumber}</span>
                        <p className="text-[10px] text-slate-400 font-sans">{p.date}</p>
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <p className="font-bold text-white">{p.supplierName}</p>
                        {p.invoiceRef && <p className="text-[10px] text-slate-500 font-mono">Ref: {p.invoiceRef}</p>}
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <p className="font-semibold text-slate-200 line-clamp-1">{p.itemDescription}</p>
                        <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-white font-bold">{p.quantity} units</p>
                        <p className="text-[10px] text-slate-400">@ {formatPrice(p.unitCost)}</p>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white text-sm">
                        {formatPrice(p.totalCost)}
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          p.paymentStatus === 'Paid'
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : p.paymentStatus === 'Partial'
                            ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                        }`}>
                          {p.paymentStatus}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-1">{p.paymentMethod}</p>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingPurchase(p);
                              setPurchaseForm({
                                poNumber: p.poNumber,
                                date: p.date,
                                supplierName: p.supplierName,
                                itemDescription: p.itemDescription,
                                category: p.category,
                                quantity: p.quantity,
                                unitCost: p.unitCost,
                                totalCost: p.totalCost,
                                paidAmount: p.paidAmount,
                                paymentStatus: p.paymentStatus,
                                paymentMethod: p.paymentMethod,
                                invoiceRef: p.invoiceRef || '',
                                notes: p.notes || ''
                              });
                              setIsPurchaseModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Edit Record"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeletePurchase(p.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: SALE (SALES INVOICES & REVENUE GENERATION) */}
      {/* ========================================================= */}
      {activeSection === 'sale' && (
        <div className="space-y-6">
          
          {/* Sale KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Sales Revenue</span>
              <p className="text-xl font-black text-emerald-400">{formatPrice(grandTotals.totalSales)}</p>
              <p className="text-[10px] text-slate-500">Gross sales across channels</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Revenue This Month</span>
              <p className="text-xl font-black text-white">{formatPrice(currentMonthMetrics.totalSales)}</p>
              <p className="text-[10px] text-slate-500">October 2026 performance</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Gross Profit</span>
              <p className="text-xl font-black text-amber-400">{formatPrice(grandTotals.totalGrossProfit)}</p>
              <p className="text-[10px] text-slate-500">Sales minus COGS</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Units Sold</span>
              <p className="text-xl font-black text-blue-400">
                {sales.reduce((acc, s) => acc + s.quantity, 0)} Units
              </p>
              <p className="text-[10px] text-slate-500">Across {sales.length} invoices</p>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Invoice #, customer, or product..."
                value={saleSearch}
                onChange={e => setSaleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={saleChannelFilter}
                onChange={e => setSaleChannelFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300 focus:outline-none"
              >
                <option value="all">All Channels</option>
                <option value="Retail Store">Retail Store</option>
                <option value="Wholesale B2B">Wholesale B2B</option>
                <option value="Depot Walk-in">Depot Walk-in</option>
                <option value="Online Order">Online Order</option>
              </select>

              <select
                value={saleStatusFilter}
                onChange={e => setSaleStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300 focus:outline-none"
              >
                <option value="all">All Payment Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
              </select>

              {orders.length > 0 && onImportOrdersToSales && (
                <button
                  onClick={onImportOrdersToSales}
                  className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-white/10 text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Import from Live Customer Orders"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Orders ({orders.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* Sales Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900 shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-white/10 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Invoice / Date</th>
                  <th className="py-3 px-4">Customer & Channel</th>
                  <th className="py-3 px-4">Sold Item & Qty</th>
                  <th className="py-3 px-4">Revenue</th>
                  <th className="py-3 px-4">COGS</th>
                  <th className="py-3 px-4">Gross Profit</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredSales.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500 font-sans">
                      No sales records match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredSales.map(s => {
                    const margin = s.totalAmount > 0 ? (s.grossProfit / s.totalAmount) * 100 : 0;
                    return (
                      <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-emerald-400">{s.invoiceNumber}</span>
                          <p className="text-[10px] text-slate-400 font-sans">{s.date}</p>
                        </td>
                        <td className="py-3.5 px-4 font-sans">
                          <p className="font-bold text-white">{s.customerName}</p>
                          <span className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            s.channel === 'Wholesale B2B'
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {s.channel}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-sans">
                          <p className="font-semibold text-slate-200 line-clamp-1">{s.itemDescription}</p>
                          <p className="text-[10px] font-mono text-slate-400">{s.quantity} units @ {formatPrice(s.unitPrice)}</p>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-400 text-sm">
                          {formatPrice(s.totalAmount)}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">
                          {formatPrice(s.totalCogs)}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-amber-400">{formatPrice(s.grossProfit)}</p>
                          <span className="text-[10px] text-emerald-400 font-bold">+{margin.toFixed(0)}%</span>
                        </td>
                        <td className="py-3.5 px-4 font-sans">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            {s.paymentStatus}
                          </span>
                          <p className="text-[10px] text-slate-500 mt-1">{s.paymentMethod}</p>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingSale(s);
                                setSaleForm({
                                  invoiceNumber: s.invoiceNumber,
                                  date: s.date,
                                  customerName: s.customerName,
                                  companyName: s.companyName || '',
                                  channel: s.channel,
                                  itemDescription: s.itemDescription,
                                  quantity: s.quantity,
                                  unitPrice: s.unitPrice,
                                  totalAmount: s.totalAmount,
                                  cogsUnitCost: s.cogsUnitCost,
                                  totalCogs: s.totalCogs,
                                  grossProfit: s.grossProfit,
                                  paymentStatus: s.paymentStatus,
                                  paymentMethod: s.paymentMethod,
                                  notes: s.notes || ''
                                });
                                setIsSaleModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                              title="Edit Record"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteSale(s.id)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 3: EXPENSE (HEADS OF EXPENSES MANAGEMENT) */}
      {/* ========================================================= */}
      {activeSection === 'expense' && (
        <div className="space-y-6">
          
          {/* Expense KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Operating Expenses</span>
              <p className="text-xl font-black text-rose-400">{formatPrice(grandTotals.totalExpenses)}</p>
              <p className="text-[10px] text-slate-500">All-time depot overheads</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Expenses This Month</span>
              <p className="text-xl font-black text-white">{formatPrice(currentMonthMetrics.totalExpenses)}</p>
              <p className="text-[10px] text-slate-500">October 2026 overheads</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Largest Expense Head</span>
              <p className="text-base font-black text-amber-400 truncate">
                {headWiseExpenses[0]?.head || 'Salaries'}
              </p>
              <p className="text-[10px] text-slate-500">{formatPrice(headWiseExpenses[0]?.amount || 0)}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Active Expense Heads</span>
              <p className="text-xl font-black text-emerald-400">{expenseHeads.length} Heads</p>
              <p className="text-[10px] text-slate-500">Structured accounts matrix</p>
            </div>
          </div>

          {/* Quick Expense Head Matrix Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Receipt className="w-3.5 h-3.5 text-rose-400" />
                <span>Filter by Expense Head of Account</span>
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  id="btn-add-expense-head"
                  onClick={() => {
                    setNewHeadName('');
                    setNewHeadError('');
                    setIsAddHeadModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Expense Head</span>
                </button>
                <button
                  onClick={() => setExpenseHeadFilter('all')}
                  className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    expenseHeadFilter === 'all'
                      ? 'text-orange-400 border-orange-500/40 bg-orange-500/10'
                      : 'text-slate-400 border-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  Reset Filter (Show All)
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {expenseHeads.map(head => {
                const count = expenses.filter(e => e.head === head).length;
                const headTotal = expenses.filter(e => e.head === head).reduce((acc, e) => acc + e.amount, 0);
                const isSelected = expenseHeadFilter === head;
                return (
                  <button
                    key={head}
                    onClick={() => setExpenseHeadFilter(isSelected ? 'all' : head)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30'
                        : 'bg-slate-950 text-slate-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span>{head}</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px] font-mono">
                      {formatPrice(headTotal)}
                    </span>
                  </button>
                );
              })}

              {/* Add Expense Head button in badge matrix */}
              <button
                type="button"
                onClick={() => {
                  setNewHeadName('');
                  setNewHeadError('');
                  setIsAddHeadModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold border border-dashed border-rose-500/50 hover:border-rose-400 text-rose-300 hover:text-white bg-rose-500/5 hover:bg-rose-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                title="Add new Expense Head category"
              >
                <Plus className="w-3.5 h-3.5 text-rose-400" />
                <span>Add Expense Head</span>
              </button>
            </div>
          </div>

          {/* Search Toolbar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search voucher #, payee, or description..."
                value={expenseSearch}
                onChange={e => setExpenseSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={expenseStatusFilter}
                onChange={e => setExpenseStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="Cleared">Cleared</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900 shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-white/10 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Voucher / Date</th>
                  <th className="py-3 px-4">Expense Head</th>
                  <th className="py-3 px-4">Payee & Purpose</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Method & Paid By</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredExpenses.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500 font-sans">
                      No expense vouchers match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredExpenses.map(e => (
                    <tr key={e.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-rose-400">{e.voucherNumber}</span>
                        <p className="text-[10px] text-slate-400 font-sans">{e.date}</p>
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <span className="inline-block px-2 py-0.5 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px] font-semibold">
                          {e.head}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <p className="font-bold text-white">{e.payee}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{e.description}</p>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-rose-400 text-sm">
                        {formatPrice(e.amount)}
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <p className="font-semibold text-slate-300">{e.paymentMethod}</p>
                        <p className="text-[10px] text-slate-500">By: {e.paidBy}</p>
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          e.status === 'Cleared'
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingExpense(e);
                              setExpenseForm({
                                voucherNumber: e.voucherNumber,
                                date: e.date,
                                head: e.head,
                                customHead: e.customHead || '',
                                payee: e.payee,
                                description: e.description,
                                amount: e.amount,
                                paymentMethod: e.paymentMethod,
                                paidBy: e.paidBy,
                                status: e.status,
                                receiptRef: e.receiptRef || '',
                                notes: e.notes || ''
                              });
                              setIsExpenseModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Edit Record"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteExpense(e.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: ADD / EDIT PURCHASE */}
      {/* ========================================================= */}
      {isPurchaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/15 rounded-3xl w-full max-w-xl p-6 sm:p-7 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsPurchaseModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-blue-400" />
                <span>{editingPurchase ? 'Edit Purchase Order' : 'Record New Hardware Purchase'}</span>
              </h3>
              <p className="text-xs text-slate-400">Enter supplier procurement details and invoice costs.</p>
            </div>

            <form onSubmit={handleSavePurchase} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">PO / Reference #</label>
                  <input
                    type="text"
                    required
                    value={purchaseForm.poNumber}
                    onChange={e => setPurchaseForm({ ...purchaseForm, poNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={purchaseForm.date}
                    onChange={e => setPurchaseForm({ ...purchaseForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Supplier / Vendor Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dubai Tech Logistics FZE"
                  value={purchaseForm.supplierName}
                  onChange={e => setPurchaseForm({ ...purchaseForm, supplierName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Item Description / Hardware Batch</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 25x HP EliteBook 840 G7 Core i7 Laptops"
                  value={purchaseForm.itemDescription}
                  onChange={e => setPurchaseForm({ ...purchaseForm, itemDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={purchaseForm.category}
                    onChange={e => setPurchaseForm({ ...purchaseForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    <option value="Laptops">Laptops</option>
                    <option value="Desktops">Desktops</option>
                    <option value="Chromebooks">Chromebooks</option>
                    <option value="Workstations">Workstations</option>
                    <option value="Components & Parts">Components & Parts</option>
                    <option value="Packaging & Supplies">Packaging & Supplies</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={purchaseForm.quantity}
                    onChange={e => setPurchaseForm({ ...purchaseForm, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Unit Cost (Rs.)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={purchaseForm.unitCost}
                    onChange={e => setPurchaseForm({ ...purchaseForm, unitCost: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
                  />
                </div>
              </div>

              {/* Real-time total calculation */}
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Total Purchase Cost:</span>
                <span className="text-lg font-black text-blue-400 font-mono">
                  {formatPrice(purchaseForm.quantity * purchaseForm.unitCost)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Payment Status</label>
                  <select
                    value={purchaseForm.paymentStatus}
                    onChange={e => setPurchaseForm({ ...purchaseForm, paymentStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Payment Method</label>
                  <select
                    value={purchaseForm.paymentMethod}
                    onChange={e => setPurchaseForm({ ...purchaseForm, paymentMethod: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Net-30">Net-30 Terms</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPurchaseModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30 cursor-pointer"
                >
                  Save Purchase Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ADD / EDIT SALE */}
      {/* ========================================================= */}
      {isSaleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/15 rounded-3xl w-full max-w-xl p-6 sm:p-7 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsSaleModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <span>{editingSale ? 'Edit Sale Invoice' : 'Record New Customer Sale'}</span>
              </h3>
              <p className="text-xs text-slate-400">Record selling price and COGS to calculate gross profit.</p>
            </div>

            <form onSubmit={handleSaveSale} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Invoice #</label>
                  <input
                    type="text"
                    required
                    value={saleForm.invoiceNumber}
                    onChange={e => setSaleForm({ ...saleForm, invoiceNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={saleForm.date}
                    onChange={e => setSaleForm({ ...saleForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Customer / Organization Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Horizon Academy or Walk-in Customer"
                    value={saleForm.customerName}
                    onChange={e => setSaleForm({ ...saleForm, customerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sales Channel</label>
                  <select
                    value={saleForm.channel}
                    onChange={e => setSaleForm({ ...saleForm, channel: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    <option value="Retail Store">Retail Store</option>
                    <option value="Wholesale B2B">Wholesale B2B</option>
                    <option value="Depot Walk-in">Depot Walk-in</option>
                    <option value="Online Order">Online Order</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Item / Product Sold</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10x War Titan Rugged Chromebooks"
                  value={saleForm.itemDescription}
                  onChange={e => setSaleForm({ ...saleForm, itemDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={saleForm.quantity}
                    onChange={e => setSaleForm({ ...saleForm, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Selling Price / Unit</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={saleForm.unitPrice}
                    onChange={e => setSaleForm({ ...saleForm, unitPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Cost / Unit (COGS)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={saleForm.cogsUnitCost}
                    onChange={e => setSaleForm({ ...saleForm, cogsUnitCost: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
                  />
                </div>
              </div>

              {/* Profit calculation preview */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Revenue:</span>
                  <span className="font-mono font-bold text-white">
                    {formatPrice(saleForm.quantity * saleForm.unitPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total COGS:</span>
                  <span className="font-mono text-slate-400">
                    {formatPrice(saleForm.quantity * saleForm.cogsUnitCost)}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/10 font-bold">
                  <span className="text-emerald-400">Calculated Gross Profit:</span>
                  <span className="font-mono text-emerald-400 text-sm">
                    {formatPrice((saleForm.quantity * saleForm.unitPrice) - (saleForm.quantity * saleForm.cogsUnitCost))}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Payment Status</label>
                  <select
                    value={saleForm.paymentStatus}
                    onChange={e => setSaleForm({ ...saleForm, paymentStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Payment Method</label>
                  <select
                    value={saleForm.paymentMethod}
                    onChange={e => setSaleForm({ ...saleForm, paymentMethod: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer / Raast">Bank Transfer / Raast</option>
                    <option value="Card POS">Credit/Debit Card POS</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Net-30">Net-30 Terms</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSaleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/30 cursor-pointer"
                >
                  Save Sale Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: ADD / EDIT EXPENSE (EXPENSE HEADS) */}
      {/* ========================================================= */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/15 rounded-3xl w-full max-w-xl p-6 sm:p-7 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsExpenseModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-rose-400" />
                <span>{editingExpense ? 'Edit Expense Voucher' : 'Record Operating Expense'}</span>
              </h3>
              <p className="text-xs text-slate-400">Classify overhead under specific Expense Heads to maintain ledger accuracy.</p>
            </div>

            <form onSubmit={handleSaveExpense} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Voucher #</label>
                  <input
                    type="text"
                    required
                    value={expenseForm.voucherNumber}
                    onChange={e => setExpenseForm({ ...expenseForm, voucherNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={expenseForm.date}
                    onChange={e => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-semibold text-xs">Expense Head (Category)</label>
                  <button
                    type="button"
                    onClick={() => {
                      setNewHeadName('');
                      setNewHeadError('');
                      setIsAddHeadModalOpen(true);
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add New Head</span>
                  </button>
                </div>
                <select
                  value={expenseForm.head}
                  onChange={e => setExpenseForm({ ...expenseForm, head: e.target.value as ExpenseHead })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-medium"
                >
                  {expenseHeads.map(head => (
                    <option key={head} value={head}>{head}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Payee / Beneficiary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hafeez Plaza Management or LESCO"
                  value={expenseForm.payee}
                  onChange={e => setExpenseForm({ ...expenseForm, payee: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Purpose / Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. October Central Depot & Showroom Rent"
                  value={expenseForm.description}
                  onChange={e => setExpenseForm({ ...expenseForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Amount (Rs.)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={expenseForm.amount}
                    onChange={e => setExpenseForm({ ...expenseForm, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Payment Method</label>
                  <select
                    value={expenseForm.paymentMethod}
                    onChange={e => setExpenseForm({ ...expenseForm, paymentMethod: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Company Card">Company Card</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Approved / Paid By</label>
                  <input
                    type="text"
                    required
                    value={expenseForm.paidBy}
                    onChange={e => setExpenseForm({ ...expenseForm, paidBy: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Voucher Status</label>
                  <select
                    value={expenseForm.status}
                    onChange={e => setExpenseForm({ ...expenseForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    <option value="Cleared">Cleared</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsExpenseModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/30 cursor-pointer"
                >
                  Save Expense Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: ADD NEW EXPENSE HEAD */}
      {/* ========================================================= */}
      {isAddHeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/15 rounded-3xl w-full max-w-md p-6 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                setIsAddHeadModalOpen(false);
                setNewHeadError('');
              }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Add Expense Head</h3>
                <p className="text-xs text-slate-400">Create a new ledger account category for overheads</p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddExpenseHead();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-slate-300 font-semibold text-xs mb-1">
                  Expense Head Name / Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. Courier & Freight Forwarding, Solar Maintenance"
                  value={newHeadName}
                  onChange={e => {
                    setNewHeadName(e.target.value);
                    if (newHeadError) setNewHeadError('');
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                />
                {newHeadError && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{newHeadError}</span>
                  </p>
                )}
              </div>

              {/* Suggestions / Quick Presets */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Quick Suggestions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Solar & Backup Inverter Maintenance',
                    'Security Guard & Night Watch',
                    'Courier & Cargo Parcel Fees',
                    'Software Licenses & Subscriptions',
                    'Customs Clearance & Port Surcharge',
                    'Staff Performance Bonus & Eid Allowance',
                    'Social Media Marketing & Ads',
                    'Tools & Oscilloscope Calibration'
                  ]
                    .filter(suggestion => !expenseHeads.some(h => h.toLowerCase() === suggestion.toLowerCase()))
                    .slice(0, 5)
                    .map(suggestion => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => {
                          setNewHeadName(suggestion);
                          if (newHeadError) setNewHeadError('');
                        }}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/5 transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3 text-rose-400" />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddHeadModalOpen(false);
                    setNewHeadError('');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save Expense Head</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Success Toast */}
      {headSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{headSuccessToast}</span>
        </div>
      )}

    </div>
  );
};
