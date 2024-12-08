import React from 'react';
import { Student } from '../../types/student';
import { Save, X } from 'lucide-react';

interface ProfileFormProps {
  student: Student;
  onSave: (data: Partial<Student>) => void;
  onCancel: () => void;
}

export function ProfileForm({ student, onSave, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = React.useState({
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    major: student.major,
    department: student.department,
    enrollmentStatus: student.enrollmentStatus,
    phone: student.phone || '',
    dietaryRestrictions: student.dietaryRestrictions || '',
    accommodations: student.accommodations || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-dark-600 
              bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-dark-600 
              bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-dark-600 
              bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Major
          </label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-dark-600 
              bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-dark-600 
              bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Dietary Restrictions
          </label>
          <textarea
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-dark-600 
              bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Accommodation Requests
          </label>
          <textarea
            name="accommodations"
            value={formData.accommodations}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-dark-600 
              bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-dark-600 
              bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enrollment Status
          </label>
          <select
            name="enrollmentStatus"
            value={formData.enrollmentStatus}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-dark-600 
              bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 
            dark:hover:bg-dark-700 flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 
            flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </form>
  );
}