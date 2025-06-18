import { useCallback } from "react";
import { useAppStore } from "./index";
import type { AppStore } from "./index";

// Auth selectors otimizados
export const useAuthUser = () => 
  useAppStore(useCallback((state: AppStore) => state.auth.user, []));

export const useIsAuthenticated = () => 
  useAppStore(useCallback((state: AppStore) => state.auth.isAuthenticated, []));

export const useAuthLoading = () => 
  useAppStore(useCallback((state: AppStore) => state.auth.isLoading, []));

export const useAuthError = () => 
  useAppStore(useCallback((state: AppStore) => state.auth.error, []));

export const useCognitiveProfile = () => 
  useAppStore(useCallback((state: AppStore) => state.auth.user?.cognitiveProfile || "default", []));

// Chat selectors otimizados
export const useChats = () => 
  useAppStore(useCallback((state: AppStore) => state.chat.chats, []));

export const useActiveChat = () => 
  useAppStore(useCallback((state: AppStore) => state.chat.activeChat, []));

export const useActiveChatId = () => 
  useAppStore(useCallback((state: AppStore) => state.chat.activeChatId, []));

export const useMessages = () => 
  useAppStore(useCallback((state: AppStore) => state.chat.messages, []));

export const useChatLoading = () => 
  useAppStore(useCallback((state: AppStore) => state.chat.isLoading, []));

export const useChatError = () => 
  useAppStore(useCallback((state: AppStore) => state.chat.error, []));

// Selectors compostos
export const useAppStatus = () =>
  useAppStore(useCallback((state: AppStore) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading || state.chat.isLoading,
    hasError: !!(state.auth.error || state.chat.error),
    errors: {
      auth: state.auth.error,
      chat: state.chat.error,
    },
  }), []));

export const useCurrentSession = () =>
  useAppStore(useCallback((state: AppStore) => ({
    user: state.auth.user,
    activeChat: state.chat.activeChat,
    activeChatId: state.chat.activeChatId,
    messages: state.chat.messages,
    isAuthenticated: state.auth.isAuthenticated,
  }), []));

export const useChatSummary = () =>
  useAppStore(useCallback((state: AppStore) => ({
    totalChats: state.chat.chats.length,
    pinnedChats: state.chat.chats.filter(chat => chat.pinned).length,
    recentChats: state.chat.chats.slice(0, 5),
    hasActiveChat: !!state.chat.activeChatId,
  }), []));

export const useSessionStatus = () =>
  useAppStore(useCallback((state: AppStore) => {
    const user = state.auth.user;
    const sessionExpiry = state.auth.sessionExpiry;
    const now = new Date();
    
    return {
      hasUser: !!user,
      hasFlowConfig: user?.hasFlowConfig ?? false,
      needsOnboarding: user?.needsOnboarding ?? false,
      isSessionValid: sessionExpiry ? now < sessionExpiry : false,
      timeUntilExpiry: sessionExpiry ? Math.max(0, sessionExpiry.getTime() - now.getTime()) : 0,
      cognitiveProfile: user?.cognitiveProfile || "default",
    };
  }, []));

// Selectors específicos para performance
export const usePinnedChats = () =>
  useAppStore(useCallback((state: AppStore) => 
    state.chat.chats.filter(chat => chat.pinned), []));

export const useUnpinnedChats = () =>
  useAppStore(useCallback((state: AppStore) => 
    state.chat.chats.filter(chat => !chat.pinned), []));

export const useRecentMessages = (limit: number = 10) =>
  useAppStore(useCallback((state: AppStore) => 
    state.chat.messages.slice(-limit), [limit]));

export const useMessagesByType = (type: string) =>
  useAppStore(useCallback((state: AppStore) => 
    state.chat.messages.filter(message => message.type === type), [type]));

// Selector para verificar se há dados carregados
export const useHasData = () =>
  useAppStore(useCallback((state: AppStore) => ({
    hasChats: state.chat.chats.length > 0,
    hasMessages: state.chat.messages.length > 0,
    hasUser: !!state.auth.user,
  }), []));

// Selector para estatísticas
export const useAppStats = () =>
  useAppStore(useCallback((state: AppStore) => {
    const totalMessages = state.chat.messages.length;
    const userMessages = state.chat.messages.filter(m => m.senderId === state.auth.user?.id).length;
    const recentActivity = state.chat.chats.filter(chat => {
      const updatedAt = chat.updatedAt instanceof Date ? chat.updatedAt : new Date(chat.updatedAt);
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return updatedAt > dayAgo;
    }).length;

    return {
      totalChats: state.chat.chats.length,
      totalMessages,
      userMessages,
      recentActivity,
      messageRatio: totalMessages > 0 ? userMessages / totalMessages : 0,
    };
  }, []));