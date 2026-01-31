import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  action?: { label: string; route: string };
}

interface Command {
  keywords: string[];
  response: string;
  action?: { label: string; route: string };
}

export default function AIAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Command Center. I can help you navigate the platform, suggest designs, and answer questions. Try saying "Take me to the studio" or "Show me the marketplace"!',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const commands: Command[] = [
    {
      keywords: ['studio', 'design studio', 'create', 'design'],
      response: 'Taking you to the Design Studio where you can create and customize your designs.',
      action: { label: 'Open Design Studio', route: '/design-studio' },
    },
    {
      keywords: ['shop', 'store', 'browse', 'shopping'],
      response: 'Opening the Shop where you can browse and purchase fashion items.',
      action: { label: 'Browse Shop', route: '/store' },
    },
    {
      keywords: ['forum', 'marketplace', 'designer forum', 'buy designs'],
      response: 'Taking you to the Designer Forum to explore and purchase exclusive designs.',
      action: { label: 'Visit Designer Forum', route: '/designer-forum' },
    },
    {
      keywords: ['vault', 'closet', 'my skins', 'digital closet'],
      response: 'Opening your Vault - your private digital closet where you store all your purchased and created skins.',
      action: { label: 'Open Vault', route: '/vault' },
    },
    {
      keywords: ['snap', 'visual search', 'find items', 'photo'],
      response: 'Opening Snap to Links - upload a photo to find similar fashion items instantly.',
      action: { label: 'Use Snap to Links', route: '/snap-to-links' },
    },
    {
      keywords: ['billing', 'earnings', 'wallet', 'ledger', 'transactions'],
      response: 'Taking you to your Billing & Earnings dashboard to manage your finances.',
      action: { label: 'View Billing', route: '/billing' },
    },
    {
      keywords: ['editor', 'edit', 'modify'],
      response: 'Opening the Design Editor for advanced customization and creation.',
      action: { label: 'Open Editor', route: '/design-editor' },
    },
    {
      keywords: ['home', 'main', 'dashboard'],
      response: 'Taking you back to the home dashboard.',
      action: { label: 'Go Home', route: '/' },
    },
  ];

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

    // Simulate AI response with command detection
    setTimeout(() => {
      const response = getAIResponse(inputValue);
      setMessages((prev) => [...prev, response]);
    }, 800);
  };

  const getAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    // Check for command matches
    for (const command of commands) {
      if (command.keywords.some(keyword => input.includes(keyword))) {
        return {
          id: (Date.now() + 1).toString(),
          text: command.response,
          sender: 'ai',
          timestamp: new Date(),
          action: command.action,
        };
      }
    }
    
    // Default responses for other queries
    if (input.includes('color') || input.includes('trend')) {
      return {
        id: (Date.now() + 1).toString(),
        text: 'Based on current fashion trends, neon accents like cyan (#00F0FF) and magenta (#FF00E5) are dominating the digital fashion space. For classic elegance, consider pairing dark bases with metallic highlights.',
        sender: 'ai',
        timestamp: new Date(),
      };
    }
    
    if (input.includes('help') || input.includes('what can')) {
      return {
        id: (Date.now() + 1).toString(),
        text: 'I can help you navigate to: Design Studio, Shop, Designer Forum, Snap to Links, Billing, or Design Editor. Just ask me to take you anywhere!',
        sender: 'ai',
        timestamp: new Date(),
      };
    }
    
    return {
      id: (Date.now() + 1).toString(),
      text: 'I can help you navigate the platform. Try asking me to take you to the studio, shop, forum, or billing dashboard!',
      sender: 'ai',
      timestamp: new Date(),
    };
  };

  const handleActionClick = (route: string) => {
    navigate(route);
    setIsOpen(false);
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
                <h3 className="font-heading text-sm uppercase text-primary">COMMAND CENTER</h3>
                <p className="font-paragraph text-xs text-foreground/50">NAVIGATION HUB</p>
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
                      className={`max-w-[85%] p-3 rounded ${ 
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white/[0.03] border border-glass-border text-foreground'
                      }`}
                    >
                      <p className="font-paragraph text-sm">{message.text}</p>
                      {message.action && (
                        <button
                          onClick={() => handleActionClick(message.action!.route)}
                          className="mt-2 flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                        >
                          {message.action.label}
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
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
