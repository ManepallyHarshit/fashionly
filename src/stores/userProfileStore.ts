import { create } from 'zustand';

export interface UserProfileData {
  // Identity
  email?: string;
  passwordVault?: string;
  
  // Physique
  height?: number; // in cm
  weight?: number; // in kg
  build?: 'slim' | 'athletic' | 'average' | 'muscular' | 'curvy';
  goldenRatioProportions?: {
    shoulderWidth?: number;
    chestWidth?: number;
    waistWidth?: number;
    hipWidth?: number;
  };
  
  // Skin Tone
  skinToneHex?: string;
  skinTone?: 'fair' | 'light' | 'medium' | 'olive' | 'deep' | 'rich';
  undertone?: 'warm' | 'cool' | 'neutral';
  suggestedPalette?: string[];
  
  // Style Persona
  stylePersona?: 'minimalist' | 'avant-garde' | 'eclectic';
  
  // Metadata
  completedSteps?: number;
  setupCompleted?: boolean;
  lastUpdated?: Date;
}

interface UserProfileStore {
  profile: UserProfileData;
  setProfile: (data: Partial<UserProfileData>) => void;
  updateIdentity: (email: string, passwordVault: string) => void;
  updatePhysique: (height: number, weight: number, build: string) => void;
  calculateGoldenRatio: (height: number, weight: number, build: string) => void;
  updateSkinTone: (hex: string, tone: string, undertone: string) => void;
  generatePalette: (hex: string, undertone: string) => void;
  updateStylePersona: (persona: string) => void;
  completeSetup: () => void;
  resetProfile: () => void;
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  profile: {
    completedSteps: 0,
    setupCompleted: false,
  },

  setProfile: (data) =>
    set((state) => ({
      profile: { ...state.profile, ...data, lastUpdated: new Date() },
    })),

  updateIdentity: (email, passwordVault) =>
    set((state) => ({
      profile: {
        ...state.profile,
        email,
        passwordVault,
        completedSteps: Math.max(state.profile.completedSteps || 0, 1),
        lastUpdated: new Date(),
      },
    })),

  updatePhysique: (height, weight, build) =>
    set((state) => ({
      profile: {
        ...state.profile,
        height,
        weight,
        build: build as any,
        completedSteps: Math.max(state.profile.completedSteps || 0, 2),
        lastUpdated: new Date(),
      },
    })),

  calculateGoldenRatio: (height, weight, build) => {
    // Golden ratio calculations for garment proportions
    const shoulderWidth = height * 0.26; // ~26% of height
    const chestWidth = height * 0.25; // ~25% of height
    const waistWidth = height * 0.18; // ~18% of height
    const hipWidth = height * 0.22; // ~22% of height

    set((state) => ({
      profile: {
        ...state.profile,
        goldenRatioProportions: {
          shoulderWidth,
          chestWidth,
          waistWidth,
          hipWidth,
        },
        lastUpdated: new Date(),
      },
    }));
  },

  updateSkinTone: (hex, tone, undertone) =>
    set((state) => ({
      profile: {
        ...state.profile,
        skinToneHex: hex,
        skinTone: tone as any,
        undertone: undertone as any,
        completedSteps: Math.max(state.profile.completedSteps || 0, 3),
        lastUpdated: new Date(),
      },
    })),

  generatePalette: (hex, undertone) => {
    // Generate color palette based on skin tone and undertone
    const baseColor = hex;
    const palette: string[] = [baseColor];

    // Generate complementary and analogous colors
    if (undertone === 'warm') {
      palette.push('#D4A574', '#C9956A', '#B8860B', '#DAA520');
    } else if (undertone === 'cool') {
      palette.push('#B0C4DE', '#A9A9A9', '#708090', '#778899');
    } else {
      palette.push('#CD853F', '#DEB887', '#F5DEB3', '#D2B48C');
    }

    set((state) => ({
      profile: {
        ...state.profile,
        suggestedPalette: palette,
        lastUpdated: new Date(),
      },
    }));
  },

  updateStylePersona: (persona) =>
    set((state) => ({
      profile: {
        ...state.profile,
        stylePersona: persona as any,
        completedSteps: Math.max(state.profile.completedSteps || 0, 4),
        lastUpdated: new Date(),
      },
    })),

  completeSetup: () =>
    set((state) => ({
      profile: {
        ...state.profile,
        setupCompleted: true,
        completedSteps: 4,
        lastUpdated: new Date(),
      },
    })),

  resetProfile: () =>
    set({
      profile: {
        completedSteps: 0,
        setupCompleted: false,
      },
    }),
}));
