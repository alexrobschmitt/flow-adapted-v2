import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createAuthSlice, type AuthSlice } from "./slices/auth-slice";
import { createChatSlice, type ChatSlice } from "./slices/chat-slice";

// Tipo combinado do store
export interface AppStore extends AuthSlice, ChatSlice {}

// Criar store principal
export const useAppStore = create<AppStore>()(
  devtools(
    immer((...args) => ({
      ...createAuthSlice(...args),
      ...createChatSlice(...args),
    })),
    {
      name: "flow-adapted-store",
    },
  ),
);

// Hooks específicos para cada slice

// Auth hooks
export const useAuth = () => useAppStore((state) => state.auth);
export const useAuthActions = () => useAppStore((state) => state.authActions);
export const useAuthUser = () => useAppStore((state) => state.auth.user);
export const useIsAuthenticated = () => useAppStore((state) => state.auth.isAuthenticated);
export const useAuthLoading = () => useAppStore((state) => state.auth.isLoading);
export const useAuthError = () => useAppStore((state) => state.auth.error);
export const useHasFlowConfig = () => useAppStore((state) => state.auth.user?.hasFlowConfig ?? false);
export const useNeedsOnboarding = () => useAppStore((state) => state.auth.user?.needsOnboarding ?? false);

// Chat hooks
export const useChat = () => useAppStore((state) => state.chat);
export const useChatActions = () => useAppStore((state) => state.chatActions);
export const useChats = () => useAppStore((state) => state.chat.chats);
export const useActiveChat = () => useAppStore((state) => state.chat.activeChat);
export const useActiveChatId = () => useAppStore((state) => state.chat.activeChatId);
export const useMessages = () => useAppStore((state) => state.chat.messages);
export const useChatLoading = () => useAppStore((state) => state.chat.isLoading);

// Hooks compostos para compatibilidade
export const useAuthStatus = () => {
  const auth = useAuth();
  return {
    isAuthenticated: auth.isAuthenticated,
    hasFlowConfig: auth.user?.hasFlowConfig ?? false,
    loading: auth.isLoading,
    user: auth.user,
  };
};

// Hook para resetar todo o store
export const useResetStore = () => {
  return useAppStore((state) => ({
    resetAuth: () => state.authActions.signOut(),
    resetChat: () => state.chatActions.clearChats(),
  }));
};

// Tipos exportados
export type { AuthUser, AuthState, AuthActions } from "./slices/auth-slice";
export type { ChatState, ChatActions, Chat, Message } from "./slices/chat-slice";