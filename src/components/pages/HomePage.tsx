// HPI 1.7-G
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Camera, ShoppingBag, Palette, Users, Sparkles, DollarSign, ArrowRight, Scan, Cpu, Globe, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Image } from '@/components/ui/image';

// --- Types & Interfaces ---
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  color: 'primary' | 'secondary';
  id: string;
}

// --- Canonical Data Sources ---
const FEATURES_DATA: Feature[] = [
  {
    icon: Camera,
    title: 'Snap to Links',
    description: 'Upload photos to find fashion accessories instantly via visual recognition protocols.',
    link: '/snap-to-links',
    color: 'primary',
    id: 'feat-01'
  },
  {
    icon: ShoppingBag,
    title: 'Shop',
    description: 'Browse and purchase fashion items seamlessly in our high-speed digital marketplace.',
    link: '/store',
    color: 'primary',
    id: 'feat-02'
  },
  {
    icon: Palette,
    title: 'Design Studio',
    description: 'Create custom outfits using designs from your wallet in the virtual atelier.',
    link: '/design-studio',
    color: 'secondary',
    id: 'feat-03'
  },
  {
    icon: Users,
    title: 'Designer Forum',
    description: 'Acquire exclusive schematics and designs from renowned global creators.',
    link: '/designer-forum',
    color: 'secondary',
    id: 'feat-04'
  },
  {
    icon: Sparkles,
    title: 'Edit & Create',
    description: 'Modify purchased designs or engineer originals to monetize on the exchange.',
    link: '/design-editor',
    color: 'primary',
    id: 'feat-05'
  },
  {
    icon: DollarSign,
    title: 'Billing & Earnings',
    description: 'Manage your financial dashboard, purchases, and designer royalties.',
    link: '/billing',
    color: 'secondary',
    id: 'feat-06'
  }
];

// --- Utility Components ---

const SectionDivider = () => (
  <div className="w-full flex items-center justify-center py-12 opacity-30">
    <div className="h-px w-full max-w-[200px] bg-gradient-to-r from-transparent via-primary to-transparent" />
    <div className="mx-4 text-xs font-paragraph text-primary tracking-widest">///</div>
    <div className="h-px w-full max-w-[200px] bg-gradient-to-r from-transparent via-primary to-transparent" />
  </div>
);

