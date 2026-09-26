import React, { useState, useEffect } from 'react';
import { 
  X, 
  Settings, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  FileSpreadsheet, 
  User, 
  Phone, 
  Mail, 
  Building2, 
  Save, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { DoctorConfig } from '../config/doctorConfig';
import { AppointmentRecord } from '../types/appointment';
import { getStoredAppointments, updateAppointmentStatus } from '../utils/appointmentStorage';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: DoctorConfig;
  onUpdateConfig: (newConfig: DoctorConfig) => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'config' | 'services'>('appointments');
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRecord | null>(null);

  // Editable config state
  const [editableConfig, setEditableConfig] = useState<DoctorConfig>(config);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAppointments(getStoredAppointments());
      setEditableConfig(config);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const handleStatusChange = (id: string, newStatus: AppointmentRecord['status']) => {
    const updated = updateAppointmentStatus(id, newStatus);
    setAppointments(updated);
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(editableConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Patient Name', 'Phone', 'Email', 'Type', 'Date', 'Time', 'Status', 'Reason', 'Created At'];
    const rows = appointments.map((a) => [
      a.id,
      `"${a.patientName}"`,
      `"${a.phone}"`,
      `"${a.email || ''}"`,
      `"${a.appointmentType}"`,
      a.date,
      a.time,
      a.status,
      `"${(a.reason || '').replace(/"/g, '""')}"`,
      a.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Appointments_DrAwais_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAppointments = appointments.filter((item) => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesSearch =
      item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.appointmentType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-4.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Clinic Administration & Schedule Management</h2>
              <p className="text-xs text-slate-400">Dr. Awais Ahmad Practice Console</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tabs */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'appointments' ? 'bg-teal-400 text-slate-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                Appointments ({appointments.length})
              </button>
              <button
                onClick={() => setActiveTab('config')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'config' ? 'bg-teal-400 text-slate-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                Clinic Settings
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Selectors */}
        <div className="sm:hidden flex border-b border-slate-200 bg-slate-50 text-xs font-semibold p-1">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex-1 py-2 text-center rounded-lg ${
              activeTab === 'appointments' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Appointments ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`flex-1 py-2 text-center rounded-lg ${
              activeTab === 'config' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Tab 1: Appointments List */}
        {activeTab === 'appointments' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by ID, name, phone..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-teal-600" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Table or Card View */}
            {filteredAppointments.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                No appointment requests match your filter.
              </div>
            ) : (
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Request ID</th>
                        <th className="py-3 px-4">Patient</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Date & Slot</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAppointments.map((record) => (
                        <tr key={record.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-teal-800">
                            #{record.id}
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-900">
                            {record.patientName}
                          </td>
                          <td className="py-3 px-4 text-slate-600 max-w-[180px] truncate" title={record.appointmentType}>
                            {record.appointmentType}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-700">
                            {record.date} <span className="text-teal-700 font-bold">{record.time}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {record.phone}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                record.status === 'Confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : record.status === 'Pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : record.status === 'Completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {record.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              {record.status !== 'Confirmed' && (
                                <button
                                  onClick={() => handleStatusChange(record.id, 'Confirmed')}
                                  title="Confirm Appointment"
                                  className="p-1 rounded text-emerald-600 hover:bg-emerald-50"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              )}
                              {record.status !== 'Completed' && (
                                <button
                                  onClick={() => handleStatusChange(record.id, 'Completed')}
                                  title="Mark as Completed"
                                  className="p-1 rounded text-blue-600 hover:bg-blue-50"
                                >
                                  <Clock className="w-4 h-4" />
                                </button>
                              )}
                              {record.status !== 'Cancelled' && (
                                <button
                                  onClick={() => handleStatusChange(record.id, 'Cancelled')}
                                  title="Cancel Appointment"
                                  className="p-1 rounded text-rose-600 hover:bg-rose-50"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => setSelectedAppointment(record)}
                                className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-100 rounded"
                              >
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Selected Appointment Details Drawer */}
            {selectedAppointment && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-900">
                    Appointment Details: #{selectedAppointment.id}
                  </span>
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <span className="text-slate-400 block">Patient:</span>
                    <span className="font-semibold text-slate-800">{selectedAppointment.patientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Phone:</span>
                    <span className="font-semibold text-slate-800">{selectedAppointment.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Email:</span>
                    <span className="font-semibold text-slate-800">{selectedAppointment.email || 'None'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Preferred Contact:</span>
                    <span className="font-semibold text-slate-800">{selectedAppointment.preferredContact}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block">Reason for Visit:</span>
                  <p className="text-slate-800 bg-white p-2 rounded border border-slate-200 mt-0.5">
                    {selectedAppointment.reason}
                  </p>
                </div>
                {selectedAppointment.additionalNotes && (
                  <div>
                    <span className="text-slate-400 block">Additional Notes:</span>
                    <p className="text-slate-600 bg-white p-2 rounded border border-slate-200 mt-0.5">
                      {selectedAppointment.additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Clinic & Doctor Configuration */}
        {activeTab === 'config' && (
          <form onSubmit={handleSaveConfig} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Clinic settings updated successfully! Changes will reflect across the site.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Doctor Name
                </label>
                <input
                  type="text"
                  value={editableConfig.name}
                  onChange={(e) => setEditableConfig({ ...editableConfig, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Specialty Title
                </label>
                <input
                  type="text"
                  value={editableConfig.specialty}
                  onChange={(e) => setEditableConfig({ ...editableConfig, specialty: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Degree / Qualification
                </label>
                <input
                  type="text"
                  value={editableConfig.degree}
                  onChange={(e) => setEditableConfig({ ...editableConfig, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Clinical Experience
                </label>
                <input
                  type="text"
                  value={editableConfig.experienceYears}
                  onChange={(e) => setEditableConfig({ ...editableConfig, experienceYears: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Current Hospital
                </label>
                <input
                  type="text"
                  value={editableConfig.currentHospital}
                  onChange={(e) => setEditableConfig({ ...editableConfig, currentHospital: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Academic Affiliation
                </label>
                <input
                  type="text"
                  value={editableConfig.academicAffiliation}
                  onChange={(e) => setEditableConfig({ ...editableConfig, academicAffiliation: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Clinic Phone Number
                </label>
                <input
                  type="text"
                  value={editableConfig.phoneDisplay}
                  onChange={(e) => setEditableConfig({ ...editableConfig, phoneDisplay: e.target.value, phone: e.target.value.replace(/[^0-9+]/g, '') })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  WhatsApp Support Number
                </label>
                <input
                  type="text"
                  value={editableConfig.whatsappDisplay}
                  onChange={(e) => setEditableConfig({ ...editableConfig, whatsappDisplay: e.target.value, whatsapp: e.target.value.replace(/[^0-9]/g, '') })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editableConfig.email}
                  onChange={(e) => setEditableConfig({ ...editableConfig, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Clinic Physical Address
                </label>
                <input
                  type="text"
                  value={editableConfig.clinicAddress}
                  onChange={(e) => setEditableConfig({ ...editableConfig, clinicAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Consultation Working Hours
                </label>
                <input
                  type="text"
                  value={editableConfig.consultationHours}
                  onChange={(e) => setEditableConfig({ ...editableConfig, consultationHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Clinic Configuration</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
