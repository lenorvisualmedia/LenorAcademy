import React from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, Award } from 'lucide-react';
import { useModalScrollLock } from '../utils/modalScrollLock';

export interface CertificateData {
  title: string;
  subtitle: string;
  issuer: string;
  image: string;
  signatory: string;
  badge: string;
}

interface CertificateModalProps {
  certificate: CertificateData | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  useModalScrollLock(!!certificate, onClose);

  if (!certificate) return null;

  const modalContent = (
    <div 
      data-lenor-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div 
        className="relative w-full max-w-4xl bg-neutral-900 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-300 block">
                {certificate.badge}
              </span>
              <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug">
                {certificate.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
            aria-label="Close certificate modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Image Canvas */}
        <div className="flex-1 overflow-auto py-4 flex items-center justify-center bg-black/50 rounded-xl my-2">
          <img 
            src={certificate.image} 
            alt={certificate.title}
            className="max-w-full max-h-[65vh] w-auto h-auto object-contain rounded-lg shadow-2xl border border-white/10"
          />
        </div>

        {/* Footer Details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs text-neutral-300 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Authority:</strong> {certificate.issuer} · {certificate.signatory}</span>
          </div>
          <span className="text-neutral-400 font-mono text-[11px]">
            Official Government &amp; ISO Accredited Format
          </span>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export default CertificateModal;
