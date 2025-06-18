"use client";

import { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { AppSidebar } from "@/components/app-sidebar";

interface DashboardLayoutProps {
  readonly children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader showSidebarControls={true} showUserMenu={true} />
        <main className="flex h-[calc(100vh-3rem)] flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
