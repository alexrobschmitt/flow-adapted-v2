/**
 * Configuração principal da aplicação
 */
export const APP_CONFIG = {
  name: "Flow Adapted",
  description: "Assistente de IA adaptado para diferentes perfis cognitivos",
  version: "2.0.0",
  author: "Flow Adapted Team",
  url: "https://flow-adapted.vercel.app",
  
  // Metadados para SEO
  metadata: {
    title: "Flow Adapted - IA Cognitivamente Adaptada",
    description: "Assistente de IA que se adapta ao seu perfil cognitivo para uma experiência personalizada",
    keywords: ["IA", "Assistente", "TDAH", "Autismo", "Dislexia", "Acessibilidade", "Cognitivo"],
    ogImage: "/og-image.png",
    twitterCard: "summary_large_image",
  },

  // Configurações de tema
  theme: {
    defaultMode: "light" as "light" | "dark" | "system",
    defaultCognitiveProfile: "default" as const,
  },

  // Configurações do Firebase
  firebase: {
    projectId: "flow-adapted",
    collections: {
      users: "users",
      chats: "chats",
      messages: "messages",
      activityLog: "activityLog",
    },
  },

  // Configurações de UI
  ui: {
    sidebar: {
      defaultCollapsed: false,
    },
    chat: {
      maxMessages: 100,
      autoScroll: true,
    },
  },

  // Links importantes
  links: {
    github: "https://github.com/flow-adapted",
    documentation: "https://docs.flow-adapted.com",
    support: "mailto:support@flow-adapted.com",
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
