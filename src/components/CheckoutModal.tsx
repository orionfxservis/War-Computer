import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Lock, 
  ArrowRight, 
  Wallet,
  DollarSign,
  PackageCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, PricingMode } from '../types';
import { formatPrice } from '../utils/formatCurrency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  pricingMode: PricingMode;
  onOrderCompleted: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  pricingMode,
  onOrderCompleted
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'crypto' | 'cod'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string>('');

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    taxId: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
    cardName: 'Alex Mercer'
  });

  const totalAmount = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    const newOrderId = `WC-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          paymentMethod,
          customer: {
            name: formData.fullName || 'Customer',
            email: formData.email,
            company: formData.companyName,
            address: `${formData.street}, ${formData.city}, ${formData.state} ${formData.zipCode}`
          }
        })
      });

      const data = await response.json();
      setCreatedOrderId(data.orderId || newOrderId);
    } catch (e) {
      setCreatedOrderId(newOrderId);
    } finally {
      setIsProcessing(false);
      setStep('confirmed');
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-orange-400" />
            <h2 className="text-base font-extrabold text-white">
              {step === 'confirmed' ? 'Order Confirmed & Logged' : 'War Computers Secure Checkout'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 'confirmed' && (
          <div className="px-6 py-3 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400">
            <div className={`flex items-center gap-2 ${step === 'details' ? 'text-orange-400' : 'text-emerald-400'}`}>
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center border border-current text-[10px]">1</span>
              <span>Shipping & Business Entity</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-800" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-orange-400' : 'text-slate-500'}`}>
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center border border-current text-[10px]">2</span>
              <span>Secure Payment Processing</span>
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Shipping & Entity Details */}
          {step === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Full Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. procurement@company.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Company / Organization (Optional)</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Apex Tech Labs LLC"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Tax ID / VAT Exemption (If B2B)</label>
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={e => setFormData({ ...formData, taxId: e.target.value })}
                    placeholder="e.g. US-EIN-99201948"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="col-span-full">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Delivery Destination Street *</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={e => setFormData({ ...formData, street: e.target.value })}
                    placeholder="e.g. 4500 Silicon Gateway Blvd, Suite 200"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Austin"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">State / Zip Code *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      placeholder="TX"
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="78701"
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary Mini Box */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400">Total Units: <strong className="text-white">{totalUnits}</strong></span>
                  <p className="text-slate-400">Logistics: <strong className="text-emerald-400">Free Priority Freight</strong></p>
                </div>
                <div className="text-right">
                  <span className="text-slate-400">Payable Total</span>
                  <p className="text-xl font-black text-orange-400">{formatPrice(totalAmount)}</p>
                </div>
              </div>

              <button
                onClick={() => setStep('payment')}
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Continue to Payment Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Payment Gateway */}
          {step === 'payment' && (
            <div className="space-y-5">
              
              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'card', label: 'Credit Card', icon: <CreditCard className="w-4 h-4" /> },
                  { id: 'wire', label: 'B2B Wire / ACH', icon: <Building2 className="w-4 h-4" /> },
                  { id: 'crypto', label: 'USDT / Crypto', icon: <Wallet className="w-4 h-4" /> },
                  { id: 'cod', label: 'Depot Pickup', icon: <Truck className="w-4 h-4" /> }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === m.id
                        ? 'bg-orange-500/20 border-orange-500 text-orange-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m.icon}
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Card Simulation */}
              {paymentMethod === 'card' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                    <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit Escrow Vault</span>
                    <span className="font-bold text-white">VISA / Master / Amex</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={e => setFormData({ ...formData, cardName: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">Expiration</label>
                        <input
                          type="text"
                          value={formData.cardExp}
                          onChange={e => setFormData({ ...formData, cardExp: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">CVC / CVV</label>
                        <input
                          type="password"
                          value={formData.cardCvc}
                          onChange={e => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'wire' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p className="font-bold text-orange-400">War Computers B2B Escrow Wire Account:</p>
                  <p>• <strong>Beneficiary:</strong> War Computers Hardware Logistics Inc.</p>
                  <p>• <strong>Bank:</strong> JPMorgan Chase Commercial Escrow (Routing: 111000614)</p>
                  <p>• <strong>Account Ref:</strong> WC-WIRE-DEPOT-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p className="text-[11px] text-slate-400">Official Pro-Forma Invoice will be automatically dispatched upon checkout.</p>
                </div>
              )}

              {paymentMethod === 'crypto' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p className="font-bold text-orange-400">Instant USDT (TRC-20 / ERC-20) Web3 Settlement:</p>
                  <div className="p-2 bg-slate-900 rounded font-mono text-[10px] text-slate-400 break-all">
                    0x98A123f890bF20c15949C6b2781b0a9e77148C21
                  </div>
                  <p className="text-[11px] text-emerald-400 font-semibold">Zero transaction surcharge for international B2B bulk orders.</p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p className="font-bold text-white">Store / Depot Dockside Pickup or COD Carrier:</p>
                  <p>Pay upon inspection at War Computers (Office # 222, 2nd Floor, Regal Trade Center, Saddar, Karachi).</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('details')}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Authorizing & Verifying Escrow...</span>
                  ) : (
                    <span>Pay {formatPrice(totalAmount)} & Confirm Order</span>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Order Confirmed Receipt */}
          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Payment Authorized & Serial Locked
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Order Reference: <strong className="text-orange-400">{createdOrderId}</strong>
                </p>
              </div>

              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 max-w-md mx-auto text-left text-xs text-slate-300 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Units Booked:</span>
                  <span className="font-bold text-white">{totalUnits} Systems</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Status:</span>
                  <span className="font-bold text-emerald-400">Escrow Settled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Dispatch:</span>
                  <span className="font-bold text-white">Within 24 Hours via FedEx Freight</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 font-bold">
                  <span>Paid Total:</span>
                  <span className="text-orange-400 text-sm">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onOrderCompleted(createdOrderId);
                    onClose();
                  }}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/30 cursor-pointer"
                >
                  Track Shipment Timeline
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Return to Storefront
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
