'use client';

import React, { useState } from 'react';
import { Search, MoreVertical, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
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

interface Transaction {
  id: number;
  transactionId: string;
  amount: string;
  date: string;
  sessionStatus: 'success' | 'pending' | 'failed';
}

const TransactionManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const allTransactions: Transaction[] = [
    {
      id: 1,
      transactionId: 'TXN100123',
      amount: '€50',
      date: '10/09/25',
      sessionStatus: 'success',
    },
    {
      id: 2,
      transactionId: 'TXN100123',
      amount: '€50',
      date: '10/09/25',
      sessionStatus: 'success',
    },
    {
      id: 3,
      transactionId: 'TXN100123',
      amount: '€50',
      date: '10/09/25',
      sessionStatus: 'success',
    },
    {
      id: 4,
      transactionId: 'TXN100123',
      amount: '€50',
      date: '10/09/25',
      sessionStatus: 'success',
    },
    {
      id: 5,
      transactionId: 'TXN100123',
      amount: '€50',
      date: '10/09/25',
      sessionStatus: 'success',
    },
    {
      id: 6,
      transactionId: 'TXN100123',
      amount: '€50',
      date: '10/09/25',
      sessionStatus: 'success',
    },
    {
      id: 7,
      transactionId: 'TXN100123',
      amount: '€50',
      date: '10/09/25',
      sessionStatus: 'success',
    },
    {
      id: 8,
      transactionId: 'TXN100123',
      amount: '€50',
      date: '10/09/25',
      sessionStatus: 'pending',
    },
    {
      id: 9,
      transactionId: 'TXN100124',
      amount: '€75',
      date: '10/09/25',
      sessionStatus: 'failed',
    },
  ];

  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.amount.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'success') return transaction.sessionStatus === 'success' && matchesSearch;
    if (activeTab === 'pending') return transaction.sessionStatus === 'pending' && matchesSearch;
    return matchesSearch;
  });

  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const statCard = {
    label: 'Total Earnings',
    value: '$124,563',
    icon: <DollarSign className="text-green-600" size={24} />,
    bgColor: 'bg-green-50',
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
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
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
          <CardHeader className="pb-4">
            <TabsList className="grid w-1/3 grid-cols-3 bg-transparent p-0 h-auto">
              <TabsTrigger
                value="all"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                All Transaction
              </TabsTrigger>
              <TabsTrigger
                value="success"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Success
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Pending
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
                          Transaction ID
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                          Date
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
                      {paginatedTransactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4 text-gray-900 font-medium text-sm">
                            {transaction.transactionId}
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {transaction.amount}
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {transaction.date}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`${getStatusColor(transaction.sessionStatus)} border-0`}>
                              {transaction.sessionStatus.charAt(0).toUpperCase() + transaction.sessionStatus.slice(1)}
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
                                <DropdownMenuItem>View Details</DropdownMenuItem>
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

export default TransactionManagement;