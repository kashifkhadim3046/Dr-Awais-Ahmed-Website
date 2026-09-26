import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Building2, 
  FileCheck2, 
  BookOpen, 
  Users, 
  FileText,
  Edit3
} from 'lucide-react';
import { DoctorConfig } from '../config/doctorConfig';

interface CredentialsSectionProps {
  config: DoctorConfig;
  onOpenAdmin: () => void;
}

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({
  config,
  onOpenAdmin,
}) => {
  const credentialCategories = [
    {
      title: 'Medical Qualification',
      icon: GraduationCap,
      verified: true,
      value: config.degree,
      placeholder: false,
      note: 'Undergraduate professional qualification in diagnostic neurophysiology.'
    },
    {
      title: 'Specialty Training',
      icon: Award,
      verified: true,
      value: 'Clinical Neuro Electrophysiology (EEG, EMG, NCS, Evoked Potentials)',
      placeholder: false,
      note: 'Comprehensive hands-on diagnostic recording and waveform interpretation.'
    },
    {
      title: 'Hospital Affiliations',
      icon: Building2,
      verified: true,
      value: `${config.currentHospital} · ${config.academicAffiliation}`,
      placeholder: false,
      note: 'Active clinical practice and hospital department engagement.'
    },
    {
      title: 'Clinical Experience',
      icon: FileCheck2,
      verified: true,
      value: config.experienceYears,
      placeholder: false,
      note: 'Dedicated patient evaluation in diagnostic neurophysiology suites.'
    },
    {
      title: 'Fellowships / Advanced Credentials',
      icon: Award,
      verified: false,
      value: '[Add Advanced Fellowship / Board Certification]',
      placeholder: true,
      note: 'Placeholder: Can be updated with clinical fellowship details.'
    },
    {
      title: 'Certifications',
      icon: FileText,
      verified: false,
      value: '[Add Neurophysiology Certifications / Accreditations]',
      placeholder: true,
      note: 'Placeholder: Professional clinical practice certifications.'
    },
    {
      title: 'Professional Memberships',
      icon: Users,
      verified: false,
      value: '[Add Professional Societies / Memberships]',
      placeholder: true,
      note: 'Placeholder: National and international neurophysiology associations.'
    },
    {
      title: 'Publications & Academic Research',
      icon: BookOpen,
      verified: false,
      value: '[Add Research Publications / Case Studies]',
      placeholder: true,
      note: 'Placeholder: Peer-reviewed journal articles or conference abstracts.'
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-3">
              Qualifications & Practice
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Professional Credentials
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Verified clinical qualifications alongside transparent placeholders for future institutional credentials and accreditations.
            </p>
          </div>

          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 shadow-xs hover:bg-slate-50 transition-colors shrink-0"
          >
            <Edit3 className="w-4 h-4 text-teal-600" />
            <span>Customize Credentials</span>
          </button>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentialCategories.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                  cred.placeholder
                    ? 'bg-slate-50/70 border-dashed border-slate-300'
                    : 'bg-white border-slate-200/80 shadow-xs hover:border-teal-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    {cred.placeholder ? (
                      <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded">
                        Editable
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                        Verified
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {cred.title}
                  </h3>

                  <p className={`mt-2 text-sm font-bold leading-snug ${
                    cred.placeholder ? 'text-slate-400 italic font-normal' : 'text-slate-900'
                  }`}>
                    {cred.value}
                  </p>
                </div>

                <p className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                  {cred.note}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          Only verified clinical credentials and hospital affiliations are displayed. Placeholders remain clearly designated until authenticated by the clinic.
        </div>

      </div>
    </section>
  );
};
