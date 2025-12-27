"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const Page2 = () => {
  const [step, setStep] = useState(2);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10)); // November 2025
  const [selectedDate, setSelectedDate] = useState(18);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00am - 11:00am');

  const timeSlots = [
    '10:00am - 11:00am',
    '11:00am - 12:00pm',
    '12:00pm - 1:00pm',
    '2:00pm - 3:00pm',
    '3:00pm - 4:00pm'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const prevMonthDays = getDaysInMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
        {/* Application Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">Teacher Application Progress</h2>

          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex items-start justify-between relative mb-4">
              {/* Progress Line Background */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300" style={{ left: '4%', right: '4%' }}></div>
              
              {/* Progress Line Fill */}
              <div 
                className="absolute top-4 h-0.5 bg-[#0B31BD] transition-all duration-500"
                style={{ left: '4%', width: '46%' }}
              ></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center relative z-10 flex-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0B31BD] mb-3">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-center text-gray-900 font-medium max-w-[80px] sm:max-w-none">
                  Application Review
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center relative z-10 flex-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0B31BD] mb-3">
                  <span className="text-white text-sm font-semibold">2</span>
                </div>
                <span className="text-xs sm:text-sm text-center text-gray-900 font-medium">
                  Interview
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center relative z-10 flex-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 mb-3">
                  <span className="text-gray-600 text-sm font-semibold">3</span>
                </div>
                <span className="text-xs sm:text-sm text-center text-gray-600 font-medium max-w-[80px] sm:max-w-none">
                  Profile Setup
                </span>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className="bg-[#FFF4E6] border border-[#FFD700] rounded-lg p-4">
            <p className="font-semibold text-gray-900 text-sm sm:text-base">Your Application has been approved for the interview phase</p>
            <p className="text-xs sm:text-sm text-gray-700 mt-1">Please Select an available interview slot.</p>
          </div>
        </div>

        {/* Schedule Interview Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Schedule Interview</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div>
              <p className="text-sm font-medium text-gray-900 mb-3">Date</p>
              
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4 px-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <span className="font-semibold text-gray-900 text-sm">{getMonthName(currentMonth)}</span>
                <button
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="border border-gray-300 rounded-lg p-2 sm:p-3">
                {/* Week Days */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-600 py-1">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((dayObj, idx) => (
                    <button
                      key={idx}
                      onClick={() => dayObj.isCurrentMonth && setSelectedDate(dayObj.day)}
                      disabled={!dayObj.isCurrentMonth}
                      className={`aspect-square flex items-center justify-center rounded text-xs sm:text-sm font-medium transition-all ${
                        !dayObj.isCurrentMonth
                          ? 'text-gray-400 cursor-not-allowed'
                          : selectedDate === dayObj.day
                            ? 'bg-[#0B31BD] text-white font-semibold'
                            : 'text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {dayObj.day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Slots Section */}
            <div>
              <p className="text-sm font-medium text-gray-900 mb-3">Available Time Slots</p>
              
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <label
                    key={slot}
                    className={`flex items-center gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTimeSlot === slot
                        ? 'border-[#0B31BD] bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedTimeSlot === slot
                        ? 'border-[#0B31BD]'
                        : 'border-gray-400'
                    }`}>
                      {selectedTimeSlot === slot && (
                        <div className="w-2 h-2 rounded-full bg-[#0B31BD]"></div>
                      )}
                    </div>
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot}
                      checked={selectedTimeSlot === slot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium text-gray-900">{slot}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Schedule Button */}
          <button className="w-full mt-8 px-6 py-3 bg-[#0B31BD] text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors text-sm sm:text-base">
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page2;