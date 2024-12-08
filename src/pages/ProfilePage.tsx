import React, { useState } from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { AcademicInfo } from '../components/profile/AcademicInfo';
import { ProfileForm } from '../components/profile/ProfileForm';
import { Student } from '../types/student';
import { MOCK_STUDENT } from '../data/mockStudent';
import { Edit2 } from 'lucide-react';

export function ProfilePage() {
  const [student, setStudent] = useState<Student>(MOCK_STUDENT);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleImageUpdate = async (file: File) => {
    // In a real app, upload the file to a server and get the URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setStudent(prev => ({
        ...prev,
        profileImage: e.target?.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (data: Partial<Student>) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStudent(prev => ({ ...prev, ...data }));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-white dark:bg-dark-800 
              shadow-sm hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300"
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>

        <ProfileHeader
          student={student}
          onImageUpdate={handleImageUpdate}
          isEditing={isEditing}
        />

        {isEditing ? (
          <ProfileForm
            student={student}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <AcademicInfo student={student} />
        )}
      </div>
    </div>
  );
}