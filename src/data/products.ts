import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-dt-01',
    sku: 'WC-TITAN-4090',
    name: 'War Apex Titan X - RTX 4090 Gaming & AI Beast',
    brand: 'Custom Rig',
    category: 'desktops',
    retailPrice: 3499.00,
    wholesalePrice: 2899.00,
    wholesaleMOQ: 3,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 2, pricePerUnit: 3499.00, discountPercentage: 0 },
      { minUnits: 3, maxUnits: 5, pricePerUnit: 2899.00, discountPercentage: 17 },
      { minUnits: 6, maxUnits: 15, pricePerUnit: 2699.00, discountPercentage: 23 },
      { minUnits: 16, pricePerUnit: 2499.00, discountPercentage: 28 }
    ],
    stockQuantity: 42,
    condition: 'Brand New',
    rating: 4.9,
    reviewsCount: 128,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      cpu: 'Intel Core i9-14900KS (24 Cores, up to 6.2GHz)',
      gpu: 'NVIDIA GeForce RTX 4090 24GB GDDR6X',
      ram: '64GB DDR5 6400MHz RGB Dual Channel',
      storage: '4TB (2x 2TB) PCIe 4.0 NVMe SSD RAID-0',
      os: 'Windows 11 Pro 64-bit Workstation',
      ports: '2x Thunderbolt 4, 6x USB 3.2 Gen2, 2.5GbE LAN, Wi-Fi 7',
      warranty: '3-Year Premium On-Site & Lifetime Tech Support',
      cooling: '360mm AIO Liquid Cooler with OLED Display',
      powerSupply: '1200W 80+ Platinum Fully Modular'
    },
    highlights: [
      'Unthrottled 4K/8K Gaming & Generative AI Training',
      'Custom Tempered Glass War Edition Chassis with Amber RGB',
      'B2B Wholesale volume discounts available with instant shipping'
    ],
    description: 'The pinnacle of desktop computational power. Engineered by War Computers for competitive e-sports champions, 3D architectural rendering, and local LLM/deep learning researchers.',
    tags: ['rtx4090', 'intel-i9', 'gaming-pc', 'ai-workstation', 'liquid-cooled']
  },
  {
    id: 'prod-lp-01',
    sku: 'WC-ROG-SCAR18',
    name: 'ASUS ROG Strix SCAR 18 QHD+ 240Hz Nebula HDR',
    brand: 'ASUS',
    category: 'laptops',
    retailPrice: 2899.99,
    wholesalePrice: 2399.00,
    wholesaleMOQ: 5,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 4, pricePerUnit: 2899.99, discountPercentage: 0 },
      { minUnits: 5, maxUnits: 10, pricePerUnit: 2399.00, discountPercentage: 17 },
      { minUnits: 11, maxUnits: 25, pricePerUnit: 2249.00, discountPercentage: 22 },
      { minUnits: 26, pricePerUnit: 2099.00, discountPercentage: 27 }
    ],
    stockQuantity: 65,
    condition: 'Brand New',
    rating: 4.8,
    reviewsCount: 94,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      cpu: 'Intel Core i9-14900HX 24-Core',
      gpu: 'NVIDIA GeForce RTX 4080 12GB (175W TGP)',
      ram: '32GB DDR5 5600MHz (Upgradable to 64GB)',
      storage: '2TB PCIe Gen4 NVMe M.2 SSD',
      display: '18-inch ROG Nebula HDR QHD+ 240Hz Mini-LED (1100 nits)',
      os: 'Windows 11 Home 64-bit',
      battery: '90Whr with Fast Charging (50% in 30 mins)',
      warranty: '2-Year Global Manufacturer Warranty',
      weight: '3.1 kg'
    },
    highlights: [
      'Massive 18-inch 240Hz Mini-LED Gaming Masterpiece',
      'Tri-Fan Cooling System with Conductonaut Extreme Liquid Metal',
      'Per-key RGB mechanical keyboard with Aura Sync'
    ],
    description: 'Command the virtual battlefield with the ROG Strix SCAR 18. Equipped with an immense 18-inch Mini-LED panel and desktop-grade cooling.',
    tags: ['asus', 'rog-strix', 'gaming-laptop', 'rtx4080', '240hz']
  },
  {
    id: 'prod-lp-02',
    sku: 'WC-THINK-X1CARB',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12 Ultralight',
    brand: 'Lenovo',
    category: 'laptops',
    retailPrice: 1749.00,
    wholesalePrice: 1399.00,
    wholesaleMOQ: 5,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 4, pricePerUnit: 1749.00, discountPercentage: 0 },
      { minUnits: 5, maxUnits: 19, pricePerUnit: 1399.00, discountPercentage: 20 },
      { minUnits: 20, maxUnits: 49, pricePerUnit: 1289.00, discountPercentage: 26 },
      { minUnits: 50, pricePerUnit: 1199.00, discountPercentage: 31 }
    ],
    stockQuantity: 120,
    condition: 'Brand New',
    rating: 4.9,
    reviewsCount: 156,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      cpu: 'Intel Core Ultra 7 155H (16 Cores, NPU AI Engine)',
      gpu: 'Intel Arc Graphics',
      ram: '32GB LPDDR5x 6400MHz Soldered',
      storage: '1TB PCIe Gen4 Performance SSD Opal2',
      display: '14" 2.8K (2880x1800) OLED 120Hz 100% DCI-P3 DisplayHDR 500',
      os: 'Windows 11 Pro Enterprise Ready',
      battery: '57Whr (Up to 15 Hours runtime)',
      warranty: '3-Year Premier Support & Accidental Damage Protection',
      weight: '1.09 kg (Carbon Fiber Chassis)'
    },
    highlights: [
      'Featherlight 1.09kg Military-Spec MIL-STD-810H Durability',
      'Built-in Intel AI NPU for Copilot+ Enterprise productivity',
      'Top choice for corporate fleets and executive deployment'
    ],
    description: 'The definitive enterprise executive ultrabook. Ultra-durable carbon-fiber construction, OLED visual fidelity, and all-day battery efficiency.',
    tags: ['lenovo', 'thinkpad', 'business-laptop', 'ultralight', 'intel-core-ultra']
  },
  {
    id: 'prod-cb-01',
    sku: 'WC-HP-FORTIS14',
    name: 'HP Fortis 14 G10 Chromebook Enterprise Rugged',
    brand: 'HP',
    category: 'chromebooks',
    retailPrice: 429.00,
    wholesalePrice: 319.00,
    wholesaleMOQ: 10,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 9, pricePerUnit: 429.00, discountPercentage: 0 },
      { minUnits: 10, maxUnits: 29, pricePerUnit: 319.00, discountPercentage: 25 },
      { minUnits: 30, maxUnits: 99, pricePerUnit: 289.00, discountPercentage: 32 },
      { minUnits: 100, pricePerUnit: 259.00, discountPercentage: 40 }
    ],
    stockQuantity: 380,
    condition: 'Brand New',
    rating: 4.7,
    reviewsCount: 82,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      cpu: 'Intel Processor N200 (Quad-Core up to 3.7GHz)',
      gpu: 'Intel UHD Graphics',
      ram: '8GB LPDDR5 High-Speed RAM',
      storage: '128GB UFS Fast Flash Storage',
      display: '14.0" FHD IPS Anti-Glare (1920 x 1080) 250 nits',
      os: 'ChromeOS with Google Chrome Enterprise Upgrade Support',
      battery: '47Whr Li-ion (Up to 12.5 Hours)',
      warranty: '2-Year Standard Depot Warranty',
      weight: '1.45 kg',
      ports: '2x USB-C 3.2, 2x USB-A 3.2, HDMI 1.4b, Headphone Jack'
    },
    highlights: [
      'Reinforced Rubber Trim & Spill-Resistant Keyboard',
      'Auto-Update Expiration (AUE) verified through June 2033',
      'Ideal for K-12 education districts, remote call centers, & point of sale'
    ],
    description: 'Engineered to withstand demanding classroom and enterprise shifts. Co-molded rubber bumpers, anchored keys, and seamless Google Cloud management.',
    tags: ['hp', 'chromebook', 'education-fleet', 'chromeos', 'rugged']
  },
  {
    id: 'prod-cb-02',
    sku: 'WC-ACER-SPIN714',
    name: 'Acer Chromebook Spin 714 2-in-1 Touchscreen with Stylus',
    brand: 'Acer',
    category: 'chromebooks',
    retailPrice: 699.00,
    wholesalePrice: 539.00,
    wholesaleMOQ: 5,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 4, pricePerUnit: 699.00, discountPercentage: 0 },
      { minUnits: 5, maxUnits: 19, pricePerUnit: 539.00, discountPercentage: 23 },
      { minUnits: 20, maxUnits: 49, pricePerUnit: 499.00, discountPercentage: 28 },
      { minUnits: 50, pricePerUnit: 469.00, discountPercentage: 33 }
    ],
    stockQuantity: 88,
    condition: 'Brand New',
    rating: 4.8,
    reviewsCount: 65,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      cpu: 'Intel Core i5-1335U 10-Core Processor',
      gpu: 'Intel Iris Xe Graphics',
      ram: '16GB LPDDR5 RAM',
      storage: '256GB PCIe Gen4 NVMe SSD',
      display: '14.0" WQXGA (1920x1200) 16:10 IPS Corning Gorilla Glass Multi-Touch',
      os: 'ChromeOS (Chromebook Plus Certified)',
      battery: '56Whr (Up to 11.5 Hours)',
      warranty: '2-Year War Computers Extended Warranty',
      weight: '1.37 kg',
      formFactor: '360° Convertible Tablet / Laptop'
    },
    highlights: [
      'Chromebook Plus Tier with Google AI photo & document tools',
      'Built-in Garaged USI Rechargeable Active Stylus Pen',
      'Durable Aluminum CNC milled chassis'
    ],
    description: 'A premium convertible Chromebook featuring Intel 13th Gen power, vivid 16:10 touch display, and garaged active stylus for creators and managers.',
    tags: ['acer', 'chromebook-plus', '2-in-1', 'stylus', 'convertible']
  },
  {
    id: 'prod-tab-01',
    sku: 'WC-IPAD-PRO13M4',
    name: 'Apple iPad Pro 13" (M4 Chip) 512GB Ultra Retina XDR',
    brand: 'Apple',
    category: 'tablets',
    retailPrice: 1499.00,
    wholesalePrice: 1299.00,
    wholesaleMOQ: 5,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 4, pricePerUnit: 1499.00, discountPercentage: 0 },
      { minUnits: 5, maxUnits: 14, pricePerUnit: 1299.00, discountPercentage: 13 },
      { minUnits: 15, maxUnits: 29, pricePerUnit: 1229.00, discountPercentage: 18 },
      { minUnits: 30, pricePerUnit: 1169.00, discountPercentage: 22 }
    ],
    stockQuantity: 52,
    condition: 'Brand New',
    rating: 4.95,
    reviewsCount: 210,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      cpu: 'Apple M4 Chip (9-Core CPU, 10-Core GPU, 16-Core Neural Engine)',
      gpu: '10-Core GPU with Hardware Ray Tracing',
      ram: '8GB Unified Memory',
      storage: '512GB High-Speed Flash Storage',
      display: '13-inch Tandem OLED Ultra Retina XDR (2752x2064, 1600 nits peak)',
      os: 'iPadOS 17 / iPadOS 18 Ready',
      battery: '38.99Whr (Up to 10 hours web/video)',
      warranty: '1-Year Apple Limited Warranty + War Tech Care',
      weight: '579 grams (5.1mm Ultra-thin)',
      ports: 'Thunderbolt 4 / USB 4'
    },
    highlights: [
      'Mind-blowing Tandem OLED display with extreme contrast ratio',
      'Ultra-thin 5.1mm design powered by revolutionary M4 Silicon',
      'Supports Apple Pencil Pro and Magic Keyboard'
    ],
    description: 'The ultimate iPad experience. Groundbreaking Tandem OLED display technology, next-generation M4 computing speed, and ultra-portable profile.',
    tags: ['apple', 'ipad-pro', 'm4', 'oled', 'tablet']
  },
  {
    id: 'prod-tab-02',
    sku: 'WC-SURF-PRO10',
    name: 'Microsoft Surface Pro 10 Enterprise 2-in-1 Tablet PC',
    brand: 'Custom Rig',
    category: 'tablets',
    retailPrice: 1399.00,
    wholesalePrice: 1149.00,
    wholesaleMOQ: 5,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 4, pricePerUnit: 1399.00, discountPercentage: 0 },
      { minUnits: 5, maxUnits: 14, pricePerUnit: 1149.00, discountPercentage: 18 },
      { minUnits: 15, maxUnits: 30, pricePerUnit: 1079.00, discountPercentage: 23 },
      { minUnits: 31, pricePerUnit: 999.00, discountPercentage: 28 }
    ],
    stockQuantity: 74,
    condition: 'Brand New',
    rating: 4.8,
    reviewsCount: 78,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      cpu: 'Intel Core Ultra 7 165U with Intel AI Boost NPU',
      gpu: 'Intel Graphics',
      ram: '16GB LPDDR5x RAM',
      storage: '512GB Removable Gen4 SSD',
      display: '13" PixelSense Flow (2880 x 1920) 120Hz Touchscreen Anti-Reflective',
      os: 'Windows 11 Pro Enterprise Security',
      battery: '48Whr (Up to 19 Hours Typical Usage)',
      warranty: '3-Year Commercial Warranty with Advanced Exchange',
      weight: '879 grams',
      ports: '2x USB-C with USB 4/Thunderbolt 4, Surface Connect Port'
    },
    highlights: [
      'Full desktop Windows 11 Pro versatility in a lightweight tablet slate',
      'Hardware-level Secured-Core PC and NFC authentication ready',
      'Direct wholesale fleet discounts for medical, field, & corporate teams'
    ],
    description: 'Designed specifically for professional enterprises. Unites the portability of a tablet with the performance and security of an executive laptop.',
    tags: ['microsoft', 'surface-pro', 'windows-tablet', '2-in-1', 'enterprise-slate']
  },
  {
    id: 'prod-ws-01',
    sku: 'WC-WORKSTN-THREAD',
    name: 'War Titan Server Workstation - Threadripper Pro 96-Core',
    brand: 'Custom Rig',
    category: 'workstations',
    retailPrice: 8999.00,
    wholesalePrice: 7499.00,
    wholesaleMOQ: 2,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 1, pricePerUnit: 8999.00, discountPercentage: 0 },
      { minUnits: 2, maxUnits: 4, pricePerUnit: 7499.00, discountPercentage: 16 },
      { minUnits: 5, maxUnits: 10, pricePerUnit: 6999.00, discountPercentage: 22 },
      { minUnits: 11, pricePerUnit: 6499.00, discountPercentage: 28 }
    ],
    stockQuantity: 18,
    condition: 'Brand New',
    rating: 5.0,
    reviewsCount: 31,
    isFeatured: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      cpu: 'AMD Ryzen Threadripper PRO 7995WX (96 Cores / 192 Threads, 5.1GHz)',
      gpu: 'Dual NVIDIA RTX 6000 Ada Generation 48GB (96GB Total VRAM)',
      ram: '256GB (8x 32GB) DDR5 ECC Registered Octa-Channel',
      storage: '8TB (4x 2TB) PCIe 5.0 NVMe Enterprise SSD Array',
      os: 'Ubuntu Linux 24.04 LTS / Windows Server 2025 Datacenter',
      warranty: '5-Year 24/7 Mission-Critical Enterprise SLA Support',
      cooling: 'Custom Dual Loop High-Static Pressure Liquid Cooling',
      powerSupply: '2000W 80+ Titanium Redundant Dual PSU'
    },
    highlights: [
      '96 Physical Cores / 192 Threads for Massive AI Model Fine-Tuning',
      'ECC Registered Memory prevents data corruption in mission-critical simulations',
      'Custom rackmount / tower dual-purpose heavy industrial steel chassis'
    ],
    description: 'Industrial-grade compute power. Built for scientific simulations, visual effects rendering studios, automotive CAD, and on-premise AI deployments.',
    tags: ['threadripper', 'workstation', 'dual-gpu', 'ai-server', 'ecc-memory']
  },
  {
    id: 'prod-lot-01',
    sku: 'WC-BULK-OPTIPLEX-25',
    name: 'Dell OptiPlex Micro Gen12 Desktop Fleet [25-Unit Bulk Pallet]',
    brand: 'Dell',
    category: 'wholesale_lots',
    retailPrice: 14750.00, // $590 each retail
    wholesalePrice: 9875.00, // $395 each wholesale!
    wholesaleMOQ: 1, // 1 lot (25 pcs)
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 1, pricePerUnit: 9875.00, discountPercentage: 33 },
      { minUnits: 2, maxUnits: 4, pricePerUnit: 9250.00, discountPercentage: 37 },
      { minUnits: 5, pricePerUnit: 8750.00, discountPercentage: 40 }
    ],
    stockQuantity: 14,
    condition: 'Factory Certified',
    rating: 4.9,
    reviewsCount: 47,
    isFeatured: true,
    isBulkLot: true,
    lotUnitCount: 25,
    images: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      cpu: 'Intel Core i5-13500T 14-Core (per unit)',
      gpu: 'Intel UHD Graphics 770',
      ram: '16GB DDR5 4800MHz (per unit, 400GB Total Pallet)',
      storage: '512GB PCIe M.2 NVMe SSD (per unit, 12.8TB Total Pallet)',
      os: 'Windows 11 Pro Pre-Activated OEM License on each device',
      warranty: '3-Year Dell ProSupport Bulk Warranty with direct part dispatch',
      ports: 'Dual DisplayPort, HDMI, 5x USB 3.2, Gigabit Ethernet'
    },
    highlights: [
      'Complete 25-Unit Pallet Lot: Save over $4,875 vs individual retail MSRP',
      'Pre-imaged with Windows 11 Pro OEM licenses and zero bloatware',
      'Ships securely shrink-wrapped on standard freight wooden pallet'
    ],
    description: 'The ultimate turnkey bulk IT hardware lot for call centers, hospital check-in desks, corporate offices, and computer labs. Includes 25 micro PC units, power supplies, and keyboard/mouse bundles.',
    tags: ['wholesale-lot', 'dell-optiplex', 'bulk-desktop', 'pallet-deal', 'b2b-fleet']
  },
  {
    id: 'prod-lot-02',
    sku: 'WC-BULK-CHROME-30',
    name: 'Classroom Chromebook 14" Rugged Fleet [30-Unit Education Lot]',
    brand: 'Lenovo',
    category: 'wholesale_lots',
    retailPrice: 9900.00, // $330 each
    wholesalePrice: 6270.00, // $209 each!
    wholesaleMOQ: 1, // 1 lot (30 pcs)
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 2, pricePerUnit: 6270.00, discountPercentage: 36 },
      { minUnits: 3, maxUnits: 5, pricePerUnit: 5850.00, discountPercentage: 40 },
      { minUnits: 6, pricePerUnit: 5400.00, discountPercentage: 45 }
    ],
    stockQuantity: 22,
    condition: 'Brand New',
    rating: 4.85,
    reviewsCount: 39,
    isFeatured: true,
    isBulkLot: true,
    lotUnitCount: 30,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      cpu: 'Intel Processor N100 Quad-Core (per unit)',
      gpu: 'Intel HD Graphics',
      ram: '8GB LPDDR5 (per unit)',
      storage: '64GB eMMC 5.1 Storage (per unit)',
      display: '14.0" HD Anti-Glare with Reinforced Glass',
      os: 'ChromeOS (Zero-Touch Enrollment Compatible)',
      warranty: '2-Year School District Accidental Protection Plan Included',
      battery: '12-Hour All-Day Classroom Battery'
    },
    highlights: [
      '30-Pack Turnkey Education Fleet with Barcoded Individual Packaging',
      'Zero-Touch Enrollment (ZTE) ready for Google Admin Workspace',
      'Drop-tested to 120cm with reinforced rubberized corners'
    ],
    description: 'Designed specifically for educational institutions, charter schools, and training organizations. Comes in organized, master-cartoned crates with individual asset tagging labels.',
    tags: ['wholesale-lot', 'education-chromebook', 'lenovo', '30-pack', 'school-district']
  },
  {
    id: 'prod-dt-02',
    sku: 'WC-OMEN-45L',
    name: 'HP OMEN 45L Cryo Chamber Desktop - RTX 4080 Super',
    brand: 'HP',
    category: 'desktops',
    retailPrice: 2499.00,
    wholesalePrice: 2049.00,
    wholesaleMOQ: 3,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 2, pricePerUnit: 2499.00, discountPercentage: 0 },
      { minUnits: 3, maxUnits: 5, pricePerUnit: 2049.00, discountPercentage: 18 },
      { minUnits: 6, pricePerUnit: 1899.00, discountPercentage: 24 }
    ],
    stockQuantity: 36,
    condition: 'Brand New',
    rating: 4.85,
    reviewsCount: 73,
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      cpu: 'AMD Ryzen 9 7900X (12 Cores / 24 Threads up to 5.6GHz)',
      gpu: 'NVIDIA GeForce RTX 4080 Super 16GB GDDR6X',
      ram: '32GB Kingston FURY RGB DDR5 6000MHz',
      storage: '2TB WD Black PCIe Gen4 NVMe SSD',
      os: 'Windows 11 Home',
      warranty: '2-Year HP Onsite Warranty',
      cooling: 'Patented Cryo Chamber Liquid Cooling',
      powerSupply: '800W 80+ Gold'
    },
    highlights: [
      'Patented external Cryo Chamber draws cool ambient air directly',
      'Toolless access chassis with custom glass side panel',
      'Tested for uninterrupted 4K streaming and ray-traced gaming'
    ],
    description: 'Revolutionary cooling with the external Cryo Chamber. Runs 6°C cooler than traditional desktop cases under full sustained load.',
    tags: ['hp', 'omen', 'rtx4080super', 'ryzen9', 'gaming-desktop']
  },
  {
    id: 'prod-tab-03',
    sku: 'WC-GALAXY-TABS9U',
    name: 'Samsung Galaxy Tab S9 Ultra 14.6" Dynamic AMOLED 2X',
    brand: 'Custom Rig',
    category: 'tablets',
    retailPrice: 1199.00,
    wholesalePrice: 949.00,
    wholesaleMOQ: 5,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 4, pricePerUnit: 1199.00, discountPercentage: 0 },
      { minUnits: 5, maxUnits: 15, pricePerUnit: 949.00, discountPercentage: 20 },
      { minUnits: 16, pricePerUnit: 889.00, discountPercentage: 25 }
    ],
    stockQuantity: 45,
    condition: 'Brand New',
    rating: 4.88,
    reviewsCount: 112,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      cpu: 'Snapdragon 8 Gen 2 for Galaxy (4nm Octa-core)',
      gpu: 'Adreno 740',
      ram: '12GB High-speed RAM',
      storage: '256GB Internal + MicroSD slot up to 1TB',
      display: '14.6" Dynamic AMOLED 2X 120Hz (2960 x 1848) HDR10+',
      os: 'Android 14 with Samsung DeX Multitasking Desktop Mode',
      battery: '11,200mAh with 45W Super Fast Charging',
      warranty: '2-Year Standard Warranty',
      weight: '732 grams',
      cooling: 'Vapor Chamber Cooling System (IP68 Water & Dust Resistant)'
    },
    highlights: [
      'IP68 Water & Dust Resistance on both Tablet and S Pen',
      'Samsung DeX provides a full Windows-like multi-window workstation',
      'Massive 14.6-inch AMOLED display with AKG Quad speakers'
    ],
    description: 'Transform how you work and play. The largest, most vibrant Android tablet ever built, complete with waterproof S Pen in the box.',
    tags: ['samsung', 'galaxy-tab', 'amoled', 'tablet', 'dex-workstation']
  }
];

