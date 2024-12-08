import { useState } from 'react';
import { RegistrationFormData, RegistrationStatus } from '../types/registration';

export function useRegistration() {
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus | null>(null);

  const registerForEvent = async (eventId: string, data: RegistrationFormData): Promise<void> => {
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        // Simulate random success/failure for demo purposes
        if (Math.random() > 0.1) {
          setTimeout(resolve, 1500);
        } else {
          setTimeout(() => reject(new Error('Registration service unavailable')), 1500);
        }
      });
      
      // In a real app, this would be an API call to your backend
      const registration = {
        ...data,
        eventId,
        id: Math.random().toString(36).substr(2, 9),
        registrationDate: new Date().toISOString(),
        status: 'confirmed' as const
      };

      // Store in localStorage for demo purposes
      const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
      registrations.push(registration);
      localStorage.setItem('eventRegistrations', JSON.stringify(registrations));

      setRegistrationStatus({
        success: true,
        message: 'Registration successful! Check your email for confirmation.',
        registrationId: registration.id
      });
    } catch (error) {
      setRegistrationStatus({
        success: false,
        message: error instanceof Error 
          ? error.message 
          : 'Registration failed. Please try again.'
      });
      throw error;
    }
  };

  return {
    registerForEvent,
    registrationStatus,
    clearRegistrationStatus: () => setRegistrationStatus(null)
  };
}