import React from 'react';
import { Student } from '../../types/student';
import { Trophy, BookOpen, Award } from 'lucide-react';

interface AcademicInfoProps {
  student: Student;
}

export function AcademicInfo({ student }: AcademicInfoProps) {
  const { academicInfo } = student;

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Academic Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">GPA</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {academicInfo.gpa.toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Credits Completed</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {academicInfo.creditsCompleted}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Academic Standing</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {academicInfo.academicStanding}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Current Courses
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-700">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Code</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Course</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Credits</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Grade</th>
              </tr>
            </thead>
            <tbody>
              {academicInfo.currentCourses.map((course, index) => (
                <tr
                  key={course.code}
                  className={`border-b border-gray-100 dark:border-dark-700 
                    ${index % 2 === 0 ? 'bg-gray-50 dark:bg-dark-700/50' : ''}`}
                >
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{course.code}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{course.name}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{course.credits}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                    {course.grade || 'In Progress'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}