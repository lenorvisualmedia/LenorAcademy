import { useEffect } from 'react';

/**
 * Custom hook to lock both standard browser scrolling and Lenis smooth scrolling
 * when a modal, lightbox, or dialog is open.
 */
export function useModalScrollLock(isOpen: boolean, onClose?: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    // 1. Lock document and body scroll
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // 2. Pause Lenis smooth scroll globally
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop();
    }

    // 3. Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      // Check if any other modal is still mounted
      const remainingModals = document.querySelectorAll('[data-lenor-modal="true"]');
      if (remainingModals.length <= 1) {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;

        if (lenis && typeof lenis.start === 'function') {
          lenis.start();
        }
      }
    };
  }, [isOpen, onClose]);
}

