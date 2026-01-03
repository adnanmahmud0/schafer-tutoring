"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FileText, Check, Loader2, AlertCircle, XCircle } from "lucide-react";
import { useMyApplication, type ApplicationStatus } from "@/hooks/api";
import { useStripeConnect } from "@/hooks/api/use-stripe";
import { toast } from "sonner";
import InterviewBookingSection from "./InterviewBookingSection";
import ProfileSetupSection from "./ProfileSetupSection";

// Helper functions
const getStepFromStatus = (status: ApplicationStatus): number => {
  switch (status) {
    case "SUBMITTED":
    case "REVISION":
      return 1;
    case "SELECTED_FOR_INTERVIEW":
      return 2;
    case "APPROVED":
      return 3;
    case "REJECTED":
      return 0;
    default:
      return 1;
  }
};

const getStatusMessage = (
  status: ApplicationStatus,
  revisionNote?: string,
  rejectionReason?: string
) => {
  switch (status) {
    case "SUBMITTED":
      return {
        title: "Your Application has been sent and is under review.",
        subtitle: "You will be notified once the next step is unlocked",
        bgColor: "bg-[#FFF4E6]",
        borderColor: "border-[#FFB800]",
      };
    case "REVISION":
      return {
        title: "Revision Required",
        subtitle: revisionNote || "Please update your application and resubmit.",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-400",
      };
    case "SELECTED_FOR_INTERVIEW":
      return {
        title: "Congratulations! You have been selected for an interview.",
        subtitle: "Please select an available interview slot below.",
        bgColor: "bg-green-50",
        borderColor: "border-green-500",
      };
    case "APPROVED":
      return {
        title: "Congratulations! Your application has been approved.",
        subtitle: "Please complete your profile setup to start tutoring.",
        bgColor: "bg-green-50",
        borderColor: "border-green-500",
      };
    case "REJECTED":
      return {
        title: "Application Not Approved",
        subtitle: rejectionReason || "We appreciate your interest. Feel free to apply again in the future.",
        bgColor: "bg-red-50",
        borderColor: "border-red-400",
      };
    default:
      return {
        title: "Application Status Unknown",
        subtitle: "Please contact support for assistance.",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-300",
      };
  }
};

