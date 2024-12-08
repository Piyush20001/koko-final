import React from 'react';
import { Student } from '../../types/student';
import { Camera, Mail, GraduationCap, Calendar } from 'lucide-react';

interface ProfileHeaderProps {
  student: Student;
  onImageUpdate: (file: File) => void;
  isEditing: boolean;
}

export function ProfileHeader({ student, onImageUpdate, isEditing }: ProfileHeaderProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpdate(file);
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-purple-400 text-white p-8 rounded-lg shadow-lg mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative group">
          <img
            src={student.profileImage}
            alt={`${student.firstName} ${student.lastName}`}
            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
          />
          {isEditing && (
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">
            {student.firstName} {student.lastName}
          </h1>
          <div className="flex flex-col md:flex-row gap-4 text-purple-100">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {student.email}
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              {student.major}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {`Semester ${student.semester}, ${student.year}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}