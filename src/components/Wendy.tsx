import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Wendy() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm Wendy, your AI bean buddy. How can I help you with your coffee journey at Cafe Norte today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `You are Wendy, a friendly and knowledgeable AI Barista at "Cafe Norte".
      Cafe Norte is a minimalist coffee sanctuary in Tarlac City, Philippines.
      They specialize in artisan crafts, signature roasts like "Norte Signature Roast", "San Rafael Gold", and "City Sunrise Blend".
      They have a wide menu of coffee, non-coffee, and food like Belgian waffles, Oreo rolls, and Ube Danishes.
      Keep your responses helpful, slightly Taglish (Tagalog-English) if appropriate for a local Filipino vibe, and focused on coffee or the cafe.
      
      User said: ${input}`;

      const result = await model.generateContent(prompt);
      const assistantMessage: Message = { role: 'assistant', content: result.response.text() };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I had a little hiccup. Can you try again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[90vw] md:w-96 bg-white rounded-3xl shadow-2xl border border-cafe-brown/10 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-cafe-brown p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cafe-cream/20 rounded-full flex items-center justify-center">
                  <Bot size={24} className="text-cafe-cream" />
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-none">Wendy</h4>
                  <p className="text-cafe-cream/60 text-xs mt-1">AI Barista Specialist</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="h-96 overflow-y-auto p-6 space-y-4 bg-cafe-cream/10"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user' ? 'bg-cafe-gold text-white' : 'bg-cafe-brown text-white'
                    }`}>
                      {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-cafe-gold text-white rounded-tr-none shadow-md shadow-cafe-gold/20' 
                        : 'bg-white text-cafe-dark rounded-tl-none border border-cafe-brown/5 shadow-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-cafe-brown text-white flex items-center justify-center shrink-0">
                      <Sparkles size={16} />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-cafe-brown/5 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-cafe-brown/30 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-cafe-brown/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-cafe-brown/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-cafe-brown/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our coffee..."
                  className="flex-1 bg-cafe-cream/20 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cafe-gold/50 placeholder:text-cafe-dark/30"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-cafe-dark text-white p-3 rounded-xl hover:bg-cafe-brown transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-cafe-brown text-white rounded-full flex items-center justify-center shadow-2xl relative group overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </div>
  );
}
