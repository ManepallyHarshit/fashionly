import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Layers, Save, Download, Plus, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

interface DesignElement {
  id: string;
  type: 'shape' | 'text' | 'image';
  content: string;
  x: number;
  y: number;
}

function DesignStudioContent() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [elements, setElements] = useState<DesignElement[]>([]);

  const templates = [
    { id: '1', name: 'STREETWEAR BASE', category: 'CASUAL' },
    { id: '2', name: 'FORMAL SUIT', category: 'FORMAL' },
    { id: '3', name: 'ATHLETIC WEAR', category: 'SPORTS' },
    { id: '4', name: 'EVENING GOWN', category: 'FORMAL' },
    { id: '5', name: 'TECH JACKET', category: 'OUTERWEAR' },
    { id: '6', name: 'CUSTOM BLANK', category: 'CUSTOM' },
  ];

  const walletDesigns = [
    { id: 'w1', name: 'NEON PATTERN #01', designer: 'CYBER_DESIGNER' },
    { id: 'w2', name: 'GEOMETRIC GRID', designer: 'TECH_ARTIST' },
    { id: 'w3', name: 'GLITCH EFFECT', designer: 'DIGITAL_CREATOR' },
  ];

  const addElement = (type: DesignElement['type']) => {
    const newElement: DesignElement = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'NEW TEXT' : 'Element',
      x: 50,
      y: 50,
    };
    setElements([...elements, newElement]);
  };

  const removeElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-[#0A0C0F] to-deepest-black text-foreground relative">
      {/* Grid Overlay - Studio Zero specific */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '20px 20px',
        }}
      />
      
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 py-16 relative z-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="font-heading text-6xl md:text-7xl uppercase mb-6">
            DESIGN STUDIO
          </h1>
          <p className="font-paragraph text-base text-foreground/70 max-w-2xl mx-auto">
            CREATE CUSTOM OUTFITS USING DESIGNS FROM YOUR WALLET OR START FROM SCRATCH WITH OUR PROFESSIONAL TEMPLATES
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Tools & Wallet */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Templates */}
            <Card className="p-6 glass-card aura-glow">
              <h2 className="font-heading text-lg uppercase mb-4 text-primary">
                TEMPLATES
              </h2>
              <div className="space-y-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full p-3 text-left border rounded transition-all ${
                      selectedTemplate === template.id
                        ? 'border-primary bg-primary/10'
                        : 'border-glass-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-heading text-sm uppercase">
                      {template.name}
                    </div>
                    <div className="font-paragraph text-xs text-foreground/50">
                      {template.category}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Wallet Designs */}
            <Card className="p-6 glass-card aura-glow">
              <h2 className="font-heading text-lg uppercase mb-4 text-secondary">
                MY WALLET
              </h2>
              <div className="space-y-2">
                {walletDesigns.map((design) => (
                  <div
                    key={design.id}
                    className="p-3 border border-glass-border rounded hover:border-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="font-heading text-sm uppercase">
                      {design.name}
                    </div>
                    <div className="font-paragraph text-xs text-foreground/50">
                      BY {design.designer}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tools */}
            <Card className="p-6 glass-card aura-glow">
              <h2 className="font-heading text-lg uppercase mb-4 text-primary">
                TOOLS
              </h2>
              <div className="space-y-2">
                <Button
                  onClick={() => addElement('shape')}
                  variant="outline"
                  className="w-full justify-start border-glass-border"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  ADD SHAPE
                </Button>
                <Button
                  onClick={() => addElement('text')}
                  variant="outline"
                  className="w-full justify-start border-glass-border"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  ADD TEXT
                </Button>
                <Button
                  onClick={() => addElement('image')}
                  variant="outline"
                  className="w-full justify-start border-glass-border"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  ADD IMAGE
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Center - Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="p-8 glass-card aura-glow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl uppercase text-primary">
                  CANVAS
                </h2>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-glass-border">
                    <Save className="w-4 h-4 mr-2" />
                    SAVE
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground">
                    <Download className="w-4 h-4 mr-2" />
                    EXPORT
                  </Button>
                </div>
              </div>

              {/* Canvas Area */}
              <div className="aspect-[3/4] border-2 border-dashed border-glass-border rounded relative bg-background/50">
                {!selectedTemplate && elements.length === 0 ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <Palette className="w-16 h-16 text-foreground/30 mb-4" />
                    <p className="font-paragraph text-sm text-foreground/50">
                      SELECT A TEMPLATE OR ADD ELEMENTS TO START DESIGNING
                    </p>
                  </div>
                ) : (
                  <div className="absolute inset-0 p-4">
                    {selectedTemplate && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Layers className="w-24 h-24 text-primary/30 mx-auto mb-4" />
                          <p className="font-paragraph text-sm text-foreground/50">
                            TEMPLATE LOADED
                          </p>
                        </div>
                      </div>
                    )}
                    {elements.map((element) => (
                      <div
                        key={element.id}
                        className="absolute p-2 border border-primary/50 rounded cursor-move"
                        style={{ left: `${element.x}px`, top: `${element.y}px` }}
                      >
                        <span className="font-paragraph text-xs">{element.content}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Right Sidebar - Layers & Properties */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Layers */}
            <Card className="p-6 glass-card aura-glow">
              <h2 className="font-heading text-lg uppercase mb-4 text-primary">
                LAYERS
              </h2>
              {elements.length === 0 ? (
                <p className="font-paragraph text-xs text-foreground/50">
                  NO LAYERS YET
                </p>
              ) : (
                <div className="space-y-2">
                  {elements.map((element) => (
                    <div
                      key={element.id}
                      className="flex items-center justify-between p-2 border border-glass-border rounded"
                    >
                      <span className="font-paragraph text-xs uppercase">
                        {element.type}
                      </span>
                      <button
                        onClick={() => removeElement(element.id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Color Palette */}
            <Card className="p-6 glass-card aura-glow">
              <h2 className="font-heading text-lg uppercase mb-4 text-secondary">
                COLORS
              </h2>
              <div className="grid grid-cols-4 gap-2">
                <button className="aspect-square rounded border border-glass-border bg-primary hover:scale-110 transition-transform" />
                <button className="aspect-square rounded border border-glass-border bg-secondary hover:scale-110 transition-transform" />
                <button className="aspect-square rounded border border-glass-border bg-foreground hover:scale-110 transition-transform" />
                <button className="aspect-square rounded border border-glass-border bg-background hover:scale-110 transition-transform" />
              </div>
            </Card>

            {/* AI Suggestions */}
            <Card className="p-6 glass-card aura-glow">
              <h2 className="font-heading text-lg uppercase mb-4 text-primary">
                AI SUGGESTIONS
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-primary/10 border border-primary/30 rounded">
                  <p className="font-paragraph text-xs text-foreground/70">
                    Try adding neon accents to match current trends
                  </p>
                </div>
                <div className="p-3 bg-secondary/10 border border-secondary/30 rounded">
                  <p className="font-paragraph text-xs text-foreground/70">
                    Consider asymmetric composition for modern appeal
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}

export default function DesignStudioPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to access the Design Studio">
      <DesignStudioContent />
    </MemberProtectedRoute>
  );
}
