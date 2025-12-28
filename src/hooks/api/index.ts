// Auth Hooks
export {
  useLogin,
  useRegister,
  useLogout,
  useProfile,
  useUpdateProfile,
  useVerifyEmail,
  useResendVerifyEmail,
  useForgetPassword,
  useResetPassword,
  useChangePassword,
} from './use-auth';

// Subject Hooks (Public)
export { useSubjects, useActiveSubjects, useSubject } from './use-subjects';

// Session Hooks
export {
  useUpcomingSessions,
  useCompletedSessions,
  useSession,
  useSessionDetails,
  useCancelSession,
  useRescheduleSession,
  useApproveReschedule,
  useRejectReschedule,
  useProposeSession,
  useAcceptSessionProposal,
  useRejectSessionProposal,
  // Admin
  useAdminSessions,
  useSessionStats,
  useUnifiedSessions,
  SESSION_STATUS,
  PAYMENT_STATUS,
} from './use-sessions';

// Student Hooks
export {
  useStudents,
  useStudent,
  useBlockStudent,
  useUnblockStudent,
} from './use-students';

// Tutor Hooks
export {
  useTutors,
  useTutor,
  useTutorStatistics,
  useBlockTutor,
  useUnblockTutor,
  useUpdateTutorSubjects,
} from './use-tutors';

// Bookmark Hooks
export { useBookmarks, useToggleBookmark, useIsBookmarked } from './use-bookmarks';

// Chat Hooks
export {
  useChats,
  useCreateChat,
  useMessages,
  useSendMessage,
  useMarkChatAsRead,
} from './use-chats';

// Notification Hooks
export {
  useNotifications,
  useUnreadNotificationsCount,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from './use-notifications';

// Application Hooks (Applicant)
export { useSubmitApplication, useMyApplication } from './use-applications';

// Admin Application Hooks
export {
  useAdminApplications,
  useAdminApplication,
  useSelectForInterview,
  useApproveApplication,
  useRejectApplication,
  useSendForRevision,
  useDeleteApplication,
} from './use-admin-applications';

// Trial Request Hooks
export {
  useCreateTrialRequest,
  useTrialRequest,
  useCancelTrialRequest,
  useExtendTrialRequest,
  useAvailableTrialRequests,
  useMyAcceptedTrialRequests,
  useAcceptTrialRequest,
  useMyRequests,
  TRIAL_REQUEST_STATUS,
  SCHOOL_TYPE,
  GRADE_LEVEL,
} from './use-trial-requests';

// Interview Slot Hooks
export {
  useInterviewSlots,
  useInterviewSlot,
  useCreateInterviewSlot,
  useUpdateInterviewSlot,
  useDeleteInterviewSlot,
  useCompleteInterviewSlot,
  useCancelInterviewSlot,
  useBookInterviewSlot,
  useRescheduleInterviewSlot,
  INTERVIEW_SLOT_STATUS,
} from './use-interview-slots';

// Types
export type { Subject } from './use-subjects';
export type { Session, SessionFilters, UnifiedSession, UnifiedSessionFilters } from './use-sessions';
export type { Student, StudentFilters } from './use-students';
export type { Tutor, TutorFilters, TutorsResponse } from './use-tutors';
export type { Bookmark } from './use-bookmarks';
export type { Chat, Message } from './use-chats';
export type { Notification } from './use-notifications';
export type { SubmitApplicationData, ApplicationResponse, TutorApplication, ApplicationStatus } from './use-applications';
export type { AdminApplication, AdminApplicationStatus, ApplicationFilters, AdminApplicationsResponse } from './use-admin-applications';
export type { TrialRequest, CreateTrialRequestData, StudentInfo, GuardianInfo } from './use-trial-requests';
export type { InterviewSlot, InterviewSlotFilters } from './use-interview-slots';