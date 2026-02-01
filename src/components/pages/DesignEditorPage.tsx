import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, Upload, Undo, Redo, Layers, Type, Image as ImageIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Image } from '@/components/ui/image';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

function DesignEditorContent() {
  const [activeTab, setActiveTab] = useState('edit');
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);

  const purchasedDesigns = [
    { id: '1', name: 'CYBER NEON PATTERN', designer: 'TECH_VISIONARY' },
    { id: '2', name: 'GEOMETRIC GRID', designer: 'GRID_MASTER' },
    { id: '3', name: 'GLITCH EFFECT', designer: 'DIGITAL_ARTIST' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background Image - STUDIO ZERO */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15">
        <Image
          src="https://static.wixstatic.com/media/b1e8b0_26194b53baee46678e8f5643589401d3~mv2.png?originWidth=1600&originHeight=896"
          alt="Studio Zero: Clean white-space technical workspace with digital wireframes, mannequin, and blueprint grid lines"
          className="w-full h-full object-cover"
        />
      </div>
      
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="font-heading text-6xl md:text-7xl uppercase mb-6">
            DESIGN EDITOR
          </h1>
          <p className="font-paragraph text-base text-foreground/70 max-w-2xl mx-auto">
            MODIFY PURCHASED DESIGNS OR CREATE ORIGINAL WORKS TO SELL ON THE DESIGNER FORUM
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Design Library */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 glass-card aura-glow">
              <h2 className="font-heading text-lg uppercase mb-4 text-primary">
                MY DESIGNS
              </h2>
              <div className="space-y-2 mb-6">
                {purchasedDesigns.map((design) => (
                  <button
                    key={design.id}
                    className="w-full p-3 text-left border border-glass-border rounded hover:border-primary transition-colors"
                  >
                    <div className="font-heading text-sm uppercase">
                      {design.name}
                    </div>
                    <div className="font-paragraph text-xs text-foreground/50">
                      BY {design.designer}
                    </div>
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full border-glass-border"
              >
                <Upload className="w-4 h-4 mr-2" />
                IMPORT DESIGN
              </Button>
            </Card>
          </motion.div>

          {/* Center - Editor Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="p-8 bg-white/[0.03] backdrop-blur-xl border-glass-border">
              {/* Editor Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-glass-border">
                    <Undo className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-glass-border">
                    <Redo className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-glass-border">
                    <Save className="w-4 h-4 mr-2" />
                    SAVE
                  </Button>
                  <Button size="sm" className="bg-secondary text-secondary-foreground">
                    PUBLISH TO FORUM
                  </Button>
                </div>
              </div>

              {/* Canvas */}
              <div className="aspect-square border-2 border-glass-border rounded relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Edit3 className="w-24 h-24 text-foreground/20 mx-auto mb-4" />
                    <p className="font-paragraph text-sm text-foreground/50">
                      SELECT A DESIGN TO START EDITING
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Tools */}
              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" size="sm" className="border-glass-border">
                  <Type className="w-4 h-4 mr-2" />
                  TEXT
                </Button>
                <Button variant="outline" size="sm" className="border-glass-border">
                  <Layers className="w-4 h-4 mr-2" />
                  LAYER
                </Button>
                <Button variant="outline" size="sm" className="border-glass-border">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  IMAGE
                </Button>
                <Button variant="outline" size="sm" className="border-glass-border">
                  <Edit3 className="w-4 h-4 mr-2" />
                  DRAW
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Right Sidebar - Properties */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 bg-white/[0.03] backdrop-blur-xl border-glass-border">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="edit" className="flex-1">EDIT</TabsTrigger>
                  <TabsTrigger value="effects" className="flex-1">EFFECTS</TabsTrigger>
                </TabsList>

                <TabsContent value="edit" className="space-y-6">
                  <div>
                    <label className="font-paragraph text-xs uppercase text-foreground/70 mb-2 block">
                      BRIGHTNESS
                    </label>
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      min={0}
                      max={200}
                      step={1}
                      className="mb-2"
                    />
                    <div className="font-paragraph text-xs text-foreground/50 text-right">
                      {brightness[0]}%
                    </div>
                  </div>

                  <div>
                    <label className="font-paragraph text-xs uppercase text-foreground/70 mb-2 block">
                      CONTRAST
                    </label>
                    <Slider
                      value={contrast}
                      onValueChange={setContrast}
                      min={0}
                      max={200}
                      step={1}
                      className="mb-2"
                    />
                    <div className="font-paragraph text-xs text-foreground/50 text-right">
                      {contrast[0]}%
                    </div>
                  </div>

                  <div>
                    <label className="font-paragraph text-xs uppercase text-foreground/70 mb-2 block">
                      SATURATION
                    </label>
                    <Slider
                      value={saturation}
                      onValueChange={setSaturation}
                      min={0}
                      max={200}
                      step={1}
                      className="mb-2"
                    />
                    <div className="font-paragraph text-xs text-foreground/50 text-right">
                      {saturation[0]}%
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="effects" className="space-y-4">
                  <Button variant="outline" className="w-full justify-start border-glass-border">
                    GLITCH EFFECT
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-glass-border">
                    NEON GLOW
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-glass-border">
                    HOLOGRAPHIC
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-glass-border">
                    BLUR
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-glass-border">
                    PIXELATE
                  </Button>
                </TabsContent>
              </Tabs>

              {/* Color Picker */}
              <div className="mt-6 pt-6 border-t border-glass-border">
                <h3 className="font-heading text-sm uppercase mb-3 text-primary">
                  COLORS
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  <button className="aspect-square rounded border border-glass-border bg-primary hover:scale-110 transition-transform" />
                  <button className="aspect-square rounded border border-glass-border bg-secondary hover:scale-110 transition-transform" />
                  <button className="aspect-square rounded border border-glass-border bg-foreground hover:scale-110 transition-transform" />
                  <button className="aspect-square rounded border border-glass-border bg-background hover:scale-110 transition-transform" />
                  <button className="aspect-square rounded border border-glass-border bg-destructive hover:scale-110 transition-transform" />
                </div>
              </div>
            </Card>

            {/* AI Enhancements */}
            <Card className="p-6 bg-white/[0.03] backdrop-blur-xl border-glass-border mt-6">
              <h3 className="font-heading text-sm uppercase mb-4 text-secondary">
                AI ENHANCEMENTS
              </h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start border-glass-border">
                  AUTO ENHANCE
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start border-glass-border">
                  REMOVE BACKGROUND
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start border-glass-border">
                  UPSCALE QUALITY
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Publishing Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 bg-white/[0.03] backdrop-blur-xl border border-glass-border rounded"
        >
          <h2 className="font-heading text-2xl uppercase mb-4 text-primary">
            PUBLISHING GUIDELINES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-heading text-sm uppercase mb-2 text-secondary">
                ORIGINALITY
              </h3>
              <p className="font-paragraph text-xs text-foreground/70">
                Ensure your designs are original or properly licensed before publishing to the forum
              </p>
            </div>
            <div>
              <h3 className="font-heading text-sm uppercase mb-2 text-secondary">
                QUALITY
              </h3>
              <p className="font-paragraph text-xs text-foreground/70">
                High-resolution exports (minimum 2048x2048px) are recommended for best results
              </p>
            </div>
            <div>
              <h3 className="font-heading text-sm uppercase mb-2 text-secondary">
                PRICING
              </h3>
              <p className="font-paragraph text-xs text-foreground/70">
                Set competitive prices based on complexity and market trends to maximize sales
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}

export default function DesignEditorPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to access the Design Editor">
      <DesignEditorContent />
    </MemberProtectedRoute>
  );
}
