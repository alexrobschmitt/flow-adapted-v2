"use client";

import { Sparkles, Brain } from "lucide-react";
import { useCognitiveProfile } from "@/hooks/use-cognitive-profile";
import { useCognitiveTheme } from "@/components/cognitive-theme-provider";
import type { CognitiveProfile } from "@/types/cognitive";

export function WelcomeSection() {
  const { icon: Icon, profile } = useCognitiveProfile();
  const { setProfile } = useCognitiveTheme();

  // Fallback para evitar erro de hidratação
  const SafeIcon = Icon || Brain;

  const handleProfileClick = (newProfile: CognitiveProfile) => {
    setProfile(newProfile);
  };

  return (
    <div className="bg-primary relative hidden overflow-y-auto lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
      <div className="max-w-md space-y-6 text-center">
        <div className="relative">
          <SafeIcon className="text-primary-foreground mx-auto size-16" />
          <Sparkles className="absolute -top-2 -right-2 h-6 w-6 animate-pulse text-yellow-300" />
        </div>

        <div className="space-y-4">
          <h1 className="text-primary-foreground text-4xl font-light">Bem-vindo ao FlowEd</h1>
          <p className="text-primary-foreground/80 text-lg">
            Sua plataforma de IA que se adapta ao seu perfil cognitivo único para uma experiência
            personalizada no Flow Adapted.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-primary-foreground/90 text-sm font-medium">Perfis Cognitivos Suportados</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleProfileClick("adhd")}
              className={`bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30 rounded-full border px-3 py-1 text-sm transition-colors cursor-pointer ${profile === "adhd" ? "ring-2 ring-primary-foreground/50" : ""}`}
            >
              🧠 TDAH
            </button>
            <button
              onClick={() => handleProfileClick("autism")}
              className={`bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30 rounded-full border px-3 py-1 text-sm transition-colors cursor-pointer ${profile === "autism" ? "ring-2 ring-primary-foreground/50" : ""}`}
            >
              💙 Autismo
            </button>
            <button
              onClick={() => handleProfileClick("dyslexia")}
              className={`bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30 rounded-full border px-3 py-1 text-sm transition-colors cursor-pointer ${profile === "dyslexia" ? "ring-2 ring-primary-foreground/50" : ""}`}
            >
              👁️ Dislexia
            </button>
            <button
              onClick={() => handleProfileClick("default")}
              className={`bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30 rounded-full border px-3 py-1 text-sm transition-colors cursor-pointer ${profile === "default" ? "ring-2 ring-primary-foreground/50" : ""}`}
            >
              ⚖️ Padrão
            </button>
          </div>
        </div>

        <div className="text-primary-foreground/70 mt-8 space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
            <span>Personalização automática baseada no seu perfil</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400"></div>
            <span>Interface adaptativa para melhor acessibilidade</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-purple-400"></div>
            <span>IA contextual que entende suas necessidades</span>
          </div>
        </div>
      </div>
    </div>
  );
}