export const HERO_SCROLLING_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    title: 'War Apex Titan X Gaming Rigs',
    category: 'Custom RTX 4090 Systems',
    tag: 'Extreme Power'
  },
  {
    url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    title: 'ROG Strix SCAR 18 QHD 240Hz',
    category: 'High-FPS Laptops',
    tag: 'Nebula HDR'
  },
  {
    url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    title: 'Lenovo ThinkPad X1 Carbon Gen 12',
    category: 'Business Ultrabooks',
    tag: 'Enterprise Fleet'
  },
  {
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    title: 'HP Fortis Rugged Chromebooks',
    category: 'Education & Cloud Fleets',
    tag: 'Bulk Pallets'
  },
  {
    url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    title: 'iPad Pro M4 Tandem OLED',
    category: 'Flagship Tablets',
    tag: 'Ultra Portable'
  },
  {
    url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
    title: 'War Threadripper 96-Core Compute',
    category: 'AI & VFX Server Towers',
    tag: 'Enterprise SLA'
  },
  {
    url: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80',
    title: 'Dell OptiPlex Bulk 25-Unit Pallets',
    category: 'B2B Wholesale Lots',
    tag: 'Instant Dispatch'
  },
  {
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    title: 'HP Omen 45L Cryo Chambers',
    category: 'Liquid Cooled Desktops',
    tag: 'Sub-Zero Airflow'
  }
];

