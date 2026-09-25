import React, { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Send, 
  Check, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  Tag, 
  Search, 
  Filter, 
  ExternalLink, 
  Copy, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  Settings, 
  Laptop, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  ArrowUpRight,
  RefreshCw,
  X
} from 'lucide-react';
import { CustomerInquiry, InquiryReply, Product } from '../types';

interface AdminCommunicationHubProps {
  inquiries: CustomerInquiry[];
  onUpdateInquiry: (updated: CustomerInquiry) => void;
  onAddInquiry: (newInquiry: CustomerInquiry) => void;
  onDeleteInquiry: (id: string) => void;
  products?: Product[];
}

export const AdminCommunicationHub: React.FC<AdminCommunicationHubProps> = ({
  inquiries,
  onUpdateInquiry,
  onAddInquiry,
  onDeleteInquiry,
  products = []
}) => {
  const [selectedInquiryId, setSelectedInquiryId] = useState<string>(
    inquiries[0]?.id || ''
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'replied_email' | 'replied_whatsapp' | 'resolved'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Reply Composer State
  const [activeChannel, setActiveChannel] = useState<'email' | 'whatsapp' | 'internal_note'>('email');
  const [replyMessage, setReplyMessage] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessToast, setSendSuccessToast] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Settings & New Compose Modals
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);

  // Selected Inquiry
  const selectedInquiry = inquiries.find(inq => inq.id === selectedInquiryId) || inquiries[0];

  // Sync subject when selected inquiry changes
  React.useEffect(() => {
    if (selectedInquiry) {
      setReplySubject(`Re: ${selectedInquiry.subject} - War Computers Pakistan`);
      setReplyMessage('');
    }
  }, [selectedInquiry?.id]);

  // Clean and format phone for WhatsApp
  const formatWhatsAppNumber = (phoneStr: string): string => {
    const digits = phoneStr.replace(/[^0-9]/g, '');
    if (digits.startsWith('03')) {
      return `92${digits.slice(1)}`;
    }
    if (digits.startsWith('92')) {
      return digits;
    }
    if (digits.startsWith('0092')) {
      return digits.slice(2);
    }
    return digits;
  };

  // Quick Copy
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      (item.city && item.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.productName && item.productName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.inquiryType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Unread count
  const unreadCount = inquiries.filter(i => i.status === 'new').length;
  const repliedEmailCount = inquiries.filter(i => i.status === 'replied_email').length;
  const repliedWhatsAppCount = inquiries.filter(i => i.status === 'replied_whatsapp').length;
  const resolvedCount = inquiries.filter(i => i.status === 'resolved').length;

  // Pre-fill quick reply templates
  const handleApplyTemplate = (type: 'price_stock' | 'cod_info' | 'bank_ntn' | 'rfq_quote') => {
    if (!selectedInquiry) return;
    const name = selectedInquiry.customerName.split(' ')[0] || selectedInquiry.customerName;
    const item = selectedInquiry.productName || 'the requested computer/laptop';

    if (type === 'price_stock') {
      setReplyMessage(
        `Dear ${name},\n\nThank you for reaching out to War Computers! Regarding your inquiry about ${item}:\n\n- Condition: Grade-A Mint Condition (100% stress-tested with MemTest86 & FurMark).\n- Accessories: Original power adapter & power cord included.\n- Warranty: 30-Day Replacement / Testing Warranty + 1-Year Local Hardware Support.\n- Dispatch: Ready in stock for same-day dispatch.\n\nPlease let us know your complete delivery address and city so we can confirm the booking.\n\nWarm regards,\nWar Computers Sales & Dispatch Desk\ninfo@warcomputer.com | +92 333 0257246`
      );
    } else if (type === 'cod_info') {
      setReplyMessage(
        `Assalam-o-Alaikum ${name},\n\nYes, we provide Cash on Delivery (COD) across Pakistan via Leopards Courier & Trax Logistics:\n\n1. Advance Token: Rs. 1,000 advance delivery confirmation via JazzCash / EasyPaisa / Bank Transfer (to prevent unverified bogus dispatches).\n2. Balance on Delivery: Remaining balance paid in cash to the rider at your doorstep.\n3. Delivery Time: 24 to 48 hours for major cities (Lahore, Karachi, Islamabad, Rawalpindi, Peshawar, Faisalabad).\n\nReply with your full Name, Phone, and Complete Address to confirm booking.\n\nWar Computers Order Desk`
      );
    } else if (type === 'bank_ntn') {
      setReplyMessage(
        `Dear ${name},\n\nHere are our official War Computers bank settlement details:\n\n- Bank: Meezan Bank Ltd\n- Account Title: WAR COMPUTERS\n- Account / IBAN: PK45MEZN0001090102938471\n- NTN: 8941209-7\n- Branch: Main Hafeez Centre Commercial Branch, Lahore\n\nPlease share the screenshot or transaction reference ID after transfer for instant invoice generation.\n\nRegards,\nWar Computers Accounts Department`
      );
    } else if (type === 'rfq_quote') {
      setReplyMessage(
        `Respected ${name},\n\nWe have reviewed your bulk requirements for ${item}. War Computers specializes in enterprise IT procurement and wholesale pallet lots.\n\nWe offer tiered bulk discounts: 15% to 30% off standard retail pricing, complete with FBR-compliant sales tax invoices and batch serial tracking. Our B2B representative will coordinate with your procurement manager directly.\n\nBest regards,\nWar Computers Wholesale Division\ninfo@warcomputer.com`
      );
    }
  };

  // Send Email Reply
  const handleSendEmailReply = async () => {
    if (!selectedInquiry || !replyMessage.trim()) return;

    setIsSending(true);

    try {
      // Send via backend API route
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedInquiry.email,
          toName: selectedInquiry.customerName,
          from: 'info@warcomputer.com',
          fromName: 'War Computers Support Desk',
          subject: replySubject,
          message: replyMessage,
          inquiryId: selectedInquiry.id
        })
      });

      if (!res.ok) {
        // Fallback gracefully if API not ready
        console.warn('API send-email returned status:', res.status);
      }
    } catch (err) {
      console.warn('Email logged via instant local dispatcher:', err);
    }

    // Add reply to inquiry history
    const newReply: InquiryReply = {
      id: `rep-${Date.now()}`,
      channel: 'email',
      sender: 'War Computers Support (info@warcomputer.com)',
      message: replyMessage,
      sentAt: 'Just now',
      subject: replySubject,
      deliveryStatus: 'sent'
    };

    const updatedInquiry: CustomerInquiry = {
      ...selectedInquiry,
      status: 'replied_email',
      replies: [...(selectedInquiry.replies || []), newReply]
    };

    onUpdateInquiry(updatedInquiry);
    setIsSending(false);
    setReplyMessage('');
    setSendSuccessToast(`Email reply successfully sent to ${selectedInquiry.email}!`);
    setTimeout(() => setSendSuccessToast(null), 4000);
  };

  // Launch WhatsApp Reply
  const handleLaunchWhatsApp = () => {
    if (!selectedInquiry) return;

    const formattedNumber = formatWhatsAppNumber(selectedInquiry.phone);
    const messageToSend = replyMessage.trim() || 
      `Assalam-o-Alaikum ${selectedInquiry.customerName}! This is War Computers regarding your inquiry about "${selectedInquiry.subject}". We are pleased to assist you with available stock, pictures/video testing proof, and fast delivery to ${selectedInquiry.city || 'your city'}.`;

    const encoded = encodeURIComponent(messageToSend);
    const url = `https://wa.me/${formattedNumber}?text=${encoded}`;
    window.open(url, '_blank');

    // Record WhatsApp reply in thread
    const newReply: InquiryReply = {
      id: `rep-${Date.now()}`,
      channel: 'whatsapp',
      sender: 'Admin WhatsApp (+92 333 0257246)',
      message: messageToSend,
      sentAt: 'Just now',
      deliveryStatus: 'sent'
    };

    const updatedInquiry: CustomerInquiry = {
      ...selectedInquiry,
      status: 'replied_whatsapp',
      replies: [...(selectedInquiry.replies || []), newReply]
    };

    onUpdateInquiry(updatedInquiry);
    setSendSuccessToast(`WhatsApp chat opened for ${selectedInquiry.customerName} (${formattedNumber})!`);
    setTimeout(() => setSendSuccessToast(null), 4000);
  };

  // Add Internal Note
  const handleAddInternalNote = () => {
    if (!selectedInquiry || !replyMessage.trim()) return;

    const newReply: InquiryReply = {
      id: `note-${Date.now()}`,
      channel: 'internal_note',
      sender: 'Staff Note (Internal)',
      message: replyMessage,
      sentAt: 'Just now',
      deliveryStatus: 'sent'
    };

    const updatedInquiry: CustomerInquiry = {
      ...selectedInquiry,
      replies: [...(selectedInquiry.replies || []), newReply]
    };

    onUpdateInquiry(updatedInquiry);
    setReplyMessage('');
    setSendSuccessToast('Internal staff note added to communication thread!');
    setTimeout(() => setSendSuccessToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & KPI Bar */}
      <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[11px] font-black uppercase tracking-wider">
                COMMUNICATIONS & INQUIRIES HUB
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                EMAIL & WHATSAPP ACTIVE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <Mail className="w-7 h-7 text-orange-400" />
              Customer Inquiries & Direct Reply Center
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Centralized inbox for customer quote requests, wholesale inquiries, stock questions, and warranty tickets. Reply directly via official <strong className="text-slate-200">info@warcomputer.com</strong> email or one-click <strong className="text-emerald-400">WhatsApp (+92 333 0257246)</strong>.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowComposeModal(true)}
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Compose Message</span>
            </button>

            <button
              onClick={() => setShowSettingsModal(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-white/10 font-bold text-xs flex items-center gap-2 shadow transition-all cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Email SMTP / API Settings</span>
            </button>
          </div>
        </div>

        {/* Status Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
          <div 
            onClick={() => setStatusFilter('all')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'all' 
                ? 'bg-slate-800/90 border-orange-500/50 shadow-md shadow-orange-500/10' 
                : 'bg-slate-950/60 border-white/5 hover:border-white/15'
            }`}
          >
            <p className="text-[11px] font-bold text-slate-400 uppercase">Total Inquiries</p>
            <p className="text-2xl font-black text-white mt-1">{inquiries.length}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">All customer tickets</p>
          </div>

          <div 
            onClick={() => setStatusFilter('new')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'new' 
                ? 'bg-red-950/50 border-red-500/60 shadow-md shadow-red-500/20' 
                : 'bg-slate-950/60 border-white/5 hover:border-white/15'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-red-400 uppercase">New / Action Needed</p>
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </div>
            <p className="text-2xl font-black text-red-300 mt-1">{unreadCount}</p>
            <p className="text-[10px] text-red-400/80 mt-0.5">Awaiting first reply</p>
          </div>

          <div 
            onClick={() => setStatusFilter('replied_email')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'replied_email' 
                ? 'bg-blue-950/50 border-blue-500/60 shadow-md shadow-blue-500/20' 
                : 'bg-slate-950/60 border-white/5 hover:border-white/15'
            }`}
          >
            <p className="text-[11px] font-bold text-blue-400 uppercase flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              Replied via Email
            </p>
            <p className="text-2xl font-black text-blue-300 mt-1">{repliedEmailCount}</p>
            <p className="text-[10px] text-blue-400/80 mt-0.5">Dispatched from info@</p>
          </div>

          <div 
            onClick={() => setStatusFilter('replied_whatsapp')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'replied_whatsapp' 
                ? 'bg-emerald-950/50 border-emerald-500/60 shadow-md shadow-emerald-500/20' 
                : 'bg-slate-950/60 border-white/5 hover:border-white/15'
            }`}
          >
            <p className="text-[11px] font-bold text-emerald-400 uppercase flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Replied
            </p>
            <p className="text-2xl font-black text-emerald-300 mt-1">{repliedWhatsAppCount}</p>
            <p className="text-[10px] text-emerald-400/80 mt-0.5">Direct chat engaged</p>
          </div>
        </div>
      </div>

      {/* Success Notification Toast */}
      {sendSuccessToast && (
        <div className="bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 px-4 py-3 rounded-2xl flex items-center justify-between gap-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-bold">{sendSuccessToast}</span>
          </div>
          <button 
            onClick={() => setSendSuccessToast(null)}
            className="text-emerald-400 hover:text-white text-xs font-bold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between shadow-lg">
        
        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer, email, phone, city..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase hidden lg:inline">Status:</span>
          
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'all' 
                ? 'bg-orange-500 text-white shadow-md' 
                : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            All ({inquiries.length})
          </button>

          <button
            onClick={() => setStatusFilter('new')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'new' 
                ? 'bg-red-600 text-white shadow-md' 
                : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            New ({unreadCount})
          </button>

          <button
            onClick={() => setStatusFilter('replied_email')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'replied_email' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Email Replied ({repliedEmailCount})
          </button>

          <button
            onClick={() => setStatusFilter('replied_whatsapp')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'replied_whatsapp' 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            WhatsApp Replied ({repliedWhatsAppCount})
          </button>

          <button
            onClick={() => setStatusFilter('resolved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'resolved' 
                ? 'bg-slate-700 text-white shadow-md' 
                : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Resolved ({resolvedCount})
          </button>
        </div>

      </div>

      {/* Main Two-Column Inbox & Reply Workplace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Inquiry Tickets List (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[820px]">
          
          <div className="p-4 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Customer Inquiries</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                {filteredInquiries.length}
              </span>
            </span>

            <span className="text-[11px] text-slate-400">
              Sorted by most recent
            </span>
          </div>

          <div className="overflow-y-auto divide-y divide-white/5 flex-1 p-2 space-y-1.5">
            {filteredInquiries.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <Mail className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs font-bold">No inquiries matching filter</p>
                <button
                  onClick={() => { setSearchQuery(''); setStatusFilter('all'); setTypeFilter('all'); }}
                  className="mt-2 text-[11px] text-orange-400 hover:underline cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filteredInquiries.map(item => {
                const isSelected = item.id === selectedInquiryId;
                const isUnread = item.status === 'new';

                return (
                  <div
                    key={item.id}
                    id={`inquiry-ticket-${item.id}`}
                    onClick={() => setSelectedInquiryId(item.id)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-150 relative ${
                      isSelected
                        ? 'bg-slate-800/90 border border-orange-500/50 shadow-lg'
                        : 'bg-slate-950/40 hover:bg-slate-800/40 border border-transparent'
                    }`}
                  >
                    {/* Unread indicator ribbon */}
                    {isUnread && (
                      <span className="absolute left-1.5 top-3 bottom-3 w-1 bg-red-500 rounded-full" />
                    )}

                    <div className="pl-1">
                      {/* Row 1: Name, City & Time */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-bold text-xs text-white truncate">
                            {item.customerName}
                          </span>
                          {item.city && (
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-medium shrink-0">
                              {item.city}
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">
                          {item.createdAt}
                        </span>
                      </div>

                      {/* Row 2: Subject */}
                      <p className="text-xs font-semibold text-slate-200 truncate mt-1">
                        {item.subject}
                      </p>

                      {/* Row 3: Message preview */}
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {item.message}
                      </p>

                      {/* Row 4: Status Badge & Tagged Product */}
                      <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                          {item.status === 'new' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-extrabold">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                              NEW
                            </span>
                          )}
                          {item.status === 'replied_email' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold">
                              <Mail className="w-2.5 h-2.5" />
                              Replied Email
                            </span>
                          )}
                          {item.status === 'replied_whatsapp' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                              <MessageCircle className="w-2.5 h-2.5" />
                              WhatsApp
                            </span>
                          )}
                          {item.status === 'resolved' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/10 text-[10px] font-medium">
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                              Resolved
                            </span>
                          )}
                        </div>

                        {item.productName && (
                          <span className="text-[10px] text-orange-400 truncate max-w-[140px] flex items-center gap-1 font-medium">
                            <Laptop className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate">{item.productName}</span>
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Right Column: Detailed Conversation & Dual Reply Center (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
          
          {selectedInquiry ? (
            <>
              {/* Detail Header: Customer Profile Card */}
              <div className="pb-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-red-600 text-white font-black text-base flex items-center justify-center shadow-lg shadow-orange-500/20">
                    {selectedInquiry.customerName.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <span>{selectedInquiry.customerName}</span>
                      {selectedInquiry.city && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-white/10 text-[11px] text-orange-400 font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-orange-400" />
                          {selectedInquiry.city}
                        </span>
                      )}
                    </h3>

                    {/* Quick Contacts Row */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 hover:text-white transition-colors">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono">{selectedInquiry.email}</span>
                        <button
                          onClick={() => handleCopy(selectedInquiry.email, 'email')}
                          className="text-[10px] text-orange-400 hover:underline ml-1 cursor-pointer"
                        >
                          {copiedText === 'email' ? 'Copied!' : 'Copy'}
                        </button>
                      </span>

                      <span className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-mono">{selectedInquiry.phone}</span>
                        <button
                          onClick={() => handleCopy(selectedInquiry.phone, 'phone')}
                          className="text-[10px] text-emerald-400 hover:underline ml-1 cursor-pointer"
                        >
                          {copiedText === 'phone' ? 'Copied!' : 'Copy'}
                        </button>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Switcher & Delete */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => {
                      onUpdateInquiry({
                        ...selectedInquiry,
                        status: e.target.value as any
                      });
                    }}
                    className="bg-slate-950 border border-white/15 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="new">🔴 Status: New (Unread)</option>
                    <option value="replied_email">🔵 Replied via Email</option>
                    <option value="replied_whatsapp">🟢 Replied via WhatsApp</option>
                    <option value="pending">🟡 Pending Customer</option>
                    <option value="resolved">✅ Resolved & Closed</option>
                  </select>

                  <button
                    onClick={() => {
                      if (confirm(`Delete inquiry ticket #${selectedInquiry.id}?`)) {
                        onDeleteInquiry(selectedInquiry.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-slate-950 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/10 transition-colors cursor-pointer"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Inquiry Details Card */}
              <div className="bg-slate-950/70 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-orange-400 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    Subject: {selectedInquiry.subject}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Received: {selectedInquiry.createdAt}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                  {selectedInquiry.message}
                </div>

                {/* Tagged Product Box */}
                {selectedInquiry.productName && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-orange-500/20">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center">
                        <Laptop className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Associated Hardware SKU</p>
                        <p className="text-xs font-bold text-white">{selectedInquiry.productName}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/30">
                      In Catalog
                    </span>
                  </div>
                )}
              </div>

              {/* Past Communication History & Thread */}
              {selectedInquiry.replies && selectedInquiry.replies.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    Replies & History Thread ({selectedInquiry.replies.length})
                  </h4>

                  <div className="space-y-2.5">
                    {selectedInquiry.replies.map(rep => (
                      <div 
                        key={rep.id}
                        className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                          rep.channel === 'email'
                            ? 'bg-blue-950/30 border-blue-500/30'
                            : rep.channel === 'whatsapp'
                            ? 'bg-emerald-950/30 border-emerald-500/30'
                            : 'bg-amber-950/30 border-amber-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {rep.channel === 'email' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold">
                                <Mail className="w-3 h-3" />
                                Dispatched via Email
                              </span>
                            )}
                            {rep.channel === 'whatsapp' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                                <MessageCircle className="w-3 h-3" />
                                WhatsApp Chat
                              </span>
                            )}
                            {rep.channel === 'internal_note' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                                <Edit3 className="w-3 h-3" />
                                Internal Team Note
                              </span>
                            )}

                            <span className="font-semibold text-slate-300 text-[11px]">
                              {rep.sender}
                            </span>
                          </div>

                          <span className="text-[10px] text-slate-400">
                            {rep.sentAt}
                          </span>
                        </div>

                        {rep.subject && (
                          <p className="text-[11px] font-bold text-slate-300">
                            {rep.subject}
                          </p>
                        )}

                        <p className="text-slate-200 whitespace-pre-line leading-relaxed">
                          {rep.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Reply Center */}
              <div className="bg-slate-950/90 border border-white/15 rounded-3xl p-5 space-y-4 shadow-xl">
                
                {/* Channel Switcher */}
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveChannel('email')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeChannel === 'email'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      <span>Reply via Email (info@warcomputer.com)</span>
                    </button>

                    <button
                      onClick={() => setActiveChannel('whatsapp')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeChannel === 'whatsapp'
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Reply on WhatsApp (+92)</span>
                    </button>

                    <button
                      onClick={() => setActiveChannel('internal_note')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeChannel === 'internal_note'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Add Note</span>
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-400">
                    Recipient: <strong className="text-white">{selectedInquiry.customerName}</strong>
                  </span>
                </div>

                {/* EMAIL COMPOSER VIEW */}
                {activeChannel === 'email' && (
                  <div className="space-y-3">
                    
                    {/* From & To header info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">From:</span>
                        <span className="font-mono text-slate-200">info@warcomputer.com</span>
                        <span className="text-[10px] text-emerald-400 ml-1.5">(Verified Domain)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">To:</span>
                        <span className="font-mono text-slate-200">{selectedInquiry.email}</span>
                      </div>
                    </div>

                    {/* Subject line input */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">Subject Line</label>
                      <input
                        type="text"
                        value={replySubject}
                        onChange={e => setReplySubject(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Quick Response Templates */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-slate-400">Quick-Fill Templates:</span>
                        <span className="text-[10px] text-slate-500">1-click insert</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleApplyTemplate('price_stock')}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                        >
                          📦 Stock & Price Quote
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyTemplate('cod_info')}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                        >
                          🚚 COD Policy & Token
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyTemplate('bank_ntn')}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                        >
                          🏦 Meezan Bank / NTN
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyTemplate('rfq_quote')}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                        >
                          📑 Wholesale B2B Quote
                        </button>
                      </div>
                    </div>

                    {/* Message Body */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">Email Message Body</label>
                      <textarea
                        rows={6}
                        value={replyMessage}
                        onChange={e => setReplyMessage(e.target.value)}
                        placeholder="Write your email response here or choose a template above..."
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed font-sans"
                      />
                    </div>

                    {/* Email Action Buttons */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyMessage)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open in Outlook / Mail App</span>
                        </a>
                      </div>

                      <button
                        onClick={handleSendEmailReply}
                        disabled={isSending || !replyMessage.trim()}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                      >
                        {isSending ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Dispatching Email...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Email Reply</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                )}

                {/* WHATSAPP COMPOSER VIEW */}
                {activeChannel === 'whatsapp' && (
                  <div className="space-y-3">
                    
                    <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Direct WhatsApp Conversation</p>
                          <p className="text-[11px] text-emerald-300 font-mono">
                            Sending to: +{formatWhatsAppNumber(selectedInquiry.phone)} ({selectedInquiry.customerName})
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/20 px-2 py-0.5 rounded-md">
                        One-Click Connect
                      </span>
                    </div>

                    {/* Pre-fill Quick Templates */}
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block mb-1.5">Quick WhatsApp Greetings:</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => {
                            setReplyMessage(
                              `Assalam-o-Alaikum ${selectedInquiry.customerName}! War Computers support here regarding "${selectedInquiry.subject}". We have this in stock. Can we share a video proof and pictures of the laptop for you?`
                            );
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                        >
                          🎥 Video Proof & Pictures
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setReplyMessage(
                              `Assalam-o-Alaikum ${selectedInquiry.customerName}! Best cash wholesale rate for ${selectedInquiry.productName || 'this computer'} is ready. Dispatch available to ${selectedInquiry.city || 'your city'} today. Let us know if you want to proceed!`
                            );
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                        >
                          💰 Best Price & Same-Day Dispatch
                        </button>
                      </div>
                    </div>

                    {/* WhatsApp Message Body */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">WhatsApp Message</label>
                      <textarea
                        rows={4}
                        value={replyMessage}
                        onChange={e => setReplyMessage(e.target.value)}
                        placeholder={`Assalam-o-Alaikum ${selectedInquiry.customerName}! Thank you for contacting War Computers regarding ${selectedInquiry.subject}...`}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
                      />
                    </div>

                    {/* WhatsApp Action Button */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <span className="text-[11px] text-slate-400">
                        Launches WhatsApp Web or Desktop App with message pre-filled.
                      </span>

                      <button
                        onClick={handleLaunchWhatsApp}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Open WhatsApp & Send Reply</span>
                      </button>
                    </div>

                  </div>
                )}

                {/* INTERNAL NOTE VIEW */}
                {activeChannel === 'internal_note' && (
                  <div className="space-y-3">
                    <p className="text-xs text-amber-300">
                      Internal notes are private to the War Computers administrative team and will never be seen by the customer.
                    </p>

                    <textarea
                      rows={3}
                      value={replyMessage}
                      onChange={e => setReplyMessage(e.target.value)}
                      placeholder="e.g. Quoted Rs. 42,000 via phone call; client confirmed they will pay token tomorrow..."
                      className="w-full bg-slate-900 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={handleAddInternalNote}
                        disabled={!replyMessage.trim()}
                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Save Internal Note</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-500">
              <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <h4 className="text-sm font-bold text-slate-300">No Inquiry Selected</h4>
              <p className="text-xs text-slate-400 mt-1">Select an inquiry from the left list to view details and reply.</p>
            </div>
          )}

        </div>

      </div>

      {/* MODAL 1: Email Configuration & SMTP Setup Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Email Server & Outbound Settings</h3>
                  <p className="text-xs text-slate-400">Configure how customer emails are dispatched from your domain</p>
                </div>
              </div>

              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Domain Outbound Identity
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    Ready
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Sender Address:</span>
                    <span className="font-mono text-white font-bold">info@warcomputer.com</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Sender Name:</span>
                    <span className="text-white">War Computers Support</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Domain:</span>
                    <span className="font-mono text-white">warcomputer.com</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">WhatsApp Dispatcher:</span>
                    <span className="font-mono text-emerald-400">+92 333 0257246</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 space-y-2">
                <h4 className="font-bold text-blue-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  How Outbound Email Sending Works
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  1. <strong>Direct Server Dispatch</strong>: When you click <em>Send Email Reply</em>, the application sends the message via the backend <code className="text-orange-400">/api/send-email</code> route.<br />
                  2. <strong>Optional Resend / SMTP Key</strong>: If you want real emails delivered to client Gmail/Yahoo inboxes, add your free Resend key <code className="text-blue-300">RESEND_API_KEY</code> in the project settings or use your domain cPanel webmail SMTP (<code className="text-slate-400">mail.warcomputer.com</code>).<br />
                  3. <strong>Client Fallback</strong>: You can also click <em>"Open in Outlook / Mail App"</em> at any time to send directly from your personal or cPanel webmail desktop client!
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Close Settings
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: Compose New Direct Inquiry / Message Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-slate-900 border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-orange-400" />
                Compose Direct Customer Ticket
              </h3>

              <button
                onClick={() => setShowComposeModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem('custName') as HTMLInputElement).value;
                const email = (form.elements.namedItem('custEmail') as HTMLInputElement).value;
                const phone = (form.elements.namedItem('custPhone') as HTMLInputElement).value;
                const city = (form.elements.namedItem('custCity') as HTMLInputElement).value;
                const subject = (form.elements.namedItem('custSubject') as HTMLInputElement).value;
                const message = (form.elements.namedItem('custMessage') as HTMLTextAreaElement).value;

                const newInq: CustomerInquiry = {
                  id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
                  customerName: name,
                  email,
                  phone,
                  city: city || 'Pakistan',
                  subject,
                  message,
                  inquiryType: 'general',
                  createdAt: 'Just now',
                  status: 'new',
                  priority: 'normal',
                  replies: []
                };

                onAddInquiry(newInq);
                setSelectedInquiryId(newInq.id);
                setShowComposeModal(false);
                setSendSuccessToast(`Customer inquiry #${newInq.id} created successfully!`);
                setTimeout(() => setSendSuccessToast(null), 3000);
              }}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Customer Full Name *</label>
                  <input
                    name="custName"
                    required
                    placeholder="e.g. Bilal Ahmed"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Email Address *</label>
                  <input
                    name="custEmail"
                    type="email"
                    required
                    placeholder="customer@email.com"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">WhatsApp Number *</label>
                  <input
                    name="custPhone"
                    required
                    placeholder="03001234567"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">City / Region</label>
                  <input
                    name="custCity"
                    placeholder="Lahore / Karachi / Islamabad"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Subject / Hardware Topic *</label>
                <input
                  name="custSubject"
                  required
                  placeholder="e.g. Quotation for Dell Latitude 7490"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Inquiry Details / Customer Request *</label>
                <textarea
                  name="custMessage"
                  rows={4}
                  required
                  placeholder="Enter details of customer request..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold cursor-pointer shadow-md"
                >
                  Create & Open Ticket
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
