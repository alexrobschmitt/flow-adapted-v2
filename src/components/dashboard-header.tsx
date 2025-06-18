"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Brain, PlusCircle, LogOut, PanelLeft } from "lucide-react";

import { CognitiveProfileSelector } from "@/components/cognitive-profile-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCognitiveProfile } from "@/hooks/use-cognitive-profile";
import { useChatActions, useAuthUser } from "@/store";

// Componente seguro para SidebarTrigger que só renderiza se estiver dentro de SidebarProvider
function SafeSidebarTrigger() {
  try {
    const { toggleSidebar } = useSidebar();
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 -ml-1"
        onClick={toggleSidebar}
      >
        <PanelLeft className="h-4 w-4" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    );
  } catch (error) {
    // Se não estiver dentro de SidebarProvider, não renderiza nada
    return null;
  }
}

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
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  // Usar sidebar apenas se estiver disponível (dentro de SidebarProvider)
  let sidebarOpen = false;
  try {
    const sidebar = useSidebar();
    sidebarOpen = sidebar.open;
  } catch (error) {
    // useSidebar não está disponível (fora do SidebarProvider)
    sidebarOpen = false;
  }

  const chatActions = useChatActions();
  const currentUser = useAuthUser();

  // Evitar erro de hidratação
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const { icon: CognitiveProfileIcon, color } = useCognitiveProfile();

  // Durante a hidratação, usar ícone padrão para evitar mismatch
  const IconComponent = isHydrated ? CognitiveProfileIcon : Brain;
  const iconColor = isHydrated ? color : "#3b82f6";

  const handleCreateNewChat = async () => {
    if (isCreatingChat || !currentUser) return;

    setIsCreatingChat(true);
    try {
      const chatId = await chatActions.createNewChat(currentUser.uid || currentUser.id, "Nova Conversa");
      router.push(`/dashboard/chat/${chatId}`);
    } catch (error) {
      console.error("Erro ao criar chat:", error);
    } finally {
      setIsCreatingChat(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mock-user');
    router.push('/');
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-11 sm:h-12 shrink-0 items-center gap-2 border-b backdrop-blur transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between px-2 sm:px-4 lg:px-6">
        {/* Left side - Sidebar controls and branding */}
        <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
          {showSidebarControls && (
            <SafeSidebarTrigger />
          )}

          {/* Logo - only show when sidebar is collapsed or on mobile */}
          {(!showSidebarControls || !sidebarOpen) && (
            <div className="flex min-w-0 items-center gap-2">
              <IconComponent className="h-6 w-6" style={{ color: iconColor }} />
              <div className="flex flex-col">
                <span className="text-base font-semibold leading-tight sm:text-lg">FlowEd</span>
                <span className="text-muted-foreground text-xs leading-tight">Flow Adapted</span>
              </div>
            </div>
          )}

          {/* New Chat Button - only show when sidebar is open */}
          {showSidebarControls && sidebarOpen && (
            <Button
              onClick={handleCreateNewChat}
              disabled={isCreatingChat}
              size="sm"
              className="ml-auto"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Nova Conversa
            </Button>
          )}

          {/* Legacy children support */}
          {children}
        </div>

        {/* Right side - Controls and User Menu */}
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

                {/* User Menu */}
                {currentUser && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={currentUser.photoURL} alt={currentUser.displayName} />
                          <AvatarFallback>
                            {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {currentUser.displayName || "Usuário"}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {currentUser.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
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
