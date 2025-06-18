"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import type { CognitiveProfile } from "@/types/cognitive";

export type { CognitiveProfile };

interface CognitiveThemeContextType {
  profile: CognitiveProfile;
  setProfile: (profile: CognitiveProfile) => void;
  isDyslexiaFont: boolean;
  setIsDyslexiaFont: (enabled: boolean) => void;
}

const CognitiveThemeContext = createContext<CognitiveThemeContextType | undefined>(undefined);

interface CognitiveThemeProviderProps {
  children: React.ReactNode;
}

export function CognitiveThemeProvider({ children }: CognitiveThemeProviderProps) {
  const [profile, setProfileState] = useState<CognitiveProfile>("default");
  const [isDyslexiaFont, setIsDyslexiaFontState] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Carregar preferências do localStorage na inicialização
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const savedProfile = localStorage.getItem("cognitive-profile") as CognitiveProfile;
        const savedFont = localStorage.getItem("dyslexia-font") === "true";
        
        const validProfiles: CognitiveProfile[] = ["default", "adhd", "autism", "dyslexia"];
        
        if (savedProfile && validProfiles.includes(savedProfile)) {
          setProfileState(savedProfile);
        }
        
        setIsDyslexiaFontState(savedFont);
      }
    } catch (error) {
      console.warn("Erro ao carregar preferências cognitivas:", error);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    // Aplicar classe CSS do perfil cognitivo
    const root = document.documentElement;

    // Remover classes existentes
    root.classList.remove("cognitive-adhd", "cognitive-autism", "cognitive-dyslexia", "cognitive-default");

    // Aplicar nova classe
    root.classList.add(`cognitive-${profile}`);

    // Aplicar fonte Lexend otimizada se ativada
    if (isDyslexiaFont) {
      root.classList.add("dyslexia-font");
    } else {
      root.classList.remove("dyslexia-font");
    }

    // Salvar no localStorage
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("cognitive-profile", profile);
        localStorage.setItem("dyslexia-font", isDyslexiaFont.toString());
      }
    } catch (error) {
      console.warn("Erro ao salvar preferências cognitivas:", error);
    }
  }, [profile, isDyslexiaFont]);

  const setProfile = (newProfile: CognitiveProfile) => {
    setProfileState(newProfile);
  };

  const setIsDyslexiaFont = (enabled: boolean) => {
    setIsDyslexiaFontState(enabled);
  };

  const value = useMemo(
    () => ({
      profile: mounted ? profile : "default",
      setProfile,
      isDyslexiaFont: mounted ? isDyslexiaFont : false,
      setIsDyslexiaFont,
    }),
    [profile, isDyslexiaFont, mounted]
  );

  return (
    <CognitiveThemeContext.Provider value={value}>
      {children}
    </CognitiveThemeContext.Provider>
  );
}

export function useCognitiveTheme() {
  const context = useContext(CognitiveThemeContext);
  if (context === undefined) {
    throw new Error("useCognitiveTheme must be used within a CognitiveThemeProvider");
  }
  return context;
}
