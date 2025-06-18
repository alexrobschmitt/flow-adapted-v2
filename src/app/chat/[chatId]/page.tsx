"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Sidebar from '@/components/sidebar/Sidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import ChatInput from '@/components/chat/ChatInput';
import { useAuthUser, useAuthLoading, useChats, useChatActions, useChatLoading } from '@/store';

interface ChatPageProps {
  params: Promise<{
    chatId: string;
  }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const [chatId, setChatId] = React.useState<string>('');
  
  React.useEffect(() => {
    params.then((resolvedParams) => {
      setChatId(resolvedParams.chatId);
    });
  }, [params]);
  const router = useRouter();

  const user = useAuthUser();
  const authLoading = useAuthLoading();
  const chats = useChats();
  const chatActions = useChatActions();
  const chatsLoading = useChatLoading();
  
  // Check authentication - only redirect after auth is fully loaded
  useEffect(() => {
    // Only redirect if we're not loading AND user is null (meaning auth check is complete)
    if (!authLoading && user === null) {
      router.push('/login');
    }
  }, [user, authLoading, router]);
  
  // Load chats for the user
  useEffect(() => {
    if (user) {
      chatActions.loadChats(user.id);
    }
  }, [user, chatActions]);

  // Set current chat
  useEffect(() => {
    if (chatId) {
      chatActions.setActiveChat(chatId);
    }
  }, [chatId, chatActions]);
  
  // Check if chat exists after loading
  useEffect(() => {
    if (!chatsLoading && chats.length > 0 && chatId) {
      const chatExists = chats.some(chat => chat.id === chatId);
      if (!chatExists) {
        router.push('/chat');
      }
    }
  }, [chatsLoading, chats, chatId, router]);
  
  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="flex h-screen">
      {/* Desktop sidebar */}
      <div className="hidden md:block md:w-80 lg:w-96 h-full">
        <Sidebar />
      </div>
      
      <div className="flex flex-col flex-1 h-full">
        {/* Mobile sidebar */}
        <div className="md:hidden p-2 border-b border-border">
          <Sidebar isMobile={true} />
        </div>
        
        {/* Chat area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <ChatWindow chatId={chatId} />
          <ChatInput chatId={chatId} />
        </div>
      </div>
    </div>
  );
}