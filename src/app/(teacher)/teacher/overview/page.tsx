'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { BookOpen, Star, Square, Check } from 'lucide-react';
import Image from 'next/image';
import Session from '@/app/shared/Session';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";


type FeedbackStep = 'recording' | 'success';

function FeedbackModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState<FeedbackStep>('recording');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitialized = useRef(false);

  // এখানে useLayoutEffect ব্যবহার করলাম → কোনো warning আসবে না
  useLayoutEffect(() => {
    if (isOpen && !hasInitialized.current) {
      hasInitialized.current = true;

      // Reset everything
     

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 59) {
            clearInterval(intervalRef.current!);
            return 59;
          }
          return prev + 1;
        });
      }, 1000);
    }

    // Cleanup when modal closes
    if (!isOpen) {
      hasInitialized.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen]);

  const stopAndSubmit = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentStep('success');
    setTimeout(() => {
      onClose();
      hasInitialized.current = false; // Reset for next open
    }, 2000);
  };

  const handleClose = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    hasInitialized.current = false;
    onClose();
  };

  const formatTime = (sec: number) => `0:${sec.toString().padStart(2, '0')}`;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white border-0 p-0 overflow-hidden">
        <VisuallyHidden>
    <DialogTitle>Feedback Modal</DialogTitle>
  </VisuallyHidden>
        <DialogHeader>
      <DialogTitle>Give Feedback</DialogTitle>
      <DialogDescription>
        Record your audio feedback or skip to write text feedback.
      </DialogDescription>
  </DialogHeader>

        {/* Recording Step */}
        {currentStep === 'recording' && (
          <div className="py-12 px-8 text-center space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Share Your Feedback</h2>

            {/* Star Rating */}
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover-scale"
                >
                  <Star
                    size={38}
                    className={
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                </button>
              ))}
            </div>

            {/* Pulsing Stop Button (Recording is ON) */}
            <button
              onClick={stopAndSubmit}
              className="w-36 h-36 bg-red-600 rounded-full flex items-center justify-center mx-auto animate-pulse shadow-2xl"
            >
              <Square size={64} className="text-white fill-white" />
            </button>

            <p className="text-5xl font-bold text-gray-900">
              {formatTime(recordingTime)}
            </p>

            <button
              onClick={handleClose}
              className="text-sm text-gray-500 underline hover:text-gray-700"
            >
              Skip audio feedback
            </button>

            <div className="flex gap-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={stopAndSubmit} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Submit Feedback
              </Button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {currentStep === 'success' && (
          <div className="py-16 px-8 text-center space-y-6">
            <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center">
              <Check size={56} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
            <p className="text-lg text-gray-600">Your feedback was submitted successfully</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ================ DASHBOARD ================
export default function Dashboard() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Session থেকে feedback চাইলে এটা শুনবে (কোনো prop লাগবে না)
  useEffect(() => {
    const openModal = () => setIsFeedbackOpen(true);
    window.addEventListener('openFeedbackModal', openModal);
    return () => window.removeEventListener('openFeedbackModal', openModal);
  }, []);

  return (
    <div className="mx-auto p-6 space-y-6">
      {/* Level Progress */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Level Progress</h2>
          <div className="flex items-center gap-2 bg-[#002AC8] text-white px-4 py-2 rounded-lg">
            <Image width={24} height={24} src="/badge-wt.svg" alt="Badge" />
            <span className="font-semibold">Level 2</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Progress to Level 3</span>
            <span className="text-[#3052D2]">4 Lesson Left</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-[#002AC8] h-full rounded-full transition-all" style={{ width: '75%' }} />
          </div>
          <div className="bg-[#FFF4E6] border border-[#FFB256] rounded-lg p-3 flex items-start gap-2 mt-5">
            <Image width={24} height={24} src="/badge-yl.svg" alt="Badge" />
            <p className="text-sm text-amber-800">
              Hourly earnings will grow to <span className="font-semibold">17€</span> on level 3.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="mb-4 bg-blue-50 p-3 rounded-full w-fit"><Image src="/cap.svg" alt="" width={24} height={24} /></div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Sessions</h3>
          <div className="text-3xl font-bold text-gray-900">156.5 <span className="text-lg text-gray-500">h</span></div>
          <p className="text-sm text-gray-500 mt-3">Total: 42 h</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="mb-4 bg-green-50 p-3 rounded-full w-fit"><Image src="/dollar.svg" alt="" width={24} height={24} /></div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Earnings</h3>
          <div className="text-3xl font-bold text-gray-900">1,880 <span className="text-lg text-gray-500">€</span></div>
          <p className="text-sm text-gray-500 mt-3">Total: 1.890 €</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="mb-4 bg-orange-50 p-3 rounded-full w-fit"><BookOpen className="text-[#FF8A00]" size={24} /></div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Trial Sessions</h3>
          <div className="text-3xl font-bold text-gray-900">99 <span className="text-lg text-gray-500">%</span></div>
          <p className="text-sm text-gray-500 mt-3">Total: 75%</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="mb-4 bg-[#F3F3F3] p-3 rounded-full w-fit"><Image src="/users.svg" alt="" width={24} height={24} /></div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">The Number of Students</h3>
          <div className="text-3xl font-bold text-gray-900">150</div>
          <p className="text-sm text-gray-500 mt-3">Total: 27</p>
        </div>
      </div>

      {/* তোমার Session – কোনো prop ছাড়াই */}
      <Session />

      {/* Feedback Modal */}
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </div>
  );
}