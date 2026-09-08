'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DialogContextValue {
  onOpenChange?: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue>({})

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  // Lock body scroll while dialog is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <DialogContext.Provider value={{ onOpenChange }}>
      {/* Full-screen overlay — flex center both axes, padding prevents edge-hugging on mobile */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        />
        {/* Content wrapper — no max-w here, let DialogContent control its own width */}
        <div className="relative z-50 flex w-full items-center justify-center">
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  )
}

function DialogContent({
  className,
  children,
  onClose,
  ...props
}: React.ComponentProps<'div'> & { onClose?: () => void }) {
  const context = React.useContext(DialogContext)

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else if (context.onOpenChange) {
      context.onOpenChange(false)
    }
  }

  return (
    <div
      data-slot="dialog-content"
      className={cn(
        // Base: full width constrained to parent, scrollable vertically, centered
        'relative w-full max-h-[88vh] overflow-y-auto',
        // Default sizing — can be overridden with className (e.g. w-[75vw] max-w-6xl)
        'max-w-2xl',
        // Visual polish
        'rounded-2xl border border-border bg-card shadow-2xl',
        'p-6 sm:p-8',
        // Smooth entrance feel
        'animate-in fade-in-0 zoom-in-95 duration-200',
        className
      )}
      {...props}
    >
      {/* Always show a close button */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close dialog"
        className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </button>

      {children}
    </div>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col space-y-1.5 pr-8 text-left', className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'mt-6 flex flex-col-reverse gap-2 border-t border-border/60 pt-4 sm:flex-row sm:justify-end sm:gap-0 sm:space-x-2',
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="dialog-title"
      className={cn('text-xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="dialog-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
