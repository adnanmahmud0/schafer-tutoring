'use client';

import { useState } from 'react';
import { X, Loader2, Upload, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useActiveSubjects } from '@/hooks/api/use-subjects';
import { useCreateSessionRequest } from '@/hooks/api/use-session-requests';
import { SCHOOL_TYPE, GRADE_LEVEL } from '@/hooks/api/use-trial-requests';

interface NewSessionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewSessionRequestModal({ isOpen, onClose }: NewSessionRequestModalProps) {
  const [formData, setFormData] = useState({
    subject: '',
    gradeLevel: '',
    schoolType: '',
    description: '',
    learningGoals: '',
    preferredDateTime: '',
  });
  const [documents, setDocuments] = useState<File[]>([]);

  const { data: subjects, isLoading: subjectsLoading } = useActiveSubjects();
  const createRequest = useCreateSessionRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject || !formData.gradeLevel || !formData.schoolType || !formData.description) {
      return;
    }

    try {
      await createRequest.mutateAsync({
        subject: formData.subject,
        gradeLevel: formData.gradeLevel,
        schoolType: formData.schoolType,
        description: formData.description,
        learningGoals: formData.learningGoals || undefined,
        preferredDateTime: formData.preferredDateTime || undefined,
      });

      // Reset form and close
      setFormData({
        subject: '',
        gradeLevel: '',
        schoolType: '',
        description: '',
        learningGoals: '',
        preferredDateTime: '',
      });
      setDocuments([]);
      onClose();
    } catch (error) {
      console.error('Failed to create session request:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request a New Session</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => setFormData({ ...formData, subject: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjectsLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                ) : (
                  subjects?.map((subject) => (
                    <SelectItem key={subject._id} value={subject._id}>
                      {subject.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Grade Level */}
          <div className="space-y-2">
            <Label htmlFor="gradeLevel">Grade Level *</Label>
            <Select
              value={formData.gradeLevel}
              onValueChange={(value) => setFormData({ ...formData, gradeLevel: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select grade level" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(GRADE_LEVEL).map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade.replace(/_/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* School Type */}
          <div className="space-y-2">
            <Label htmlFor="schoolType">School Type *</Label>
            <Select
              value={formData.schoolType}
              onValueChange={(value) => setFormData({ ...formData, schoolType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select school type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(SCHOOL_TYPE).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">What do you need help with? *</Label>
            <Textarea
              id="description"
              placeholder="Describe what you need help with..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          {/* Learning Goals */}
          <div className="space-y-2">
            <Label htmlFor="learningGoals">Learning Goals (Optional)</Label>
            <Textarea
              id="learningGoals"
              placeholder="What do you want to achieve from this session?"
              value={formData.learningGoals}
              onChange={(e) => setFormData({ ...formData, learningGoals: e.target.value })}
              rows={2}
            />
          </div>

          {/* Preferred DateTime */}
          <div className="space-y-2">
            <Label htmlFor="preferredDateTime">Preferred Date & Time (Optional)</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="preferredDateTime"
                type="datetime-local"
                className="pl-10"
                value={formData.preferredDateTime}
                onChange={(e) => setFormData({ ...formData, preferredDateTime: e.target.value })}
              />
            </div>
          </div>

          {/* Documents Upload */}
          <div className="space-y-2">
            <Label>Attach Documents (Optional)</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="documents"
              />
              <label htmlFor="documents" className="cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Click to upload files
                </p>
              </label>
              {documents.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  {documents.length} file(s) selected
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createRequest.isPending}>
              {createRequest.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
