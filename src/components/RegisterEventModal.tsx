import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { EventItem } from '../data/academyData';
import { useModalScrollLock } from '../utils/modalScrollLock';

interface RegisterEventModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const RegisterEventModal: React.FC<RegisterEventModalProps> = ({ event, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleReset = () => {
    setConfirmed(false);
    setName('');
    setPhone('');
    onClose();
  };

  useModalScrollLock(!!event, handleReset);

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const modalContent = (
    <div 
      data-lenor-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={handleReset}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div 
        className="relative w-full max-w-lg !bg-white !text-black border border-neutral-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl overflow-y-auto max-h-[90vh] overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {confirmed ? (
          <div className="py-4 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 border border-emerald-300">
              <Ticket className="w-7 h-7" />
            </div>
            <div className="eye text-emerald-700 mb-1">Pass Confirmed</div>
            <h3 className="h1 text-2xl text-black mb-2">You're Registered!</h3>
            <p className="text-sm text-neutral-700 max-w-sm mb-5 leading-relaxed">
              We've reserved a studio spot for <strong className="text-black">{name}</strong> at the <strong>{event.title}</strong>. An entry QR pass has been messaged to <strong className="text-black">{phone}</strong>.
            </p>

            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-left w-full space-y-2 mb-5 text-neutral-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-600" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-600" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-600" />
                <span>{event.venue}</span>
              </div>
            </div>

            <button onClick={handleReset} className="btn w-full !h-10 text-xs bg-black text-white hover:bg-neutral-800">
              Close & View More Events
            </button>
          </div>
        ) : (
          <div>
            <div className="eye text-neutral-600 mb-1">{event.category} · Registration</div>
            <h2 className="h1 text-xl sm:text-2xl text-black mb-3 leading-tight">
              {event.title}
            </h2>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1.5 mb-4 text-neutral-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                <span>{event.venue}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Attendee Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2 text-sm text-black placeholder-neutral-500 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  WhatsApp Contact *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2 text-sm text-black placeholder-neutral-500 focus:outline-none focus:border-black"
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="btn w-full !h-10 text-xs font-extrabold tracking-wider bg-black text-white hover:bg-neutral-800"
                >
                  Confirm Free Registration Pass
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};
