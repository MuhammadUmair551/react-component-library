import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal }  from 'react-dom';
import { SIZES }         from './Modal.types';

// ─── Close Icon ───
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6"  y2="18"/>
      <line x1="6"  y1="6" x2="18" y2="18"/>
    </svg>
  );
}

// ─── Modal.Header ───
function ModalHeader({ children, onClose, showCloseBtn = true }) {
  return (
    <div className="
      flex items-center justify-between
      px-6 py-4 border-b border-gray-100
      flex-shrink-0
    ">
      <h2 className="text-base font-semibold text-gray-900 leading-snug">
        {children}
      </h2>
      {showCloseBtn && (
        <button
          onClick={onClose}
          className="
            p-2 rounded-lg text-gray-400
            hover:text-gray-600 hover:bg-gray-100
            transition-colors duration-150
            focus:outline-none ml-4
          "
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

// ─── Modal.Body ───
function ModalBody({ children, className = '' }) {
  return (
    <div className={`flex-1 overflow-y-auto px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

// ─── Modal.Footer ───
function ModalFooter({ children, align = 'right', className = '' }) {
  const alignClass = {
    left:   'justify-start',
    center: 'justify-center',
    right:  'justify-end',
    between:'justify-between',
  }[align] ?? 'justify-end';

  return (
    <div className={`
      flex items-center gap-3 flex-wrap
      px-6 py-4 border-t border-gray-100
      flex-shrink-0 ${alignClass} ${className}
    `}>
      {children}
    </div>
  );
}

// ─── Modal (Main) ───
export function Modal({
  isOpen,
  onClose,
  size            = 'md',
  closeOnBackdrop = true,
  closeOnEsc      = true,
  className       = '',
  children,
}) {
  const panelRef = useRef(null);

  // ── Body scroll lock ──
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position   = 'fixed';
      document.body.style.top        = `-${scrollY}px`;
      document.body.style.width      = '100%';
      document.body.style.overflowY  = 'scroll';

      return () => {
        document.body.style.position  = '';
        document.body.style.top       = '';
        document.body.style.width     = '';
        document.body.style.overflowY = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // ── Escape key ──
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose?.();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // ── Backdrop click ──
  const handleBackdropClick = useCallback((e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose?.();
    }
  }, [closeOnBackdrop, onClose]);

  // ── Focus trap ──
  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClass = SIZES[size] ?? SIZES.md;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      className={`
        fixed inset-0 z-50
        bg-black/50 backdrop-blur-[2px]
        flex items-center justify-center
        p-4
        animate-in fade-in duration-200
      `}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`
          relative bg-white rounded-2xl
          shadow-2xl flex flex-col
          max-h-[90vh] ${sizeClass}
          animate-in zoom-in-95 duration-200
          focus:outline-none
          ${className}
        `}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

// ─── Sub-components attach ───
Modal.Header = ModalHeader;
Modal.Body   = ModalBody;
Modal.Footer = ModalFooter;
export default Modal