"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const user = useAuthUser();
  const authLoading = useAuthLoading();
  const chats = useChats();
  const chatActions = useChatActions();
  const chatsLoading = useChatLoading();
  
  // Resolver params
  React.useEffect(() => {
    params.then((resolvedParams) => {
      setChatId(resolvedParams.chatId);
    });
  }, [params]);

  // Verificar usuário
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

  // Redirecionar se não há usuário
  useEffect(() => {
    if (isInitialized && !authLoading && !currentUser) {
      console.log('Chat: Redirecionando para home - sem usuário');
      router.replace('/');
    }
  }, [currentUser, authLoading, isInitialized, router]);
  
  // Load chats for the user
  useEffect(() => {
    if (currentUser) {
      chatActions.loadChats(currentUser.uid || currentUser.id);
    }
  }, [currentUser, chatActions]);

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
        router.push('/dashboard');
      }
    }
  }, [chatsLoading, chats, chatId, router]);

  // Handle initial prompt from URL
  useEffect(() => {
    const initialPrompt = searchParams.get('prompt');
    if (initialPrompt && chatId) {
      // TODO: Send initial prompt to chat
      console.log('Initial prompt:', initialPrompt);
    }
  }, [searchParams, chatId]);
  
  if (authLoading || !isInitialized || !currentUser || !chatId) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Chat area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <ChatWindow chatId={chatId} />
        <ChatInput chatId={chatId} />
      </div>
    </div>
  );
}
