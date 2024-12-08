import { Student } from '../types/student';

export const MOCK_STUDENT: Student = {
  id: '1',
  studentId: '12345678',
  firstName: 'Test',
  lastName: 'Name',
  email: 'test.test@ufl.edu',
  department: 'College of Engineering',
  major: 'Computer Science',
  semester: 2,
  year: 2024,
  phone: '(352) 123-4567',
  dietaryRestrictions: 'Vegetarian',
  accommodations: 'Prefer front row seating',
  enrollmentStatus: 'Full-time',
  profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200&h=200',
  academicInfo: {
    gpa: 3.8,
    creditsCompleted: 60,
    academicStanding: 'Good Standing',
    currentCourses: [
      {
        code: 'COP3530',
        name: 'Data Structures and Algorithms',
        credits: 3,
        grade: 'A'
      },
      {
        code: 'CEN3031',
        name: 'Introduction to Software Engineering',
        credits: 3,
        grade: 'A-'
      },
      {
        code: 'CDA3101',
        name: 'Computer Organization',
        credits: 3,
        grade: 'B+'
      },
      {
        code: 'MAS3114',
        name: 'Computational Linear Algebra',
        credits: 3
      }
    ]
  }
};