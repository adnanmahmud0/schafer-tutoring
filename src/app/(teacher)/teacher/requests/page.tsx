"use client";

import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, FileText, Check } from "lucide-react";

interface Request {
  id: string;
  subject: string;
  school: string;
  grade: string;
  daysAgo: number;
  studentName?: string;
  learningGoal?: string;
}

interface AcceptedRequest {
  id: string;
  name: string;
  subject: string;
  trialSession: string;
  status: "Contacted" | "Scheduling" | "Scheduled";
  studentName?: string;
  school?: string;
  grade?: string;
  learningGoal?: string;
}

const openRequests: Request[] = [
  {
    id: "1",
    subject: "Mathematics",
    school: "High School",
    grade: "10th Grade",
    daysAgo: 2,
    studentName: "Sarah Johnson",
    learningGoal: "Prepare for upcoming final exams and improve understanding of advanced concepts"
  },
  { id: "2", subject: "Mathematics", school: "High School", grade: "10th Grade", daysAgo: 2 },
  { id: "3", subject: "Mathematics", school: "High School", grade: "10th Grade", daysAgo: 2 },
  { id: "4", subject: "Science", school: "Elementary School", grade: "5th Grade", daysAgo: 11 },
  { id: "5", subject: "Science", school: "Elementary School", grade: "5th Grade", daysAgo: 11 },
  { id: "6", subject: "Science", school: "Elementary School", grade: "5th Grade", daysAgo: 11 },
  { id: "7", subject: "Science", school: "Elementary School", grade: "5th Grade", daysAgo: 11 },
  { id: "8", subject: "Science", school: "Elementary School", grade: "5th Grade", daysAgo: 11 },
  { id: "9", subject: "Science", school: "Elementary School", grade: "5th Grade", daysAgo: 11 },
];

