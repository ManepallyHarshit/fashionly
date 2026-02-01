import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, Download, Trash2, Plus, Grid, List } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

interface Skin {
  id: string;
  name: string;
  designer: string;
  category: string;
  dateAdded: Date;
  rating: number;
  price: number;
  featured: boolean;
}

function VaultContent() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const skins: Skin[] = [
    {
      id: '1',
      name: 'NEON CYBERPUNK #01',
      designer: 'CYBER_VISIONARY',
      category: 'patterns',
      dateAdded: new Date('2026-01-25'),
      rating: 4.9,
      price: 49.99,
      featured: true,
    },
    {
      id: '2',
      name: 'GEOMETRIC HARMONY',
      designer: 'GRID_MASTER',
      category: 'textures',
      dateAdded: new Date('2026-01-20'),
      rating: 4.7,
      price: 39.99,
      featured: false,
    },
    {
      id: '3',
      name: 'GLITCH EVOLUTION',
      designer: 'DIGITAL_ARTIST',
      category: 'effects',
      dateAdded: new Date('2026-01-18'),
      rating: 4.8,
      price: 29.99,
      featured: true,
    },
    {
      id: '4',
      name: 'HOLOGRAPHIC DREAMS',
      designer: 'FUTURE_DESIGNER',
      category: 'patterns',
      dateAdded: new Date('2026-01-15'),
      rating: 5.0,
      price: 59.99,
      featured: true,
    },
    {
      id: '5',
      name: 'MINIMALIST ELEGANCE',
      designer: 'CLEAN_LINES',
      category: 'templates',
      dateAdded: new Date('2026-01-12'),
      rating: 4.6,
      price: 34.99,
      featured: false,
    },
    {
      id: '6',
      name: 'ABSTRACT CANVAS',
      designer: 'ART_COLLECTIVE',
      category: 'patterns',
      dateAdded: new Date('2026-01-10'),
      rating: 4.9,
      price: 44.99,
      featured: false,
    },
  ];

  const categories = [
    { id: 'all', label: 'ALL SKINS' },
    { id: 'patterns', label: 'PATTERNS' },
    { id: 'textures', label: 'TEXTURES' },
    { id: 'effects', label: 'EFFECTS' },
    { id: 'templates', label: 'TEMPLATES' },
  ];

  const filteredSkins = selectedCategory === 'all'
    ? skins
    : skins.filter((s) => s.category === selectedCategory);

  const totalValue = skins.reduce((sum, skin) => sum + skin.price, 0);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background Image - THE VAULT */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15">
        <Image
          src="https://static.wixstatic.com/media/b1e8b0_55abb32e194442be9af68036034334d8~mv2.png?originWidth=1600&originHeight=896"
          alt="The Vault: Dark moody room with single spotlight on glass display case - Personal Collection & Design Storage"
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-primary" />
            <h1 className="font-heading text-6xl md:text-7xl uppercase">
              THE VAULT
            </h1>
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <p className="font-paragraph text-base text-foreground/70 max-w-2xl mx-auto">
            YOUR PRIVATE DIGITAL CLOSET - STORE AND MANAGE YOUR PURCHASED AND CREATED SKINS
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="p-6 bg-surface backdrop-blur-xl border-border-subtle text-center">
            <div className="font-heading text-3xl text-primary mb-2">{skins.length}</div>
            <div className="font-paragraph text-xs text-foreground/50 uppercase">
              TOTAL SKINS
            </div>
          </Card>
          <Card className="p-6 bg-surface backdrop-blur-xl border-border-subtle text-center">
            <div className="font-heading text-3xl text-tech-accent mb-2">${totalValue.toFixed(2)}</div>
            <div className="font-paragraph text-xs text-foreground/50 uppercase">
              COLLECTION VALUE
            </div>
          </Card>
          <Card className="p-6 bg-surface backdrop-blur-xl border-border-subtle text-center">
            <div className="font-heading text-3xl text-primary mb-2">
              {skins.filter((s) => s.featured).length}
            </div>
            <div className="font-paragraph text-xs text-foreground/50 uppercase">
              FEATURED ITEMS
            </div>
          </Card>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* View Mode & Actions */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface border border-border-subtle text-foreground/70 hover:text-foreground'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface border border-border-subtle text-foreground/70 hover:text-foreground'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              ADD NEW SKIN
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`font-paragraph text-xs uppercase px-6 py-3 border rounded transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-foreground border-border-subtle hover:border-primary'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skins Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkins.map((skin, index) => (
              <motion.div
                key={skin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden bg-surface backdrop-blur-xl border-border-subtle hover:border-primary/50 transition-all group">
                  {/* Preview */}
                  <div className="aspect-square bg-gradient-to-br from-primary/20 via-background to-tech-accent/20 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="font-heading text-5xl text-foreground/20 mb-2">
                          {skin.name.charAt(0)}
                        </div>
                        <div className="font-paragraph text-xs text-foreground/30 uppercase">
                          PREVIEW
                        </div>
                      </div>
                    </div>
                    {skin.featured && (
                      <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        FEATURED
                      </Badge>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-heading text-lg uppercase mb-2 group-hover:text-primary transition-colors">
                      {skin.name}
                    </h3>
                    <p className="font-paragraph text-xs text-foreground/50 mb-4">
                      BY {skin.designer}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        <span className="font-paragraph text-sm">{skin.rating}</span>
                      </div>
                      <div className="font-paragraph text-xs text-foreground/50">
                        {skin.dateAdded.toLocaleDateString()}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-border-subtle"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        USE
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border-subtle text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSkins.map((skin, index) => (
              <motion.div
                key={skin.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-6 bg-surface backdrop-blur-xl border border-border-subtle rounded hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-heading text-lg uppercase group-hover:text-primary transition-colors">
                        {skin.name}
                      </h3>
                      {skin.featured && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          FEATURED
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <span className="font-paragraph text-foreground/70">BY {skin.designer}</span>
                      <span className="font-paragraph text-foreground/50">
                        {skin.dateAdded.toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        <span className="font-paragraph">{skin.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-heading text-2xl text-primary">
                      ${skin.price}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary-hover"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        USE
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border-subtle text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredSkins.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <Lock className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
            <p className="font-paragraph text-lg text-foreground/50 mb-6">
              NO SKINS IN THIS CATEGORY YET
            </p>
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              ADD YOUR FIRST SKIN
            </Button>
          </motion.div>
        )}
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}

export default function VaultPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to access your Vault">
      <VaultContent />
    </MemberProtectedRoute>
  );
}
