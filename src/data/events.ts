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
export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Guest Lecture: AI Ethics',
    date: '2024-11-10',
    time: '2:00 PM',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200&h=400',
    location: 'Davis Hall 203',
    attendingCount: 45,
    description: 'Distinguished speaker discussing ethical implications of AI',
    priority: 'high',
    category: 'academic',
    memoryTip: 'Connect this to your CS Ethics coursework',
    keyTakeaways: [
      'Industry expert speaker',
      'Career networking opportunity',
      'Certification provided'
    ],
    relatedEvents: [
      { title: 'Tech Workshop', type: 'academic' },
      { title: 'Career Fair', type: 'career' }
    ],
    tags: ['Technology', 'Ethics', 'Computer Science']
  },
  {
    id: '2',
    title: 'Campus Club Fair',
    date: '2024-11-12',
    time: '11:00 AM',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200&h=400',
    location: 'Student Center',
    attendingCount: 200,
    description: 'Annual club fair featuring student organizations',
    priority: 'medium',
    category: 'social',
    memoryTip: 'Great for building your resume',
    keyTakeaways: [
      'Meet 50+ student clubs',
      'Free refreshments',
      'Sign-up bonuses'
    ],
    relatedEvents: [
      { title: 'Leadership Workshop', type: 'academic' },
      { title: 'Social Mixer', type: 'social' }
    ],
    tags: ['Social', 'Clubs', 'Networking']
  },
  {
    id: '3',
    title: 'Gator Basketball vs. Kentucky',
    date: '2024-11-15',
    time: '7:00 PM',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200&h=400',
    location: 'O\'Connell Center',
    attendingCount: 10000,
    description: 'SEC Basketball matchup against Kentucky Wildcats',
    priority: 'high',
    category: 'sports',
    memoryTip: 'Wear orange and blue for extra spirit points!',
    keyTakeaways: [
      'Major rivalry game',
      'Student section perks',
      'Post-game celebration'
    ],
    relatedEvents: [
      { title: 'Pre-game Rally', type: 'social' },
      { title: 'Alumni Meetup', type: 'social' }
    ],
    tags: ['Sports', 'Basketball', 'SEC']
  },
  {
    id: '4',
    title: 'Cultural Night: Diwali Celebration',
    date: '2024-11-18',
    time: '5:00 PM',
    image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=1200&h=400',
    location: 'Reitz Union Grand Ballroom',
    attendingCount: 300,
    description: 'Annual Diwali celebration featuring performances, food, and cultural activities',
    priority: 'medium',
    category: 'cultural',
    memoryTip: 'Experience diverse traditions and cuisines',
    keyTakeaways: [
      'Traditional performances',
      'Authentic Indian cuisine',
      'Cultural workshops'
    ],
    relatedEvents: [
      { title: 'Henna Workshop', type: 'cultural' },
      { title: 'Dance Workshop', type: 'cultural' }
    ],
    tags: ['Cultural', 'Food', 'Performance']
  },
  {
    id: '5',
    title: 'Tech Career Fair',
    date: '2024-11-15',
    time: '10:00 AM',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1200&h=400',
    location: 'Computer Science Building',
    attendingCount: 500,
    description: 'Meet top tech companies recruiting for internships and full-time positions',
    priority: 'high',
    category: 'career',
    memoryTip: 'Bring multiple copies of your resume',
    keyTakeaways: [
      'Network with recruiters',
      'On-site interviews',
      'Resume reviews'
    ],
    relatedEvents: [
      { title: 'Resume Workshop', type: 'career' },
      { title: 'Mock Interviews', type: 'career' }
    ],
    tags: ['Career', 'Technology', 'Networking']
  },
  {
    id: '6',
    title: 'Research Symposium',
    date: '2024-11-18',
    time: '1:00 PM',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=1200&h=400',
    location: 'Reitz Union Grand Ballroom',
    attendingCount: 150,
    description: 'Annual research symposium showcasing student and faculty projects',
    priority: 'high',
    category: 'academic',
    memoryTip: 'Great networking opportunity with faculty',
    keyTakeaways: [
      'Present your research',
      'Network with faculty',
      'Learn about ongoing projects'
    ],
    relatedEvents: [
      { title: 'Grant Writing Workshop', type: 'academic' },
      { title: 'Faculty Mixer', type: 'social' }
    ],
    tags: ['Research', 'Academic', 'Networking']
  },
  {
    id: '7',
    title: 'Spring Art Exhibition',
    date: '2024-11-20',
    time: '6:00 PM',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1200&h=400',
    location: 'University Gallery',
    attendingCount: 200,
    description: 'Student art exhibition featuring various mediums and styles',
    priority: 'medium',
    category: 'cultural',
    memoryTip: 'Support your fellow artists!',
    keyTakeaways: [
      'View student artwork',
      'Meet student artists',
      'Light refreshments served'
    ],
    relatedEvents: [
      { title: 'Artist Talk', type: 'cultural' },
      { title: 'Art Workshop', type: 'cultural' }
    ],
    tags: ['Art', 'Culture', 'Exhibition']
  },
  {
    id: '8',
    title: 'Wellness Wednesday',
    date: '2024-11-22',
    time: '9:00 AM',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200&h=400',
    location: 'Student Recreation Center',
    attendingCount: 100,
    description: 'A day dedicated to student wellness and mental health',
    priority: 'medium',
    category: 'social',
    memoryTip: 'Take care of yourself!',
    keyTakeaways: [
      'Yoga sessions',
      'Meditation workshops',
      'Stress management tips'
    ],
    relatedEvents: [
      { title: 'Fitness Class', type: 'sports' },
      { title: 'Nutrition Workshop', type: 'academic' }
    ],
    tags: ['Wellness', 'Health', 'Social']
  }
];