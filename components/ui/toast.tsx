'use client'

import * as React from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ToastMessage {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

type ToastInput = {
  title: string
  description?: string
  type?: 'success' | 'error' | 'info'
  variant?: 'default' | 'destructive'
}

type ToastListener = (msg: ToastMessage) => void
const toastListeners = new Set<ToastListener>()

export const toast = Object.assign(
  (msg: ToastInput) => {
    const id = Math.random().toString(36).substring(2, 9)
    const toastType = msg.type || (msg.variant === 'destructive' ? 'error' : 'info')
    const fullToast: ToastMessage = {
      type: toastType,
      title: msg.title,
      description: msg.description,
      id,
    }
    toastListeners.forEach((listener) => listener(fullToast))
  },
  {
    add: (msg: ToastInput) => {
      const id = Math.random().toString(36).substring(2, 9)
      const fullToast: ToastMessage = {
        type: msg.type || 'info',
        ...msg,
        id,
      }
      toastListeners.forEach((listener) => listener(fullToast))
    },
    success: (title: string, description?: string) => {
      toast({ title, description, type: 'success' })
    },
    error: (title: string, description?: string) => {
      toast({ title, description, type: 'error' })
    },
    info: (title: string, description?: string) => {
      toast({ title, description, type: 'info' })
    },
  }
)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([])

  React.useEffect(() => {
    const handleNewToast = (newToast: ToastMessage) => {
      setToasts((prev) => [...prev, newToast])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id))
      }, 4000)
    }

    toastListeners.add(handleNewToast)
    return () => {
      toastListeners.delete(handleNewToast)
    }
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-5',
              t.type === 'success' && 'border-emerald-500/30 bg-emerald-950/90 text-emerald-100 dark:bg-card dark:text-foreground dark:border-emerald-500/40',
              t.type === 'error' && 'border-destructive/40 bg-card text-destructive shadow-red-950/20',
              (!t.type || t.type === 'info') && 'border-border bg-card text-foreground'
            )}
          >
            {t.type === 'success' && <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />}
            {t.type === 'error' && <AlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />}
            {(!t.type || t.type === 'info') && <Info className="size-5 text-primary shrink-0 mt-0.5" />}
            <div className="flex-1">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.description && <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-muted-foreground hover:text-foreground rounded-lg p-1 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export function useToast() {
  return { toast }
}
