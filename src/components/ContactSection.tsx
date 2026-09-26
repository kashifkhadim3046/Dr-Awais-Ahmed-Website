import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  Building2, 
  Navigation,
  Calendar
} from 'lucide-react';
import { DoctorConfig } from '../config/doctorConfig';

interface ContactSectionProps {
  config: DoctorConfig;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  config,
  onOpenBooking,
}) => {
  const [formSent, setFormSent] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    senderName: '',
    senderContact: '',
    senderMessage: '',
  });

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryData.senderName.trim() || !inquiryData.senderContact.trim()) {
      alert('Please enter your name and contact information.');
      return;
    }
    setFormSent(true);
    setTimeout(() => {
      setInquiryData({ senderName: '', senderContact: '', senderMessage: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAFAFC] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-3">
            Clinic Access & Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Reach out for test inquiries, scheduling questions, or hospital directions.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Fast Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Action Buttons Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <a
                href={`tel:${config.phone}`}
                className="py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hello Dr. Awais Ahmad, I would like to inquire about neurophysiology testing.')}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="col-span-2 sm:col-span-1 py-3 px-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-950" />
                <span>Book Visit</span>
              </button>
            </div>

            {/* Detailed Info Cards */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 text-xs sm:text-sm">
              
              {/* Phone */}
              <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Phone Inquiries
                  </span>
                  <a
                    href={`tel:${config.phone}`}
                    className="font-bold text-slate-900 hover:text-teal-700 transition-colors"
                  >
                    {config.phoneDisplay}
                  </a>
                  <span className="text-slate-400 block text-[11px]">Direct hospital / clinic line</span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    WhatsApp Support
                  </span>
                  <a
                    href={`https://wa.me/${config.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                  >
                    {config.whatsappDisplay}
                  </a>
                  <span className="text-slate-400 block text-[11px]">Fast reply during working hours</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Email Correspondence
                  </span>
                  <a
                    href={`mailto:${config.email}`}
                    className="font-bold text-slate-900 hover:text-teal-700 transition-colors break-all"
                  >
                    {config.email}
                  </a>
                  <span className="text-slate-400 block text-[11px]">Referrals & clinical documentation</span>
                </div>
              </div>

              {/* Clinic / Hospital */}
              <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Clinic / Hospital
                  </span>
                  <span className="font-bold text-slate-900 block">
                    {config.currentHospital}
                  </span>
                  <span className="text-slate-500 text-xs block">
                    {config.academicAffiliation}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Address
                  </span>
                  <span className="text-slate-700 block leading-relaxed">
                    {config.clinicAddress}
                  </span>
                </div>
              </div>

              {/* Consultation Hours */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Consultation Hours
                  </span>
                  <span className="font-bold text-slate-900 block">
                    {config.consultationHours}
                  </span>
                  <span className="text-slate-400 block text-[11px]">Sundays: Closed for routine outpatient</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Map Placeholder & Message Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Map Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Location & Directions
                  </span>
                </div>
                <span className="text-xs text-slate-400">Lahore, Punjab</span>
              </div>

              {/* Visual Map Representation */}
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center text-center p-6 group">
                {/* Simulated Street Grid */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#0d9488_1px,transparent_1px),linear-gradient(to_bottom,#0d9488_1px,transparent_1px)] bg-[size:32px_32px]" />
                
                {/* Center Pin Marker */}
                <div className="relative z-10 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-400 flex items-center justify-center mx-auto text-teal-300 animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Mayo Hospital / King Edward Medical University</p>
                    <p className="text-xs text-teal-300">Department of Neurophysiology</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Nelagumbad, Anarkali, Lahore</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Mayo+Hospital+Lahore"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 px-3 py-1.5 rounded-lg bg-teal-500 text-slate-950 font-bold text-[11px] hover:bg-teal-400 transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Quick General Inquiry Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Have a non-urgent inquiry regarding diagnostic procedures or clinical timings? Leave a message below.
              </p>

              {formSent ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Your message has been sent. The clinic will follow up with you promptly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={inquiryData.senderName}
                        onChange={(e) => setInquiryData({ ...inquiryData, senderName: e.target.value })}
                        placeholder="e.g. Asim Raza"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Phone or Email
                      </label>
                      <input
                        type="text"
                        required
                        value={inquiryData.senderContact}
                        onChange={(e) => setInquiryData({ ...inquiryData, senderContact: e.target.value })}
                        placeholder="0300-XXXXXXX or email"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Inquiry Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={inquiryData.senderMessage}
                      onChange={(e) => setInquiryData({ ...inquiryData, senderMessage: e.target.value })}
                      placeholder="How can we assist with your neurophysiology assessment questions?"
                      className="w-full p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
