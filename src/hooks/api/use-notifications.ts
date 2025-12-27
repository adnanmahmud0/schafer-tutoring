import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/auth-store';

// Types
export interface Notification {
  _id: string;
  user: string;
  title: string;
  message: string;
  type:
    | 'SESSION_REMINDER'
    | 'SESSION_CANCELLED'
    | 'NEW_MESSAGE'
    | 'PAYMENT_SUCCESS'
    | 'PAYMENT_FAILED'
    | 'GENERAL';
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: string;
}

// Get All Notifications (Protected)
export function useNotifications() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data } = await apiClient.get('/notifications');
      return data.data as Notification[];
    },
    enabled: isAuthenticated,
  });
}

// Get Unread Count (Protected)
export function useUnreadNotificationsCount() {
  const { data: notifications } = useNotifications();

  return notifications?.filter((n) => !n.isRead).length ?? 0;
}

// Mark Notification as Read (Protected)
export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const { data } = await apiClient.patch(
        `/notifications/${notificationId}/read`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

// Mark All Notifications as Read (Protected)
export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.patch('/notifications/read-all');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}