"use client";

import { useState } from "react";
import { CreditCard, Download, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
];

export default function StudentSubscriptionPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(paymentHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = paymentHistory.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto space-y-6">
        {/* Current Plan Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">Current Plan</h2>
            <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#FF8A00] hover:bg-[#ee8607] text-white font-semibold rounded-lg transition-colors text-sm sm:text-base">
              Change Plan
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Plan Card */}
            <div className="bg-[#002AC8] text-white rounded-xl p-6">
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
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Payment Method</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Visa ending in 4242</p>
                <p className="text-sm text-gray-500">Expires 12/2027</p>
              </div>
            </div>

            <button className="px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Change Method
            </button>
          </div>
        </div>

        {/* Payment Overview Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">Payment Overview</h2>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg">
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
                {paginatedData.map((record, index) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-gray-200 ${index !== paginatedData.length - 1 ? 'border-b' : ''}`}>
                      {record.period}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-gray-200 ${index !== paginatedData.length - 1 ? 'border-b' : ''}`}>
                      {record.sessions}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-center border-gray-200 ${index !== paginatedData.length - 1 ? 'border-b' : ''}`}>
                      {record.amount}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-center ${index !== paginatedData.length - 1 ? 'border-b border-gray-200' : ''}`}>
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
            {paginatedData.map((record) => (
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNum)}
                            isActive={currentPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}