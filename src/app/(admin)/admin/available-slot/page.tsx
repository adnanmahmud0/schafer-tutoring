'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AvailableSlots = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFinalView, setShowFinalView] = useState(false);
  
  // Date selection
  const [selectedDate, setSelectedDate] = useState(17);
  const [selectedMonth, setSelectedMonth] = useState('September');
  const [selectedYear, setSelectedYear] = useState(2023);
  
  // Time selection
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [timeFormat, setTimeFormat] = useState<'AM' | 'PM'>('AM');

  const daysInMonth = 30;
  const firstDayOfWeek = 2;
  
  const weekDays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  
  const amTimes = [
    '12:00 AM',
    '02:00 AM',
    '04:00 AM',
    '06:00 AM',
    '08:00 AM',
    '10:00 AM',
  ];

  const pmTimes = [
    '01:00 AM',
    '03:00 AM',
    '05:00 AM',
    '07:00 AM',
    '09:00 AM',
    '11:00 AM',
  ];

  const times = timeFormat === 'AM' ? amTimes : pmTimes;

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
  };

  const handleTimeClick = (time: string) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  const handleSaveModal = () => {
    setIsModalOpen(false);
    setShowFinalView(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const isDateSelected = (day: number) => day === selectedDate;
  const isDateInRange = (day: number) => day >= 17 && day <= 30;
  const isTimeSelected = (time: string) => selectedTimes.includes(time);

  // First View - Before modal
  if (!showFinalView) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Date Section */}
          <Card className="border-gray-200">
            <CardContent className="pt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Date</h3>
              
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button className="text-gray-600 hover:text-gray-900">
                  <ChevronLeft size={20} />
                </button>
                <p className="text-sm font-medium text-gray-900">
                  {selectedMonth} {selectedYear}
                </p>
                <button className="text-gray-600 hover:text-gray-900">
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Week days header */}
              <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {weekDays.map((day) => (
                  <p key={day} className="text-xs font-medium text-gray-600 py-2">
                    {day}
                  </p>
                ))}
              </div>

              {/* Calendar */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day && handleDateClick(day)}
                    disabled={!day}
                    className={`py-2 rounded-full text-sm font-medium transition-colors ${
                      !day
                        ? 'text-gray-300'
                        : isDateInRange(day)
                        ? isDateSelected(day)
                          ? 'bg-[#0B31BD] text-white'
                          : 'bg-[#0B31BD] text-white hover:bg-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Section */}
          <Card className="border-gray-200">
            <CardContent className="pt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Time</h3>
              
              {/* AM/PM Toggle */}
              <div className="flex gap-2 border border-gray-200 rounded-lg p-1 mb-4">
                <button
                  onClick={() => setTimeFormat('AM')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded transition-colors ${
                    timeFormat === 'AM'
                      ? 'bg-[#0B31BD] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  AM
                </button>
                <button
                  onClick={() => setTimeFormat('PM')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded transition-colors ${
                    timeFormat === 'PM'
                      ? 'bg-[#0B31BD] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  PM
                </button>
              </div>

              {/* Time Slots Grid */}
              <div className="grid grid-cols-2 gap-2">
                {times.map((time) => (
                  <button
                    key={time}
                    className={`py-2 px-3 text-sm font-medium rounded border transition-colors ${
                      'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Set Available Time Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleOpenModal}
            className="bg-[#0B31BD] hover:bg-blue-800 text-white font-medium py-2 px-12 rounded-lg"
          >
            Set Available Time
          </Button>
        </div>

        {/* Modal for setting slots */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Select Date & Time</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              {/* Date Section in Modal */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-900">Select Class Date</h4>
                
                {/* Month Navigation */}
                <div className="flex items-center justify-between">
                  <button className="text-gray-600 hover:text-gray-900">
                    <ChevronLeft size={18} />
                  </button>
                  <p className="text-xs font-medium text-gray-900">
                    {selectedMonth} {selectedYear}
                  </p>
                  <button className="text-gray-600 hover:text-gray-900">
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Week days header */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {weekDays.map((day) => (
                    <p key={day} className="text-xs font-medium text-gray-600 py-1">
                      {day}
                    </p>
                  ))}
                </div>

                {/* Calendar */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && handleDateClick(day)}
                      disabled={!day}
                      className={`py-1.5 text-xs font-medium rounded-full transition-colors ${
                        !day
                          ? 'text-gray-300'
                          : isDateInRange(day)
                          ? isDateSelected(day)
                            ? 'bg-[#0B31BD] text-white'
                            : 'bg-[#0B31BD] text-white hover:bg-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Section in Modal */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-900">Time</h4>
                
                {/* AM/PM Toggle */}
                <div className="flex gap-1 border border-gray-200 rounded-lg p-0.5">
                  <button
                    onClick={() => setTimeFormat('AM')}
                    className={`flex-1 py-1 px-2 text-xs font-medium rounded transition-colors ${
                      timeFormat === 'AM'
                        ? 'bg-[#0B31BD] text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => setTimeFormat('PM')}
                    className={`flex-1 py-1 px-2 text-xs font-medium rounded transition-colors ${
                      timeFormat === 'PM'
                        ? 'bg-[#0B31BD] text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    PM
                  </button>
                </div>

                {/* Time Slots Grid */}
                <div className="grid grid-cols-1 gap-1">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeClick(time)}
                      className={`py-1.5 px-2 text-xs font-medium rounded border transition-colors ${
                        isTimeSelected(time)
                          ? 'bg-[#298E10] text-white border-[#298E10]'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 border-gray-300 text-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveModal}
                className="flex-1 bg-[#0B31BD] hover:bg-blue-800 text-white"
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Final View - After saving from modal
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-8">
        {/* Date Section */}
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Date</h3>
            
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button className="text-gray-600 hover:text-gray-900">
                <ChevronLeft size={20} />
              </button>
              <p className="text-sm font-medium text-gray-900">
                {selectedMonth} {selectedYear}
              </p>
              <button className="text-gray-600 hover:text-gray-900">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Week days header */}
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {weekDays.map((day) => (
                <p key={day} className="text-xs font-medium text-gray-600 py-2">
                  {day}
                </p>
              ))}
            </div>

            {/* Calendar */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  disabled={!day}
                  className={`py-2 rounded-full text-sm font-medium transition-colors ${
                    !day
                      ? 'text-gray-300'
                      : isDateInRange(day)
                      ? isDateSelected(day)
                        ? 'bg-[#0B31BD] text-white'
                        : 'bg-[#0B31BD] text-white'
                      : 'text-gray-600'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Section */}
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Time</h3>
            
            {/* AM/PM Toggle */}
            <div className="flex gap-2 border border-gray-200 rounded-lg p-1 mb-4">
              <button
                onClick={() => setTimeFormat('AM')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded transition-colors ${
                  timeFormat === 'AM'
                    ? 'bg-[#0B31BD] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                AM
              </button>
              <button
                onClick={() => setTimeFormat('PM')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded transition-colors ${
                  timeFormat === 'PM'
                    ? 'bg-[#0B31BD] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                PM
              </button>
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-2 gap-2">
              {times.map((time) => (
                <button
                  key={time}
                  className={`py-2 px-3 text-sm font-medium rounded border transition-colors ${
                    isTimeSelected(time)
                      ? 'bg-[#298E10] text-white border-[#298E10]'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Set Available Time Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => setShowFinalView(false)}
          className="bg-[#0B31BD] hover:bg-blue-800 text-white font-medium py-2 px-12 rounded-lg"
        >
          Set Available Time
        </Button>
      </div>
    </div>
  );
};

export default AvailableSlots;