"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Brain, Sparkles, MessageSquare, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCognitiveProfile } from "@/hooks/use-cognitive-profile";
import { useChatActions, useAuthUser } from "@/store";

export function WelcomeChat() {
  const router = useRouter();
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { icon: CognitiveIcon, color, profileConfig } = useCognitiveProfile();
  const chatActions = useChatActions();
  const currentUser = useAuthUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreateNewChat = async () => {
    if (isCreatingChat || !currentUser) return;

    setIsCreatingChat(true);
    try {
      const chatId = await chatActions.createNewChat(
        currentUser.uid || currentUser.id, 
        "Nova Conversa"
      );
      router.push(`/dashboard/chat/${chatId}`);
    } catch (error) {
      console.error("Erro ao criar chat:", error);
    } finally {
      setIsCreatingChat(false);
    }
  };

  // Ações rápidas baseadas no perfil cognitivo
  const quickActions = [
    {
      title: "Explicar conceito",
      description: "Peça uma explicação clara e adaptada",
      icon: Brain,
      prompt: "Explique de forma clara e adaptada ao meu perfil cognitivo:"
    },
    {
      title: "Resumir texto",
      description: "Transforme textos longos em resumos",
      icon: Sparkles,
      prompt: "Faça um resumo estruturado deste texto:"
    },
    {
      title: "Brainstorm",
      description: "Gere ideias criativas sobre um tópico",
      icon: Zap,
      prompt: "Vamos fazer um brainstorm sobre:"
    }
  ];

  const handleQuickAction = async (prompt: string) => {
    if (isCreatingChat || !currentUser) return;

    setIsCreatingChat(true);
    try {
      const chatId = await chatActions.createNewChat(
        currentUser.uid || currentUser.id,
        "Nova Conversa"
      );
      // Redirecionar com o prompt inicial
      router.push(`/dashboard/chat/${chatId}?prompt=${encodeURIComponent(prompt)}`);
    } catch (error) {
      console.error("Erro ao criar chat:", error);
    } finally {
      setIsCreatingChat(false);
    }
  };

  if (!mounted || !currentUser) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const SafeIcon = CognitiveIcon || Brain;

  return (
    <div className="flex h-full flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header de Boas-vindas */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div 
              className="flex h-16 w-16 items-center justify-center rounded-full text-white mx-auto"
              style={{ backgroundColor: color }}
            >
              <SafeIcon className="h-8 w-8" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 h-6 w-6 animate-pulse text-yellow-500" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Bem-vindo ao FlowEd
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl">
              Olá, {currentUser.displayName || "Usuário"}! 👋
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sua IA adaptativa está configurada para o perfil{" "}
              <span className="font-semibold" style={{ color }}>
                {profileConfig.name}
              </span>
              . Vamos começar uma conversa personalizada?
            </p>
          </div>
        </div>

        {/* Botão Principal */}
        <div className="text-center">
          <Button
            onClick={handleCreateNewChat}
            disabled={isCreatingChat}
            size="lg"
            className="h-12 px-8 text-lg"
          >
            {isCreatingChat ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Criando...
              </>
            ) : (
              <>
                <MessageSquare className="mr-2 h-5 w-5" />
                Iniciar Nova Conversa
              </>
            )}
          </Button>
        </div>

        {/* Ações Rápidas */}
        <div className="space-y-4">
          <h2 className="text-center text-xl font-semibold">
            Ou comece com uma ação rápida:
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className="cursor-pointer transition-all hover:shadow-md hover:scale-105"
                onClick={() => handleQuickAction(action.prompt)}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div 
                    className="flex h-12 w-12 items-center justify-center rounded-full mx-auto"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Informações do Perfil */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            💡 Suas conversas são adaptadas automaticamente para o seu perfil cognitivo
          </p>
          <p className="text-xs text-muted-foreground">
            Você pode alterar seu perfil a qualquer momento no menu superior
          </p>
        </div>
      </div>
    </div>
  );
}
