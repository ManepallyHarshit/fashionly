import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles, User, Ruler, Droplet, Palette, Check } from 'lucide-react';
import { useMember } from '@/integrations';
import { useUserProfileStore } from '@/stores/userProfileStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useNavigate } from 'react-router-dom';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: 'primary' | 'secondary';
}

const STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Your Identity',
    description: 'Tell us your name and basic info',
    icon: User,
    color: 'primary',
  },
  {
    id: 2,
    title: 'Your Physique',
    description: 'Height and weight for perfect fit',
    icon: Ruler,
    color: 'secondary',
  },
  {
    id: 3,
    title: 'Your Skin Tone',
    description: 'Color palette personalization',
    icon: Droplet,
    color: 'primary',
  },
  {
    id: 4,
    title: 'Your Style DNA',
    description: 'AI-generated personal style profile',
    icon: Palette,
    color: 'secondary',
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { member } = useMember();
  const { profile, setProfile, completeSetup } = useUserProfileStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [styleDNA, setStyleDNA] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Step 1: Identity
  const [name, setName] = useState(member?.profile?.nickname || '');

  // Step 2: Physique
  const [height, setHeight] = useState(profile.height || 170);
  const [weight, setWeight] = useState(profile.weight || 70);
  const [build, setBuild] = useState(profile.build || 'average');

  // Step 3: Skin Tone
  const [skinTone, setSkinTone] = useState(profile.skinTone || 'medium');
  const [undertone, setUndertone] = useState(profile.undertone || 'neutral');

  const skinToneOptions = ['fair', 'light', 'medium', 'olive', 'deep', 'rich'];
  const undertoneOptions = ['warm', 'cool', 'neutral'];
  const buildOptions = ['slim', 'athletic', 'average', 'muscular', 'curvy'];

  const generateStyleDNA = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate a concise, inspiring "Personal Style DNA" profile for someone with these characteristics:
- Name: ${name}
- Height: ${height}cm
- Weight: ${weight}kg
- Build: ${build}
- Skin Tone: ${skinTone}
- Undertone: ${undertone}

Create a unique style persona that includes:
1. A 2-3 word style archetype (e.g., "Minimalist Futurist")
2. Key style characteristics (3-4 traits)
3. Recommended color palette (4-5 colors)
4. Signature silhouettes (2-3 types)
5. A motivational style mantra

Format as a cohesive, poetic profile that feels personal and inspiring.`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + import.meta.env.VITE_GEMINI_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate Style DNA');
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate Style DNA';
      setStyleDNA(generatedText);

      // Update profile with all data
      setProfile({
        height,
        weight,
        build: build as any,
        skinTone: skinTone as any,
        undertone: undertone as any,
        stylePersona: generatedText,
      });

      completeSetup();
    } catch (error) {
      console.error('Error generating Style DNA:', error);
      setStyleDNA('Unable to generate Style DNA. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (currentStep === 4) {
      await generateStyleDNA();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    navigate('/profile');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return name.trim().length > 0;
      case 2:
        return height > 0 && weight > 0;
      case 3:
        return skinTone && undertone;
      case 4:
        return styleDNA.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
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
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <Header />

      <main className="relative w-full min-h-screen flex items-center justify-center px-6 py-12">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />
        </div>

        <div ref={containerRef} className="relative z-10 w-full max-w-4xl">
          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-heading text-5xl md:text-6xl uppercase mb-2">
                  Discover Your Style DNA
                </h1>
                <p className="font-paragraph text-foreground/60">
                  Step {currentStep} of {STEPS.length}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex gap-3">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                    index + 1 <= currentStep
                      ? index + 1 === currentStep
                        ? 'bg-primary'
                        : 'bg-primary/50'
                      : 'bg-white/10'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 md:p-12 clip-tech-corner"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-primary/20 rounded">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-heading text-3xl uppercase">Your Identity</h2>
                    <p className="font-paragraph text-sm text-foreground/60">
                      Let's start with your name
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block font-paragraph text-sm text-foreground/70 mb-3 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  <p className="font-paragraph text-xs text-foreground/50 italic">
                    This will be used to personalize your style DNA profile.
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 md:p-12 clip-tech-corner"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-secondary/20 rounded">
                    <Ruler className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="font-heading text-3xl uppercase">Your Physique</h2>
                    <p className="font-paragraph text-sm text-foreground/60">
                      Help us understand your proportions
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="block font-paragraph text-sm text-foreground/70 mb-3 uppercase tracking-wider">
                      Height: {height} cm
                    </label>
                    <input
                      type="range"
                      min="140"
                      max="220"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between font-paragraph text-xs text-foreground/50 mt-2">
                      <span>140 cm</span>
                      <span>220 cm</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm text-foreground/70 mb-3 uppercase tracking-wider">
                      Weight: {weight} kg
                    </label>
                    <input
                      type="range"
                      min="40"
                      max="150"
                      value={weight}
                      onChange={(e) => setWeight(parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between font-paragraph text-xs text-foreground/50 mt-2">
                      <span>40 kg</span>
                      <span>150 kg</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm text-foreground/70 mb-3 uppercase tracking-wider">
                      Body Build
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {buildOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => setBuild(option)}
                          className={`px-4 py-2 rounded font-paragraph text-sm uppercase transition-all ${
                            build === option
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-white/5 border border-white/10 text-foreground hover:border-primary/50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 md:p-12 clip-tech-corner"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-primary/20 rounded">
                    <Droplet className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-heading text-3xl uppercase">Your Skin Tone</h2>
                    <p className="font-paragraph text-sm text-foreground/60">
                      For personalized color recommendations
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="block font-paragraph text-sm text-foreground/70 mb-3 uppercase tracking-wider">
                      Skin Tone
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {skinToneOptions.map((tone) => (
                        <button
                          key={tone}
                          onClick={() => setSkinTone(tone)}
                          className={`px-4 py-2 rounded font-paragraph text-sm uppercase transition-all ${
                            skinTone === tone
                              ? 'bg-secondary text-secondary-foreground'
                              : 'bg-white/5 border border-white/10 text-foreground hover:border-secondary/50'
                          }`}
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm text-foreground/70 mb-3 uppercase tracking-wider">
                      Undertone
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {undertoneOptions.map((tone) => (
                        <button
                          key={tone}
                          onClick={() => setUndertone(tone)}
                          className={`px-4 py-2 rounded font-paragraph text-sm uppercase transition-all ${
                            undertone === tone
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-white/5 border border-white/10 text-foreground hover:border-primary/50'
                          }`}
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 md:p-12 clip-tech-corner"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-secondary/20 rounded">
                    <Palette className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="font-heading text-3xl uppercase">Your Style DNA</h2>
                    <p className="font-paragraph text-sm text-foreground/60">
                      AI-powered personalization
                    </p>
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-6">
                    <LoadingSpinner />
                    <p className="font-paragraph text-foreground/60">
                      Generating your personal style DNA...
                    </p>
                  </div>
                ) : styleDNA ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-heading text-lg uppercase mb-2 text-primary">
                            Your Style DNA Generated
                          </h3>
                          <p className="font-paragraph text-sm text-foreground/70 whitespace-pre-wrap leading-relaxed">
                            {styleDNA}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="font-paragraph text-xs text-foreground/50 italic">
                      This profile has been saved to your account and will be used to personalize your fashion recommendations.
                    </p>
                  </motion.div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center justify-between mt-12 gap-4"
          >
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`clip-tech-button px-6 py-3 flex items-center gap-2 font-paragraph font-bold uppercase tracking-wider transition-all ${
                currentStep === 1
                  ? 'opacity-30 cursor-not-allowed bg-white/5 text-foreground/50'
                  : 'bg-white/10 hover:bg-white/20 text-foreground'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex-1 flex justify-center">
              <span className="font-paragraph text-xs text-foreground/50 uppercase tracking-widest">
                {currentStep} / {STEPS.length}
              </span>
            </div>

            {currentStep === 4 && styleDNA ? (
              <button
                onClick={handleComplete}
                className="clip-tech-button px-8 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-paragraph font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                Complete
                <Check className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isStepValid() || isLoading}
                className={`clip-tech-button px-8 py-3 flex items-center gap-2 font-paragraph font-bold uppercase tracking-wider transition-all ${
                  !isStepValid() || isLoading
                    ? 'opacity-50 cursor-not-allowed bg-primary/50 text-primary-foreground'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                }`}
              >
                {currentStep === 3 ? 'Generate DNA' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}
