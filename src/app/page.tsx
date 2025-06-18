"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeSection } from "@/components/welcome-section";
import { DashboardHeader } from "@/components/dashboard-header";
import { LoginFormSection } from "@/components/login-form-section";

export default function HomePage() {
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  // Verificar se usuário já está logado - só uma vez
  useEffect(() => {
    if (!hasCheckedAuth) {
      const mockUser = localStorage.getItem('mock-user');
      if (mockUser) {
        console.log('Home: Redirecionando para dashboard - usuário encontrado');
        router.push('/dashboard');
      }
      setHasCheckedAuth(true);
    }
  }, [router, hasCheckedAuth]);
  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Header igual ao dashboard */}
      <DashboardHeader showSidebarControls={false} showUserMenu={false} />

      {/* Layout principal split-screen */}
      <div className="grid min-h-[calc(100vh-3rem)] flex-1 lg:grid-cols-2">
        {/* Painel esquerdo - Formulário de Login */}
        <LoginFormSection />

        {/* Painel direito - Seção de Boas-vindas */}
        <WelcomeSection />
      </div>
    </div>
  );
}

