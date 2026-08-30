import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Search, 
  Check, 
  Sparkles, 
  Layers, 
  PackageCheck, 
  DollarSign, 
  Boxes, 
  Copy, 
  Download, 
  Monitor, 
  Laptop, 
  Server, 
  ChevronDown, 
  Eye, 
  Cpu, 
  Zap, 
  HardDrive, 
  SlidersHorizontal,
  Calendar,
  Key,
  Shield,
  Battery,
  Flame,
  X,
  RotateCcw,
  CheckCircle2,
  Tv
} from 'lucide-react';
import { Product, ProductCategory, ProductCondition, PricingMode } from '../types';
import { formatPrice } from '../utils/formatCurrency';
import { ProductCard } from './ProductCard';

interface ManageProductsSectionProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetToDefaults: () => void;
  onQuickView: (product: Product) => void;
  pricingMode: PricingMode;
}

// Category-specific templates with pre-configured defaults
const CATEGORY_TEMPLATES: Record<string, { label: string; defaultProduct: Omit<Product, 'id'> }> = {
  chromebooks: {
    label: 'Add Chromebook',
    defaultProduct: {
      sku: 'WC-CB-801',
      name: 'War Titan Rugged 360 Chromebook Plus',
      brand: 'Acer',
      category: 'chromebooks',
      retailPrice: 58000,
      wholesalePrice: 42000,
      wholesaleMOQ: 10,
      wholesaleTiers: [
        { minUnits: 10, maxUnits: 49, pricePerUnit: 42000, discountPercentage: 28 },
        { minUnits: 50, maxUnits: 99, pricePerUnit: 38000, discountPercentage: 34 },
        { minUnits: 100, pricePerUnit: 34000, discountPercentage: 41 }
      ],
      stockQuantity: 45,
      condition: 'Brand New',
      rating: 4.9,
      reviewsCount: 32,
      isFeatured: true,
      isBestSeller: true,
      isNewArrival: false,
      isBulkLot: false,
      images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
      ],
      specs: {
        cpu: 'Intel Processor N200 Quad-Core (Up to 3.7GHz) / MediaTek Kompanio 520',
        gpu: 'Intel UHD Graphics / ARM Mali-G52 2EE MC2',
        ram: '8GB LPDDR5-4800MHz High Efficiency RAM',
        storage: '128GB UFS 2.2 High-Speed Flash Storage + MicroSD Expansion',
        display: '14.0-inch FHD (1920x1080) IPS 300 nits Antimicrobial Touchscreen with 360° Hinge & USI Stylus',
        os: 'ChromeOS with Google Admin Console Management Support',
        battery: '12.5 Hours Long-Life Battery with 45W USB-C Fast Charging',
        warranty: '2-Year Depot & School District Fleet Advance Replacement',
        aueDate: 'June 2032 (Guaranteed Google AUE Automatic Updates)',
        zeroTouchEnrollment: 'Google Zero-Touch Enrollment & Education Fleet Ready',
        militaryStandard: 'MIL-STD-810H Military Grade Drop & Spill Resistant Keyboard with Rubber Bumpers'
      },
      highlights: [
        'Guaranteed Google AUE software and security updates through June 2032',
        'MIL-STD-810H rugged drop-resistant chassis with spill-proof drain keyboard',
        'Google Admin Console Zero-Touch enrollment ready for enterprise and schools',
        'Up to 12.5 hours all-day battery with rapid USB-C Power Delivery'
      ],
      description: 'Rugged, high-reliability Chromebook engineered for education fleets, mobile workforce, and cloud enterprise environments with full Google Workspace management integration.',
      tags: ['chromebook', 'chromeos', 'k12-fleet', 'rugged', 'touchscreen', 'aue-2032']
    }
  },
  laptops: {
    label: 'Add Laptop',
    defaultProduct: {
      sku: 'WC-LT-902',
      name: 'War Apex Stealth Pro RTX 4070 Gaming & Creator Laptop',
      brand: 'ASUS',
      category: 'laptops',
      retailPrice: 285000,
      wholesalePrice: 225000,
      wholesaleMOQ: 5,
      wholesaleTiers: [
        { minUnits: 5, maxUnits: 19, pricePerUnit: 225000, discountPercentage: 21 },
        { minUnits: 20, maxUnits: 49, pricePerUnit: 210000, discountPercentage: 26 },
        { minUnits: 50, pricePerUnit: 195000, discountPercentage: 32 }
      ],
      stockQuantity: 28,
      condition: 'Brand New',
      rating: 5.0,
      reviewsCount: 24,
      isFeatured: true,
      isBestSeller: true,
      isNewArrival: true,
      isBulkLot: false,
      images: [
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
      ],
      specs: {
        cpu: 'Intel Core i9-14900HX 24-Core (Up to 5.8GHz) / AMD Ryzen 9 8945HS',
        gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6 (140W Max TGP + MUX Switch & NVIDIA Advanced Optimus)',
        ram: '32GB DDR5-5600MHz Dual-Channel (Expandable to 64GB)',
        storage: '1TB NVMe PCIe 4.0 M.2 High-Speed Performance SSD',
        display: '16.0-inch QHD+ (2560x1600) 240Hz 3ms 100% DCI-P3 500 nits Anti-Glare IPS Display with G-SYNC',
        os: 'Windows 11 Pro 64-bit Genuine Licensed',
        battery: '90Wh 4-Cell Li-ion Battery with 240W GaN Rapid Adapter',
        ports: '1x Thunderbolt 4 / USB4, 2x USB-C 3.2 Gen2, HDMI 2.1 FRL, UHS-II SD Card Reader, 2.5G LAN',
        warranty: '2-Year War Depot OEM Comprehensive Onsite Warranty'
      },
      highlights: [
        '140W Full-Power NVIDIA RTX 4070 graphics with hardware ray tracing & DLSS 3.5',
        'Blazing 240Hz QHD+ color-calibrated display with 100% DCI-P3 gamut coverage',
        'Dual Arc-Flow cooling fans with liquid metal thermal compound on CPU',
        'Precision CNC aluminum unibody with per-key RGB backlit keyboard'
      ],
      description: 'Flagship mobile gaming and workstation-class laptop offering desktop-grade computing power, high refresh rate visuals, and rapid cooling for power users.',
      tags: ['laptop', 'gaming', 'rtx4070', 'i9-14900hx', '240hz', 'creator']
    }
  },
  workstations: {
    label: 'Add Workstation',
    defaultProduct: {
      sku: 'WC-WS-995',
      name: 'War Hyperion Threadripper AI Deep Learning & 3D Workstation',
      brand: 'Custom Rig',
      category: 'workstations',
      retailPrice: 850000,
      wholesalePrice: 690000,
      wholesaleMOQ: 2,
      wholesaleTiers: [
        { minUnits: 2, maxUnits: 4, pricePerUnit: 690000, discountPercentage: 19 },
        { minUnits: 5, maxUnits: 9, pricePerUnit: 640000, discountPercentage: 25 },
        { minUnits: 10, pricePerUnit: 590000, discountPercentage: 31 }
      ],
      stockQuantity: 12,
      condition: 'Brand New',
      rating: 5.0,
      reviewsCount: 16,
      isFeatured: true,
      isBestSeller: false,
      isNewArrival: true,
      isBulkLot: false,
      images: [
        'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80'
      ],
      specs: {
        cpu: 'AMD Ryzen Threadripper PRO 7965WX 24-Core / 48-Thread (Up to 5.3GHz 128MB Cache)',
        gpu: 'Dual NVIDIA RTX 4090 24GB or RTX 6000 Ada 48GB GDDR6 with ECC Support',
        ram: '128GB (4x32GB) Registered ECC DDR5-4800MHz Quad-Channel Memory (Expandable to 1TB)',
        storage: '4TB NVMe PCIe 5.0 SSD (12,400MB/s Read) + 16TB Enterprise 7200RPM 256MB Cache SATA HDD RAID',
        os: 'Windows 11 Pro for Workstations / Ubuntu Linux 24.04 LTS Pre-Configured with CUDA Toolkit',
        powerSupply: '1600W 80-Plus Titanium Fully Modular Redundant Power Supply',
        coolingType: 'Custom 360mm High-Pressure Liquid Loop with Industrial Noctua PPC 3000RPM PWM Fans',
        chassisFormFactor: 'Heavy-Gauge E-ATX Steel Workstation Chassis / 4U Rackmount Conversion Ready',
        expansionSlots: '7x PCIe 5.0 x16 Full-Length Expansion Slots with Multi-GPU PCIe Lane Allocation',
        raidSupport: 'Hardware NVMe RAID 0/1/5/10 Controller & SAS/SATA Support',
        warranty: '3-Year 24/7 Dedicated Enterprise SLA with 4-Hour Onsite Parts Dispatch'
      },
      highlights: [
        'Built for LLM fine-tuning, PyTorch deep learning training, and 8K cinematic rendering',
        'Registered ECC RAM architecture prevents data corruption during multi-day compute tasks',
        'High-bandwidth PCIe 5.0 architecture with 128 PCIe lanes directly to the CPU',
        '1600W Titanium enterprise power delivery with redundant 24/7 continuous operation rating'
      ],
      description: 'Extreme enterprise compute workstation engineered for artificial intelligence researchers, VFX rendering studios, CAD engineering, and mission-critical 24/7 compute loads.',
      tags: ['workstation', 'threadripper', 'ai-compute', 'dual-gpu', 'ecc-ram', 'enterprise']
    }
  },
  desktops: {
    label: 'Add Desktop / PC Rig',
    defaultProduct: {
      sku: 'WC-DT-770',
      name: 'War Apex Titan Core i9 RTX 4080 Super Gaming Desktop',
      brand: 'Custom Rig',
      category: 'desktops',
      retailPrice: 360000,
      wholesalePrice: 285000,
      wholesaleMOQ: 3,
      wholesaleTiers: [
        { minUnits: 3, maxUnits: 9, pricePerUnit: 285000, discountPercentage: 21 },
        { minUnits: 10, maxUnits: 24, pricePerUnit: 265000, discountPercentage: 26 },
        { minUnits: 25, pricePerUnit: 245000, discountPercentage: 32 }
      ],
      stockQuantity: 18,
      condition: 'Brand New',
      rating: 4.9,
      reviewsCount: 19,
      isFeatured: true,
      isBestSeller: true,
      isNewArrival: false,
      isBulkLot: false,
      images: [
        'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'
      ],
      specs: {
        cpu: 'Intel Core i9-14900K 24-Core 32-Thread (6.0GHz Max Turbo)',
        gpu: 'NVIDIA GeForce RTX 4080 Super 16GB GDDR6X Triple Fan OC Edition',
        ram: '64GB (2x32GB) DDR5-6000MHz RGB CL30 Dual-Channel',
        storage: '2TB NVMe PCIe 4.0 M.2 Extreme SSD (7,400MB/s)',
        os: 'Windows 11 Pro 64-bit Genuine',
        powerSupply: '1000W 80-Plus Gold Fully Modular ATX 3.0 PCIe 5.0 PSU',
        cooling: '360mm AIO ARGB Liquid Cooler with Low-Noise PWM Fans',
        warranty: '2-Year War Depot Full Hardware Replacement Warranty'
      },
      highlights: [
        'Extreme 4K ray-traced gaming performance with DLSS 3 frame generation',
        'Liquid cooled thermal envelope maintains peak boost frequencies under full gaming load',
        'Tempered glass panoramic case with addressable sync RGB lighting',
        'Pre-tested with 48-hour continuous stress test and memory stability burn-in'
      ],
      description: 'High-end custom-assembled desktop gaming rig built with hand-picked components for extreme gaming, streaming, and content creation.',
      tags: ['desktop', 'gaming-pc', 'rtx4080super', 'i9-14900k', 'liquid-cooled']
    }
  }
};

