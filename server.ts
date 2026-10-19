import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PRODUCTS, MOCK_ANALYTICS_DATA } from './src/data/products';
import { INITIAL_ORDERS } from './src/data/orders';
import { INITIAL_INQUIRIES } from './src/data/inquiries';
import { CustomerInquiry, InquiryReply } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory inquiry store initialized with seed inquiries
let SERVER_INQUIRIES: CustomerInquiry[] = [...INITIAL_INQUIRIES];

// Initialize Gemini Client safely supporting both GEMINI_API_KEY and GOOGLE_API_KEY
const getApiKey = () => process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.Google_API_KEY || '';

let ai: GoogleGenAI | null = null;
const apiKey = getApiKey();
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('[GEMINI] Google AI client successfully initialized.');
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI with provided key:', err);
  }
}

// System prompt with full catalog knowledge
const SYSTEM_PROMPT = `You are "WAR TECH BOT", the official elite AI Support & Technical Hardware Advisor for WAR COMPUTERS (WarComputers.com) — a premier wholesale and retail computer distributor.
Our brand deals with high-performance desktop PCs, custom RTX 4090/4080 gaming rigs, ultrabooks, ThinkPads, Chromebook fleets, Apple iPads, Windows tablets, server workstations, and bulk enterprise wholesale pallets.

Brand Tone: Sharp, high-tech, knowledgeable, direct, professional, and courteous with our trademark industrial power ethos.

Current Product Catalog Context:
${INITIAL_PRODUCTS.map(p => `- [ID: ${p.id}] "${p.name}" | Brand: ${p.brand} | Category: ${p.category} | Retail: $${p.retailPrice} | Wholesale: $${p.wholesalePrice} (MOQ: ${p.wholesaleMOQ}+ units) | Stock: ${p.stockQuantity} | Specs: CPU ${p.specs.cpu}, GPU ${p.specs.gpu}, RAM ${p.specs.ram}, Storage ${p.specs.storage}`).join('\n')}

Guidelines for your replies:
1. Provide concise, expert advice on hardware selection, gaming performance (FPS/resolutions), AI workloads (VRAM/FP16), student Chromebook deployments, and enterprise mobility.
2. For wholesale queries, highlight our tiered volume discounts (5-19 pcs = 15-20% off, 20-49 pcs = 25-30% off, 50+ pcs = 35-40% off), freight pallet logistics, and tax-exempt B2B invoices.
3. Whenever relevant, recommend 1 to 3 specific products by mentioning their exact product names and specifications. Also, you can list recommended IDs at the very end formatted as:
[RECOMMENDED_IDS: prod-dt-01, prod-lp-01]
4. If the user asks about order tracking, mention they can enter their order ID (like WC-8942 or WC-8910) in the Track Order tool.
5. Keep answers formatted nicely with bullet points and clear headings when appropriate.`;

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'War Computers Platform API', timestamp: new Date().toISOString() });
});

// Gemini Key verification status endpoint
app.get('/api/gemini/status', async (req, res) => {
  const currentKey = getApiKey();
  if (!currentKey) {
    return res.json({
      configured: false,
      status: 'Missing API Key',
      message: 'No GEMINI_API_KEY or GOOGLE_API_KEY environment variable detected.'
    });
  }

  try {
    const client = ai || new GoogleGenAI({ apiKey: currentKey });
    const probe = await client.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: 'Respond with 1 word: Online'
    });
    return res.json({
      configured: true,
      status: 'Active & Verified',
      model: 'gemini-3.6-flash',
      response: probe.text?.trim() || 'Online',
      maskedKey: currentKey.substring(0, 6) + '...' + currentKey.substring(currentKey.length - 4)
    });
  } catch (err: any) {
    return res.json({
      configured: true,
      status: 'Error with Key or Model',
      error: err.message
    });
  }
});

