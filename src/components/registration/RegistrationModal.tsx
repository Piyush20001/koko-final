import React, { useState, useEffect } from 'react';
import { X, Loader2, UserCircle } from 'lucide-react';
import { Event } from '../../types/events';
import { RegistrationFormData } from '../../types/registration';
import { MOCK_STUDENT } from '../../data/mockStudent';

interface RegistrationModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RegistrationFormData) => Promise<void>;
}

export function RegistrationModal({ event, isOpen, onClose, onSubmit }: RegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialFormData: RegistrationFormData = {
    firstName: MOCK_STUDENT.firstName,
    lastName: MOCK_STUDENT.lastName,
    email: MOCK_STUDENT.email,
    studentId: MOCK_STUDENT.studentId,
    phone: '',
    dietaryRestrictions: '',
    accommodations: '',
    agreeToTerms: false
  };
  
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
    }
  }, [isOpen]);

  const fillFromProfile = () => {
    setFormData({
      firstName: MOCK_STUDENT.firstName,
      lastName: MOCK_STUDENT.lastName,
      email: MOCK_STUDENT.email,
      studentId: MOCK_STUDENT.studentId,
      phone: MOCK_STUDENT.phone,
      dietaryRestrictions: MOCK_STUDENT.dietaryRestrictions,
      accommodations: MOCK_STUDENT.accommodations,
      agreeToTerms: formData.agreeToTerms
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative w-full max-w-2xl bg-white dark:bg-dark-800 rounded-xl shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Register for {event.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <button
                  type="button"
                  onClick={fillFromProfile}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 
                    bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300
                    rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors"
                >
                  <UserCircle className="w-5 h-5" />
                  Auto-fill from Profile
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                    bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
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
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                    bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
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
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                    bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                    bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                    bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                />
              </div>
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
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
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
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                  bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                I agree to the event terms and conditions, including the attendance policy
                and photo/video release.
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 
                  dark:hover:bg-dark-700 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.agreeToTerms}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                  disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}