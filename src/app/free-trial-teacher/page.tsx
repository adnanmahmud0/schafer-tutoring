/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Upload, X } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

/* ================= TYPES ================= */

interface FormData {
  subjects: string[];
  cv: File | null;
  abiturCertificate: File | null;
  officialId: File | null;
  firstName: string;
  lastName: string;
  birthDate: string;
  street: string;
  number: string;
  zip: string;
  city: string;
  phoneNumber: string;
  email: string;
  password: string;
  agreeToPolicy: boolean;
}

/* ================= COMPONENT ================= */

const FreeTrialTeacher = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [showSubjectDropdown, setShowSubjectDropdown] =
    useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    subjects: [],
    cv: null,
    abiturCertificate: null,
    officialId: null,
    firstName: "",
    lastName: "",
    birthDate: "",
    street: "",
    number: "",
    zip: "",
    city: "",
    phoneNumber: "",
    email: "",
    password: "",
    agreeToPolicy: false,
  });

  const availableSubjects: string[] = [
    "Math",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "German",
    "French",
    "Spanish",
    "History",
    "Geography",
    "Economics",
    "Computer Science",
  ];

  /* ================= EFFECT ================= */

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  /* ================= HANDLERS ================= */

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof FormData
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: e.target.files![0],
    }));
  };

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleRemoveSubject = (subject: string) => {
    setSelectedSubjects((prev) => prev.filter((s) => s !== subject));
  };

  const filteredSubjects = availableSubjects.filter((subject) =>
    subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ================= VALIDATION ================= */

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
        confirmButtonText: "OK",
        allowOutsideClick: false,
      });
    }
  };

  const validateStep1 = (): boolean => {
    if (selectedSubjects.length === 0) {
      showSweetAlert(
        "error",
        "Required Fields",
        "Please select at least one subject."
      );
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    if (!formData.cv || !formData.abiturCertificate || !formData.officialId) {
      showSweetAlert(
        "error",
        "Required Fields",
        "Please upload all required documents."
      );
      return false;
    }
    return true;
  };

  const validateStep3 = (): boolean => {
    const requiredFields = [
      formData.firstName,
      formData.lastName,
      formData.birthDate,
      formData.street,
      formData.number,
      formData.zip,
      formData.city,
      formData.phoneNumber,
      formData.email,
      formData.password,
    ];

    if (requiredFields.some((field) => !field)) {
      showSweetAlert(
        "error",
        "Required Fields",
        "Please fill in all required fields."
      );
      return false;
    }
    return true;
  };

  /* ================= STEP CONTROL ================= */

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    if (!validateStep3()) return;

    if (!formData.agreeToPolicy) {
      showSweetAlert(
        "warning",
        "Agreement Required",
        "Please agree to the Privacy Policy."
      );
      return;
    }

    const submitData = {
      ...formData,
      subjects: selectedSubjects,
    };

    console.log("Form submitted:", submitData);

    showSweetAlert(
      "success",
      "Success!",
      "Your teacher application has been sent."
    );
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen py-10 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Teacher Application (Step {step}/3)
      </h2>

      {step === 1 && (
        <>
          <div className="border p-4 rounded">
            {filteredSubjects.map((subject) => (
              <div
                key={subject}
                className="flex justify-between items-center py-2"
                onClick={() => handleSubjectToggle(subject)}
              >
                <span>{subject}</span>
                <Checkbox checked={selectedSubjects.includes(subject)} />
              </div>
            ))}
          </div>

          <button
            onClick={handleNextStep}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <Input type="file" onChange={(e) => handleFileChange(e, "cv")} />
          <Input
            type="file"
            onChange={(e) => handleFileChange(e, "abiturCertificate")}
          />
          <Input
            type="file"
            onChange={(e) => handleFileChange(e, "officialId")}
          />

          <div className="flex gap-4 mt-4">
            <button onClick={handlePrevStep}>Back</button>
            <button onClick={handleNextStep}>Next</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <Input name="firstName" onChange={handleInputChange} />
          <Input name="lastName" onChange={handleInputChange} />
          <Input name="email" onChange={handleInputChange} />
          <Input type="password" name="password" onChange={handleInputChange} />

          <Checkbox
            checked={formData.agreeToPolicy}
            onCheckedChange={(value) =>
              setFormData({
                ...formData,
                agreeToPolicy: Boolean(value),
              })
            }
          />

          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default FreeTrialTeacher;