export const MOCK_PRODUCTS = INITIAL_PRODUCTS;

export const SOCIAL_FEEDS = [
  {
    id: 'soc-1',
    channel: 'YouTube' as const,
    handle: '@WarComputersHQ',
    title: 'Building a $10,000 Liquid-Cooled RTX 4090 Monster Rig (Zero Throttle Stress Test)',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    likes: '14.2k',
    url: 'https://youtube.com'
  },
  {
    id: 'soc-2',
    channel: 'Instagram' as const,
    handle: '@warcomputers_setups',
    title: 'Dual 4K Studio Battlestation for Apex VFX. Powered by War Titan 96-Core Compute.',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80',
    likes: '8.9k',
    url: 'https://instagram.com'
  },
  {
    id: 'soc-3',
    channel: 'Discord' as const,
    handle: 'discord.gg/warcomputers',
    title: 'B2B School Fleet Unboxing: 200 HP Fortis Chromebooks Deployed in Record Time.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    likes: '5.1k',
    url: 'https://discord.com'
  },
  {
    id: 'soc-4',
    channel: 'YouTube' as const,
    handle: '@WarComputersHQ',
    title: 'ThinkPad X1 Carbon Gen 12 vs MacBook Pro M3 Max: Enterprise Fleet Benchmark',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    likes: '21.5k',
    url: 'https://youtube.com'
  }
];

