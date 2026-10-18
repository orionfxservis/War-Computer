export type ProductCategory = 
  | 'all' 
  | 'laptops' 
  | 'business_laptops'
  | 'gaming_laptops'
  | 'workstations' 
  | 'chromebooks' 
  | 'desktops' 
  | 'tablets' 
  | 'wholesale_lots';

export type ProductCondition = 
  | 'NEW' 
  | 'USED' 
  | 'REFURBISHED' 
  | 'OPEN BOX'
  | 'Brand New' 
  | 'Factory Certified' 
  | 'Bulk Refurbished Grade-A';

export interface ProductSpecs {
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  display?: string;
  os: string;
  ports?: string;
  battery?: string;
  warranty: string;
  formFactor?: string;
  weight?: string;
  powerSupply?: string;
  cooling?: string;
  aueDate?: string;
  zeroTouchEnrollment?: string;
  militaryStandard?: string;
  expansionSlots?: string;
  raidSupport?: string;
  coolingType?: string;
  chassisFormFactor?: string;
  [key: string]: string | undefined;
}

export interface WholesaleTier {
  minUnits: number;
  maxUnits?: number;
  pricePerUnit: number;
  discountPercentage: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: 'Apple' | 'ASUS' | 'Dell' | 'HP' | 'Lenovo' | 'MSI' | 'Razer' | 'Acer' | 'Samsung' | 'CTL' | '1st Player' | 'Custom Rig' | string;
  category: ProductCategory | string;
  retailPrice: number;
  originalPrice?: number; // Regular market price before genuine deal discount
  wholesalePrice: number; // base wholesale price
  wholesaleMOQ: number; // Minimum Order Quantity for wholesale
  wholesaleTiers: WholesaleTier[];
  stockQuantity: number;
  condition: ProductCondition;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isDealOfTheDay?: boolean; // Featured in Today's Deals section
  isBulkLot?: boolean;
  lotUnitCount?: number; // e.g. 10 or 25 units per lot
  images: string[];
  specs: ProductSpecs;
  highlights: string[];
  description: string;
  tags: string[];
  warComputerUrl?: string;
  warComputerCategory?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isWholesaleOrder: boolean;
  unitPrice: number;
  subtotal: number;
}

export type PricingMode = 'retail' | 'wholesale';

export interface FilterState {
  category: ProductCategory;
  brand: string;
  minPrice: number;
  maxPrice: number;
  pricingMode: PricingMode;
  search: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'stock' | 'discount';
  condition: string;
  inStockOnly: boolean;
}

export interface WholesaleQuoteRequest {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  taxId?: string;
  businessType: 'Retailer' | 'Corporate Enterprise' | 'School / University' | 'Government / NGO' | 'Export / Importer' | 'Individual Pro';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    estimatedUnitPrice: number;
    subtotal: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  freightPreference: 'Standard Freight (LTL Pallet)' | 'Air Express Priority' | 'Local Warehouse Pickup' | 'Sea Container FCL';
  targetDate: string;
  notes: string;
  estimatedTotal: number;
  status: 'Pending Review' | 'Price Locked' | 'Invoice Generated' | 'Fulfilled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'agent';
  text: string;
  timestamp: string;
  recommendedProductIds?: string[];
  quickReplies?: string[];
}

export interface OrderTrackingInfo {
  orderId: string;
  customerName: string;
  orderDate: string;
  orderType: 'retail' | 'wholesale';
  status: 'Processing' | 'Assembled & Tested' | 'Quality Passed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  totalAmount: number;
  itemsCount: number;
  timeline: {
    status: string;
    date: string;
    description: string;
    completed: boolean;
    current?: boolean;
  }[];
}

export interface SalesAnalytics {
  timeframe: string;
  totalRevenue: number;
  revenueGrowth: number;
  retailRevenue: number;
  wholesaleRevenue: number;
  unitsSold: number;
  averageOrderValue: number;
  totalInventoryUnits: number;
  totalInventoryValuation: number;
  lowStockItemsCount: number;
  monthlyTrends: {
    month: string;
    retailSales: number;
    wholesaleSales: number;
    units: number;
  }[];
  categoryBreakdown: {
    category: string;
    sharePercent: number;
    revenue: number;
    units: number;
  }[];
  topMovingProducts: {
    id: string;
    name: string;
    category: string;
    unitsSold: number;
    revenue: number;
    stockRemaining: number;
  }[];
  stockAlerts: {
    id: string;
    name: string;
    currentStock: number;
    reorderLevel: number;
    leadTimeDays: number;
    supplier: string;
    status: 'Critical' | 'Low' | 'Adequate';
  }[];
}