// Chatbot endpoint with Gemini API and smart fallback
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const currentKey = getApiKey();
    if (currentKey) {
      try {
        const client = ai || new GoogleGenAI({ apiKey: currentKey });
        const contents = [
          ...conversationHistory.slice(-6).map((msg: any) => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
          })),
          { role: 'user', parts: [{ text: message }] },
        ];

        const response = await client.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: contents as any,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.7,
            topP: 0.95,
          },
        });

        const replyText = response.text || "Hello! I am your War Computers technical advisor. How can I assist you with our retail inventory or wholesale bulk lots today?";
        
        // Extract any [RECOMMENDED_IDS: ...] tag
        const match = replyText.match(/\[RECOMMENDED_IDS:\s*([^\]]+)\]/i);
        let recommendedProductIds: string[] = [];
        let cleanedText = replyText;

        if (match) {
          recommendedProductIds = match[1].split(',').map((s: string) => s.trim());
          cleanedText = replyText.replace(/\[RECOMMENDED_IDS:[^\]]+\]/gi, '').trim();
        } else {
          // Heuristic matching
          const lower = message.toLowerCase();
          if (lower.includes('game') || lower.includes('4090') || lower.includes('desktop')) {
            recommendedProductIds = ['prod-dt-01', 'prod-dt-02'];
          } else if (lower.includes('laptop') || lower.includes('work') || lower.includes('thinkpad')) {
            recommendedProductIds = ['prod-lp-02', 'prod-lp-01'];
          } else if (lower.includes('chromebook') || lower.includes('school') || lower.includes('student')) {
            recommendedProductIds = ['prod-cb-01', 'prod-lot-02'];
          } else if (lower.includes('tablet') || lower.includes('ipad') || lower.includes('touch')) {
            recommendedProductIds = ['prod-tab-01', 'prod-tab-02'];
          } else if (lower.includes('wholesale') || lower.includes('bulk') || lower.includes('pallet') || lower.includes('fleet')) {
            recommendedProductIds = ['prod-lot-01', 'prod-lot-02'];
          }
        }

        return res.json({
          text: cleanedText,
          recommendedProductIds: recommendedProductIds.slice(0, 3),
        });
      } catch (geminiError: any) {
        console.error('Gemini call error, falling back to smart rule engine:', geminiError?.message || geminiError);
      }
    }

    // Smart responsive fallback if Gemini key is not configured or in offline preview
    const query = message.toLowerCase();
    let reply = "";
    let recommended: string[] = [];

    if (query.includes('wholesale') || query.includes('bulk') || query.includes('discount') || query.includes('moq')) {
      reply = "War Computers offers industry-leading wholesale pricing with tiered discounts: **15% off** for 5-19 units, **25% off** for 20-49 units, and **up to 40% off** for 50+ units or pallet lots. All wholesale orders include official B2B tax-exempt invoicing and insured freight logistics.";
      recommended = ['prod-lot-01', 'prod-lot-02', 'prod-dt-01'];
    } else if (query.includes('game') || query.includes('gaming') || query.includes('rtx') || query.includes('fps')) {
      reply = "For high-octane 4K ray-traced gaming, we recommend the **War Apex Titan X** with liquid-cooled Intel i9-14900KS & RTX 4090 24GB. On the mobile front, check out the **ASUS ROG Strix SCAR 18** with 240Hz Nebula HDR display.";
      recommended = ['prod-dt-01', 'prod-lp-01'];
    } else if (query.includes('chromebook') || query.includes('school') || query.includes('education')) {
      reply = "Our **HP Fortis 14 G10 Rugged Chromebook** is the #1 choice for schools and cloud operations with spill-resistant keyboard and MIL-STD testing. We also stock **30-unit Classroom Bulk Pallets** at wholesale volume pricing.";
      recommended = ['prod-cb-01', 'prod-lot-02'];
    } else if (query.includes('tablet') || query.includes('ipad') || query.includes('surface')) {
      reply = "Looking for ultra-portability? The new **Apple iPad Pro 13-inch M4** features a revolutionary Tandem OLED display. If you require full Windows 11 desktop enterprise software on the go, explore the **Microsoft Surface Pro 10**.";
      recommended = ['prod-tab-01', 'prod-tab-02', 'prod-tab-03'];
    } else if (query.includes('shipping') || query.includes('delivery') || query.includes('warranty')) {
      reply = "All retail orders ship within 24 hours with **3-Year Premium Hardware Warranty** and 30-day money-back guarantee. Wholesale pallets are dispatched via DHL/FedEx Freight with full liftgate delivery and serial barcoding.";
      recommended = ['prod-dt-01', 'prod-lp-02'];
    } else {
      reply = `Thank you for reaching out to War Computers! We specialize in premium retail and wholesale computer hardware. Whether you need a high-FPS RTX 4090 desktop, an enterprise ThinkPad laptop, rugged Chromebooks, or a 25-unit bulk pallet lot, our hardware specialists are ready to help.`;
      recommended = ['prod-dt-01', 'prod-lp-01', 'prod-lot-01'];
    }

    res.json({
      text: reply,
      recommendedProductIds: recommended,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Analytics API
app.get('/api/analytics', (req, res) => {
  res.json(MOCK_ANALYTICS_DATA);
});

// Order Tracking API
app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const order = INITIAL_ORDERS.find(o => o.orderId.toLowerCase() === id.toLowerCase());
  if (order) {
    res.json(order);
  } else {
    // Generate dynamic mock tracker for arbitrary order ID
    res.json({
      orderId: id.toUpperCase(),
      customerName: 'Verified War Computers Customer',
      orderDate: 'Aug 29, 2026',
      orderType: 'retail',
      status: 'Processing',
      carrier: 'FedEx Express Worldwide',
      trackingNumber: `FDX-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      estimatedDelivery: '3-4 Business Days',
      totalAmount: 1899.00,
      itemsCount: 1,
      timeline: [
        { status: 'Order Placed & Verified', date: 'Today, 10:30 AM', description: 'Payment authorized and securely routed to fulfillment warehouse.', completed: true, current: true },
        { status: 'Quality Testing & Assembly', date: 'Pending', description: 'Hardware stress testing and serial asset recording.', completed: false },
        { status: 'Dispatched to Carrier', date: 'Pending', description: 'Air freight express tracking label generated.', completed: false },
        { status: 'Delivered', date: 'Pending', description: 'Signature confirmation upon delivery.', completed: false }
      ]
    });
  }
});

// Wholesale RFQ submission
app.post('/api/quote', (req, res) => {
  const quoteData = req.body;
  const quoteId = `WC-RFQ-${Math.floor(10000 + Math.random() * 90000)}`;
  res.json({
    success: true,
    quoteId,
    status: 'Received & Locked',
    estimatedReviewHours: 2,
    message: `Your Wholesale Request for Quote (${quoteId}) has been logged. Our B2B fleet account executive will review and dispatch official PDF invoice & tax-exempt quotation within 2 hours.`,
    data: { ...quoteData, quoteId, createdAt: new Date().toISOString() }
  });
});

// Checkout simulation
app.post('/api/checkout', (req, res) => {
  const { cart, paymentMethod, customer } = req.body;
  const orderId = `WC-${Math.floor(1000 + Math.random() * 9000)}`;
  res.json({
    success: true,
    orderId,
    status: 'Paid & Processing',
    paymentMethod,
    customer,
    itemsCount: cart?.length || 1,
    estimatedDelivery: '2-3 Business Days via FedEx Priority Express',
    message: `Order #${orderId} confirmed successfully! Confirmation sent to ${customer?.email || 'your email'}.`
  });
});

// Outbound Email Dispatch API with Resend support & resilient simulation fallback
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, toName, from = 'info@warcomputer.com', fromName = 'War Computers Support Desk', subject, message, inquiryId } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: 'Recipient "to" and "message" are required.' });
    }

    const messageId = `msg_wc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    let deliveredLive = false;

    // Optional: Resend API integration if RESEND_API_KEY environment variable is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: `${fromName} <${from}>`,
            to: [to],
            subject: subject || 'Message from War Computers Pakistan',
            text: message,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 12px; border: 1px solid #334155;">
                <div style="border-bottom: 2px solid #f97316; padding-bottom: 12px; margin-bottom: 20px;">
                  <h2 style="color: #f97316; margin: 0; font-size: 22px; text-transform: uppercase;">WAR COMPUTERS</h2>
                  <p style="color: #94a3b8; margin: 4px 0 0; font-size: 12px;">Premier Computers & Laptops in Pakistan | Saddar, Karachi & Delivery Nationwide</p>
                </div>
                <div style="font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-line;">
                  ${message}
                </div>
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b;">
                  <p style="margin: 0;">War Computers Support & Dispatch Desk | info@warcomputer.com | +92 333 0257246</p>
                  <p style="margin: 4px 0 0;">Reference ID: ${messageId}</p>
                </div>
              </div>
            `
          })
        });

        if (resendResponse.ok) {
          deliveredLive = true;
        }
      } catch (externalErr) {
        console.warn('Live SMTP/Resend API call caught warning (using resilient fallback):', externalErr);
      }
    }

    console.log(`[EMAIL DISPATCH] Sent to ${to} (${toName || 'Client'}) | Subject: "${subject}" | Ref: ${messageId} | Live: ${deliveredLive}`);

    // If an inquiryId was provided, update server memory record
    if (inquiryId) {
      const match = SERVER_INQUIRIES.find(i => i.id === inquiryId);
      if (match) {
        match.status = 'replied_email';
        match.replies.push({
          id: `rep_${Date.now()}`,
          channel: 'email',
          sender: `${fromName} (${from})`,
          message,
          sentAt: 'Just now',
          subject: subject || 'Re: Customer Inquiry',
          deliveryStatus: 'sent'
        });
      }
    }

    res.json({
      success: true,
      messageId,
      deliveredLive,
      status: 'dispatched',
      recipient: to,
      sender: from,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('Error handling /api/send-email:', err);
    res.status(500).json({ error: err.message || 'Internal error dispatching email' });
  }
});

// Inquiries list endpoint
app.get('/api/inquiries', (req, res) => {
  res.json(SERVER_INQUIRIES);
});

// Create new customer inquiry endpoint
app.post('/api/inquiries', (req, res) => {
  const { customerName, email, phone, city, subject, message, inquiryType = 'general', productName } = req.body;
  
  if (!customerName || !email || !message) {
    return res.status(400).json({ error: 'customerName, email, and message are required' });
  }

  const newInquiry: CustomerInquiry = {
    id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName,
    email,
    phone: phone || '',
    city: city || 'Pakistan',
    subject: subject || 'General Hardware Inquiry',
    message,
    inquiryType,
    productName,
    createdAt: 'Just now',
    status: 'new',
    priority: 'normal',
    replies: []
  };

  SERVER_INQUIRIES.unshift(newInquiry);
  console.log(`[NEW INQUIRY] Logged #${newInquiry.id} from ${customerName} (${email}, ${phone})`);
  res.json(newInquiry);
});

// Static serving for standalone legal pages in /pages/
app.use('/pages', express.static(path.join(process.cwd(), 'pages')));

// Vite Middleware for development / Static file serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`War Computers Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
