"use client";
import { useState } from "react";
import { Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function EarningsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    recipient: "John Doe",
    iban: "DE12 3333 8337 58",
  });
  const [payoutData, setPayoutData] = useState({
    recipient: "John Doe",
    iban: "DE12 3333 8337 58",
  });

  const earningsData = [
    { period: "Oct 25", sessions: 12, earnings: "238.50 €" },
    { period: "Sep 25", sessions: 18, earnings: "327.00 €" },
    { period: "Aug 25", sessions: 16, earnings: "228.15 €" },
    { period: "Jul 25", sessions: 14, earnings: "265.80 €" },
    { period: "Jun 25", sessions: 20, earnings: "378.40 €" },
    { period: "May 25", sessions: 15, earnings: "289.50 €" },
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(earningsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = earningsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleEditClick = () => {
    setEditFormData({ ...payoutData });
    setIsEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    setPayoutData({ ...editFormData });
    setIsEditDialogOpen(false);
  };

  const handleCancel = () => {
    setIsEditDialogOpen(false);
  };

  const handleInputChange = (field, value) => {
    setEditFormData({ ...editFormData, [field]: value });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto space-y-8">
        {/* Payout Settings Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Payout Settings
            </h2>
            <Button
              onClick={handleEditClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 h-10 rounded-lg font-medium"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
          <hr className="my-6" />

          <div className="flex flex-col md:flex-row gap-8">
            {/* Recipient */}
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-600 block mb-2">
                Recipient
              </label>
              <p className="text-gray-900 font-medium">
                {payoutData.recipient}
              </p>
            </div>
            {/* IBAN */}
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-600 block mb-2">
                IBAN
              </label>
              <p className="text-gray-900 font-medium">{payoutData.iban}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-sm text-gray-600 min-w-12 text-center">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Earnings History Card */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-end mb-6"></div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full ">
              <thead>
                <tr className="border-b border-gray-200 ">
                  <th className="text-left text-sm font-semibold text-gray-700 pb-3 px-3">
                    Period
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-700 pb-3 px-3">
                    Sessions
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-700 pb-3 px-3">
                    Earnings
                  </th>
                  <th className="text-right text-sm font-semibold text-gray-700 pb-3 px-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="text-sm text-gray-900 py-3 px-3 font-medium">
                      {item.period}
                    </td>
                    <td className="text-sm text-gray-700 py-3 px-3">
                      {item.sessions}
                    </td>
                    <td className="text-sm text-gray-700 py-3 px-3 font-medium">
                      {item.earnings}
                    </td>
                    <td className="text-right py-3 px-3">
                      <Button className="bg-[#002AC8] hover:bg-[#001F9C] text-white px-4 py-1 h-8 text-sm font-medium rounded-md">
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Payout Settings Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Edit Payout Settings
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Recipient Input */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Recipient
              </label>
              <Input
                type="text"
                value={editFormData.recipient}
                onChange={(e) => handleInputChange("recipient", e.target.value)}
                className="h-10 border-gray-300 rounded-lg"
              />
            </div>
            {/* IBAN Input */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                IBAN
              </label>
              <Input
                type="text"
                value={editFormData.iban}
                onChange={(e) => handleInputChange("iban", e.target.value)}
                className="h-10 border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <DialogFooter className="gap-3 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="px-6 h-10 font-medium bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveChanges}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-10 font-medium"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
