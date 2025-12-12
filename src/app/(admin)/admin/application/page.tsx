'use client';

import React, { useState } from 'react';
import { Search, MoreVertical, FileText } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Application {
  id: number;
  applicantName: string;
  subject: string;
  applicationDate: string;
  phoneNumber: string;
  sessionStatus: 'pending' | 'scheduled' | 'cancelled' | 'accepted' | 'declined';
  status: 'all' | 'scheduled' | 'cancelled' | 'pending' | 'accepted';
}

const ApplicationManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const allApplications: Application[] = [
    {
      id: 1,
      applicantName: 'John b',
      subject: 'Physics',
      applicationDate: '10/09/25',
      phoneNumber: '8801545654654',
      sessionStatus: 'pending',
      status: 'all',
    },
    {
      id: 2,
      applicantName: 'John b',
      subject: 'Physics',
      applicationDate: '10/09/25',
      phoneNumber: '8801545654654',
      sessionStatus: 'pending',
      status: 'all',
    },
    {
      id: 3,
      applicantName: 'John b',
      subject: 'Chemistry',
      applicationDate: '10/09/25',
      phoneNumber: '8801545654654',
      sessionStatus: 'pending',
      status: 'all',
    },
    {
      id: 4,
      applicantName: 'John b',
      subject: 'Chemistry',
      applicationDate: '10/09/25',
      phoneNumber: '8801545654654',
      sessionStatus: 'pending',
      status: 'all',
    },
    {
      id: 5,
      applicantName: 'John b',
      subject: 'Biology',
      applicationDate: '10/09/25',
      phoneNumber: '8801545654654',
      sessionStatus: 'pending',
      status: 'all',
    },
    {
      id: 6,
      applicantName: 'John b',
      subject: 'Biology',
      applicationDate: '10/09/25',
      phoneNumber: '8801545654654',
      sessionStatus: 'pending',
      status: 'all',
    },
    {
      id: 7,
      applicantName: 'John b',
      subject: 'Math',
      applicationDate: '10/09/25',
      phoneNumber: '8801545654654',
      sessionStatus: 'pending',
      status: 'all',
    },
  ];

  const filteredApplications = allApplications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.subject.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'scheduled') return app.sessionStatus === 'scheduled' && matchesSearch;
    if (activeTab === 'cancelled') return app.sessionStatus === 'cancelled' && matchesSearch;
    if (activeTab === 'pending') return app.sessionStatus === 'pending' && matchesSearch;
    if (activeTab === 'accepted') return app.sessionStatus === 'accepted' && matchesSearch;
    return matchesSearch;
  });

  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const statCard = {
    label: 'Total Application',
    value: '$124,563',
    change: '+12.5%',
    icon: <FileText className="text-blue-600" size={24} />,
    bgColor: 'bg-blue-50',
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Card - 1/4 width */}
      <div className="w-1/4">
        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className={`${statCard.bgColor} p-2 rounded-full w-fit mb-2`}>
                  {statCard.icon}
                </div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {statCard.label}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {statCard.value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search - No background, border only */}
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
          <CardHeader className="pb-4">
            <TabsList className="grid w-full grid-cols-5 bg-transparent p-0 h-auto">
              <TabsTrigger
                value="all"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                All Request
              </TabsTrigger>
              <TabsTrigger
                value="scheduled"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Scheduled
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
              <TabsTrigger
                value="accepted"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Accepted
              </TabsTrigger>
            </TabsList>
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
                          Applicant Name
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                          Subject
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                          Application Date
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                          Phone Number
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                          Session Status
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedApplications.map((app) => (
                        <tr
                          key={app.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4 text-gray-900 font-medium text-sm">
                            {app.applicantName}
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {app.subject}
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {app.applicationDate}
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {app.phoneNumber}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`${getStatusColor(app.sessionStatus)} border-0`}>
                              {app.sessionStatus.charAt(0).toUpperCase() + app.sessionStatus.slice(1)}
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
                                <Link href="/admin/application-details">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                </Link>
                                <Link href="/admin/edit-tutor">
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem className="text-green-600">
                                  Accept
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  Decline
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
    </div>
  );
};

export default ApplicationManagement;