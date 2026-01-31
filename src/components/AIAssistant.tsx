import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI fashion assistant. I can help you with design suggestions, color selection based on trends, styling advice, and navigating the platform. How can I assist you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('color') || input.includes('trend')) {
      return 'Based on current fashion trends, neon accents like cyan (#00F0FF) and magenta (#FF00E5) are dominating the digital fashion space. For classic elegance, consider pairing dark bases with metallic highlights. Would you like specific color palette recommendations for your design?';
    }
    
    if (input.includes('design') || input.includes('create')) {
      return 'To create a design, navigate to the Design Studio where you can use templates from your wallet or start from scratch. I recommend beginning with a base silhouette and then adding custom elements. Would you like me to guide you through the design process?';
    }
    
    if (input.includes('sell') || input.includes('forum')) {
      return 'To sell your designs on the Designer Forum, ensure your work is original or properly licensed. High-quality renders and detailed descriptions increase sales. You can set your own pricing and earn directly through the platform. Need help pricing your designs?';
    }
    
    if (input.includes('shop') || input.includes('buy')) {
      return 'You can browse our shop for ready-made fashion items or use Snap to Links to find specific accessories from photos. All purchases are processed securely through our billing system. Looking for something specific?';
    }
    
    return 'I\'m here to help with design creation, color selection, trend analysis, and platform navigation. Could you provide more details about what you\'d like assistance with?';
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-8 z-50 w-96 h-[600px] bg-background/95 backdrop-blur-xl border border-glass-border rounded shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-glass-border flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-sm uppercase text-primary">AI ASSISTANT</h3>
                <p className="font-paragraph text-xs text-foreground/50">ALWAYS ONLINE</p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white/[0.03] border border-glass-border text-foreground'
                      }`}
                    >
                      <p className="font-paragraph text-sm">{message.text}</p>
                      <p className="font-paragraph text-xs opacity-50 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-glass-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="ASK ME ANYTHING..."
                  className="flex-1 bg-white/[0.03] border-glass-border font-paragraph text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
