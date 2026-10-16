import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type ToastValue = {
  toast: string | null;
  notify: (message: string) => void;
};

const ToastContext = createContext<ToastValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number>(0);

  const notify = useCallback((message: string) => {
    window.clearTimeout(timer.current);
    setToast(message);
    timer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  return <ToastContext.Provider value={{ toast, notify }}>{children}</ToastContext.Provider>;
}

export function useToastContext(): ToastValue {
  const value = useContext(ToastContext);
  if (value === null) throw new Error('useToastContext must be used inside ToastProvider');
  return value;
}

export function ToastViewport() {
  const { toast } = useToastContext();
  if (toast === null) return null;
  return (
    <div className="toast" role="status">
      {toast}
    </div>
  );
}
