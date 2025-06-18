import { Brain, Zap, Heart, Eye } from "lucide-react";
import type { CognitiveProfile, CognitiveProfileConfig } from "@/types/cognitive";

/**
 * Configurações dos perfis cognitivos
 */
export const COGNITIVE_PROFILES: Record<CognitiveProfile, CognitiveProfileConfig> = {
  default: {
    id: "default",
    name: "Padrão",
    icon: Brain,
    color: "#3b82f6",
    description: "Modo padrão",
  },
  adhd: {
    id: "adhd",
    name: "TDAH",
    icon: Zap,
    color: "#ea580c",
    description: "Otimizado para TDAH - Respostas diretas e organizadas",
  },
  autism: {
    id: "autism",
    name: "Autismo",
    icon: Heart,
    color: "#3b82f6",
    description: "Otimizado para Autismo - Estrutura calma e cores serenas",
  },
  dyslexia: {
    id: "dyslexia",
    name: "Dislexia",
    icon: Eye,
    color: "#ca8a04",
    description: "Otimizado para Dislexia - Linguagem simples e clara",
  },
};

/**
 * Obtém a configuração de um perfil cognitivo
 */
export function getCognitiveProfileConfig(profile: CognitiveProfile): CognitiveProfileConfig {
  return COGNITIVE_PROFILES[profile] || COGNITIVE_PROFILES.default;
}
