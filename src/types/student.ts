export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  major: string;
  semester: number;
  year: number;
  phone: string;
  dietaryRestrictions: string;
  accommodations: string;
  enrollmentStatus: 'Full-time' | 'Part-time';
  profileImage: string;
  academicInfo: {
    gpa: number;
    creditsCompleted: number;
    academicStanding: 'Good Standing' | 'Warning' | 'Probation';
    currentCourses: Array<{
      code: string;
      name: string;
      credits: number;
      grade?: string;
    }>;
  };
}

export interface ProfileUpdateData extends Partial<Student> {
  id: string;
}