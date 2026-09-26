import React, { useState } from 'react';
import { 
  Activity, 
  Video, 
  Zap, 
  TrendingUp, 
  Eye, 
  Dna, 
  UserCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  X,
  Calendar
} from 'lucide-react';
import { ServiceItem, DoctorConfig } from '../config/doctorConfig';

interface ServicesSectionProps {
  config: DoctorConfig;
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  config,
  onSelectServiceForBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'eeg' | 'emg' | 'ncs' | 'evoked' | 'consult'>('all');
  const [modalService, setModalService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (category: ServiceItem['category']) => {
    switch (category) {
      case 'eeg':
        return Activity;
      case 'emg':
        return Zap;
      case 'ncs':
        return TrendingUp;
      case 'evoked':
        return Eye;
      case 'consult':
        return UserCheck;
      default:
        return Activity;
    }
  };

  const filteredServices = activeTab === 'all' 
    ? config.services 
    : config.services.filter(s => s.category === activeTab);

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F8FAFC] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-3">
              Diagnostic Modalities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Specialized Neurophysiology Services
            </h2>
            <p className="mt-3 text-base text-slate-600">
              State-of-the-art neuro-diagnostic testing protocols adhering to international clinical neurophysiology guidelines.
            </p>
          </div>

          {/* Interactive Filter Controls (Functional segmented buttons) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/70 rounded-xl overflow-x-auto shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setActiveTab('eeg')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'eeg'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EEG Studies
            </button>
            <button
              onClick={() => setActiveTab('emg')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'emg'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EMG & Motor
            </button>
            <button
              onClick={() => setActiveTab('ncs')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'ncs'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nerve Conduction
            </button>
            <button
              onClick={() => setActiveTab('consult')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'consult'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Consultations
            </button>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const Icon = getServiceIcon(service.category);
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-teal-500/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Category icon */}
                  <div className="w-11 h-11 rounded-xl bg-teal-50 group-hover:bg-teal-500 text-teal-700 group-hover:text-white flex items-center justify-center transition-colors mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                    {service.shortTitle}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>{service.estimatedDuration}</span>
                  </div>

                  <button
                    onClick={() => setModalService(service)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Note */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-900">
                Custom Clinical Diagnostic Protocols
              </p>
              <p className="text-xs text-slate-500">
                Need guidance choosing between routine EEG, sleep-deprived recording, or peripheral EMG/NCS testing?
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectServiceForBooking('Neurophysiological Consultation')}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            Consult with Dr. Awais
          </button>
        </div>

      </div>

      {/* Learn More Service Detail Modal */}
      {modalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setModalService(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-start gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                {React.createElement(getServiceIcon(modalService.category), { className: 'w-6 h-6' })}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                  Clinical Modality Overview
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {modalService.title}
                </h3>
              </div>
            </div>

            {/* Clinical Purpose */}
            <div className="space-y-4 mb-6 text-sm">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                  Clinical Purpose & Indication
                </h4>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                  {modalService.clinicalPurpose}
                </p>
              </div>

              {/* Patient Preparation Instructions */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                  Patient Preparation Guidelines
                </h4>
                <div className="space-y-2">
                  {modalService.preparation.map((prep, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{prep}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Turnaround & Duration */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
                  <span className="text-slate-400 block font-medium">Estimated Duration:</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{modalService.estimatedDuration}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
                  <span className="text-slate-400 block font-medium">Report Turnaround:</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{modalService.reportTurnaround}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setModalService(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const titleToBook = modalService.title;
                  setModalService(null);
                  onSelectServiceForBooking(titleToBook);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                Book This Service
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
