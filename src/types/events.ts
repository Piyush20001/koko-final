export type EventCategory = 'academic' | 'social' | 'sports' | 'cultural' | 'career';
export type EventPriority = 'low' | 'medium' | 'high';
export type EventFeedback = {
  rating: number;
  comment?: string;
  timestamp: string;
};

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  image: string;
  location: string;
  attendingCount: number;
  description: string;
  priority: EventPriority;
  category: EventCategory;
  memoryTip: string;
  academicInfo?: {
    courseConnections: Array<{
      code: string;
      name: string;
      relevance: string;
    }>;
    learningOutcomes: string[];
    prerequisites?: string[];
    studyNotes?: string;
    nextReviewDate?: string;
  };
  spotsLeft: number;
  walkingDistance?: number;
  timeConflict?: boolean;
  keyTakeaways: string[];
  relatedEvents: Array<{ title: string; type: string }>;
  tags: string[];
  feedback?: EventFeedback;
}