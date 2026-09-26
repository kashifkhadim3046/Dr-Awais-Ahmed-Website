import React from 'react';
import { Quote, MessageSquareHeart, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const placeholderCards = [
    {
      id: 1,
      placeholderText: 'Patient testimonial will appear here.',
      clinicalContext: 'Diagnostic Evaluation Patient',
      verifiedConsent: 'Consented Feedback Placeholder',
    },
    {
      id: 2,
      placeholderText: 'Patient testimonial will appear here.',
      clinicalContext: 'EEG & Neurological Assessment Patient',
      verifiedConsent: 'Consented Feedback Placeholder',
    },
    {
      id: 3,
      placeholderText: 'Patient testimonial will appear here.',
      clinicalContext: 'Nerve Conduction & EMG Patient',
      verifiedConsent: 'Consented Feedback Placeholder',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-3">
            Clinical Care Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Patient Experiences
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Real patient reflections on clinical bedside care, testing comfort, and diagnostic clarity.
          </p>
        </div>

        {/* Testimonials Placeholders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {placeholderCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-7 border border-dashed border-slate-300 shadow-xs flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-teal-400/60 mb-4" />
                <p className="text-sm font-medium text-slate-400 italic leading-relaxed">
                  “{card.placeholderText}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-700 block">
                    [Patient Initial]
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    {card.clinicalContext}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                  Placeholder
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Transparency Notice */}
        <div className="mt-10 text-center max-w-lg mx-auto flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Testimonials are published with appropriate patient permission.</span>
        </div>

      </div>
    </section>
  );
};