const Page1 = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: application, isLoading, error } = useMyApplication();
  const { refetchStatus } = useStripeConnect();
  const [progressWidth, setProgressWidth] = useState("8%");

  const step = application ? getStepFromStatus(application.status) : 1;

  // Handle Stripe onboarding callback
  useEffect(() => {
    const stripeOnboarding = searchParams.get("stripe_onboarding");

    if (stripeOnboarding === "success") {
      toast.success("Stripe account connected successfully!");
      refetchStatus();
      // Clean URL by removing query params
      router.replace("/free-trial-teacher-dash", { scroll: false });
    } else if (stripeOnboarding === "refresh") {
      toast.info("Please complete your Stripe onboarding to continue.");
      router.replace("/free-trial-teacher-dash", { scroll: false });
    }
  }, [searchParams, refetchStatus, router]);

  // Calculate progress width based on step and screen size
  useEffect(() => {
    const calculateWidth = () => {
      const isMobile = window.innerWidth <= 640;
      const isTablet = window.innerWidth <= 768;

      if (isMobile) {
        setProgressWidth(step === 1 ? "15%" : step === 2 ? "55%" : step >= 3 ? "95%" : "0%");
      } else if (isTablet) {
        setProgressWidth(step === 1 ? "12%" : step === 2 ? "52%" : step >= 3 ? "92%" : "0%");
      } else {
        setProgressWidth(step === 1 ? "8%" : step === 2 ? "55%" : step >= 3 ? "95%" : "0%");
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [step]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#0B31BD]" />
          <p className="text-gray-600">Loading your application...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-800">Application Not Found</h2>
          <p className="text-gray-600">
            We couldn&apos;t find your application. Please make sure you&apos;re logged in with the correct account.
          </p>
        </div>
      </div>
    );
  }

  const statusMessage = getStatusMessage(
    application.status,
    application.revisionNote,
    application.rejectionReason
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-3xl mx-auto py-12 px-4">
        {/* Application Card */}
        <div className="rounded-lg shadow-sm border border-gray-200 p-6 mb-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Teacher Application Progress
          </h2>

          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-2.5 left-0 right-0 h-2 rounded-3xl bg-gray-300 z-0"></div>

              <div
                className="absolute top-2.5 left-0 h-2 rounded-3xl bg-[#0B31BD] z-10 transition-all duration-700 ease-in-out"
                style={{ width: progressWidth }}
              ></div>

              {/* Step 1 - Application Review */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${
                    step >= 1 ? "bg-[#0B31BD]" : "bg-gray-300"
                  }`}
                >
                  {step > 1 ? <Check className="w-5 h-5" /> : ""}
                </div>
                <span
                  className={`text-sm text-center transition-colors duration-500 ${
                    step >= 1 ? "text-gray-700" : "text-gray-600"
                  }`}
                >
                  Application Review
                </span>
              </div>

              {/* Step 2 - Interview */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${
                    step >= 2 ? "bg-[#0B31BD]" : "bg-gray-300"
                  }`}
                >
                  {step > 2 ? <Check className="w-5 h-5" /> : ""}
                </div>
                <span
                  className={`text-sm text-center transition-colors duration-500 ${
                    step >= 2 ? "text-gray-700" : "text-gray-600"
                  }`}
                >
                  Interview
                </span>
              </div>

              {/* Step 3 - Profile Setup */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${
                    step >= 3 ? "bg-[#0B31BD]" : "bg-gray-300"
                  }`}
                >
                  {step > 3 ? <Check className="w-5 h-5" /> : ""}
                </div>
                <span
                  className={`text-sm text-center transition-colors duration-500 ${
                    step >= 3 ? "text-gray-700" : "text-gray-600"
                  }`}
                >
                  Profile Setup
                </span>
              </div>
            </div>
          </div>

          {/* Status Message */}
          {application.status === "REJECTED" ? (
            <div className={`border ${statusMessage.borderColor} ${statusMessage.bgColor} rounded-lg p-4 flex items-start gap-3`}>
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">{statusMessage.title}</p>
                <p className="text-sm text-gray-600 mt-1">{statusMessage.subtitle}</p>
              </div>
            </div>
          ) : (
            <div className={`border ${statusMessage.borderColor} ${statusMessage.bgColor} rounded-lg p-4`}>
              <p className="font-semibold text-gray-800">{statusMessage.title}</p>
              <p className="text-sm text-gray-600 mt-1">{statusMessage.subtitle}</p>
            </div>
          )}
        </div>

        {/* Interview Booking Section - Only show when selected for interview */}
        {application.status === "SELECTED_FOR_INTERVIEW" && (
          <div className="mb-6">
            <InterviewBookingSection applicationId={application._id} />
          </div>
        )}

        {/* Profile Setup Section - Only show when approved */}
        {application.status === "APPROVED" && (
          <div className="mb-6">
            <ProfileSetupSection
              userEmail={application.email}
              userName={application.name}
            />
          </div>
        )}

        {/* Application Summary Card */}
        <div className="rounded-lg shadow-sm border border-gray-200 p-6 mb-6 bg-white">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Application Summary
          </h3>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Name</p>
              <p className="text-gray-800 font-medium">{application.name}</p>
            </div>

            {/* Subjects */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Subjects</p>
              <p className="text-gray-800 font-medium">
                {application.subjects.map((s) => s.name).join(", ") || "No subjects selected"}
              </p>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">E-Mail</p>
                <p className="text-gray-800 font-medium">{application.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="text-gray-800 font-medium">{application.phoneNumber}</p>
              </div>
            </div>

            {/* Documents Section */}
            <div>
              <p className="text-sm text-gray-600 mb-4 font-semibold">Documents</p>
              <div className="grid grid-cols-3 gap-4">
                {/* CV */}
                <a
                  href={application.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <FileText className="w-8 h-8 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700">CV</p>
                </a>

                {/* Abitur Certificate */}
                <a
                  href={application.abiturCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <FileText className="w-8 h-8 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700">Abitur Certificate</p>
                </a>

                {/* ID Document */}
                <a
                  href={application.officialId}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <FileText className="w-8 h-8 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700">ID-Document</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Info Message */}
        <div className="border bg-[#E2E6F5] border-[#0B31BD] rounded-lg p-4">
          <p className="text-[#0B31BD] text-sm">
            You can return to this page at any time to check the progress of
            your application by login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page1;
