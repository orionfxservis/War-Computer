import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('scraped_warcomputer_products.json', 'utf8'));

function cleanText(txt) {
  if (!txt) return '';
  return txt
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parsePrice(txt) {
  if (!txt) return 0;
  const num = txt.replace(/[^0-9]/g, '');
  return num ? parseInt(num, 10) : 0;
}

function detectBrand(fullStr) {
  const s = fullStr.toLowerCase();
  if (s.includes('alienware') || s.includes('dell')) return 'Dell';
  if (s.includes('hp') || s.includes('elitebook') || s.includes('probook') || s.includes('envy') || s.includes('zbook') || s.includes('pavilion')) return 'HP';
  if (s.includes('lenovo') || s.includes('thinkpad') || s.includes('ideapad') || s.includes('flex')) return 'Lenovo';
  if (s.includes('samsung')) return 'Samsung';
  if (s.includes('asus') || s.includes('rog') || s.includes('tuf')) return 'ASUS';
  if (s.includes('ctl')) return 'CTL';
  if (s.includes('1st player')) return '1st Player';
  if (s.includes('apple') || s.includes('macbook')) return 'Apple';
  if (s.includes('acer')) return 'Acer';
  return 'Dell';
}

function detectCategory(cat, title) {
  const c = (cat || '').toLowerCase();
  const t = (title || '').toLowerCase();
  if (c.includes('workstation') || t.includes('precision') || t.includes('zbook') || t.includes('xeon') || t.includes('quadro')) return 'workstations';
  if (c.includes('gaming') || t.includes('alienware') || t.includes('gaming')) return 'gaming_laptops';
  if (c.includes('chromebox')) return 'desktops';
  if (c.includes('chromebook') || t.includes('chromebook')) return 'chromebooks';
  if (t.includes('tablet') || t.includes('2 in 1') || t.includes('2in1') || t.includes('touch & tab') || t.includes('touch &tab')) return 'tablets';
  return 'laptops';
}

function extractCpu(title) {
  const match = title.match(/(core\s*i[3579]\s*[\d\w\-]+(?:\s*gen\w*)?|xeon\s*[\w\-]+|celeron\s*[\w\-]+|intel\s*[\w\-]+|dual[\s\-]*core|i[3579][\s\-]\d+\w*)/i);
  return match ? match[0].trim() : 'Intel Core Processor';
}

function extractRam(title) {
  const match = title.match(/(\d+\s*gb\s*(?:ddr[34])?\s*ram|\d+\s*gb\s*ddr[34]|\d+\s*gb\s*ram|\d+\s*g\s*ram|\d+\s*gb)/i);
  return match ? match[0].trim() : '8GB RAM';
}

function extractStorage(title) {
  const match = title.match(/(\d+\s*(?:gb|tb)\s*(?:ssd|hdd|nvme|m2|rom|storage)[\s\w]*|\d+\s*(?:gb|tb)\s*ssd|\d+\s*(?:gb|tb)\s*hdd|\d+\s*(?:gb|tb)\s*rom)/i);
  return match ? match[0].trim() : '256GB SSD';
}

function extractDisplay(title) {
  const match = title.match(/(\d{2}(?:\.\d)?\s*(?:inch|quot|\"|\'|\'\')?\s*(?:fhd|hd|ips|touch|display|screen)?)/i);
  return match ? match[0].replace(/quot|\"|\'|\'\'/g, '').trim() + '" Display' : '14.0" FHD Display';
}

function cleanTitle(rawTitle, brand) {
  let t = rawTitle
    .replace(/UK Import Fresh\s*\|\s*/gi, '')
    .replace(/UK Fresh Import\s*\|\s*/gi, '')
    .replace(/UK Import fresh\s*\|\s*/gi, '')
    .replace(/Best Price Deals\s*\|\s*/gi, '')
    .replace(/Affordable Price\s*\|\s*/gi, '')
    .replace(/Best deals\s*\|\s*/gi, '')
    .replace(/Best Price\s*\|\s*/gi, '')
    .replace(/Best Laptop Deals\s*\|\s*/gi, '')
    .replace(/Best price Seller\s*\|\s*/gi, '')
    .replace(/WAR Computer\s*\|\s*/gi, '')
    .replace(/War Computer\s*\|\s*/gi, '')
    .replace(/Good Condition\s*\|\s*/gi, '')
    .replace(/Good battery backup\s*\|\s*/gi, '')
    .replace(/Good battrery backup\s*\|\s*/gi, '')
    .replace(/Smart battery backup\s*\|\s*/gi, '')
    .replace(/Business laptop\s*\|\s*/gi, '')
    .replace(/Best Business laptop\s*\|\s*/gi, '')
    .replace(/\|\s*$/g, '')
    .replace(/\|\s*\|/g, '|')
    .trim();

  // If title doesn't start with brand name, prepend brand
  if (!t.toLowerCase().startsWith(brand.toLowerCase()) && !t.toLowerCase().includes(brand.toLowerCase())) {
    t = `${brand} ${t}`;
  }
  return t;
}

// Map 93 products
const catalogProducts = rawData.map((item, idx) => {
  const rawTitle = cleanText(item.fullAltName || item.shortTitle);
  const brand = detectBrand(rawTitle);
  const name = cleanTitle(rawTitle, brand);
  const category = detectCategory(item.category, rawTitle);
  const retailPrice = parsePrice(item.newPriceText) || 45000;
  const originalPrice = parsePrice(item.oldPriceText) || Math.round(retailPrice * 1.15);
  const wholesalePrice = Math.round(retailPrice * 0.88);

  const idMatch = item.detailUrl.match(/-(\d+)\.html$/);
  const numId = idMatch ? idMatch[1] : (idx + 1);

  const cpu = extractCpu(rawTitle);
  const ram = extractRam(rawTitle);
  const storage = extractStorage(rawTitle);
  const display = extractDisplay(rawTitle);

  const isQuadro = rawTitle.toLowerCase().includes('quadro') || rawTitle.toLowerCase().includes('nvidia');
  const gpu = isQuadro ? 'NVIDIA Quadro / Dedicated GPU' : 'Intel Integrated HD/UHD Graphics';

  const isStock = !item.badge || item.badge.toLowerCase().includes('stock') || item.badge.toLowerCase().includes('call');
  const stockQuantity = item.badge?.toLowerCase().includes('order') ? 4 : (isStock ? ((idx * 7) % 25) + 12 : 0);

  const tags = [
    brand.toLowerCase(),
    category,
    'warcomputer',
    'uk-import',
    'tested',
    cpu.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    ram.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    storage.toLowerCase().replace(/[^a-z0-9]/g, '-')
  ];

  return {
    id: `prod-wc-${numId}`,
    sku: `WC-${brand.toUpperCase()}-${numId}`,
    name,
    brand,
    category,
    originalPrice,
    retailPrice,
    wholesalePrice,
    wholesaleMOQ: 3,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 2, pricePerUnit: retailPrice, discountPercentage: 0 },
      { minUnits: 3, maxUnits: 5, pricePerUnit: wholesalePrice, discountPercentage: 12 },
      { minUnits: 6, maxUnits: 15, pricePerUnit: Math.round(retailPrice * 0.84), discountPercentage: 16 },
      { minUnits: 16, pricePerUnit: Math.round(retailPrice * 0.80), discountPercentage: 20 }
    ],
    stockQuantity,
    condition: 'USED',
    rating: Number((4.6 + (idx % 4) * 0.1).toFixed(1)),
    reviewsCount: 15 + ((idx * 3) % 85),
    isFeatured: idx < 12,
    isBestSeller: idx % 6 === 0,
    isNewArrival: idx % 5 === 0,
    isDealOfTheDay: idx % 9 === 0,
    images: [
      item.image,
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu,
      gpu,
      ram,
      storage,
      display,
      os: 'Windows 10 / 11 Pro Genuine Activated',
      battery: 'Original OEM Battery (3-5 Hours Tested Backup)',
      warranty: '7-Day Checking Warranty (War Computer Official)',
      ports: 'USB 3.0, HDMI / DisplayPort, Type-C, Audio Combo Jack'
    },
    highlights: [
      'Genuine UK Fresh Import Grade-A Condition',
      '100% Inspected & Tested: Motherboard, Thermals, Keyboard, Screen & Battery',
      'Official War Computer 7-Day Checking Warranty & Nationwide COD Support'
    ],
    description: `Official listing from War Computer (warcomputer.com). Grade-A UK fresh import unit verified for performance and longevity. Features ${cpu}, ${ram}, ${storage}, and clear ${display}. Inspected and certified by War Computer technicians for retail customers and wholesale procurement across Pakistan.`,
    tags,
    warComputerUrl: item.detailUrl,
    warComputerCategory: item.category
  };
});

// Preserve 2 essential bulk pallet lots for wholesale procurement
const bulkPalletLots = [
  {
    id: 'prod-bulk-opti-25lot',
    sku: 'WC-BULK-OPTI-25LOT',
    name: 'Dell OptiPlex Micro Gen12 Desktop Fleet [25-Unit Bulk Pallet]',
    brand: 'Dell',
    category: 'wholesale_lots',
    retailPrice: 875000,
    wholesalePrice: 750000,
    wholesaleMOQ: 1,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 1, pricePerUnit: 750000, discountPercentage: 14 },
      { minUnits: 2, maxUnits: 3, pricePerUnit: 700000, discountPercentage: 20 },
      { minUnits: 4, pricePerUnit: 660000, discountPercentage: 24 }
    ],
    stockQuantity: 8,
    condition: 'REFURBISHED',
    rating: 4.9,
    reviewsCount: 38,
    isFeatured: true,
    isBulkLot: true,
    lotUnitCount: 25,
    images: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Core i5-12500T 6-Core (per unit)',
      gpu: 'Intel UHD Graphics 770',
      ram: '16GB DDR4 3200MHz (per unit, 400GB Total Pallet)',
      storage: '256GB NVMe SSD (per unit, 6.4TB Total Pallet)',
      os: 'Windows 11 Pro Genuine Activated on every unit',
      warranty: '1-Month Replacement Warranty',
      ports: 'Dual DisplayPort, HDMI, 5x USB 3.2, Gigabit Ethernet'
    },
    highlights: [
      'Complete 25-Unit Pallet Lot: Save substantial margin on bulk purchase',
      'Every unit professionally tested, cleaned, thermal pasted, & Windows 11 pre-installed',
      'Ships securely boxed on wooden pallets nationwide across Pakistan'
    ],
    description: 'The turnkey bulk IT hardware lot for call centers, corporate software companies, and computer labs in Pakistan. Includes 25 micro PC units and 25 original power adapters.',
    tags: ['wholesale-lot', 'dell-optiplex', 'bulk-desktop', 'pallet-deal', 'b2b-fleet', 'refurbished'],
    warComputerCategory: 'Bulk Wholesale Pallets'
  },
  {
    id: 'prod-bulk-hp840-10lot',
    sku: 'WC-BULK-HP840-10LOT',
    name: 'HP EliteBook 840 Corporate Fleet [10-Unit Bulk Lot]',
    brand: 'HP',
    category: 'wholesale_lots',
    retailPrice: 650000,
    wholesalePrice: 580000,
    wholesaleMOQ: 1,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 1, pricePerUnit: 580000, discountPercentage: 11 },
      { minUnits: 2, maxUnits: 3, pricePerUnit: 550000, discountPercentage: 15 },
      { minUnits: 4, pricePerUnit: 520000, discountPercentage: 20 }
    ],
    stockQuantity: 6,
    condition: 'USED',
    rating: 4.8,
    reviewsCount: 26,
    isFeatured: true,
    isBulkLot: true,
    lotUnitCount: 10,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Core i5-8th/10th Gen (per unit)',
      gpu: 'Intel UHD Graphics',
      ram: '16GB DDR4 (per unit, 160GB Total Lot)',
      storage: '256GB / 512GB SSD (per unit, 3.8TB Total Lot)',
      os: 'Windows 11 Pro Genuine Activated',
      warranty: '15-Day Wholesale Checking Warranty',
      ports: 'Thunderbolt Type-C, USB 3.1, HDMI'
    },
    highlights: [
      '10-Unit Corporate Ultrabook Lot for Office Resellers & Companies',
      'Fully battery tested (3+ hours backup minimum guaranteed per unit)',
      'Grade-A Clean Cosmetically with matching original chargers'
    ],
    description: 'Bulk lot of 10 clean Grade-A HP EliteBook business ultrabooks. Tested, packed, and ready for deployment in corporate offices or retail resale across Pakistan.',
    tags: ['wholesale-lot', 'hp-elitebook', 'bulk-laptop', 'b2b-lot', 'corporate-fleet'],
    warComputerCategory: 'Bulk Wholesale Pallets'
  }
];

