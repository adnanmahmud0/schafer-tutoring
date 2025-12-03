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
          <div className="py-8 px-6 text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Share Your Feedback
            </h2>

            {/* Star Rating */}
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={40}
                    className={
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-12 px-6 text-center space-y-6">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center">
              <Check size={48} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Success!</h3>
            <p className="text-lg text-gray-600">
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
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Subscription Usage
          </h2>
          <div className="flex items-center gap-2 bg-[#002AC8] text-white px-4 py-2 rounded-lg">
            <Image width={24} height={24} src="/badge-wt.svg" alt="Badge" />
            <span className="font-semibold">Regular Plan</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Usage 75%</span>
            <span className="text-[#3052D2]">1 Lesson Left</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-[#002AC8] h-full rounded-full transition-all"
              style={{ width: "75%" }}
            />
          </div>
          <div className="bg-[#FFF4E6] border border-[#FFB256] rounded-lg p-3 flex items-start gap-2 mt-5">
            <Image width={24} height={24} src="/badge-yl.svg" alt="Badge" />
            <p className="text-sm text-amber-800">
              Your current usage amounts to{" "}
              <span className="font-semibold">112€</span> this month
            </p>
          </div>
        </div>
      </div>
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
                <h3 className="font-semibold text-gray-900 mb-2">
                  {session.tutorName}
                </h3>

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
                  activeTab === "completed" && setIsFeedbackModalOpen(true)
                }
                className={`ml-4 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === "upcoming"
                    ? "bg-gray-500 text-white hover:bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
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