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
  useCancelSession,
  useRescheduleSession,
  useApproveReschedule,
  useRejectReschedule,
  useProposeSession,
  useAcceptSessionProposal,
  useRejectSessionProposal,
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

// Application Hooks
export { useSubmitApplication, useMyApplication } from './use-applications';

// Types
export type { Subject } from './use-subjects';
export type { Session } from './use-sessions';
export type { Student, StudentFilters } from './use-students';
export type { Tutor, TutorFilters } from './use-tutors';
export type { Bookmark } from './use-bookmarks';
export type { Chat, Message } from './use-chats';
export type { Notification } from './use-notifications';
export type { SubmitApplicationData, ApplicationResponse, TutorApplication, ApplicationStatus } from './use-applications';