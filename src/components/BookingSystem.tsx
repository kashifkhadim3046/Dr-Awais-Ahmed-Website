import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Download, 
  MessageCircle, 
  CalendarPlus,
  RefreshCw
} from 'lucide-react';
import { DoctorConfig } from '../config/doctorConfig';
import { AppointmentRecord } from '../types/appointment';
import { saveAppointment, getBookedSlotsForDate, downloadCalendarEvent } from '../utils/appointmentStorage';

interface BookingSystemProps {
  config: DoctorConfig;
  preselectedService?: string;
  onAppointmentCreated?: (record: AppointmentRecord) => void;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  config,
  preselectedService,
  onAppointmentCreated,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedRecord, setSubmittedRecord] = useState<AppointmentRecord | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    // Step 1: Patient Information
    fullName: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Prefer not to say',
    city: 'Lahore',
    preferredContact: 'Phone Call' as 'Phone Call' | 'WhatsApp' | 'Email',

    // Step 2: Appointment Type
    appointmentType: preselectedService || 'New Patient Consultation',

    // Step 3: Date & Time
    preferredDate: '',
    preferredTime: '',
    reasonForVisit: '',

    // Step 4: Additional Information
    symptomsDescription: '',
    previousDiagnosis: '',
    hasPreviousReports: 'No' as 'Yes' | 'No' | 'Not Sure',
    additionalNotes: '',
    relevantDocsNote: '',
  });

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dynamic Booked Slots for the selected date
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // Update appointment type if preselected from Services section
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, appointmentType: preselectedService }));
    }
  }, [preselectedService]);

  // Set default minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    if (!formData.preferredDate) {
      setFormData((prev) => ({ ...prev, preferredDate: defaultDateStr }));
    }
  }, [defaultDateStr]);

  // Check booked slots when date changes
  useEffect(() => {
    if (formData.preferredDate) {
      const booked = getBookedSlotsForDate(formData.preferredDate);
      setBookedSlots(booked);
      // If currently selected time was booked, reset it
      if (formData.preferredTime && booked.includes(formData.preferredTime)) {
        setFormData((prev) => ({ ...prev, preferredTime: '' }));
      }
    }
  }, [formData.preferredDate]);

  // Appointment Type Options (Configurable)
  const appointmentTypeOptions = [
    'New Patient Consultation',
    'Follow-Up Consultation',
    'Electroencephalography (Routine EEG)',
    'Video Electroencephalography (Video EEG)',
    'Electromyography (EMG)',
    'Nerve Conduction Studies (NCS)',
    'Evoked Potential Studies (VEP / BAEP / SSEP)',
    'Comprehensive Neuromuscular Evaluation',
    'Other Specialized Diagnostic Inquiry'
  ];

  // Inline Validation for each step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Please enter your full name.';
      } else if (formData.fullName.trim().length < 3) {
        newErrors.fullName = 'Full name must be at least 3 characters.';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Please enter a valid phone number.';
      } else if (!/^[0-9+() -]{7,18}$/.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number (e.g. 0300-1234567).';
      }

      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (step === 2) {
      if (!formData.appointmentType) {
        newErrors.appointmentType = 'Please select an appointment type.';
      }
    }

    if (step === 3) {
      if (!formData.preferredDate) {
        newErrors.preferredDate = 'Please select an appointment date.';
      }
      if (!formData.preferredTime) {
        newErrors.preferredTime = 'Please select an available appointment time.';
      }
      if (!formData.reasonForVisit.trim()) {
        newErrors.reasonForVisit = 'Please provide a brief reason for your visit.';
      } else if (formData.reasonForVisit.trim().length < 5) {
        newErrors.reasonForVisit = 'Please describe the reason for your visit in more detail.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrevStep = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmSubmission = () => {
    // Validate final fields
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      alert('Please fill out all required fields before confirming.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const record = saveAppointment({
        patientName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        city: formData.city,
        preferredContact: formData.preferredContact,
        appointmentType: formData.appointmentType,
        date: formData.preferredDate,
        time: formData.preferredTime,
        reason: formData.reasonForVisit,
        symptomsDescription: formData.symptomsDescription,
        previousDiagnosis: formData.previousDiagnosis,
        hasPreviousReports: formData.hasPreviousReports,
        additionalNotes: formData.additionalNotes + (formData.relevantDocsNote ? ` [Doc: ${formData.relevantDocsNote}]` : ''),
      });

      setIsSubmitting(false);
      setSubmittedRecord(record);
      if (onAppointmentCreated) {
        onAppointmentCreated(record);
      }
    }, 600);
  };

  const handleResetForm = () => {
    setSubmittedRecord(null);
    setCurrentStep(1);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      age: '',
      gender: 'Prefer not to say',
      city: 'Lahore',
      preferredContact: 'Phone Call',
      appointmentType: 'New Patient Consultation',
      preferredDate: defaultDateStr,
      preferredTime: '',
      reasonForVisit: '',
      symptomsDescription: '',
      previousDiagnosis: '',
      hasPreviousReports: 'No',
      additionalNotes: '',
      relevantDocsNote: '',
    });
    setErrors({});
  };

  // WhatsApp quick notification
  const handleSendWhatsAppNotification = () => {
    if (!submittedRecord) return;
    const msg = encodeURIComponent(
      `Hello Dr. Awais Ahmad Clinic,\nI have submitted an appointment request online.\n\n*Request ID:* ${submittedRecord.id}\n*Patient:* ${submittedRecord.patientName}\n*Type:* ${submittedRecord.appointmentType}\n*Preferred Date:* ${submittedRecord.date}\n*Time:* ${submittedRecord.time}\n\nPlease confirm availability. Thank you.`
    );
    window.open(`https://wa.me/${config.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <section id="appointments" className="py-20 md:py-28 bg-[#FAFAFC] text-slate-900 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-3">
            Online Scheduling
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Book an Appointment
          </h2>
          <p className="mt-2.5 text-base text-slate-600">
            Choose your preferred date and time and submit your appointment request.
          </p>
        </div>

        {/* Confirmation Screen after submission */}
        {submittedRecord ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl text-center max-w-2xl mx-auto animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900">
              Appointment Request Received
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              Thank you. Your appointment request has been submitted successfully. Our clinic will contact you to confirm the appointment.
            </p>

            {/* Unique Appointment Request ID */}
            <div className="my-6 p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 inline-block">
              <span className="text-xs font-medium text-teal-800 uppercase tracking-wider block">
                Appointment Request ID
              </span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-teal-950 mt-0.5 block tracking-tight">
                #{submittedRecord.id}
              </span>
            </div>

            {/* Summary Details */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70 text-left text-xs sm:text-sm space-y-2 mb-8">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-900">{submittedRecord.patientName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Appointment Type:</span>
                <span className="font-semibold text-slate-900">{submittedRecord.appointmentType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-bold text-teal-700">{submittedRecord.date} at {submittedRecord.time}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Contact Method:</span>
                <span className="text-slate-900">{submittedRecord.phone} ({submittedRecord.preferredContact})</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Location:</span>
                <span className="text-slate-900 text-right">{config.currentHospital}, Lahore</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => downloadCalendarEvent(submittedRecord)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4 text-teal-600" />
                Add to Calendar (.ics)
              </button>

              <button
                onClick={handleSendWhatsAppNotification}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Notify Clinic via WhatsApp
              </button>

              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-medium text-xs text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Book Another
              </button>
            </div>

          </div>
        ) : (
          /* Multi-Step Booking Form Container */
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
            
            {/* Step Progress Tracker */}
            <div className="bg-slate-900 text-white px-6 py-4.5 border-b border-slate-800">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                {[
                  { step: 1, label: 'Patient Info' },
                  { step: 2, label: 'Service' },
                  { step: 3, label: 'Date & Time' },
                  { step: 4, label: 'Medical Notes' },
                  { step: 5, label: 'Review' },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (item.step < currentStep) setCurrentStep(item.step);
                      }}
                      disabled={item.step > currentStep}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        currentStep === item.step
                          ? 'bg-teal-400 text-slate-950 ring-4 ring-teal-500/20'
                          : currentStep > item.step
                          ? 'bg-teal-700 text-teal-100 cursor-pointer'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {currentStep > item.step ? '✓' : item.step}
                    </button>
                    <span className="hidden sm:inline text-xs font-medium text-slate-300">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Step Body */}
            <div className="p-6 sm:p-10">
              
              {/* STEP 1: Patient Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900">
                      Step 1 — Patient Information
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Please enter the details of the individual receiving the neurophysiological assessment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value });
                            if (errors.fullName) setErrors({ ...errors, fullName: '' });
                          }}
                          placeholder="e.g. Mohammad Tariq"
                          className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition-colors ${
                            errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-teal-500'
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: '' });
                          }}
                          placeholder="e.g. 0300-1234567"
                          className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition-colors ${
                            errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-teal-500'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                          placeholder="patient@example.com"
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500 transition-colors"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Age
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="e.g. 42"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500 transition-colors"
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Gender
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500 bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        City
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Lahore, Gujranwala, Faisalabad"
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Phone Call', 'WhatsApp', 'Email'] as const).map((method) => (
                          <button
                            type="button"
                            key={method}
                            onClick={() => setFormData({ ...formData, preferredContact: method })}
                            className={`py-2 px-2 text-xs rounded-xl font-medium border text-center transition-all cursor-pointer ${
                              formData.preferredContact === method
                                ? 'bg-teal-50 border-teal-500 text-teal-800 font-semibold'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Appointment Type */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900">
                      Step 2 — Appointment Type
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select the specific diagnostic test or consultation you require.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {appointmentTypeOptions.map((opt) => (
                      <div
                        key={opt}
                        onClick={() => setFormData({ ...formData, appointmentType: opt })}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          formData.appointmentType === opt
                            ? 'bg-teal-50/70 border-teal-500 text-teal-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200/80 text-slate-700 hover:border-teal-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              formData.appointmentType === opt
                                ? 'border-teal-600 bg-teal-600'
                                : 'border-slate-300'
                            }`}
                          >
                            {formData.appointmentType === opt && (
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </div>
                          <span className="text-xs sm:text-sm">{opt}</span>
                        </div>

                        {formData.appointmentType === opt && (
                          <span className="text-[11px] font-mono font-medium text-teal-700">Selected</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {errors.appointmentType && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.appointmentType}
                    </p>
                  )}
                </div>
              )}

              {/* STEP 3: Date & Time + Reason */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900">
                      Step 3 — Preferred Date & Time
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Choose an available consultation slot and state the primary reason for your visit.
                    </p>
                  </div>

                  {/* Date Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <CalendarIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        min={defaultDateStr}
                        value={formData.preferredDate}
                        onChange={(e) => {
                          setFormData({ ...formData, preferredDate: e.target.value, preferredTime: '' });
                          if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                        }}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500 bg-white"
                      />
                    </div>
                    {errors.preferredDate && (
                      <p className="mt-1 text-xs text-red-500">{errors.preferredDate}</p>
                    )}
                  </div>

                  {/* Time Slots Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Available Time Slots <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Slot duration: ~30 mins
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {config.availableSlots.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        const isSelected = formData.preferredTime === slot;

                        return (
                          <button
                            type="button"
                            key={slot}
                            disabled={isBooked}
                            onClick={() => {
                              setFormData({ ...formData, preferredTime: slot });
                              if (errors.preferredTime) setErrors({ ...errors, preferredTime: '' });
                            }}
                            className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                              isBooked
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                                : isSelected
                                ? 'bg-teal-500 text-slate-950 border-teal-500 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-slate-50 cursor-pointer'
                            }`}
                          >
                            <Clock className="w-3 h-3" />
                            <span>{slot}</span>
                          </button>
                        );
                      })}
                    </div>

                    {errors.preferredTime && (
                      <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.preferredTime}
                      </p>
                    )}
                  </div>

                  {/* Reason for Visit (Large Textarea) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Reason for Visit <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.reasonForVisit}
                      onChange={(e) => {
                        setFormData({ ...formData, reasonForVisit: e.target.value });
                        if (errors.reasonForVisit) setErrors({ ...errors, reasonForVisit: '' });
                      }}
                      placeholder="Please describe the primary reason for this appointment (e.g. experiencing numbness in hands, referral for EEG after fainting spell, etc.)."
                      className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition-colors ${
                        errors.reasonForVisit ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-teal-500'
                      }`}
                    />
                    {errors.reasonForVisit && (
                      <p className="mt-1 text-xs text-red-500">{errors.reasonForVisit}</p>
                    )}
                  </div>

                </div>
              )}

              {/* STEP 4: Additional Information */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900">
                      Step 4 — Additional Clinical Information
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      These details help Dr. Awais Ahmad calibrate testing protocols prior to your arrival.
                    </p>
                  </div>

                  {/* Brief description of symptoms */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Brief Description of Symptoms & Duration
                    </label>
                    <textarea
                      rows={2}
                      value={formData.symptomsDescription}
                      onChange={(e) => setFormData({ ...formData, symptomsDescription: e.target.value })}
                      placeholder="e.g. Symptoms started 3 months ago; worse at night; accompanied by tingling..."
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  {/* Previous neurological diagnosis */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Previous Neurological Diagnosis (if any)
                    </label>
                    <input
                      type="text"
                      value={formData.previousDiagnosis}
                      onChange={(e) => setFormData({ ...formData, previousDiagnosis: e.target.value })}
                      placeholder="e.g. Radiculopathy, Migraine, Suspected Epilepsy, None"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  {/* Previous test/report available? */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Previous Test / Report Available?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Yes', 'No', 'Not Sure'] as const).map((val) => (
                        <button
                          type="button"
                          key={val}
                          onClick={() => setFormData({ ...formData, hasPreviousReports: val })}
                          className={`py-2 px-3 text-xs rounded-xl font-medium border text-center transition-all cursor-pointer ${
                            formData.hasPreviousReports === val
                              ? 'bg-teal-50 border-teal-500 text-teal-800 font-semibold'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Document upload / reference note */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Relevant Document References / File Name
                    </label>
                    <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 mb-2">
                      <span className="font-semibold">Privacy Notice: </span>
                      Please upload or state only documents directly relevant to your neurophysiological evaluation. Bring physical films/discs on the consultation day.
                    </div>
                    <input
                      type="text"
                      value={formData.relevantDocsNote}
                      onChange={(e) => setFormData({ ...formData, relevantDocsNote: e.target.value })}
                      placeholder="e.g. Brain MRI (2026), Mayo Hospital Prescription #3412"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  {/* Additional notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Additional Notes for Clinic Staff
                    </label>
                    <input
                      type="text"
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                      placeholder="e.g. Patient requires wheelchair assistance; pacemaker present"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Confirmation Summary */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900">
                      Step 5 — Review & Confirm Appointment Request
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Please verify your information before submitting the request to our clinic.
                    </p>
                  </div>

                  {/* Booking Summary Box */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div>
                        <span className="text-slate-400 block text-xs">Patient Name</span>
                        <span className="font-bold text-slate-900 mt-0.5 block">{formData.fullName}</span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-xs">Contact Number</span>
                        <span className="font-bold text-slate-900 mt-0.5 block">{formData.phone} ({formData.preferredContact})</span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-xs">Appointment Type</span>
                        <span className="font-bold text-teal-800 mt-0.5 block">{formData.appointmentType}</span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-xs">Requested Schedule</span>
                        <span className="font-bold text-slate-900 mt-0.5 block">{formData.preferredDate} at {formData.preferredTime}</span>
                      </div>

                      <div className="sm:col-span-2">
                        <span className="text-slate-400 block text-xs">Reason for Visit</span>
                        <span className="text-slate-800 mt-0.5 block leading-relaxed">{formData.reasonForVisit}</span>
                      </div>

                      {formData.previousDiagnosis && (
                        <div>
                          <span className="text-slate-400 block text-xs">Previous Diagnosis</span>
                          <span className="text-slate-700 mt-0.5 block">{formData.previousDiagnosis}</span>
                        </div>
                      )}

                      {formData.city && (
                        <div>
                          <span className="text-slate-400 block text-xs">Patient Location</span>
                          <span className="text-slate-700 mt-0.5 block">{formData.city}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Your contact details are encrypted and treated with strict medical confidentiality.</span>
                  </div>

                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between max-w-2xl mx-auto">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-md flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Continue to Step 0{currentStep + 1}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleConfirmSubmission}
                    className="px-7 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-slate-950" />
                        <span>Confirm Appointment Request</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
