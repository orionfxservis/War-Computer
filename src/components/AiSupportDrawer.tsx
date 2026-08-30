import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  ShoppingCart, 
  Eye, 
  RotateCcw, 
  Building2, 
  Cpu, 
  HelpCircle,
  Check
} from 'lucide-react';
import { ChatMessage, Product, PricingMode } from '../types';
import { formatPrice } from '../utils/formatCurrency';

interface AiSupportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  allProducts: Product[];
  pricingMode: PricingMode;
  onQuickViewProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, isWholesale: boolean) => void;
}

export const AiSupportDrawer: React.FC<AiSupportDrawerProps> = ({
  isOpen,
  onClose,
  allProducts,
  pricingMode,
  onQuickViewProduct,
  onAddToCart
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'ai',
      text: "⚡ **Greetings! I am WAR TECH BOT**, your dedicated AI Hardware Advisor & Customer Support Specialist at War Computers.\n\nI can help you with:\n- **Personalized PC & Laptop recommendations** for gaming, editing, or office work\n- **Wholesale tiered pricing & bulk pallets** (5 to 100+ units)\n- **Hardware spec comparisons** (RTX 4090 vs 4080, Apple M4 vs Intel Ultra)\n- **Order tracking & warranty support**\n\nWhat are you looking to build or procure today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: [
        '🎮 Best RTX 4090 Gaming Rig',
        '💼 Bulk Laptops for Company Fleet (20+ Units)',
        '🎓 Rugged Chromebooks for School Lab',
        '📦 Track Order #WC-8942'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage || '').trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages
        })
      });

      if (!response.ok) throw new Error('Chat API network error');
      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || "I have analyzed your request against our current depot inventory.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProductIds: data.recommendedProductIds || []
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error contacting AI chat:', err);
      // Fallback message
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: "I'm right here! Based on our catalog, for supreme performance we suggest the **War Apex Titan X (RTX 4090)** or the **Lenovo ThinkPad X1 Carbon Gen 12**. For bulk orders, our **Dell OptiPlex 25-Unit Pallets** offer up to 40% wholesale margin savings.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProductIds: ['prod-dt-01', 'prod-lp-02', 'prod-lot-01']
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm transition-all">
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-sm sm:text-base">WAR TECH BOT</h3>
                <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Gemini 3.7 Online
                </span>
              </div>
              <p className="text-xs text-slate-400">Real-Time Support & Hardware Recommender</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setMessages([messages[0]])}
              title="Reset Conversation"
              className="p-2 text-slate-400 hover:text-orange-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const recommendedProducts = (msg.recommendedProductIds || [])
              .map(id => allProducts.find(p => p.id === id))
              .filter(Boolean) as Product[];

            return (
              <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`space-y-3 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                  {/* Bubble */}
                  <div className={`p-3.5 rounded-2xl ${
                    isUser
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 shadow-sm'
                  }`}>
                    {/* Render message with bold/newlines formatting */}
                    <div className="whitespace-pre-line leading-relaxed">
                      {msg.text.split('\n').map((line, lIdx) => (
                        <p key={lIdx} className={line.startsWith('-') ? 'ml-2 my-0.5' : 'my-1'}>
                          {line}
                        </p>
                      ))}
                    </div>
                    <span className={`text-[10px] block mt-1.5 ${isUser ? 'text-orange-200 text-right' : 'text-slate-500'}`}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Recommended Products Display Cards */}
                  {recommendedProducts.length > 0 && (
                    <div className="space-y-2 pt-1 w-full">
                      <div className="text-[11px] font-bold text-orange-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Recommended by AI Hardware Advisor:
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {recommendedProducts.map((p) => {
                          const isWholesale = pricingMode === 'wholesale';
                          const price = isWholesale ? p.wholesalePrice : p.retailPrice;

                          return (
                            <div key={p.id} className="p-2.5 rounded-xl bg-slate-950 border border-orange-500/30 flex items-center gap-3 hover:border-orange-500 transition-colors">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                className="w-12 h-12 rounded-lg object-cover bg-slate-900 flex-shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-white text-xs truncate">{p.name}</p>
                                <p className="text-[11px] text-orange-400 font-extrabold">
                                  {formatPrice(price)}
                                  <span className="text-[9px] text-slate-400 font-normal ml-1">
                                    {isWholesale ? `(MOQ ${p.wholesaleMOQ}+)` : 'Retail'}
                                  </span>
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => onQuickViewProduct(p)}
                                  className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 cursor-pointer"
                                  title="Specs"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => onAddToCart(p, isWholesale ? p.wholesaleMOQ : 1, isWholesale)}
                                  className="p-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow cursor-pointer"
                                  title="Add to Cart"
                                >
                                  <ShoppingCart className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Quick Reply Pills */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.quickReplies.map((qr, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(qr)}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-orange-500/50 text-[11px] text-slate-300 hover:text-orange-300 transition-all cursor-pointer text-left"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}

                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-slate-400">WAR TECH BOT analyzing specs...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="ai-support-input"
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about RTX 4090 rigs, B2B wholesale MOQ, specs..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
            <button
              id="ai-support-send-btn"
              type="submit"
              disabled={isLoading || !((inputMessage || '').trim())}
              className="p-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-slate-500 text-center mt-2">
            Powered by Google Gemini 3.7 Flash & War Computers Depot Engine
          </p>
        </div>

      </div>
    </div>
  );
};
