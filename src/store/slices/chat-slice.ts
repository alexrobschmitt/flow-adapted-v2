import { StateCreator } from "zustand";
import { AppStore } from "../index";

// Tipos para o chat
export interface Chat {
  id: string;
  title: string;
  createdBy: string;
  createdAt: Date | any;
  updatedAt: Date | any;
  participants: string[];
  pinned: boolean;
}

export interface Message {
  id: string;
  content: string;
  type: string;
  senderId: string;
  createdAt: Date | any;
  reactions: Record<string, any>;
}

export interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  activeChatId: string | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  lastMessageId: string | null;
}

export interface ChatActions {
  // Chat operations
  loadChats: (userId: string) => Promise<void>;
  createNewChat: (userId: string, title: string) => Promise<string>;
  updateTitle: (chatId: string, title: string) => Promise<void>;
  removeChat: (chatId: string) => Promise<void>;
  togglePinChat: (chatId: string, pinned: boolean) => Promise<void>;
  setActiveChat: (chatId: string | null) => void;
  clearChats: () => void;

  // Message operations
  loadMessages: (chatId: string, reset?: boolean) => Promise<void>;
  loadMoreMessages: () => Promise<void>;
  sendNewMessage: (chatId: string, userId: string, content: string, type?: string) => Promise<void>;
  removeMessage: (chatId: string, messageId: string) => Promise<void>;

  // Error handling
  clearError: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;

  // Set data directly (used by listeners)
  setMessages: (messages: Message[]) => void;
  setChats: (chats: Chat[]) => void;
}

export interface ChatSlice {
  chat: ChatState;
  chatActions: ChatActions;
}

// Implementação do slice
export const createChatSlice: StateCreator<
  AppStore,
  [["zustand/immer", never], ["zustand/devtools", never]],
  [],
  ChatSlice