export type SiteThemeId = 'war-blue' | 'tech-cyan' | 'premium-gold' | 'modern-red' | 'clean-white';

export interface SiteThemeConfig {
  id: SiteThemeId;
  name: string;
  badge: string;
  paletteLabel: string;
  description: string;
  bgCanvas?: string;
  bgSurface?: string;
  fontAccent?: string;
  fontHighlight?: string;
  heroGradient?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    icon: string;
    glow: string;
  };
}

export interface InquiryReply {
  id: string;
  channel: 'email' | 'whatsapp' | 'internal_note';
  sender: string; // e.g. "War Computers Admin (Support Desk)"
  message: string;
  sentAt: string;
  subject?: string;
  deliveryStatus?: 'sent' | 'delivered' | 'opened' | 'draft';
}

export interface CustomerInquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string; // WhatsApp phone number (e.g. +92 333 1234567)
  city?: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'order' | 'quote' | 'wholesale' | 'support' | 'product_availability';
  productId?: string;
  productName?: string;
  createdAt: string;
  status: 'new' | 'replied_email' | 'replied_whatsapp' | 'resolved' | 'pending';
  priority?: 'high' | 'normal' | 'urgent';
  internalNotes?: string;
  replies: InquiryReply[];
}

// ==========================================
// TRANSACTIONS & FINANCIAL HUB TYPES
// ==========================================

export type ExpenseHead = 
  | 'Rent & Warehouse Lease'
  | 'Utilities & Electricity'
  | 'Salaries & Staff Wages'
  | 'Shipping, Freight & Customs'
  | 'Lab Tools & Repair Consumables'
  | 'Packaging & Packing Supplies'
  | 'Marketing & Advertising'
  | 'Vehicle Fuel & Local Transport'
  | 'Internet & IT Software'
  | 'Taxes, Banking & Govt Fees'
  | 'Office Pantry & Refreshments'
  | 'Miscellaneous & Repairs'
  | (string & {});

export interface PurchaseRecord {
  id: string;
  poNumber: string;
  date: string; // YYYY-MM-DD
  supplierName: string;
  itemDescription: string;
  category: 'Laptops' | 'Desktops' | 'Chromebooks' | 'Workstations' | 'Components & Parts' | 'Packaging & Supplies' | 'Accessories' | 'Other';
  quantity: number;
  unitCost: number;
  totalCost: number;
  paidAmount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Partial';
  paymentMethod: 'Bank Transfer' | 'Cash' | 'Cheque' | 'Net-30';
  invoiceRef?: string;
  notes?: string;
}

export interface SaleRecord {
  id: string;
  invoiceNumber: string;
  date: string; // YYYY-MM-DD
  customerName: string;
  companyName?: string;
  channel: 'Retail Store' | 'Wholesale B2B' | 'Depot Walk-in' | 'Online Order';
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  cogsUnitCost: number; // Cost of Goods Sold per unit
  totalCogs: number; // quantity * cogsUnitCost
  grossProfit: number; // totalAmount - totalCogs
  paymentStatus: 'Paid' | 'Pending' | 'Partial';
  paymentMethod: 'Cash' | 'Bank Transfer / Raast' | 'Card POS' | 'Cheque' | 'Net-30';
  notes?: string;
}

export interface ExpenseRecord {
  id: string;
  voucherNumber: string;
  date: string; // YYYY-MM-DD
  head: ExpenseHead;
  customHead?: string;
  payee: string;
  description: string;
  amount: number;
  paymentMethod: 'Cash' | 'Bank Transfer' | 'Cheque' | 'Company Card';
  paidBy: string;
  status: 'Cleared' | 'Pending';
  receiptRef?: string;
  notes?: string;
}

export interface MonthlyFinancialSummary {
  monthKey: string; // e.g. "2026-10"
  monthLabel: string; // e.g. "October 2026"
  totalSales: number;
  totalPurchases: number;
  cogs: number;
  grossProfit: number;
  grossMarginPercent: number;
  totalExpenses: number;
  netProfit: number;
  netMarginPercent: number;
  cashInflow: number;
  cashOutflow: number;
  netCashFlow: number;
}
