'use client';

import React, { useState } from 'react';
import { Search, MoreVertical, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { toast } from 'sonner';
import {
  useAdminApplications,
  useSelectForInterview,
  useApproveApplication,
  useRejectApplication,
  type AdminApplicationStatus,
} from '@/hooks/api';

const ApplicationManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | AdminApplicationStatus>('all');
  const itemsPerPage = 10;

  // Build filters based on active tab
  const filters = {
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: searchTerm || undefined,
    status: activeTab === 'all' ? undefined : activeTab,
  };

  // Fetch applications
  const { data, isLoading, isFetching, error } = useAdminApplications(filters);

  // Mutations
  const { mutate: selectForInterview, isPending: isSelecting } = useSelectForInterview();
  const { mutate: approveApplication, isPending: isApproving } = useApproveApplication();
  const { mutate: rejectApplication, isPending: isRejecting } = useRejectApplication();

  const applications = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPage || 1;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as 'all' | AdminApplicationStatus);
    setCurrentPage(1);
  };

  const handleSelectForInterview = (id: string) => {
    selectForInterview(
      { id },
      {
        onSuccess: () => toast.success('Application selected for interview'),
        onError: (error: any) => {
          toast.error(error?.getFullMessage?.() || error?.message || 'Failed to select for interview');
        },
      }
    );
  };

  const handleApprove = (id: string) => {
    approveApplication(
      { id },
      {
        onSuccess: () => toast.success('Application approved successfully'),
        onError: (error: any) => {
          toast.error(error?.getFullMessage?.() || error?.message || 'Failed to approve application');
        },
      }
    );
  };

  const handleReject = (id: string) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    rejectApplication(
      { id, rejectionReason: reason },
      {
        onSuccess: () => toast.success('Application rejected'),
        onError: (error: any) => {
          toast.error(error?.getFullMessage?.() || error?.message || 'Failed to reject application');
        },
      }
    );
  };

  const getStatusColor = (status: AdminApplicationStatus) => {
    switch (status) {
      case 'SUBMITTED':
        return 'bg-yellow-100 text-yellow-800';
      case 'SELECTED_FOR_INTERVIEW':
        return 'bg-blue-100 text-blue-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'REVISION':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: AdminApplicationStatus) => {
    switch (status) {
      case 'SUBMITTED':
        return 'Pending';
      case 'SELECTED_FOR_INTERVIEW':
        return 'Interview';
      case 'APPROVED':
        return 'Approved';
      case 'REJECTED':
        return 'Rejected';
      case 'REVISION':
        return 'Revision';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  };

  // Skeleton rows for table loading
  const TableSkeleton = () => (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="border-b border-gray-100">
          <td className="py-3 px-4">
            <Skeleton className="h-4 w-32" />
          </td>
          <td className="py-3 px-4">
            <Skeleton className="h-4 w-24" />
          </td>
          <td className="py-3 px-4">
            <Skeleton className="h-4 w-20" />
          </td>
          <td className="py-3 px-4">
            <Skeleton className="h-4 w-28" />
          </td>
          <td className="py-3 px-4">
            <Skeleton className="h-6 w-16 rounded-full" />
          </td>
          <td className="py-3 px-4">
            <Skeleton className="h-8 w-8 rounded" />
          </td>
        </tr>
      ))}
    </>
  );

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">Error loading applications. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <div className="w-1/4">
        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="bg-blue-50 p-2 rounded-full w-fit mb-2">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Total Applications
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {meta?.total || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative w-1/3">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          placeholder="Search by name, email, phone..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 pr-4 h-11 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400"
        />
      </div>

      {/* Table Section */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <Card>
          <CardHeader className="pb-4">
            <TabsList className="grid w-full grid-cols-6 bg-transparent p-0 h-auto">
              <TabsTrigger
                value="all"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="SUBMITTED"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="SELECTED_FOR_INTERVIEW"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Interview
              </TabsTrigger>
              <TabsTrigger
                value="APPROVED"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Approved
              </TabsTrigger>
              <TabsTrigger
                value="REJECTED"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Rejected
              </TabsTrigger>
              <TabsTrigger
                value="REVISION"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Revision
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
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading || isFetching ? (
                        <TableSkeleton />
                      ) : applications.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-500">
                            No applications found
                          </td>
                        </tr>
                      ) : (
                        applications.map((app) => (
                          <tr
                            key={app._id}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-3 px-4 text-gray-900 font-medium text-sm">
                              {app.name}
                            </td>
                            <td className="py-3 px-4 text-gray-600 text-sm">
                              {app.subjects.map((s) => s.name).join(', ') || '-'}
                            </td>
                            <td className="py-3 px-4 text-gray-600 text-sm">
                              {formatDate(app.submittedAt)}
                            </td>
                            <td className="py-3 px-4 text-gray-600 text-sm">
                              {app.phoneNumber}
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={`${getStatusColor(app.status)} border-0`}>
                                {getStatusLabel(app.status)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    disabled={isSelecting || isApproving || isRejecting}
                                  >
                                    <MoreVertical size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <Link href={`/admin/application-details?id=${app._id}`}>
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                  </Link>

                                  {/* Show Select for Interview for SUBMITTED/REVISION */}
                                  {(app.status === 'SUBMITTED' || app.status === 'REVISION') && (
                                    <DropdownMenuItem
                                      className="text-blue-600"
                                      onClick={() => handleSelectForInterview(app._id)}
                                    >
                                      Select for Interview
                                    </DropdownMenuItem>
                                  )}

                                  {/* Show Approve for SELECTED_FOR_INTERVIEW */}
                                  {app.status === 'SELECTED_FOR_INTERVIEW' && (
                                    <DropdownMenuItem
                                      className="text-green-600"
                                      onClick={() => handleApprove(app._id)}
                                    >
                                      Approve
                                    </DropdownMenuItem>
                                  )}

                                  {/* Show Reject for non-approved/rejected */}
                                  {app.status !== 'APPROVED' && app.status !== 'REJECTED' && (
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => handleReject(app._id)}
                                    >
                                      Reject
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {applications.length > 0 && (
                <div className="flex items-center justify-between pt-6">
                  <p className="text-sm text-gray-500 whitespace-nowrap">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, meta?.total || 0)} of {meta?.total || 0} results
                  </p>
                  <Pagination className="justify-end mx-0">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                          className={
                            currentPage === 1
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
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
                          (page === totalPages - 1 && currentPage < totalPages - 2)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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