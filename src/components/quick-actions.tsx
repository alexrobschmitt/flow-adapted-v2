"use client";

import React from "react";
import { useCognitiveProfile } from "@/hooks/use-cognitive-profile";
import { getQuickActionsForProfile } from "@/config/quick-actions";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface QuickActionsProps {
  className?: string;
  onActionSelect?: (prompt: string, label: string) => void;
  maxActions?: number;
}

export function QuickActions({ 
  className, 
  onActionSelect,
  maxActions = 6 
}: QuickActionsProps) {
  const { profile, color: profileColor } = useCognitiveProfile();
  const actions = getQuickActionsForProfile(profile).slice(0, maxActions);

  const handleActionClick = (prompt: string, label: string) => {
    if (onActionSelect) {
      onActionSelect(prompt, label);
    }
  };

  if (actions.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Ações Rápidas</h3>
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: profileColor }}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <TooltipProvider>
          {actions.map((action) => {
            const Icon = action.icon;
            
            return (
              <Tooltip key={action.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-auto p-4 flex flex-col items-start gap-3 text-left",
                      "hover:border-primary/50 transition-all duration-200",
                      "group relative overflow-hidden"
                    )}
                    onClick={() => handleActionClick(action.prompt, action.label)}
                  >
                    {/* Indicador de cor do perfil */}
                    <div 
                      className="absolute top-0 left-0 w-1 h-full opacity-60"
                      style={{ backgroundColor: profileColor }}
                    />
                    
                    {/* Conteúdo do botão */}
                    <div className="flex items-center gap-3 w-full">
                      <div 
                        className="p-2 rounded-md flex-shrink-0 transition-colors"
                        style={{ 
                          backgroundColor: `${profileColor}15`,
                          color: profileColor 
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-tight">
                          {action.label}
                        </p>
                      </div>
                    </div>
                  </Button>
                </TooltipTrigger>
                
                <TooltipContent side="bottom" className="max-w-xs">
                  <div className="space-y-1">
                    <p className="font-semibold text-xs">{action.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
      
      {/* Indicador de mais ações disponíveis */}
      {getQuickActionsForProfile(profile).length > maxActions && (
        <p className="text-xs text-muted-foreground text-center">
          E mais {getQuickActionsForProfile(profile).length - maxActions} ações disponíveis...
        </p>
      )}
    </div>
  );
}
