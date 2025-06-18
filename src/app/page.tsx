"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, Shield, Zap } from "lucide-react";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { WelcomeSection } from "@/components/welcome-section";
import { DashboardHeader } from "@/components/dashboard-header";

export default function HomePage() {
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  // Verificar se usuário já está logado - só uma vez
  useEffect(() => {
    if (!hasCheckedAuth) {
      const mockUser = localStorage.getItem('mock-user');
      if (mockUser) {
        console.log('Home: Redirecionando para chat - usuário encontrado');
        router.push('/chat');
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
        <div className="bg-background safe-area-inset flex flex-col items-center justify-center overflow-y-auto p-4 sm:p-6 md:p-10">
          <div className="w-full max-w-md space-y-8">
            {/* Título e descrição */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-bold sm:text-2xl">Entrar no Flow Adapted</h1>
            <p className="text-muted-foreground px-2 text-xs text-balance sm:text-sm">
              Faça login com sua conta Google para acessar o FlowEd, seu assistente de IA personalizado
            </p>
          </div>

          {/* Botão de login Google */}
            <OAuthButtons />

          <div className="text-muted-foreground text-center text-sm">
            Ao fazer login, você concorda com nossos{" "}
            <button className="text-primary underline-offset-4 hover:underline">Termos de Serviço</button> e{" "}
            <button className="text-primary underline-offset-4 hover:underline">Política de Privacidade</button>
          </div>

            {/* Recursos em destaque */}
            <div className="border-border/50 space-y-4 border-t pt-6 text-center">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-muted-foreground text-xs">Adaptativo</p>
                </div>

                <div className="space-y-2">
                  <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-muted-foreground text-xs">Seguro</p>
                </div>

                <div className="space-y-2">
                  <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-muted-foreground text-xs">Rápido</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Painel direito - Seção de Boas-vindas */}
        <WelcomeSection />
      </div>
    </div>
  );
}

