import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/auth-store';

// Types
export interface Chat {
  _id: string;
  participants: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
  }[];
  lastMessage?: {
    content: string;
    createdAt: string;
  };
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  chat: string;
  sender: {
    _id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  type: 'TEXT' | 'SESSION_PROPOSAL' | 'FILE';
  sessionProposal?: {
    subject: string;
    scheduledAt: string;
    duration: number;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  };
  isRead: boolean;
  createdAt: string;
}

// Get All Chats (Protected)
export function useChats() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      const { data } = await apiClient.get('/chats');
      return data.data as Chat[];
    },
    enabled: isAuthenticated,
  });
}

// Create or Get Chat (Protected)
export function useCreateChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (otherUserId: string) => {
      const { data } = await apiClient.post(`/chats/${otherUserId}`);
      return data.data as Chat;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
}

// Get Messages for a Chat (Protected)
export function useMessages(chatId: string) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['messages', chatId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/messages/chat/${chatId}`);
      return data.data as Message[];
    },
    enabled: isAuthenticated && !!chatId,
  });
}

// Send Message (Protected)
export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageData: {
      chatId: string;
      content: string;
      type?: 'TEXT' | 'FILE';
    }) => {
      const { data } = await apiClient.post('/messages', messageData);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.chatId] });
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
}

// Mark Chat as Read (Protected)
export function useMarkChatAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (chatId: string) => {
      const { data } = await apiClient.post(`/messages/chat/${chatId}/read`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
}