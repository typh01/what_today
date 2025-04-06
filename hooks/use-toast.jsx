"use client"

import { createContext, useContext, useState } from "react"

const ToastContext = createContext({
  toast: () => {},
  toasts: [],
  dismissToast: () => {},
})

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = ({ title, description, variant = "default", duration = 3000 }) => {
    const id = Date.now().toString()
    const newToast = { id, title, description, variant, duration }

    setToasts((prev) => [...prev, newToast])

    // Auto dismiss
    setTimeout(() => {
      dismissToast(id)
    }, duration)

    return id
  }

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast, toasts, dismissToast }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed bottom-0 right-0 p-4 z-50 flex flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`p-4 rounded-md shadow-md max-w-md animate-in slide-in-from-right-full 
                ${toast.variant === "destructive" ? "bg-destructive text-destructive-foreground" : "bg-background border"}`}
            >
              {toast.title && <h3 className="font-medium">{toast.title}</h3>}
              {toast.description && <p className="text-sm">{toast.description}</p>}
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

