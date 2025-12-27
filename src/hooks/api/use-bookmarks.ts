import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/auth-store';

// Types
export interface Bookmark {
  _id: string;
  user: string;
  tutor: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    subjects?: string[];
    rating?: number;
  };
  createdAt: string;
}

// Get My Bookmarks (Protected)
export function useBookmarks() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const { data } = await apiClient.get('/bookmarks/my-bookmarks');
      return data.data as Bookmark[];
    },
    enabled: isAuthenticated,
  });
}

// Toggle Bookmark (Protected)
export function useToggleBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tutorId: string) => {
      const { data } = await apiClient.post('/bookmarks', { tutorId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
}

// Check if Tutor is Bookmarked
export function useIsBookmarked(tutorId: string) {
  const { data: bookmarks } = useBookmarks();

  return bookmarks?.some((b) => b.tutor._id === tutorId) ?? false;
}