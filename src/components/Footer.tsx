import React, { useState } from 'react';
import { ShieldCheck, Phone, Mail, MapPin, X, ArrowUp, Sparkles } from 'lucide-react';
import { DoctorConfig } from '../config/doctorConfig';

interface FooterProps {
  config: DoctorConfig;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenBooking }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Col 1: Brand & Specialty */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
              <span className="text-xl font-extrabold tracking-tight text-white">
                {config.name}
              </span>
            </div>
            
            <p className="text-xs font-semibold text-teal-400 tracking-wider uppercase">
              {config.specialty}
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Providing specialized neurological evaluation and advanced neurophysiological assessment with a patient-centered approach focused on accurate diagnosis and clear clinical communication.
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-mono text-slate-400 block">
                {config.degree} · {config.experienceYears}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {config.currentHospital} · {config.academicAffiliation}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#home" className="hover:text-teal-300 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-300 transition-colors">About Dr. Awais Ahmad</a>
              </li>
              <li>
                <a href="#expertise" className="hover:text-teal-300 transition-colors">Areas of Expertise</a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">Neurophysiology Services</a>
              </li>
              <li>
                <a href="#conditions" className="hover:text-teal-300 transition-colors">Evaluated Conditions</a>
              </li>
              <li>
                <a href="#why-choose" className="hover:text-teal-300 transition-colors">Why Choose Dr. Awais</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-teal-300 transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-teal-300 transition-colors">Contact Clinic</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Clinic Contact & Hours
            </h4>

            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Phone / WhatsApp:</span>
                  <a href={`tel:${config.phone}`} className="text-slate-200 hover:text-white font-medium">
                    {config.phoneDisplay} / {config.whatsappDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Email:</span>
                  <a href={`mailto:${config.email}`} className="text-slate-200 hover:text-white font-medium">
                    {config.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Address:</span>
                  <span className="text-slate-300 leading-relaxed block">
                    {config.clinicAddress}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors cursor-pointer"
                >
                  Schedule an Appointment
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 {config.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <button
              onClick={() => setModalType('disclaimer')}
              className="hover:text-slate-300 transition-colors cursor-pointer text-teal-400 font-medium"
            >
              Medical Disclaimer
            </button>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors ml-2"
              title="Scroll to Top"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Legal Dialog Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in text-slate-900">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === 'disclaimer' && (
              <div className="space-y-4 text-xs sm:text-sm">
                <h3 className="text-xl font-bold text-slate-900">Medical Disclaimer</h3>
                <p className="text-slate-600 leading-relaxed">
                  The medical, diagnostic, and educational information provided on this website is for general informational and scheduling purposes only. It is not intended to be a substitute for professional medical advice, clinical diagnosis, or individualized treatment.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Always seek the advice of your personal physician, neurologist, or other qualified healthcare provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of information reviewed on this website.
                </p>
                <p className="text-slate-600 leading-relaxed font-semibold">
                  In case of an acute medical emergency, contact your local emergency response service immediately or proceed to the nearest emergency room.
                </p>
              </div>
            )}

            {modalType === 'privacy' && (
              <div className="space-y-4 text-xs sm:text-sm">
                <h3 className="text-xl font-bold text-slate-900">Privacy Policy</h3>
                <p className="text-slate-600 leading-relaxed">
                  Dr. Awais Ahmad and clinic staff are committed to respecting patient privacy and safeguarding personal health information. Any data submitted via the online appointment request form (such as patient name, contact number, and reason for consultation) is collected solely for the purpose of appointment coordination and clinical triage.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We do not sell, rent, or disclose patient contact details to commercial third parties. Patient information is processed with strict clinical confidentiality.
                </p>
              </div>
            )}

            {modalType === 'terms' && (
              <div className="space-y-4 text-xs sm:text-sm">
                <h3 className="text-xl font-bold text-slate-900">Terms of Use</h3>
                <p className="text-slate-600 leading-relaxed">
                  By accessing and using this website, you acknowledge that appointment submissions constitute a request for scheduling and do not represent a guaranteed booking until verified and confirmed by clinic staff.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  All educational content, waveforms, and materials on this website are the intellectual property of Dr. Awais Ahmad. Unauthorized republication or reproduction is prohibited.
                </p>
              </div>
            )}

            <div className="pt-6 border-t border-slate-100 mt-6 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
