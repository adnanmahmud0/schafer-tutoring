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
  useRefreshToken,
} from './use-auth';

// Subject Hooks (Public + Admin)
export {
  useSubjects,
  useActiveSubjects,
  useSubject,
  useAdminSubjects,
  useCreateSubject,
  useUpdateSubject,
  useDeleteSubject,
} from './use-subjects';

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
  useTrialSession,
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
  useAvailableInterviewSlots,
  useBookInterviewSlot,
  useRescheduleInterviewSlot,
  useMyBookedInterview,
  useCancelMyInterview,
  useScheduledMeetings,
  useGetInterviewMeetingToken,
  INTERVIEW_SLOT_STATUS,
} from './use-interview-slots';

// Stripe Connect Hooks
export {
  useCreateStripeAccount,
  useGetOnboardingLink,
  useStripeOnboardingStatus,
  useStripeConnect,
} from './use-stripe';

// Subscription & Payment Method Hooks
export {
  useMySubscription,
  usePlanUsage,
  usePaymentHistory,
  useCancelSubscription,
  usePaymentMethods,
  useCreateSetupIntent,
  useAttachPaymentMethod,
  useSetDefaultPaymentMethod,
  useDeletePaymentMethod,
  PLAN_DISPLAY_NAMES,
  PLAN_DETAILS,
  CARD_BRAND_ICONS,
} from './use-subscription';

// Session Request Hooks
export {
  useCreateSessionRequest,
  useCancelSessionRequest,
  useExtendSessionRequest,
  useMySessionRequests,
  useMatchingSessionRequests,
  useAcceptSessionRequest,
  useSessionRequest,
  useAllSessionRequests,
  SESSION_REQUEST_STATUS,
} from './use-session-requests';

// Admin Stats Hooks
export {
  useOverviewStats,
  useRevenueByMonth,
  useUserDistribution,
  useRecentActivity,
  useDashboardStats,
  useMonthlyRevenue,
  usePopularSubjects,
  useTopTutors,
  useTopStudents,
  useUserGrowth,
} from './use-admin-stats';

// Review Hooks
export {
  useCreateReview,
  useMyReviews,
  useUpdateReview,
  useDeleteReview,
  useTutorReviews,
  useTutorReviewStats,
  useReview,
  useToggleReviewVisibility,
} from './use-reviews';

// Types
export type { Subject, SubjectFilters, SubjectsResponse } from './use-subjects';
export type { Session, SessionFilters, UnifiedSession, UnifiedSessionFilters } from './use-sessions';
export type { Student, StudentFilters } from './use-students';
export type { Tutor, TutorFilters, TutorsResponse } from './use-tutors';
export type { Bookmark } from './use-bookmarks';
export type { Chat, Message } from './use-chats';
export type { Notification } from './use-notifications';
export type { SubmitApplicationData, ApplicationResponse, TutorApplication, ApplicationStatus } from './use-applications';
export type { AdminApplication, AdminApplicationStatus, ApplicationFilters, AdminApplicationsResponse } from './use-admin-applications';
export type { TrialRequest, AcceptedTutor, CreateTrialRequestData, StudentInfo, GuardianInfo } from './use-trial-requests';
export type { InterviewSlot, InterviewSlotFilters, ScheduledMeeting, ScheduledMeetingsFilters, MeetingTokenResponse } from './use-interview-slots';
export type { StripeAccount, OnboardingStatus, CreateAccountResponse } from './use-stripe';
export type {
  Subscription,
  SubscriptionTier,
  SubscriptionStatus,
  PlanUsage,
  PaymentHistoryItem,
  PaymentHistoryResponse,
  PaymentMethod,
  SetupIntentResponse,
} from './use-subscription';
export type { SessionRequest, CreateSessionRequestData } from './use-session-requests';
export type {
  OverviewStats,
  Statistic,
  GrowthType,
  RevenueByMonth,
  UserDistribution,
  RoleDistribution,
  StatusDistribution,
  ActivityLogItem,
  ActivityLogResponse,
  ActionType,
  ActivityStatus,
} from './use-admin-stats';
export type {
  SessionReview,
  CreateReviewData,
  UpdateReviewData,
  ReviewStats,
  ReviewsResponse,
} from './use-reviews';