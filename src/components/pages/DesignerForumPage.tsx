import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Download, ShoppingCart, Filter, TrendingUp, Award, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';

interface Design {
  id: string;
  name: string;
  designer: string;
  designerReputation: number;
  price: number;
  rating: number;
  downloads: number;
  category: string;
  featured: boolean;
}

export default function DesignerForumPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const designs: Design[] = [
    {
      id: '1',
      name: 'CYBER NEON PATTERN',
      designer: 'TECH_VISIONARY',
      designerReputation: 4.9,
      price: 49.99,
      rating: 4.9,
      downloads: 1234,
      category: 'patterns',
      featured: true,
    },
    {
      id: '2',
      name: 'GEOMETRIC GRID SYSTEM',
      designer: 'GRID_MASTER',
      designerReputation: 4.7,
      price: 39.99,
      rating: 4.7,
      downloads: 892,
      category: 'patterns',
      featured: false,
    },
    {
      id: '3',
      name: 'GLITCH EFFECT OVERLAY',
      designer: 'DIGITAL_ARTIST',
      designerReputation: 4.8,
      price: 29.99,
      rating: 4.8,
      downloads: 1567,
      category: 'effects',
      featured: true,
    },
    {
      id: '4',
      name: 'HOLOGRAPHIC TEXTURE',
      designer: 'FUTURE_DESIGNER',
      designerReputation: 5.0,
      price: 59.99,
      rating: 5.0,
      downloads: 2341,
      category: 'textures',
      featured: true,
    },
    {
      id: '5',
      name: 'MINIMALIST SILHOUETTE',
      designer: 'CLEAN_LINES',
      designerReputation: 4.6,
      price: 34.99,
      rating: 4.6,
      downloads: 678,
      category: 'templates',
      featured: false,
    },
    {
      id: '6',
      name: 'ABSTRACT COMPOSITION',
      designer: 'ART_COLLECTIVE',
      designerReputation: 4.9,
      price: 44.99,
      rating: 4.9,
      downloads: 1123,
      category: 'patterns',
      featured: false,
    },
  ];

  const categories = [
    { id: 'all', label: 'ALL DESIGNS' },
    { id: 'patterns', label: 'PATTERNS' },
    { id: 'textures', label: 'TEXTURES' },
    { id: 'effects', label: 'EFFECTS' },
    { id: 'templates', label: 'TEMPLATES' },
  ];

  const filteredDesigns = selectedCategory === 'all'
    ? designs
    : designs.filter((d) => d.category === selectedCategory);

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
            DESIGNER FORUM
          </h1>
          <p className="font-paragraph text-base text-foreground/70 max-w-2xl mx-auto">
            PURCHASE EXCLUSIVE DESIGNS FROM RENOWNED CREATORS AND EXPAND YOUR CREATIVE TOOLKIT
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="p-6 glass-card aura-glow text-center">
            <div className="font-heading text-3xl text-primary mb-2">2,456</div>
            <div className="font-paragraph text-xs text-foreground/50 uppercase">
              TOTAL DESIGNS
            </div>
          </Card>
          <Card className="p-6 glass-card aura-glow text-center">
            <div className="font-heading text-3xl text-secondary mb-2">847</div>
            <div className="font-paragraph text-xs text-foreground/50 uppercase">
              ACTIVE DESIGNERS
            </div>
          </Card>
          <Card className="p-6 glass-card aura-glow text-center">
            <div className="font-heading text-3xl text-primary mb-2">15.2K</div>
            <div className="font-paragraph text-xs text-foreground/50 uppercase">
              DOWNLOADS
            </div>
          </Card>
          <Card className="p-6 glass-card aura-glow text-center">
            <div className="font-heading text-3xl text-secondary mb-2">4.8</div>
            <div className="font-paragraph text-xs text-foreground/50 uppercase">
              AVG RATING
            </div>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-xl uppercase">CATEGORIES</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`font-paragraph text-xs uppercase px-6 py-3 border rounded transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-foreground border-glass-border hover:border-primary'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigns.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden glass-card aura-glow hover:border-primary/50 transition-all group">
                {/* Design Preview */}
                <div className="aspect-square bg-gradient-to-br from-primary/20 via-background to-secondary/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-heading text-4xl text-foreground/20 mb-2">
                        {design.name.charAt(0)}
                      </div>
                      <div className="font-paragraph text-xs text-foreground/30 uppercase">
                        PREVIEW
                      </div>
                    </div>
                  </div>
                  {design.featured && (
                    <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      FEATURED
                    </Badge>
                  )}
                </div>

                {/* Design Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-heading text-lg uppercase mb-2 group-hover:text-primary transition-colors">
                        {design.name}
                      </h3>
                      <p className="font-paragraph text-xs text-foreground/50 mb-2">
                        BY {design.designer}
                      </p>
                    </div>
                  </div>

                  {/* Designer Reputation */}
                  <div className="flex items-center gap-2 mb-4 p-2 bg-white/[0.03] border border-glass-border rounded">
                    <Award className="w-4 h-4 text-secondary" />
                    <span className="font-paragraph text-xs text-foreground/70">
                      REPUTATION: {design.designerReputation}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span className="font-paragraph text-sm">{design.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4 text-foreground/50" />
                      <span className="font-paragraph text-xs text-foreground/50">
                        {design.downloads}
                      </span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between">
                    <div className="font-heading text-2xl text-primary">
                      ${design.price}
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      BUY
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Become a Designer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-12 glass-card aura-glow rounded text-center"
        >
          <h2 className="font-heading text-4xl uppercase mb-4">
            BECOME A DESIGNER
          </h2>
          <p className="font-paragraph text-base text-foreground/70 mb-8 max-w-2xl mx-auto">
            Share your creative work with the community and earn from every sale. Join our designer program today.
          </p>
          <Button
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}
          >
            START SELLING
          </Button>
        </motion.div>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}
