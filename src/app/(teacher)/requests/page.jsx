'use client';

import { useState } from 'react';

export default function Requests() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [introMessage, setIntroMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const allRequests = [
    { id: 1, name: 'John b', subject: 'Physics', date: 'Nov 12, 2025 - 3:00 PM', status: 'Contacted' },
    { id: 2, name: 'John b', subject: 'Math', date: 'Nov 12, 2025 - 3:00 PM', status: 'Scheduling' },
    { id: 3, name: 'John b', subject: 'Math', date: 'Nov 12, 2025 - 3:00 PM', status: 'Scheduled' },
    { id: 4, name: 'John b', subject: 'Math', date: 'Nov 12, 2025 - 3:00 PM', status: 'Scheduled' },
    { id: 5, name: 'John b', subject: 'Physics', date: 'Nov 12, 2025 - 3:00 PM', status: 'Scheduling' },
    { id: 6, name: 'John b', subject: 'Math', date: 'Nov 12, 2025 - 3:00 PM', status: 'Scheduling' },
    { id: 7, name: 'John b', subject: 'Math', date: 'Nov 12, 2025 - 3:00 PM', status: 'Contacted' },
  ];

  const acceptedRequests = [
    { id: 101, subject: 'Mathematics', school: 'High School', grade: '10th Grade', daysAgo: '2 days ago' },
    { id: 102, subject: 'Mathematics', school: 'High School', grade: '10th Grade', daysAgo: '2 days ago' },
    { id: 103, subject: 'Mathematics', school: 'High School', grade: '10th Grade', daysAgo: '2 days ago' },
    { id: 104, subject: 'Science', school: 'Elementary School', grade: '5th Grade', daysAgo: '11 days ago' },
    { id: 105, subject: 'Science', school: 'Elementary School', grade: '5th Grade', daysAgo: '11 days ago' },
    { id: 106, subject: 'Science', school: 'Elementary School', grade: '5th Grade', daysAgo: '11 days ago' },
  ];

  const requestDetails = {
    name: 'Sarah Johnson',
    subject: 'English',
    schoolType: 'Riverside High School',
    grade: '10th Grade',
    learningGoal: 'Prepare for upcoming final exams and improve understanding of advanced concepts',
    document: '2.4 MB • Nov 15, 2025',
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleSendAccept = () => {
    setShowSuccessModal(true);
    setShowModal(false);
    setIntroMessage('');
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setActiveTab('accepted');
  };

  const filteredRequests = allRequests.filter((req) =>
    req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white">
      {/* Tabs */}
      <div className="flex gap-8 border-b mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-2 font-medium transition-colors ${
            activeTab === 'all'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          All requests
        </button>
        <button
          onClick={() => setActiveTab('accepted')}
          className={`pb-2 font-medium transition-colors ${
            activeTab === 'accepted'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Accepted requests
        </button>
      </div>

      {/* All Requests Tab */}
      {activeTab === 'all' && (
        <div>
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Trial Session</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-700">{request.name}</td>
                    <td className="py-4 px-4 text-gray-700">{request.subject}</td>
                    <td className="py-4 px-4 text-gray-700">{request.date}</td>
                    <td className="py-4 px-4 text-gray-700">{request.status}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleViewRequest(request)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded">← Previous</button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded">2</button>
            <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded">3</button>
            <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded">Next →</button>
          </div>
        </div>
      )}

      {/* Accepted Requests Tab */}
      {activeTab === 'accepted' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {acceptedRequests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-800">{request.subject}</h3>
                <span className="text-green-500 text-sm font-medium">{request.daysAgo}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{request.school}</p>
              <p className="text-sm text-gray-600 mb-4">{request.grade}</p>
              <button
                onClick={() => handleViewRequest(request)}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Request Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="float-right text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

              {/* Student Information */}
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Student Information</h2>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Name</p>
                  <p className="font-medium text-gray-800">{requestDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Subject</p>
                  <p className="font-medium text-gray-800">{requestDetails.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">School Type</p>
                  <p className="font-medium text-gray-800">{requestDetails.schoolType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Grade</p>
                  <p className="font-medium text-gray-800">{requestDetails.grade}</p>
                </div>
              </div>

              {/* Learning Goal */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-800 mb-2">Learning Goal</h3>
                <p className="text-gray-700">{requestDetails.learningGoal}</p>
              </div>

              {/* Student Document */}
              <div className="mb-8 flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-blue-600 text-2xl">📄</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Student Document</p>
                  <p className="text-sm text-gray-600">{requestDetails.document}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-xl">⬇</button>
              </div>

              {/* Introduction Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Introduction Message *
                </label>
                <textarea
                  value={introMessage}
                  onChange={(e) => setIntroMessage(e.target.value)}
                  placeholder="Write your introduction message here..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="4"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendAccept}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Send & Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full text-center p-8">
            <div className="text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Success!</h2>
            <p className="text-gray-600 mb-6">Request has been accepted successfully</p>
            <button
              onClick={handleCloseSuccess}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