export const MOCK_ANALYTICS_DATA = {
  timeframe: 'Last 30 Days (Real-Time Synchronized)',
  totalRevenue: 284590.00,
  revenueGrowth: 23.4,
  retailRevenue: 118400.00,
  wholesaleRevenue: 166190.00,
  unitsSold: 342,
  unitsSoldTotal: 342,
  activeInventoryCount: 4820,
  wholesaleRatio: 58.4,
  averageOrderValue: 832.13,
  totalInventoryUnits: 4820,
  totalInventoryValuation: 1845000.00,
  lowStockItemsCount: 3,
  salesTrend: [
    { month: 'Mar', retail: 68000, wholesale: 92000, units: 210 },
    { month: 'Apr', retail: 74000, wholesale: 110000, units: 245 },
    { month: 'May', retail: 89000, wholesale: 135000, units: 290 },
    { month: 'Jun', retail: 98000, wholesale: 148000, units: 310 },
    { month: 'Jul', retail: 104000, wholesale: 155000, units: 330 },
    { month: 'Aug', retail: 118400, wholesale: 166190, units: 342 }
  ],
  monthlyTrends: [
    { month: 'Mar', retailSales: 68000, wholesaleSales: 92000, units: 210 },
    { month: 'Apr', retailSales: 74000, wholesaleSales: 110000, units: 245 },
    { month: 'May', retailSales: 89000, wholesaleSales: 135000, units: 290 },
    { month: 'Jun', retailSales: 98000, wholesaleSales: 148000, units: 310 },
    { month: 'Jul', retailSales: 104000, wholesaleSales: 155000, units: 330 },
    { month: 'Aug', retailSales: 118400, wholesaleSales: 166190, units: 342 }
  ],
  categoryBreakdown: [
    { category: 'Laptops & Ultrabooks', percentage: 36, sharePercent: 36, revenue: 102450, units: 118 },
    { category: 'Desktops & Gaming Towers', percentage: 28, sharePercent: 28, revenue: 79685, units: 62 },
    { category: 'Wholesale B2B Bulk Lots', percentage: 22, sharePercent: 22, revenue: 62600, units: 12 },
    { category: 'Chromebooks Fleet', percentage: 8, sharePercent: 8, revenue: 22760, units: 85 },
    { category: 'Tablets & 2-in-1', percentage: 6, sharePercent: 6, revenue: 17095, units: 65 }
  ],
  topMovingProducts: [
    { id: 'prod-dt-01', name: 'War Apex Titan X (RTX 4090)', category: 'Desktops', unitsSold: 48, revenue: 142000, stockRemaining: 42 },
    { id: 'prod-lp-02', name: 'Lenovo ThinkPad X1 Carbon Gen 12', category: 'Laptops', unitsSold: 76, revenue: 108400, stockRemaining: 120 },
    { id: 'prod-lot-01', name: 'Dell OptiPlex Micro [25-Unit Pallet]', category: 'Wholesale Lots', unitsSold: 8, revenue: 79000, stockRemaining: 14 },
    { id: 'prod-cb-01', name: 'HP Fortis 14 G10 Chromebook', category: 'Chromebooks', unitsSold: 140, revenue: 44660, stockRemaining: 380 }
  ],
  stockAlerts: [
    { id: 'prod-ws-01', name: 'War Titan Server Workstation (Threadripper 96-Core)', currentStock: 18, reorderLevel: 25, leadTimeDays: 7, supplier: 'AMD Direct Enterprise', status: 'Low' as const },
    { id: 'prod-dt-01', name: 'War Apex Titan X (RTX 4090)', currentStock: 42, reorderLevel: 50, leadTimeDays: 4, supplier: 'NVIDIA Foundry Tier 1', status: 'Adequate' as const },
    { id: 'prod-lot-01', name: 'Dell OptiPlex 25-Unit Pallet Lots', currentStock: 14, reorderLevel: 20, leadTimeDays: 5, supplier: 'Dell Global Logistics', status: 'Low' as const }
  ]
};

