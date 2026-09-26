import React, { useState, useEffect } from 'react';
import { INITIAL_DOCTOR_CONFIG, DoctorConfig } from './config/doctorConfig';
import { getStoredAppointments } from './utils/appointmentStorage';
import { EmergencyNotice } from './components/EmergencyNotice';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { ServicesSection } from './components/ServicesSection';
import { ConditionsSection } from './components/ConditionsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { BookingSystem } from './components/BookingSystem';
import { CredentialsSection } from './components/CredentialsSection';
import { KnowledgeCenterSection } from './components/KnowledgeCenterSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPortalModal } from './components/AdminPortalModal';

export default function App() {
  const [config, setConfig] = useState<DoctorConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('dr_awais_config_v1');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load saved doctor config', e);
      }
    }
    return INITIAL_DOCTOR_CONFIG;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [pendingCount, setPendingCount] = useState<number>(0);

  useEffect(() => {
    const updateCount = () => {
      const allAppointments = getStoredAppointments();
      const pending = allAppointments.filter((a) => a.status === 'Pending').length;
      setPendingCount(pending);
    };

    updateCount();
    const interval = setInterval(updateCount, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateConfig = (newConfig: DoctorConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('dr_awais_config_v1', JSON.stringify(newConfig));
    } catch (e) {
      console.error('Failed to save config', e);
    }
  };

  const handleOpenBooking = () => {
    const el = document.getElementById('appointments');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreExpertise = () => {
    const el = document.getElementById('expertise');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    handleOpenBooking();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      
      {/* Top Medical Emergency Banner */}
      <EmergencyNotice />

      {/* Sticky Translucent Navbar */}
      <Navbar
        config={config}
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
        pendingCount={pendingCount}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with 3D Brain and Neural Network */}
        <HeroSection
          config={config}
          onOpenBooking={handleOpenBooking}
          onExploreExpertise={handleExploreExpertise}
        />

        {/* About Dr. Awais Ahmad */}
        <AboutSection
          config={config}
          onOpenBooking={handleOpenBooking}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Areas of Expertise (6 Disciplines) */}
        <ExpertiseSection
          onSelectService={handleSelectServiceForBooking}
          onOpenBooking={handleOpenBooking}
        />

        {/* Specialized Neurophysiology Services */}
        <ServicesSection
          config={config}
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* Conditions & Symptoms We Evaluate */}
        <ConditionsSection
          config={config}
          onOpenBooking={handleOpenBooking}
        />

        {/* How It Works (4-Step Timeline) */}
        <HowItWorksSection
          onOpenBooking={handleOpenBooking}
        />

        {/* Why Choose Dr. Awais Ahmad */}
        <WhyChooseSection
          config={config}
          onOpenBooking={handleOpenBooking}
        />

        {/* Appointment Booking System */}
        <BookingSystem
          config={config}
          preselectedService={preselectedService}
          onAppointmentCreated={() => {
            const all = getStoredAppointments();
            setPendingCount(all.filter((a) => a.status === 'Pending').length);
          }}
        />

        {/* Professional Credentials */}
        <CredentialsSection
          config={config}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Patient Education / Knowledge Center */}
        <KnowledgeCenterSection
          config={config}
        />

        {/* Patient Experiences / Testimonials Placeholders */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FaqSection
          config={config}
        />

        {/* Contact & Map Directions */}
        <ContactSection
          config={config}
          onOpenBooking={handleOpenBooking}
        />
      </main>

      {/* Dark Premium Footer */}
      <Footer
        config={config}
        onOpenBooking={handleOpenBooking}
      />

      {/* Clinic Admin & Schedule Management Portal */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
      />

    </div>
  );
}