const acceptedRequests: AcceptedRequest[] = [
  {
    id: "a1",
    name: "John b",
    subject: "Physics",
    trialSession: "Nov 12, 2025 - 3:00 PM",
    status: "Contacted",
    studentName: "Sarah Johnson",
    school: "Riverside High School",
    grade: "10th Grade",
    learningGoal: "Prepare for upcoming final exams and improve understanding of advanced concepts"
  },
  {
    id: "a2",
    name: "John b",
    subject: "Math",
    trialSession: "Nov 12, 2025 - 3:00 PM",
    status: "Scheduling",
    studentName: "Sarah Johnson",
    school: "Riverside High School",
    grade: "10th Grade",
    learningGoal: "Prepare for upcoming final exams and improve understanding of advanced concepts"
  },
  {
    id: "a3",
    name: "John b",
    subject: "Math",
    trialSession: "Nov 12, 2025 - 3:00 PM",
    status: "Scheduled",
    studentName: "Sarah Johnson",
    school: "Riverside High School",
    grade: "10th Grade",
    learningGoal: "Prepare for upcoming final exams and improve understanding of advanced concepts"
  },
  {
    id: "a4",
    name: "John b",
    subject: "Math",
    trialSession: "Nov 12, 2025 - 3:00 PM",
    status: "Scheduled",
    studentName: "Sarah Johnson",
    school: "Riverside High School",
    grade: "10th Grade",
    learningGoal: "Prepare for upcoming final exams and improve understanding of advanced concepts"
  },
  {
    id: "a5",
    name: "John b",
    subject: "Physics",
    trialSession: "Nov 12, 2025 - 3:00 PM",
    status: "Scheduling",
    studentName: "Sarah Johnson",
    school: "Riverside High School",
    grade: "10th Grade",
    learningGoal: "Prepare for upcoming final exams and improve understanding of advanced concepts"
  },
  {
    id: "a6",
    name: "John b",
    subject: "Physics",
    trialSession: "Nov 12, 2025 - 3:00 PM",
    status: "Scheduling",
    studentName: "Sarah Johnson",
    school: "Riverside High School",
    grade: "10th Grade",
    learningGoal: "Prepare for upcoming final exams and improve understanding of advanced concepts"
  },
  {
    id: "a7",
    name: "John b",
    subject: "Math",
    trialSession: "Nov 12, 2025 - 3:00 PM",
    status: "Contacted",
    studentName: "Sarah Johnson",
    school: "Riverside High School",
    grade: "10th Grade",
    learningGoal: "Prepare for upcoming final exams and improve understanding of advanced concepts"
  },
];

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState<"open" | "accepted">("open");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [introMessage, setIntroMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isInfoOnly, setIsInfoOnly] = useState(false);
  const itemsPerPage = 6;

  const currentData = activeTab === "open" ? openRequests : acceptedRequests;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = currentData.slice(startIndex, endIndex);

  const handleTabChange = (tab: "open" | "accepted") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleViewClick = (request: Request | AcceptedRequest) => {
    if ('trialSession' in request) {
      // This is an accepted request - show info only
      setIsInfoOnly(true);
      setSelectedRequest({
        id: request.id,
        subject: request.subject,
        school: request.school || "Riverside High School",
        grade: request.grade || "10th Grade",
        daysAgo: 0,
        studentName: request.studentName || request.name,
        learningGoal: request.learningGoal || "Prepare for upcoming final exams and improve understanding of advanced concepts"
      });
    } else {
      // This is an open request - show form
      setIsInfoOnly(false);
      setSelectedRequest(request);
    }
    setIsModalOpen(true);
    setShowSuccess(false);
    setIntroMessage("");
  };

  const handleSendAccept = () => {
    setShowSuccess(true);
  };

  const handleBackToDashboard = () => {
    setIsModalOpen(false);
    setShowSuccess(false);
    setIntroMessage("");
    setSelectedRequest(null);
  };

  return (
    <div className="space-y-4 sm:space-y-5 lg:space-y-6">
      <div className=" rounded-lg">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          <button
            onClick={() => handleTabChange("open")}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${activeTab === "open"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Open Requests
          </button>
          <button
            onClick={() => handleTabChange("accepted")}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${activeTab === "accepted"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Accepted Requests
          </button>
        </div>

        {/* Content */}
        {activeTab === "open" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(paginatedData as Request[]).map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{request.subject}</h3>
                  <span
                    className={`text-sm font-medium ${request.daysAgo <= 2 ? "text-orange-500" : "text-green-600"
                      }`}
                  >
                    {request.daysAgo} days Ago
                  </span>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-600">{request.school}</p>
                  <p className="text-sm text-gray-600">{request.grade}</p>
                </div>
                <button
                  onClick={() => handleViewClick(request)}
                  className="w-full bg-[#002AC8] text-white font-medium py-3 rounded-lg hover:bg-[#0024a8] transition-colors"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Mobile horizontal scroll wrapper */}
            <div className="w-full overflow-x-auto">
              <table className="min-w-[900px] w-full">
                <thead className="bg-[#FAFAFA] border border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trial Session
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {(paginatedData as AcceptedRequest[]).map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {request.trialSession}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleViewClick(request)}
                          className="bg-[#002AC8] text-white px-6 py-2 rounded-md hover:bg-[#0024a8] transition-colors font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6">
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

      {/* Request Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          {!showSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-base font-semibold text-gray-900 border-b pb-4">
                  Student Information
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Student Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Name</p>
                    <p className="text-sm text-gray-900">{selectedRequest?.studentName || "Sarah Johnson"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Subject</p>
                    <p className="text-sm text-gray-900">{selectedRequest?.subject}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">School Type</p>
                    <p className="text-sm text-gray-900">{selectedRequest?.school}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Grade</p>
                    <p className="text-sm text-gray-900">{selectedRequest?.grade}</p>
                  </div>
                </div>

                {/* Learning Goal */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Learning Goal</p>
                  <p className="text-sm text-gray-700">
                    {selectedRequest?.learningGoal || "Prepare for upcoming final exams and improve understanding of advanced concepts"}
                  </p>
                </div>

                {/* Document */}
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#002AC8]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Student Document</p>
                      <p className="text-xs text-gray-500">2.4 MB • Nov 15, 2025</p>
                    </div>
                  </div>
                  <button className="text-[#002AC8] hover:text-[#0024a8]">
                    <Download className="w-5 h-5" />
                  </button>
                </div>

                {!isInfoOnly && (
                  <>
                    {/* Introduction Message */}
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        Introduction Message*
                      </label>
                      <textarea
                        value={introMessage}
                        onChange={(e) => setIntroMessage(e.target.value)}
                        placeholder="Write your introduction message here..."
                        className="w-full h-32 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002AC8] focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSendAccept}
                        className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#002AC8] rounded-lg hover:bg-[#0024a8] transition-colors"
                      >
                        Send & Accept
                      </button>
                    </div>
                  </>
                )}

                {isInfoOnly && (
                  <div className="pt-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="py-8 px-4 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Success!</h3>
              <p className="text-sm text-gray-600 mb-6">Message sent to the student</p>
              <button
                onClick={handleBackToDashboard}
                className="w-full px-4 py-2.5 text-sm font-medium text-white bg-[#002AC8] rounded-lg hover:bg-[#0024a8] transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}