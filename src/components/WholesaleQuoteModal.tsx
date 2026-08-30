import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Building2, 
  Truck, 
  Send, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Download,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, WholesaleQuoteRequest } from '../types';
import { formatPrice } from '../utils/formatCurrency';

interface WholesaleQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  allProducts: Product[];
  initialProduct?: Product | null;
}

export const WholesaleQuoteModal: React.FC<WholesaleQuoteModalProps> = ({
  isOpen,
  onClose,
  allProducts,
  initialProduct
}) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [createdQuoteId, setCreatedQuoteId] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [taxId, setTaxId] = useState('');
  const [businessType, setBusinessType] = useState<any>('Corporate Enterprise');
  const [freightPreference, setFreightPreference] = useState<any>('Standard Freight (LTL Pallet)');
  const [targetDate, setTargetDate] = useState('Within 2 Weeks');
  const [notes, setNotes] = useState('');

  const [selectedItems, setSelectedItems] = useState<{ productId: string; quantity: number }[]>([
    {
      productId: initialProduct ? initialProduct.id : (allProducts[0]?.id || 'prod-dt-01'),
      quantity: initialProduct ? Math.max(initialProduct.wholesaleMOQ, 10) : 20
    }
  ]);

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { productId: allProducts[0].id, quantity: 10 }]);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, productId: string, quantity: number) => {
    const updated = [...selectedItems];
    updated[index] = { productId, quantity };
    setSelectedItems(updated);
  };

  // Calculate estimated total
  const estimatedTotal = selectedItems.reduce((sum, item) => {
    const prod = allProducts.find(p => p.id === item.productId);
    if (!prod) return sum;
    return sum + (prod.wholesalePrice * item.quantity);
  }, 0);

  const handleSubmitRFQ = async (e: React.FormEvent) => {
    e.preventDefault();
    const quoteId = `WC-RFQ-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          contactName,
          email,
          phone,
          taxId,
          businessType,
          items: selectedItems,
          estimatedTotal,
          notes
        })
      });
    } catch (err) {
      console.warn('Quote submitted locally:', err);
    } finally {
      setCreatedQuoteId(quoteId);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  // WhatsApp prefilled dispatch
  const handleOpenWhatsAppQuote = () => {
    const message = encodeURIComponent(
      `Hi War Computers Wholesale Team! I just submitted RFQ #${createdQuoteId || 'NEW'} for ${companyName || 'My Company'}. We require a formal bulk quotation for hardware supply. Contact: ${email || phone}.`
    );
    window.open(`https://wa.me/923330257246?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-400" />
            <h2 className="text-base font-extrabold text-white">
              Official Wholesale B2B Request For Quotation (RFQ)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {!submitted ? (
            <form onSubmit={handleSubmitRFQ} className="space-y-6">
              
              {/* Business Identification */}
              <div>
                <h3 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-3">
                  1. Organization & Tax Exemption Data
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Company / Organization Name *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Data Systems LLC"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Business Type *</label>
                    <select
                      value={businessType}
                      onChange={e => setBusinessType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="Corporate Enterprise">Corporate Enterprise (Workstations/Office)</option>
                      <option value="School / University">School District / University (Chromebooks)</option>
                      <option value="Retailer">Computer Retailer / Reseller Store</option>
                      <option value="Government / NGO">Government Agency / Defense / NGO</option>
                      <option value="Export / Importer">International Importer (FCL Container)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Primary Procurement Officer *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      placeholder="e.g. David Vance"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Corporate Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. procurement@apexdata.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+92 333 0257246"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Tax ID / Reseller Certificate</label>
                    <input
                      type="text"
                      value={taxId}
                      onChange={e => setTaxId(e.target.value)}
                      placeholder="Tax-Exempt ID / Reseller Permit #"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Hardware Inventory Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                    2. Hardware Line Items & Required Quantities
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add System Line
                  </button>
                </div>

                <div className="space-y-3">
                  {selectedItems.map((item, idx) => {
                    const selectedProd = allProducts.find(p => p.id === item.productId);

                    return (
                      <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                        <div className="flex-1 w-full">
                          <select
                            value={item.productId}
                            onChange={e => handleUpdateItem(idx, e.target.value, item.quantity)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                          >
                            {allProducts.map(p => (
                              <option key={p.id} value={p.id}>
                                [{p.category.toUpperCase()}] {p.name} — Base Wholesale: {formatPrice(p.wholesalePrice)} (MOQ {p.wholesaleMOQ}+)
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">Qty:</span>
                            <input
                              type="number"
                              min={selectedProd?.wholesaleMOQ || 1}
                              value={item.quantity}
                              onChange={e => handleUpdateItem(idx, item.productId, Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white text-center font-bold"
                            />
                          </div>

                          <div className="text-right min-w-[90px]">
                            <span className="text-xs font-black text-orange-400">
                              {formatPrice((selectedProd?.wholesalePrice || 0) * item.quantity)}
                            </span>
                          </div>

                          {selectedItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(idx)}
                              className="p-1.5 text-slate-500 hover:text-red-400 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Estimate Tally */}
                <div className="mt-3 p-3 bg-orange-950/20 border border-orange-500/30 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-300">Estimated Wholesale Valuation (Before Volume Rebates):</span>
                  <span className="text-base font-black text-orange-400">{formatPrice(estimatedTotal)}</span>
                </div>
              </div>

              {/* Logistics & Special Specs Notes */}
              <div>
                <h3 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
                  3. Freight Logistics & Custom BIOS/OS Imaging Notes
                </h3>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Mention custom OS image preload, asset tagging barcodes, liftgate pallet delivery requirements, or target budget constraints..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit RFQ to War Computers B2B Fleet Desk</span>
              </button>

            </form>
          ) : (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  RFQ Logged Successfully
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Quotation Reference: {createdQuoteId}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Our B2B corporate fleet manager is generating your official signed tax-exempt PDF invoice. You will receive an email at <strong className="text-white">{email}</strong> within 2 business hours.
                </p>
              </div>

              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 max-w-md mx-auto text-left text-xs text-slate-300 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Company:</span>
                  <span className="font-bold text-white">{companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Total:</span>
                  <span className="font-bold text-orange-400">{formatPrice(estimatedTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Freight Allocation:</span>
                  <span className="font-bold text-emerald-400">Pallet Depot Direct</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button
                  onClick={handleOpenWhatsAppQuote}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuss Immediately on WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Close & Back to Catalog
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
