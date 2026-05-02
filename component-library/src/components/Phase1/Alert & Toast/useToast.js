import { useState, useCallback } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({
    variant = 'info',
    title = '',
    description = '',
    duration = 4000,
  }) => {
    const id = Date.now();     

    setToasts(prev => [...prev, { id, variant, title, description, duration }]);

    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
  }, []);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  toast.success = (title, description) =>
    toast({ variant: 'success', title, description });
  toast.error   = (title, description) =>
    toast({ variant: 'danger',  title, description });
  toast.warning = (title, description) =>
    toast({ variant: 'warning', title, description });
  toast.info    = (title, description) =>
    toast({ variant: 'info',    title, description });

  return { toast, toasts, dismiss };
}