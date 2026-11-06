import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, FileText, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { useModalScrollLock } from '../utils/modalScrollLock';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState('');
  const [whatsappSent, setWhatsappSent] = useState(false);

  useModalScrollLock(isOpen, onClose);

  if (!isOpen) return null;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setWhatsappSent(true);
  };

  const modalContent = (
    <div 
      data-lenor-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div 
        className="relative w-full max-w-md !bg-white !text-black border border-neutral-200 rounded-[24px] p-5 sm:p-7 shadow-2xl max-h-[88vh] overflow-y-auto overscroll-contain minimal-scrollbar"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
          aria-label="Close brochure modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-3 pr-6">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">Official Curriculum</div>
            <h3 className="h1 text-xl sm:text-2xl font-black text-black">Brochure 2026</h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-700 font-light mb-4 leading-relaxed">
          Download our comprehensive prospectus detailing the complete syllabus for Media Master (1 Year) and Visual Media Production (6 Months), fee structures, gear access lists, and placement records.
        </p>

        {/* Direct Download Button */}
        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="font-bold text-black text-xs">PDF Prospectus (English &amp; Malayalam)</div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Updated with 2026 course fees</div>
          </div>
          <a
            href="/assets/lenor-brochure.pdf"
            download="Lenor-Academy-Prospectus-2026.pdf"
            onClick={() => {
              alert("Lenor Academy Prospectus 2026 download started!");
            }}
            className="btn !h-9 !px-4 text-xs font-bold bg-black text-white hover:bg-neutral-800 shrink-0 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>
        </div>

        {/* Send to WhatsApp Form */}
        <div className="pt-3 border-t border-neutral-200">
          <div className="text-xs font-bold text-black mb-1">
            Or receive syllabus instantly on WhatsApp:
          </div>
          {whatsappSent ? (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Brochure &amp; fee breakdown sent to <strong>{phone}</strong>!</span>
            </div>
          ) : (
            <form onSubmit={handleSendWhatsApp} className="flex gap-2 mt-2">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp Phone Number"
                className="flex-1 bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="btn !h-9 !px-4 text-xs font-bold bg-neutral-900 text-white hover:bg-black shrink-0"
              >
                Send PDF
              </button>
            </form>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
          <span>Admissions Desk: {ACADEMY_INFO.phone}</span>
          <button onClick={onClose} className="hover:text-black underline font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export default BrochureModal;
