"use client";

import React, { useState } from "react";
import { Calendar, Clock, Star, X, Mic, Square, Check } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type FeedbackStep = "audio" | "text" | "success";

function AudioFeedbackModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState<FeedbackStep>("audio");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingInterval, setRecordingInterval] =
    useState<NodeJS.Timeout | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  React.useEffect(() => {
    if (!isOpen) {
      setCurrentStep("audio");
      setRecordingTime(0);
      setIsRecording(false);
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    }
  }, [isOpen]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    const interval = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 59) {
          clearInterval(interval);
          return 59;
        }
        return prev + 1;
      });
    }, 1000);
    setRecordingInterval(interval);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingInterval) {
      clearInterval(recordingInterval);
    }
    setCurrentStep("success");
  };

  const handleSkipAudio = () => {
    setIsRecording(false);
    if (recordingInterval) {
      clearInterval(recordingInterval);
    }
    setCurrentStep("text");
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleSubmitText = () => {
    setCurrentStep("success");
  };

  const handleClose = () => {
    setIsRecording(false);
    if (recordingInterval) {
      clearInterval(recordingInterval);
    }
    setCurrentStep("audio");
    setRecordingTime(0);
    setRating(0);
    setHoverRating(0);
    setFeedbackText("");
    onClose();
  };

  const formatTime = (seconds: number) =>
    `0:${seconds.toString().padStart(2, "0")}`;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white border-0 p-0">
        <VisuallyHidden>
          <DialogTitle>Feedback Modal</DialogTitle>
        </VisuallyHidden>
        {/* Audio Step */}
        {currentStep === "audio" && (
          <div className="space-y-6 py-8 px-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Share Your Feedback
            </h2>

            {/* Star Rating - Clickable */}
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>

            {/* Button - Changes based on recording state */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className="w-32 h-32 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center mx-auto transition-colors shadow-lg"
            >
              {isRecording ? (
                <Square size={56} className="text-white fill-white" />
              ) : (
                <Mic size={56} className="text-white" />
              )}
            </button>

            {/* Timer - Shows only when recording */}
            {isRecording && (
              <p className="text-2xl font-bold text-gray-900">
                {formatTime(recordingTime)}
              </p>
            )}

            {/* Skip Link */}
            <button
              onClick={handleSkipAudio}
              className="text-gray-600 hover:text-gray-800 text-sm underline"
            >
              Skip Audio Feedback
            </button>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={stopRecording}
                disabled={!isRecording}
                className={`flex-1 px-6 py-3 text-white rounded-lg font-medium transition ${
                  isRecording
                    ? "bg-gray-400 hover:bg-gray-500 cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Text Feedback Step */}
        {currentStep === "text" && (
          <div className="space-y-6 py-8 px-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Share Your Feedback
            </h2>

            {/* Star Rating - clickable */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Type your feedback here..."
              rows={4}
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 transition"
            />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitText}
                className="flex-1 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-medium transition"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {currentStep === "success" && (
          <div className="space-y-6 py-10 px-6 text-center">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Message */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Success!
              </h3>
              <p className="text-gray-600">
                Your review was submitted Successfully
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Close
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Session() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showAudioFeedbackModal, setShowAudioFeedbackModal] = useState(false);

  const upcomingSessions = [
    {
      id: 1,
      studentName: "David Brown",
      date: "Friday, 14.11.2025",
      time: "3:00 PM",
      subject: "Physics",
      isTrialSession: false,
    },
    {
      id: 2,
      studentName: "Lisa Anderson",
      date: "Friday, 14.11.2025",
      time: "3:00 PM",
      subject: "Mathematics",
      isTrialSession: true,
    },
    {
      id: 3,
      studentName: "Sarah Johnson",
      date: "Friday, 14.11.2025",
      time: "3:00 PM",
      subject: "Chemistry",
      isTrialSession: false,
    },
  ];

  const completedSessions = [
    {
      id: 4,
      studentName: "David Brown",
      date: "Friday, 14.11.2025",
      time: "3:00 PM",
      subject: "Physics",
      isTrialSession: false,
    },
    {
      id: 5,
      studentName: "Lisa Anderson",
      date: "Friday, 14.11.2025",
      time: "3:00 PM",
      subject: "Mathematics",
      isTrialSession: true,
    },
  ];

  const sessions =
    activeTab === "upcoming" ? upcomingSessions : completedSessions;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Session Overview
        </h2>

        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-3 font-medium text-sm transition-colors ${
              activeTab === "upcoming"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Upcoming Sessions ({upcomingSessions.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-3 font-medium text-sm transition-colors ${
              activeTab === "completed"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Completed Sessions ({completedSessions.length})
          </button>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 border-2 border-[#F6F6F7] transition-colors"
            >
              {/* Left Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {session.studentName}
                  </h3>
                  {session.isTrialSession && (
                    <span className="text-xs font-semibold text-[#FF8A00] bg-orange-100 px-2 py-1 rounded-3xl">
                      Trial Session
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-gray-400" />
                    <span>{session.time}</span>
                  </div>
                  <a
                    href="#"
                    className="text-[#405ED5] hover:text-[#3052D2] font-medium"
                  >
                    {session.subject}
                  </a>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() =>
                  activeTab === "completed" && setShowAudioFeedbackModal(true)
                }
                className={`ml-4 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === "upcoming"
                    ? "bg-gray-500 text-white hover:bg-gray-600"
                    : "bg-[#002AC8] text-white hover:bg-[#3052D2]"
                }`}
              >
                {activeTab === "upcoming" ? "Start Session" : "Give Feedback"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Audio Feedback Modal */}
      <AudioFeedbackModal
        isOpen={showAudioFeedbackModal}
        onClose={() => setShowAudioFeedbackModal(false)}
      />
    </>
  );
}
