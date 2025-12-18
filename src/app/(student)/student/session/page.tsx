"use client";

import React, { useState } from "react";
import { Calendar, Clock, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

function FeedbackModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    console.log("Feedback submitted with rating:", rating);
    setShowSuccess(true);
    setTimeout(() => {
      onClose();
      setShowSuccess(false);
      setRating(0);
    }, 2000);
  };

  const handleClose = () => {
    setRating(0);
    setHoverRating(0);
    setShowSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white border-0 p-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Feedback Modal</DialogTitle>
        </VisuallyHidden>

        {!showSuccess ? (
          <div className="py-6 sm:py-8 px-4 sm:px-6 text-center space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Share Your Feedback
            </h2>

            {/* Star Rating */}
            <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400 w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10"
                        : "text-gray-300 w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10"
                    }
                  />
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 sm:gap-4 pt-3 sm:pt-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 h-9 sm:h-10 text-sm sm:text-base"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-[#002AC8] hover:bg-blue-700 h-9 sm:h-10 text-sm sm:text-base"
              >
                Submit
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-10 sm:py-12 px-4 sm:px-6 text-center space-y-4 sm:space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center">
              <Check className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Success!</h3>
            <p className="text-base sm:text-lg text-gray-600">
              Your review was submitted Successfully
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function StudentSession() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const upcomingSessions = [
    {
      id: 1,
      tutorName: "John Smith",
      subject: "Mathematics",
      date: "Friday, 14.11.2025",
      time: "3:00 PM",
    },
    {
      id: 2,
      tutorName: "Sarah Johnson",
      subject: "Physics",
      date: "Saturday, 15.11.2025",
      time: "2:00 PM",
    },
    {
      id: 3,
      tutorName: "Mike Davis",
      subject: "Chemistry",
      date: "Sunday, 16.11.2025",
      time: "4:00 PM",
    },
  ];

  const completedSessions = [
    {
      id: 4,
      tutorName: "John Smith",
      subject: "Mathematics",
      date: "Friday, 07.11.2025",
      time: "3:00 PM",
    },
    {
      id: 5,
      tutorName: "Sarah Johnson",
      subject: "Physics",
      date: "Thursday, 06.11.2025",
      time: "2:00 PM",
    },
    {
      id: 6,
      tutorName: "Emily Brown",
      subject: "English",
      date: "Wednesday, 05.11.2025",
      time: "5:00 PM",
    },
    {
      id: 7,
      tutorName: "Mike Davis",
      subject: "Biology",
      date: "Tuesday, 04.11.2025",
      time: "1:00 PM",
    },
  ];

  const sessions =
    activeTab === "upcoming" ? upcomingSessions : completedSessions;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 lg:space-y-6 mb-4 sm:mb-5 lg:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-5 lg:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Subscription Usage
          </h2>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#002AC8] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg w-fit">
            <Image width={20} height={20} src="/badge-wt.svg" alt="Badge" className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-semibold text-sm sm:text-base">Regular Plan</span>
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
            <span>Usage 75%</span>
            <span className="text-[#3052D2]">1 Lesson Left</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3">
            <div
              className="bg-[#002AC8] h-full rounded-full transition-all"
              style={{ width: "75%" }}
            />
          </div>
          <div className="bg-[#FFF4E6] border border-[#FFB256] rounded-lg p-2.5 sm:p-3 flex items-start gap-2 mt-3 sm:mt-5">
            <Image width={20} height={20} src="/badge-yl.svg" alt="Badge" className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-amber-800">
              Your current usage amounts to{" "}
              <span className="font-semibold">112€</span> this month
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 lg:p-6">
        {/* Header */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5 lg:mb-6">
          Session Overview
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-7 lg:mb-8 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-2 sm:pb-2.5 lg:pb-3 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
              activeTab === "upcoming"
                ? "text-[#002AC8] border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Upcoming ({upcomingSessions.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-2 sm:pb-2.5 lg:pb-3 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
              activeTab === "completed"
                ? "text-[#002AC8] border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Sessions List */}
        <div className="space-y-3 sm:space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg hover:bg-gray-50 border-2 border-[#F6F6F7] transition-colors gap-3 sm:gap-0"
            >
              {/* Left Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1.5 sm:mb-2">
                  {session.tutorName}
                </h3>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-gray-400 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-gray-400 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{session.time}</span>
                  </div>
                  <p className="text-[#405ED5] hover:text-[#3052D2] font-medium">
                    {session.subject}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() =>
                  activeTab === "completed" && setIsFeedbackModalOpen(true)
                }
                className={`sm:ml-4 px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors w-full sm:w-auto ${
                  activeTab === "upcoming"
                    ? "bg-gray-500 text-white hover:bg-gray-600 cursor-not-allowed"
                    : "bg-[#002AC8] text-white hover:bg-blue-700"
                }`}
                disabled={activeTab === "upcoming"}
              >
                {activeTab === "upcoming" ? "Join Session" : "Give Feedback"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </>
  );
}