> = (set, get) => ({
  chat: {
    chats: [],
    activeChat: null,
    activeChatId: null,
    messages: [],
    isLoading: false,
    error: null,
    hasMore: true,
    lastMessageId: null,
  },

  chatActions: {
    loadChats: async (userId) => {
      set((state) => {
        state.chat.isLoading = true;
        state.chat.error = null;
      });

      try {
        // TODO: Implementar carregamento de chats do Firebase
        // Por agora, usar dados mock
        const mockChats: Chat[] = [
          {
            id: "1",
            title: "Chat de Exemplo",
            createdBy: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            participants: [userId],
            pinned: false,
          },
        ];

        set((state) => {
          state.chat.chats = mockChats;
          state.chat.isLoading = false;
        });
      } catch (error: any) {
        set((state) => {
          state.chat.error = error.message || "An error occurred while loading chats";
          state.chat.isLoading = false;
        });
      }
    },

    createNewChat: async (userId, title) => {
      set((state) => {
        state.chat.isLoading = true;
        state.chat.error = null;
      });

      try {
        // TODO: Implementar criação de chat no Firebase
        const chatId = Date.now().toString();
        const newChat: Chat = {
          id: chatId,
          title,
          createdBy: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
          participants: [userId],
          pinned: false,
        };

        set((state) => {
          state.chat.chats = [newChat, ...state.chat.chats];
          state.chat.activeChatId = chatId;
          state.chat.activeChat = newChat;
          state.chat.isLoading = false;
        });

        return chatId;
      } catch (error: any) {
        set((state) => {
          state.chat.error = error.message || "An error occurred while creating a new chat";
          state.chat.isLoading = false;
        });
        throw error;
      }
    },

    updateTitle: async (chatId, title) => {
      set((state) => {
        state.chat.isLoading = true;
        state.chat.error = null;
      });

      try {
        // TODO: Implementar update no Firebase
        set((state) => {
          state.chat.chats = state.chat.chats.map((chat) =>
            chat.id === chatId ? { ...chat, title, updatedAt: new Date() } : chat
          );
          
          if (state.chat.activeChat?.id === chatId) {
            state.chat.activeChat = { ...state.chat.activeChat, title, updatedAt: new Date() };
          }
          
          state.chat.isLoading = false;
        });
      } catch (error: any) {
        set((state) => {
          state.chat.error = error.message || "An error occurred while updating chat title";
          state.chat.isLoading = false;
        });
        throw error;
      }
    },

    removeChat: async (chatId) => {
      set((state) => {
        state.chat.isLoading = true;
        state.chat.error = null;
      });

      try {
        // TODO: Implementar remoção no Firebase
        set((state) => {
          state.chat.chats = state.chat.chats.filter((chat) => chat.id !== chatId);
          
          if (state.chat.activeChatId === chatId) {
            state.chat.activeChatId = null;
            state.chat.activeChat = null;
          }
          
          state.chat.isLoading = false;
        });
      } catch (error: any) {
        set((state) => {
          state.chat.error = error.message || "An error occurred while deleting chat";
          state.chat.isLoading = false;
        });
        throw error;
      }
    },

    togglePinChat: async (chatId, pinned) => {
      set((state) => {
        state.chat.isLoading = true;
        state.chat.error = null;
      });

      try {
        // TODO: Implementar pin/unpin no Firebase
        set((state) => {
          state.chat.chats = state.chat.chats.map((chat) =>
            chat.id === chatId ? { ...chat, pinned, updatedAt: new Date() } : chat
          );
          
          if (state.chat.activeChat?.id === chatId) {
            state.chat.activeChat = { ...state.chat.activeChat, pinned, updatedAt: new Date() };
          }
          
          state.chat.isLoading = false;
        });
      } catch (error: any) {
        set((state) => {
          state.chat.error = error.message || "An error occurred while pinning/unpinning chat";
          state.chat.isLoading = false;
        });
        throw error;
      }
    },

    setActiveChat: (chatId) => {
      set((state) => {
        state.chat.activeChatId = chatId;
        state.chat.activeChat = chatId ? state.chat.chats.find((chat) => chat.id === chatId) || null : null;
        state.chat.messages = [];
        state.chat.hasMore = true;
        state.chat.lastMessageId = null;
      });
    },

    clearChats: () => {
      set((state) => {
        state.chat.chats = [];
        state.chat.activeChat = null;
        state.chat.activeChatId = null;
        state.chat.messages = [];
        state.chat.hasMore = true;
        state.chat.lastMessageId = null;
        state.chat.error = null;
      });
    },

    loadMessages: async (chatId, reset = false) => {
      if (reset) {
        set((state) => {
          state.chat.messages = [];
          state.chat.hasMore = true;
          state.chat.lastMessageId = null;
        });
      }

      set((state) => {
        state.chat.isLoading = true;
        state.chat.error = null;
      });

      try {
        // TODO: Implementar carregamento de mensagens do Firebase
        const mockMessages: Message[] = [];

        set((state) => {
          state.chat.messages = mockMessages.reverse();
          state.chat.isLoading = false;
          state.chat.hasMore = mockMessages.length === 20;
          state.chat.lastMessageId = mockMessages.length > 0 ? mockMessages[0].id : null;
        });
      } catch (error: any) {
        set((state) => {
          state.chat.error = error.message || "An error occurred while loading messages";
          state.chat.isLoading = false;
        });
        throw error;
      }
    },

    loadMoreMessages: async () => {
      const { activeChatId, lastMessageId, hasMore } = get().chat;

      if (!activeChatId || !lastMessageId || !hasMore) return;

      set((state) => {
        state.chat.isLoading = true;
        state.chat.error = null;
      });

      try {
        // TODO: Implementar carregamento de mais mensagens
        const loadedMessages: Message[] = [];

        set((state) => {
          state.chat.messages = [...loadedMessages.reverse(), ...state.chat.messages];
          state.chat.isLoading = false;
          state.chat.hasMore = loadedMessages.length === 20;
          state.chat.lastMessageId = loadedMessages.length > 0 ? loadedMessages[0].id : state.chat.lastMessageId;
        });
      } catch (error: any) {
        set((state) => {
          state.chat.error = error.message || "An error occurred while loading more messages";
          state.chat.isLoading = false;
        });
        throw error;
      }
    },

    sendNewMessage: async (chatId, userId, content, type = "text") => {
      set((state) => {
        state.chat.error = null;
      });

      try {
        // TODO: Implementar envio de mensagem para Firebase
        const messageId = Date.now().toString();
        const newMessage: Message = {
          id: messageId,
          content,
          type,
          senderId: userId,
          createdAt: new Date(),
          reactions: {},
        };

        set((state) => {
          // Update the chat's updatedAt timestamp
          state.chat.chats = state.chat.chats.map((chat) =>
            chat.id === chatId ? { ...chat, updatedAt: new Date() } : chat
          );

          // Sort chats by updatedAt (newest first)
          state.chat.chats.sort((a, b) => {
            const getTime = (date: any) => {
              if (date instanceof Date) return date.getTime();
              if (date && typeof date.seconds === "number") return new Date(date.seconds * 1000).getTime();
              return 0;
            };
            return getTime(b.updatedAt) - getTime(a.updatedAt);
          });

          // Add message to current chat
          state.chat.messages = [...state.chat.messages, newMessage];
        });
      } catch (error: any) {
        set((state) => {
          state.chat.error = error.message || "An error occurred while sending message";
        });
        throw error;
      }
    },

    removeMessage: async (chatId, messageId) => {
      set((state) => {
        state.chat.error = null;
      });

      try {
        // TODO: Implementar remoção de mensagem no Firebase
        set((state) => {
          state.chat.messages = state.chat.messages.filter((message) => message.id !== messageId);
        });
      } catch (error: any) {
        set((state) => {
          state.chat.error = error.message || "An error occurred while deleting message";
        });
        throw error;
      }
    },

    clearError: () => {
      set((state) => {
        state.chat.error = null;
      });
    },

    setError: (error) => {
      set((state) => {
        state.chat.error = error;
        state.chat.isLoading = false;
      });
    },

    setLoading: (loading) => {
      set((state) => {
        state.chat.isLoading = loading;
      });
    },

    setMessages: (messages) => {
      set((state) => {
        state.chat.messages = messages;
      });
    },

    setChats: (chats) => {
      set((state) => {
        state.chat.chats = chats;
      });
    },
  },
});

// Constantes
export const CHAT_CONSTANTS = {
  MESSAGE_BATCH_SIZE: 20,
  MAX_MESSAGE_LENGTH: 4000,
  TYPING_INDICATOR_TIMEOUT: 5000,
  AUTO_SAVE_INTERVAL: 30000,
} as const;