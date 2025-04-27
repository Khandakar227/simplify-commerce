"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Toast {
  id: number;
  message: string;
}

interface ToastContextType {
  showToast: () => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = () => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message: "Product added to cart" }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center">
        {toasts.map((toast) => (
          <div key={toast.id} className="bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Add a simple fade-in animation
// In your global CSS, add:
// @keyframes fade-in { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: none; } }
// .animate-fade-in { animation: fade-in 0.3s; } 