'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Star, X } from 'lucide-react';

export default function Session() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const upcomingSessions = [
    { id: 1, studentName: 'David Brown', date: 'Friday, 14.11.2025', time: '3:00 PM', subject: 'Physics', isTrialSession: false },
    { id: 2, studentName: 'Lisa Anderson', date: 'Friday, 14.11.2025', time: '3:00 PM', subject: 'Mathematics', isTrialSession: true },
    { id: 3, studentName: 'Sarah Johnson', date: 'Friday, 14.11.2025', time: '3:00 PM', subject: 'Chemistry', isTrialSession: false }
  ];

  const completedSessions = [
    { id: 4, studentName: 'David Brown', date: 'Friday, 14.11.2025', time: '3:00 PM', subject: 'Physics', isTrialSession: false },
    { id: 5, studentName: 'Lisa Anderson', date: 'Friday, 14.11.2025', time: '3:00 PM', subject: 'Mathematics', isTrialSession: true }
  ];

  const sessions = activeTab === 'upcoming' ? upcomingSessions : completedSessions;

  const handleSubmitFeedback = () => {
    console.log('Feedback:', { rating, feedback });
    setShowFeedbackModal(false);
    setRating(0);
    setFeedback('');
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Session Overview</h2>

        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-3 font-medium text-sm transition-colors ${
              activeTab === 'upcoming'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming Sessions ({upcomingSessions.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 font-medium text-sm transition-colors ${
              activeTab === 'completed'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
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
                  <h3 className="font-semibold text-gray-900">{session.studentName}</h3>
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
                  <a href="#" className="text-[#405ED5] hover:text-[#3052D2] font-medium">
                    {session.subject}
                  </a>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => activeTab === 'completed' && setShowFeedbackModal(true)}
                className={`ml-4 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === 'upcoming'
                    ? 'bg-gray-500 text-white hover:bg-gray-600'
                    : 'bg-[#002AC8] text-white hover:bg-[#3052D2]'
                }`}
              >
                {activeTab === 'upcoming' ? 'Start Session' : 'Give Feedback'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Modal – আপনার স্টাইল মেনটেইন করা */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl border-2 border-[#F6F6F7] w-full max-w-lg">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Give Feedback</h3>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Rating */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">How was your session?</p>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={32}
                        className={star <= rating ? 'fill-[#FF8A00] text-[#FF8A00]' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback (optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full p-4 border-2 border-[#F6F6F7] rounded-lg text-sm focus:outline-none focus:border-[#405ED5] transition"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="flex-1 px-6 py-3 bg-[#002AC8] text-white rounded-lg font-medium hover:bg-[#3052D2] transition"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}