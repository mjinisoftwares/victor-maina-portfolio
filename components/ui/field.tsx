import * as React from 'react'
import { Label } from './label'
import { cn } from '@/lib/utils'
import { type FieldError as RHFFieldError } from 'react-hook-form'

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn('flex flex-col gap-4', className)}
      {...props}
    />
  )
}

function Field({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn('text-sm font-medium text-foreground', className)}
      {...props}
    />
  )
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn('text-xs text-muted-foreground', className)}
      {...props}
    />
  )
}

interface FieldErrorProps extends React.ComponentProps<'p'> {
  errors?: (RHFFieldError | { message?: string } | string | undefined | null)[]
}

function FieldError({
  className,
  errors,
  children,
  ...props
}: FieldErrorProps) {
  if (children) {
    return (
      <p
        data-slot="field-error"
        className={cn('text-xs text-destructive font-medium', className)}
        {...props}
      >
        {children}
      </p>
    )
  }

  if (!errors || errors.length === 0) return null

  const errorMessages = errors
    .map((err) => {
      if (!err) return null
      if (typeof err === 'string') return err
      return err.message
    })
    .filter(Boolean)

  if (errorMessages.length === 0) return null

  return (
    <div
      data-slot="field-error"
      className={cn('flex flex-col gap-1', className)}
    >
      {errorMessages.map((msg, index) => (
        <p key={index} className="text-xs text-destructive font-medium">
          {msg}
        </p>
      ))}
    </div>
  )
}

export {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
}
