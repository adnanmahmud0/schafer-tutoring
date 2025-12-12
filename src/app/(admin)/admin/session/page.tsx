'use client';

import React, { useState } from 'react';
import { Search, MoreVertical, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface Session {
  id: number;
  studentName: string;
  subject: string;
  bookingDate: string;
  paymentStatus: 'success' | 'pending' | 'cancelled';
  lessonStatus: 'completed' | 'pending' | 'cancelled';
  studentEmail: string;
  studentPhone: string;
  tutorName: string;
  tutorEmail: string;
  tutorPhone: string;
  bookingTime: string;
  scheduledTime: string;
}

const SessionManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allSessions: Session[] = [
    {
      id: 1,
      studentName: 'John b',
      subject: 'Physics',
      bookingDate: '10/09/25',
      paymentStatus: 'success',
      lessonStatus: 'completed',
      studentEmail: 'student.name@gmail.com',
      studentPhone: '+880 1717-123456',
      tutorName: 'Sarah Johnson',
      tutorEmail: 'tutor.name@gmail.com',
      tutorPhone: '+880 1912-654321',
      bookingTime: 'Nov 05, 2025 - 10:25 PM',
      scheduledTime: 'Nov 10, 2025 - 4:00 PM - 5:00 PM',
    },
    {
      id: 2,
      studentName: 'John b',
      subject: 'Physics',
      bookingDate: '10/09/25',
      paymentStatus: 'pending',
      lessonStatus: 'cancelled',
      studentEmail: 'student.name@gmail.com',
      studentPhone: '+880 1717-123456',
      tutorName: 'Sarah Johnson',
      tutorEmail: 'tutor.name@gmail.com',
      tutorPhone: '+880 1912-654321',
      bookingTime: 'Nov 05, 2025 - 10:25 PM',
      scheduledTime: 'Nov 10, 2025 - 4:00 PM - 5:00 PM',
    },
    {
      id: 3,
      studentName: 'John b',
      subject: 'Chemistry',
      bookingDate: '10/09/25',
      paymentStatus: 'cancelled',
      lessonStatus: 'completed',
      studentEmail: 'student.name@gmail.com',
      studentPhone: '+880 1717-123456',
      tutorName: 'Sarah Johnson',
      tutorEmail: 'tutor.name@gmail.com',
      tutorPhone: '+880 1912-654321',
      bookingTime: 'Nov 05, 2025 - 10:25 PM',
      scheduledTime: 'Nov 10, 2025 - 4:00 PM - 5:00 PM',
    },
    {
      id: 4,
      studentName: 'John b',
      subject: 'Chemistry',
      bookingDate: '10/09/25',
      paymentStatus: 'pending',
      lessonStatus: 'cancelled',
      studentEmail: 'student.name@gmail.com',
      studentPhone: '+880 1717-123456',
      tutorName: 'Sarah Johnson',
      tutorEmail: 'tutor.name@gmail.com',
      tutorPhone: '+880 1912-654321',
      bookingTime: 'Nov 05, 2025 - 10:25 PM',
      scheduledTime: 'Nov 10, 2025 - 4:00 PM - 5:00 PM',
    },
    {
      id: 5,
      studentName: 'John b',
      subject: 'Biology',
      bookingDate: '10/09/25',
      paymentStatus: 'success',
      lessonStatus: 'pending',
      studentEmail: 'student.name@gmail.com',
      studentPhone: '+880 1717-123456',
      tutorName: 'Sarah Johnson',
      tutorEmail: 'tutor.name@gmail.com',
      tutorPhone: '+880 1912-654321',
      bookingTime: 'Nov 05, 2025 - 10:25 PM',
      scheduledTime: 'Nov 10, 2025 - 4:00 PM - 5:00 PM',
    },
    {
      id: 6,
      studentName: 'John b',
      subject: 'Biology',
      bookingDate: '10/09/25',
      paymentStatus: 'success',
      lessonStatus: 'pending',
      studentEmail: 'student.name@gmail.com',
      studentPhone: '+880 1717-123456',
      tutorName: 'Sarah Johnson',
      tutorEmail: 'tutor.name@gmail.com',
      tutorPhone: '+880 1912-654321',
      bookingTime: 'Nov 05, 2025 - 10:25 PM',
      scheduledTime: 'Nov 10, 2025 - 4:00 PM - 5:00 PM',
    },
    {
      id: 7,
      studentName: 'John b',
      subject: 'Math',
      bookingDate: '10/09/25',
      paymentStatus: 'success',
      lessonStatus: 'completed',
      studentEmail: 'student.name@gmail.com',
      studentPhone: '+880 1717-123456',
      tutorName: 'Sarah Johnson',
      tutorEmail: 'tutor.name@gmail.com',
      tutorPhone: '+880 1912-654321',
      bookingTime: 'Nov 05, 2025 - 10:25 PM',
      scheduledTime: 'Nov 10, 2025 - 4:00 PM - 5:00 PM',
    },
    {
      id: 8,
      studentName: 'John b',
      subject: 'Math',
      bookingDate: '10/09/25',
      paymentStatus: 'success',
      lessonStatus: 'completed',
      studentEmail: 'student.name@gmail.com',
      studentPhone: '+880 1717-123456',
      tutorName: 'Sarah Johnson',
      tutorEmail: 'tutor.name@gmail.com',
      tutorPhone: '+880 1912-654321',
      bookingTime: 'Nov 05, 2025 - 10:25 PM',
      scheduledTime: 'Nov 10, 2025 - 4:00 PM - 5:00 PM',
    },
    {
      id: 9,
      studentName: 'John b',
      subject: 'Math',
      bookingDate: '10/09/25',
      paymentStatus: 'success',
      lessonStatus: 'completed',
      studentEmail: 'student.name@gmail.com',
      studentPhone: '+880 1717-123456',
      tutorName: 'Sarah Johnson',
      tutorEmail: 'tutor.name@gmail.com',
      tutorPhone: '+880 1912-654321',
      bookingTime: 'Nov 05, 2025 - 10:25 PM',
      scheduledTime: 'Nov 10, 2025 - 4:00 PM - 5:00 PM',
    },
  ];

  const filteredSessions = allSessions.filter((session) => {
    const matchesSearch =
      session.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.subject.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'success') return session.paymentStatus === 'success' && matchesSearch;
    if (activeTab === 'pending') return session.lessonStatus === 'pending' && matchesSearch;
    if (activeTab === 'cancelled') return session.lessonStatus === 'cancelled' && matchesSearch;
    return matchesSearch;
  });

  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedSessions = filteredSessions.slice(startIdx, startIdx + itemsPerPage);

  const stats = [
    {
      label: 'Total Session',
      value: '$124,563',
      icon: <Clock className="text-blue-600" size={24} />,
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Total Pending Session',
      value: '8,642',
      icon: <AlertCircle className="text-yellow-600" size={24} />,
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Total Completed Session',
      value: '15,842',
      icon: <CheckCircle className="text-green-600" size={24} />,
      bgColor: 'bg-green-50',
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleViewDetails = (session: Session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLessonStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`${stat.bgColor} p-2 rounded-full w-fit mb-2`}>
                    {stat.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <Card>
          <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
            <TabsList className="grid w-1/2 grid-cols-4 bg-transparent p-0 h-auto">
              <TabsTrigger
                value="all"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                All Session
              </TabsTrigger>
              <TabsTrigger
                value="success"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Success
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Cancelled
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Pending
              </TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              Filter by
            </Button>
          </CardHeader>

          <CardContent>
            <TabsContent value={activeTab} className="space-y-4 mt-0">
              {/* Table */}
              <div className="overflow-x-auto">
                <div className="border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Student Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Subject
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Booking Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Payment Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Lesson Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSessions.map((session) => (
                      <tr
                        key={session.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 text-gray-900 font-medium text-sm">
                          {session.studentName}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {session.subject}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {session.bookingDate}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`${getPaymentStatusColor(session.paymentStatus)} border-0`}>
                            {session.paymentStatus.charAt(0).toUpperCase() + session.paymentStatus.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`${getLessonStatusColor(session.lessonStatus)} border-0`}>
                            {session.lessonStatus.charAt(0).toUpperCase() + session.lessonStatus.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDetails(session)}>
                                View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      {/* Session Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Session Details</DialogTitle>
          </DialogHeader>

          {selectedSession && (
            <div className="space-y-6">
              {/* Booking Date & Time */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">Booking Date & Time of Request</p>
                  <p className="text-sm text-gray-900 font-medium">{selectedSession.bookingTime}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">Scheduled Lesson Date & Time</p>
                  <p className="text-sm text-gray-900 font-medium">{selectedSession.scheduledTime}</p>
                </div>
              </div>

              {/* Student Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Student Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Student Email</p>
                    <p className="text-sm text-gray-900">{selectedSession.studentEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Student Phone</p>
                    <p className="text-sm text-gray-900">{selectedSession.studentPhone}</p>
                  </div>
                </div>
              </div>

              {/* Tutor Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Tutor Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Tutor Email</p>
                    <p className="text-sm text-gray-900">{selectedSession.tutorEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Tutor Phone</p>
                    <p className="text-sm text-gray-900">{selectedSession.tutorPhone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-600 mb-1">Subject</p>
                    <p className="text-sm text-gray-900">{selectedSession.subject}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-600 mb-1">Payment Status</p>
                    <Badge className={`${getPaymentStatusColor(selectedSession.paymentStatus)} border-0 w-fit`}>
                      {selectedSession.paymentStatus.charAt(0).toUpperCase() + selectedSession.paymentStatus.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SessionManagement;