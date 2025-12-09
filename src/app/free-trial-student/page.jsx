/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
const FreeTrialStudent = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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

  // Load SweetAlert2 CDN
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      documents: e.target.files[0],
    }));
  };

  const validateStep1 = () => {
    if (!formData.subject || !formData.grade || !formData.schoolType) {
      showSweetAlert(
        "error",
        "Required Fields",
        "Please fill in all required fields to continue."
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
        "Please fill in all required fields to continue."
      );
      return false;
    }

    if (formData.isUnder18) {
      if (
        !formData.guardianFirstName ||
        !formData.guardianLastName ||
        !formData.guardianPhone
      ) {
        showSweetAlert(
          "error",
          "Required Fields",
          "Please fill in all guardian information."
        );
        return false;
      }
    }

    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) {
      return;
    }
    setStep((prev) => prev + 1);
  };

  const showSweetAlert = (type, title, text) => {
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

    console.log("Form submitted:", formData);

    if (typeof window !== "undefined" && window.Swal) {
      window.Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your request for a free trial session has been sent. We will get back to you shortly!",
        confirmButtonColor: "#0B31BD",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        customClass: {
          popup: "animate__animated animate__fadeInDown",
          confirmButton: "font-medium",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/free-trial-student-dash";
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

      <div className="min-h-screen">
        {/* Navbar */}
        <nav className="bg-[#FBFCFC] h-20 shadow-sm">
          <div className=" px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center h-16">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-[#0B31BD]">
                  Schäfer Tutoring
                </h1>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-2xl">
            {/* Form Container */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Free Trial Session (Step {step}/3)
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
                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) =>
                          setFormData({ ...formData, subject: value })
                        }
                        required
                      >
                        <SelectTrigger className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                          <SelectValue placeholder="Select your subject" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="languages">Languages</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grade <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.grade}
                        onValueChange={(value) =>
                          setFormData({ ...formData, grade: value })
                        }
                        required
                      >
                        <SelectTrigger className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                          <SelectValue placeholder="Select your grade" />
                        </SelectTrigger>

                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                            (grade) => (
                              <SelectItem key={grade} value={String(grade)}>
                                Grade {grade}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        School Type <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.schoolType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, schoolType: value })
                        }
                        required
                      >
                        <SelectTrigger className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                          <SelectValue placeholder="Select your school type" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="public">Public School</SelectItem>
                          <SelectItem value="private">
                            Private School
                          </SelectItem>
                          <SelectItem value="homeschool">Homeschool</SelectItem>
                          <SelectItem value="charter">
                            Charter School
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <button
                      onClick={handleNextStep}
                      className="w-2/3 mx-auto bg-[#0B31BD] text-white py-3 rounded-md font-medium hover:bg-[#062183] transition-colors flex items-center justify-center gap-2"
                    >
                      Next Step
                    </button>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Learning Goals (Optional)
                      </label>
                      <textarea
                        name="learningGoals"
                        value={formData.learningGoals}
                        onChange={handleInputChange}
                        placeholder="Enter your learning goals"
                        rows={6}
                        className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Documents (Optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-white">
                        <Input
                          type="file"
                          id="file-upload"
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".png,.jpg,.jpeg,.pdf"
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <div className="w-18 h-18 p-2 bg-[#D8E3FC] rounded-full flex items-center justify-center mb-4">
                            <img src="/Vector.svg" alt="" />
                          </div>
                          <p className="text-gray-700 font-medium mb-1">
                            Drag & drop files here or click to browse
                          </p>
                          <p className="text-gray-500 text-sm">
                            png, jpg up to 10MB
                          </p>
                        </label>
                        {formData.documents && (
                          <p className="mt-4 text-sm text-green-600">
                            File selected: {formData.documents.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleNextStep}
                      className="w-2/3 mx-auto bg-[#0B31BD] text-white py-3 rounded-md font-medium hover:bg-[#062183] transition-colors flex items-center justify-center gap-2"
                    >
                      Next Step
                    </button>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name (Student){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          name="studentFirstName"
                          value={formData.studentFirstName}
                          onChange={handleInputChange}
                          placeholder="Enter your first name"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last name (Student){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          name="studentLastName"
                          value={formData.studentLastName}
                          onChange={handleInputChange}
                          placeholder="Enter your last name"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        name="isUnder18"
                        checked={formData.isUnder18}
                        onCheckedChange={(value) =>
                          setFormData({ ...formData, isUnder18: value })
                        }
                      />

                      <label className="ml-2 text-sm text-gray-700">
                        Is the student under age 18?
                      </label>
                    </div>

                    {formData.isUnder18 && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              First Name (Legal Guardian){" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              name="guardianFirstName"
                              value={formData.guardianFirstName}
                              onChange={handleInputChange}
                              placeholder="Enter guardian first name"
                              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Last name (Legal Guardian){" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              name="guardianLastName"
                              value={formData.guardianLastName}
                              onChange={handleInputChange}
                              placeholder="Enter guardian last name"
                              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone (Legal Guardian){" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="tel"
                            name="guardianPhone"
                            value={formData.guardianPhone}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                            required
                          />
                        </div>
                      </>
                    )}

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
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
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
                        placeholder="Enter your password"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      />
                    </div>

                    <div className="flex items-start">
                      <Checkbox
                        checked={formData.agreeToPolicy}
                        onCheckedChange={(value) =>
                          setFormData({ ...formData, agreeToPolicy: value })
                        }
                        className="h-4 w-4 mt-0.5"
                        required
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        I have read and agree to the{" "}
                        <Link
                          href="/privacy"
                          className="text-blue-600 underline"
                        >
                          Privacy Policy
                        </Link>
                        <span className="text-red-500"> *</span>
                      </label>
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-2/3 mx-auto bg-[#0B31BD] text-white py-3 rounded-md font-medium hover:bg-[#062183] transition-colors flex items-center justify-center gap-2"
                    >
                      Send the request
                    </button>
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

export default FreeTrialStudent;
