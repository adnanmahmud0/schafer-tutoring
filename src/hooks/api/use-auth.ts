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
  STUDENT: '/student/overview',
  TUTOR: '/teacher/overview',
  SUPER_ADMIN: '/admin/overview',
  APPLICANT: '/free-trial-teacher-dash',
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
    onSuccess: (response) => {
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
      router.push(REDIRECT_MAP[user.role] || '/');
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
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/logout');
    },
    onSuccess: () => {
      logout();
      queryClient.clear();
      router.push('/login');
    },
    onError: () => {
      // Even if API fails, logout locally
      logout();
      queryClient.clear();
      router.push('/login');
    },
  });
}

// Get Profile Hook (Protected)
export function useProfile() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await apiClient.get('/users/profile');
      return data.data as User;
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
      const { data } = await apiClient.patch('/users/profile', profileData);
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