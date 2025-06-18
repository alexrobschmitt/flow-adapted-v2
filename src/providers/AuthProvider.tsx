"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import { listenToAuthChanges, logOut } from '@/lib/firebase/auth';
import { useAuthActions } from '@/store';

interface AuthContextType {
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType>({ isInitialized: false });

export const useAuth = () => useContext(AuthContext);

const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const eraseCookie = (name: string) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const authActions = useAuthActions();

  useEffect(() => {
    const unsubscribe = listenToAuthChanges((user) => {
      // Converter Firebase User para AuthUser do slice
      if (user) {
        authActions.setUser({
          id: user.uid,
          email: user.email || '',
          name: user.displayName || '',
          image: user.photoURL || undefined,
          hasFlowConfig: false, // TODO: buscar do Firestore
          cognitiveProfile: 'default', // TODO: buscar do Firestore
          needsOnboarding: true, // TODO: buscar do Firestore
        });
      } else {
        authActions.setUser(null);
      }

      if (!isInitialized) {
        setIsInitialized(true);
      }
    });

    return () => unsubscribe();
  }, [authActions, isInitialized]);
  
  const contextValue = useMemo(() => ({ isInitialized }), [isInitialized]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};