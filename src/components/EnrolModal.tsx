import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Phone, Mail, User, MapPin, Building, Home, CreditCard } from 'lucide-react';
import { PROGRAMMES, ACADEMY_INFO } from '../data/academyData';

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
    setNeedHostel(false);
    setNeedEMI(false);
    onClose();
  };

  const currentProg = PROGRAMMES.find(p => p.id === selectedProgram) || PROGRAMMES[0];

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
              Thank you, <strong className="text-black">{name || 'Creator'}</strong>. Our Senior Admissions Counsellor will connect with you via WhatsApp & Call at <strong className="text-black">{phone}</strong> within 24 hours.
            </p>
            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 text-left w-full mb-6 space-y-1.5">
              <div className="font-bold text-black mb-2 text-sm">Enrolment Summary:</div>
              <div><strong>Programme:</strong> {currentProg.name} ({currentProg.duration})</div>
              <div><strong>Campus:</strong> {campus === 'makkaraparamba' ? 'Makkaraparamba, Malappuram (South, North & Studio Campus)' : 'Madavanna, Ernakulam (Kochi)'}</div>
              <div><strong>Hostel Assistance:</strong> {needHostel ? 'Requested (Hostel details will be shared)' : 'Not requested'}</div>
              <div><strong>Bajaj Finance EMI:</strong> {needEMI ? 'Requested (Bajaj team will coordinate)' : 'Standard fee schedule'}</div>
              <div><strong>Admissions Desk:</strong> {ACADEMY_INFO.phone}</div>
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
              <div className="eye text-neutral-600">Admissions & Enrolment · 2026 Batch</div>
              <h2 className="h1 text-3xl sm:text-4xl text-black mt-1">
                Begin Your Journey
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-light">
                Zero equipment fee. Practise with our RED Epic cinema rig, Sony & Nikon cameras, DJI gimbals & drones. Max 28–30 students per batch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Program Picker Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Select Programme *
                </label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-3 text-sm text-black font-semibold focus:outline-none focus:border-black transition-colors"
                >
                  <optgroup label="Flagship & Long-Term Programmes">
                    <option value="media-master">MMP – Media Master Programme — 1 Year (₹ 1,49,000 · 100% Placement Guarantee)</option>
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
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-neutral-500 px-1">
                  <span>Selected: <strong className="text-black">{currentProg.duration}</strong> · {currentProg.badge}</span>
                  <span className="font-bold text-emerald-700">{currentProg.price}</span>
                </div>
              </div>

              {/* Campus Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Preferred Campus Branch *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCampus('makkaraparamba')}
                    className={`p-3 rounded-xl text-left border text-xs transition-all flex items-start gap-2.5 ${
                      campus === 'makkaraparamba'
                        ? 'border-black bg-neutral-100 text-black shadow-sm ring-1 ring-black'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-black'
                    }`}
                  >
                    <Building className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Makkaraparamba, Malappuram</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">South, North, Studio Campuses & Theatre</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCampus('ernakulam')}
                    className={`p-3 rounded-xl text-left border text-xs transition-all flex items-start gap-2.5 ${
                      campus === 'ernakulam'
                        ? 'border-black bg-neutral-100 text-black shadow-sm ring-1 ring-black'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-black'
                    }`}
                  >
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Madavanna, Ernakulam (Kochi)</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">Town branch with transit & PG links</div>
                    </div>
                  </button>
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
                    Current City / Town *
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

              {/* Facilities check */}
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <label className="flex items-center gap-2.5 text-xs text-neutral-800 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={needHostel}
                    onChange={(e) => setNeedHostel(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black"
                  />
                  <Home className="w-3.5 h-3.5 text-neutral-500" />
                  <span>I require Hostel / Accommodation assistance in Malappuram or Ernakulam</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-neutral-800 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={needEMI}
                    onChange={(e) => setNeedEMI(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black"
                  />
                  <CreditCard className="w-3.5 h-3.5 text-neutral-500" />
                  <span>I would like to explore the <strong>Bajaj Finance Easy EMI</strong> payment option</span>
                </label>
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
                  🔒 No spam. We only contact regarding your course syllabus, hostel options, and campus visit.
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolModal;
