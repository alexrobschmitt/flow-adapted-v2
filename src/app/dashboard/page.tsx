"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { WelcomeChat } from "@/components/welcome-chat";
import { useAuthUser, useAuthLoading } from "@/store";
import { useAuth } from "@/providers/AuthProvider";

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthUser();
  const authLoading = useAuthLoading();
  const { isInitialized } = useAuth();

  // Redirecionar se não há usuário e já inicializou
  useEffect(() => {
    if (isInitialized && !authLoading && !user) {
      console.log('Dashboard: Redirecionando para home - sem usuário');
      router.replace("/");
    }
  }, [user, authLoading, isInitialized, router]);

  // Loading state - aguardar inicialização do auth
  if (!isInitialized || authLoading || !user) {
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
