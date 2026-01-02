"use client";
import { useState, useEffect, useRef } from "react";
import { Edit, BookOpen, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function EarningsPage() {
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
    { period: "Apr 25", sessions: 10, earnings: "195.00 €" },
    { period: "Mar 25", sessions: 22, earnings: "410.20 €" },
    { period: "Feb 25", sessions: 14, earnings: "258.00 €" },
    { period: "Jan 25", sessions: 19, earnings: "345.50 €" },
    { period: "Dec 24", sessions: 12, earnings: "220.00 €" },
    { period: "Nov 24", sessions: 16, earnings: "298.40 €" },
  ];

  // Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const itemsPerPage = 6;

  const displayedData = earningsData.slice(0, visibleCount);
  const hasMore = visibleCount < earningsData.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true);
          // Simulate network delay
          setTimeout(() => {
            setVisibleCount((prev) => prev + itemsPerPage);
            setIsLoadingMore(false);
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, isLoadingMore]);

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

  const handleInputChange = (field: string, value: string) => {
    setEditFormData({ ...editFormData, [field]: value });
  };

  return (
    <div className="space-y-4 sm:space-y-5 lg:space-y-6">

      {/* Level Progress */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Level Progress</h2>
          <div className="flex items-center gap-2 bg-[#002AC8] text-white px-4 py-2 rounded-lg">
            <Image width={24} height={24} src="/badge-wt.svg" alt="Badge" />
            <span className="font-semibold">Level 2</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Progress to Level 3</span>
            <span className="text-[#3052D2]">4 Lesson Left</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-[#002AC8] h-full rounded-full transition-all" style={{ width: '75%' }} />
          </div>
          <div className="bg-[#FFF4E6] border border-[#FFB256] rounded-lg p-3 flex items-start gap-2 mt-5">
            <Image width={24} height={24} src="/badge-yl.svg" alt="Badge" />
            <p className="text-sm text-amber-800">
              Hourly earnings will grow to <span className="font-semibold">17€</span> on level 3.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="mb-4 bg-blue-50 p-3 rounded-full w-fit"><Image src="/cap.svg" alt="" width={24} height={24} /></div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Sessions</h3>
          <div className="text-3xl font-bold text-gray-900">156.5 <span className="text-lg text-gray-500">h</span></div>
          <p className="text-sm text-gray-500 mt-3">Total: 42 h</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="mb-4 bg-green-50 p-3 rounded-full w-fit"><Image src="/dollar.svg" alt="" width={24} height={24} /></div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Earnings</h3>
          <div className="text-3xl font-bold text-gray-900">1,880 <span className="text-lg text-gray-500">€</span></div>
          <p className="text-sm text-gray-500 mt-3">Total: 1.890 €</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="mb-4 bg-orange-50 p-3 rounded-full w-fit"><BookOpen className="text-[#FF8A00]" size={24} /></div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Trial Sessions</h3>
          <div className="text-3xl font-bold text-gray-900">99 <span className="text-lg text-gray-500">%</span></div>
          <p className="text-sm text-gray-500 mt-3">Total: 75%</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="mb-4 bg-[#F3F3F3] p-3 rounded-full w-fit"><Image src="/users.svg" alt="" width={24} height={24} /></div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">The Number of Students</h3>
          <div className="text-3xl font-bold text-gray-900">150</div>
          <p className="text-sm text-gray-500 mt-3">Total: 27</p>
        </div>
      </div>

      {/* Payout Settings Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5 lg:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Payout Settings
          </h2>
          <Button
            onClick={handleEditClick}
            className="bg-[#002AC8] hover:bg-[#002AC8] text-white px-6 py-2 h-10 rounded-lg font-medium"
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

      {/* Earnings History Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-1">
        <div className="pt-4 px-4 sm:px-5 lg:px-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Earnings History
          </h2>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg m-5 -mb-9">
          <table className="w-full border-collapse ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  Period
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  Sessions
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  Earnings
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-gray-200 ${index !== displayedData.length - 1 ? 'border-b' : ''}`}>
                    {item.period}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-gray-200 ${index !== displayedData.length - 1 ? 'border-b' : ''}`}>
                    {item.sessions}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-center border-gray-200 ${index !== displayedData.length - 1 ? 'border-b' : ''}`}>
                    {item.earnings}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-center ${index !== displayedData.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <Button className="bg-[#002AC8] text-white px-6 py-2 rounded-lg hover:bg-[#0024a8] transition-colors font-medium inline-flex items-center gap-2 h-auto">
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {displayedData.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Period</p>
                  <p className="text-sm font-semibold text-gray-900">{item.period}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Sessions</p>
                  <p className="text-sm font-semibold text-gray-900">{item.sessions}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 font-medium">Earnings</p>
                  <p className="text-base font-bold text-gray-900">{item.earnings}</p>
                </div>
              </div>
              <Button className="w-full bg-[#002AC8] text-white px-4 py-2 rounded-lg hover:bg-[#0024a8] transition-colors font-medium inline-flex items-center justify-center gap-2 h-auto">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          ))}
        </div>
        {/* Infinite Scroll Trigger & Loader */}
        <div ref={observerTarget} className="h-14 w-full flex items-center justify-center p-4">
          {isLoadingMore && (
            <Loader2 className="w-6 h-6 animate-spin text-[#002AC8]" />
          )}
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
              className="bg-[#002AC8] hover:bg-[#002AC8] text-white px-6 h-10 font-medium"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}