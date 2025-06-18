import { 
  MessageSquare, 
  Lightbulb, 
  BookOpen, 
  Target, 
  Brain, 
  Zap, 
  Heart, 
  Eye,
  CheckSquare,
  Calendar,
  FileText,
  Sparkles
} from "lucide-react";
import type { QuickAction, CognitiveProfile } from "@/types/cognitive";

/**
 * Configuração de ações rápidas para cada perfil cognitivo
 */
export const QUICK_ACTIONS: QuickAction[] = [
  // Ações gerais (todos os perfis)
  {
    id: "general-chat",
    label: "Conversa Geral",
    icon: MessageSquare,
    prompt: "Vamos conversar! Como posso ajudar você hoje?",
    cognitiveProfiles: ["default", "adhd", "autism", "dyslexia"],
    description: "Iniciar uma conversa geral",
  },
  {
    id: "brainstorm",
    label: "Brainstorm",
    icon: Lightbulb,
    prompt: "Vamos fazer um brainstorm! Sobre qual tópico você gostaria de gerar ideias?",
    cognitiveProfiles: ["default", "adhd", "autism", "dyslexia"],
    description: "Gerar ideias e soluções criativas",
  },
  {
    id: "explain-concept",
    label: "Explicar Conceito",
    icon: BookOpen,
    prompt: "Qual conceito você gostaria que eu explicasse de forma clara e didática?",
    cognitiveProfiles: ["default", "adhd", "autism", "dyslexia"],
    description: "Explicação clara de conceitos complexos",
  },

  // Ações específicas para ADHD
  {
    id: "adhd-focus",
    label: "Foco e Organização",
    icon: Target,
    prompt: "Vamos organizar suas tarefas e criar um plano de foco! O que você precisa fazer hoje?",
    cognitiveProfiles: ["adhd"],
    description: "Ajuda com foco e organização de tarefas",
  },
  {
    id: "adhd-energy",
    label: "Canalizar Energia",
    icon: Zap,
    prompt: "Vamos canalizar sua energia de forma produtiva! Que projeto ou atividade te empolga?",
    cognitiveProfiles: ["adhd"],
    description: "Transformar energia em produtividade",
  },
  {
    id: "adhd-checklist",
    label: "Lista de Tarefas",
    icon: CheckSquare,
    prompt: "Vamos criar uma lista de tarefas organizada e prática! Quais são suas prioridades?",
    cognitiveProfiles: ["adhd"],
    description: "Criar listas organizadas e práticas",
  },

  // Ações específicas para Autismo
  {
    id: "autism-structure",
    label: "Estrutura e Rotina",
    icon: Calendar,
    prompt: "Vamos criar uma estrutura clara para sua atividade. Qual é o objetivo que você quer alcançar?",
    cognitiveProfiles: ["autism"],
    description: "Criar estruturas e rotinas claras",
  },
  {
    id: "autism-detailed",
    label: "Análise Detalhada",
    icon: Brain,
    prompt: "Vamos analisar este tópico de forma detalhada e sistemática. Sobre o que você gostaria de saber mais?",
    cognitiveProfiles: ["autism"],
    description: "Análise profunda e sistemática",
  },
  {
    id: "autism-calm",
    label: "Conversa Calma",
    icon: Heart,
    prompt: "Vamos ter uma conversa calma e organizada. Qual assunto você gostaria de explorar?",
    cognitiveProfiles: ["autism"],
    description: "Interação calma e estruturada",
  },

  // Ações específicas para Dislexia
  {
    id: "dyslexia-simple",
    label: "Linguagem Simples",
    icon: Eye,
    prompt: "Vou usar palavras simples e claras. O que você gostaria de saber?",
    cognitiveProfiles: ["dyslexia"],
    description: "Comunicação com linguagem simplificada",
  },
  {
    id: "dyslexia-summary",
    label: "Resumo Claro",
    icon: FileText,
    prompt: "Vou criar um resumo claro e direto. Sobre qual tópico você precisa de um resumo?",
    cognitiveProfiles: ["dyslexia"],
    description: "Resumos claros e objetivos",
  },
  {
    id: "dyslexia-visual",
    label: "Explicação Visual",
    icon: Sparkles,
    prompt: "Vou explicar de forma visual e prática. Qual conceito você gostaria que eu explicasse?",
    cognitiveProfiles: ["dyslexia"],
    description: "Explicações visuais e práticas",
  },
];

/**
 * Obtém ações rápidas filtradas por perfil cognitivo
 */
export function getQuickActionsForProfile(profile: CognitiveProfile): QuickAction[] {
  return QUICK_ACTIONS.filter(action => 
    action.cognitiveProfiles.includes(profile)
  );
}

/**
 * Obtém uma ação rápida específica por ID
 */
export function getQuickActionById(id: string): QuickAction | undefined {
  return QUICK_ACTIONS.find(action => action.id === id);
}
