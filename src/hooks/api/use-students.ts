import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/auth-store';

// Types
export interface Student {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  phone?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'RESTRICTED';
  studentProfile?: {
    hasCompletedTrial: boolean;
    trialRequestsCount: number;
    sessionRequestsCount: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface StudentFilters {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: 'ACTIVE' | 'RESTRICTED';
}

// Get All Students - Admin Only (Protected)
// Backend route: /api/v1/user/students (singular "user")
export function useStudents(filters: StudentFilters = {}) {
  const { isAuthenticated, user } = useAuthStore();

  return useQuery({
    queryKey: ['students', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.page) params.append('page', String(filters.page));
      if (filters.limit) params.append('limit', String(filters.limit));
      if (filters.searchTerm) params.append('searchTerm', filters.searchTerm);
      if (filters.status) params.append('status', filters.status);

      const { data } = await apiClient.get(`/user/students?${params}`);
      return data as {
        data: Student[];
        pagination: {
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

// Get Single Student (Protected)
export function useStudent(studentId: string) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['students', studentId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/user/${studentId}/user`);
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
      const { data } = await apiClient.patch(`/user/students/${studentId}/block`);
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
      const { data } = await apiClient.patch(`/user/students/${studentId}/unblock`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}