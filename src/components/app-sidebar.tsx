"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  PlusCircle, 
  Search, 
  LogOut, 
  User, 
  Settings, 
  MessageSquare,
  Loader2
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
import { useChats, useChatActions, useActiveChatId } from "@/store";
import { cn } from "@/lib/utils";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  
  const { icon: CognitiveIcon, color, profileConfig } = useCognitiveProfile();
  const chats = useChats();
  const chatActions = useChatActions();
  const activeChatId = useActiveChatId();

  // Carregar usuário
  useEffect(() => {
    const savedMockUser = localStorage.getItem('mock-user');
    if (savedMockUser) {
      setCurrentUser(JSON.parse(savedMockUser));
    }
  }, []);

  // Filtrar chats baseado na busca
  const filteredChats = searchQuery 
    ? chats.filter(chat => 
        chat.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chats;

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

  const handleChatSelect = (chatId: string) => {
    chatActions.setActiveChat(chatId);
    router.push(`/dashboard/chat/${chatId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('mock-user');
    router.push('/');
  };

  const SafeIcon = CognitiveIcon || MessageSquare;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: color }}
                >
                  <SafeIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">FlowEd</span>
                  <span className="truncate text-xs">Flow Adapted</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Botão Nova Sessão */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleCreateNewChat}
                  disabled={isCreatingChat}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isCreatingChat ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <PlusCircle className="h-4 w-4" />
                  )}
                  <span>Nova Sessão</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Busca */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="px-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Lista de Chats */}
        {filteredChats.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Conversas</SidebarGroupLabel>
            <SidebarGroupContent>
              <ScrollArea className="h-[300px]">
                <SidebarMenu>
                  {filteredChats.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton
                        onClick={() => handleChatSelect(chat.id)}
                        isActive={activeChatId === chat.id}
                        className="w-full justify-start"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span className="truncate">{chat.title || "Nova Conversa"}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </ScrollArea>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        {currentUser && (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={currentUser.photoURL} alt={currentUser.displayName} />
                      <AvatarFallback className="rounded-lg">
                        {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {currentUser.displayName || "Usuário"}
                      </span>
                      <span className="truncate text-xs">
                        {currentUser.email}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={currentUser.photoURL} alt={currentUser.displayName} />
                        <AvatarFallback className="rounded-lg">
                          {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {currentUser.displayName || "Usuário"}
                        </span>
                        <span className="truncate text-xs">
                          {currentUser.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>
                    <User className="h-4 w-4" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Settings className="h-4 w-4" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
