import React, { useState, useEffect } from 'react';
import { 
  PricingMode, 
  ProductCategory, 
  Product, 
  CartItem,
  OrderTrackingInfo
} from './types';
import { MOCK_PRODUCTS } from './data/products';
import { INITIAL_ORDERS } from './data/orders';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WholesaleB2BBanner } from './components/WholesaleB2BBanner';
import { ProductGrid } from './components/ProductGrid';
import { SocialMediaSection } from './components/SocialMediaSection';
import { FloatingActionBar } from './components/FloatingActionBar';
import { Footer } from './components/Footer';
import { BackgroundHardwareStream } from './components/BackgroundHardwareStream';
import { AdminPortalPage } from './components/AdminPortalPage';

import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { ComparisonModal } from './components/ComparisonModal';
import { AiSupportDrawer } from './components/AiSupportDrawer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WholesaleQuoteModal } from './components/WholesaleQuoteModal';
import { AnalyticsDashboardModal } from './components/AnalyticsDashboardModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';

export default function App() {
  // Navigation & Route state (Supports /admin.html, /admin, #/admin)
  const [currentRoute, setCurrentRoute] = useState<'store' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('admin') || hash.includes('admin')) {
        return 'admin';
      }
    }
    return 'store';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('admin') || hash.includes('admin')) {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('store');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: 'store' | 'admin') => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      if (route === 'admin') {
        window.location.hash = 'admin';
      } else {
        window.location.hash = '';
        if (window.location.pathname.endsWith('admin.html')) {
          window.history.pushState({}, '', window.location.pathname.replace('admin.html', ''));
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // App-level state
  const [pricingMode, setPricingMode] = useState<PricingMode>('retail');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamic Catalog State with LocalStorage Persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('war_computers_custom_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return MOCK_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('war_computers_custom_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Dynamic Orders & Dispatch State with LocalStorage Persistence
  const [orders, setOrders] = useState<OrderTrackingInfo[]>(() => {
    try {
      const saved = localStorage.getItem('war_computers_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('war_computers_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  const handleUpdateOrder = (updatedOrder: OrderTrackingInfo) => {
    setOrders(prev => {
      const idx = prev.findIndex(o => o.orderId === updatedOrder.orderId);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = updatedOrder;
        return copy;
      }
      return [updatedOrder, ...prev];
    });
    showToast(`Updated logistics tracking for Order #${updatedOrder.orderId}`);
  };

  const handleAddOrder = (newOrder: OrderTrackingInfo) => {
    setOrders(prev => [newOrder, ...prev]);
    showToast(`Added Order #${newOrder.orderId} to logistics desk.`);
  };

  // Product CRUD Handlers
  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    showToast(`Added "${newProd.name}" to catalog!`);
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
    showToast(`Updated "${updatedProd.name}"!`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setComparedProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product removed from catalog.');
  };

  const handleResetToDefaults = () => {
    setProducts(MOCK_PRODUCTS);
    try {
      localStorage.removeItem('war_computers_custom_products');
    } catch (e) {}
    showToast('Catalog restored to default factory products.');
  };

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('war_computers_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('war_computers_cart', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  // Product Comparison state (max 4)
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isAiSupportOpen, setIsAiSupportOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWholesaleQuoteOpen, setIsWholesaleQuoteOpen] = useState(false);
  const [initialQuoteProduct, setInitialQuoteProduct] = useState<Product | null>(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string>('WC-8942');

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add to Cart handler
  const handleAddToCart = (product: Product, quantity: number, isWholesale: boolean) => {
    const unitPrice = isWholesale ? product.wholesalePrice : product.retailPrice;
    
    setCart((prev) => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.isWholesaleOrder === isWholesale);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, {
          product,
          quantity,
          unitPrice,
          isWholesaleOrder: isWholesale
        }];
      }
    });

    showToast(`Added ${quantity}x ${product.name} to cart!`);
  };

  const handleUpdateCartQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Cart cleared.');
  };

  // Compare handlers
  const handleToggleCompare = (product: Product) => {
    setComparedProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from comparison.`);
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          showToast('You can compare up to 4 models simultaneously.');
          return prev;
        }
        showToast(`Added ${product.name} to comparison matrix.`);
        return [...prev, product];
      }
    });
  };

  const handleRemoveComparedProduct = (productId: string) => {
    setComparedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleClearAllCompared = () => {
    setComparedProducts([]);
  };

  // Quick action: Open RFQ with a specific product
  const handleOpenRFQWithProduct = (product: Product) => {
    setInitialQuoteProduct(product);
    setIsWholesaleQuoteOpen(true);
  };

  // Quick action: Scroll to catalog section
  const handleScrollToCatalog = () => {
    const el = document.getElementById('product-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle successful order from checkout
  const handleOrderCompleted = (orderId: string, details?: any) => {
    setCart([]);
    const newOrderRecord: OrderTrackingInfo = {
      orderId,
      customerName: details?.customer?.fullName || 'Verified Customer',
      orderDate: 'Today',
      orderType: 'retail',
      status: 'Processing',
      carrier: 'FedEx Express Worldwide',
      trackingNumber: `FDX-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      estimatedDelivery: '2-3 Business Days',
      totalAmount: details?.totalAmount || 1899.00,
      itemsCount: details?.itemsCount || 1,
      timeline: [
        { status: 'Order Authorized & Payment Confirmed', date: 'Just Now', description: 'Credit card payment confirmed via 256-bit gateway.', completed: true, current: true },
        { status: 'Hardware Staging & Benchmarks', date: 'Pending', description: 'Serial logging and quality assurance.', completed: false },
        { status: 'Dispatched via Express Carrier', date: 'Pending', description: 'FedEx tracking number assigned.', completed: false },
        { status: 'Delivered', date: 'Pending', description: 'Signature confirmation required.', completed: false }
      ]
    };
    setOrders(prev => [newOrderRecord, ...prev]);
    setActiveTrackingOrderId(orderId);
    setIsOrderTrackingOpen(true);
  };

  // ==========================================
  // VIEW 1: DEDICATED SEPARATE ADMIN PORTAL (/admin.html)
  // ==========================================
  if (currentRoute === 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white antialiased">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-orange-600/90 backdrop-blur-xl text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-2xl shadow-orange-500/30 border border-orange-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}

        <AdminPortalPage
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetToDefaults={handleResetToDefaults}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          orders={orders}
          onUpdateOrder={handleUpdateOrder}
          onAddOrder={handleAddOrder}
          pricingMode={pricingMode}
          onTogglePricingMode={setPricingMode}
          onNavigateToStore={() => navigateTo('store')}
        />

        {/* Product Quick View Modal */}
        <ProductQuickViewModal
          product={quickViewProduct}
          pricingMode={pricingMode}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onOpenRFQWithProduct={handleOpenRFQWithProduct}
          onToggleCompare={handleToggleCompare}
          isCompared={quickViewProduct ? comparedProducts.some(p => p.id === quickViewProduct.id) : false}
        />
      </div>
    );
  }

  // ==========================================
  // VIEW 2: MAIN CUSTOMER STOREFRONT (/)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white antialiased relative overflow-x-hidden">
      
      {/* Dynamic Ambient Background with Multi-Layered Frosted Glass & Scrolling Hardware Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Continuous Scrolling Hardware Backdrop (Hero-Scale Laptops, Chromebooks, Desktops, Workstations) */}
        <BackgroundHardwareStream />

        {/* Ambient Glowing Blobs with dynamic blur */}
        <div className="absolute -top-32 -right-32 w-[650px] h-[650px] bg-orange-600/15 rounded-full blur-[160px] animate-pulse-glow" />
        <div className="absolute top-[35%] -left-48 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[170px]" />
        <div className="absolute top-[65%] right-[10%] w-[700px] h-[700px] bg-orange-500/12 rounded-full blur-[160px] animate-pulse-glow" />
        <div className="absolute -bottom-40 left-1/3 w-[750px] h-[750px] bg-orange-600/12 rounded-full blur-[190px]" />

        {/* Subtle Tech Grid & Dots Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25" />
        <div className="absolute inset-0 bg-dots-pattern opacity-15" />

        {/* Frosted Glass Atmospheric Vignette Layer */}
        <div className="absolute inset-0 backdrop-blur-[6px] bg-slate-950/45" />
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-orange-600/90 backdrop-blur-xl text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-2xl shadow-orange-500/30 border border-orange-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        pricingMode={pricingMode}
        onTogglePricingMode={setPricingMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        comparisonCount={comparedProducts.length}
        onOpenComparison={() => setIsCompareModalOpen(true)}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAiAdvisor={() => setIsAiSupportOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenAdmin={() => navigateTo('admin')}
        onOpenRFQ={() => {
          setInitialQuoteProduct(null);
          setIsWholesaleQuoteOpen(true);
        }}
        onOpenTracking={() => setIsOrderTrackingOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToCatalog();
        }}
        selectedCategory={selectedCategory}
        allProducts={products}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
      />

      {/* Hero Section with HD Continuous Scrolling Stream & CTAs */}
      <HeroSection
        pricingMode={pricingMode}
        onExploreCollections={handleScrollToCatalog}
        onOpenRFQ={() => {
          setInitialQuoteProduct(null);
          setIsWholesaleQuoteOpen(true);
        }}
        onOpenAiAdvisor={() => setIsAiSupportOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* Wholesale & Fleet Volume Discounts Banner */}
      <WholesaleB2BBanner
        pricingMode={pricingMode}
        onTogglePricingMode={setPricingMode}
        onOpenRFQ={() => {
          setInitialQuoteProduct(null);
          setIsWholesaleQuoteOpen(true);
        }}
      />

      {/* Floating Comparison Bar Trigger if items are selected */}
      {comparedProducts.length > 0 && (
        <div className="sticky top-28 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-4 pt-2">
          <div className="bg-slate-900/95 border border-orange-500/50 backdrop-blur-md rounded-2xl p-3 shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-orange-400">Comparing {comparedProducts.length} Systems:</span>
              <div className="hidden sm:flex items-center gap-2">
                {comparedProducts.map(p => (
                  <span key={p.id} className="text-xs text-white bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 truncate max-w-[150px]">
                    {p.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                View Side-by-Side Matrix
              </button>
              <button
                onClick={handleClearAllCompared}
                className="text-xs text-slate-400 hover:text-red-400 px-2 cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Product Catalog Grid with Advanced Filters and Search */}
      <ProductGrid
        products={products}
        pricingMode={pricingMode}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onQuickView={(prod) => setQuickViewProduct(prod)}
        onAddToCart={handleAddToCart}
        comparedProducts={comparedProducts}
        onToggleCompare={handleToggleCompare}
        onOpenRFQ={() => {
          setInitialQuoteProduct(null);
          setIsWholesaleQuoteOpen(true);
        }}
      />

      {/* Social Media & Tech Community Ecosystem */}
      <SocialMediaSection />

      {/* Footer with Directory & Trust Assurances */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToCatalog();
        }}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenAdmin={() => navigateTo('admin')}
        onOpenRFQ={() => {
          setInitialQuoteProduct(null);
          setIsWholesaleQuoteOpen(true);
        }}
        onOpenTracking={() => setIsOrderTrackingOpen(true)}
        onOpenAiAdvisor={() => setIsAiSupportOpen(true)}
        pricingMode={pricingMode}
        onTogglePricingMode={setPricingMode}
      />

      {/* Floating Action Bar (WhatsApp, AI Support, Admin Desk, Go to Top) */}
      <FloatingActionBar
        onOpenAiSupport={() => setIsAiSupportOpen(true)}
        onOpenAdmin={() => navigateTo('admin')}
      />

      {/* Modals and Drawers */}

      {/* 1. Product Quick View & Deep Spec Sheet */}
      <ProductQuickViewModal
        product={quickViewProduct}
        pricingMode={pricingMode}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenRFQWithProduct={handleOpenRFQWithProduct}
        onToggleCompare={handleToggleCompare}
        isCompared={quickViewProduct ? comparedProducts.some(p => p.id === quickViewProduct.id) : false}
      />

      {/* 2. Side-by-Side Model Comparison Matrix */}
      {isCompareModalOpen && (
        <ComparisonModal
          products={comparedProducts}
          pricingMode={pricingMode}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveProduct={handleRemoveComparedProduct}
          onClearAll={handleClearAllCompared}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 3. Real-Time Gemini AI Customer Support & Recommendations Drawer */}
      <AiSupportDrawer
        isOpen={isAiSupportOpen}
        onClose={() => setIsAiSupportOpen(false)}
        allProducts={products}
        pricingMode={pricingMode}
        onQuickViewProduct={(prod) => setQuickViewProduct(prod)}
        onAddToCart={handleAddToCart}
      />

      {/* 4. Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        pricingMode={pricingMode}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenRFQ={() => {
          setInitialQuoteProduct(null);
          setIsWholesaleQuoteOpen(true);
        }}
      />

      {/* 5. Secure Checkout Modal with Live Payment Simulation */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        pricingMode={pricingMode}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* 6. B2B Wholesale Request for Quote (RFQ) Modal */}
      <WholesaleQuoteModal
        isOpen={isWholesaleQuoteOpen}
        onClose={() => setIsWholesaleQuoteOpen(false)}
        allProducts={products}
        initialProduct={initialQuoteProduct}
      />

      {/* 7. Comprehensive Sales & Inventory Analytics Dashboard */}
      <AnalyticsDashboardModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      {/* 8. Logistics & Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        initialOrderId={activeTrackingOrderId}
        orders={orders}
      />

    </div>
  );
}

