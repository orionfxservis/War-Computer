import fs from 'fs';
import path from 'path';

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
    .replace(/Best Price Deals\s*\|\s*/gi, '')
    .replace(/Affordable Price\s*\|\s*/gi, '')
    .replace(/Best deals\s*\|\s*/gi, '')
    .replace(/Best Price\s*\|\s*/gi, '')
    .replace(/Best Laptop Deals\s*\|\s*/gi, '')
    .replace(/Best price Seller\s*\|\s*/gi, '')
    .replace(/WAR Computer\s*\|\s*/gi, '')
    .replace(/Good Condition\s*\|\s*/gi, '')
    .replace(/Good battery backup\s*\|\s*/gi, '')
    .replace(/Good battrery backup\s*\|\s*/gi, '')
    .replace(/Smart battery backup\s*\|\s*/gi, '')
    .replace(/Business laptop\s*\|\s*/gi, '')
    .replace(/\|\s*$/g, '')
    .replace(/\|\s*\|/g, '|')
    .trim();

  // If title doesn't start with brand name, prepend brand
  if (!t.toLowerCase().startsWith(brand.toLowerCase()) && !t.toLowerCase().includes(brand.toLowerCase())) {
    t = `${brand} ${t}`;
  }
  return t;
}

const products = rawData.map((item, idx) => {
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

  const isTouch = rawTitle.toLowerCase().includes('touch') || rawTitle.toLowerCase().includes('2 in 1') || rawTitle.toLowerCase().includes('2in1') || rawTitle.toLowerCase().includes('x360');
  const isQuadro = rawTitle.toLowerCase().includes('quadro') || rawTitle.toLowerCase().includes('nvidia');
  const gpu = isQuadro ? 'NVIDIA Quadro / Dedicated GPU' : 'Intel Integrated HD/UHD Graphics';

  const isStock = !item.badge || item.badge.toLowerCase().includes('stock') || item.badge.toLowerCase().includes('call');
  const stockQuantity = item.badge?.toLowerCase().includes('order') ? 4 : (isStock ? Math.floor(Math.random() * 20) + 15 : 0);

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
    reviewsCount: 15 + (idx * 3) % 85,
    isFeatured: idx < 12,
    isBestSeller: idx % 7 === 0,
    isNewArrival: idx % 5 === 0,
    isDealOfTheDay: idx % 11 === 0,
    images: [
      item.image,
      // high quality fallback image
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=720&q=75'
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
    description: `Official listing from War Computer (warcomputer.com). Grade-A UK fresh import unit verified for performance and longevity. Features ${cpu}, ${ram}, ${storage}, and clear ${display}. Verified by War Computer technicians for retail and wholesale procurement.`,
    tags,
    warComputerUrl: item.detailUrl,
    warComputerCategory: item.category
  };
});

fs.writeFileSync('src/data/warcomputer_catalog.json', JSON.stringify(products, null, 2));
console.log(`Successfully generated ${products.length} products to src/data/warcomputer_catalog.json`);
