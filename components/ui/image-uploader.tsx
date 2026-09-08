'use client'

import React, { useState, useRef } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle2, Link as LinkIcon } from 'lucide-react'
import { Button } from './button'
import { Input } from './input'
import { toast } from './toast'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string, storageId?: Id<'_storage'>) => void
  label?: string
  description?: string
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto'
  className?: string
  placeholder?: string
}

export function ImageUploader({
  value,
  onChange,
  label,
  description,
  aspectRatio = 'auto',
  className,
  placeholder = 'Upload image to Convex Storage',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [customUrl, setCustomUrl] = useState('')
  const [imageError, setImageError] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const resolveStorageUrl = useMutation(api.files.resolveStorageUrl)

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.add({
        title: 'Invalid file',
        description: 'Please upload a valid image file (PNG, JPG, WEBP, SVG, etc.).',
        type: 'error',
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.add({
        title: 'File too large',
        description: 'Max file size allowed is 10MB.',
        type: 'error',
      })
      return
    }

    try {
      setIsUploading(true)
      setImageError(false)

      // 1. Get Convex upload URL
      const postUrl = await generateUploadUrl()

      // 2. Upload binary file directly to Convex storage
      const res = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      })

      if (!res.ok) {
        throw new Error('Failed to upload file to Convex storage')
      }

      const { storageId } = await res.json()

      // 3. Resolve the direct Convex storage URL
      let publicUrl = await resolveStorageUrl({ storageId: storageId as Id<'_storage'> })

      if (!publicUrl) {
        const convexSiteUrl =
          process.env.NEXT_PUBLIC_CONVEX_SITE_URL ||
          (process.env.NEXT_PUBLIC_CONVEX_URL ? process.env.NEXT_PUBLIC_CONVEX_URL.replace('.cloud', '.site') : '')
        publicUrl = `${convexSiteUrl}/api/storage/${storageId}`
      }

      onChange(publicUrl, storageId as Id<'_storage'>)

      toast.add({
        title: 'Image Uploaded',
        description: 'Image saved and resolved from Convex Storage.',
        type: 'success',
      })
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.add({
        title: 'Upload failed',
        description: error?.message || 'Could not upload image to Convex storage',
        type: 'error',
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customUrl.trim()) {
      setImageError(false)
      onChange(customUrl.trim())
      setShowUrlInput(false)
      setCustomUrl('')
    }
  }

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square max-w-[200px]'
      : aspectRatio === 'video'
        ? 'aspect-video w-full'
        : aspectRatio === 'wide'
          ? 'aspect-[2.4/1] w-full'
          : 'min-h-[140px] w-full'

  return (
    <div className={cn('space-y-2', className)}>
      {label && <label className="text-xs font-semibold text-foreground/90">{label}</label>}
      {description && <p className="text-[11px] text-muted-foreground">{description}</p>}

      {value && !imageError ? (
        <div className="relative group overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-2 backdrop-blur-xs">
          <div className={cn('relative overflow-hidden rounded-xl bg-muted/40 flex items-center justify-center', aspectClass)}>
            <img
              src={value}
              alt="Uploaded preview"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="rounded-lg text-xs font-semibold"
              >
                {isUploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5 mr-1" />}
                Change
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  setImageError(false)
                  onChange('')
                }}
                className="rounded-lg text-xs"
              >
                <X className="size-3.5 mr-1" />
                Remove
              </Button>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
            <span className="truncate max-w-[240px] font-mono">{value}</span>
            <span className="flex items-center gap-1 text-emerald-500 font-medium shrink-0">
              <CheckCircle2 className="size-3" /> Ready
            </span>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer',
            isDragging
              ? 'border-primary bg-primary/10 scale-[0.99]'
              : 'border-border/70 bg-card/40 hover:border-primary/50 hover:bg-card/70',
            aspectClass
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="size-7 animate-spin text-primary" />
              <p className="text-xs font-medium text-foreground">Uploading to Convex Storage...</p>
              <p className="text-[11px] text-muted-foreground">Please wait while we process the image</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Upload className="size-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">
                  {imageError ? 'Image failed to load. Click to upload a new one' : placeholder}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Drag & drop, or click to browse (PNG, JPG, WEBP up to 10MB)
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowUrlInput(!showUrlInput)
                  }}
                  className="rounded-lg h-7 text-[11px]"
                >
                  <LinkIcon className="size-3 mr-1" />
                  Or enter URL
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {showUrlInput && (!value || imageError) && (
        <form onSubmit={handleCustomUrlSubmit} className="mt-2 flex gap-2">
          <Input
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="text-xs h-8"
          />
          <Button type="submit" size="sm" className="h-8 text-xs">
            Set URL
          </Button>
        </form>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0])
          }
        }}
      />
    </div>
  )
}
