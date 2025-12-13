'use client';

import React, { useState } from 'react';
import { FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import PrimaryButton from '@/components/button/PrimaryButton';

interface Subject {
  name: string;
}

interface File {
  id: number;
  name: string;
}

const TutorEditPage = () => {
  const [fullName, setFullName] = useState('Sarah Johnson');
  const [email, setEmail] = useState('sarah.johnson@email.com');
  const [phone, setPhone] = useState('+49 123 456 789');
  const [birthDate, setBirthDate] = useState('15-06-1996');
  const [address, setAddress] = useState('24 Park Street, Berlin, Germany');
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: 'English' },
    { name: 'Geography' },
    { name: 'Psychology' },
  ]);
  const [subjectInput, setSubjectInput] = useState('');

  const uploadedFiles: File[] = [
    { id: 1, name: 'CV' },
    { id: 2, name: 'Abitur Certificate' },
  ];

  const handleAddSubject = () => {
    if (subjectInput.trim()) {
      setSubjects([...subjects, { name: subjectInput }]);
      setSubjectInput('');
    }
  };

  const handleRemoveSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSubject();
    }
  };

  const handleSave = () => {
    // Save logic here
    console.log('Saving tutor details...');
  };

  return (
    <div className="space-y-6">
      {/* Personal Information Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Full Name and Email */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Full Name
              </label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Email
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
              />
            </div>
          </div>

          {/* Phone and Birth Date */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Phone
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Birth Date
              </label>
              <Input
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Address
            </label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
            />
          </div>
        </CardContent>
      </Card>

      {/* Teaching Preferences Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Teaching Preferences</CardTitle>
          <CardDescription>Subjects the tutor wants to teach</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selected Subjects */}
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject, index) => (
              <Badge
                key={index}
                className="bg-blue-100 text-blue-800 border-0 font-medium flex items-center gap-2 px-3 py-1"
              >
                {subject.name}
                <button
                  onClick={() => handleRemoveSubject(index)}
                  className="ml-1 hover:opacity-70"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>

          {/* Input Field */}
          <div>
            <Input
              placeholder="Type a subject and press Enter to add"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
            />
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to add a new subject
            </p>
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
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-200 rounded">
                    <FileText size={20} className="text-gray-600" />
                  </div>
                  <p className="font-medium text-gray-900">{file.name}</p>
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

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <PrimaryButton name='Save Changes' href='/save'></PrimaryButton>
        <PrimaryButton name='Cancel' className='bg-white text-black hover:bg-red-100' href='/admin/application'></PrimaryButton>
      </div>
    </div>
  );
};

export default TutorEditPage;