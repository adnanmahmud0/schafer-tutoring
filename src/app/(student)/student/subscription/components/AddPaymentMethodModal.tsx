'use client';

import { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useCreateSetupIntent, useAttachPaymentMethod } from '@/hooks/api/use-subscription';

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddPaymentMethodModal({ isOpen, onClose }: AddPaymentMethodModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSetupIntent = useCreateSetupIntent();
  const attachPaymentMethod = useAttachPaymentMethod();

  const handleAddPaymentMethod = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create a setup intent
      const { clientSecret } = await createSetupIntent.mutateAsync();

      // In a real implementation, you would:
      // 1. Load Stripe.js
      // 2. Use the clientSecret to confirm the setup
      // 3. Collect card details using Stripe Elements
      // 4. Call attachPaymentMethod with the payment method ID

      // For now, we'll show a message that Stripe integration is needed
      setError('Stripe Elements integration required. Please configure Stripe.');

    } catch (err) {
      setError('Failed to initialize payment setup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription>
            Add a new credit or debit card to your account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Placeholder for Stripe Elements */}
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-sm text-gray-500">
              Stripe Elements will be mounted here
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Securely enter your card details
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAddPaymentMethod} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Card
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
