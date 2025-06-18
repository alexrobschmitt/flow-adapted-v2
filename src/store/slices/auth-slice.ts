import { StateCreator } from "zustand";
import { AppStore } from "../index";

// Tipos para o estado de autenticação
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  emailVerified?: boolean;
  hasFlowConfig: boolean;
  cognitiveProfile: string;
  needsOnboarding?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  lastLoginAt: Date | null;
  sessionExpiry: Date | null;
}

export interface AuthActions {
  // Ações básicas de autenticação
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Ações de sessão
  refreshSession: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<AuthUser>) => Promise<void>;

  // Ações de perfil
  updateCognitiveProfile: (profile: string) => Promise<void>;

  // Ações de onboarding
  completeOnboarding: () => Promise<void>;

  // Ações de configuração Flow
  setFlowConfigStatus: (hasConfig: boolean) => void;

  // Utilitários
  isSessionValid: () => boolean;
  getTimeUntilExpiry: () => number;
}

export interface AuthSlice {
  auth: AuthState;
  authActions: AuthActions;
}

// Implementação do slice
export const createAuthSlice: StateCreator<
  AppStore,
  [["zustand/immer", never], ["zustand/devtools", never]],
  [],
  AuthSlice
> = (set, get) => ({
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    lastLoginAt: null,
    sessionExpiry: null,
  },

  authActions: {
    setUser: (user) =>
      set((state) => {
        state.auth.user = user;
        state.auth.isAuthenticated = !!user;
        state.auth.isLoading = false;
        state.auth.error = null;

        if (user) {
          state.auth.lastLoginAt = new Date();
          // Sessão expira em 7 dias
          state.auth.sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        } else {
          state.auth.lastLoginAt = null;
          state.auth.sessionExpiry = null;
        }
      }),

    setLoading: (loading) =>
      set((state) => {
        state.auth.isLoading = loading;
      }),

    setError: (error) =>
      set((state) => {
        state.auth.error = error;
        state.auth.isLoading = false;
      }),

    clearError: () =>
      set((state) => {
        state.auth.error = null;
      }),

    refreshSession: async () => {
      try {
        set((state) => {
          state.auth.isLoading = true;
          state.auth.error = null;
        });

        // TODO: Implementar refresh de sessão com Firebase
        // Por agora, usar localStorage como fallback
        const storedUser = localStorage.getItem('flow-auth-user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          get().authActions.setUser(user);
        } else {
          get().authActions.setUser(null);
        }
      } catch (error) {
        console.error("Error refreshing session:", error);
        get().authActions.setError(error instanceof Error ? error.message : "Failed to refresh session");
      }
    },

    signOut: async () => {
      try {
        set((state) => {
          state.auth.isLoading = true;
          state.auth.error = null;
        });

        // Fazer logout no Firebase
        const { logOut } = await import('@/lib/firebase/auth');
        await logOut();

        // Limpar todo o estado da aplicação
        set((state) => {
          // Limpar auth
          state.auth.user = null;
          state.auth.isAuthenticated = false;
          state.auth.isLoading = false;
          state.auth.error = null;
          state.auth.lastLoginAt = null;
          state.auth.sessionExpiry = null;

          // Limpar chat
          if (state.chat) {
            state.chat.activeChatId = null;
            state.chat.activeChat = null;
            state.chat.chats = [];
            state.chat.messages = [];
          }
        });

        // Limpar localStorage
        if (typeof window !== "undefined") {
          try {
            localStorage.removeItem("flow-adapted-store");
            localStorage.removeItem("flow-auth-user");
            sessionStorage.clear();
          } catch (error) {
            console.warn("Error clearing storage:", error);
          }
        }

        // Redirecionar para login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error during sign out:", error);
        get().authActions.setError(error instanceof Error ? error.message : "Failed to sign out");
      }
    },

    updateUserProfile: async (updates) => {
      try {
        const currentUser = get().auth.user;
        if (!currentUser) {
          throw new Error("No user logged in");
        }

        set((state) => {
          state.auth.isLoading = true;
          state.auth.error = null;
        });

        // TODO: Implementar API de update de perfil
        // Por agora, atualizar localmente
        set((state) => {
          if (state.auth.user) {
            Object.assign(state.auth.user, updates);
            state.auth.user.updatedAt = new Date();
          }
          state.auth.isLoading = false;
        });

        // Salvar no localStorage
        if (typeof window !== "undefined") {
          const updatedUser = get().auth.user;
          localStorage.setItem('flow-auth-user', JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error("Error updating user profile:", error);
        get().authActions.setError(error instanceof Error ? error.message : "Failed to update profile");
      }
    },

    updateCognitiveProfile: async (profile) => {
      try {
        await get().authActions.updateUserProfile({
          cognitiveProfile: profile,
        });
      } catch (error) {
        console.error("Error updating cognitive profile:", error);
        throw error;
      }
    },

    completeOnboarding: async () => {
      try {
        await get().authActions.updateUserProfile({
          needsOnboarding: false,
        });
      } catch (error) {
        console.error("Error completing onboarding:", error);
        throw error;
      }
    },

    setFlowConfigStatus: (hasConfig) =>
      set((state) => {
        if (state.auth.user) {
          state.auth.user.hasFlowConfig = hasConfig;
          state.auth.user.updatedAt = new Date();
        }
      }),

    isSessionValid: () => {
      const { sessionExpiry } = get().auth;
      if (!sessionExpiry) return false;
      return new Date() < sessionExpiry;
    },

    getTimeUntilExpiry: () => {
      const { sessionExpiry } = get().auth;
      if (!sessionExpiry) return 0;
      return Math.max(0, sessionExpiry.getTime() - Date.now());
    },
  },
});

// Constantes
export const AUTH_CONSTANTS = {
  SESSION_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 dias em ms
  REFRESH_THRESHOLD: 24 * 60 * 60 * 1000, // 24 horas em ms
  DEFAULT_COGNITIVE_PROFILE: "default",
  STORAGE_KEY: "flow-adapted-auth",
} as const;