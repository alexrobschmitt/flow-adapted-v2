import { Brain, Sparkles, Shield, Zap } from "lucide-react";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { DashboardHeader } from "@/components/dashboard-header";

export default function LoginPage() {
  // TODO: Implementar verificação de autenticação server-side
  // const user = await getCurrentUser();
  // if (user) {
  //   redirect("/dashboard");
  // }

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Header igual ao dashboard */}
      <DashboardHeader showSidebarControls={false} showUserMenu={false} />

      {/* Layout principal */}
      <div className="grid min-h-[calc(100vh-3rem)] flex-1 lg:grid-cols-2">
        {/* Painel esquerdo - Formulário */}
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

        {/* Painel direito - Branding */}
        <div className="bg-primary relative hidden overflow-y-auto lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
          <div className="max-w-md space-y-6 text-center">
            <div className="relative">
              <Brain className="text-primary-foreground mx-auto size-16" />
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 animate-pulse text-yellow-300" />
            </div>

            <div className="space-y-4">
              <h1 className="text-primary-foreground text-4xl font-light">Bem-vindo ao FlowEd</h1>
              <p className="text-primary-foreground/80 text-lg">
                Sua plataforma de IA que se adapta ao seu perfil cognitivo único para uma experiência de aprendizagem
                personalizada no Flow Adapted.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-primary-foreground/90 text-sm font-medium">Perfis Cognitivos Suportados</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <div className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30 rounded-full border px-3 py-1 text-sm transition-colors">
                  🧠 TDAH
                </div>
                <div className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30 rounded-full border px-3 py-1 text-sm transition-colors">
                  💙 Autismo
                </div>
                <div className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30 rounded-full border px-3 py-1 text-sm transition-colors">
                  👁️ Dislexia
                </div>
                <div className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30 rounded-full border px-3 py-1 text-sm transition-colors">
                  ⚖️ Padrão
                </div>
              </div>
            </div>

            <div className="text-primary-foreground/70 mt-8 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                <span>Personalização automática baseada no seu perfil</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400"></div>
                <span>Interface adaptativa para melhor acessibilidade</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-purple-400"></div>
                <span>IA contextual que entende suas necessidades</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}