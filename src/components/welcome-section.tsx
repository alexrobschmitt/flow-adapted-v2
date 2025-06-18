"use client";

import { Sparkles, Brain } from "lucide-react";
import { useCognitiveProfile } from "@/hooks/use-cognitive-profile";

export function WelcomeSection() {
  const { icon: Icon, color: profileColor } = useCognitiveProfile();

  // Fallback para evitar erro de hidratação
  const SafeIcon = Icon || Brain;
  const safeColor = profileColor || "#3b82f6";

  return (
    <div
      className="relative overflow-y-auto flex flex-col items-center justify-center p-6 lg:p-12"
      style={{ backgroundColor: safeColor }}
    >
      <div className="max-w-md space-y-6 text-center">
        {/* Ícone principal com animação */}
        <div className="relative">
          <SafeIcon className="text-white mx-auto size-16" />
          <Sparkles className="absolute -top-2 -right-2 h-6 w-6 animate-pulse text-yellow-300" />
        </div>

        {/* Título e descrição */}
        <div className="space-y-4">
          <h1 className="text-white text-4xl font-light">Bem-vindo ao FlowEd</h1>
          <p className="text-white/80 text-lg">
            Sua plataforma de IA que se adapta ao seu perfil cognitivo único para uma experiência de aprendizagem
            personalizada no Flow Adapted.
          </p>
        </div>

        {/* Badges dos perfis */}
        <div className="space-y-4">
          <h3 className="text-white/90 text-sm font-medium">Perfis Cognitivos Suportados</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <div className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-full border px-3 py-1 text-sm transition-colors">
              🧠 TDAH
            </div>
            <div className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-full border px-3 py-1 text-sm transition-colors">
              💙 Autismo
            </div>
            <div className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-full border px-3 py-1 text-sm transition-colors">
              👁️ Dislexia
            </div>
            <div className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-full border px-3 py-1 text-sm transition-colors">
              ⚖️ Padrão
            </div>
          </div>
        </div>

        {/* Recursos em destaque */}
        <div className="text-white/70 mt-8 space-y-3 text-sm">
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
