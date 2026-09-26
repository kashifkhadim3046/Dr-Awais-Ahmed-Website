export interface AppointmentRecord {
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  age?: string;
  gender?: string;
  city?: string;
  preferredContact: 'Phone Call' | 'WhatsApp' | 'Email';
  appointmentType: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "09:30 AM"
  reason: string;
  symptomsDescription?: string;
  previousDiagnosis?: string;
  hasPreviousReports: 'Yes' | 'No' | 'Not Sure';
  additionalNotes?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  createdAt: string;
  adminNotes?: string;
}

export interface DayAvailability {
  date: string;
  isAvailable: boolean;
  bookedSlots: string[];
}
