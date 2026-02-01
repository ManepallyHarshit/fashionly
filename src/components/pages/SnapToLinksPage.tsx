import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Search, ExternalLink, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

interface DetectedItem {
  id: string;
  name: string;
  category: string;
  confidence: number;
  shopLink: string;
}

export default function SnapToLinksPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setDetectedItems([
        {
          id: '1',
          name: 'Cyber Neon Sunglasses',
          category: 'Eyewear',
          confidence: 95,
          shopLink: '/store',
        },
        {
          id: '2',
          name: 'Tech-Fabric Jacket',
          category: 'Outerwear',
          confidence: 88,
          shopLink: '/store',
        },
        {
          id: '3',
          name: 'Digital Watch',
          category: 'Accessories',
          confidence: 92,
          shopLink: '/store',
        },
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background Image - THE ARCHIVE */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15">
        <Image
          src="https://static.wixstatic.com/media/b1e8b0_f4105518cd1f40758ab44872d0817dc2~mv2.png?originWidth=1600&originHeight=896"
          alt="The Archive: Close-up of high-quality fabric textures and minimalist garments rack - Browsing & Selecting Base Designs"
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
            SNAP TO LINKS
          </h1>
          <p className="font-paragraph text-base text-foreground/70 max-w-2xl mx-auto">
            UPLOAD A PHOTO TO INSTANTLY IDENTIFY AND FIND FASHION ACCESSORIES USING AI-POWERED VISUAL RECOGNITION
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-surface backdrop-blur-xl border-border-subtle">
              <h2 className="font-heading text-2xl uppercase mb-6 text-primary">
                UPLOAD IMAGE
              </h2>

              {!uploadedImage ? (
                <motion.label 
                  className="block cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="aspect-square border-2 border-dashed border-border-subtle rounded flex flex-col items-center justify-center hover:border-primary transition-colors group"
                    whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Upload className="w-16 h-16 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    </motion.div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-2">
                      CLICK TO UPLOAD OR DRAG & DROP
                    </p>
                    <p className="font-paragraph text-xs text-foreground/50">
                      JPG, PNG, WEBP (MAX 10MB)
                    </p>
                  </motion.div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </motion.label>
              ) : (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-square rounded overflow-hidden border border-border-subtle">
                    <Image src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                  </div>
                  <motion.button
                    onClick={() => {
                      setUploadedImage(null);
                      setDetectedItems([]);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-2 border border-border-subtle hover:border-primary bg-surface hover:bg-surface-alt transition-all duration-300 font-paragraph text-sm uppercase tracking-wider text-foreground/70 hover:text-primary rounded"
                  >
                    UPLOAD NEW IMAGE
                  </motion.button>
                </motion.div>
              )}

              <div className="mt-8 p-4 bg-primary/10 border border-primary/30 rounded">
                <div className="flex items-start gap-3">
                  <Camera className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading text-sm uppercase mb-2 text-primary">
                      HOW IT WORKS
                    </h3>
                    <p className="font-paragraph text-xs text-foreground/70">
                      Our AI analyzes your photo to identify fashion items, accessories, and styling elements. Results include direct links to similar products in our shop.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 glass-card aura-glow min-h-[600px]">
              <h2 className="font-heading text-2xl uppercase mb-6 text-secondary">
                DETECTED ITEMS
              </h2>

              {isAnalyzing ? (
                <motion.div 
                  className="flex flex-col items-center justify-center h-96"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div 
                    className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  />
                  <p className="font-paragraph text-sm text-foreground/70">
                    ANALYZING IMAGE...
                  </p>
                </motion.div>
              ) : detectedItems.length > 0 ? (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatePresence>
                    {detectedItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                        className="p-4 bg-white/[0.03] border border-glass-border rounded hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-heading text-lg uppercase mb-1">
                              {item.name}
                            </h3>
                            <p className="font-paragraph text-xs text-foreground/50">
                              {item.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <motion.div 
                              className="font-paragraph text-sm text-primary"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                            >
                              {item.confidence}%
                            </motion.div>
                            <div className="font-paragraph text-xs text-foreground/50">
                              MATCH
                            </div>
                          </div>
                        </div>
                        <motion.a
                          href={item.shopLink}
                          whileHover={{ x: 4 }}
                          className="inline-flex items-center gap-2 font-paragraph text-xs uppercase text-primary hover:text-primary/80 transition-colors"
                        >
                          <Search className="w-4 h-4" />
                          FIND IN SHOP
                          <ExternalLink className="w-3 h-3" />
                        </motion.a>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div 
                  className="flex flex-col items-center justify-center h-96 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Search className="w-16 h-16 text-foreground/30 mb-4" />
                  <p className="font-paragraph text-sm text-foreground/50">
                    UPLOAD AN IMAGE TO START DETECTION
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div 
            className="p-6 glass-card aura-glow rounded"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-heading text-xl uppercase mb-3 text-primary">
              AI-POWERED
            </h3>
            <p className="font-paragraph text-sm text-foreground/70">
              Advanced computer vision technology identifies fashion items with high accuracy
            </p>
          </motion.div>
          <motion.div 
            className="p-6 glass-card aura-glow rounded"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-heading text-xl uppercase mb-3 text-primary">
              INSTANT RESULTS
            </h3>
            <p className="font-paragraph text-sm text-foreground/70">
              Get product matches and shop links in seconds, not minutes
            </p>
          </motion.div>
          <motion.div 
            className="p-6 glass-card aura-glow rounded"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-heading text-xl uppercase mb-3 text-primary">
              DIRECT SHOPPING
            </h3>
            <p className="font-paragraph text-sm text-foreground/70">
              Click through to purchase similar items immediately from our curated collection
            </p>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}
