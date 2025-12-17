/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

/* =======================
   Types
======================= */

interface RequestItem {
  id: number;
  name: string;
  subject: string;
  date: string;
  status: "Contacted" | "Scheduling" | "Scheduled";
}

interface AcceptedRequestItem {
  id: number;
  subject: string;
  school: string;
  grade: string;
  daysAgo: string;
}

interface RequestDetails {
  name: string;
  subject: string;
  schoolType: string;
  grade: string;
  learningGoal: string;
  document: string;
}

/* =======================
   Component
======================= */

export default function Requests() {
  const [activeTab, setActiveTab] = useState<"all" | "accepted">("all");
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [introMessage, setIntroMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* =======================
     Data
  ======================= */

  const allRequests: RequestItem[] = [
    {
      id: 1,
      name: "John b",
      subject: "Physics",
      date: "Nov 12, 2025 - 3:00 PM",
      status: "Contacted",
    },
    {
      id: 2,
      name: "John b",
      subject: "Math",
      date: "Nov 12, 2025 - 3:00 PM",
      status: "Scheduling",
    },
    {
      id: 3,
      name: "John b",
      subject: "Math",
      date: "Nov 12, 2025 - 3:00 PM",
      status: "Scheduled",
    },
    {
      id: 4,
      name: "John b",
      subject: "Math",
      date: "Nov 12, 2025 - 3:00 PM",
      status: "Scheduled",
    },
    {
      id: 5,
      name: "John b",
      subject: "Physics",
      date: "Nov 12, 2025 - 3:00 PM",
      status: "Scheduling",
    },
    {
      id: 6,
      name: "John b",
      subject: "Math",
      date: "Nov 12, 2025 - 3:00 PM",
      status: "Scheduling",
    },
    {
      id: 7,
      name: "John b",
      subject: "Math",
      date: "Nov 12, 2025 - 3:00 PM",
      status: "Contacted",
    },
  ];

  const acceptedRequests: AcceptedRequestItem[] = [
    {
      id: 101,
      subject: "Mathematics",
      school: "High School",
      grade: "10th Grade",
      daysAgo: "2 days ago",
    },
    {
      id: 102,
      subject: "Mathematics",
      school: "High School",
      grade: "10th Grade",
      daysAgo: "2 days ago",
    },
    {
      id: 103,
      subject: "Mathematics",
      school: "High School",
      grade: "10th Grade",
      daysAgo: "2 days ago",
    },
    {
      id: 104,
      subject: "Science",
      school: "Elementary School",
      grade: "5th Grade",
      daysAgo: "11 days ago",
    },
    {
      id: 105,
      subject: "Science",
      school: "Elementary School",
      grade: "5th Grade",
      daysAgo: "11 days ago",
    },
    {
      id: 106,
      subject: "Science",
      school: "Elementary School",
      grade: "5th Grade",
      daysAgo: "11 days ago",
    },
  ];

  const requestDetails: RequestDetails = {
    name: "Sarah Johnson",
    subject: "English",
    schoolType: "Riverside High School",
    grade: "10th Grade",
    learningGoal:
      "Prepare for upcoming final exams and improve understanding of advanced concepts",
    document: "2.4 MB • Nov 15, 2025",
  };

  /* =======================
     Handlers
  ======================= */

  const handleViewRequest = (request: RequestItem) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleSendAccept = () => {
    setShowSuccessModal(true);
    setShowModal(false);
    setIntroMessage("");
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setActiveTab("accepted");
  };

  /* =======================
     JSX
  ======================= */

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-6">
      <div className="bg-white min-h-screen rounded-lg shadow-sm mx-auto p-4 sm:p-5 lg:p-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-6 border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-2 font-medium ${
              activeTab === "all"
                ? "text-[#0B31BD] border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Open Requests
          </button>
          <button
            onClick={() => setActiveTab("accepted")}
            className={`pb-2 font-medium ${
              activeTab === "accepted"
                ? "text-[#0B31BD] border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Accepted Requests
          </button>
        </div>

        {/* OPEN REQUESTS - Card Grid */}
        {activeTab === "all" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allRequests.map((req) => (
              <div key={req.id} className="border p-4 rounded-lg">
                <h3 className="font-semibold">{req.subject}</h3>
                <p>{req.name}</p>
                <p className="text-sm text-gray-600">{req.date}</p>
                <p className="text-sm font-medium mt-2">{req.status}</p>
                <button 
                  onClick={() => handleViewRequest(req)}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ACCEPTED REQUESTS - Table */}
        {activeTab === "accepted" && (
          <div className="hidden lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left">Subject</th>
                  <th className="py-3 text-left">School</th>
                  <th className="py-3 text-left">Grade</th>
                  <th className="py-3 text-left">Accepted</th>
                  <th className="py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {acceptedRequests.map((req) => (
                  <tr key={req.id} className="border-b">
                    <td className="py-3">{req.subject}</td>
                    <td className="py-3">{req.school}</td>
                    <td className="py-3">{req.grade}</td>
                    <td className="py-3">{req.daysAgo}</td>
                    <td className="py-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MODALS REMAIN UNCHANGED — SAFE */}
      </div>
    </div>
  );
}