"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import type { CognitiveProfile } from "@/types/cognitive";

export type { CognitiveProfile };

interface CognitiveThemeContextType {
  profile: CognitiveProfile;
  setProfile: (profile: CognitiveProfile) => void;
}

const CognitiveThemeContext = createContext<CognitiveThemeContextType | undefined>(undefined);

interface CognitiveThemeProviderProps {
  children: React.ReactNode;
}

export function CognitiveThemeProvider({ children }: CognitiveThemeProviderProps) {
  const [profile, setProfileState] = useState<CognitiveProfile>("default");
  const [mounted, setMounted] = useState(false);

  // Carregar preferências do localStorage na inicialização
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const savedProfile = localStorage.getItem("cognitive-profile") as CognitiveProfile;

        const validProfiles: CognitiveProfile[] = ["default", "adhd", "autism", "dyslexia"];

        if (savedProfile && validProfiles.includes(savedProfile)) {
          setProfileState(savedProfile);
        }
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

    // Salvar no localStorage
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("cognitive-profile", profile);
      }
    } catch (error) {
      console.warn("Erro ao salvar preferências cognitivas:", error);
    }
  }, [profile]);

  const setProfile = (newProfile: CognitiveProfile) => {
    setProfileState(newProfile);
  };

  const value = useMemo(
    () => ({
      profile: mounted ? profile : "default",
      setProfile,
    }),
    [profile, mounted]
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