const allProducts = [...catalogProducts, ...bulkPalletLots];

const tsContent = `import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(allProducts, null, 2)};

export const HERO_SCROLLING_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=500&q=70',
    title: 'HP EliteBook 840 G7 - Tested & Certified',
    category: 'Used Business Laptops',
    tag: 'Rs. 70,000'
  },
  {
    url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=70',
    title: 'ThinkPad T14 & X1 Carbon',
    category: 'Refurbished & Open Box',
    tag: 'Checking Warranty'
  },
  {
    url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=70',
    title: 'War Apex Titan X (RTX 4090)',
    category: 'Brand New Gaming Rigs',
    tag: 'Extreme Performance'
  },
  {
    url: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=500&q=70',
    title: 'Dell OptiPlex Micro PCs & Fleets',
    category: 'Tested Used Desktops',
    tag: 'B2B & Office'
  },
  {
    url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=70',
    title: 'iPad Pro M4 & MacBook Air M2',
    category: 'Flagship Apple Devices',
    tag: 'Official Warranty'
  }
];

export const MOCK_PRODUCTS = INITIAL_PRODUCTS;

export const SOCIAL_FEEDS = [
  {
    id: 'soc-1',
    channel: 'YouTube' as const,
    handle: '@WarComputersHQ',
    title: 'HP EliteBook 840 G7 vs Dell Latitude 7400: Best Used Laptop Under Rs. 70k in Pakistan',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=75',
    likes: '18.4k',
    url: 'https://youtube.com'
  },
  {
    id: 'soc-2',
    channel: 'Instagram' as const,
    handle: '@warcomputers_pk',
    title: 'Unboxing 50x Tested Dell OptiPlex Units for Lahore Call Center Client.',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=600&q=75',
    likes: '12.9k',
    url: 'https://instagram.com'
  },
  {
    id: 'soc-3',
    channel: 'Discord' as const,
    handle: 'discord.gg/warcomputers',
    title: 'Pakistan PC Builders Community: Daily Stock Alerts & Verified Deals.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=75',
    likes: '7.1k',
    url: 'https://discord.com'
  }
];

export const MOCK_ANALYTICS_DATA = {
  timeframe: 'Last 30 Days (Real-Time Synchronized)',
  totalRevenue: 3485000.00,
  revenueGrowth: 28.4,
  retailRevenue: 1840000.00,
  wholesaleRevenue: 1645000.00,
  unitsSold: 142,
  unitsSoldTotal: 142,
  activeInventoryCount: 480,
  wholesaleRatio: 47.2,
  averageOrderValue: 74500.00,
  totalInventoryUnits: 480,
  totalInventoryValuation: 28500000.00,
  lowStockItemsCount: 3,
  salesTrend: [
    { month: 'Mar', retail: 1200000, wholesale: 1100000, units: 110 },
    { month: 'Apr', retail: 1350000, wholesale: 1250000, units: 125 },
    { month: 'May', retail: 1500000, wholesale: 1400000, units: 130 },
    { month: 'Jun', retail: 1650000, wholesale: 1480000, units: 135 },
    { month: 'Jul', retail: 1720000, wholesale: 1550000, units: 138 },
    { month: 'Aug', retail: 1840000, wholesale: 1645000, units: 142 }
  ],
  monthlyTrends: [
    { month: 'Mar', retailSales: 1200000, wholesaleSales: 1100000, units: 110 },
    { month: 'Apr', retailSales: 1350000, wholesaleSales: 1250000, units: 125 },
    { month: 'May', retailSales: 1500000, wholesaleSales: 1400000, units: 130 },
    { month: 'Jun', retailSales: 1650000, wholesaleSales: 1480000, units: 135 },
    { month: 'Jul', retailSales: 1720000, wholesaleSales: 1550000, units: 138 },
    { month: 'Aug', retailSales: 1840000, wholesaleSales: 1645000, units: 142 }
  ],
  categoryBreakdown: [
    { category: 'Laptops & Ultrabooks', percentage: 48, sharePercent: 48, revenue: 1672800, units: 88 },
    { category: 'Desktops & Mini PCs', percentage: 24, sharePercent: 24, revenue: 836400, units: 34 },
    { category: 'Wholesale B2B Bulk Lots', percentage: 16, sharePercent: 16, revenue: 557600, units: 8 },
    { category: 'Chromebooks', percentage: 7, sharePercent: 7, revenue: 243950, units: 22 },
    { category: 'Tablets & Workstations', percentage: 5, sharePercent: 5, revenue: 174250, units: 10 }
  ],
  topMovingProducts: [
    { id: 'prod-wc-184', name: 'Dell Latitude 7490 Core i7 8th Gen', category: 'Laptops', unitsSold: 42, revenue: 2016000, stockRemaining: 48 },
    { id: 'prod-wc-100', name: 'Dell Inspiron 3542 Core i5 4th Gen', category: 'Laptops', unitsSold: 28, revenue: 2520000, stockRemaining: 36 },
    { id: 'prod-wc-99', name: 'Dell Inspiron 3520 Core i3 12th Gen', category: 'Laptops', unitsSold: 35, revenue: 2100000, stockRemaining: 55 },
    { id: 'prod-wc-97', name: 'Lenovo IdeaPad S340 Core i5 10th Gen', category: 'Laptops', unitsSold: 18, revenue: 810000, stockRemaining: 24 }
  ],
  stockAlerts: [
    { id: 'prod-wc-37', name: 'Dell Alienware 13 R2 Gaming Laptop', currentStock: 4, reorderLevel: 5, leadTimeDays: 7, supplier: 'War Computer UK Import', status: 'Low' as const },
    { id: 'prod-wc-29', name: 'Dell Precision 5560 Xeon Touch UHD Workstation', currentStock: 3, reorderLevel: 5, leadTimeDays: 5, supplier: 'War Computer UK Import', status: 'Low' as const }
  ]
};
`;

fs.writeFileSync('src/data/products.ts', tsContent, 'utf8');
console.log(`Generated src/data/products.ts with ${allProducts.length} items successfully!`);
