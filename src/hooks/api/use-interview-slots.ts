import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/auth-store';

// Interview Slot Status Enum
export const INTERVIEW_SLOT_STATUS = {
  AVAILABLE: 'AVAILABLE',
  BOOKED: 'BOOKED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

// Types
export interface InterviewSlot {
  _id: string;
  adminId: {
    _id: string;
    name: string;
    email: string;
  };
  applicantId?: {
    _id: string;
    name: string;
    email: string;
  };
  applicationId?: string;
  startTime: string;
  endTime: string;
  status: keyof typeof INTERVIEW_SLOT_STATUS;
  googleMeetLink?: string;
  googleCalendarEventId?: string;
  notes?: string;
  cancellationReason?: string;
  bookedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewSlotFilters {
  page?: number;
  limit?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}

// ============ ADMIN HOOKS ============

// Get all interview slots - Admin Only
export function useInterviewSlots(filters: InterviewSlotFilters = {}) {
  const { isAuthenticated, user } = useAuthStore();

  return useQuery({
    queryKey: ['interview-slots', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.page) params.append('page', String(filters.page));
      if (filters.limit) params.append('limit', String(filters.limit));
      if (filters.status) params.append('status', filters.status);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const { data } = await apiClient.get(`/interview-slots?${params}`);
      return data as {
        data: InterviewSlot[];
        meta: {
          total: number;
          page: number;
          limit: number;
          totalPage: number;
        };
      };
    },
    enabled: isAuthenticated && user?.role === 'SUPER_ADMIN',
  });
}

// Get single interview slot
export function useInterviewSlot(slotId: string) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['interview-slots', slotId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/interview-slots/${slotId}`);
      return data.data as InterviewSlot;
    },
    enabled: isAuthenticated && !!slotId,
  });
}

// Create interview slot - Admin Only
export function useCreateInterviewSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slotData: {
      startTime: string;
      endTime: string;
      notes?: string;
    }) => {
      const { data } = await apiClient.post('/interview-slots', slotData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interview-slots'] });
    },
  });
}

// Update interview slot - Admin Only
export function useUpdateInterviewSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...slotData
    }: {
      id: string;
      startTime?: string;
      endTime?: string;
      notes?: string;
    }) => {
      const { data } = await apiClient.patch(`/interview-slots/${id}`, slotData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interview-slots'] });
    },
  });
}

// Delete interview slot - Admin Only
export function useDeleteInterviewSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient.delete(`/interview-slots/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interview-slots'] });
    },
  });
}

// Mark interview slot as completed - Admin Only
export function useCompleteInterviewSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient.patch(`/interview-slots/${id}/complete`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interview-slots'] });
    },
  });
}

// Cancel interview slot - Admin Only
export function useCancelInterviewSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      cancellationReason,
    }: {
      id: string;
      cancellationReason: string;
    }) => {
      const { data } = await apiClient.patch(`/interview-slots/${id}/cancel`, {
        cancellationReason,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interview-slots'] });
    },
  });
}

// ============ APPLICANT HOOKS ============

// Book interview slot - Applicant Only
export function useBookInterviewSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      applicationId,
    }: {
      id: string;
      applicationId: string;
    }) => {
      const { data } = await apiClient.patch(`/interview-slots/${id}/book`, {
        applicationId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interview-slots'] });
    },
  });
}

// Reschedule interview slot - Applicant Only
export function useRescheduleInterviewSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      newSlotId,
    }: {
      id: string;
      newSlotId: string;
    }) => {
      const { data } = await apiClient.patch(`/interview-slots/${id}/reschedule`, {
        newSlotId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interview-slots'] });
    },
  });
}