export const MOCK_ORDERS = [
  {
    orderId: 'WC-8942',
    customerName: 'Apex Creative Studio Ltd',
    orderDate: 'Aug 28, 2026',
    orderType: 'wholesale' as const,
    status: 'Shipped' as const,
    carrier: 'DHL Global Freight Priority',
    trackingNumber: 'DHL-EXP-88937402-US',
    estimatedDelivery: 'Tomorrow, Aug 30 by 3:00 PM',
    totalAmount: 18990.00,
    itemsCount: 6,
    timeline: [
      { status: 'Order Placed & Payment Verified', date: 'Aug 28, 09:15 AM', description: 'Wholesale bank wire confirmed. B2B invoice #INV-9923 generated.', completed: true },
      { status: 'Assembled & Hardware Stress Tested', date: 'Aug 28, 02:30 PM', description: 'MemTest86, 3DMark 24h loop, and component serial tagging passed 100%.', completed: true },
      { status: 'Passed Quality Control & Pallet Sealed', date: 'Aug 29, 08:45 AM', description: 'Shrink-wrapped, corner protected, tamper-evident security seal applied.', completed: true },
      { status: 'Handed to Carrier (DHL Freight)', date: 'Aug 29, 11:20 AM', description: 'Departed War Computers Central Depot Hub (Dock 4B).', completed: true, current: true },
      { status: 'Out for Delivery', date: 'Aug 30, Est.', description: 'Scheduled for local liftgate courier delivery.', completed: false },
      { status: 'Delivered & Signed', date: 'Aug 30, Est.', description: 'Proof of delivery signature required.', completed: false }
    ]
  },
  {
    orderId: 'WC-8910',
    customerName: 'Dr. Evelyn Martinez',
    orderDate: 'Aug 27, 2026',
    orderType: 'retail' as const,
    status: 'Delivered' as const,
    carrier: 'FedEx Express Next Day',
    trackingNumber: 'FDX-9930412891',
    estimatedDelivery: 'Aug 28, 2026',
    totalAmount: 3499.00,
    itemsCount: 1,
    timeline: [
      { status: 'Order Placed', date: 'Aug 27, 10:00 AM', description: 'Card payment authenticated via 3D Secure.', completed: true },
      { status: 'Custom Built & Benchmarked', date: 'Aug 27, 01:00 PM', description: 'Thermal profiles calibrated and Windows 11 Pro configured.', completed: true },
      { status: 'Dispatched via FedEx', date: 'Aug 27, 04:30 PM', description: 'FedEx Express air tracking active.', completed: true },
      { status: 'Delivered & Signed', date: 'Aug 28, 11:42 AM', description: 'Delivered directly to recipient with signature confirmation.', completed: true, current: true }
    ]
  }
];
