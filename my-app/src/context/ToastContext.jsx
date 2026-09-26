"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message }]);
      const timer = setTimeout(() => dismiss(id), 3200);
      timers.current.set(id, timer);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-toast-in pointer-events-auto flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-4 py-3 shadow-2xl shadow-black/40"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
            <p className="flex-1 text-sm font-medium text-foreground">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 text-muted transition-colors hover:text-foreground"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
