import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore, User } from '@/store/auth-store';
import { useRouter } from 'next/navigation';

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'TUTOR';
}

interface VerifyEmailData {
  email: string;
  oneTimeCode: number;
}

interface ResetPasswordData {
  newPassword: string;
  confirmPassword: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

interface ProfileResponse {
  success: boolean;
  data: {
    _id: string;
    role: string;
    studentProfile?: {
      hasCompletedTrial?: boolean;
    };
  };
}

// Decode JWT token to get user data
const decodeToken = (token: string): { id: string; role: string; email: string } | null => {
  try {
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));
    return payload;
  } catch {
    return null;
  }
};

// Role-based redirect map
const REDIRECT_MAP: Record<string, string> = {
  STUDENT: '/student/session',
  TUTOR: '/teacher/overview',
  SUPER_ADMIN: '/admin/overview',
  APPLICANT: '/free-trial-teacher-dash',
};

// Helper function to get redirect path for students based on trial status
const getStudentRedirectPath = async (accessToken: string): Promise<string> => {
  try {
    // Fetch profile to check trial status
    const { data } = await apiClient.get<ProfileResponse>('/user/profile', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // If student hasn't completed trial, redirect to free trial dashboard
    if (data.data?.studentProfile?.hasCompletedTrial === false) {
      return '/free-trial-student-dash';
    }

    // Otherwise, redirect to regular student dashboard
    return '/student/session';
  } catch {
    // If profile fetch fails, default to regular student dashboard
    return '/student/session';
  }
};

// Login Hook (Public)
export function useLogin() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await apiClient.post<AuthResponse>(
        '/auth/login',
        credentials
      );
      return data;
    },
    onSuccess: async (response) => {
      const { accessToken } = response.data;

      // Decode token to get user data
      const decoded = decodeToken(accessToken);
      if (!decoded) {
        throw new Error('Invalid token');
      }

      const user: User = {
        _id: decoded.id,
        email: decoded.email,
        role: decoded.role as User['role'],
        name: '', // Will be fetched from profile
        isVerified: true,
      };

      setAuth(user, accessToken);

      // For students, check trial completion status before redirect
      if (user.role === 'STUDENT') {
        const redirectPath = await getStudentRedirectPath(accessToken);
        router.push(redirectPath);
      } else {
        router.push(REDIRECT_MAP[user.role] || '/');
      }
    },
  });
}

// Register Hook (Public)
export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData: RegisterData) => {
      const { data } = await apiClient.post('/users', userData);
      return data;
    },
    onSuccess: (_, variables) => {
      // Store email for OTP page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pendingVerificationEmail', variables.email);
      }
      router.push('/otp');
    },
  });
}

// Logout Hook (Protected)
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const clearAllAuthData = () => {
    // Clear React Query cache
    queryClient.clear();

    if (typeof window !== 'undefined') {
      // Clear localStorage FIRST (before zustand can re-persist)
      localStorage.removeItem('auth-storage');

      // Clear sessionStorage
      sessionStorage.clear();

      // Clear all cookies from frontend (non-httpOnly ones)
      document.cookie.split(';').forEach((cookie) => {
        const name = cookie.split('=')[0].trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });
    }

    // Clear Zustand store AFTER localStorage removal
    useAuthStore.getState().logout();

    // Force clear localStorage again to ensure it's gone
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-storage');
    }
  };

  return useMutation({
    mutationFn: async () => {
      try {
        await apiClient.post('/auth/logout');
      } catch (error) {
        // Ignore API errors - we'll clear local state anyway
        console.warn('Logout API failed, clearing local state:', error);
      }
    },
    onSettled: () => {
      // Always clear local auth data and redirect, whether API succeeded or failed
      clearAllAuthData();
      router.push('/login');
    },
  });
}

// Profile with tutorProfile (for profile page)
export interface TutorProfileData {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  profilePicture?: string;
  role: string;
  tutorProfile?: {
    subjects?: Array<{ _id: string; name: string }>;
    address?: string;
    birthDate?: string;
    bio?: string;
    languages?: string[];
    isVerified?: boolean;
  };
}

// Get Profile Hook (Protected)
export function useProfile() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await apiClient.get('/user/profile');
      return data.data as TutorProfileData;
    },
    enabled: isAuthenticated,
  });
}

// Update Profile Hook (Protected)
export function useUpdateProfile() {
  const { updateUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: Partial<User>) => {
      const { data } = await apiClient.patch('/user/profile', profileData);
      return data;
    },
    onSuccess: (response) => {
      updateUser(response.data);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

// Verify Email Hook (Public)
export function useVerifyEmail() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (otpData: VerifyEmailData) => {
      const { data } = await apiClient.post('/auth/verify-email', otpData);
      return data;
    },
    onSuccess: () => {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('pendingVerificationEmail');
      }
      router.push('/login');
    },
  });
}

// Resend Verification Email Hook (Public)
export function useResendVerifyEmail() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await apiClient.post('/auth/resend-verify-email', {
        email,
      });
      return data;
    },
  });
}

// Forget Password Hook (Public)
export function useForgetPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await apiClient.post('/auth/forget-password', { email });
      return data;
    },
  });
}

// Reset Password Hook (Public)
export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      resetData,
      token,
    }: {
      resetData: ResetPasswordData;
      token: string;
    }) => {
      const { data } = await apiClient.post('/auth/reset-password', resetData, {
        headers: { Authorization: token },
      });
      return data;
    },
    onSuccess: () => {
      router.push('/login');
    },
  });
}

// Change Password Hook (Protected)
export function useChangePassword() {
  return useMutation({
    mutationFn: async (passwordData: {
      currentPassword: string;
      newPassword: string;
    }) => {
      const { data } = await apiClient.patch(
        '/auth/change-password',
        passwordData
      );
      return data;
    },
  });
}

// Refresh Token Hook - Get new access token with updated role
export function useRefreshToken() {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      // The refresh token is stored in httpOnly cookie, so just call the endpoint
      const { data } = await apiClient.post<AuthResponse>('/auth/refresh-token');
      return data;
    },
    onSuccess: (response) => {
      const { accessToken } = response.data;

      // Decode token to get updated user data (with new role)
      const decoded = decodeToken(accessToken);
      if (!decoded) {
        throw new Error('Invalid token');
      }

      const user: User = {
        _id: decoded.id,
        email: decoded.email,
        role: decoded.role as User['role'],
        name: '',
        isVerified: true,
      };

      // Update auth store with new token and user data
      setAuth(user, accessToken);
    },
  });
}