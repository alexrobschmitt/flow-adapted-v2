import { useMemo } from "react";
import type { CognitiveProfile, GreetingConfig } from "@/types/cognitive";

/**
 * Configurações de saudação para cada perfil cognitivo
 */
const GREETINGS: Record<CognitiveProfile, GreetingConfig> = {
  default: {
    morning: "Bom dia! Como posso ajudar você hoje?",
    afternoon: "Boa tarde! Pronto para uma conversa produtiva?",
    evening: "Boa noite! Vamos trabalhar juntos?",
  },
  adhd: {
    morning: "Bom dia! Vamos focar no que é importante hoje?",
    afternoon: "Boa tarde! Que tal organizarmos suas ideias?",
    evening: "Boa noite! Vamos transformar seus pensamentos em ação?",
  },
  autism: {
    morning: "Bom dia! Estou aqui para uma conversa clara e estruturada.",
    afternoon: "Boa tarde! Vamos conversar de forma organizada?",
    evening: "Boa noite! Pronto para uma interação calma e focada?",
  },
  dyslexia: {
    morning: "Bom dia! Vamos conversar de forma simples e clara?",
    afternoon: "Boa tarde! Estou aqui para ajudar com palavras fáceis.",
    evening: "Boa noite! Vamos usar uma linguagem clara e direta?",
  },
};

/**
 * Hook para obter saudação baseada no horário e perfil cognitivo
 */
export function useGreeting(profile: CognitiveProfile = "default") {
  const greeting = useMemo(() => {
    const now = new Date();
    const hour = now.getHours();
    
    const greetingConfig = GREETINGS[profile] || GREETINGS.default;
    
    if (hour >= 5 && hour < 12) {
      return greetingConfig.morning;
    } else if (hour >= 12 && hour < 18) {
      return greetingConfig.afternoon;
    } else {
      return greetingConfig.evening;
    }
  }, [profile]);
  
  const timeOfDay = useMemo(() => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 5 && hour < 12) {
      return "morning";
    } else if (hour >= 12 && hour < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  }, []);
  
  return {
    greeting,
    timeOfDay,
  };
}
