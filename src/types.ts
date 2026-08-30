export type ProductCategory = 
  | 'all' 
  | 'desktops' 
  | 'laptops' 
  | 'chromebooks' 
  | 'tablets' 
  | 'workstations' 
  | 'wholesale_lots';

export type ProductCondition = 'Brand New' | 'Factory Certified' | 'Bulk Refurbished Grade-A';

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
  brand: 'Apple' | 'ASUS' | 'Dell' | 'HP' | 'Lenovo' | 'MSI' | 'Razer' | 'Acer' | 'Custom Rig';
  category: 'desktops' | 'laptops' | 'chromebooks' | 'tablets' | 'workstations' | 'wholesale_lots';
  retailPrice: number;
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
  isBulkLot?: boolean;
  lotUnitCount?: number; // e.g. 10 or 25 units per lot
  images: string[];
  specs: ProductSpecs;
  highlights: string[];
  description: string;
  tags: string[];
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
