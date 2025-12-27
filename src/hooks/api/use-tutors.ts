import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/auth-store';

// Types
export interface Tutor {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  subjects?: string[];
  hourlyRate?: number;
  rating?: number;
  totalReviews?: number;
  totalStudents?: number;
  totalSessions?: number;
  status: 'active' | 'inactive' | 'blocked';
  stripeAccountId?: string;
  isStripeOnboarded?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TutorFilters {
  page?: number;
  limit?: number;
  search?: string;
  subject?: string;
  status?: string;
}

// Get All Tutors - Admin Only (Protected)
export function useTutors(filters: TutorFilters = {}) {
  const { isAuthenticated, user } = useAuthStore();
  const { page = 1, limit = 10, search = '', subject, status } = filters;

  return useQuery({
    queryKey: ['tutors', { page, limit, search, subject, status }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('limit', String(limit));
      if (search) params.append('search', search);
      if (subject) params.append('subject', subject);
      if (status) params.append('status', status);

      const { data } = await apiClient.get(`/users?role=TUTOR&${params}`);
      return data as {
        data: Tutor[];
        meta: { total: number; page: number; limit: number };
      };
    },
    enabled: isAuthenticated && user?.role === 'SUPER_ADMIN',
  });
}

// Get Single Tutor (Protected)
export function useTutor(tutorId: string) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['tutors', tutorId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/users/${tutorId}/user`);
      return data.data as Tutor;
    },
    enabled: isAuthenticated && !!tutorId,
  });
}

// Get Tutor Statistics - For Tutor Dashboard (Protected)
export function useTutorStatistics() {
  const { isAuthenticated, user } = useAuthStore();

  return useQuery({
    queryKey: ['tutor-statistics'],
    queryFn: async () => {
      const { data } = await apiClient.get('/users/my-statistics');
      return data.data as {
        totalEarnings: number;
        totalStudents: number;
        totalSessions: number;
        averageRating: number;
        completedSessions: number;
        upcomingSessions: number;
      };
    },
    enabled: isAuthenticated && user?.role === 'TUTOR',
  });
}

// Block Tutor - Admin Only (Protected)
export function useBlockTutor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tutorId: string) => {
      const { data } = await apiClient.patch(`/users/${tutorId}/block-tutor`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutors'] });
    },
  });
}

// Unblock Tutor - Admin Only (Protected)
export function useUnblockTutor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tutorId: string) => {
      const { data } = await apiClient.patch(`/users/${tutorId}/unblock-tutor`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutors'] });
    },
  });
}

// Update Tutor Subjects - Admin Only (Protected)
export function useUpdateTutorSubjects() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tutorId,
      subjects,
    }: {
      tutorId: string;
      subjects: string[];
    }) => {
      const { data } = await apiClient.patch(`/users/${tutorId}/subjects`, {
        subjects,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutors'] });
    },
  });
}