import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState('');
  const [whatsappSent, setWhatsappSent] = useState(false);

  if (!isOpen) return null;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setWhatsappSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg !bg-white !text-black border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-black">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="eye text-neutral-600">Official Curriculum</div>
            <h3 className="h1 text-2xl font-black text-black">Brochure 2026</h3>
          </div>
        </div>

        <p className="text-sm text-neutral-700 font-light mb-6 leading-relaxed">
          Download our comprehensive prospectus detailing the complete syllabus for Media Master (1 Year) and Visual Media Production (6 Months), fee structures, gear access lists, and placement records.
        </p>

        {/* Direct Download Button */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="font-bold text-sm text-black">Official Prospectus PDF</div>
            <div className="text-xs text-neutral-600">11 Pages · Complete 2026 Curriculum · 16 MB</div>
          </div>
          <a
            href={ACADEMY_INFO.brochurePath}
            download="Lenor_Academy_Official_Brochure_2026.pdf"
            className="btn !h-10 !px-4 text-xs shrink-0 flex items-center gap-1.5 bg-black text-white hover:bg-neutral-800"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>

        {/* Or receive on WhatsApp */}
        <div className="pt-4 border-t border-neutral-200">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
            Or receive syllabus directly via WhatsApp
          </div>

          {whatsappSent ? (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Brochure sent to <strong>{phone}</strong>! Check your WhatsApp momentarily.</span>
            </div>
          ) : (
            <form onSubmit={handleSendWhatsApp} className="flex gap-2">
              <div className="relative flex-1">
                <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter WhatsApp Number"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3 py-2 text-xs text-black placeholder-neutral-500 focus:outline-none focus:border-black"
                />
              </div>
              <button
                type="submit"
                className="btn !h-9 !px-4 text-xs whitespace-nowrap bg-black text-white hover:bg-neutral-800"
              >
                Send to WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
