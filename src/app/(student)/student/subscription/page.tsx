"use client";

import { useState, useEffect, useRef } from "react";
import { CreditCard, Download, Loader2 } from "lucide-react";
import Image from "next/image";

interface PaymentRecord {
  id: string;
  period: string;
  sessions: number;
  amount: string;
}

const paymentHistory: PaymentRecord[] = [
  { id: "1", period: "Oct 25", sessions: 12, amount: "238.50 €" },
  { id: "2", period: "Sep 25", sessions: 18, amount: "327.00 €" },
  { id: "3", period: "Aug 25", sessions: 16, amount: "228.15 €" },
  { id: "4", period: "Jul 25", sessions: 14, amount: "196.00 €" },
  { id: "5", period: "Jun 25", sessions: 20, amount: "350.00 €" },
  { id: "6", period: "May 25", sessions: 15, amount: "262.50 €" },
  { id: "7", period: "Apr 25", sessions: 10, amount: "185.00 €" },
  { id: "8", period: "Mar 25", sessions: 22, amount: "410.00 €" },
  { id: "9", period: "Feb 25", sessions: 14, amount: "250.00 €" },
  { id: "10", period: "Jan 25", sessions: 19, amount: "340.00 €" },
];

export default function StudentSubscriptionPage() {
  // Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const itemsPerPage = 6;

  const displayedData = paymentHistory.slice(0, visibleCount);
  const hasMore = visibleCount < paymentHistory.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true);
          // Simulate network delay
          setTimeout(() => {
            setVisibleCount((prev) => prev + itemsPerPage);
            setIsLoadingMore(false);
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, isLoadingMore]);

  return (
    <div className="space-y-4 sm:space-y-5 lg:space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 lg:space-y-6">
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

      {/* Current Plan Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 lg:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Current Plan</h2>
          <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#002AC8] text-white font-semibold rounded-lg transition-colors text-sm sm:text-base">
            Change Plan
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Plan Card */}
          <div className="bg-white border border-[#002AC8] rounded-xl p-6">
            <p className="text-sm font-medium mb-2 opacity-90">Plan</p>
            <p className="text-xl font-bold">Regular</p>
          </div>

          {/* Monthly Session Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Monthly Session</p>
            <p className="text-xl font-bold text-gray-900">At least 4</p>
          </div>

          {/* Price/Session Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Price/Session</p>
            <p className="text-xl font-bold text-gray-900">28€</p>
          </div>

          {/* Period Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Period</p>
            <p className="text-xl font-bold text-gray-900">1 Month</p>
          </div>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 lg:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
          <button className="px-4 sm:px-6 py-2 bg-[#002AC8] text-white font-semibold rounded-lg transition-colors text-sm sm:text-base">
            Change Method
          </button>
        </div>


        <div className="">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Visa ending in 4242</p>
              <p className="text-sm text-gray-500">Expires 12/2027</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Overview Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 lg:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-5 lg:mb-6">Payment Overview</h2>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg -mb-14">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  Period
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  Sessions
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  Amount
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((record, index) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-gray-200 ${index !== displayedData.length - 1 ? 'border-b' : ''}`}>
                    {record.period}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-gray-200 ${index !== displayedData.length - 1 ? 'border-b' : ''}`}>
                    {record.sessions}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-center border-gray-200 ${index !== displayedData.length - 1 ? 'border-b' : ''}`}>
                    {record.amount}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-center ${index !== displayedData.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <button className="bg-[#002AC8] text-white px-6 py-2 rounded-lg hover:bg-[#0024a8] transition-colors font-medium inline-flex items-center gap-2">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {displayedData.map((record) => (
            <div key={record.id} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Period</p>
                  <p className="text-sm font-semibold text-gray-900">{record.period}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Sessions</p>
                  <p className="text-sm font-semibold text-gray-900">{record.sessions}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 font-medium">Amount</p>
                  <p className="text-base font-bold text-gray-900">{record.amount}</p>
                </div>
              </div>
              <button className="w-full bg-[#002AC8] text-white px-4 py-2 rounded-lg hover:bg-[#0024a8] transition-colors font-medium inline-flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>

        {/* Infinite Scroll Trigger & Loader */}
        <div ref={observerTarget} className="h-14 w-full flex items-center justify-center p-4">
          {isLoadingMore && (
            <Loader2 className="w-6 h-6 animate-spin text-[#002AC8]" />
          )}
        </div>
      </div>
    </div>
  );
}