const Marquee = ({ text, direction = 1 }: { text: string; direction?: number }) => {
  return (
    <div className="relative flex overflow-hidden py-4 bg-primary/5 border-y border-primary/10">
      <motion.div
        className="flex whitespace-nowrap font-paragraph text-xs md:text-sm tracking-[0.2em] text-primary/70 uppercase"
        animate={{ x: direction === 1 ? [0, -1000] : [-1000, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {Array(10).fill(text).map((item, i) => (
          <span key={i} className="mx-8 flex items-center gap-4">
            {item} <span className="w-2 h-2 bg-secondary rounded-full" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  const { member, isAuthenticated, actions } = useMember();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-clip selection:bg-primary selection:text-background">
      <style>{`
        .clip-tech-corner {
          clip-path: polygon(
            0 0,
            100% 0,
            100% calc(100% - 20px),
            calc(100% - 20px) 100%,
            0 100%
          );
        }
        .clip-tech-button {
          clip-path: polygon(
            10px 0,
            100% 0,
            100% calc(100% - 10px),
            calc(100% - 10px) 100%,
            0 100%,
            0 10px
          );
        }
        .grid-bg {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
      `}</style>

      <Header />

      <main className="relative w-full">
        
        {/* --- HERO SECTION --- */}
        <section className="relative w-full h-screen min-h-[800px] flex flex-col justify-center items-center overflow-hidden">
          {/* Background Layers */}
          <div className="absolute inset-0 bg-background z-0" />
          <div className="absolute inset-0 grid-bg z-0 opacity-50" />
          
          {/* Parallax Background Image */}
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
            <Image
              src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=1"
              alt="Cyber Atelier Background"
              className="w-full h-full object-cover opacity-30 grayscale contrast-125"
            />
          </motion.div>

          {/* Hero Content */}
          <div className="relative z-20 w-full max-w-[120rem] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-primary" />
                <span className="font-paragraph text-xs md:text-sm text-primary tracking-[0.3em] uppercase">
                  System Online v2.0
                </span>
                <div className="h-px w-12 bg-primary" />
              </div>
              
              <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-6">
                Cyber<br />Atelier
              </h1>
              
              <p className="font-paragraph text-sm md:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                A high-performance fashion interface where design meets technology. 
                Engineer your aesthetic in a precision-driven digital environment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 items-center"
            >
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={actions.login}
                    className="clip-tech-button group relative px-10 py-4 bg-primary hover:bg-primary/90 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative font-paragraph font-bold text-primary-foreground tracking-wider flex items-center gap-2">
                      <Scan className="w-4 h-4" /> Initialize Session
                    </span>
                  </button>
                  <Link
                    to="/store"
                    className="clip-tech-button px-10 py-4 border border-white/20 hover:border-primary/50 hover:bg-white/5 transition-all duration-300"
                  >
                    <span className="font-paragraph font-bold text-foreground tracking-wider">
                      Browse Database
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center gap-2 mb-4">
                    <span className="font-paragraph text-xs text-primary/70 tracking-widest uppercase">
                      Welcome back, {member?.profile?.nickname || member?.contact?.firstName || 'Operator'}
                    </span>
                  </div>
                  <Link
                    to="/design-studio"
                    className="clip-tech-button group relative px-12 py-5 bg-primary hover:bg-primary/90 transition-all duration-300"
                  >
                    <span className="relative font-paragraph font-bold text-primary-foreground tracking-wider flex items-center gap-2">
                      <Cpu className="w-5 h-5" /> Access Design Core
                    </span>
                  </Link>
                </>
              )}
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="font-paragraph text-[10px] text-white/30 uppercase tracking-widest">Scroll to Navigate</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </section>

        <Marquee text="DIGITAL CRAFTSMANSHIP // GLOBAL MARKETPLACE // AI-ASSISTED DESIGN //" />

        {/* --- FEATURES GRID (DASHBOARD) --- */}
        <section className="relative w-full py-32 px-6 md:px-12 max-w-[120rem] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8">
            <div>
              <h2 className="font-heading text-4xl md:text-6xl uppercase mb-4">
                System Modules
              </h2>
              <p className="font-paragraph text-foreground/60 max-w-md">
                Access the complete ecosystem for fashion creation, trading, and innovation.
              </p>
            </div>
            <div className="hidden md:block font-paragraph text-xs text-primary tracking-widest">
              STATUS: OPERATIONAL
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES_DATA.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </section>

        {/* --- IMMERSIVE BREAK --- */}
        <section className="relative w-full h-[60vh] overflow-hidden flex items-center justify-center my-12">
          <div className="absolute inset-0 bg-fixed bg-cover bg-center grayscale opacity-40" 
               style={{ backgroundImage: 'url(https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=2)' }} 
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center max-w-4xl px-6">
            <h3 className="font-heading text-5xl md:text-7xl uppercase text-white mb-8 leading-none">
              The Future is <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Programmable</span>
            </h3>
            <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto">
              Join a network of creators redefining the boundaries between physical fabric and digital code.
            </p>
          </div>
        </section>

        {/* --- HOW IT WORKS (STICKY TIMELINE) --- */}
        <section className="relative w-full py-32 px-6 md:px-12 max-w-[120rem] mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Sticky Header */}
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <div className="flex items-center gap-4 mb-6">
                  <Globe className="w-6 h-6 text-secondary" />
                  <span className="font-paragraph text-sm text-secondary tracking-widest uppercase">Protocol</span>
                </div>
                <h2 className="font-heading text-5xl md:text-6xl uppercase mb-8 leading-tight">
                  Execution<br />Sequence
                </h2>
                <p className="font-paragraph text-foreground/60 mb-12">
                  Follow the standard operating procedure to transform raw data into monetizable fashion assets.
                </p>
                <Link 
                  to="/design-studio"
                  className="hidden lg:inline-flex items-center gap-3 font-paragraph text-sm font-bold text-primary hover:text-white transition-colors uppercase tracking-wider"
                >
                  Initiate Sequence <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Scrolling Steps */}
            <div className="lg:w-2/3 flex flex-col gap-24">
              <TimelineStep 
                number="01" 
                title="Data Acquisition" 
                description="Utilize the 'Snap to Links' module to capture real-world fashion data. Our AI analyzes visual inputs to identify accessories and garments instantly."
                imageSrc="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=3"
                color="primary"
              />
              <TimelineStep 
                number="02" 
                title="Synthesis & Design" 
                description="Enter the Design Studio. Combine acquired assets with your digital wallet inventory. Use the editor to modify textures, cuts, and physics."
                imageSrc="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=4"
                color="secondary"
              />
              <TimelineStep 
                number="03" 
                title="Deployment & Trade" 
                description="Publish your creations to the Designer Forum. Set your royalty rates and trade with a global network of digital fashion enthusiasts."
                imageSrc="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=5"
                color="primary"
              />
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* --- CTA SECTION --- */}
        <section className="relative w-full py-32 px-6 md:px-12 max-w-[120rem] mx-auto">
          <div className="relative clip-tech-corner bg-white/[0.02] border border-white/10 p-12 md:p-24 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <Zap className="w-12 h-12 text-primary mb-8" />
              <h2 className="font-heading text-4xl md:text-6xl uppercase mb-6 max-w-3xl">
                Ready to Interface?
              </h2>
              <p className="font-paragraph text-lg text-foreground/60 mb-12 max-w-2xl">
                The Cyber-Atelier is online. Initialize your creator profile and begin your journey into digital fashion.
              </p>
              
              {!isAuthenticated ? (
                <button
                  onClick={actions.login}
                  className="clip-tech-button px-16 py-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300"
                >
                  <span className="font-paragraph font-bold text-lg tracking-widest uppercase">
                    Create Account
                  </span>
                </button>
              ) : (
                <Link
                  to="/design-studio"
                  className="clip-tech-button px-16 py-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300"
                >
                  <span className="font-paragraph font-bold text-lg tracking-widest uppercase">
                    Launch Studio
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}

// --- Sub-Components ---

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={feature.link}
        className="group relative block h-full bg-white/[0.02] border border-white/5 hover:border-primary/50 transition-all duration-500 overflow-hidden"
      >
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative p-8 flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div className={`p-3 rounded-sm bg-white/5 ${feature.color === 'primary' ? 'text-primary' : 'text-secondary'}`}>
              <feature.icon className="w-8 h-8" />
            </div>
            <span className="font-paragraph text-[10px] text-white/20 uppercase tracking-widest">
              MOD.0{index + 1}
            </span>
          </div>
          
          <h3 className="font-heading text-2xl uppercase mb-4 group-hover:text-primary transition-colors duration-300">
            {feature.title}
          </h3>
          
          <p className="font-paragraph text-sm text-foreground/60 mb-8 flex-grow font-mono">
            {feature.description}
          </p>
          
          <div className="flex items-center gap-2 text-xs font-paragraph uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
            <span>Access Module</span>
            <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        
        {/* Tech Corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
      </Link>
    </motion.div>
  );
}

function TimelineStep({ number, title, description, imageSrc, color }: { number: string; title: string; description: string; imageSrc: string; color: 'primary' | 'secondary' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.7 }}
      className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-l border-white/10 pl-8 md:pl-12 relative"
    >
      {/* Timeline Dot */}
      <div className={`absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full ${color === 'primary' ? 'bg-primary' : 'bg-secondary'} ring-4 ring-background`} />

      <div className="order-2 md:order-1">
        <span className={`block font-paragraph text-sm font-bold ${color === 'primary' ? 'text-primary' : 'text-secondary'} mb-2 tracking-widest`}>
          STEP {number}
        </span>
        <h3 className="font-heading text-3xl uppercase mb-4">{title}</h3>
        <p className="font-paragraph text-foreground/70 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="order-1 md:order-2 relative aspect-video overflow-hidden clip-tech-corner bg-white/5">
        <div className={`absolute inset-0 bg-${color}/20 mix-blend-overlay z-10`} />
        <Image
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
        />
        {/* Overlay Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] z-20 opacity-50" />
      </div>
    </motion.div>
  );
}