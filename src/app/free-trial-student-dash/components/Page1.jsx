"use client";
import React, { useState } from 'react';

const Page1 = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-3xl mx-auto py-12 px-4">
        {/* Trial Session Request Card */}
        <div className=" rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Trial Session Request</h2>

        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-2.5 left-0 right-0 h-2 rounded-3xl bg-gray-300 z-0"></div>

            <div 
          className="absolute top-2.5 left-0 h-2 rounded-3xl bg-[#0B31BD] z-10 transition-all duration-700 ease-in-out"
          style={{
            width: 
              // মোবাইল (xs - sm)
              window.innerWidth <= 640 
                ? (step === 1 ? "22%" : step === 2 ? "55%" : "88%")
                // ট্যাবলেট (md)
                : window.innerWidth <= 768
                  ? (step === 1 ? "18%" : step === 2 ? "52%" : "86%")
                  // পিসি (lg+)
                  : (step === 1 ? "10%" : step === 2 ? "55%" : "95%")
          }}
          ></div>

            {/* Step 1 - Active if step >= 1 */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${step >= 1 ? 'bg-[#0B31BD]' : 'bg-gray-300'}`}>
              </div>
              <span className={`text-sm text-center transition-colors duration-500 ${step >= 1 ? 'text-gray-700' : 'text-gray-600'}`}>
                Tutor Matching request
              </span>
            </div>

            {/* Step 2 - Active if step >= 2 */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${step >= 2 ? 'bg-[#0B31BD]' : 'bg-gray-300'}`}>
              </div>
              <span className={`text-sm text-center transition-colors duration-500 ${step >= 2 ? 'text-gray-700' : 'text-gray-600'}`}>
                Trial Session
              </span>
            </div>

            {/* Step 3 - Active if step >= 3 */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${step >= 3 ? 'bg-[#0B31BD]' : 'bg-gray-300'}`}>
              </div>
              <span className={`text-sm text-center transition-colors duration-500 ${step >= 3 ? 'text-gray-700' : 'text-gray-600'}`}>
                Start Learning
              </span>
            </div>
          </div>
        </div>
          {/* Status Message */}
        <div className="border bg-[#FFF4E6] border-[#FF8A00] rounded-lg p-4">
          <p className="font-normal">
            Your request has been sent and we are now looking for a fitting tutor.</p>
            <p className='text-sm text-[#666666]'>You will be notified once we found your tutor</p>
        </div>
        </div>

        {/* Request Summary Card */}
        <div className=" rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Request Summary</h3>

          <div className="space-y-4">
            {/* Name and School Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="text-gray-800 font-medium">David Chen</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">School Type</p>
                <p className="text-gray-800 font-medium">Gymnasium</p>
              </div>
            </div>

            {/* Subjects and Grade */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Subjects</p>
                <p className="text-gray-800 font-medium">Math</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Grade</p>
                <p className="text-gray-800 font-medium">11th grade</p>
              </div>
            </div>

            {/* Learning Goals */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Learning goals</p>
              <p className="text-gray-800">
                Prepare for upcoming final exams and improve understanding of advanced concepts
              </p>
            </div>
          </div>
        </div>

        {/* Info Message */}
        <div className="border bg-[#E2E6F5] border-[#0B31BD] rounded-lg p-4">
          <p className="text-[#0B31BD]  text-sm">
            You can return to this page at any time to check the progress of your application by login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page1;