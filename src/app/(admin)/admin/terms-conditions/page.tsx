'use client';

import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TermsAndConditions = () => {
  const [termsContent, setTermsContent] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSave = () => {
    // Save logic here
    console.log('Saving terms and conditions...');
    setShowSuccessMessage(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Manage Terms & Conditions
        </h1>
        <p className="text-gray-600 text-sm">
          Use this section to write or update the Terms and Conditions for your website. These terms 
          will be displayed to users within the website and must be accepted during registration or major updates.
        </p>
      </div>

      {/* Success Alert */}
      {showSuccessMessage && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 ml-2">
            Your Terms & Conditions have been successfully updated and will now appear in the Website.
          </AlertDescription>
        </Alert>
      )}

      {/* Editor Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Terms & Conditions Editor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Text Area */}
          <textarea
            value={termsContent}
            onChange={(e) => setTermsContent(e.target.value)}
            placeholder="Write or paste your Terms & Conditions here..."
            className="w-full h-80 p-4 border border-gray-200 rounded-lg focus:border-gray-300 focus:ring-0 focus:outline-none resize-none bg-white text-gray-900 placeholder-gray-400"
          />
        </CardContent>
      </Card>
      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-1/3 bg-[#002AC8] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Save Terms & Conditions</button> 
    </div>
  );
}
export default TermsAndConditions;