import React from 'react';
import { ShieldCheck, Cpu, Users, FileCheck, CheckCircle2, Stethoscope } from 'lucide-react';
import { DoctorConfig } from '../config/doctorConfig';

interface WhyChooseSectionProps {
  config: DoctorConfig;
  onOpenBooking: () => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({
  config,
  onOpenBooking,
}) => {
  const pillars = [
    {
      title: 'Dedicated Neurophysiology Training',
      description: 'Specialized clinical education in neurophysiology technology (BSNT) providing dedicated mastery over bioelectrical diagnostic hardware and waveforms.',
      icon: Stethoscope,
    },
    {
      title: 'Evidence-Based Diagnostic Precision',
      description: 'Strict adherence to international clinical neurophysiology standards (IFCN / AANEM) for electrode impedances, stimulation intensities, and recording bandpass.',
      icon: Cpu,
    },
    {
      title: 'Patient-Centered Clear Communication',
      description: 'Every test is explained step-by-step prior to application. Patients receive gentle reassurance and clear, comprehensible summaries of what their test measures.',
      icon: Users,
    },
    {
      title: 'Collaborative Neurological Care',
      description: 'Fast, high-fidelity report turnaround with comprehensive waveform traces, enabling referring neurologists and surgeons to make rapid, informed decisions.',
      icon: FileCheck,
    },
    {
      title: 'Hospital & Academic Environment',
      description: `Active clinical engagement at premier institutions including ${config.currentHospital} and ${config.academicAffiliation}.`,
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="why-choose" className="py-20 md:py-28 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-3">
            Clinical Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Dr. Awais Ahmad
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Combining rigorous scientific standards with empathetic, respectful patient interactions for dependable neuro-diagnostic results.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-[#FAFAFC] rounded-2xl p-7 border border-slate-200/80 hover:border-teal-500/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-500 text-teal-700 group-hover:text-white flex items-center justify-center transition-colors mb-5">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-teal-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Clinical Quality Pillar</span>
                </div>
              </div>
            );
          })}

          {/* Quick CTA Box in grid */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-[#0A1128] rounded-2xl p-7 text-white flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs font-mono font-medium text-teal-400 uppercase tracking-wider block mb-2">
                Patient Direct Access
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white">
                Ready to Schedule an Assessment?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Take the next step toward clinical clarity with an accurate, patient-centered neurophysiological examination.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-6 w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 shadow-md transition-all cursor-pointer text-center"
            >
              Book an Appointment
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
