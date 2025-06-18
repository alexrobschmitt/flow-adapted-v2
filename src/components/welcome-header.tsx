"use client";

import React from "react";
import { useGreeting } from "@/hooks/useGreeting";
import { useCognitiveProfile } from "@/hooks/use-cognitive-profile";
import { useAuthUser } from "@/store";
import { CognitiveProfileSelector } from "./cognitive-profile-selector";
import { APP_CONFIG } from "@/config/app";
import { cn } from "@/lib/utils";

interface WelcomeHeaderProps {
  className?: string;
}

export function WelcomeHeader({ className }: WelcomeHeaderProps) {
  const user = useAuthUser();
  const { profile } = useCognitiveProfile();
  const { greeting } = useGreeting(profile);

  const userName = user?.name || user?.email?.split('@')[0] || "Usuário";

  return (
    <div className={cn(
      "space-y-4 p-6 border-b bg-gradient-to-r from-background to-muted/20",
      className
    )}>
      {/* Header principal */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {APP_CONFIG.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {APP_CONFIG.description}
          </p>
        </div>
        
        <CognitiveProfileSelector
          variant="compact"
          className="border border-border/50"
        />
      </div>

      {/* Saudação personalizada */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            Olá, {userName}! 👋
          </h2>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          {greeting}
        </p>
      </div>

      {/* Indicadores de status */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Online</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span>Perfil:</span>
          <span className="font-medium">{profile}</span>
        </div>
        
        {user && (
          <div className="flex items-center gap-1">
            <span>Conectado como:</span>
            <span className="font-medium">{userName}</span>
          </div>
        )}
      </div>
    </div>
  );
}
