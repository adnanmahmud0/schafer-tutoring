import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/auth-store';

// Types
export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'enterprise';
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'trialing' | 'incomplete';

export interface Subscription {
  _id: string;
  user: string;
  stripeSubscriptionId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlanUsage {
  sessionsUsed: number;
  sessionsLimit: number;
  messagesUsed: number;
  messagesLimit: number;
  storageUsed: number;
  storageLimit: number;
}

export interface PaymentHistoryItem {
  _id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed' | 'refunded';
  description: string;
  createdAt: string;
  invoiceUrl?: string;
}

export interface PaymentHistoryResponse {
  data: PaymentHistoryItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

export interface SetupIntentResponse {
  clientSecret: string;
}

// Constants
export const PLAN_DISPLAY_NAMES: Record<SubscriptionTier, string> = {
  free: 'Free',
  basic: 'Basic',
  premium: 'Premium',
  enterprise: 'Enterprise',
};

export const PLAN_DETAILS: Record<SubscriptionTier, { price: number; features: string[] }> = {
  free: {
    price: 0,
    features: ['Limited sessions', 'Basic support'],
  },
  basic: {
    price: 9.99,
    features: ['10 sessions/month', 'Email support', 'Session recordings'],
  },
  premium: {
    price: 29.99,
    features: ['Unlimited sessions', 'Priority support', 'Session recordings', 'Analytics'],
  },
  enterprise: {
    price: 99.99,
    features: ['Everything in Premium', 'Dedicated support', 'Custom integrations'],
  },
};

export const CARD_BRAND_ICONS: Record<string, string> = {
  visa: '💳',
  mastercard: '💳',
  amex: '💳',
  discover: '💳',
  default: '💳',
};

// Subscription Hooks

// Get Current Subscription
export function useMySubscription() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['my-subscription'],
    queryFn: async () => {
      const { data } = await apiClient.get('/subscriptions/my-subscription');
      return data.data as Subscription | null;
    },
    enabled: isAuthenticated,
  });
}

// Get Plan Usage
export function usePlanUsage() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['plan-usage'],
    queryFn: async () => {
      const { data } = await apiClient.get('/subscriptions/usage');
      return data.data as PlanUsage;
    },
    enabled: isAuthenticated,
  });
}

// Get Payment History
export function usePaymentHistory(page = 1, limit = 10) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['payment-history', page, limit],
    queryFn: async () => {
      const { data } = await apiClient.get('/payments/history', {
        params: { page, limit },
      });
      return data as PaymentHistoryResponse;
    },
    enabled: isAuthenticated,
  });
}

// Cancel Subscription
export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post('/subscriptions/cancel');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-subscription'] });
    },
  });
}

// Payment Method Hooks

// Get Payment Methods
export function usePaymentMethods() {
  const { isAuthenticated, user } = useAuthStore();
  const isStudent = user?.role === 'student';

  return useQuery({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const { data } = await apiClient.get('/payment-methods');
      return data.data as PaymentMethod[];
    },
    enabled: isAuthenticated && isStudent,
  });
}

// Create Setup Intent (for adding new payment method)
export function useCreateSetupIntent() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post('/payment-methods/setup-intent');
      return data.data as SetupIntentResponse;
    },
  });
}

// Attach Payment Method
export function useAttachPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ paymentMethodId, setAsDefault = false }: { paymentMethodId: string; setAsDefault?: boolean }) => {
      const { data } = await apiClient.post('/payment-methods/attach', {
        paymentMethodId,
        setAsDefault,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
    },
  });
}

// Set Default Payment Method
export function useSetDefaultPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentMethodId: string) => {
      const { data } = await apiClient.patch(`/payment-methods/${paymentMethodId}/default`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
    },
  });
}

// Delete Payment Method
export function useDeletePaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentMethodId: string) => {
      const { data } = await apiClient.delete(`/payment-methods/${paymentMethodId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
    },
  });
}
