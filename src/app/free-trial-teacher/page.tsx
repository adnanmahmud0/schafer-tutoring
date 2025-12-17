"use client";
import React, { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type SweetAlertType = "success" | "error" | "warning" | "info" | "question";

declare global {
  interface Window {
    Swal: {
      fire: (options: {
        icon: SweetAlertType;
        title: string;
        text: string;
        confirmButtonColor?: string;
        confirmButtonText?: string;
        allowOutsideClick?: boolean;
        customClass?: Record<string, string>;
      }) => Promise<{ isConfirmed: boolean }>;
    };
  }
}

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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "cv" | "abiturCertificate" | "officialId"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]:
        e.target.files && e.target.files[0] ? e.target.files[0] : null,
    }));
  };

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) {
        return prev.filter((s) => s !== subject);
      } else {
        return [...prev, subject];
      }
    });
  };

  const handleRemoveSubject = (subject: string) => {
    setSelectedSubjects((prev) => prev.filter((s) => s !== subject));
  };

  const filteredSubjects = availableSubjects.filter((subject) =>
    subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateStep1 = () => {
    if (selectedSubjects.length === 0) {
      showSweetAlert(
        "error",
        "Required Fields",
        "Please select at least one subject to teach."
      );
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
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

  const validateStep3 = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.birthDate ||
      !formData.street ||
      !formData.number ||
      !formData.zip ||
      !formData.city ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password
    ) {
      showSweetAlert(
        "error",
        "Required Fields",
        "Please fill in all required fields to continue."
      );
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) {
      return;
    }
    if (step === 2 && !validateStep2()) {
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const showSweetAlert = (
    type: SweetAlertType,
    title: string,
    text: string
  ) => {
    if (typeof window !== "undefined" && window.Swal) {
      window.Swal.fire({
        icon: type,
        title: title,
        text: text,
        confirmButtonColor: "#0B31BD",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        customClass: {
          popup: "animate__animated animate__fadeInDown",
          confirmButton: "font-medium",
        },
      });
    }
  };

  const handleSubmit = () => {
    if (!validateStep3()) {
      return;
    }

    if (!formData.agreeToPolicy) {
      showSweetAlert(
        "warning",
        "Agreement Required",
        "Please agree to the Privacy Policy to continue."
      );
      return;
    }

    const submitData = {
      ...formData,
      subjects: selectedSubjects,
    };

    console.log("Form submitted:", submitData);

    if (typeof window !== "undefined" && window.Swal) {
      window.Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your teacher application has been sent. We will get back to you shortly!",
        confirmButtonColor: "#0B31BD",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        customClass: {
          popup: "animate__animated animate__fadeInDown",
          confirmButton: "font-medium",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/free-trial-teacher-dash";
        }
      });
    }
  };

  return (
    <>
      <style jsx global>{`
        .swal2-container {
          background-color: transparent !important;
        }
      `}</style>

      <div className="min-h-screen -mb-20">
        {/* Navbar */}
        <nav className="bg-[#FBFCFC] h-20 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="flex items-center justify-center w-full">
              <h1 className="text-3xl font-bold text-[#0B31BD]">
                Schäfer Tutoring
              </h1>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="min-h-[calc(100vh-64px)] flex justify-center py-12 px-4">
          <div className="w-full max-w-2xl">
            {/* Form Container */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Teacher Application (Step {step}/3)
              </h2>

              {/* Progress Bar */}
              <div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#062183] transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                {/* Step 1 - Subject Selection */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-base font-semibold text-[#0B31BD] mb-2">
                        What subjects you wanna teach?
                      </label>
                      <p className="text-sm text-gray-600 mb-3">
                        Select Subjects
                      </p>

                      {/* Selected Subjects Display */}
                      <div
                        className="flex h-auto min-h-[40px] w-full items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm cursor-pointer flex-wrap"
                        onClick={() =>
                          setShowSubjectDropdown(!showSubjectDropdown)
                        }
                      >
                        {selectedSubjects.length === 0 ? (
                          <span className="text-gray-400">Select subjects</span>
                        ) : (
                          selectedSubjects.map((subject) => (
                            <span
                              key={subject}
                              className="inline-flex items-center gap-1 bg-[#0B31BD] text-white px-2 py-1 rounded text-sm"
                            >
                              {subject}
                              <X
                                size={14}
                                className="cursor-pointer hover:text-gray-300"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveSubject(subject);
                                }}
                              />
                            </span>
                          ))
                        )}
                        <svg
                          className="ml-auto"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>

                      {/* Dropdown */}
                      {showSubjectDropdown && (
                        <div className="mt-2 border border-gray-300 rounded-md bg-white shadow-lg max-h-64 overflow-y-auto">
                          {/* Search Input */}
                          <div className="p-3 border-b border-gray-200">
                            <div className="flex items-center gap-2 px-3 border border-gray-300 rounded-md">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                              </svg>
                              <Input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="!border-none !shadow-none !outline-none !ring-0 !focus:ring-0 !focus:ring-offset-0 text-sm w-full"
                                style={{ boxShadow: "none" }}
                              />
                            </div>
                          </div>

                          {/* Subject List */}
                          <div className="p-2">
                            {filteredSubjects.map((subject) => (
                              <div
                                key={subject}
                                className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer rounded"
                                onClick={() => handleSubjectToggle(subject)}
                              >
                                <span className="text-sm text-gray-700">
                                  {subject}
                                </span>
                                <Checkbox
                                  checked={selectedSubjects.includes(subject)}
                                  onCheckedChange={(checked) =>
                                    setSelectedSubjects((prev) =>
                                      checked
                                        ? [...prev, subject]
                                        : prev.filter((s) => s !== subject)
                                    )
                                  }
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={handlePrevStep}
                        disabled={step === 1}
                        className="w-full max-w-md mx-auto bg-gray-300 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="w-full max-w-md mx-auto bg-[#0B31BD] text-white py-3 rounded-md font-medium hover:bg-[#062183] transition-colors flex items-center justify-center gap-2"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2 - Document Upload */}
                {step === 2 && (
                  <div className="space-y-6">
                    {/* CV Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CV <span className="text-red-500">*</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-white">
                        <input
                          type="file"
                          id="cv-upload"
                          onChange={(e) => handleFileChange(e, "cv")}
                          className="hidden"
                          accept=".png,.jpg,.jpeg,.pdf"
                        />
                        <label
                          htmlFor="cv-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <div className="w-16 h-16 bg-[#D8E3FC] rounded-full flex items-center justify-center mb-4">
                            <Upload className="text-[#0B31BD]" size={32} />
                          </div>
                          <p className="text-gray-700 font-medium mb-1">
                            Drag & drop files here or click to browse
                          </p>
                          <p className="text-gray-500 text-sm">
                            png, jpg up to 10MB
                          </p>
                        </label>
                        {formData.cv && (
                          <p className="mt-4 text-sm text-green-600">
                            File selected: {formData.cv.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Abitur Certificate Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Abitur Certificate{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-white">
                        <input
                          type="file"
                          id="abitur-upload"
                          onChange={(e) =>
                            handleFileChange(e, "abiturCertificate")
                          }
                          className="hidden"
                          accept=".png,.jpg,.jpeg,.pdf"
                        />
                        <label
                          htmlFor="abitur-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <div className="w-16 h-16 bg-[#D8E3FC] rounded-full flex items-center justify-center mb-4">
                            <Upload className="text-[#0B31BD]" size={32} />
                          </div>
                          <p className="text-gray-700 font-medium mb-1">
                            Drag & drop files here or click to browse
                          </p>
                          <p className="text-gray-500 text-sm">
                            png, jpg up to 10MB
                          </p>
                        </label>
                        {formData.abiturCertificate && (
                          <p className="mt-4 text-sm text-green-600">
                            File selected: {formData.abiturCertificate.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Official ID Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Official ID-Document{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-white">
                        <input
                          type="file"
                          id="id-upload"
                          onChange={(e) => handleFileChange(e, "officialId")}
                          className="hidden"
                          accept=".png,.jpg,.jpeg,.pdf"
                        />
                        <label
                          htmlFor="id-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <div className="w-16 h-16 bg-[#D8E3FC] rounded-full flex items-center justify-center mb-4">
                            <Upload className="text-[#0B31BD]" size={32} />
                          </div>
                          <p className="text-gray-700 font-medium mb-1">
                            Drag & drop files here or click to browse
                          </p>
                          <p className="text-gray-500 text-sm">
                            png, jpg up to 10MB
                          </p>
                        </label>
                        {formData.officialId && (
                          <p className="mt-4 text-sm text-green-600">
                            File selected: {formData.officialId.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={handlePrevStep}
                        className="w-full max-w-md mx-auto bg-gray-300 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-400 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="w-full max-w-md mx-auto bg-[#0B31BD] text-white py-3 rounded-md font-medium hover:bg-[#062183] transition-colors flex items-center justify-center gap-2"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 - Personal Information */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter your first name"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter your last name"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Birth Date <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        placeholder="DD-MM-YYYY"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          placeholder="Enter street name"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          name="number"
                          value={formData.number}
                          onChange={handleInputChange}
                          placeholder="Enter your number"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          placeholder="Enter ZIP"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter your city"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your Password"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="flex items-start">
                      <Checkbox
                        name="agreeToPolicy"
                        checked={formData.agreeToPolicy}
                        onCheckedChange={(value) =>
                          setFormData({
                            ...formData,
                            agreeToPolicy: Boolean(value),
                          })
                        }
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        I have read and agree to the{" "}
                        <Link
                          href="/privacy"
                          className="text-blue-600 underline"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={handlePrevStep}
                        className="w-full max-w-md mx-auto bg-gray-300 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-400 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="w-full max-w-md mx-auto bg-[#0B31BD] text-white py-3 rounded-md font-medium hover:bg-[#062183] transition-colors flex items-center justify-center gap-2"
                      >
                        Send the request
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreeTrialTeacher;