const SAMPLE_IMAGE_PRESETS: Record<string, { label: string; url: string }[]> = {
  chromebooks: [
    { label: 'Rugged Touch 360 Flip', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
    { label: 'K-12 Education Clamshell', url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80' },
    { label: 'Enterprise Chromebook Plus', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' }
  ],
  laptops: [
    { label: 'ROG / MSI Gaming Laptop', url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80' },
    { label: 'ThinkPad Business Laptop', url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80' },
    { label: 'Apple MacBook Pro M3', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' }
  ],
  workstations: [
    { label: 'Dual-GPU AI Compute Node', url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80' },
    { label: 'Liquid-Cooled Studio Tower', url: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80' },
    { label: 'Rackmount Compute Server', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80' }
  ],
  desktops: [
    { label: 'Panoramic RGB Gaming PC', url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80' },
    { label: 'AIO Liquid Studio Tower', url: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80' }
  ]
};

export const ManageProductsSection: React.FC<ManageProductsSectionProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetToDefaults,
  onQuickView,
  pricingMode
}) => {
  // Dropdown category selection state: 'chromebooks' | 'laptops' | 'workstations' | 'desktops'
  const [selectedAddCategory, setSelectedAddCategory] = useState<string>('chromebooks');

  // Currently active form mode: whether we are creating a new product or editing an existing one from the table
  const [isEditingExisting, setIsEditingExisting] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Product>(() => {
    const template = CATEGORY_TEMPLATES.chromebooks.defaultProduct;
    return {
      ...template,
      id: `war-prod-${Date.now()}`
    };
  });

  // Table filtering & search state
  const [tableSearch, setTableSearch] = useState<string>('');
  const [tableCategory, setTableCategory] = useState<string>('all');
  const [tableStockFilter, setTableStockFilter] = useState<'all' | 'inStock' | 'lowStock' | 'outOfStock'>('all');
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // Trigger feedback alert
  const triggerFeedback = (msg: string) => {
    setSaveFeedback(msg);
    setTimeout(() => setSaveFeedback(null), 4000);
  };

  // Helper to load template for adding a new product based on category selection
  const loadCategoryTemplate = (categoryKey: string) => {
    const templateConfig = CATEGORY_TEMPLATES[categoryKey] || CATEGORY_TEMPLATES.chromebooks;
    const newId = `war-prod-${Date.now()}`;
    const newSku = `WC-${categoryKey.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    setSelectedAddCategory(categoryKey);
    setIsEditingExisting(false);
    setEditingProductId(null);
    setFormData({
      ...templateConfig.defaultProduct,
      id: newId,
      sku: newSku,
      name: templateConfig.defaultProduct.name
    });
    triggerFeedback(`Switched to "${templateConfig.label}" form template.`);
  };

  // Handle category dropdown change in the "Add New Product" selector
  const handleDropdownCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value;
    loadCategoryTemplate(cat);
  };

  // Field change helpers
  const handleFieldChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecsChange = (specKey: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [specKey]: value
      }
    }));
  };

  const handleImageChange = (url: string) => {
    setFormData(prev => ({
      ...prev,
      images: [url, ...(prev.images.slice(1))]
    }));
  };

  // Save product action (either Adds or Updates)
  const handleSaveProduct = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Product name is required');
      return;
    }

    if (isEditingExisting) {
      onUpdateProduct(formData);
      triggerFeedback(`Successfully updated "${formData.name}" in catalog!`);
    } else {
      onAddProduct(formData);
      triggerFeedback(`Successfully added new ${formData.category} "${formData.name}" to catalog!`);
      // Prepare fresh SKU for the next addition
      setFormData(prev => ({
        ...prev,
        id: `war-prod-${Date.now()}`,
        sku: `WC-${formData.category.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`
      }));
    }
  };

  // Trigger edit on an existing product from the Management Table
  const handleEditFromTable = (product: Product) => {
    setIsEditingExisting(true);
    setEditingProductId(product.id);
    setSelectedAddCategory(product.category);
    setFormData({ ...product });
    triggerFeedback(`Loaded product "${product.name}" into editor.`);
    
    // Smooth scroll to the form
    document.getElementById('manage-products-form-panel')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cancel edit mode and return to Add New Product
  const handleCancelEdit = () => {
    loadCategoryTemplate(selectedAddCategory);
  };

  // Quick stock adjuster on table
  const handleQuickStockAdjust = (prod: Product, delta: number) => {
    const newStock = Math.max(0, prod.stockQuantity + delta);
    const updated = { ...prod, stockQuantity: newStock };
    onUpdateProduct(updated);
    if (formData.id === prod.id) {
      setFormData(updated);
    }
  };

  // Duplicate a product
  const handleDuplicateProduct = (prod: Product) => {
    const duplicated: Product = {
      ...prod,
      id: `war-prod-${Date.now()}`,
      sku: `${prod.sku}-COPY`,
      name: `${prod.name} (Copy)`,
      rating: 5.0,
      reviewsCount: 1
    };
    onAddProduct(duplicated);
    setIsEditingExisting(true);
    setEditingProductId(duplicated.id);
    setFormData(duplicated);
    triggerFeedback(`Duplicated as "${duplicated.name}" in catalog.`);
  };

  // Filtered products list for the table
  const tableFilteredProducts = products.filter(p => {
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchCpu = p.specs?.cpu?.toLowerCase().includes(q) || false;
      if (!matchName && !matchSku && !matchBrand && !matchCpu) return false;
    }
    if (tableCategory !== 'all' && p.category !== tableCategory) return false;
    if (tableStockFilter === 'inStock' && p.stockQuantity <= 0) return false;
    if (tableStockFilter === 'lowStock' && (p.stockQuantity > 10 || p.stockQuantity === 0)) return false;
    if (tableStockFilter === 'outOfStock' && p.stockQuantity > 0) return false;
    return true;
  });

  // Calculate catalog stats
  const totalCatalogUnits = products.reduce((acc, p) => acc + p.stockQuantity, 0);
  const totalRetailValuation = products.reduce((acc, p) => acc + (p.retailPrice * p.stockQuantity), 0);
  const lowStockCount = products.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 10).length;
  const outOfStockCount = products.filter(p => p.stockQuantity === 0).length;

  // Active category preset images
  const activeImagePresets = SAMPLE_IMAGE_PRESETS[formData.category] || SAMPLE_IMAGE_PRESETS.chromebooks;

  return (
    <section 
      id="manage-products-section" 
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-20"
    >
      {/* Section Ambient Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Admin Title & Overview Banner */}
      <div className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Hardware Control Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>Manage Products & Catalog Matrix</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Use the dedicated dropdown menu to add new specialized categories (<strong>Chromebooks</strong>, <strong>Laptops</strong>, and <strong>Workstations</strong>) with tailored input fields. Use the <strong>All Products Management Table</strong> below to edit, adjust stock, or remove any active inventory item.
            </p>
          </div>

          {/* Quick Category Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => loadCategoryTemplate('chromebooks')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                !isEditingExisting && selectedAddCategory === 'chromebooks'
                  ? 'bg-orange-500 text-white border-orange-400 shadow-md shadow-orange-500/30'
                  : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border-white/10'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 text-orange-400" />
              <span>Add Chromebook</span>
            </button>

            <button
              onClick={() => loadCategoryTemplate('laptops')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                !isEditingExisting && selectedAddCategory === 'laptops'
                  ? 'bg-orange-500 text-white border-orange-400 shadow-md shadow-orange-500/30'
                  : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border-white/10'
              }`}
            >
              <Laptop className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Laptop</span>
            </button>

            <button
              onClick={() => loadCategoryTemplate('workstations')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                !isEditingExisting && selectedAddCategory === 'workstations'
                  ? 'bg-orange-500 text-white border-orange-400 shadow-md shadow-orange-500/30'
                  : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border-white/10'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-purple-400" />
              <span>Add Workstation</span>
            </button>
          </div>
        </div>

        {/* Catalog KPIs & Stock Summary Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-white/5 shadow-inner flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Catalog SKUs</p>
              <p className="text-lg sm:text-xl font-black text-white">{products.length} Models</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-white/5 shadow-inner flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Available Units</p>
              <p className="text-lg sm:text-xl font-black text-emerald-400">{totalCatalogUnits} Units</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-white/5 shadow-inner flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Stock Alerts</p>
              <p className="text-lg sm:text-xl font-black text-amber-400">
                {lowStockCount} Low • {outOfStockCount} Out
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-white/5 shadow-inner flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Depot Valuation</p>
              <p className="text-base sm:text-lg font-black text-slate-100 truncate">
                {formatPrice(totalRetailValuation)}
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Alert Toast */}
        {saveFeedback && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 border border-orange-500/40 text-orange-200 text-xs font-bold flex items-center justify-between shadow-lg animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-orange-400" />
              <span>{saveFeedback}</span>
            </div>
            <span className="text-[10px] text-orange-300 uppercase tracking-widest font-mono">CATALOG SYNCED</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 1: ADD NEW PRODUCT CATEGORY DROPDOWN MENU & DYNAMIC FORM FIELDS */}
        {/* ========================================================================= */}
        <div id="manage-products-form-panel" className="bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
          
          {/* Top Dropdown Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-orange-500/30 shadow-md">
            <div className="space-y-1">
              <label htmlFor="admin-add-product-category-dropdown" className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Add New Product Dropdown Menu:
              </label>
              <p className="text-[11px] text-slate-400">
                Select a category below. The entire input form and specifications matrix will dynamically adapt specifically for that hardware type.
              </p>
            </div>

            {/* The Requested Dropdown Menu */}
            <div className="relative min-w-[280px] sm:min-w-[340px]">
              <select
                id="admin-add-product-category-dropdown"
                value={isEditingExisting ? 'EDIT_MODE' : selectedAddCategory}
                onChange={handleDropdownCategoryChange}
                className="w-full bg-slate-950 text-white font-bold text-xs sm:text-sm rounded-xl px-4 py-3 border-2 border-orange-500/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 cursor-pointer shadow-lg appearance-none pr-10"
              >
                {isEditingExisting && (
                  <option value="EDIT_MODE">
                    ✏️ Editing: [{formData.sku}] {formData.name}
                  </option>
                )}
                <option value="chromebooks">💻 Add Chromebook (K-12 & Cloud)</option>
                <option value="laptops">⚡ Add Laptop (Gaming & Performance)</option>
                <option value="workstations">🖥️ Add Workstation (AI & 3D Compute)</option>
                <option value="desktops">🎮 Add Desktop / Gaming PC Rig</option>
              </select>
              <ChevronDown className="w-4 h-4 text-orange-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Active Editing Notice Banner (Shown when editing a product loaded from the table) */}
          {isEditingExisting && (
            <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-300">
                    Currently Editing Product: <span className="text-white underline">{formData.name}</span> ({formData.sku})
                  </p>
                  <p className="text-[11px] text-amber-200/70">
                    Category: <span className="capitalize font-semibold text-white">{formData.category}</span>. Adjust fields below and click "Save Changes".
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-white/10 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Exit Edit Mode</span>
                </button>
              </div>
            </div>
          )}

          {/* Form & Live Product Card Side-by-Side Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 8 Columns: Dynamic Input Fields Form */}
            <form onSubmit={handleSaveProduct} className="lg:col-span-8 space-y-5">
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-5 shadow-inner">
                
                {/* Form Title Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      {formData.category === 'chromebooks' && <Monitor className="w-4 h-4 text-orange-400" />}
                      {formData.category === 'laptops' && <Laptop className="w-4 h-4 text-amber-400" />}
                      {formData.category === 'workstations' && <Server className="w-4 h-4 text-purple-400" />}
                      {formData.category === 'desktops' && <Tv className="w-4 h-4 text-blue-400" />}
                      <span>{isEditingExisting ? `Edit ${formData.category}` : `New ${formData.category} Specifications Form`}</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300 border border-orange-500/30 uppercase">
                      {formData.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono">SKU: {formData.sku}</span>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* 1. PRIMARY GENERAL ATTRIBUTES (Common to all items) */}
                {/* ========================================================================= */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">
                      Product Name (Display Title)
                    </label>
                    <input
                      id="admin-input-product-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      placeholder={
                        formData.category === 'chromebooks'
                          ? 'e.g. Acer Spin 514 Rugged Touch 360 Chromebook'
                          : formData.category === 'laptops'
                            ? 'e.g. ASUS ROG Strix SCAR 16 RTX 4080 Gaming Laptop'
                            : 'e.g. War Hyperion Threadripper PRO 7995WX AI Workstation'
                      }
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-medium"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">SKU Code</label>
                    <input
                      id="admin-input-sku"
                      type="text"
                      value={formData.sku}
                      onChange={(e) => handleFieldChange('sku', e.target.value)}
                      placeholder="WC-CB-801"
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-orange-300 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                </div>

                {/* Brand, Category & Condition */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">Brand</label>
                    <select
                      id="admin-input-brand"
                      value={formData.brand}
                      onChange={(e) => handleFieldChange('brand', e.target.value)}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      {formData.category === 'chromebooks' && (
                        <>
                          <option value="Acer">Acer</option>
                          <option value="Lenovo">Lenovo</option>
                          <option value="HP">HP</option>
                          <option value="Dell">Dell</option>
                          <option value="ASUS">ASUS</option>
                        </>
                      )}
                      {formData.category === 'laptops' && (
                        <>
                          <option value="ASUS">ASUS (ROG / TUF / ZenBook)</option>
                          <option value="Lenovo">Lenovo (ThinkPad / Legion)</option>
                          <option value="Dell">Dell (Alienware / XPS)</option>
                          <option value="MSI">MSI Gaming</option>
                          <option value="Apple">Apple MacBook</option>
                          <option value="HP">HP (Omen / Spectre)</option>
                          <option value="Razer">Razer Blade</option>
                          <option value="Acer">Acer Predator</option>
                        </>
                      )}
                      {formData.category === 'workstations' && (
                        <>
                          <option value="Custom Rig">Custom Rig (War Enterprise)</option>
                          <option value="Dell">Dell Precision Workstation</option>
                          <option value="HP">HP Z-Series Workstation</option>
                          <option value="Lenovo">Lenovo ThinkStation</option>
                          <option value="ASUS">ASUS ProArt Station</option>
                        </>
                      )}
                      {formData.category === 'desktops' && (
                        <>
                          <option value="Custom Rig">Custom Custom-Built Rig</option>
                          <option value="ASUS">ASUS ROG Gaming Rig</option>
                          <option value="MSI">MSI Gaming Desktop</option>
                          <option value="HP">HP Omen Desktop</option>
                          <option value="Dell">Alienware Aurora Desktop</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">Category</label>
                    <input
                      type="text"
                      readOnly
                      value={formData.category.toUpperCase()}
                      className="w-full bg-slate-950/40 border border-white/5 rounded-xl px-3 py-2 text-xs font-bold text-orange-400 cursor-not-allowed select-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">Condition Badge</label>
                    <select
                      id="admin-input-condition"
                      value={formData.condition}
                      onChange={(e) => handleFieldChange('condition', e.target.value as ProductCondition)}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="Brand New">Brand New (Sealed Factory Direct)</option>
                      <option value="Factory Certified">Factory Certified Refurbished</option>
                      <option value="Bulk Refurbished Grade-A">Bulk Refurbished Grade-A</option>
                    </select>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* 2. DYNAMIC HARDWARE SPECIFICATIONS FIELDS (Varies according to category) */}
                {/* ========================================================================= */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-orange-500/25 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      {formData.category === 'chromebooks' && 'Chromebook-Specific Architecture & Specs'}
                      {formData.category === 'laptops' && 'Laptop-Specific Hardware & Display Specs'}
                      {formData.category === 'workstations' && 'Workstation Enterprise & AI Compute Specs'}
                      {formData.category === 'desktops' && 'Desktop Gaming & Thermal Specs'}
                    </span>
                    <span className="text-[10px] text-slate-400">Dynamically Tailored Inputs</span>
                  </div>

                  {/* ------------------------------------------------------------- */}
                  {/* CATEGORY SPECIFIC: CHROMEBOOK INPUT FIELDS                    */}
                  {/* ------------------------------------------------------------- */}
                  {formData.category === 'chromebooks' && (
                    <div className="space-y-3">
                      {/* Chromebook Highlight Specs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" /> Auto Update Expiration (AUE Date)
                          </label>
                          <input
                            type="text"
                            value={formData.specs.aueDate || ''}
                            onChange={(e) => handleSpecsChange('aueDate', e.target.value)}
                            placeholder="e.g. June 2032 (Guaranteed Google ChromeOS Updates)"
                            className="w-full bg-slate-900 border border-amber-500/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-semibold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                            <Key className="w-3.5 h-3.5 text-emerald-400" /> Google Admin & Zero-Touch
                          </label>
                          <input
                            type="text"
                            value={formData.specs.zeroTouchEnrollment || ''}
                            onChange={(e) => handleSpecsChange('zeroTouchEnrollment', e.target.value)}
                            placeholder="e.g. Google Zero-Touch Enrollment & K-12 Fleet Ready"
                            className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                          <Shield className="w-3.5 h-3.5 text-orange-400" /> Rugged / Drop & Military Standard
                        </label>
                        <input
                          type="text"
                          value={formData.specs.militaryStandard || ''}
                          onChange={(e) => handleSpecsChange('militaryStandard', e.target.value)}
                          placeholder="e.g. MIL-STD-810H Drop-Resistant, Spill-Proof Keyboard with Drain Channels"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      {/* Standard Hardware Specs for Chromebook */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="space-y-1">
                          <label className="text-[10px] font-medium text-slate-400">Processor (Cloud / CPU)</label>
                          <input
                            type="text"
                            value={formData.specs.cpu}
                            onChange={(e) => handleSpecsChange('cpu', e.target.value)}
                            placeholder="Intel Processor N200 / MediaTek Kompanio 520"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-medium text-slate-400">Flash Storage / eMMC</label>
                          <input
                            type="text"
                            value={formData.specs.storage}
                            onChange={(e) => handleSpecsChange('storage', e.target.value)}
                            placeholder="128GB UFS 2.2 / 64GB eMMC 5.1 Flash"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-medium text-slate-400">RAM Memory</label>
                          <input
                            type="text"
                            value={formData.specs.ram}
                            onChange={(e) => handleSpecsChange('ram', e.target.value)}
                            placeholder="8GB LPDDR5-4800MHz RAM"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-medium text-slate-400">Display & Touch Hinge</label>
                          <input
                            type="text"
                            value={formData.specs.display || ''}
                            onChange={(e) => handleSpecsChange('display', e.target.value)}
                            placeholder="14.0-inch FHD Touch IPS with 360° Hinge & USI Stylus"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-medium text-slate-400">Battery Run Time</label>
                          <input
                            type="text"
                            value={formData.specs.battery || ''}
                            onChange={(e) => handleSpecsChange('battery', e.target.value)}
                            placeholder="Up to 12.5 Hours Battery with 45W USB-C PD"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-medium text-slate-400">Operating System</label>
                          <input
                            type="text"
                            value={formData.specs.os}
                            onChange={(e) => handleSpecsChange('os', e.target.value)}
                            placeholder="ChromeOS with Google Play Store & Linux Support"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ------------------------------------------------------------- */}
                  {/* CATEGORY SPECIFIC: LAPTOP INPUT FIELDS                        */}
                  {/* ------------------------------------------------------------- */}
                  {formData.category === 'laptops' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-orange-400 flex items-center gap-1">
                            <Cpu className="w-3.5 h-3.5" /> High-Performance Processor (CPU)
                          </label>
                          <input
                            type="text"
                            value={formData.specs.cpu}
                            onChange={(e) => handleSpecsChange('cpu', e.target.value)}
                            placeholder="Intel Core i9-14900HX / AMD Ryzen 9 8945HS"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5" /> Dedicated Mobile GPU & TGP Power
                          </label>
                          <input
                            type="text"
                            value={formData.specs.gpu}
                            onChange={(e) => handleSpecsChange('gpu', e.target.value)}
                            placeholder="NVIDIA GeForce RTX 4070 8GB GDDR6 (140W Max TGP + MUX Switch)"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                            <HardDrive className="w-3.5 h-3.5" /> RAM Memory & Dual Channel Speed
                          </label>
                          <input
                            type="text"
                            value={formData.specs.ram}
                            onChange={(e) => handleSpecsChange('ram', e.target.value)}
                            placeholder="32GB DDR5-5600MHz Dual-Channel (Expandable to 64GB)"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                            <HardDrive className="w-3.5 h-3.5" /> NVMe PCIe Performance SSD
                          </label>
                          <input
                            type="text"
                            value={formData.specs.storage}
                            onChange={(e) => handleSpecsChange('storage', e.target.value)}
                            placeholder="1TB NVMe PCIe 4.0 M.2 High-Speed SSD"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[11px] font-bold text-purple-400 flex items-center gap-1">
                            <Tv className="w-3.5 h-3.5" /> Display Panel, Refresh Rate & Color Gamut
                          </label>
                          <input
                            type="text"
                            value={formData.specs.display || ''}
                            onChange={(e) => handleSpecsChange('display', e.target.value)}
                            placeholder="16.0-inch QHD+ (2560x1600) 240Hz 100% DCI-P3 500 nits IPS / OLED"
                            className="w-full bg-slate-900 border border-purple-500/30 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-400 font-semibold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                            <Battery className="w-3.5 h-3.5" /> Battery & GaN Power Adapter
                          </label>
                          <input
                            type="text"
                            value={formData.specs.battery || ''}
                            onChange={(e) => handleSpecsChange('battery', e.target.value)}
                            placeholder="90Wh 4-Cell Li-ion with 240W GaN Rapid Charger"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-medium text-slate-400">Ports & Connectivity</label>
                          <input
                            type="text"
                            value={formData.specs.ports || ''}
                            onChange={(e) => handleSpecsChange('ports', e.target.value)}
                            placeholder="Thunderbolt 4, USB-C 3.2 Gen2, HDMI 2.1, Wi-Fi 6E"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ------------------------------------------------------------- */}
                  {/* CATEGORY SPECIFIC: WORKSTATION INPUT FIELDS                   */}
                  {/* ------------------------------------------------------------- */}
                  {formData.category === 'workstations' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-purple-400 flex items-center gap-1">
                            <Server className="w-3.5 h-3.5" /> Enterprise Compute CPU
                          </label>
                          <input
                            type="text"
                            value={formData.specs.cpu}
                            onChange={(e) => handleSpecsChange('cpu', e.target.value)}
                            placeholder="AMD Threadripper PRO 7995WX (96 Cores) / Intel Xeon w9-3495X"
                            className="w-full bg-slate-900 border border-purple-500/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-400 font-semibold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5" /> Professional Multi-GPU / Quadro Array
                          </label>
                          <input
                            type="text"
                            value={formData.specs.gpu}
                            onChange={(e) => handleSpecsChange('gpu', e.target.value)}
                            placeholder="Dual NVIDIA RTX 6000 Ada 48GB GDDR6 ECC or Dual RTX 4090 24GB"
                            className="w-full bg-slate-900 border border-amber-500/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-semibold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                            <Shield className="w-3.5 h-3.5" /> Registered ECC Memory
                          </label>
                          <input
                            type="text"
                            value={formData.specs.ram}
                            onChange={(e) => handleSpecsChange('ram', e.target.value)}
                            placeholder="128GB (4x32GB) DDR5-4800MHz Registered ECC Quad-Channel (Up to 1TB)"
                            className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-semibold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                            <HardDrive className="w-3.5 h-3.5" /> Enterprise NVMe & RAID Storage
                          </label>
                          <input
                            type="text"
                            value={formData.specs.storage}
                            onChange={(e) => handleSpecsChange('storage', e.target.value)}
                            placeholder="4TB NVMe PCIe 5.0 SSD (12,400MB/s) + 16TB Enterprise 7200RPM SATA RAID"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-medium text-slate-400">Power Supply Unit (PSU)</label>
                          <input
                            type="text"
                            value={formData.specs.powerSupply || ''}
                            onChange={(e) => handleSpecsChange('powerSupply', e.target.value)}
                            placeholder="1600W 80-Plus Titanium Fully Modular Redundant PSU"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-medium text-slate-400">Liquid Cooling / Industrial Fans</label>
                          <input
                            type="text"
                            value={formData.specs.coolingType || ''}
                            onChange={(e) => handleSpecsChange('coolingType', e.target.value)}
                            placeholder="Custom 360mm High-Pressure Liquid Loop with Industrial Noctua Fans"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-medium text-slate-400">PCIe Gen5 Expansion Lanes</label>
                          <input
                            type="text"
                            value={formData.specs.expansionSlots || ''}
                            onChange={(e) => handleSpecsChange('expansionSlots', e.target.value)}
                            placeholder="7x PCIe 5.0 x16 Full-Length Expansion Slots for Multi-GPU"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-medium text-slate-400">Chassis & Rackmount Form Factor</label>
                          <input
                            type="text"
                            value={formData.specs.chassisFormFactor || ''}
                            onChange={(e) => handleSpecsChange('chassisFormFactor', e.target.value)}
                            placeholder="E-ATX Steel Workstation Chassis / 4U Rackmount Conversion Ready"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ------------------------------------------------------------- */}
                  {/* CATEGORY SPECIFIC: DESKTOP / OTHER INPUT FIELDS               */}
                  {/* ------------------------------------------------------------- */}
                  {formData.category === 'desktops' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-medium text-slate-400">Processor (CPU)</label>
                        <input
                          type="text"
                          value={formData.specs.cpu}
                          onChange={(e) => handleSpecsChange('cpu', e.target.value)}
                          placeholder="Intel Core i9-14900K 24-Core 6.0GHz"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-medium text-slate-400">Graphics Card (GPU)</label>
                        <input
                          type="text"
                          value={formData.specs.gpu}
                          onChange={(e) => handleSpecsChange('gpu', e.target.value)}
                          placeholder="NVIDIA GeForce RTX 4080 Super 16GB GDDR6X"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-medium text-slate-400">RAM Memory</label>
                        <input
                          type="text"
                          value={formData.specs.ram}
                          onChange={(e) => handleSpecsChange('ram', e.target.value)}
                          placeholder="64GB (2x32GB) DDR5-6000MHz RGB CL30"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-medium text-slate-400">Storage Capacity</label>
                        <input
                          type="text"
                          value={formData.specs.storage}
                          onChange={(e) => handleSpecsChange('storage', e.target.value)}
                          placeholder="2TB NVMe PCIe 4.0 Extreme M.2 SSD"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Common Warranty SLA */}
                  <div className="space-y-1 pt-1 border-t border-white/5">
                    <label className="text-[10px] font-medium text-slate-400">OEM Warranty SLA</label>
                    <input
                      type="text"
                      value={formData.specs.warranty}
                      onChange={(e) => handleSpecsChange('warranty', e.target.value)}
                      placeholder="2-Year War Depot OEM Comprehensive Warranty"
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* 3. PRICING & STOCK MATRICES                                               */}
                {/* ========================================================================= */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2 border-t border-white/5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">Retail MSRP (Rs.)</label>
                    <input
                      id="admin-input-retail-price"
                      type="number"
                      value={formData.retailPrice}
                      onChange={(e) => handleFieldChange('retailPrice', Number(e.target.value))}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-orange-500"
                      min={1000}
                      step={500}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-orange-400">Wholesale Rate (Rs.)</label>
                    <input
                      id="admin-input-wholesale-price"
                      type="number"
                      value={formData.wholesalePrice}
                      onChange={(e) => handleFieldChange('wholesalePrice', Number(e.target.value))}
                      className="w-full bg-slate-950/80 border border-orange-500/40 rounded-xl px-3 py-2 text-xs font-bold text-orange-400 focus:outline-none focus:border-orange-400"
                      min={1000}
                      step={500}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-amber-400">Wholesale MOQ</label>
                    <input
                      id="admin-input-moq"
                      type="number"
                      value={formData.wholesaleMOQ}
                      onChange={(e) => handleFieldChange('wholesaleMOQ', Number(e.target.value))}
                      className="w-full bg-slate-950/80 border border-amber-500/40 rounded-xl px-3 py-2 text-xs font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                      min={1}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-emerald-400">Depot Stock Units</label>
                    <input
                      id="admin-input-stock"
                      type="number"
                      value={formData.stockQuantity}
                      onChange={(e) => handleFieldChange('stockQuantity', Number(e.target.value))}
                      className="w-full bg-slate-950/80 border border-emerald-500/40 rounded-xl px-3 py-2 text-xs font-bold text-emerald-400 focus:outline-none focus:border-emerald-400"
                      min={0}
                      required
                    />
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* 4. IMAGE URL & CATEGORY PRESETS                                           */}
                {/* ========================================================================= */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <label className="text-[11px] font-bold text-slate-300">Product Card Image URL</label>
                  <input
                    id="admin-input-image-url"
                    type="url"
                    value={formData.images[0] || ''}
                    onChange={(e) => handleImageChange(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                    required
                  />

                  {/* Category-matched Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-400">Quick {formData.category} Presets:</span>
                    {activeImagePresets.map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => handleImageChange(preset.url)}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* 5. PRODUCT CARD BADGES                                                    */}
                {/* ========================================================================= */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured || false}
                      onChange={(e) => handleFieldChange('isFeatured', e.target.checked)}
                      className="rounded border-slate-700 text-orange-500 focus:ring-orange-500 bg-slate-950 cursor-pointer"
                    />
                    <span>Featured Badge</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller || false}
                      onChange={(e) => handleFieldChange('isBestSeller', e.target.checked)}
                      className="rounded border-slate-700 text-orange-500 focus:ring-orange-500 bg-slate-950 cursor-pointer"
                    />
                    <span>Best Seller</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={formData.isNewArrival || false}
                      onChange={(e) => handleFieldChange('isNewArrival', e.target.checked)}
                      className="rounded border-slate-700 text-orange-500 focus:ring-orange-500 bg-slate-950 cursor-pointer"
                    />
                    <span>New Arrival</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={formData.isBulkLot || false}
                      onChange={(e) => handleFieldChange('isBulkLot', e.target.checked)}
                      className="rounded border-slate-700 text-orange-500 focus:ring-orange-500 bg-slate-950 cursor-pointer"
                    />
                    <span>Bulk Lot Pack</span>
                  </label>
                </div>

                {/* ========================================================================= */}
                {/* 6. FORM ACTION BUTTONS                                                    */}
                {/* ========================================================================= */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <button
                      id="admin-save-product-btn"
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-600/30 flex items-center gap-2 transition-all cursor-pointer border border-white/10"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isEditingExisting ? 'Save Changes to Product' : `Save New ${formData.category} to Catalog`}</span>
                    </button>

                    {isEditingExisting && (
                      <button
                        type="button"
                        onClick={() => handleDuplicateProduct(formData)}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        title="Duplicate as new product"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Duplicate</span>
                      </button>
                    )}
                  </div>

                  {isEditingExisting ? (
                    <button
                      id="admin-delete-product-btn"
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${formData.name}"?`)) {
                          onDeleteProduct(formData.id);
                          handleCancelEdit();
                          triggerFeedback(`Deleted product "${formData.name}"`);
                        }
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-red-100 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Product</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => loadCategoryTemplate(selectedAddCategory)}
                      className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-medium border border-white/5 flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Fields</span>
                    </button>
                  )}
                </div>

              </div>
            </form>

            {/* Right 4 Columns: Live Product Card Synchronized Preview */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Live Product Card Preview
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Real-Time Sync</span>
              </div>

              {/* Rendered Live Card */}
              <div className="p-2 rounded-3xl bg-slate-950/60 border border-orange-500/30 shadow-2xl">
                <ProductCard
                  product={formData}
                  pricingMode={pricingMode}
                  onQuickView={() => onQuickView(formData)}
                  onAddToCart={() => triggerFeedback(`Preview: Added ${formData.name} to cart`)}
                  isCompared={false}
                  onToggleCompare={() => triggerFeedback(`Preview: Toggled comparison`)}
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 text-[11px] text-slate-400 space-y-1.5">
                <p className="text-slate-200 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Dynamic Catalog Synchronization
                </p>
                <p>
                  Any new product added or edited above instantly updates the customer-facing catalog grid, live search filter, AI recommendations, and checkout calculations.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: ALL PRODUCTS MANAGEMENT TABLE (Used for Editing & Inventory)   */}
        {/* ========================================================================= */}
        <div id="all-products-management-table" className="bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5">
          
          {/* Table Controls & Filters Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-orange-500" />
                <span>All Products Management Table ({tableFilteredProducts.length} Active Items)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Click <strong className="text-orange-400">"Edit in Form"</strong> on any row below to load that product into the editor above.
              </p>
            </div>

            {/* Search and Category Filter for Table */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search */}
              <div className="relative min-w-[190px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="Filter table rows..."
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Category Filter */}
              <select
                value={tableCategory}
                onChange={(e) => setTableCategory(e.target.value)}
                className="bg-slate-900/80 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="chromebooks">Chromebooks</option>
                <option value="laptops">Laptops</option>
                <option value="workstations">Workstations</option>
                <option value="desktops">Desktops</option>
                <option value="wholesale_lots">Wholesale Lots</option>
              </select>

              {/* Stock Filter */}
              <select
                value={tableStockFilter}
                onChange={(e) => setTableStockFilter(e.target.value as any)}
                className="bg-slate-900/80 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="all">All Stock Levels</option>
                <option value="inStock">In Stock (&gt;0)</option>
                <option value="lowStock">Low Stock (≤10)</option>
                <option value="outOfStock">Out of Stock (0)</option>
              </select>
            </div>
          </div>

          {/* Responsive Product Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-inner">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900/90 text-slate-400 font-semibold border-b border-white/10 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Product / Media</th>
                  <th className="py-3 px-3">Category & Brand</th>
                  <th className="py-3 px-3">Condition</th>
                  <th className="py-3 px-3">Retail Price</th>
                  <th className="py-3 px-3">Wholesale (MOQ)</th>
                  <th className="py-3 px-3">Depot Stock</th>
                  <th className="py-3 px-3">Specialized Specs</th>
                  <th className="py-3 px-3 text-right">Table Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-950/40">
                {tableFilteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      No products match your search or filter criteria.
                    </td>
                  </tr>
                ) : (
                  tableFilteredProducts.map((p) => {
                    const isCurrentlyEditing = isEditingExisting && p.id === editingProductId;
                    const savingsPercent = Math.round(((p.retailPrice - p.wholesalePrice) / p.retailPrice) * 100);

                    return (
                      <tr 
                        key={p.id}
                        className={`transition-colors hover:bg-slate-900/70 ${
                          isCurrentlyEditing ? 'bg-orange-500/15 border-l-4 border-l-orange-500' : ''
                        }`}
                      >
                        {/* 1. Image & Title */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-12 h-10 object-cover rounded-lg bg-slate-900 border border-white/10 flex-shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0 max-w-[200px]">
                              <p className="font-bold text-white truncate text-xs" title={p.name}>
                                {p.name}
                              </p>
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                                <span>{p.sku}</span>
                                {p.isFeatured && (
                                  <span className="text-orange-400 font-bold">★ Featured</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 2. Category & Brand */}
                        <td className="py-3 px-3">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-slate-200 block capitalize">
                              {p.category.replace('_', ' ')}
                            </span>
                            <span className="text-[10px] text-slate-400 px-1.5 py-0.2 rounded bg-slate-900 border border-white/5 inline-block">
                              {p.brand}
                            </span>
                          </div>
                        </td>

                        {/* 3. Condition */}
                        <td className="py-3 px-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                            p.condition === 'Brand New' 
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          }`}>
                            {p.condition}
                          </span>
                        </td>

                        {/* 4. Retail Price */}
                        <td className="py-3 px-3">
                          <span className="font-black text-white text-xs block">
                            {formatPrice(p.retailPrice)}
                          </span>
                          <span className="text-[10px] text-slate-500">MSRP Direct</span>
                        </td>

                        {/* 5. Wholesale Price & MOQ */}
                        <td className="py-3 px-3">
                          <span className="font-bold text-orange-400 text-xs block">
                            {formatPrice(p.wholesalePrice)}
                          </span>
                          <div className="flex items-center gap-1 text-[10px]">
                            <span className="text-slate-400">MOQ: {p.wholesaleMOQ}+</span>
                            <span className="text-emerald-400 font-bold">(-{savingsPercent}%)</span>
                          </div>
                        </td>

                        {/* 6. Stock Quantity */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleQuickStockAdjust(p, -1)}
                                className="w-5 h-5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs border border-white/10 cursor-pointer"
                                title="Decrease stock by 1"
                              >
                                -
                              </button>
                              <span className={`font-bold px-2 py-0.5 rounded text-[11px] min-w-[28px] text-center ${
                                p.stockQuantity > 20
                                  ? 'text-emerald-400 bg-emerald-500/10'
                                  : p.stockQuantity > 5
                                    ? 'text-amber-400 bg-amber-500/10'
                                    : 'text-red-400 bg-red-500/10'
                              }`}>
                                {p.stockQuantity}
                              </span>
                              <button
                                onClick={() => handleQuickStockAdjust(p, 1)}
                                className="w-5 h-5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs border border-white/10 cursor-pointer"
                                title="Increase stock by 1"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* 7. Specs */}
                        <td className="py-3 px-3">
                          <div className="text-[10px] text-slate-300 max-w-[190px] space-y-0.5">
                            <p className="truncate font-medium text-slate-200" title={p.specs.cpu}>{p.specs.cpu}</p>
                            {p.category === 'chromebooks' && p.specs.aueDate && (
                              <p className="truncate text-amber-400" title={p.specs.aueDate}>AUE: {p.specs.aueDate}</p>
                            )}
                            {p.category === 'workstations' && (
                              <p className="truncate text-purple-400" title={p.specs.gpu}>{p.specs.gpu}</p>
                            )}
                            {p.category === 'laptops' && (
                              <p className="truncate text-slate-400" title={p.specs.gpu}>{p.specs.gpu}</p>
                            )}
                          </div>
                        </td>

                        {/* 8. Actions */}
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              id={`admin-edit-row-${p.id}`}
                              onClick={() => handleEditFromTable(p)}
                              className="px-2.5 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500 text-orange-300 hover:text-white border border-orange-500/30 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                              title="Edit this product in form"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit in Form</span>
                            </button>

                            <button
                              onClick={() => onQuickView(p)}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
                              title="Full Specs Modal"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`Delete ${p.name}?`)) {
                                  onDeleteProduct(p.id);
                                  if (isEditingExisting && editingProductId === p.id) {
                                    handleCancelEdit();
                                  }
                                  triggerFeedback(`Deleted product ${p.name}`);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/60 text-red-400 hover:text-red-200 border border-red-500/20 transition-all cursor-pointer"
                              title="Delete Product"
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

          {/* Table Bottom Action Summary */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-xs text-slate-400">
            <div>
              Showing <span className="text-white font-bold">{tableFilteredProducts.length}</span> of{' '}
              <span className="text-white font-bold">{products.length}</span> active hardware products
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute("href", jsonStr);
                  downloadAnchor.setAttribute("download", `war_computers_catalog_${Date.now()}.json`);
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                  triggerFeedback('Catalog JSON exported successfully.');
                }}
                className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Export Catalog JSON
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Reset all catalog modifications to factory defaults?')) {
                    onResetToDefaults();
                    loadCategoryTemplate('chromebooks');
                  }
                }}
                className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Factory Defaults
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
