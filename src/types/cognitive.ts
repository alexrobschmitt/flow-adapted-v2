import { LucideIcon } from "lucide-react";

export type CognitiveProfile = "default" | "adhd" | "autism" | "dyslexia";

export interface QuickAction {
  readonly id: string;
  readonly label: string;
  readonly icon: LucideIcon;
  readonly prompt: string;
  readonly cognitiveProfiles: CognitiveProfile[];
  readonly description: string;
}

export interface CognitiveProfileConfig {
  readonly id: CognitiveProfile;
  readonly name: string;
  readonly icon: LucideIcon;
  readonly color: string;
  readonly description: string;
}

export interface GreetingConfig {
  readonly morning: string;
  readonly afternoon: string;
  readonly evening: string;
}
