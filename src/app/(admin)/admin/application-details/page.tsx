'use client';

import React from 'react';
import { FileText, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PrimaryButton from '@/components/button/PrimaryButton';

interface Subject {
  name: string;
  color: string;
}

interface File {
  id: number;
  name: string;
  type: string;
}

const ApplicationDetails = () => {
  const tutorInfo = {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@gmail.com',
    phone: '+49 123 456 789',
    dateOfBirth: '15-06-1996',
    address: '24 Park Street, Berlin, Germany',
  };

  const teachingPreferences: Subject[] = [
    { name: 'English', color: 'bg-blue-100 text-blue-800' },
    { name: 'Community', color: 'bg-green-100 text-green-800' },
    { name: 'Psychology', color: 'bg-purple-100 text-purple-800' },
  ];

  const uploadedFiles: File[] = [
    { id: 1, name: 'CV', type: 'pdf' },
    { id: 2, name: 'Adour Certificate', type: 'pdf' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      

      {/* Personal Information Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <div>
            <h1 className="text-xl font-bold text-gray-700">Information of {tutorInfo.fullName}</h1>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Full Name</p>
                <p className="text-gray-900 font-medium">{tutorInfo.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Phone</p>
                <p className="text-gray-900 font-medium">{tutorInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Address</p>
                <p className="text-gray-900 font-medium">{tutorInfo.address}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Email</p>
                <p className="text-gray-900 font-medium">{tutorInfo.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Date of Birth</p>
                <p className="text-gray-900 font-medium">{tutorInfo.dateOfBirth}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teaching Preferences Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Teaching Preferences</CardTitle>
          <CardDescription>Subjects this tutor wants to teach</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {teachingPreferences.map((subject, index) => (
              <Badge key={index} className={`${subject.color} border-0 font-medium`}>
                {subject.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-200 rounded">
                    <FileText size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.type.toUpperCase()}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  View File
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div>
        <PrimaryButton name='Mark as Tutor' className='bg-[#3ABD0B] hover:bg-[#2b9107] w-1/3 text-white flex justify-self-center' href="/admin/application" />
      </div>
    </div>
  );
};

export default ApplicationDetails;