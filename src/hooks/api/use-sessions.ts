import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/auth-store';

// Types
export interface Session {
  _id: string;
  student: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  tutor: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  subject: {
    _id: string;
    name: string;
  };
  scheduledAt: string;
  duration: number; // in minutes
  status:
    | 'PROPOSED'
    | 'SCHEDULED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'RESCHEDULED';
  meetingLink?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Get Upcoming Sessions (Protected)
export function useUpcomingSessions() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['sessions', 'upcoming'],
    queryFn: async () => {
      const { data } = await apiClient.get('/sessions/my-upcoming');
      return data.data as Session[];
    },
    enabled: isAuthenticated,
  });
}

// Get Completed Sessions (Protected)
export function useCompletedSessions() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['sessions', 'completed'],
    queryFn: async () => {
      const { data } = await apiClient.get('/sessions/my-completed');
      return data.data as Session[];
    },
    enabled: isAuthenticated,
  });
}

// Get Single Session (Protected)
export function useSession(sessionId: string) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['sessions', sessionId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/sessions/${sessionId}`);
      return data.data as Session;
    },
    enabled: isAuthenticated && !!sessionId,
  });
}

// Cancel Session (Protected)
export function useCancelSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const { data } = await apiClient.patch(`/sessions/${sessionId}/cancel`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
}

// Request Reschedule (Protected)
export function useRescheduleSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sessionId,
      newScheduledAt,
    }: {
      sessionId: string;
      newScheduledAt: string;
    }) => {
      const { data } = await apiClient.patch(
        `/sessions/${sessionId}/reschedule`,
        { newScheduledAt }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
}

// Approve Reschedule (Protected)
export function useApproveReschedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const { data } = await apiClient.patch(
        `/sessions/${sessionId}/approve-reschedule`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
}

// Reject Reschedule (Protected)
export function useRejectReschedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const { data } = await apiClient.patch(
        `/sessions/${sessionId}/reject-reschedule`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
}

// Propose Session - For Tutors (Protected)
export function useProposeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (proposalData: {
      chatId: string;
      subject: string;
      scheduledAt: string;
      duration: number;
      notes?: string;
    }) => {
      const { data } = await apiClient.post('/sessions/propose', proposalData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
}

// Accept Session Proposal - For Students (Protected)
export function useAcceptSessionProposal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageId: string) => {
      const { data } = await apiClient.post(
        `/sessions/proposals/${messageId}/accept`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
}

// Reject Session Proposal - For Students (Protected)
export function useRejectSessionProposal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageId: string) => {
      const { data } = await apiClient.post(
        `/sessions/proposals/${messageId}/reject`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
}