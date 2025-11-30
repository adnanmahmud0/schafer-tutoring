'use client';

import React, { useState } from 'react';
import {  BookOpen } from 'lucide-react';
import Image from 'next/image';
import Session from '@/app/shared/Session';

export default function Dashboard() {
  const [dateRange, setDateRange] = useState('current');
  const [startDate, setStartDate] = useState('01/11/2025');
  const [endDate, setEndDate] = useState('01/11/2025');

  // Sample data
  const currentLevel = 2;
  const progressToNextLevel = 75; // percentage
  const lessonsLeft = 4;
  const nextLevelEarnings = '17€';
  const nextLevel = 3;

  const stats = {
    sessions: {
      value: '156.5',
      unit: 'h',
      total: '42 h',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    earnings: {
      value: '156.5',
      unit: '€',
      total: '1,880 €',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    trialSessions: {
      value: '99',
      unit: '%',
      total: '75 k',
      icon: BookOpen,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  };

  return (
    <div className=" mx-auto p-6 space-y-6">
      {/* Level Progress Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Level Progress</h2>
          <div className="flex items-center gap-2 bg-[#002AC8] text-white px-4 py-2 rounded-lg">
            <Image width={24} height={24} src="/badge-wt.svg" alt="Badge Yellow" />
            <span className="font-semibold">Level {currentLevel}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Progress to Level {nextLevel}</span>
            <span className="text-[#3052D2]">{lessonsLeft} Lesson Left</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-[#002AC8] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>

          {/* Earnings Info */}
          <div className="bg-[#FFF4E6] border mt-5 border-[#FFB256] rounded-lg p-3 flex items-start gap-2">
            <Image width={24} height={24} src="/badge-yl.svg" alt="Badge Yellow" />
            <p className="text-sm text-amber-800">
              Hourly earnings will grow to <span className="font-semibold">{nextLevelEarnings}</span> on <span className="font-semibold text-[#3052D2]">level {nextLevel}</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full border border-gray-100">
        <div className="mb-4">
        <div className="bg-blue-50 p-3 rounded-full w-fit">
            <Image src="/cap.svg" alt="Cap Icon" width={24} height={24} className="text-blue-500" />
        </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
        <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Sessions</h3>
            <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">156.5</span>
            <span className="text-lg text-gray-500">h</span>
            </div>
        </div>
        <p className="text-sm text-gray-500 mt-3">Total: 42 h</p>
        </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full border border-gray-100">
        <div className="mb-4">
        <div className="bg-green-50 p-3 rounded-full w-fit">
            <Image src="/dollar.svg" alt="Wallet Icon" width={24} height={24} />
        </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
        <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Earnings</h3>
            <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">1,880</span>
            <span className="text-lg text-gray-500">€</span>
            </div>
        </div>
        <p className="text-sm text-gray-500 mt-3">Total: 1.890 €</p>
        </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full border border-gray-100">
        <div className="mb-4">
        <div className="bg-orange-50 p-3 rounded-full w-fit">
            <BookOpen className="text-[#FF8A00]" size={24} />
        </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
        <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Trial Sessions</h3>
            <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">99</span>
            <span className="text-lg text-gray-500">%</span>
            </div>
        </div>
        <p className="text-sm text-gray-500 mt-3">Total: 75%</p>
        </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full border border-gray-100">    
        <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="dateRange" value="current" checked={dateRange === 'current'} onChange={(e) => setDateRange(e.target.value)} className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700 text-sm">Current month</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="dateRange" value="last" checked={dateRange === 'last'} onChange={(e) => setDateRange(e.target.value)} className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700 text-sm">Last month</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="dateRange" value="custom" checked={dateRange === 'custom'} onChange={(e) => setDateRange(e.target.value)} className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700 text-sm">Custom range</span>
        </label>
        </div>

        {dateRange === 'custom' && (
        <div className="flex gap-3 mt-4">
            <p>From</p>
            <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="From" className="px-3 w-28 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p>To</p>
            <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="To" className="px-3 w-28 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        )}
    </div>
    </div>

        <Session></Session>
    </div>
  );
}