'use client'

import React, { useState, useRef } from 'react'
import {
  Bold,
  Italic,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Link as LinkIcon,
  Minus,
  Eye,
  Edit3,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Info,
  X,
  Plus,
  LayoutTemplate,
  Sparkles,
  FileCheck
} from 'lucide-react'
import { YoutubeIcon } from './icons'
import { Button } from './button'
import { Input } from './input'
import { ImageUploader } from './image-uploader'
import { RichTextRenderer } from './rich-text-renderer'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  value?: string
  onChange: (val: string) => void
  label?: string
  placeholder?: string
  minHeight?: string
  className?: string
}

function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export const PREBUILT_TEMPLATES = [
  {
    id: 'case-study',
    title: 'Project Case Study',
    description: 'Problem statement, technical architecture, and measurable client results.',
    badge: 'Projects',
    content: `### 1. Problem & Business Objective
Explain the challenge the client was facing and what the business required.

### 2. Architecture & Solution
Describe the technological foundation, tools chosen, and core engineering decisions.

- **Frontend**: Next.js App Router, TypeScript, Tailwind CSS.
- **Backend & State**: Convex reactive database, real-time sync, and edge caching.
- **Auth & Storage**: Secure session management and cloud asset storage.

### 3. Key Results & Metrics
- **Performance**: 98+ Google Lighthouse score.
- **Conversion / User Growth**: +35% engagement increase post-launch.

:::callout[tip]
Full test coverage and continuous deployment automated with GitHub Actions.
:::`
  },
  {
    id: 'service-offering',
    title: 'Service Scope & Deliverables',
    description: 'Overview, detailed deliverables, development milestones, and prerequisites.',
    badge: 'Services',
    content: `### Service Overview
A tailored engineering solution built for rapid execution, resilience, and obsessive polish.

#### What Is Included
- **Discovery & Requirements**: Comprehensive audit and technical specification.
- **Core Engineering**: Clean, scalable code adhering to industry standards.
- **Responsive Testing**: Flawless experience across mobile, tablet, and ultra-wide screens.
- **Handoff & Documentation**: Video walkthrough, source code handoff, and launch guidance.

#### Process & Timeline
1. **Week 1**: Design prototypes and database modeling.
2. **Week 2-3**: Full-stack build and API integration.
3. **Week 4**: QA, security audit, and production deployment.

:::callout[info]
Includes 14 days of dedicated post-launch support and bug fixes at zero extra cost.
:::`
  },
  {
    id: 'template-kit',
    title: 'Product / Starter Kit Showcase',
    description: 'Features overview, tech stack, documentation, and installation instructions.',
    badge: 'Templates',
    content: `### Product Highlights
Everything you need to ship a modern production application with minimal setup.

#### Features Included:
- **Zero Config Setup**: Clone and deploy to Vercel or Netlify in under 5 minutes.
- **TypeScript First**: Full end-to-end type safety from database to UI components.
- **Dark Mode Ready**: Beautiful dark and light palettes out of the box.

#### Getting Started:
\`\`\`bash
# 1. Clone the repository
git clone https://github.com/example/starter-kit.git

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
\`\`\`

:::callout[tip]
Commercial license includes unlimited personal and client projects with lifetime updates.
:::`
  },
  {
    id: 'feature-spec',
    title: 'Feature Breakdown & Callout',
    description: 'Bullet points with technical highlights and callout banner.',
    badge: 'General',
    content: `### Key Capabilities & Highlights

A focused breakdown of core capabilities:

- **Sub-second Response Times**: Optimized asset delivery and edge routing.
- **Modern Security**: CSRF protection, input validation, and secure auth tokens.
- **Accessibility**: WCAG 2.1 AA compliant typography, contrast, and keyboard navigation.

:::callout[tip]
Easily extensible with your own plugins, custom components, and third-party APIs.
:::`
  }
]

