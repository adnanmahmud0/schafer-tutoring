"use client";

import React, { useState } from "react";
import { Search, MoreVertical, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Student {
  id: number;
  name: string;
  email: string;
  registrationDate: string;
  classBooked: number;
  status: "active" | "blocked";
}

const StudentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const allStudents: Student[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@gmail.com",
      registrationDate: "10/09/25",
      classBooked: 10,
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@gmail.com",
      registrationDate: "10/09/25",
      classBooked: 10,
      status: "active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@gmail.com",
      registrationDate: "10/09/25",
      classBooked: 10,
      status: "active",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@gmail.com",
      registrationDate: "10/09/25",
      classBooked: 10,
      status: "blocked",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@gmail.com",
      registrationDate: "10/09/25",
      classBooked: 10,
      status: "active",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa@gmail.com",
      registrationDate: "10/09/25",
      classBooked: 10,
      status: "active",
    },
    {
      id: 7,
      name: "Tom Martinez",
      email: "tom@gmail.com",
      registrationDate: "10/09/25",
      classBooked: 10,
      status: "active",
    },
    {
      id: 8,
      name: "Jessica Davis",
      email: "jessica@gmail.com",
      registrationDate: "10/09/25",
      classBooked: 10,
      status: "blocked",
    },
  ];

  // Filter students based on tab and search
  const filteredStudents = allStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "blocked")
      return student.status === "blocked" && matchesSearch;
    return matchesSearch;
  });

  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const statCard = {
    label: "Total Students",
    value: "124,563",
    change: "+12.5%",
    icon: <Users className="text-blue-600" size={24} />,
    bgColor: "bg-blue-50",
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Stats Card - 1/4 width */}
      <div className="w-1/4">
        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div
                  className={`${statCard.bgColor} p-2 rounded-full w-fit mb-2`}
                >
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
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <Card className="">
          <CardHeader className="pb-4">
            <TabsList className="grid w-1/4 grid-cols-2 bg-transparent p-0 h-auto">
              <TabsTrigger
                value="all"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent  data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                All Student
              </TabsTrigger>
              <TabsTrigger
                value="blocked"
                className="bg-transparent border-0 rounded-none border-b-2 border-transparent  data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Blocked Student
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            <TabsContent value="all" className="space-y-4 mt-0">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Registration Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Class Booked
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStudents.map((student, idx) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 text-gray-900 font-medium text-sm">
                          {student.name}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {student.email}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {student.registrationDate}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {student.classBooked}
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
                              <DropdownMenuItem>Edit Student</DropdownMenuItem>
                              {student.status === "active" ? (
                                <DropdownMenuItem className="text-red-600">
                                  Block Student
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-green-600">
                                  Unblock Student
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-end pt-6 border-t-0">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(1, prev - 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
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
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </TabsContent>

            <TabsContent value="blocked" className="space-y-4 mt-0">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Registration Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Class Booked
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStudents.map((student, idx) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 text-gray-900 font-medium text-sm">
                          {student.name}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {student.email}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {student.registrationDate}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {student.classBooked}
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
                              <DropdownMenuItem>Edit Student</DropdownMenuItem>
                              {student.status === "active" ? (
                                <DropdownMenuItem className="text-red-600">
                                  Block Student
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-green-600">
                                  Unblock Student
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-end pt-6 border-t border-gray-200">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(1, prev - 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
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
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
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

export default StudentManagement;
