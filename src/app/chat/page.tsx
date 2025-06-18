"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ChatRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para a nova estrutura do dashboard
    console.log('Chat: Redirecionando para dashboard - nova estrutura');
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
        <p className="text-muted-foreground">Redirecionando para o dashboard...</p>
      </div>
    </div>
  );
}