export function RichTextEditor({
  value = '',
  onChange,
  label = 'Article Body Content',
  placeholder = 'Write your article here in rich formatting or markdown...',
  minHeight = '360px',
  className,
}: RichTextEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview' | 'split'>('edit')
  const [showImageModal, setShowImageModal] = useState(false)
  const [showYoutubeModal, setShowYoutubeModal] = useState(false)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [showTemplatesModal, setShowTemplatesModal] = useState(false)

  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageCaption, setImageCaption] = useState('')

  const [youtubeInput, setYoutubeInput] = useState('')
  const [youtubeError, setYoutubeError] = useState('')

  const [linkText, setLinkText] = useState('')
  const [linkUrl, setLinkUrl] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertTextAtCursor = (before: string, after: string = '', defaultText: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const currentVal = textarea.value
    const selected = currentVal.substring(start, end) || defaultText

    const replacement = `${before}${selected}${after}`
    const nextVal = currentVal.substring(0, start) + replacement + currentVal.substring(end)

    onChange(nextVal)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length)
    }, 10)
  }

  const handleInsertImage = () => {
    if (!uploadedImageUrl) return
    const caption = imageCaption.trim() || 'Image'
    const tag = `\n![${caption}](${uploadedImageUrl})\n`
    insertTextAtCursor(tag, '', '')
    setUploadedImageUrl('')
    setImageCaption('')
    setShowImageModal(false)
  }

  const handleInsertYoutube = () => {
    const id = extractYouTubeId(youtubeInput.trim())
    if (!id) {
      setYoutubeError('Please enter a valid YouTube video URL')
      return
    }

    const tag = `\n:::youtube[${id}]:::\n`
    insertTextAtCursor(tag, '', '')
    setYoutubeInput('')
    setYoutubeError('')
    setShowYoutubeModal(false)
  }

  const handleInsertLink = () => {
    if (!linkUrl.trim()) return
    const label = linkText.trim() || linkUrl.trim()
    const tag = `[${label}](${linkUrl.trim()})`
    insertTextAtCursor(tag, '', '')
    setLinkText('')
    setLinkUrl('')
    setShowLinkModal(false)
  }

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0
  const charCount = value.length

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-foreground">{label}</label>
          <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
            <span>{wordCount} words</span>
            <span>•</span>
            <span>{charCount} chars</span>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Editor Toolbar */}
        <div className="flex flex-wrap items-center justify-between border-b border-border bg-muted/40 p-2 gap-1.5">
          <div className="flex flex-wrap items-center gap-1">
            {/* Headings */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => insertTextAtCursor('\n## ', '\n', 'Heading 2')}
              title="Heading 2"
            >
              <Heading2 className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => insertTextAtCursor('\n### ', '\n', 'Heading 3')}
              title="Heading 3"
            >
              <Heading3 className="size-4" />
            </Button>

            <div className="h-4 w-px bg-border mx-1" />

            {/* Bold, Italic, Code */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => insertTextAtCursor('**', '**', 'bold text')}
              title="Bold"
            >
              <Bold className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => insertTextAtCursor('*', '*', 'italic text')}
              title="Italic"
            >
              <Italic className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => insertTextAtCursor('`', '`', 'code')}
              title="Inline Code"
            >
              <Code className="size-4" />
            </Button>

            <div className="h-4 w-px bg-border mx-1" />

            {/* Lists & Blockquote */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => insertTextAtCursor('\n- ', '\n', 'List item')}
              title="Bullet List"
            >
              <List className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => insertTextAtCursor('\n1. ', '\n', 'Numbered item')}
              title="Numbered List"
            >
              <ListOrdered className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => insertTextAtCursor('\n> ', '\n', 'Quote text')}
              title="Blockquote"
            >
              <Quote className="size-4" />
            </Button>

            <div className="h-4 w-px bg-border mx-1" />

            {/* Callouts */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs text-primary"
              onClick={() => insertTextAtCursor('\n:::callout[info] ', ' :::\n', 'Important highlight')}
              title="Info Callout"
            >
              <Info className="size-3.5 mr-1" /> Callout
            </Button>

            {/* Code Block */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => insertTextAtCursor('\n```typescript\n', '\n```\n', '// code snippet')}
              title="Code Block"
            >
              Snippet
            </Button>

            <div className="h-4 w-px bg-border mx-1" />

            {/* Media: Image & YouTube */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs font-semibold bg-background"
              onClick={() => setShowImageModal(true)}
            >
              <ImageIcon className="size-3.5 mr-1 text-primary" /> Image (Convex)
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs font-semibold bg-background text-red-500 hover:text-red-600"
              onClick={() => setShowYoutubeModal(true)}
            >
              <YoutubeIcon className="size-3.5 mr-1" /> Video (YouTube)
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setShowLinkModal(true)}
              title="Insert Link"
            >
              <LinkIcon className="size-4" />
            </Button>

            <div className="h-4 w-px bg-border mx-1" />

            {/* Templates Quick Insert */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs font-semibold bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
              onClick={() => setShowTemplatesModal(true)}
              title="Browse & Insert Formatting Templates"
            >
              <LayoutTemplate className="size-3.5 mr-1 text-primary" /> Templates
            </Button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-xl bg-background border border-border p-0.5">
            <button
              type="button"
              onClick={() => setMode('edit')}
              className={cn(
                'flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors',
                mode === 'edit' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Edit3 className="size-3" /> Edit
            </button>
            <button
              type="button"
              onClick={() => setMode('split')}
              className={cn(
                'hidden sm:flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors',
                mode === 'split' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Split
            </button>
            <button
              type="button"
              onClick={() => setMode('preview')}
              className={cn(
                'flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors',
                mode === 'preview' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Eye className="size-3" /> Preview
            </button>
          </div>
        </div>

        {/* Editor Body */}
        <div className="relative">
          {mode === 'edit' && (
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              style={{ minHeight }}
              className="w-full resize-y bg-transparent p-4 text-xs sm:text-sm font-mono leading-relaxed outline-none focus:ring-1 focus:ring-primary"
            />
          )}

          {mode === 'preview' && (
            <div style={{ minHeight }} className="p-6 bg-background/50 overflow-y-auto max-h-[600px]">
              {value ? (
                <RichTextRenderer content={value} />
              ) : (
                <p className="text-xs text-muted-foreground italic">Nothing to preview yet.</p>
              )}
            </div>
          )}

          {mode === 'split' && (
            <div className="grid grid-cols-2 divide-x divide-border" style={{ minHeight }}>
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full resize-none bg-transparent p-4 text-xs font-mono leading-relaxed outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="p-4 bg-background/50 overflow-y-auto max-h-[600px]">
                {value ? (
                  <RichTextRenderer content={value} />
                ) : (
                  <p className="text-xs text-muted-foreground italic">Live preview will show here.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 1. Modal: Upload & Insert Image */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-3xl border border-border bg-background p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h4 className="text-base font-bold flex items-center gap-2">
                <ImageIcon className="size-4 text-primary" />
                Upload Image to Convex Storage
              </h4>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3">
              <ImageUploader
                value={uploadedImageUrl}
                onChange={(url) => setUploadedImageUrl(url)}
                label="Select image to upload"
                aspectRatio="video"
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold">Image Caption / Alt Text</label>
                <Input
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="e.g. Architecture diagram of microservices"
                  className="text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowImageModal(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={!uploadedImageUrl}
                onClick={handleInsertImage}
                className="bg-primary text-primary-foreground font-semibold"
              >
                Insert into Article
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal: Embed YouTube Video */}
      {showYoutubeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-3xl border border-border bg-background p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h4 className="text-base font-bold flex items-center gap-2 text-red-500">
                <YoutubeIcon className="size-5" />
                Embed YouTube Video
              </h4>
              <button
                type="button"
                onClick={() => {
                  setShowYoutubeModal(false)
                  setYoutubeError('')
                }}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">YouTube Video URL</label>
                <Input
                  value={youtubeInput}
                  onChange={(e) => {
                    setYoutubeInput(e.target.value)
                    setYoutubeError('')
                  }}
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="text-xs font-mono"
                />
                {youtubeError && <p className="text-[11px] text-destructive">{youtubeError}</p>}
                <p className="text-[11px] text-muted-foreground">
                  Paste any normal YouTube link or share URL (e.g. youtu.be/...).
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowYoutubeModal(false)
                  setYoutubeError('')
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={!youtubeInput.trim()}
                onClick={handleInsertYoutube}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold"
              >
                Embed Video
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal: Insert Link */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-3xl border border-border bg-background p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h4 className="text-base font-bold flex items-center gap-2">
                <LinkIcon className="size-4 text-primary" />
                Insert Link
              </h4>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Link Text</label>
                <Input
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Visit Convex Documentation"
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">Destination URL</label>
                <Input
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://docs.convex.dev"
                  className="text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowLinkModal(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={!linkUrl.trim()}
                onClick={handleInsertLink}
                className="bg-primary text-primary-foreground font-semibold"
              >
                Insert Link
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal: Pre-Built Formatting Templates */}
      {showTemplatesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-background p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h4 className="text-base font-bold flex items-center gap-2 text-foreground">
                  <LayoutTemplate className="size-4 text-primary" />
                  Rich Content Templates
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Choose a template structure to insert into your editor.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTemplatesModal(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {PREBUILT_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary font-mono">
                        {tmpl.badge}
                      </span>
                    </div>
                    <h5 className="mt-2 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {tmpl.title}
                    </h5>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs rounded-xl"
                      onClick={() => {
                        insertTextAtCursor(`\n\n${tmpl.content}\n\n`, '', '')
                        setShowTemplatesModal(false)
                      }}
                    >
                      Append to Body
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="flex-1 text-xs rounded-xl bg-primary font-semibold"
                      onClick={() => {
                        if (!value.trim() || window.confirm('Replace existing text with this template?')) {
                          onChange(tmpl.content)
                          setShowTemplatesModal(false)
                        }
                      }}
                    >
                      Use as Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-border">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowTemplatesModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
