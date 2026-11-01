import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Phone, Mail, User, MapPin } from 'lucide-react';
import { PROGRAMMES, ACADEMY_INFO } from '../data/academyData';

interface EnrolModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgramId?: string;
}

export const EnrolModal: React.FC<EnrolModalProps> = ({ isOpen, onClose, defaultProgramId }) => {
  const [selectedProgram, setSelectedProgram] = useState(defaultProgramId || 'media-master');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('Beginner (Fresh starting)');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setLocation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl !bg-white !text-black border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="h1 text-3xl font-extrabold text-black mb-2">
              Application Received!
            </h3>
            <p className="text-neutral-700 text-sm max-w-sm mb-6 leading-relaxed">
              Thank you, <strong className="text-black">{name || 'Creator'}</strong>. Our Senior Admissions Counsellor from Lenor Academy Makkaraparamba will connect with you via WhatsApp & Call at <strong className="text-black">{phone}</strong> within 24 hours.
            </p>
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 text-left w-full mb-6">
              <div className="font-bold text-black mb-1">Enrolment Summary:</div>
              <div>Programme: {PROGRAMMES.find(p => p.id === selectedProgram)?.name}</div>
              <div>Campus: {ACADEMY_INFO.address}</div>
              <div>Direct Admissions Line: {ACADEMY_INFO.phone}</div>
            </div>
            <button
              onClick={handleReset}
              className="btn w-full !h-11 bg-black text-white hover:bg-neutral-800"
            >
              Done & Explore Academy
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="eye text-neutral-600">Admissions & Enrolment</div>
              <h2 className="h1 text-3xl sm:text-4xl text-black mt-1">
                Begin Your Journey
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-light">
                Secure your seat at Lenor Academy, CP Building, Makkaraparamba. Limited seats per batch for personalized gear mentorship.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Program Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Select Programme
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PROGRAMMES.map((prog) => (
                    <button
                      type="button"
                      key={prog.id}
                      onClick={() => setSelectedProgram(prog.id)}
                      className={`p-3.5 rounded-xl text-left border transition-all ${
                        selectedProgram === prog.id
                          ? 'border-black bg-neutral-100 text-black shadow-sm ring-1 ring-black'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-black'
                      }`}
                    >
                      <div className="font-bold text-sm text-black">{prog.name}</div>
                      <div className="text-xs text-neutral-600 mt-1">{prog.duration} · {prog.modulesCount}</div>
                      <div className="text-xs font-bold text-emerald-700 mt-2">{prog.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Menon"
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-10 py-2.5 text-sm text-black placeholder-neutral-500 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* WhatsApp Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  WhatsApp Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-10 py-2.5 text-sm text-black placeholder-neutral-500 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Email & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-10 py-2.5 text-sm text-black placeholder-neutral-500 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    City / Town *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Malappuram / Calicut"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-10 py-2.5 text-sm text-black placeholder-neutral-500 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Current Level with Cameras / Software
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-black transition-colors"
                >
                  <option value="Beginner (Fresh starting)">Beginner (Zero prior knowledge / fresh enthusiast)</option>
                  <option value="Hobbyist (Basic camera handling)">Hobbyist (Shoots casually / basic phone edits)</option>
                  <option value="Intermediate (Some client shoots)">Intermediate (Did few freelance jobs, needs mastery)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn w-full !h-12 text-sm font-extrabold tracking-wider bg-black text-white hover:bg-neutral-800"
                >
                  <Sparkles className="w-4 h-4 mr-1 text-white" />
                  Submit Application For 2026 Batch
                </button>
                <div className="text-center text-[11px] text-neutral-500 mt-2">
                  🔒 No spam. We only contact regarding your course syllabus and campus visit.
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
