"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { LoginFormSection } from "@/components/login-form-section";
import { WelcomeSection } from "@/components/welcome-section";

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
        <LoginFormSection />

        {/* Painel direito - Branding */}
        <WelcomeSection />
      </div>
    </div>
  );
}