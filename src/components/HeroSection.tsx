import React from 'react';
import { Calendar, ChevronRight, CheckCircle2, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { DoctorConfig } from '../config/doctorConfig';
import { ThreeBrainCanvas } from './ThreeBrainCanvas';

interface HeroSectionProps {
  config: DoctorConfig;
  onOpenBooking: () => void;
  onExploreExpertise: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onOpenBooking,
  onExploreExpertise,
}) => {
  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-[#0A1128] text-white"
    >
      {/* Background Subtle Waveform Grid and Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medical-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(20, 184, 166, 0.25)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-grid)" />
        </svg>
      </div>

      {/* Ambient Radial Highlights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Typography & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            
            {/* Specialty Kicker (Quiet unboxed editorial text) */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-300 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>{config.name} — {config.specialty}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Advanced Neurophysiology.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-200 to-cyan-300">
                Personalized Neurological Care.
              </span>
            </h1>

            {/* Professional Description */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              Providing specialized neurological evaluation and advanced neurophysiological assessment with a patient-centered approach focused on accurate diagnosis, clear communication, and personalized care.
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={onExploreExpertise}
                className="px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Expertise</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </button>
            </div>

            {/* Trust Indicators (Quiet metadata separators) */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Specialist Neurological Care</span>
                </span>
                <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Advanced Neurophysiological Assessment</span>
                </span>
                <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Patient-Centered Approach</span>
                </span>
              </div>
            </div>

            {/* Current Affiliation Reference */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Affiliated: {config.currentHospital} · {config.academicAffiliation}</span>
            </div>

          </div>

          {/* Right Column: 3D Visualization */}
          <div className="lg:col-span-6 relative">
            {/* Background EEG decorative waveform traces */}
            <div className="absolute -top-8 -left-8 -right-8 -bottom-8 pointer-events-none opacity-40">
              <svg className="w-full h-full" viewBox="0 0 600 500" fill="none">
                <path
                  d="M0,250 C100,220 150,280 250,250 C320,230 380,310 500,260 C550,240 580,250 600,250"
                  stroke="#14B8A6"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <path
                  d="M0,320 C80,350 180,290 280,320 C360,340 440,290 540,310 C580,320 600,315 600,315"
                  stroke="#38BDF8"
                  strokeWidth="0.75"
                  strokeDasharray="3 5"
                />
              </svg>
            </div>

            {/* 3D Brain Canvas */}
            <ThreeBrainCanvas />
          </div>

        </div>
      </div>
    </section>
  );
};
