import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

// ============ Types ============
export interface SubmitApplicationData {
  // Auth
  email: string;
  password: string;
  // Personal
  name: string;
  birthDate: string;
  phoneNumber: string;
  // Address
  street: string;
  houseNumber: string;
  zip: string;
  city: string;
  // Subjects
  subjects: string[];
  // Documents (Files)
  cv: File;
  abiturCertificate: File;
  officialId: File;
}

export interface ApplicationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    application: {
      _id: string;
      name: string;
      email: string;
      status: string;
    };
    user: {
      _id: string;
      email: string;
    };
  };
}

// Application status type
export type ApplicationStatus =
  | 'SUBMITTED'
  | 'REVISION'
  | 'SELECTED_FOR_INTERVIEW'
  | 'APPROVED'
  | 'REJECTED';

// Full application data (for my-application endpoint)
export interface TutorApplication {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  street: string;
  houseNumber: string;
  zip: string;
  city: string;
  cv: string;
  abiturCertificate: string;
  officialId: string;
  subjects: Array<{ name: string }>;
  status: ApplicationStatus;
  rejectionReason?: string;
  revisionNote?: string;
  submittedAt: string;
  selectedForInterviewAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ============ API Functions ============
const submitApplication = async (
  data: SubmitApplicationData
): Promise<ApplicationResponse> => {
  const formData = new FormData();

  // Append files
  formData.append('cv', data.cv);
  formData.append('abiturCertificate', data.abiturCertificate);
  formData.append('officialId', data.officialId);

  // Append JSON data
  const jsonData = {
    email: data.email,
    password: data.password,
    name: data.name,
    birthDate: data.birthDate,
    phoneNumber: data.phoneNumber,
    street: data.street,
    houseNumber: data.houseNumber,
    zip: data.zip,
    city: data.city,
    subjects: data.subjects,
  };
  formData.append('data', JSON.stringify(jsonData));

  const response = await apiClient.post('/applications', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// ============ Hooks ============

/**
 * Submit tutor application (Public - no auth required)
 * Creates user + application in one step
 */
export const useSubmitApplication = () => {
  return useMutation({
    mutationFn: submitApplication,
  });
};

/**
 * Get my application (Protected - APPLICANT role required)
 * Fetches the current user's tutor application
 */
export const useMyApplication = () => {
  return useQuery({
    queryKey: ['myApplication'],
    queryFn: async () => {
      const { data } = await apiClient.get('/applications/my-application');
      return data.data as TutorApplication;
    },
    staleTime: 2 * 60 * 1000, // 2 min cache
    retry: false, // Don't retry on 404
  });
};