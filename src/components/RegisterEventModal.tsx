import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, Ticket } from 'lucide-react';
import { EventItem } from '../data/academyData';

interface RegisterEventModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const RegisterEventModal: React.FC<RegisterEventModalProps> = ({ event, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg !bg-white !text-black border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="py-6 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-300">
              <Ticket className="w-8 h-8" />
            </div>
            <div className="eye text-emerald-700 mb-1">Pass Confirmed</div>
            <h3 className="h1 text-3xl text-black mb-2">You're Registered!</h3>
            <p className="text-sm text-neutral-700 max-w-sm mb-6 leading-relaxed">
              We've reserved a studio spot for <strong className="text-black">{name}</strong> at the <strong>{event.title}</strong>. An entry QR pass has been messaged to <strong className="text-black">{phone}</strong>.
            </p>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-left w-full space-y-2 mb-6 text-neutral-800">
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

            <button onClick={handleReset} className="btn w-full !h-11 bg-black text-white hover:bg-neutral-800">
              Close & View More Events
            </button>
          </div>
        ) : (
          <div>
            <div className="eye text-neutral-600 mb-1">{event.category} · Registration</div>
            <h2 className="h1 text-2xl sm:text-3xl text-black mb-4 leading-tight">
              {event.title}
            </h2>

            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-2 mb-6 text-neutral-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-600 shrink-0" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-600 shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-600 shrink-0" />
                <span>{event.venue}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Attendee Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm text-black placeholder-neutral-500 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  WhatsApp Contact *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm text-black placeholder-neutral-500 focus:outline-none focus:border-black"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn w-full !h-11 text-xs font-extrabold tracking-wider bg-black text-white hover:bg-neutral-800"
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
};
