import AuthManagement from 'feathers-authentication-management/lib/client';

import feathersClient from './feathersClient-rest';
import feathersSocketClient from './feathersClient-websocket';

export const authManagement = new AuthManagement(feathersClient);

export const AnswerService = feathersClient.service('answers');
export const AppNotificationService = feathersClient.service('app-notification');
export const AudioClipService = feathersClient.service('audio-clips');
export const AuthManagementService = feathersClient.service('authManagement');
export const BookingOptionService = feathersClient.service('booking-options');
export const CertificationQuizService = feathersClient.service('certification-quizzes');
export const CertificationService = feathersClient.service('certifications');
export const ChatRoomService = feathersClient.service('chatrooms');
export const ClassAvatarCollectionsService = feathersClient.service('class-avatar-collections');
export const ClassVocabPacksService = feathersClient.service('class-vocab-packs');
export const FeatureFlagService = feathersClient.service('feature-flags');
export const FlashcardGeneratorService = feathersClient.service('flashcard-generator');
export const FlashcardService = feathersClient.service('flashcard');
export const InstructorTierService = feathersClient.service('instructor-tiers');
export const LessonService = feathersClient.service('lessons');
export const MediaRecordingService = feathersClient.service('media-recordings');
export const NoticeService = feathersClient.service('notices');
export const PresentationService = feathersClient.service('presentation');
export const QACriteriaScoreService = feathersClient.service('qa-criteria-score');
export const QACriteriaService = feathersClient.service('qa-criteria');
export const QuestionService = feathersClient.service('questions');
export const QuizResultService = feathersClient.service('quizzes-result');
export const QuizReviewService = feathersClient.service('quiz-reviews');
export const QuizService = feathersClient.service('quizzes');
export const ReviewService = feathersClient.service('reviews');
export const SchoolClassService = feathersClient.service('school-classes');
export const SessionAssessmentResultService = feathersClient.service('session-assessments-results');
export const SessionAssessmentService = feathersClient.service('session-assessments');
export const SessionFlashcardResponseService = feathersClient.service('session-flashcard-response');
export const SlideAssetService = feathersClient.service('slide-asset');
export const SlideService = feathersClient.service('slides');
export const TrackProgressService = feathersClient.service('track-progresses');
export const UploadService = feathersClient.service('upload');
export const UserActiveEventsService = feathersClient.service('user-active-events');
export const UserAvatarService = feathersClient.service('user-avatars');
export const UserCertificationService = feathersClient.service('user-certifications');
export const UserFlashcardService = feathersClient.service('user-flashcard');
export const UserPointNotificationService = feathersClient.service('user-point-notification');
export const UserService = feathersClient.service('users');
export const UserSubjectSettingsService = feathersClient.service('user-subject-settings');
export const UserSummaryService = feathersClient.service('user-summary');
export const UserUploadService = feathersClient.service('user-uploads');
export const UserWeeklyPointsService = feathersClient.service('user-weekly-points');
export const VocabService = feathersClient.service('vocabs');
export const WritingAssignmentService = feathersClient.service('writing-assignments');
export const WritingPadService = feathersClient.service('writing-pads');
export const WritingSubmissionService = feathersClient.service('writing-submissions');

export const VocabServiceSocket = feathersSocketClient.service('vocabs');
export const MessageServiceSocket = feathersSocketClient.service('messages');
export const AnswerServiceSocket = feathersSocketClient.service('answers');
export const LessonServiceSocket = feathersSocketClient.service('lessons');
export const NotificationServiceSocket = feathersSocketClient.service('notifications');
export const AppNotificationServiceSocket = feathersSocketClient.service('app-notification');
export const UserPointNotificationServiceSocket = feathersSocketClient.service('user-point-notification');
export const AccountSuspensionServiceSocket = feathersSocketClient.service('account-suspension');


export default feathersClient;
