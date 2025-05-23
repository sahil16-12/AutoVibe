'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, MinusIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

interface ChatResponse {
  keywords: string[];
  response: string;
}

const chatResponses: ChatResponse[] = [
  {
    keywords: ['hi', 'hello', 'hey'],
    response: "Hello! Welcome to AutoVibe. How can I assist you today?"
  },
  {
    keywords: ['register', 'sign up', 'create account'],
    response: `To register with AutoVibe:
1. Click the "Get Started" button in the top menu
2. Fill in your details in the registration form
3. Verify your email address
4. Complete your profile with preferences
5. Start exploring our vehicle collection!`
  },
  {
    keywords: ['test drive', 'try car', 'drive car'],
    response: `To schedule a test drive:
1. Browse our vehicle collection
2. Select your preferred vehicle
3. Click "Book Test Drive"
4. Choose your preferred date and time
5. Confirm your booking

We'll send you a confirmation email with all details.`
  },
  {
    keywords: ['price', 'cost', 'payment', 'finance'],
    response: `We offer flexible financing options:
• Down payment starting from 10%
• Competitive interest rates from 2.99%
• Lease options available
• Trade-in accepted

Would you like to speak with our finance team?`
  },
  {
    keywords: ['vehicle', 'car', 'types', 'models'],
    response: `We offer various vehicle categories:
• Luxury Sedans (45+ models)
• Sports Cars (32+ models)
• Electric Vehicles (28+ models)
• SUVs (50+ models)

Which category interests you?`
  },
  {
    keywords: ['warranty', 'guarantee', 'coverage'],
    response: `Our warranty coverage includes:
• 3-year/36,000-mile basic warranty
• 5-year/60,000-mile powertrain warranty
• Extended warranty options available
• 24/7 roadside assistance`
  },
  {
    keywords: ['contact', 'support', 'help'],
    response: `You can reach us through:
• Phone: 1-800-AUTO-VIBE
• Email: support@autovibe.com
• Visit: Our showroom at 123 Auto Lane
• Live Chat: Available 24/7`
  }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'bot', 
      content: "👋 Hi! I'm AutoVibe Assistant. How can I help you today?" 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching response
    const matchedResponse = chatResponses.find(item =>
      item.keywords.some(keyword => lowerMessage.includes(keyword))
    );

    if (matchedResponse) {
      return matchedResponse.response;
    }

    // Default response if no match found
    return `I understand you're asking about "${userMessage}". I can help you with:
• Vehicle information and pricing
• Test drive scheduling
• Registration process
• Financing options
• Warranty coverage
• Support and contact

Could you please rephrase your question or choose one of these topics?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { type: 'user' as const, content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = { 
        type: 'bot' as const, 
        content: getResponse(userMessage.content)
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
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
            className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50
              ${isMinimized ? 'h-14' : 'h-[600px]'}`}
          >
            {/* Chat Header */}
            <div className="bg-[#F79B72] p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-white" />
                <h3 className="text-white font-semibold">AutoVibe Assistant</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <MinusIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Messages */}
                <div className="h-[480px] overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
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
                            : 'bg-gray-100 text-gray-800'
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
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F79B72]"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      className="bg-[#F79B72] text-white p-2 rounded-xl hover:bg-[#F79B72]/90 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
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