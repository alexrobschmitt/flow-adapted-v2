"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ChatRedirectPageProps {
  params: Promise<{
    chatId: string;
  }>;
}

export default function ChatRedirectPage({ params }: ChatRedirectPageProps) {
  const router = useRouter();

  useEffect(() => {
    params.then((resolvedParams) => {
      // Redirecionar para a nova estrutura do dashboard
      console.log(`Chat: Redirecionando chat ${resolvedParams.chatId} para dashboard`);
      router.replace(`/dashboard/chat/${resolvedParams.chatId}`);
    });
  }, [params, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
        <p className="text-muted-foreground">Redirecionando para o dashboard...</p>
      </div>
    </div>
  );
}
