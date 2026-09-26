import React from 'react';
import { CalendarCheck, MessageSquare, Activity, FileCheck2, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenBooking: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onOpenBooking,
}) => {
  const steps = [
    {
      step: '01',
      title: 'Book',
      description: 'Choose a convenient appointment date and time.',
      detail: 'Submit your appointment request online with preferred slots and initial clinical details.',
      icon: CalendarCheck,
    },
    {
      step: '02',
      title: 'Consultation',
      description: 'Discuss your symptoms, concerns, and medical history.',
      detail: 'A comprehensive pre-test review of your symptoms, previous reports, and diagnostic query.',
      icon: MessageSquare,
    },
    {
      step: '03',
      title: 'Assessment',
      description: 'Receive the appropriate clinical and neurophysiological assessment when indicated.',
      detail: 'High-precision bioelectrical testing (EEG, EMG, NCS, or Evoked Potentials) conducted gently.',
      icon: Activity,
    },
    {
      step: '04',
      title: 'Follow-Up',
      description: 'Review results and discuss the recommended next steps with your doctor.',
      detail: 'Clear, readable reports with graphical wave analysis shared with you and your referring neurologist.',
      icon: FileCheck2,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FAFAFC] text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-3">
            Patient Pathway
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A structured, reassuring clinical journey from initial booking through diagnostic reporting.
          </p>
        </div>

        {/* 4-Step Process Timeline */}
        <div className="relative">
          
          {/* Subtle animated connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-[2px] -translate-y-12 bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200 z-0 opacity-70" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between group relative"
                >
                  {/* Step Number Indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-extrabold text-teal-600 group-hover:scale-105 transition-transform">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Core Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-slate-700">
                      {item.description}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed pt-1">
                      {item.detail}
                    </p>
                  </div>

                  {/* Step status bar */}
                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Phase 0{index + 1} of 04</span>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Action Footnote */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4 text-slate-950" />
            <span>Begin Step 01: Book Your Consultation</span>
          </button>
        </div>

      </div>
    </section>
  );
};
