"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthUser, useAuthLoading, useChatActions } from "@/store";

export default function ChatIndexPage() {
  const router = useRouter();
  const user = useAuthUser();
  const authLoading = useAuthLoading();
  const chatActions = useChatActions();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Verificar usuário uma única vez na inicialização
  useEffect(() => {
    if (!isInitialized) {
      const savedMockUser = localStorage.getItem('mock-user');
      if (savedMockUser) {
        setCurrentUser(JSON.parse(savedMockUser));
      } else if (user) {
        setCurrentUser(user);
      }
      setIsInitialized(true);
    }
  }, [user, isInitialized]);

  // Atualizar currentUser se user mudar
  useEffect(() => {
    if (user && isInitialized) {
      setCurrentUser(user);
    }
  }, [user, isInitialized]);

  // Redirecionar apenas se não há usuário E já inicializou
  useEffect(() => {
    if (isInitialized && !authLoading && !currentUser) {
      console.log('Chat: Redirecionando para home - sem usuário');
      router.replace("/"); // usar replace em vez de push para evitar histórico
    }
  }, [currentUser, authLoading, isInitialized, router]);

  // Simular carregamento de chats (comentado para evitar problemas com Firebase)
  // useEffect(() => {
  //   if (currentUser) {
  //     loadChats(currentUser.uid);
  //   }
  // }, [currentUser, loadChats]);

  // Por enquanto, não redirecionar automaticamente para evitar loops
  // useEffect(() => {
  //   if (!chatsLoading && chats.length > 0) {
  //     const sortedChats = [...chats].sort((a, b) => {
  //       const dateA = a.updatedAt instanceof Date ? a.updatedAt : new Date(a.updatedAt.seconds * 1000);
  //       const dateB = b.updatedAt instanceof Date ? b.updatedAt : new Date(b.updatedAt.seconds * 1000);
  //       return dateB.getTime() - dateA.getTime();
  //     });
  //
  //     router.push(`/chat/${sortedChats[0].id}`);
  //   }
  // }, [chatsLoading, chats, router]);

  const handleCreateChat = async () => {
    if (!currentUser) return;

    try {
      const chatId = await chatActions.createNewChat(currentUser.uid, "New Chat");
      router.push(`/chat/${chatId}`);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  // Loading state - aguardar verificação de auth e localStorage
  if (authLoading || !isInitialized || !currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show welcome screen
  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <div className="max-w-lg text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao FlowEd Chat</h1>
        <p className="text-muted-foreground">
          Olá, {currentUser.displayName ?? currentUser.email}! 👋
        </p>
        <p className="text-muted-foreground">
          Sua plataforma de IA adaptativa está pronta para uso.
        </p>
        <div className="space-y-2">
          <Button onClick={handleCreateChat} className="mt-4">
            Criar novo chat
          </Button>
          <p className="text-xs text-muted-foreground">
            Em breve: integração completa com Firebase
          </p>
        </div>
      </div>
    </div>
  );
}