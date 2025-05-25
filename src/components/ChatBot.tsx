'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: "👋 Hi! I'm AutoVibe Assistant. How can I help you today?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqs = [
    "How to book a test drive?",
    "How long does a test drive take?",
    "What financing options do you offer?",
    "Which cars are available right now?",
    "How much does the Hyundai i20 cost?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFAQClick = (faqQuestion: string) => {
    setShowFAQ(false);
    handleSendMessage(faqQuestion);
  };

  const handleSendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || inputMessage.trim();
    if (!messageToSend) return;

    // 1️⃣ Add user message to UI
    const userMsg: Message = { type: 'user', content: messageToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: messageToSend })
      });
      console.log('Response:');
      console.log(res)
      const json = await res.json();

      // 3️⃣ Handle errors from the API
      if (!res.ok) {
        throw new Error(json.error || 'Server error');
      }

      const botMsg: Message = {
        type: 'bot',
        content: json.answer?.trim() || '🤖 (no answer returned)'
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      // In case of network or server error
      setMessages(prev => [
        ...prev,
        { type: 'bot', content: `Error: ${err.message}` }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-[#F79B72] text-white p-4 rounded-full shadow-lg z-50 ${
          isOpen ? 'hidden' : ''
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 w-96 bg-[#121212] rounded-2xl shadow-2xl z-50 border border-white/80 ${
              isMinimized ? 'h-14' : 'h-[600px]'
            }`}
          >
            {/* Header */}
            <div className="bg-black/40 p-4 rounded-t-2xl flex justify-between items-center border-b border-white/80">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-[#f2f0ef]" />
                <h3 className="text-[#f4f3f3] font-semibold">AutoVibe Assistant</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFAQ(!showFAQ)}
                  className="text-gray-400 hover:text-[#F79B72] transition-colors"
                  title="Toggle FAQ"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-[#F79B72] transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-[#F79B72] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-[480px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#F79B72]/20 scrollbar-track-transparent">
                  {messages.map((message, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-[#F79B72] text-white'
                            : 'bg-black/40 text-gray-300 border border-white/80'
                        }`}
                      >
                        <div className="whitespace-pre-line">{message.content}</div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-black/40 p-3 rounded-2xl border border-white/80">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-[#F79B72]/50 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-[#F79B72]/50 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-[#F79B72]/50 rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/80">
                  <div className="flex space-x-2">
                    {/* FAQ Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowFAQ(!showFAQ)}
                      className="bg-black/40 border border-white/80 text-gray-400 hover:text-[#F79B72] p-2 rounded-xl transition-all duration-200 relative"
                      title="Quick Questions"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </motion.button>
                    
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F79B72] 
                      bg-black/40 border border-white/80 text-gray-300 placeholder-gray-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSendMessage()}
                      className="bg-[#F79B72] text-white p-2 rounded-xl hover:bg-[#F79B72]/90 transition-all duration-200"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* FAQ Popup */}
                  <AnimatePresence>
                    {showFAQ && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-20 left-4 right-4 bg-black/95 backdrop-blur-sm rounded-xl border border-white/80 p-4 shadow-2xl z-10"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <HelpCircle className="w-4 h-4 text-[#F79B72]" />
                            <h4 className="text-gray-300 font-medium text-sm">Quick Questions</h4>
                          </div>
                          <button
                            onClick={() => setShowFAQ(false)}
                            className="text-gray-400 hover:text-[#F79B72] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          {faqs.map((faq, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleFAQClick(faq)}
                              className="w-full text-left p-2 rounded-lg bg-black/60 hover:bg-[#F79B72]/20 
                                       text-gray-300 hover:text-white transition-all duration-200 
                                       border border-white/10 hover:border-[#F79B72]/40 text-xs"
                            >
                              {faq}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;