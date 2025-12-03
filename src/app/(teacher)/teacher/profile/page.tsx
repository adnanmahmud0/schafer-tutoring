"use client";
import React, { useState } from 'react';
import { Edit, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'David Chen',
    dateOfBirth: '26.11.2003',
    email: 'schafertutoring@gmail.com',
    phoneNumber: '+839571238',
    street: 'Goethe Street',
    number: '51',
    zip: '8751',
    city: 'Munich',
  });

  const [tempFormData, setTempFormData] = useState({ ...formData });

  const profileInfo = {
    name: 'David Chen',
    role: 'Tutor (Math, English & German)',
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setTempFormData({ ...formData });
  };

  const handleSave = () => {
    setFormData({ ...tempFormData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempFormData({ ...tempFormData, [field]: value });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-start gap-6 mb-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop"
                  alt="David Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{profileInfo.name}</h1>
              <p className="text-gray-600 text-sm">{profileInfo.role}</p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              {!isEditing ? (
                <Button
                  onClick={handleEditClick}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 h-10 rounded-lg font-medium"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="px-6 h-10 font-medium"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-10 font-medium rounded-lg"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>

            {!isEditing ? (
              // View Mode
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">Student name</label>
                    <p className="text-sm text-gray-900 font-medium">{formData.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">Email</label>
                    <p className="text-sm text-gray-900 font-medium">{formData.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">Street</label>
                    <p className="text-sm text-gray-900 font-medium">{formData.street}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">Number</label>
                    <p className="text-sm text-gray-900 font-medium">{formData.number}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">ZIP</label>
                    <p className="text-sm text-gray-900 font-medium">{formData.zip}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">City</label>
                    <p className="text-sm text-gray-900 font-medium">{formData.city}</p>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Name</label>
                  <div className="text-sm text-gray-600 mb-4">{tempFormData.name}</div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Date of Birth</label>
                  <Input
                    type="text"
                    value={tempFormData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="h-10 border-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                    <Input
                      type="email"
                      value={tempFormData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-10 border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      value={tempFormData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="h-10 border-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Street</label>
                    <Input
                      type="text"
                      value={tempFormData.street}
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      className="h-10 border-gray-300"
                      placeholder="Goethe Street"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Number</label>
                    <Input
                      type="text"
                      value={tempFormData.number}
                      onChange={(e) => handleInputChange('number', e.target.value)}
                      className="h-10 border-gray-300"
                      placeholder="51"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">ZIP</label>
                    <Input
                      type="text"
                      value={tempFormData.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      className="h-10 border-gray-300"
                      placeholder="8751"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">City</label>
                    <Input
                      type="text"
                      value={tempFormData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="h-10 border-gray-300"
                      placeholder="Munich"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}