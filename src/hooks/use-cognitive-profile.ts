import { useMemo } from "react";

import { useCognitiveTheme } from "@/components/cognitive-theme-provider";
import { getCognitiveProfileConfig } from "@/config/cognitive-profiles";
import type { CognitiveProfileConfig } from "@/types/cognitive";

/**
 * Hook para gerenciar dados do perfil cognitivo atual
 */
export function useCognitiveProfile() {
  const { profile } = useCognitiveTheme();

  const profileConfig: CognitiveProfileConfig = useMemo(() => {
    return getCognitiveProfileConfig(profile);
  }, [profile]);

  return {
    profile,
    profileConfig,
    icon: profileConfig.icon,
    color: profileConfig.color,
    description: profileConfig.description,
  };
}
