import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. HP EliteBook 840 G7 - 50k to 75k (Rs. 70,000) - Student, Office, Freelancing, Business
  {
    id: 'prod-lp-hp840',
    sku: 'WC-HP-840G7-USED',
    name: 'HP EliteBook 840 G7 Business Ultrabook',
    brand: 'HP',
    category: 'laptops',
    retailPrice: 70000,
    wholesalePrice: 62000,
    wholesaleMOQ: 3,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 2, pricePerUnit: 70000, discountPercentage: 0 },
      { minUnits: 3, maxUnits: 5, pricePerUnit: 62000, discountPercentage: 11 },
      { minUnits: 6, maxUnits: 15, pricePerUnit: 58000, discountPercentage: 17 },
      { minUnits: 16, pricePerUnit: 55000, discountPercentage: 21 }
    ],
    stockQuantity: 48,
    condition: 'USED',
    rating: 4.9,
    reviewsCount: 184,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Core i5-10310U vPro (10th Gen Quad-Core up to 4.4GHz)',
      gpu: 'Intel UHD Graphics 620',
      ram: '16GB DDR4 High-Speed RAM',
      storage: '512GB NVMe PCIe M.2 High-Speed SSD',
      display: '14.0" FHD IPS Anti-Glare (1920 x 1080) 400 nits',
      os: 'Windows 11 Pro 64-bit Genuine OEM Activated',
      battery: '3-Cell 53Wh Li-ion (3-5 Hours Battery Backup)',
      warranty: '7-Day Checking Warranty',
      weight: '1.33 kg',
      ports: '2x USB-C Thunderbolt 3, 2x USB 3.1 Gen 1, HDMI 1.4, Audio Combo'
    },
    highlights: [
      '100% Tested & Verified: Keyboard, Screen, Battery & Thermals checked',
      'Premium Silver Aluminum Unibody with Backlit Keyboard & Fingerprint Reader',
      '7-Day Checking Warranty with prompt customer support'
    ],
    description: 'Executive class lightweight business laptop imported directly. Clean grade-A condition, tested by War Computers technicians. Perfect for office multitasking, remote software development, and everyday demanding workloads.',
    tags: ['hp', 'elitebook', 'used-laptop', 'tested', 'core-i5', '16gb-ram', '512gb-ssd', 'student', 'office', 'freelancing', 'business']
  },

  // 2. Dell Latitude 7400 - 50k to 75k (Rs. 58,000) - Office, Freelancing, Student, Business
  {
    id: 'prod-lp-dell7400',
    sku: 'WC-DELL-7400-USED',
    name: 'Dell Latitude 7400 Enterprise Carbon Ultrabook',
    brand: 'Dell',
    category: 'laptops',
    retailPrice: 58000,
    wholesalePrice: 52000,
    wholesaleMOQ: 3,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 2, pricePerUnit: 58000, discountPercentage: 0 },
      { minUnits: 3, maxUnits: 5, pricePerUnit: 52000, discountPercentage: 10 },
      { minUnits: 6, pricePerUnit: 48000, discountPercentage: 17 }
    ],
    stockQuantity: 36,
    condition: 'USED',
    rating: 4.8,
    reviewsCount: 112,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Core i7-8665U Quad-Core (8th Gen up to 4.8GHz)',
      gpu: 'Intel UHD Graphics 620',
      ram: '16GB DDR4 2666MHz RAM',
      storage: '256GB PCIe NVMe SSD (Upgradable to 1TB)',
      display: '14.0" FHD (1920x1080) WVA Anti-Glare Narrow Border',
      os: 'Windows 11 Pro Activated',
      battery: '60Wh ExpressCharge (Tested 85%+ Health)',
      warranty: '7-Day Checking Warranty',
      weight: '1.36 kg',
      ports: 'Thunderbolt 3, 2x USB 3.1 Gen 1, HDMI 1.4a, MicroSD'
    },
    highlights: [
      'Core i7 Enterprise processor with robust carbon-fiber composite lid',
      'All ports, Wi-Fi, audio, and webcam 100% bench tested',
      'Ready to ship across Pakistan with secure packaging'
    ],
    description: 'Dependable Dell Latitude performance. Premium build with exceptional keyboard tactile feedback and snappy day-to-day productivity.',
    tags: ['dell', 'latitude', 'used-laptop', 'core-i7', 'tested', 'pakistan-delivery', 'student', 'office', 'freelancing', 'business']
  },

  // 3. HP ProBook 440 G5 - Under 50K (Rs. 44,000) - Student, Office, Freelancing
  {
    id: 'prod-lp-hp440',
    sku: 'WC-HP-440G5-USED',
    name: 'HP ProBook 440 G5 Core i5 (8th Gen)',
    brand: 'HP',
    category: 'laptops',
    retailPrice: 44000,
    wholesalePrice: 39000,
    wholesaleMOQ: 3,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 2, pricePerUnit: 44000, discountPercentage: 0 },
      { minUnits: 3, maxUnits: 5, pricePerUnit: 39000, discountPercentage: 11 },
      { minUnits: 6, pricePerUnit: 36000, discountPercentage: 18 }
    ],
    stockQuantity: 40,
    condition: 'USED',
    rating: 4.8,
    reviewsCount: 88,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Core i5-8250U Quad-Core (8th Gen up to 3.4GHz)',
      gpu: 'Intel UHD Graphics 620',
      ram: '8GB DDR4 RAM (Upgradable to 32GB)',
      storage: '256GB High Speed NVMe SSD',
      display: '14.0" HD Anti-Glare LED Display',
      os: 'Windows 10 / 11 Pro 64-bit Genuine',
      battery: '3-Cell 48Wh (Tested 3-4 Hours Backup)',
      warranty: '7-Day Checking Warranty',
      weight: '1.63 kg',
      ports: 'USB-C, 2x USB 3.0, HDMI, VGA, SD Card Reader, RJ-45'
    },
    highlights: [
      'Best value under 50K in Pakistan with quad-core 8th Gen processor',
      'Tested keyboard, trackpad, screen, and battery health',
      '7-Day Checking Warranty with original charger'
    ],
    description: 'Affordable, sturdy student and office laptop. Great for online assignments, zoom sessions, accounting, and general browsing.',
    tags: ['hp', 'probook', 'used-laptop', 'under-50k', 'student', 'office', 'freelancing', 'budget-laptop']
  },

  // 4. Lenovo ThinkPad T14 Gen 2 - 75k to 100k (Rs. 98,000) - Programming, Freelancing, Office, Business
  {
    id: 'prod-lp-think-t14',
    sku: 'WC-THINK-T14G2-REFURB',
    name: 'Lenovo ThinkPad T14 Gen 2 (Ryzen 7 PRO)',
    brand: 'Lenovo',
    category: 'laptops',
    retailPrice: 98000,
    wholesalePrice: 88000,
    wholesaleMOQ: 2,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 2, pricePerUnit: 98000, discountPercentage: 0 },
      { minUnits: 3, maxUnits: 5, pricePerUnit: 88000, discountPercentage: 10 },
      { minUnits: 6, pricePerUnit: 82000, discountPercentage: 16 }
    ],
    stockQuantity: 24,
    condition: 'REFURBISHED',
    rating: 4.9,
    reviewsCount: 76,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'AMD Ryzen 7 PRO 5850U (8 Cores / 16 Threads up to 4.4GHz)',
      gpu: 'AMD Radeon Vega 8 Graphics',
      ram: '16GB DDR4 3200MHz (Dual Channel)',
      storage: '512GB Gen3 NVMe SSD',
      display: '14.0" FHD IPS 300 nits Low Power Display',
      os: 'Windows 11 Pro Genuine',
      battery: '50Wh RapidCharge Battery',
      warranty: '1-Month Replacement Warranty',
      weight: '1.47 kg',
      ports: '2x USB-C 3.2 Gen 2, 2x USB-A 3.2 Gen 1, RJ-45 Ethernet, HDMI 2.0'
    },
    highlights: [
      '8 Real Cores / 16 Threads monster multitasking power for programmers & developers',
      'Professionally serviced with Arctic MX-4 thermal paste & internal sanitization',
      '1-Month Replacement Warranty backed by War Computers'
    ],
    description: 'Workhorse reliability in refurbished Grade-A cosmetic condition. Outstanding battery longevity and the industry-renowned ThinkPad precision keyboard.',
    tags: ['lenovo', 'thinkpad', 'refurbished', 'ryzen7', 'octa-core', 'programming', 'freelancing', 'office', 'business']
  },

  // 5. Dell Latitude 5520 - 75k to 100k (Rs. 89,000) - Programming, Graphic Design, Office, Business
  {
    id: 'prod-lp-dell5520',
    sku: 'WC-DELL-5520-USED',
    name: 'Dell Latitude 5520 15.6" Core i7 11th Gen',
    brand: 'Dell',
    category: 'laptops',
    retailPrice: 89000,
    wholesalePrice: 81000,
    wholesaleMOQ: 2,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 2, pricePerUnit: 89000, discountPercentage: 0 },
      { minUnits: 3, maxUnits: 5, pricePerUnit: 81000, discountPercentage: 9 },
      { minUnits: 6, pricePerUnit: 76000, discountPercentage: 14 }
    ],
    stockQuantity: 28,
    condition: 'USED',
    rating: 4.85,
    reviewsCount: 61,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Core i7-1185G7 vPro (11th Gen 4 Cores up to 4.8GHz)',
      gpu: 'Intel Iris Xe Graphics G7 (Color accurate & fast)',
      ram: '16GB DDR4 3200MHz RAM',
      storage: '512GB PCIe NVMe SSD',
      display: '15.6" FHD IPS Anti-Glare 250 nits with Numpad Keyboard',
      os: 'Windows 11 Pro Genuine',
      battery: '63Wh ExpressCharge (4-6 Hours Battery)',
      warranty: '7-Day Checking Warranty',
      weight: '1.59 kg',
      ports: '2x Thunderbolt 4, 2x USB 3.2, HDMI 2.0, MicroSD, RJ-45'
    },
    highlights: [
      'Large 15.6" screen with full dedicated numeric keypad for finance & coding',
      'Intel Iris Xe Graphics handles Photoshop & Illustrator effortlessly',
      'Thunderbolt 4 support for dual external 4K monitors'
    ],
    description: 'High performance 11th Gen business powerhouse with full numeric keypad. Ideal for developers, financial accountants, and graphic artists.',
    tags: ['dell', 'latitude', '11th-gen', 'iris-xe', 'programming', 'graphic_design', 'office', 'business', 'freelancing']
  },

  // 6. ASUS TUF Gaming F15 - 100k to 150k (Rs. 138,000) - Gaming, Video Editing, Graphic Design, Programming
  {
    id: 'prod-lp-tuf-f15',
    sku: 'WC-ASUS-TUFF15-REFURB',
    name: 'ASUS TUF Gaming F15 - GTX 1650 / 144Hz',
    brand: 'ASUS',
    category: 'laptops',
    retailPrice: 138000,
    wholesalePrice: 126000,
    wholesaleMOQ: 2,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 1, pricePerUnit: 138000, discountPercentage: 0 },
      { minUnits: 2, maxUnits: 4, pricePerUnit: 126000, discountPercentage: 8 },
      { minUnits: 5, pricePerUnit: 119000, discountPercentage: 13 }
    ],
    stockQuantity: 20,
    condition: 'REFURBISHED',
    rating: 4.88,
    reviewsCount: 79,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Core i5-10300H (10th Gen High-Performance Series up to 4.5GHz)',
      gpu: 'NVIDIA GeForce GTX 1650 4GB GDDR6 Dedicated',
      ram: '16GB DDR4 High-Speed RAM',
      storage: '512GB PCIe M.2 NVMe SSD',
      display: '15.6" FHD 144Hz IPS Gaming Panel',
      os: 'Windows 11 Home Genuine Activated',
      battery: '48Wh Li-ion with High-Wattage Adapter',
      warranty: '1-Month Replacement Warranty',
      weight: '2.30 kg',
      ports: 'USB-C 3.2, 2x USB-A 3.2, USB 2.0, HDMI 2.0, LAN'
    },
    highlights: [
      'Smooth 144Hz esports refresh rate and dedicated 4GB NVIDIA GPU',
      'Dual-fan anti-dust cooling architecture for uninterrupted gaming',
      '1-Month Replacement Warranty backed by War Computers'
    ],
    description: 'Affordable high-refresh gaming and video rendering laptop. Delivers smooth gameplay in GTA V, Valorant, Fortnite, and accelerated timeline scrub in Premiere Pro.',
    tags: ['asus', 'tuf-gaming', 'gtx1650', '144hz', 'gaming', 'video_editing', 'graphic_design', 'programming']
  },

  // 7. Lenovo IdeaPad Creator 5 - 100k to 150k (Rs. 148,000) - Graphic Design, Video Editing, Programming, Freelancing
  {
    id: 'prod-lp-ideapad-creator',
    sku: 'WC-LEN-CREATOR5-OPEN',
    name: 'Lenovo IdeaPad Creator Edition (100% AdobeRGB)',
    brand: 'Lenovo',
    category: 'laptops',
    retailPrice: 148000,
    wholesalePrice: 135000,
    wholesaleMOQ: 2,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 1, pricePerUnit: 148000, discountPercentage: 0 },
      { minUnits: 2, maxUnits: 3, pricePerUnit: 135000, discountPercentage: 8 },
      { minUnits: 4, pricePerUnit: 128000, discountPercentage: 13 }
    ],
    stockQuantity: 2,
    condition: 'OPEN BOX',
    rating: 4.92,
    reviewsCount: 53,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Core i7-10750H (6 Cores / 12 Threads up to 5.0GHz)',
      gpu: 'NVIDIA GeForce GTX 1650 Ti 4GB Dedicated',
      ram: '16GB DDR4 2933MHz RAM',
      storage: '512GB NVMe SSD + 1TB HDD Hybrid',
      display: '15.6" FHD IPS 500 nits, 100% AdobeRGB Studio Accurate',
      os: 'Windows 11 Pro Genuine',
      battery: '45Wh with Rapid Charge Pro',
      warranty: '15-Day Checking Warranty',
      weight: '2.20 kg'
    },
    highlights: [
      '100% AdobeRGB 500-nits color-calibrated display for professional creators',
      '6-Core Core i7 CPU delivers fast 4K video rendering & multi-track audio',
      'Open box condition with pristine factory finish'
    ],
    description: 'Engineered specifically for graphic designers, video editors, and visual content artists who demand true color fidelity and fast GPU acceleration.',
    tags: ['lenovo', 'creator', 'adobergb', 'open-box', 'graphic_design', 'video_editing', 'programming', 'freelancing']
  },

  // 8. HP Victus 15 - 150K+ (Rs. 235,000) - Gaming, Video Editing, Programming, Graphic Design
  {
    id: 'prod-lp-victus',
    sku: 'WC-HP-VICTUS15-NEW',
    name: 'HP Victus 15 Gaming Laptop - RTX 4050 6GB',
    brand: 'HP',
    category: 'laptops',
    retailPrice: 235000,
    wholesalePrice: 215000,
    wholesaleMOQ: 2,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 1, pricePerUnit: 235000, discountPercentage: 0 },
      { minUnits: 2, maxUnits: 4, pricePerUnit: 215000, discountPercentage: 8 },
      { minUnits: 5, pricePerUnit: 205000, discountPercentage: 12 }
    ],
    stockQuantity: 18,
    condition: 'NEW',
    rating: 4.9,
    reviewsCount: 65,
    isFeatured: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Core i5-13420H (13th Gen 8 Cores up to 4.6GHz)',
      gpu: 'NVIDIA GeForce RTX 4050 6GB GDDR6 Dedicated (DLSS 3)',
      ram: '16GB DDR4 3200MHz Dual Channel',
      storage: '512GB PCIe Gen4 NVMe SSD',
      display: '15.6" FHD IPS 144Hz Micro-Edge Display',
      os: 'Windows 11 Home Genuine',
      battery: '70Wh Li-ion polymer with Fast Charge',
      warranty: '1-Year Official Warranty',
      weight: '2.29 kg'
    },
    highlights: [
      'Brand New Sealed Box with official 1-Year Local Warranty',
      'Smooth 144Hz gaming display powered by Ada Lovelace RTX 4050',
      'Dual fans and wide rear vents for sustained thermal cooling'
    ],
    description: 'Brand new high-FPS gaming powerhouse. Unleash ray tracing, DLSS 3 frame generation, and swift content creation workflows.',
    tags: ['hp', 'victus', 'brand-new', 'sealed', 'rtx4050', 'gaming-laptop', 'gaming', 'video_editing', 'programming', 'graphic_design']
  },

  // 9. Apple MacBook Air M2 - 150K+ (Rs. 275,000) - Video Editing, Graphic Design, Programming, Business, Freelancing
  {
    id: 'prod-lp-mac-m2',
    sku: 'WC-APPLE-AIRM2-OPEN',
    name: 'Apple MacBook Air 13.6" Liquid Retina (M2 Chip)',
    brand: 'Apple',
    category: 'laptops',
    retailPrice: 275000,
    wholesalePrice: 252000,
    wholesaleMOQ: 2,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 1, pricePerUnit: 275000, discountPercentage: 0 },
      { minUnits: 2, maxUnits: 4, pricePerUnit: 252000, discountPercentage: 8 },
      { minUnits: 5, pricePerUnit: 240000, discountPercentage: 12 }
    ],
    stockQuantity: 15,
    condition: 'OPEN BOX',
    rating: 4.95,
    reviewsCount: 94,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Apple M2 Silicon (8-Core CPU with 4 performance cores & 4 efficiency cores)',
      gpu: '10-Core GPU with Hardware Accelerated Video Decode/Encode Engine',
      ram: '16GB Unified Memory',
      storage: '512GB Fast SSD Storage',
      display: '13.6-inch Liquid Retina Display with True Tone (2560x1664, 500 nits)',
      os: 'macOS Sonoma / macOS Sequoia Ready',
      battery: '52.6Wh (Up to 18 Hours Battery Life, 100% Battery Health)',
      warranty: '15-Day Checking Warranty',
      weight: '1.24 kg (Fanless Silent Design)',
      ports: 'MagSafe 3 Charging Port, 2x Thunderbolt / USB 4, 3.5mm Headphone Jack'
    },
    highlights: [
      'Open Box condition: Zero scratches, 100% battery cycle health with original MagSafe cable',
      'Fanless completely silent operation with unmatched 18-hour battery longevity',
      '15-Day Checking Warranty backed by War Computers'
    ],
    description: 'Impossibly thin design in midnight aluminum finish. Delivers astounding speed and power efficiency for creatives and professionals.',
    tags: ['apple', 'macbook-air', 'm2', 'open-box', 'liquid-retina', 'macos', 'video_editing', 'graphic_design', 'programming', 'business', 'freelancing']
  },

  // 10. Lenovo ThinkPad X1 Carbon Gen 12 - 150K+ (Rs. 295,000) - Business, Programming, Freelancing, Office
  {
    id: 'prod-lp-think-x1',
    sku: 'WC-THINK-X1G12-OPEN',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12 (OLED Edition)',
    brand: 'Lenovo',
    category: 'laptops',
    retailPrice: 295000,
    wholesalePrice: 265000,
    wholesaleMOQ: 2,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 1, pricePerUnit: 295000, discountPercentage: 0 },
      { minUnits: 2, maxUnits: 4, pricePerUnit: 265000, discountPercentage: 10 },
      { minUnits: 5, pricePerUnit: 249000, discountPercentage: 15 }
    ],
    stockQuantity: 1,
    condition: 'OPEN BOX',
    rating: 5.0,
    reviewsCount: 42,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Core Ultra 7 155H (16 Cores with Neural AI NPU)',
      gpu: 'Intel Arc Graphics',
      ram: '32GB LPDDR5x 6400MHz',
      storage: '1TB PCIe Gen4 Performance NVMe SSD',
      display: '14" 2.8K (2880x1800) OLED 120Hz 100% DCI-P3 DisplayHDR 500',
      os: 'Windows 11 Pro Enterprise Ready',
      battery: '57Whr (Up to 15 Hours runtime)',
      warranty: '15-Day Checking Warranty',
      weight: '1.09 kg (Ultralight Carbon Fiber)'
    },
    highlights: [
      'Open Box condition: Activated but pristine zero-wear condition with original box',
      'Stunning 2.8K 120Hz OLED screen and Core Ultra AI silicon',
      '15-Day Checking Warranty with complete original Lenovo accessories'
    ],
    description: 'The pinnacle of executive mobility. Featherlight carbon-fiber chassis, breathtaking OLED panel, and next-generation Intel AI acceleration.',
    tags: ['lenovo', 'thinkpad-x1', 'open-box', 'oled', 'core-ultra', 'flagship', 'business', 'programming', 'freelancing', 'office']
  },

  // 11. HP Fortis 14 G10 Chromebook - Under 50K (Rs. 38,000) - Student, Office, Freelancing
  {
    id: 'prod-cb-fortis',
    sku: 'WC-HP-FORTIS14-USED',
    name: 'HP Fortis 14 G10 Chromebook Enterprise Rugged',
    brand: 'HP',
    category: 'chromebooks',
    retailPrice: 38000,
    wholesalePrice: 32000,
    wholesaleMOQ: 5,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 4, pricePerUnit: 38000, discountPercentage: 0 },
      { minUnits: 5, maxUnits: 14, pricePerUnit: 32000, discountPercentage: 15 },
      { minUnits: 15, maxUnits: 49, pricePerUnit: 29000, discountPercentage: 23 },
      { minUnits: 50, pricePerUnit: 26000, discountPercentage: 31 }
    ],
    stockQuantity: 140,
    condition: 'USED',
    rating: 4.75,
    reviewsCount: 92,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Processor N200 Quad-Core (up to 3.7GHz)',
      gpu: 'Intel UHD Graphics',
      ram: '8GB LPDDR5 High-Speed RAM',
      storage: '128GB UFS Fast Flash Storage',
      display: '14.0" FHD IPS Anti-Glare (1920 x 1080) 250 nits',
      os: 'ChromeOS with Google Admin Console Management Support',
      battery: '47Whr Li-ion (Up to 10 Hours)',
      warranty: '7-Day Checking Warranty',
      weight: '1.45 kg',
      ports: '2x USB-C 3.2, 2x USB-A 3.2, HDMI 1.4b, Headphone Jack'
    },
    highlights: [
      'Reinforced Rubber Trim & Spill-Resistant Keyboard',
      'Auto-Update Expiration (AUE) verified through June 2033',
      '7-Day Checking Warranty with original Type-C charger'
    ],
    description: 'Engineered for students, online tutoring, web browsing, and call center cloud tools. Rugged build with long battery backup.',
    tags: ['hp', 'chromebook', 'used', 'tested', 'chromeos', 'budget-laptop', 'student', 'office', 'freelancing', 'under-50k']
  },

  // 11b. Dell Chromebook 3100 Rugged - Under Rs. 30,000 (Rs. 27,000) - Basic, Student, Web Browsing
  {
    id: 'prod-cb-dell3100',
    sku: 'WC-DELL-CB3100-USED',
    name: 'Dell Chromebook 3100 Rugged Education Laptop',
    brand: 'Dell',
    category: 'chromebooks',
    retailPrice: 27000,
    wholesalePrice: 22000,
    wholesaleMOQ: 5,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 4, pricePerUnit: 27000, discountPercentage: 0 },
      { minUnits: 5, maxUnits: 14, pricePerUnit: 22000, discountPercentage: 18 },
      { minUnits: 15, pricePerUnit: 19500, discountPercentage: 27 }
    ],
    stockQuantity: 180,
    condition: 'USED',
    rating: 4.7,
    reviewsCount: 110,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Celeron N4020 Dual-Core (up to 2.8GHz)',
      gpu: 'Intel UHD Graphics 600',
      ram: '4GB LPDDR4 High-Efficiency RAM',
      storage: '32GB eMMC Flash (MicroSD Expandable)',
      display: '11.6" HD Anti-Glare (1366 x 768) Rugged Display',
      os: 'ChromeOS (Google Play Store & Android App Support)',
      battery: '42Whr 3-Cell Battery (10-12 Hours Battery Life)',
      warranty: '7-Day Checking Warranty',
      weight: '1.29 kg',
      ports: '2x USB-C (Charging & Display), 2x USB 3.1, Audio Combo, MicroSD'
    },
    highlights: [
      'Best Price Under Rs. 30,000 in Pakistan with 10+ hours real battery backup',
      'Rubberized edges and spill-resistant keyboard for maximum durability',
      '7-Day Checking Warranty with genuine Type-C power adapter included'
    ],
    description: 'Ultra-durable, lightweight student and daily browsing laptop. Perfect for YouTube, Google Docs, Zoom lectures, online assignments, and casual web use.',
    tags: ['dell', 'chromebook', 'under-30k', 'basic', 'student', 'used-laptop', 'tested', 'chromeos', 'budget-laptop']
  },

  // 12. Dell OptiPlex 7070 Micro - Desktops
  {
    id: 'prod-dt-optiplex',
    sku: 'WC-DELL-OPTI7070-USED',
    name: 'Dell OptiPlex 7070 Micro Desktop PC',
    brand: 'Dell',
    category: 'desktops',
    retailPrice: 42000,
    wholesalePrice: 36000,
    wholesaleMOQ: 3,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 2, pricePerUnit: 42000, discountPercentage: 0 },
      { minUnits: 3, maxUnits: 5, pricePerUnit: 36000, discountPercentage: 14 },
      { minUnits: 6, pricePerUnit: 33000, discountPercentage: 21 }
    ],
    stockQuantity: 55,
    condition: 'USED',
    rating: 4.85,
    reviewsCount: 130,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Core i5-9500T 6-Core (up to 3.7GHz)',
      gpu: 'Intel UHD Graphics 630 (Supports 3 Displays)',
      ram: '16GB DDR4 RAM',
      storage: '256GB NVMe SSD + 500GB HDD Storage',
      os: 'Windows 11 Pro 64-bit Genuine',
      ports: '2x DisplayPort 1.2, 5x USB 3.1 Gen 2, Gigabit LAN, Wi-Fi Card',
      warranty: '7-Day Checking Warranty',
      powerSupply: '65W High-Efficiency AC Adapter Included'
    },
    highlights: [
      'Compact mini PC fits in the palm of your hand - space saving & quiet',
      '100% Bench Tested: MemTest86, CPU stress test, and port checks passed',
      '7-Day Checking Warranty with original Dell power adapter included'
    ],
    description: 'Reliable micro desktop PC for offices, schools, medical clinics, and call centers. Extremely energy-efficient with snappy SSD performance.',
    tags: ['dell', 'optiplex', 'micro-pc', 'used-desktop', 'core-i5', 'tested-pc', 'office', 'student']
  },

  // 13. War Apex Titan X Gaming Rig - Desktops
  {
    id: 'prod-dt-titan4090',
    sku: 'WC-TITAN-4090-NEW',
    name: 'War Apex Titan X Gaming & AI Workstation Rig',
    brand: 'Custom Rig',
    category: 'desktops',
    retailPrice: 850000,
    wholesalePrice: 775000,
    wholesaleMOQ: 2,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 1, pricePerUnit: 850000, discountPercentage: 0 },
      { minUnits: 2, maxUnits: 4, pricePerUnit: 775000, discountPercentage: 9 },
      { minUnits: 5, pricePerUnit: 730000, discountPercentage: 14 }
    ],
    stockQuantity: 14,
    condition: 'NEW',
    rating: 5.0,
    reviewsCount: 88,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Intel Core i9-14900KS (24 Cores / 32 Threads up to 6.2GHz)',
      gpu: 'NVIDIA GeForce RTX 4090 24GB GDDR6X',
      ram: '64GB DDR5 6400MHz RGB Dual Channel',
      storage: '4TB (2x 2TB) PCIe 4.0 NVMe SSD RAID-0',
      os: 'Windows 11 Pro 64-bit Workstation',
      ports: '2x Thunderbolt 4, 6x USB 3.2 Gen2, 2.5GbE LAN, Wi-Fi 7',
      warranty: '3-Year Premium Warranty',
      cooling: '360mm AIO Liquid Cooler with OLED Display',
      powerSupply: '1200W 80+ Platinum Fully Modular'
    },
    highlights: [
      'Brand New Sealed components assembled with precision cable management',
      'Unthrottled 4K/8K Gaming, 3D Rendering, & Local LLM AI Model Fine-Tuning',
      '3-Year Premium Hardware Warranty & Lifetime Technical Support'
    ],
    description: 'The pinnacle of desktop computational power. Engineered for competitive gamers, 3D architectural visualizers, and AI researchers.',
    tags: ['custom-rig', 'rtx4090', 'intel-i9', 'brand-new', 'gaming-desktop', 'ai-beast']
  },

  // 14. Apple iPad Pro 13 M4 - Tablets
  {
    id: 'prod-tab-ipad-m4',
    sku: 'WC-APPLE-IPADM4-NEW',
    name: 'Apple iPad Pro 13" Tandem OLED (M4 Chip)',
    brand: 'Apple',
    category: 'tablets',
    retailPrice: 365000,
    wholesalePrice: 335000,
    wholesaleMOQ: 2,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 1, pricePerUnit: 365000, discountPercentage: 0 },
      { minUnits: 2, maxUnits: 4, pricePerUnit: 335000, discountPercentage: 8 },
      { minUnits: 5, pricePerUnit: 320000, discountPercentage: 12 }
    ],
    stockQuantity: 20,
    condition: 'NEW',
    rating: 4.98,
    reviewsCount: 64,
    isFeatured: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'Apple M4 Chip (9-Core CPU, 10-Core GPU, 16-Core Neural Engine)',
      gpu: '10-Core GPU with Hardware Ray Tracing',
      ram: '8GB Unified Memory',
      storage: '512GB High-Speed Flash Storage',
      display: '13-inch Tandem OLED Ultra Retina XDR (2752x2064, 1600 nits peak)',
      os: 'iPadOS 18 Ready',
      battery: '38.99Whr (Up to 10 hours web/video)',
      warranty: '1-Year Official Warranty',
      weight: '579 grams (5.1mm Ultra-thin)',
      ports: 'Thunderbolt 4 / USB 4'
    },
    highlights: [
      'Brand New Factory Sealed Box with 1-Year Apple International & Local Warranty',
      'Mind-blowing Tandem OLED display with infinite contrast and 1600 nits HDR',
      'Ultra-thin 5.1mm engineering powered by M4 Silicon'
    ],
    description: 'The ultimate portable computing canvas. Tandem OLED screen technology, next-generation M4 speed, and ultra-slim profile.',
    tags: ['apple', 'ipad-pro', 'brand-new', 'm4', 'oled', 'tablet', 'graphic_design']
  },

  // 15. Dell OptiPlex Micro Gen12 Fleet - Wholesale Lot
  {
    id: 'prod-lot-optiplex',
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
    tags: ['wholesale-lot', 'dell-optiplex', 'bulk-desktop', 'pallet-deal', 'b2b-fleet', 'refurbished']
  },

  // 16. Threadripper Workstation
  {
    id: 'prod-ws-threadripper',
    sku: 'WC-WORKSTN-THREAD-NEW',
    name: 'War Titan Enterprise Workstation - Threadripper 96-Core',
    brand: 'Custom Rig',
    category: 'workstations',
    retailPrice: 1950000,
    wholesalePrice: 1780000,
    wholesaleMOQ: 1,
    wholesaleTiers: [
      { minUnits: 1, maxUnits: 1, pricePerUnit: 1950000, discountPercentage: 0 },
      { minUnits: 2, maxUnits: 3, pricePerUnit: 1780000, discountPercentage: 8 },
      { minUnits: 4, pricePerUnit: 1650000, discountPercentage: 15 }
    ],
    stockQuantity: 6,
    condition: 'NEW',
    rating: 5.0,
    reviewsCount: 22,
    isFeatured: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=720&q=75'
    ],
    specs: {
      cpu: 'AMD Ryzen Threadripper PRO 7995WX (96 Cores / 192 Threads, 5.1GHz)',
      gpu: 'Dual NVIDIA RTX 6000 Ada Generation 48GB (96GB Total VRAM)',
      ram: '256GB (8x 32GB) DDR5 ECC Registered Octa-Channel',
      storage: '8TB (4x 2TB) PCIe 5.0 NVMe Enterprise SSD Array',
      os: 'Ubuntu Linux 24.04 LTS / Windows Server 2025 Datacenter',
      warranty: '3-Year Enterprise SLA Warranty',
      cooling: 'Custom Dual Loop High-Static Pressure Liquid Cooling',
      powerSupply: '2000W 80+ Titanium Redundant Dual PSU'
    },
    highlights: [
      '96 Physical Cores / 192 Threads for Massive AI Model Fine-Tuning & VFX',
      'ECC Registered Memory prevents data corruption in mission-critical simulations',
      'Brand New Enterprise Tower with 3-Year On-Site SLA Warranty'
    ],
    description: 'Industrial-grade compute power built for local AI model training, animation studios, computational simulations, and heavy server loads.',
    tags: ['threadripper', 'workstation', 'dual-gpu', 'ai-server', 'ecc-memory', 'brand-new']
  }
];

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
    { id: 'prod-lp-hp840', name: 'HP EliteBook 840 G7 (USED • TESTED)', category: 'Laptops', unitsSold: 42, revenue: 2940000, stockRemaining: 48 },
    { id: 'prod-lp-dell7400', name: 'Dell Latitude 7400 (USED • TESTED)', category: 'Laptops', unitsSold: 28, revenue: 1624000, stockRemaining: 36 },
    { id: 'prod-dt-optiplex', name: 'Dell OptiPlex 7070 Micro (USED • TESTED)', category: 'Desktops', unitsSold: 35, revenue: 1470000, stockRemaining: 55 },
    { id: 'prod-lp-think-t14', name: 'ThinkPad T14 Gen 2 (REFURBISHED)', category: 'Laptops', unitsSold: 18, revenue: 1764000, stockRemaining: 24 }
  ],
  stockAlerts: [
    { id: 'prod-lp-think-x1', name: 'ThinkPad X1 Carbon Gen 12 (OPEN BOX)', currentStock: 12, reorderLevel: 15, leadTimeDays: 7, supplier: 'Direct US Import', status: 'Low' as const },
    { id: 'prod-dt-titan4090', name: 'War Apex Titan X (RTX 4090)', currentStock: 14, reorderLevel: 20, leadTimeDays: 5, supplier: 'Official Distributor', status: 'Low' as const }
  ]
};
