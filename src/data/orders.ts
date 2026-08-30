import { OrderTrackingInfo } from '../types';

export const INITIAL_ORDERS: OrderTrackingInfo[] = [
  {
    orderId: 'WC-8942',
    customerName: 'Apex Creative Studio Ltd (Marcus Vance)',
    orderDate: 'Aug 28, 2026',
    orderType: 'wholesale',
    status: 'Shipped',
    carrier: 'DHL Global Freight Priority',
    trackingNumber: 'DHL-EXP-88937402-US',
    estimatedDelivery: 'Aug 30, 2026 by 3:00 PM',
    totalAmount: 18990.00,
    itemsCount: 6,
    timeline: [
      { status: 'Order Placed & Payment Verified', date: 'Aug 28, 09:15 AM', description: 'Wholesale bank wire confirmed. B2B invoice #INV-9923 generated.', completed: true },
      { status: 'Hardware Stress-Testing & QA Passed', date: 'Aug 28, 02:30 PM', description: 'MemTest86, 3DMark 24h burn-in, and component serial tagging passed 100%.', completed: true },
      { status: 'Passed Quality Control & Pallet Sealed', date: 'Aug 29, 08:45 AM', description: 'Shrink-wrapped, corner protected, tamper-evident security seal applied.', completed: true },
      { status: 'Dispatched via Carrier Express', date: 'Aug 29, 11:20 AM', description: 'Departed War Computers Central Depot Hub (Dock 4B). En route to regional distribution center.', completed: true, current: true },
      { status: 'Out for Liftgate Delivery', date: 'Aug 30, Est. 10:00 AM', description: 'Scheduled for local commercial liftgate courier delivery.', completed: false },
      { status: 'Delivered & Signed', date: 'Aug 30, Est. 03:00 PM', description: 'Proof of delivery signature required upon arrival.', completed: false }
    ]
  },
  {
    orderId: 'WC-8910',
    customerName: 'Dr. Evelyn Martinez (Quantum Bio Labs)',
    orderDate: 'Aug 27, 2026',
    orderType: 'retail',
    status: 'Delivered',
    carrier: 'FedEx Express Next Day',
    trackingNumber: 'FDX-9930412891',
    estimatedDelivery: 'Aug 28, 2026',
    totalAmount: 3499.00,
    itemsCount: 1,
    timeline: [
      { status: 'Order Placed', date: 'Aug 27, 10:00 AM', description: 'Card payment authenticated via 3D Secure.', completed: true },
      { status: 'Custom Built & Benchmarked', date: 'Aug 27, 01:00 PM', description: 'Thermal profiles calibrated and Windows 11 Pro configured.', completed: true },
      { status: 'Dispatched via FedEx', date: 'Aug 27, 04:30 PM', description: 'FedEx Express air tracking active.', completed: true },
      { status: 'Delivered & Signed', date: 'Aug 28, 11:42 AM', description: 'Delivered directly to recipient with signature confirmation (Dr. E. Martinez).', completed: true, current: true }
    ]
  },
  {
    orderId: 'WC-8720',
    customerName: 'Metro STEM Academy District (Fleet Deployment)',
    orderDate: 'Aug 29, 2026',
    orderType: 'wholesale',
    status: 'Assembled & Tested',
    carrier: 'FedEx Freight Direct Liftgate',
    trackingNumber: 'FXF-7738291048',
    estimatedDelivery: 'Sep 02, 2026',
    totalAmount: 16800.00,
    itemsCount: 40,
    timeline: [
      { status: 'Purchase Order #PO-9821 Authorized', date: 'Aug 29, 08:30 AM', description: 'School District credit approved. Zero-Touch Google Admin serials batch-allocated.', completed: true },
      { status: '40x Chromebooks QA & Screen Diagnostic Passed', date: 'Aug 29, 03:15 PM', description: 'Battery health verified 100%, MIL-STD drop bumpers inspection complete.', completed: true, current: true },
      { status: 'Pallet Packaging & Banding', date: 'Pending', description: 'Heavy-duty wooden skid banding & shock indicators attached.', completed: false },
      { status: 'Freight Dispatch', date: 'Pending', description: 'Carrier pickup scheduled for Aug 30 morning.', completed: false },
      { status: 'School Receiving Dock Delivery', date: 'Estimated Sep 02', description: 'Scheduled delivery to Main Receiving Warehouse Dock 2.', completed: false }
    ]
  },
  {
    orderId: 'WC-8655',
    customerName: 'Sovereign AI Research Group',
    orderDate: 'Aug 30, 2026',
    orderType: 'wholesale',
    status: 'Processing',
    carrier: 'UPS Supply Chain Freight',
    trackingNumber: 'UPS-FREIGHT-4401829',
    estimatedDelivery: 'Sep 03, 2026',
    totalAmount: 24500.00,
    itemsCount: 3,
    timeline: [
      { status: 'Order Submitted & Payment Processing', date: 'Aug 30, 06:10 AM', description: 'Wire verification in progress for 3x Threadripper AI Workstations.', completed: true, current: true },
      { status: 'Component Allocation & Liquid Loop Assembly', date: 'Pending', description: 'Dual RTX 4090 installation & ECC DDR5 memory validation.', completed: false },
      { status: 'Thermal Stress & CUDA Benchmarks', date: 'Pending', description: '48-hour PyTorch deep learning stability burn-in.', completed: false },
      { status: 'Secure Foam Crated Transport', date: 'Pending', description: 'Heavy-gauge wooden flight case crating.', completed: false }
    ]
  }
];
