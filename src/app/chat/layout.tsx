"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface ChatLayoutProps {
  readonly children: ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('mock-user');
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader showSidebarControls={false} showUserMenu={false} />
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h1 className="text-lg font-semibold">Chat</h1>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
