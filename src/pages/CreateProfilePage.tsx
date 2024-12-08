import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Student } from '../types/student';

export function CreateProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    major: '',
    department: '',
    studentId: '',
    phone: '',
    dietaryRestrictions: '',
    accommodations: '',
    semester: '1',
    year: new Date().getFullYear().toString(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save profile data
      const profileData: Partial<Student> = {
        ...formData,
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
      };
      
      localStorage.setItem('profileData', JSON.stringify(profileData));
      navigate('/home');
    } catch (error) {
      console.error('Failed to create profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Tell us a bit more about yourself to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Major
            </label>
            <input
              type="text"
              required
              value={formData.major}
              onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-600 
                bg-white dark:bg-dark-800 px-3 py-2 text-gray-900 dark:text-gray-100 
                focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Department
            </label>
            <input
              type="text"
              required
              value={formData.department}
              onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-600 
                bg-white dark:bg-dark-800 px-3 py-2 text-gray-900 dark:text-gray-100 
                focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Student ID
            </label>
            <input
              type="text"
              required
              value={formData.studentId}
              onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-600 
                bg-white dark:bg-dark-800 px-3 py-2 text-gray-900 dark:text-gray-100 
                focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-600 
                bg-white dark:bg-dark-800 px-3 py-2 text-gray-900 dark:text-gray-100 
                focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Dietary Restrictions
            </label>
            <textarea
              value={formData.dietaryRestrictions}
              onChange={(e) => setFormData(prev => ({ ...prev, dietaryRestrictions: e.target.value }))}
              placeholder="E.g., Vegetarian, Gluten-free, Allergies"
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-600 
                bg-white dark:bg-dark-800 px-3 py-2 text-gray-900 dark:text-gray-100 
                focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Accommodation Requests
            </label>
            <textarea
              value={formData.accommodations}
              onChange={(e) => setFormData(prev => ({ ...prev, accommodations: e.target.value }))}
              placeholder="E.g., Wheelchair accessibility, Sign language interpreter"
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-600 
                bg-white dark:bg-dark-800 px-3 py-2 text-gray-900 dark:text-gray-100 
                focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Semester
              </label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-600 
                  bg-white dark:bg-dark-800 px-3 py-2 text-gray-900 dark:text-gray-100 
                  focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    Semester {num}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Year
              </label>
              <select
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-600 
                  bg-white dark:bg-dark-800 px-3 py-2 text-gray-900 dark:text-gray-100 
                  focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              >
                {[2024, 2025, 2026, 2027].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md 
              shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Profile...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}