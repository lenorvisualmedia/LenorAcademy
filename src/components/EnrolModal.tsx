import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Sparkles, Phone, Mail, User, MapPin, Building, Home, CreditCard } from 'lucide-react';
import { PROGRAMMES, ACADEMY_INFO } from '../data/academyData';
import { useModalScrollLock } from '../utils/modalScrollLock';

interface EnrolModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgramId?: string;
}

export const EnrolModal: React.FC<EnrolModalProps> = ({ isOpen, onClose, defaultProgramId }) => {
  const [selectedProgram, setSelectedProgram] = useState(defaultProgramId || 'media-master');
  const [campus, setCampus] = useState<'makkaraparamba' | 'ernakulam'>('makkaraparamba');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('Beginner (Fresh starting)');
  const [needHostel, setNeedHostel] = useState(false);
  const [needEMI, setNeedEMI] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync selectedProgram whenever defaultProgramId prop changes or modal opens
  useEffect(() => {
    if (defaultProgramId) {
      const direct = PROGRAMMES.find(p => p.id.toLowerCase() === defaultProgramId.toLowerCase());
      if (direct) {
        setSelectedProgram(direct.id);
        return;
      }
      const idClean = defaultProgramId.toLowerCase();
      const match = PROGRAMMES.find(p => 
        p.id.toLowerCase().includes(idClean) || 
        idClean.includes(p.id.toLowerCase()) ||
        p.name.toLowerCase().includes(idClean)
      );
      if (match) {
        setSelectedProgram(match.id);
      }
    }
  }, [defaultProgramId, isOpen]);

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setLocation('');
    setNeedHostel(false);
    setNeedEMI(false);
    onClose();
  };

  // Lock background scroll and pause Lenis while modal is open
  useModalScrollLock(isOpen, handleReset);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const currentProg = PROGRAMMES.find(p => p.id === selectedProgram) || PROGRAMMES[0];

  const modalContent = (
    <div 
      data-lenor-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={handleReset}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div 
        className="relative w-full max-w-lg !bg-white !text-black border border-neutral-200 rounded-[24px] p-5 sm:p-6 shadow-2xl overflow-hidden max-h-[88vh] overflow-y-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-6 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 border border-emerald-300">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="h1 text-2xl font-black text-black mb-1.5">
              Application Received!
            </h3>
            <p className="text-neutral-700 text-xs sm:text-sm max-w-sm mb-4 leading-relaxed">
              Thank you, <strong className="text-black">{name || 'Creator'}</strong>. Our Admissions Team will connect with you via WhatsApp &amp; Call at <strong className="text-black">{phone}</strong> within 24 hours.
            </p>
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 text-left w-full mb-4 space-y-1">
              <div className="font-bold text-black text-xs uppercase tracking-wider mb-1.5">Enrolment Summary:</div>
              <div><strong>Programme:</strong> {currentProg.name} ({currentProg.duration})</div>
              <div><strong>Campus:</strong> {campus === 'makkaraparamba' ? 'Makkaraparamba, Malappuram' : 'Madavanna, Ernakulam (Kochi)'}</div>
              <div><strong>Hostel Assistance:</strong> {needHostel ? 'Requested' : 'Not needed'}</div>
              <div><strong>Bajaj Finance EMI:</strong> {needEMI ? 'Requested' : 'Standard'}</div>
              <div><strong>Admissions Desk:</strong> {ACADEMY_INFO.phone}</div>
            </div>
            <button
              onClick={handleReset}
              className="btn w-full !h-10 text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-neutral-800"
            >
              Done &amp; Explore Academy
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4 pr-6">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500">
                Admissions &amp; Enrolment · 2026 Batch
              </div>
              <h2 className="h1 text-2xl sm:text-3xl text-black font-black tracking-tight mt-0.5">
                Begin Your Journey
              </h2>
              <p className="text-xs text-neutral-600 mt-1 font-light">
                Zero equipment fee. 1 Camera per 3–4 students, 1 PC per student. Max 28–30 per batch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Program Picker Dropdown */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                    Select Programme *
                  </label>
                  <span className="text-[11px] font-bold text-emerald-700 font-mono">
                    {currentProg.price}
                  </span>
                </div>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-black font-semibold focus:outline-none focus:border-black transition-colors"
                >
                  <optgroup label="Flagship & Long-Term Programmes">
                    <option value="media-master">MMP – Media Master Programme — 1 Year (₹ 1,49,000 · 100% Placement)</option>
                    <option value="visual-media-production">VMP – Visual Media Production — 6 Months (₹ 65,220)</option>
                    <option value="media-designing-editing">Media Design and Editing Professional — 6 Months (₹ 64,000)</option>
                  </optgroup>
                  <optgroup label="Professional 3-Month Courses">
                    <option value="diploma-graphic-designing">Graphic Designing Course — 3 Months (₹ 34,000)</option>
                    <option value="professional-editing-course">Editing Course — 3 Months (₹ 34,000)</option>
                  </optgroup>
                  <optgroup label="Fast-Track & Practical Courses">
                    <option value="photography-videography-course">2-Month Course (Photography) — 2 Months (₹ 22,420)</option>
                    <option value="videography-crash-course">6-Day Videography Course — 6 Days (₹ 8,600)</option>
                    <option value="drone-course">5-Day Drone Course — 5 Days (₹ 5,990)</option>
                  </optgroup>
                </select>
              </div>

              {/* Campus Selection - Compact Segmented Control */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Preferred Campus Branch *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCampus('makkaraparamba')}
                    className={`py-2 px-3 rounded-xl text-left border text-xs transition-all flex items-center gap-2 ${
                      campus === 'makkaraparamba'
                        ? 'border-black bg-black text-white shadow-sm'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-black'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5 shrink-0" />
                    <div className="truncate">
                      <div className="font-bold truncate text-[11px]">Makkaraparamba</div>
                      <div className="text-[9px] opacity-75 truncate">Main Branch · 3 Campuses</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCampus('ernakulam')}
                    className={`py-2 px-3 rounded-xl text-left border text-xs transition-all flex items-center gap-2 ${
                      campus === 'ernakulam'
                        ? 'border-black bg-black text-white shadow-sm'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-black'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <div className="truncate">
                      <div className="font-bold truncate text-[11px]">Kochi (Madavanna)</div>
                      <div className="text-[9px] opacity-75 truncate">Town Branch &amp; Transit</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Full Name & WhatsApp Phone - 2 Column Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Menon"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    WhatsApp Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Email & City - 2 Column Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    City / Town *
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Malappuram / Calicut"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Current Level with Cameras / Editing
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-black transition-colors"
                >
                  <option value="Beginner (Fresh starting)">Beginner (Zero prior knowledge / fresh enthusiast)</option>
                  <option value="Hobbyist (Basic camera handling)">Hobbyist (Shoots casually / basic phone edits)</option>
                  <option value="Intermediate (Some client shoots)">Intermediate (Did few freelance jobs, needs mastery)</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={needHostel}
                    onChange={(e) => setNeedHostel(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-neutral-300 text-black focus:ring-black"
                  />
                  <Home className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>Hostel / Accommodation assistance in Malappuram or Kochi</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={needEMI}
                    onChange={(e) => setNeedEMI(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-neutral-300 text-black focus:ring-black"
                  />
                  <CreditCard className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>Bajaj Finance <strong>Easy EMI</strong> monthly installment assistance</span>
                </label>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="btn w-full !h-10 text-xs font-black uppercase tracking-wider bg-black text-white hover:bg-neutral-800 rounded-xl shadow-lg"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-white" />
                  Submit Application For 2026 Batch
                </button>
                <div className="text-center text-[10px] text-neutral-500 mt-1.5">
                  🔒 No spam. We only contact regarding your course syllabus, hostel, and campus visit.
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export default EnrolModal;
