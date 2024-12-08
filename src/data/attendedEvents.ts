import { Event } from '../types/events';

export const ATTENDED_EVENTS: Event[] = [
  {
    id: 'attended-1',
    title: 'AI Ethics Workshop',
    date: '2024-10-15',
    time: '2:00 PM',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200&h=400',
    location: 'Davis Hall 203',
    attendingCount: 45,
    description: 'Workshop on ethical considerations in AI development',
    priority: 'high',
    category: 'academic',
    memoryTip: 'Remember the three key principles discussed',
    keyTakeaways: [
      'Ethical framework overview',
      'Case studies analysis',
      'Best practices implementation'
    ],
    relatedEvents: [
      { title: 'Tech Ethics Panel', type: 'academic' },
      { title: 'AI Symposium', type: 'academic' }
    ],
    tags: ['AI', 'Ethics', 'Technology'],
    feedback: {
      rating: 4,
      comment: 'Very informative session, would recommend!',
      timestamp: '2024-10-15T14:00:00Z'
    }
  },
  {
    id: 'attended-2',
    title: 'Gator Hackathon',
    date: '2024-10-20',
    time: '9:00 AM',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200&h=400',
    location: 'Computer Science Building',
    attendingCount: 200,
    description: '24-hour coding competition',
    priority: 'high',
    category: 'academic',
    memoryTip: 'Great team collaboration experience',
    keyTakeaways: [
      'Project management',
      'Rapid prototyping',
      'Team collaboration'
    ],
    relatedEvents: [
      { title: 'Code Workshop', type: 'academic' },
      { title: 'Tech Meetup', type: 'social' }
    ],
    tags: ['Hackathon', 'Coding', 'TeamWork'],
    feedback: {
      rating: 5,
      comment: 'Amazing experience! Learned a lot and met great people.',
      timestamp: '2024-10-20T09:00:00Z'
    }
  }
];