"use client";

import { useState, useEffect } from "react";

import { Brain } from "lucide-react";

import { CognitiveProfileSelector } from "@/components/cognitive-profile-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCognitiveProfile } from "@/hooks/use-cognitive-profile";

interface DashboardHeaderProps {
  children?: React.ReactNode;
  showSidebarControls?: boolean;
  showUserMenu?: boolean;
}

export function DashboardHeader({
  children,
  showSidebarControls = true,
  showUserMenu = true,
}: Readonly<DashboardHeaderProps>) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Evitar erro de hidratação
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const { icon: CognitiveProfileIcon, color } = useCognitiveProfile();

  // Durante a hidratação, usar ícone padrão para evitar mismatch
  const IconComponent = isHydrated ? CognitiveProfileIcon : Brain;
  const iconColor = isHydrated ? color : "#3b82f6";

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-11 sm:h-12 shrink-0 items-center gap-2 border-b backdrop-blur transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between px-2 sm:px-4 lg:px-6">
        {/* Left side - Conditional content based on screen size */}
        <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
          {/* Sem sidebar - Logo centralizado */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <IconComponent className="h-6 w-6" style={{ color: iconColor }} />
            <div className="flex flex-col">
              <span className="text-base font-semibold leading-tight sm:text-lg">FlowEd</span>
              <span className="text-muted-foreground text-xs leading-tight">Flow Adapted</span>
            </div>
          </div>

          {/* Legacy children support */}
          {children}
        </div>

        {/* Right side - Responsive button layout */}
        <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
          {showUserMenu ? (
            <>
              {/* Mobile: Controles agrupados */}
              <div className="flex items-center sm:hidden">
                <div className="flex items-center gap-1">
                  <CognitiveProfileSelector variant="compact" />
                  <ThemeToggle />
                </div>
              </div>

              {/* Desktop: Todos os botões com espaçamento normal */}
              <div className="hidden items-center gap-2 sm:flex">
                <CognitiveProfileSelector variant="compact" />
                <ThemeToggle />
              </div>
            </>
          ) : (
            /* Sem UserMenu - Apenas controles básicos */
            <div className="flex items-center gap-2">
              <CognitiveProfileSelector variant="compact" />
              <ThemeToggle />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
