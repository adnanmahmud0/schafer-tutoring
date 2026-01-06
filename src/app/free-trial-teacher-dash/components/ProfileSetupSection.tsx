'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Loader2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useStripeConnect } from '@/hooks/api/use-stripe';

interface ProfileSetupSectionProps {
  userEmail: string;
  userName: string;
}

interface SetupStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted: boolean;
  action?: () => void;
  actionLabel?: string;
  isLoading?: boolean;
}

export function ProfileSetupSection({ userEmail, userName }: ProfileSetupSectionProps) {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    status: stripeStatus,
    statusLoading,
    startOnboarding,
    isCreatingAccount,
    isGettingLink,
  } = useStripeConnect();

  const handleStripeSetup = async () => {
    setIsRedirecting(true);
    try {
      const onboardingUrl = await startOnboarding();
      if (onboardingUrl) {
        window.location.href = onboardingUrl;
      } else {
        toast.success('Stripe account is already set up!');
        setIsRedirecting(false);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to start Stripe onboarding');
      setIsRedirecting(false);
    }
  };

  const handleProfileSetup = () => {
    router.push('/teacher/profile');
  };

  const isStripeComplete = stripeStatus?.isOnboardingComplete ?? false;
  const hasStripeAccount = stripeStatus?.hasStripeAccount ?? false;
  const isStripeLoading = isCreatingAccount || isGettingLink || isRedirecting;

  const steps: SetupStep[] = [
    {
      id: 'profile',
      title: 'Complete Your Profile',
      description: 'Add your photo, bio, and teaching experience',
      icon: <User className="h-5 w-5" />,
      isCompleted: false, // This would ideally check if profile is complete
      action: handleProfileSetup,
      actionLabel: 'Set Up Profile',
    },
    {
      id: 'stripe',
      title: 'Set Up Payment Account',
      description: 'Connect your Stripe account to receive payments',
      icon: <CreditCard className="h-5 w-5" />,
      isCompleted: isStripeComplete,
      action: handleStripeSetup,
      actionLabel: hasStripeAccount && !isStripeComplete ? 'Complete Setup' : 'Connect Stripe',
      isLoading: isStripeLoading,
    },
  ];

  const completedSteps = steps.filter((s) => s.isCompleted).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Welcome, {userName}!
            </CardTitle>
            <CardDescription>
              Complete these steps to start tutoring
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={
              completedSteps === steps.length
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }
          >
            {completedSteps}/{steps.length} Complete
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
              step.isCompleted
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Step Number/Icon */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                step.isCompleted
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {step.isCompleted ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                step.icon
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900">{step.title}</h4>
              <p className="text-sm text-gray-500 mt-0.5">{step.description}</p>
            </div>

            {/* Action Button */}
            {step.action && !step.isCompleted && (
              <Button
                variant={step.isCompleted ? 'outline' : 'default'}
                size="sm"
                onClick={step.action}
                disabled={step.isLoading}
                className={step.isCompleted ? '' : 'bg-black hover:bg-gray-800'}
              >
                {step.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    {step.actionLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}

            {step.isCompleted && (
              <Badge className="bg-green-100 text-green-700 border-0">
                <CheckCircle className="mr-1 h-3 w-3" />
                Done
              </Badge>
            )}
          </div>
        ))}

        {/* Stripe Status Info */}
        {statusLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          </div>
        ) : hasStripeAccount && !isStripeComplete ? (
          <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Complete Your Stripe Account Setup
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                Your Stripe account is created but needs additional information before you can receive payments.
              </p>
            </div>
          </div>
        ) : null}

        {/* All Complete Message */}
        {completedSteps === steps.length && (
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">
                You&apos;re all set!
              </p>
              <p className="text-sm text-green-700 mt-1">
                Your profile is complete and you can now start accepting students.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ProfileSetupSection;
