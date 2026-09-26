import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Settings2, Phone, Sparkles } from 'lucide-react';
import { DoctorConfig } from '../config/doctorConfig';

interface NavbarProps {
  config: DoctorConfig;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  pendingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onOpenBooking,
  onOpenAdmin,
  pendingCount = 0,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Services', href: '#services' },
    { label: 'Conditions', href: '#conditions' },
    { label: 'Why Choose Dr. Awais', href: '#why-choose' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/90 backdrop-blur-md shadow-lg shadow-slate-950/20 border-b border-slate-800/80 py-3'
            : 'bg-slate-900/60 backdrop-blur-sm border-b border-slate-800/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark (Single Text Element with Subtitle) */}
          <a
            href="#home"
            className="group flex flex-col focus:outline-none"
            aria-label={`${config.name} - ${config.specialty}`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 group-hover:scale-125 transition-transform" />
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-teal-300 transition-colors">
                {config.name}
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-teal-400/90 tracking-wide pl-4.5">
              {config.specialty}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-xs xl:text-sm font-medium text-slate-300 hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-teal-400 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Primary Action Zone */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Clinic Admin Toggle Button */}
            <button
              onClick={onOpenAdmin}
              className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 border border-slate-700/60 transition-colors"
              title="Clinic Management & Appointments"
              aria-label="Open clinic appointment portal"
            >
              <Settings2 className="w-4 h-4" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[9px] font-bold bg-teal-500 text-slate-950 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Direct Call Quick Action */}
            <a
              href={`tel:${config.phone}`}
              className="hidden xl:flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-teal-300 px-3 py-2 rounded-xl border border-slate-800 bg-slate-900/80 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>{config.phoneDisplay}</span>
            </a>

            {/* Book Appointment CTA */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 shadow-md shadow-teal-500/20 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book an Appointment</span>
            </button>
          </div>

          {/* Mobile Menu & Quick Book Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors cursor-pointer"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-16 right-0 bottom-0 w-full max-w-sm bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-base font-bold text-white block">{config.name}</span>
                <span className="text-xs text-teal-400">{config.specialty}</span>
              </div>

              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-base font-medium text-slate-200 hover:text-teal-400 py-2 border-b border-slate-800/40 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book an Appointment
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 flex items-center justify-center gap-2"
              >
                <Settings2 className="w-4 h-4 text-teal-400" />
                Doctor / Clinic Portal {pendingCount > 0 && `(${pendingCount} pending)`}
              </button>

              <div className="text-center text-xs text-slate-500 pt-2">
                Emergency: Mayo Hospital / 1122
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
