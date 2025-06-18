"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { WelcomeChat } from "@/components/welcome-chat";

export default function DashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Verificar usuário uma única vez na inicialização
  useEffect(() => {
    if (!isInitialized) {
      const savedMockUser = localStorage.getItem('mock-user');
      if (savedMockUser) {
        setCurrentUser(JSON.parse(savedMockUser));
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Redirecionar se não há usuário
  useEffect(() => {
    if (isInitialized && !currentUser) {
      console.log('Dashboard: Redirecionando para home - sem usuário');
      router.replace("/");
    }
  }, [currentUser, isInitialized, router]);

  // Loading state
  if (!isInitialized || !currentUser) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <WelcomeChat />
    </div>
  );
}
