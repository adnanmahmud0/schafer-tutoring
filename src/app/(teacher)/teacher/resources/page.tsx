"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedMaterialType, setSelectedMaterialType] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const resources = [
    {
      id: 1,
      title: "Quadratic Equations – Solution Methods",
      subject: "Mathematics",
      grade: "Grade 9-10",
      state: "BW",
      type: "PDF",
      description:
        "Comprehensive tutorial on various solution methods for quadratic equations with practice problems and solutions.",
      source: "MUNDO",
      tag: "Class Test",
      badgeColor: "bg-yellow-100",
    },
    {
      id: 2,
      title: "Forest Ecosystem - Interactive Simulation",
      subject: "Biology",
      grade: "Grade 7-8",
      state: "nationwide",
      type: "Video",
      description:
        "Interactive simulation for understanding biotic chains and material cycles in forest ecosystems.",
      source: "Wiki",
       tag: "Class Test",
      badgeColor: "bg-yellow-100",
    },
    {
      id: 3,
      title: "Weimar Republic - Source Collection",
      subject: "History",
      grade: "Grade 11-13",
      state: "BW",
      type: "PDF",
      description:
        "Curated collection of primary sources on the Weimar Republic with didactic notes.",
      source: "Sarb",
             tag: "Class Test",
      badgeColor: "bg-yellow-100",
    },
    {
      id: 4,
      title: "Introduction to Python Programming",
      subject: "Computer Science",
      grade: "Grade 9-12",
      state: "nationwide",
      type: "Video",
      description:
        "Friendly video series covering Python basics, loops, functions, and data structures.",
      source: "MUNDO",
      tag: "Class Test",
      badgeColor: "bg-yellow-100",
    },
    {
      id: 5,
      title: "Climate Change and Its Effects",
      subject: "Geography",
      grade: "Grade 9-10",
      state: "nationwide",
      type: "Video",
      description:
        "Detailed analysis of climate change causes, effects, and mitigation strategies with current data.",
      source: "MUNDO",
      tag: "Class Test",
      badgeColor: "bg-yellow-100",
    },
    {
      id: 6,
      title: "Shakespeare's Hamlet - Analysis Guide",
      subject: "English",
      grade: "Grade 11-13",
      state: "BW",
      type: "PDF",
      description:
        "Curated collection of primary sources on classic literature with didactic notes.",
      source: "Sarb",
      tag: "Class Test",
      badgeColor: "bg-yellow-100",
    },
  ];

  const filteredResources = resources.filter((resource) => {
    return (
      (!searchQuery ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedSubject || resource.subject === selectedSubject) &&
      (!selectedGrade || resource.grade === selectedGrade) &&
      (!selectedState || resource.state === selectedState) &&
      (!selectedMaterialType || resource.type === selectedMaterialType)
    );
  });

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-7 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">
            Resource Search
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Find educational materials from open education databases - filtered
            by subject, grade, state, and material type
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-7 lg:mb-8">
          <div className="relative">
            <Search
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, competencies..."
              className="pl-10 sm:pl-12 h-10 sm:h-11 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-7 lg:mb-8">
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5 sm:mb-2">
              Subject
            </label>
            <Select
              value={selectedSubject || "all-subjects"}
              onValueChange={(value) =>
                setSelectedSubject(value === "all-subjects" ? "" : value)
              }
            >
              <SelectTrigger className="h-9 sm:h-10 w-full text-sm">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-subjects">All Subjects</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="History">History</SelectItem>
                <SelectItem value="Computer Science">
                  Computer Science
                </SelectItem>
                <SelectItem value="Geography">Geography</SelectItem>
                <SelectItem value="English">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5 sm:mb-2">
              Grade
            </label>
            <Select
              value={selectedGrade || "all-grades"}
              onValueChange={(value) =>
                setSelectedGrade(value === "all-grades" ? "" : value)
              }
            >
              <SelectTrigger className="h-9 sm:h-10 w-full text-sm">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-grades">All Grades</SelectItem>
                <SelectItem value="Grade 7-8">Grade 7-8</SelectItem>
                <SelectItem value="Grade 9-10">Grade 9-10</SelectItem>
                <SelectItem value="Grade 9-12">Grade 9-12</SelectItem>
                <SelectItem value="Grade 11-13">Grade 11-13</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5 sm:mb-2">
              State
            </label>
            <Select
              value={selectedState || "all-states"}
              onValueChange={(value) =>
                setSelectedState(value === "all-states" ? "" : value)
              }
            >
              <SelectTrigger className="h-9 sm:h-10 w-full text-sm">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-states">All States</SelectItem>
                <SelectItem value="BW">BW</SelectItem>
                <SelectItem value="nationwide">Nationwide</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5 sm:mb-2">
              Material Type
            </label>
            <Select
              value={selectedMaterialType || "all-types"}
              onValueChange={(value) =>
                setSelectedMaterialType(value === "all-types" ? "" : value)
              }
            >
              <SelectTrigger className="h-9 sm:h-10 w-full text-sm">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5 sm:mb-2">
              Exam Type
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-9 sm:h-10 w-full text-sm">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-5 lg:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-600">
            <span className="font-semibold text-gray-900">
              {filteredResources.length}
            </span>{" "}
            results found
          </p>
          <div className="w-full sm:w-auto">
            <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5 sm:mb-2">
              Sort By
            </label>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-9 sm:h-10 w-full sm:w-40 text-sm">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-gray-300 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="p-4 sm:p-5 pb-3 sm:pb-4 border-b border-gray-100">
                  <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {resource.title}
                      </h3>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 sm:px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap ${
                        resource.type === "PDF"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {resource.type === "PDF" ? "📄 PDF" : "▶️ Video"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed truncate">
                    {resource.subject} • {resource.grade} • {resource.state}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5">
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                    {resource.description}
                  </p>

                  {resource.badgeColor && (
                    <div
                      className={`text-xs font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full inline-block mb-3 sm:mb-4 ${resource.badgeColor} text-amber-900`}
                    >
                      ⭐ {resource.tag}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 truncate mr-2">
                      Source:{" "}
                      <span className="font-medium text-gray-700">
                        {resource.source}
                      </span>
                    </p>
                    <button className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline flex-shrink-0">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-sm sm:text-base text-gray-500">
                No resources found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}