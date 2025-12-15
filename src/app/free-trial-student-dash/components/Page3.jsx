"use client";
import React, { useState } from 'react';
import { Check, Lock } from 'lucide-react';
import Link from 'next/link';

const Page3 = () => {
  const [step, setStep] = useState(3);
  const [selectedPlan, setSelectedPlan] = useState('flexible');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const pricingPlans = [
    {
      id: 'flexible',
      name: 'Flexibel',
      pricePerHour: '30€',
      courseDuration: 'Keine',
      selectedHours: 'Anzahl wählbar',
      selectedHoursDetails: 'Keine Mindestanzahl',
      termType: 'Flexibel',
      inclusions: ['Kurzfristige Unterstützung,', 'Prüfungsvorbereitung']
    },
    {
      id: 'regular',
      name: 'Regelmäßig',
      pricePerHour: '28€',
      courseDuration: '1 Monat',
      selectedHours: 'Anzahl wählbar',
      selectedHoursDetails: 'Min. 4 Stunden pro Monat',
      termType: 'Flexibel oder regelmäßig',
      inclusions: ['Unterstützung bei Hausaufgaben,', 'Unterrichtsbegleitung']
    },
    {
      id: 'longterm',
      name: 'Langfristig',
      pricePerHour: '25€',
      courseDuration: '3 Monate',
      selectedHours: 'Anzahl wählbar',
      selectedHoursDetails: 'Min. 4 Stunden pro Monat',
      termType: 'Flexibel oder regelmäßig',
      inclusions: ['Langfristige Unterstützung,', 'Grundlagenwiederholen']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Trial Session Card */}
        <div className="rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Trial Session Request</h2>

          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-2.5 left-0 right-0 h-2 rounded-3xl bg-gray-300 z-0"></div>

              <div 
                className="absolute top-2.5 left-0 h-2 rounded-3xl bg-[#0B31BD] z-10 transition-all duration-700 ease-in-out"
                style={{
                  width: 
                    window.innerWidth <= 640 
                      ? (step === 1 ? "22%" : step === 2 ? "55%" : "88%")
                      : window.innerWidth <= 768
                        ? (step === 1 ? "18%" : step === 2 ? "52%" : "86%")
                        : (step === 1 ? "10%" : step === 2 ? "55%" : "95%")
                }}
              ></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${step >= 1 ? 'bg-[#0B31BD]' : 'bg-gray-300'}`}>
                  {step > 1 && <Check className="w-4 h-4" />}
                </div>
                <span className={`text-sm text-center transition-colors duration-500 ${step >= 1 ? 'text-gray-700' : 'text-gray-600'}`}>
                  Tutor Matching request
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${step >= 2 ? 'bg-[#0B31BD]' : 'bg-gray-300'}`}>
                  {step > 2 && <Check className="w-4 h-4" />}
                </div>
                <span className={`text-sm text-center transition-colors duration-500 ${step >= 2 ? 'text-gray-700' : 'text-gray-600'}`}>
                  Trial Session
                </span>
              </div>

              {/* Step 3 */}
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
            <p className="font-normal text-gray-800">You have completed your trial session.</p>
            <p className="text-sm text-[#666666]">Choose a plan and insert your payment details to start learning.</p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'border-[#0B31BD] bg-white shadow-lg'
                    : 'border-gray-200 bg-white hover:shadow-md'
                }`}
              >
                {/* Header with Title and Radio Button */}
                <div className={`flex items-center justify-between mb-6 pb-4 rounded-lg px-4 py-2 ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#6366F1] text-white'
                    : 'text-gray-900'
                }`}>
                  <h3 className={`text-lg font-bold`}>
                    {plan.name}
                  </h3>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPlan === plan.id
                      ? 'border-white bg-white'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {selectedPlan === plan.id && <Check className="w-4 h-4 text-[#3B82F6]" />}
                  </div>
                </div>

                {/* Price Section */}
                <div className="mb-5">
                  <p className="text-xs text-gray-600 mb-1">Preis pro Stunde</p>
                  <p className="text-3xl font-bold text-gray-900">{plan.pricePerHour}</p>
                </div>

                <hr className="border-gray-200 mb-5" />

                {/* Duration Section */}
                <div className="mb-5">
                  <p className="text-xs text-gray-600 mb-1">Laufzeit</p>
                  <p className="text-base font-semibold text-gray-900">{plan.courseDuration}</p>
                </div>

                <hr className="border-gray-200 mb-5" />

                {/* Units Section */}
                <div className="mb-5">
                  <p className="text-xs text-gray-600 mb-1">Einheiten</p>
                  <p className="text-base font-semibold text-gray-900">{plan.selectedHours}</p>
                  <p className="text-sm text-gray-800 font-medium mt-1">{plan.selectedHoursDetails}</p>
                </div>

                <hr className="border-gray-200 mb-5" />

                {/* Appointment Section */}
                <div className="mb-5">
                  <p className="text-xs text-gray-600 mb-1">Terminvereinbarung</p>
                  <p className="text-base font-semibold text-gray-900">{plan.termType}</p>
                </div>

                <hr className="border-gray-200 mb-5" />

                {/* Recommended For Section */}
                <div>
                  <p className="text-xs text-gray-600 mb-2">Empfohlen für</p>
                  <ul className="space-y-1">
                    {plan.inclusions.map((inclusion, idx) => (
                      <li key={idx} className="text-sm font-semibold text-gray-900">
                        {inclusion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Section */}
        <div className="rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h3 className="text-lg font-semibold text-[#E7000B] mb-8">Stripe Payment</h3>

          {/* Selected Plan Display */}
          <div className="bg-[#EFF6FF] border border-[#BEDBFF] rounded-lg p-4 mb-8">
            <div className="flex justify-between  items-center">
              <span className="text-gray-700">
                Selected Plan: <span className="font-semibold capitalize">{selectedPlan}</span>
              </span>
              <span className="text-lg font-bold text-gray-900">
                Amount: {selectedPlan === 'flexible' ? '30€' : selectedPlan === 'regular' ? '28€' : '25€'}
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-800 block mb-2">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B31BD] focus:ring-1 focus:ring-[#0B31BD]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-800 block mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B31BD] focus:ring-1 focus:ring-[#0B31BD]"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-800 block mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B31BD] focus:ring-1 focus:ring-[#0B31BD]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 block mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B31BD] focus:ring-1 focus:ring-[#0B31BD]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="flex-1 px-6 py-3 bg-[#0B31BD] text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">
              Pay Now
            </button>
          </div>
        
         {/* Security Message */}
          <div className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-600">
            <Lock className="w-4 h-4 flex-shrink-0" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </div>

         

          

        {/* Terms and Conditions */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-[#0B31BD]"
          />
          <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
            I have read and agree to the <span className="text-[#0B31BD] font-medium"><Link href="/terms" className='underline'>Terms and Conditions</Link></span>
          </label>
        </div>

        {/* Start Learning Button */}
        <button
          disabled={!agreedToTerms}
          className={`w-full px-6 py-4 rounded-lg font-semibold text-lg transition-colors ${
            agreedToTerms
              ? 'bg-[#0B31BD] text-white hover:bg-blue-800'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          Start Learning
        </button>
      </div>
    </div>
  );
};

export default Page3;