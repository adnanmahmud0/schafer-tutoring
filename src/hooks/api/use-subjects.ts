import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

// Types
export interface Subject {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Get All Subjects (Public - No token required)
export function useSubjects() {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const { data } = await apiClient.get('/subjects');
      return data.data as Subject[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
}

// Get Active Subjects Only (Public - No token required)
export function useActiveSubjects() {
  return useQuery({
    queryKey: ['subjects', 'active'],
    queryFn: async () => {
      const { data } = await apiClient.get('/subjects/active');
      return data.data as Subject[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Get Single Subject (Public - No token required)
export function useSubject(subjectId: string) {
  return useQuery({
    queryKey: ['subjects', subjectId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/subjects/${subjectId}`);
      return data.data as Subject;
    },
    enabled: !!subjectId,
    staleTime: 5 * 60 * 1000,
  });
}