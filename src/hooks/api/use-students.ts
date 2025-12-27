import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/auth-store';

// Types
export interface Student {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  grade?: string;
  subjects?: string[];
  status: 'active' | 'inactive' | 'blocked';
  subscription?: {
    plan: string;
    expiresAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface StudentFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

// Get All Students - Admin Only (Protected)
export function useStudents(filters: StudentFilters = {}) {
  const { isAuthenticated, user } = useAuthStore();
  const { page = 1, limit = 10, search = '', status } = filters;

  return useQuery({
    queryKey: ['students', { page, limit, search, status }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('limit', String(limit));
      if (search) params.append('search', search);
      if (status) params.append('status', status);

      const { data } = await apiClient.get(`/users?role=STUDENT&${params}`);
      return data as {
        data: Student[];
        meta: { total: number; page: number; limit: number };
      };
    },
    enabled: isAuthenticated && user?.role === 'SUPER_ADMIN',
  });
}

// Get Single Student (Protected)
export function useStudent(studentId: string) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['students', studentId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/users/${studentId}/user`);
      return data.data as Student;
    },
    enabled: isAuthenticated && !!studentId,
  });
}

// Block Student - Admin Only (Protected)
export function useBlockStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (studentId: string) => {
      const { data } = await apiClient.patch(`/users/${studentId}/block`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}

// Unblock Student - Admin Only (Protected)
export function useUnblockStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (studentId: string) => {
      const { data } = await apiClient.patch(`/users/${studentId}/unblock`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}