import { AppointmentRecord } from '../types/appointment';

const STORAGE_KEY = 'dr_awais_appointments_v1';

// Initial realistic baseline records
const DEFAULT_APPOINTMENTS: AppointmentRecord[] = [
  {
    id: 'DA-2026-0001',
    patientName: 'Mohammad Tariq',
    phone: '0321-4567890',
    email: 'm.tariq@example.com',
    age: '46',
    gender: 'Male',
    city: 'Lahore',
    preferredContact: 'Phone Call',
    appointmentType: 'Nerve Conduction Study',
    date: '2026-09-28',
    time: '10:00 AM',
    reason: 'Persistent tingling and numbness in both hands, suspected bilateral Carpal Tunnel Syndrome.',
    symptomsDescription: 'Weakness in thumb opposition and night waking numbness.',
    previousDiagnosis: 'Referred by orthopedic consultant for median nerve conduction study.',
    hasPreviousReports: 'Yes',
    status: 'Confirmed',
    createdAt: '2026-09-24T10:15:00Z',
    adminNotes: 'Confirmed by reception. Informed patient to avoid hand lotions.'
  },
  {
    id: 'DA-2026-0002',
    patientName: 'Amina Bibi',
    phone: '0300-8451234',
    email: 'amina.b@example.com',
    age: '28',
    gender: 'Female',
    city: 'Gujranwala',
    preferredContact: 'WhatsApp',
    appointmentType: 'Electroencephalography (Routine EEG)',
    date: '2026-09-29',
    time: '11:00 AM',
    reason: 'Evaluation following two episodes of brief unresponsiveness with eyelid flickering.',
    symptomsDescription: 'Absence-like episodes lasting 15-20 seconds during study sessions.',
    previousDiagnosis: 'Suspected paroxysmal event.',
    hasPreviousReports: 'No',
    status: 'Pending',
    createdAt: '2026-09-25T14:30:00Z',
  }
];

export function getStoredAppointments(): AppointmentRecord[] {
  if (typeof window === 'undefined') return DEFAULT_APPOINTMENTS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_APPOINTMENTS));
      return DEFAULT_APPOINTMENTS;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_APPOINTMENTS;
  }
}

export function saveAppointment(appointment: Omit<AppointmentRecord, 'id' | 'createdAt' | 'status'>): AppointmentRecord {
  const existing = getStoredAppointments();
  
  // Generate sequence ID
  const nextNum = existing.length + 1;
  const year = new Date().getFullYear();
  const id = `DA-${year}-${String(nextNum).padStart(4, '0')}`;

  const newRecord: AppointmentRecord = {
    ...appointment,
    id,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  const updated = [newRecord, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to store appointment', e);
  }

  return newRecord;
}

export function updateAppointmentStatus(id: string, status: AppointmentRecord['status'], adminNotes?: string): AppointmentRecord[] {
  const existing = getStoredAppointments();
  const updated = existing.map(item => {
    if (item.id === id) {
      return {
        ...item,
        status,
        adminNotes: adminNotes !== undefined ? adminNotes : item.adminNotes
      };
    }
    return item;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update appointment', e);
  }

  return updated;
}

export function getBookedSlotsForDate(dateStr: string): string[] {
  const appointments = getStoredAppointments();
  return appointments
    .filter(a => a.date === dateStr && a.status !== 'Cancelled')
    .map(a => a.time);
}

export function downloadCalendarEvent(record: AppointmentRecord) {
  const [timeStr, modifier] = record.time.split(' ');
  const [hoursStr, minutesStr] = timeStr.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  const startD = new Date(record.date);
  startD.setHours(hours, minutes, 0);

  const endD = new Date(startD);
  endD.setMinutes(endD.getMinutes() + 45);

  const formatIcsDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Dr. Awais Ahmad//Neuro Electrophysiology//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${record.id}@drawaisahmad.clinic
DTSTAMP:${formatIcsDate(new Date())}
DTSTART:${formatIcsDate(startD)}
DTEND:${formatIcsDate(endD)}
SUMMARY:Appointment with Dr. Awais Ahmad (${record.appointmentType})
DESCRIPTION:Appointment Request ID: ${record.id}\\nPatient: ${record.patientName}\\nType: ${record.appointmentType}\\nLocation: Mayo Hospital / King Edward Medical University, Lahore.
LOCATION:Department of Neurophysiology, Mayo Hospital, Lahore, Pakistan
STATUS:TENTATIVE
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `Appointment_${record.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
