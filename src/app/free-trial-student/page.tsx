/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Script from "next/script";

import { ProgressBar } from "./components/ProgressBar";
import { Step1SubjectInfo } from "./components/Step1SubjectInfo";
import { Step2GoalsDocuments } from "./components/Step2GoalsDocuments";
import { Step3PersonalInfo } from "./components/Step3PersonalInfo";
import { FormNavigationButtons } from "./components/FormNavigationButtons";

/* =========================
   Types
========================= */

interface FreeTrialFormData {
  subject: string;
  grade: string;
  schoolType: string;
  learningGoals: string;
  documents: File | null;

  studentFirstName: string;
  studentLastName: string;
  isUnder18: boolean;

  guardianFirstName: string;
  guardianLastName: string;
  guardianPhone: string;

  email: string;
  password: string;
  agreeToPolicy: boolean;
}

/* =========================
   Component
========================= */

export default function FreeTrialStudent() {
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<FreeTrialFormData>({
    subject: "",
    grade: "",
    schoolType: "",
    learningGoals: "",
    documents: null,

    studentFirstName: "",
    studentLastName: "",
    isUnder18: false,

    guardianFirstName: "",
    guardianLastName: "",
    guardianPhone: "",

    email: "",
    password: "",
    agreeToPolicy: false,
  });

  /* =========================
     Helpers
  ========================= */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        documents: e.target.files![0],
      }));
    }
  };

  const showSweetAlert = (
    type: "success" | "error" | "warning",
    title: string,
    text: string
  ) => {
    if (typeof window !== "undefined" && (window as any).Swal) {
      (window as any).Swal.fire({
        icon: type,
        title,
        text,
        confirmButtonColor: "#0B31BD",
      });
    }
  };

  /* =========================
     Validation
  ========================= */

  const validateStep1 = () => {
    if (!formData.subject || !formData.grade || !formData.schoolType) {
      showSweetAlert(
        "error",
        "Required Fields",
        "Please fill in all required fields."
      );
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (
      !formData.studentFirstName ||
      !formData.studentLastName ||
      !formData.email ||
      !formData.password
    ) {
      showSweetAlert(
        "error",
        "Required Fields",
        "Please fill in all required fields."
      );
      return false;
    }

    if (
      formData.isUnder18 &&
      (!formData.guardianFirstName ||
        !formData.guardianLastName ||
        !formData.guardianPhone)
    ) {
      showSweetAlert(
        "error",
        "Guardian Info",
        "Please fill in all guardian information."
      );
      return false;
    }

    return true;
  };

  /* =========================
     Navigation
  ========================= */

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 3 && !validateStep3()) return;

    if (step === 3 && !formData.agreeToPolicy) {
      showSweetAlert(
        "warning",
        "Agreement Required",
        "Please agree to the Privacy Policy."
      );
      return;
    }

    if (step === 3) {
      console.log("Submitted:", formData);

      if ((window as any).Swal) {
        (window as any).Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your request has been sent!",
          confirmButtonColor: "#0B31BD",
        }).then(() => {
          window.location.href = "/free-trial-student-dash";
        });
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  /* =========================
     JSX
  ========================= */

  return (
    <>
      {/* SweetAlert2 Script */}
      <Script
        src="https://cdn.jsdelivr.net/npm/sweetalert2@11"
        strategy="afterInteractive"
      />

      <style jsx global>{`
        .swal2-container {
          background-color: transparent !important;
        }
      `}</style>

      <div className="min-h-screen">
        <nav className="bg-[#FBFCFC] h-20 shadow-sm flex items-center justify-center">
          <h1 className="text-3xl font-bold text-[#0B31BD]">
            Schäfer Tutoring
          </h1>
        </nav>

        <div className="min-h-[calc(100vh-80px)] flex justify-center py-12 px-4">
          <div className="w-full max-w-2xl space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Free Trial Session (Step {step}/3)
            </h2>

            <ProgressBar step={step} totalSteps={3} />

            {step === 1 && (
              <Step1SubjectInfo formData={formData} setFormData={setFormData} />
            )}

            {step === 2 && (
              <Step2GoalsDocuments
                formData={formData}
                setFormData={setFormData}
                handleFileChange={handleFileChange}
              />
            )}

            {step === 3 && (
              <Step3PersonalInfo
                formData={formData}
                setFormData={setFormData}
              />
            )}

            <FormNavigationButtons
              step={step}
              totalSteps={3}
              onNext={handleNext}
              isLastStep={step === 3}
            />
          </div>
        </div>
      </div>
    </>
  );
}
