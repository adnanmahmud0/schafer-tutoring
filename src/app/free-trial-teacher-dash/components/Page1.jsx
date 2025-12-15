"use client";
import React, { useState } from 'react';
import { FileText, Check } from 'lucide-react';

const Page1 = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-3xl mx-auto py-12 px-4">
        {/* Application Card */}
        <div className="rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Teacher Application Progress</h2>

          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-2.5 left-0 right-0 h-2 rounded-3xl bg-gray-300 z-0"></div>

              <div 
                className="absolute top-2.5 left-0 h-2 rounded-3xl bg-[#0B31BD] z-10 transition-all duration-700 ease-in-out"
                style={{
                  width: 
                    window.innerWidth <= 640 
                      ? (step === 1 ? "15%" : step === 2 ? "55%" : "95%")
                      : window.innerWidth <= 768
                        ? (step === 1 ? "12%" : step === 2 ? "52%" : "92%")
                        : (step === 1 ? "8%" : step === 2 ? "55%" : "95%")
                }}
              ></div>

              {/* Step 1 - Application Review */}
              <div className="flex flex-col items-center relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${step >= 1 ? 'bg-[#0B31BD]' : 'bg-gray-300'}`}>
                  {step > 1 ? <Check className="w-5 h-5" /> : ''}
                </div>
                <span className={`text-sm text-center transition-colors duration-500 ${step >= 1 ? 'text-gray-700' : 'text-gray-600'}`}>
                  Application Review
                </span>
              </div>

              {/* Step 2 - Interview */}
              <div className="flex flex-col items-center relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${step >= 2 ? 'bg-[#0B31BD]' : 'bg-gray-300'}`}>
                  {step > 2 ? <Check className="w-5 h-5" /> : ''}
                </div>
                <span className={`text-sm text-center transition-colors duration-500 ${step >= 2 ? 'text-gray-700' : 'text-gray-600'}`}>
                  Interview
                </span>
              </div>

              {/* Step 3 - Profile Setup */}
              <div className="flex flex-col items-center relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${step >= 3 ? 'bg-[#0B31BD]' : 'bg-gray-300'}`}>
                  {step > 3 ? <Check className="w-5 h-5" /> : ''}
                </div>
                <span className={`text-sm text-center transition-colors duration-500 ${step >= 3 ? 'text-gray-700' : 'text-gray-600'}`}>
                  Profile Setup
                </span>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className="border bg-[#FFF4E6] border-[#FFB800] rounded-lg p-4">
            <p className="font-semibold text-gray-800">Your Application has been sent and is under review.</p>
            <p className="text-sm text-gray-600 mt-1">You will be notified once the next step is unlocked</p>
          </div>
        </div>

        {/* Application Summary Card */}
        <div className="rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Application Summary</h3>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Name</p>
              <p className="text-gray-800 font-medium">David Chen</p>
            </div>

            {/* Subjects */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Subjects</p>
              <p className="text-gray-800 font-medium">Math, German, English</p>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">E-Mail</p>
                <p className="text-gray-800 font-medium">david.chen@gmail.com</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="text-gray-800 font-medium">+639 1283795</p>
              </div>
            </div>

            {/* Documents Section */}
            <div>
              <p className="text-sm text-gray-600 mb-4 font-semibold">Documents</p>
              <div className="grid grid-cols-3 gap-4">
                {/* CV */}
                <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700">CV</p>
                </div>

                {/* Abitur Certificate */}
                <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700">Abitur Certificate</p>
                </div>

                {/* ID Document */}
                <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700">ID-Document</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Message */}
        <div className="border bg-[#E2E6F5] border-[#0B31BD] rounded-lg p-4">
          <p className="text-[#0B31BD] text-sm">
            You can return to this page at any time to check the progress of your application by login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page1;