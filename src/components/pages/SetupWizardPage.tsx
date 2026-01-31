import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Ruler, Palette, Sparkles, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { useUserProfileStore } from '@/stores/userProfileStore';

function SetupWizardContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const { profile, updateIdentity, updatePhysique, calculateGoldenRatio, updateSkinTone, generatePalette, updateStylePersona, completeSetup } = useUserProfileStore();

  // Step 1: Identity
  const [email, setEmail] = useState(profile.email || '');
  const [passwordVault, setPasswordVault] = useState(profile.passwordVault || '');

  // Step 2: Physique
  const [height, setHeight] = useState(profile.height?.toString() || '');
  const [weight, setWeight] = useState(profile.weight?.toString() || '');
  const [build, setBuild] = useState(profile.build || 'average');

  // Step 3: Skin Tone
  const [skinToneHex, setSkinToneHex] = useState(profile.skinToneHex || '#D4A574');
  const [skinTone, setSkinTone] = useState(profile.skinTone || 'medium');
  const [undertone, setUndertone] = useState(profile.undertone || 'warm');

  // Step 4: Style Persona
  const [stylePersona, setStylePersona] = useState(profile.stylePersona || 'minimalist');

  const steps = [
    {
      title: 'IDENTITY',
      subtitle: 'Email & Secure Vault',
      icon: Lock,
      description: 'Create your secure identity for the platform',
    },
    {
      title: 'PHYSIQUE',
      subtitle: 'Height, Weight & Build',
      icon: Ruler,
      description: 'We\'ll calculate golden ratio proportions for perfect garment lengths',
    },
    {
      title: 'SKIN TONE',
      subtitle: 'Hex & Tone Selection',
      icon: Palette,
      description: 'Get personalized color palette suggestions based on your undertone',
    },
    {
      title: 'STYLE PERSONA',
      subtitle: 'Minimalist vs. Avant-Garde',
      icon: Sparkles,
      description: 'Set your default marketplace filter and style preference',
    },
  ];

  const handleNext = () => {
    if (currentStep === 0) {
      updateIdentity(email, passwordVault);
    } else if (currentStep === 1) {
      updatePhysique(parseFloat(height), parseFloat(weight), build);
      calculateGoldenRatio(parseFloat(height), parseFloat(weight), build);
    } else if (currentStep === 2) {
      updateSkinTone(skinToneHex, skinTone, undertone);
      generatePalette(skinToneHex, undertone);
    } else if (currentStep === 3) {
      updateStylePersona(stylePersona);
      completeSetup();
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return email && passwordVault;
      case 1:
        return height && weight && build;
      case 2:
        return skinToneHex && skinTone && undertone;
      case 3:
        return stylePersona;
      default:
        return false;
    }
  };

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 py-16">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-heading text-4xl md:text-5xl uppercase">
              PROFILE SETUP
            </h1>
            <span className="font-heading text-2xl text-primary">
              {currentStep + 1} / {steps.length}
            </span>
          </div>

          {/* Progress Indicators */}
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all ${
                  index <= currentStep ? 'bg-primary' : 'bg-white/[0.1]'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Step Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="space-y-3">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-full text-left p-4 rounded transition-all border ${
                      isActive
                        ? 'bg-primary/20 border-primary'
                        : isCompleted
                        ? 'bg-white/[0.03] border-glass-border'
                        : 'bg-white/[0.03] border-glass-border opacity-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : isCompleted
                            ? 'bg-primary/30 text-primary'
                            : 'bg-white/[0.1] text-foreground/50'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <StepIcon className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <div className="font-heading text-sm uppercase">{step.title}</div>
                        <div className="font-paragraph text-xs text-foreground/50">
                          {step.subtitle}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="p-8 bg-white/[0.03] backdrop-blur-xl border-glass-border">
              {/* Step Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-primary/20 rounded-lg">
                  <CurrentIcon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="font-heading text-3xl uppercase">
                    {steps[currentStep].title}
                  </h2>
                  <p className="font-paragraph text-sm text-foreground/70 mt-1">
                    {steps[currentStep].description}
                  </p>
                </div>
              </div>

              {/* Step Content */}
              <div className="space-y-6 mb-8">
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label className="font-heading text-sm uppercase mb-2 block">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="bg-white/[0.05] border-glass-border"
                      />
                    </div>
                    <div>
                      <Label className="font-heading text-sm uppercase mb-2 block">
                        Secure Vault Password
                      </Label>
                      <Input
                        type="password"
                        value={passwordVault}
                        onChange={(e) => setPasswordVault(e.target.value)}
                        placeholder="Create a strong password"
                        className="bg-white/[0.05] border-glass-border"
                      />
                    </div>
                    <div className="p-4 bg-primary/10 border border-primary/30 rounded">
                      <p className="font-paragraph text-xs text-foreground/70">
                        Your vault password will be encrypted and used to secure your personal data.
                      </p>
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-heading text-sm uppercase mb-2 block">
                          Height (cm)
                        </Label>
                        <Input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="170"
                          className="bg-white/[0.05] border-glass-border"
                        />
                      </div>
                      <div>
                        <Label className="font-heading text-sm uppercase mb-2 block">
                          Weight (kg)
                        </Label>
                        <Input
                          type="number"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder="70"
                          className="bg-white/[0.05] border-glass-border"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="font-heading text-sm uppercase mb-3 block">
                        Build Type
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {['slim', 'athletic', 'average', 'muscular', 'curvy'].map((b) => (
                          <button
                            key={b}
                            onClick={() => setBuild(b)}
                            className={`p-3 rounded border transition-all font-paragraph text-sm uppercase ${
                              build === b
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-white/[0.03] border-glass-border hover:border-primary'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {profile.goldenRatioProportions && (
                      <div className="p-4 bg-secondary/10 border border-secondary/30 rounded">
                        <p className="font-heading text-sm uppercase mb-3 text-secondary">
                          Golden Ratio Proportions Calculated
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs font-paragraph">
                          <div>Shoulder: {profile.goldenRatioProportions.shoulderWidth?.toFixed(1)}cm</div>
                          <div>Chest: {profile.goldenRatioProportions.chestWidth?.toFixed(1)}cm</div>
                          <div>Waist: {profile.goldenRatioProportions.waistWidth?.toFixed(1)}cm</div>
                          <div>Hip: {profile.goldenRatioProportions.hipWidth?.toFixed(1)}cm</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label className="font-heading text-sm uppercase mb-2 block">
                        Skin Tone Color
                      </Label>
                      <div className="flex items-center gap-4">
                        <input
                          type="color"
                          value={skinToneHex}
                          onChange={(e) => setSkinToneHex(e.target.value)}
                          className="w-20 h-20 rounded cursor-pointer"
                        />
                        <div>
                          <p className="font-paragraph text-sm text-foreground/70 mb-2">
                            Selected: {skinToneHex}
                          </p>
                          <p className="font-paragraph text-xs text-foreground/50">
                            Click to adjust your skin tone
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="font-heading text-sm uppercase mb-3 block">
                        Skin Tone
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        {['fair', 'light', 'medium', 'olive', 'deep', 'rich'].map((tone) => (
                          <button
                            key={tone}
                            onClick={() => setSkinTone(tone)}
                            className={`p-3 rounded border transition-all font-paragraph text-xs uppercase ${
                              skinTone === tone
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-white/[0.03] border-glass-border hover:border-primary'
                            }`}
                          >
                            {tone}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="font-heading text-sm uppercase mb-3 block">
                        Undertone
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        {['warm', 'cool', 'neutral'].map((ut) => (
                          <button
                            key={ut}
                            onClick={() => setUndertone(ut)}
                            className={`p-3 rounded border transition-all font-paragraph text-sm uppercase ${
                              undertone === ut
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-white/[0.03] border-glass-border hover:border-primary'
                            }`}
                          >
                            {ut}
                          </button>
                        ))}
                      </div>
                    </div>

                    {profile.suggestedPalette && profile.suggestedPalette.length > 0 && (
                      <div className="p-4 bg-primary/10 border border-primary/30 rounded">
                        <p className="font-heading text-sm uppercase mb-3 text-primary">
                          Suggested Color Palette
                        </p>
                        <div className="flex gap-2">
                          {profile.suggestedPalette.map((color, index) => (
                            <div
                              key={index}
                              className="w-12 h-12 rounded border border-glass-border"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label className="font-heading text-sm uppercase mb-3 block">
                        Choose Your Style Persona
                      </Label>
                      <div className="space-y-3">
                        {[
                          {
                            id: 'minimalist',
                            title: 'MINIMALIST',
                            description: 'Clean lines, essential pieces, timeless elegance',
                          },
                          {
                            id: 'avant-garde',
                            title: 'AVANT-GARDE',
                            description: 'Experimental, bold, pushing creative boundaries',
                          },
                          {
                            id: 'eclectic',
                            title: 'ECLECTIC',
                            description: 'Mixed styles, unique combinations, personal expression',
                          },
                        ].map((persona) => (
                          <button
                            key={persona.id}
                            onClick={() => setStylePersona(persona.id)}
                            className={`w-full p-4 rounded border transition-all text-left ${
                              stylePersona === persona.id
                                ? 'bg-primary/20 border-primary'
                                : 'bg-white/[0.03] border-glass-border hover:border-primary'
                            }`}
                          >
                            <div className="font-heading text-sm uppercase mb-1">
                              {persona.title}
                            </div>
                            <div className="font-paragraph text-xs text-foreground/70">
                              {persona.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-secondary/10 border border-secondary/30 rounded">
                      <p className="font-heading text-sm uppercase mb-2 text-secondary">
                        Marketplace Filter
                      </p>
                      <p className="font-paragraph text-xs text-foreground/70">
                        Your selected style will be used as the default filter when browsing the marketplace.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-glass-border">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="border-glass-border"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  PREVIOUS
                </Button>

                <div className="text-center">
                  <p className="font-paragraph text-xs text-foreground/50">
                    Step {currentStep + 1} of {steps.length}
                  </p>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {currentStep === steps.length - 1 ? 'COMPLETE' : 'NEXT'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
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

export default function SetupWizardPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to complete your profile setup">
      <SetupWizardContent />
    </MemberProtectedRoute>
  );
}
