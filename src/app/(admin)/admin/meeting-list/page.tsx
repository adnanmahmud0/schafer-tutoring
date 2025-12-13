'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface Meeting {
  id: number;
  applicantName: string;
  subject: string;
  scheduledDate: string;
  scheduledTime: string;
}

const MeetingList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const allMeetings: Meeting[] = [
    {
      id: 1,
      applicantName: 'John b',
      subject: 'Physics',
      scheduledDate: '10/09/25',
      scheduledTime: '9:00 Pm CET',
    },
    {
      id: 2,
      applicantName: 'John b',
      subject: 'Physics',
      scheduledDate: '10/09/25',
      scheduledTime: '9:00 Pm CET',
    },
    {
      id: 3,
      applicantName: 'John b',
      subject: 'Chemistry',
      scheduledDate: '10/09/25',
      scheduledTime: '9:00 Pm CET',
    },
    {
      id: 4,
      applicantName: 'John b',
      subject: 'Chemistry',
      scheduledDate: '10/09/25',
      scheduledTime: '9:00 Pm CET',
    },
    {
      id: 5,
      applicantName: 'John b',
      subject: 'Biology',
      scheduledDate: '10/09/25',
      scheduledTime: '9:00 Pm CET',
    },
    {
      id: 6,
      applicantName: 'John b',
      subject: 'Biology',
      scheduledDate: '10/09/25',
      scheduledTime: '9:00 Pm CET',
    },
    {
      id: 7,
      applicantName: 'John b',
      subject: 'Math',
      scheduledDate: '10/09/25',
      scheduledTime: '9:00 Pm CET',
    },
    {
      id: 8,
      applicantName: 'John b',
      subject: 'English',
      scheduledDate: '10/09/25',
      scheduledTime: '9:00 Pm CET',
    },
    {
      id: 9,
      applicantName: 'Sarah Smith',
      subject: 'History',
      scheduledDate: '10/09/25',
      scheduledTime: '10:00 Am CET',
    },
  ];

  const filteredMeetings = allMeetings.filter((meeting) => {
    const matchesSearch =
      meeting.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedMeetings = filteredMeetings.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative w-1/3">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          placeholder="Search here......."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 pr-4 h-11 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400"
        />
      </div>

      {/* Table Section */}
      <Card>
        <CardContent className="pt-6">
          {/* Table */}
          <div className="overflow-x-auto">
            <div className="border border-gray-200 rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                      Applicant Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                      Subject
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                      Scheduled Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                      Scheduled Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMeetings.map((meeting) => (
                    <tr
                      key={meeting.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-gray-900 font-medium text-sm">
                        {meeting.applicantName}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {meeting.subject}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {meeting.scheduledDate}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {meeting.scheduledTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end pt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      className={
                        currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={page === currentPage}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (
                        (page === 2 && currentPage > 3) ||
                        (page === totalPages - 1 &&
                          currentPage < totalPages - 2)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    }
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(totalPages, prev + 1)
                        )
                      }
                      className={
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingList;