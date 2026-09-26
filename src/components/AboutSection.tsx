import React from 'react';
import { 
  Award, 
  Stethoscope, 
  HeartHandshake, 
  Target, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Users, 
  CheckCircle, 
  Calendar 
} from 'lucide-react';
import { DoctorConfig } from '../config/doctorConfig';

interface AboutSectionProps {
  config: DoctorConfig;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  config,
  onOpenBooking,
  onOpenAdmin,
}) => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#FAFAFC] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-3">
            About the Specialist
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Dr. Awais Ahmad
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Advanced diagnostic neurophysiology with a commitment to clinical precision and patient reassurance.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Doctor Portrait & Glass Halo Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-72 h-88 sm:w-80 sm:h-96 md:w-88 md:h-[420px] rounded-3xl p-3 bg-gradient-to-b from-teal-500/20 via-slate-200/50 to-slate-100 border border-teal-500/30 shadow-xl flex items-center justify-center">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 rounded-[28px] border border-teal-500/20 pointer-events-none" />

              {/* Portrait Container */}
              <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-between p-6 text-center relative">
                
                {/* Subtle neural background grid inside card */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Top Badge */}
                <div className="relative z-10 w-full flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-lg border border-teal-500/30">
                    Clinical Neurophysiology
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" title="Active Practice" />
                </div>

                {/* Distinguished Silhouette & Medical Insignia Graphic */}
                <div className="relative z-10 my-auto flex flex-col items-center">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-teal-600 via-teal-500 to-cyan-400 p-1 shadow-lg shadow-teal-500/20 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-teal-300">
                      <Stethoscope className="w-14 h-14 sm:w-16 sm:h-16 stroke-[1.5]" />
                    </div>
                  </div>
                  
                  <h3 className="mt-4 text-xl font-bold text-white tracking-tight">
                    {config.name}
                  </h3>
                  <p className="text-xs text-teal-300 font-medium">
                    {config.specialty}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {config.currentHospital}
                  </p>
                </div>

                {/* Bottom Verification Strip */}
                <div className="relative z-10 w-full pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
                  <span className="flex items-center gap-1 text-teal-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified Specialist
                  </span>
                  <span className="font-mono text-slate-400">
                    BSNT · 5+ Yrs
                  </span>
                </div>
              </div>

              {/* Floating Trust Pill */}
              <div className="absolute -bottom-4 right-4 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200 shadow-lg flex items-center gap-2.5">
                <Award className="w-4 h-4 text-teal-600" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Practice Focus</p>
                  <p className="text-xs font-bold text-slate-800">Neuro Electrophysiology</p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenAdmin}
              className="mt-6 text-xs text-slate-500 hover:text-teal-700 underline underline-offset-4 transition-colors"
            >
              Update or customize doctor profile details →
            </button>
          </div>

          {/* Right: Biography & Information Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Biography Text (exact wording) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
                “Dr. Awais Ahmad is a Neuro Electrophysiologist dedicated to the evaluation and management of neurological conditions through advanced neurophysiological assessment and evidence-based clinical care.”
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                With a specialized background in clinical neurophysiology technology, Dr. Awais works closely with neurologists, neurosurgeons, and referring physicians to provide objective, high-resolution diagnostic data on central and peripheral nervous system activity.
              </p>
            </div>

            {/* Core Editable Info Cards (Specialty, Approach, Focus) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-teal-500/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Specialty
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                    Neuro Electrophysiology
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Bioelectrical function of central & peripheral pathways.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-teal-500/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center mb-3">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Approach
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                    Patient-Centered Care
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Transparent communication and patient comfort throughout testing.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-teal-500/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Focus
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                    Diagnosis & Assessment
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Objective diagnostic data to support medical decision-making.
                  </p>
                </div>
              </div>

            </div>

            {/* Editable Credential & Detail Placeholders */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/70 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Professional Profile & Clinical Background
                </span>
                <span className="text-[11px] text-teal-700 font-medium">
                  Verified Data & Placeholders
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                <div className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">Medical Degree:</span>
                    <span className="font-semibold text-slate-800">{config.degree}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">Fellowship / Specialization:</span>
                    <span className="font-semibold text-slate-800">Neuro Electrophysiology</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">Current Affiliation:</span>
                    <span className="font-semibold text-slate-800">{config.currentHospital} · {config.academicAffiliation}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Briefcase className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">Experience:</span>
                    <span className="font-semibold text-slate-800">{config.experienceYears}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:col-span-2">
                  <Users className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">Professional Memberships:</span>
                    <span className="font-medium text-slate-700">
                      [Add Professional Neurophysiology Societies / Memberships via Admin]
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-slate-900 hover:bg-slate-800 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-teal-400" />
                Schedule Consultation
              </button>
              <span className="text-xs text-slate-500">
                Direct referral & patient-initiated consultations welcome
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
