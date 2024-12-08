export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  studentId: string;
  dietaryRestrictions?: string;
  accommodations?: string;
  agreeToTerms: boolean;
}

export interface EventRegistration extends RegistrationFormData {
  id: string;
  eventId: string;
  registrationDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export type RegistrationStatus = {
  success: boolean;
  message: string;
  registrationId?: string;
};