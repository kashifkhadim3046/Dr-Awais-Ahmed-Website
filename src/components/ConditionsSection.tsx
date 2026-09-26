import React, { useState } from 'react';
import { Search, ShieldAlert, Check, ArrowRight, Brain, Zap, Stethoscope } from 'lucide-react';
import { DoctorConfig, ConditionItem } from '../config/doctorConfig';

interface ConditionsSectionProps {
  config: DoctorConfig;
  onOpenBooking: () => void;
}

export const ConditionsSection: React.FC<ConditionsSectionProps> = ({
  config,
  onOpenBooking,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCondition, setActiveCondition] = useState<ConditionItem | null>(null);

  const categories = ['All', 'Paroxysmal', 'Peripheral', 'Central', 'General'];

  const filteredConditions = config.conditions.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="conditions" className="py-20 md:py-28 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-3">
            Diagnostic Scope
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Conditions & Symptoms We Evaluate
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-700 font-medium">
            Neurological conditions and symptoms that may require neurophysiological evaluation include:
          </p>
        </div>

        {/* Mandatory Medical Disclaimer Box */}
        <div className="max-w-3xl mx-auto mb-10 bg-teal-50/60 border border-teal-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-teal-950 leading-relaxed">
            <span className="font-bold">Medical Disclaimer: </span>
            Clinical evaluation is individualized. The appropriate diagnostic test depends on the patient's symptoms and medical history. The presence of these symptoms does not confirm a specific neurological condition until formal clinical and electrodiagnostic investigation is conducted.
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="max-w-3xl mx-auto mb-10 flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search symptoms or conditions..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-[#FAFAFC] text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Conditions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredConditions.map((condition) => (
            <div
              key={condition.id}
              onClick={() => setActiveCondition(condition)}
              className="bg-[#FAFAFC] hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-teal-500/40 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    {condition.category} System
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                  {condition.name}
                </h3>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {condition.description}
                </p>
              </div>

              {/* Assessment link footnote */}
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Evaluation Modality:</span>
                <span className="font-semibold text-teal-700">
                  {condition.relevantAssessments[0] || 'Neurophysiology'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA prompt */}
        <div className="mt-14 text-center">
          <p className="text-sm text-slate-600 mb-4">
            Experiencing unexplained neurological symptoms or seeking an objective diagnostic evaluation?
          </p>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-md inline-flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Stethoscope className="w-4 h-4 text-teal-400" />
            Book Clinical Assessment Request
          </button>
        </div>

      </div>

      {/* Condition detail modal */}
      {activeCondition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                  Evaluated Condition
                </span>
                <h3 className="text-lg font-bold text-slate-900">{activeCondition.name}</h3>
              </div>
              <button
                onClick={() => setActiveCondition(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
              {activeCondition.description}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 mb-5">
              <span className="text-xs font-bold text-slate-800 block mb-2">
                Recommended Neurophysiological Studies:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {activeCondition.relevantAssessments.map((test, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{test}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setActiveCondition(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveCondition(null);
                  onOpenBooking();
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-xs cursor-pointer"
              >
                Schedule Evaluation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
