"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAppStore, useAuthActions, useChatActions } from "./index";

interface StoreProviderContextType {
  isInitialized: boolean;
  initializationError: string | null;
  retryInitialization: () => void;
  isRetrying: boolean;
}

const StoreProviderContext = createContext<StoreProviderContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  
  const authActions = useAuthActions();
  const chatActions = useChatActions();

  const initializeStore = useCallback(async () => {
    try {
      setInitializationError(null);
      setIsRetrying(false);
      
      console.log("Initializing store...");
      
      // Initialize auth session
      await authActions.refreshSession();
      
      // If authenticated, load user data
      const authState = useAppStore.getState().auth;
      if (authState.isAuthenticated && authState.user) {
        console.log("User authenticated, loading chats...");
        await chatActions.loadChats(authState.user.id);
      }
      
      setIsInitialized(true);
      console.log("Store initialized successfully");
    } catch (error) {
      console.error("Store initialization failed:", error);
      setInitializationError(error instanceof Error ? error.message : "Unknown error during initialization");
    }
  }, [authActions, chatActions]);

  const retryInitialization = useCallback(async () => {
    setIsRetrying(true);
    await initializeStore();
    setIsRetrying(false);
  }, [initializeStore]);

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  // Auto-retry on auth state changes
  useEffect(() => {
    let previousIsAuthenticated = useAppStore.getState().auth.isAuthenticated;
    
    const unsubscribe = useAppStore.subscribe((state) => {
      const currentIsAuthenticated = state.auth.isAuthenticated;
      
      // If user just logged in and store isn't initialized yet
      if (currentIsAuthenticated && !previousIsAuthenticated && !isInitialized) {
        console.log("Auth state changed, re-initializing store...");
        initializeStore();
      }
      
      previousIsAuthenticated = currentIsAuthenticated;
    });

    return unsubscribe;
  }, [initializeStore, isInitialized]);

  // Session expiry check
  useEffect(() => {
    const checkSession = () => {
      const authState = useAppStore.getState().auth;
      if (authState.isAuthenticated && !authActions.isSessionValid()) {
        console.log("Session expired, signing out...");
        authActions.signOut();
      }
    };

    // Check session every 5 minutes
    const interval = setInterval(checkSession, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [authActions]);

  const contextValue: StoreProviderContextType = {
    isInitialized,
    initializationError,
    retryInitialization,
    isRetrying,
  };

  return (
    <StoreProviderContext.Provider value={contextValue}>
      {children}
    </StoreProviderContext.Provider>
  );
}

export function useStoreProvider() {
  const context = useContext(StoreProviderContext);
  if (!context) {
    throw new Error("useStoreProvider must be used within a StoreProvider");
  }
  return context;
}

// Hook para aguardar inicialização
export function useWaitForStoreInit() {
  const { isInitialized, initializationError, retryInitialization, isRetrying } = useStoreProvider();
  
  return {
    isReady: isInitialized && !initializationError,
    isLoading: !isInitialized && !initializationError,
    hasError: !!initializationError,
    error: initializationError,
    retry: retryInitialization,
    isRetrying,
  };
}

// Component de loading para aguardar inicialização
export function StoreLoadingGuard({ children, fallback }: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isReady, isLoading, hasError, error, retry, isRetrying } = useWaitForStoreInit();

  if (isLoading) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Inicializando aplicação...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Erro na Inicialização</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={retry}
            disabled={isRetrying}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            {isRetrying ? "Tentando novamente..." : "Tentar Novamente"}
          </button>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <p>Aguardando inicialização...</p>
      </div>
    );
  }

  return <>{children}</>;
}