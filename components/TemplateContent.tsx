'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useWebsiteContent } from '@/hooks/use-website-content'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RichTextRenderer } from '@/components/ui/rich-text-renderer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GithubIcon } from '@/components/ui/icons'
import { getTemplateJsonLd, getBreadcrumbJsonLd } from '@/lib/structured-data'
import {
  ArrowLeft,
  ExternalLink,
  Check,
  ArrowRight,
  ArrowUpRight,
  LayoutTemplate,
  Download,
  Sparkles
} from 'lucide-react'

interface TemplateContentProps {
  id: string
}

export function TemplateContent({ id }: TemplateContentProps) {
  const { content } = useWebsiteContent()

  const templatesList = content.templates?.items || []
  const template = templatesList.find((t) => t.id === id || t.slug === id)
  const relatedTemplates = templatesList
    .filter((t) => t.id !== template?.id)
    .slice(0, 3)

  if (!template) {
    return (
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 mt-6 pb-20">
        <Navbar navigation={content.navigation} />
        <div className="py-24 text-center space-y-4">
          <LayoutTemplate className="mx-auto size-12 text-muted-foreground/50" aria-hidden="true" />
          <h1 className="text-2xl font-bold">Template Not Found</h1>
          <p className="text-sm text-muted-foreground">
            This template does not exist or has been removed.
          </p>
          <Link href="/templates">
            <Button variant="outline" className="rounded-xl">
              <ArrowLeft className="size-4 mr-1.5" aria-hidden="true" /> Back to Templates
            </Button>
          </Link>
        </div>
        <Footer footer={content.footer} general={content.general} />
      </main>
    )
  }

  const templateJsonLd = getTemplateJsonLd(template, content)
  const breadcrumbJsonLd = getBreadcrumbJsonLd(
    [
      { name: 'Home', path: '/' },
      { name: 'Templates', path: '/templates' },
      { name: template.title, path: `/templates/${template.slug || template.id}` },
    ],
    content
  )

  const authorAvatarSrc = content.general.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400'

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 mt-6 pb-20">
      {/* Schema.org JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(templateJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar navigation={content.navigation} />

      <article className="mx-auto max-w-4xl py-12 sm:py-16">
        {/* Back Link */}
        <Link
          href="/templates"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to all templates
        </Link>

        {/* Template Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default" className="text-xs font-semibold px-3 py-1 font-mono">
              {template.category}
            </Badge>
            {template.price && (
              <Badge variant="outline" className="text-xs font-mono font-bold">
                {template.price}
              </Badge>
            )}
            {template.featured && (
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                <Sparkles className="size-3 text-primary" aria-hidden="true" /> Featured Kit
              </Badge>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
            {template.title}
          </h1>

          {template.summary && (
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal">
              {template.summary}
            </p>
          )}

          {/* Action Row & Tags */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-border py-4">
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0" aria-label="Template technologies">
              {template.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 shrink-0">
              {template.githubUrl && (
                <a
                  href={template.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                  aria-label="View source code on GitHub"
                >
                  <GithubIcon className="size-3.5" aria-hidden="true" /> Source Code
                </a>
              )}
              {template.liveDemoUrl && (
                <a
                  href={template.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  aria-label="Live preview demo"
                >
                  Live Preview <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              )}
              {template.downloadUrl && (
                <a
                  href={template.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  aria-label="Download template kit"
                >
                  Download <Download className="size-3" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Preview Image */}
          {template.previewImage && (
            <div className="relative aspect-[1.8/1] w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl">
              <Image
                src={template.previewImage}
                alt={`${template.title} preview`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          {/* Overview Description */}
          <div className="rounded-3xl border border-border bg-card/60 p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold tracking-tight">Overview</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {template.description}
            </p>
          </div>

          {/* Key Features List */}
          {template.features && template.features.length > 0 && (
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Included Features &amp; Stack
              </p>
              <ul className="grid gap-3 sm:grid-cols-2 list-none p-0">
                {template.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>

        {/* Detailed Template Content (Rich Text) */}
        {template.content && (
          <section className="mt-12" aria-label="Documentation and setup">
            <h2 className="text-xl font-bold tracking-tight mb-6 border-b border-border pb-4">
              Documentation &amp; Setup
            </h2>
            <RichTextRenderer content={template.content} />
          </section>
        )}

        {/* Footer */}
        <footer className="mt-16 border-t border-border pt-12 space-y-12">
          {/* Author Bio / Custom Support */}
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="size-16 shrink-0 overflow-hidden rounded-2xl border border-primary/30 shadow-lg relative">
                <Image
                  src={authorAvatarSrc}
                  alt={content.general.displayName}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="space-y-1.5 flex-1">
                <p className="font-bold text-lg">{content.general.displayName}</p>
                <p className="text-xs font-mono text-primary uppercase tracking-wider">{content.general.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Need a custom adaptation or help integrating this template into your existing production codebase?
                </p>
                <div className="pt-2">
                  <Link href="/contact">
                    <Button size="sm" className="rounded-xl text-xs font-semibold">
                      Request Custom Implementation <ArrowRight className="size-3.5 ml-1" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Templates */}
          {relatedTemplates.length > 0 && (
            <nav aria-label="More starter kits and templates">
              <h2 className="text-xl font-bold tracking-tight mb-6">More Starter Kits &amp; Templates</h2>
              <ul className="grid gap-6 sm:grid-cols-3 list-none p-0">
                {relatedTemplates.map((rel) => (
                  <li key={rel.id}>
                    <Link
                      href={`/templates/${rel.id}`}
                      className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl block"
                    >
                      {rel.previewImage && (
                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                          <Image
                            src={rel.previewImage}
                            alt={`${rel.title} preview`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-primary">{rel.category}</span>
                          {rel.price && (
                            <span className="font-mono text-xs font-bold text-foreground">{rel.price}</span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-1">
                          {rel.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {rel.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs font-semibold text-primary pt-1" aria-hidden="true">
                          <span>View template</span>
                          <ArrowUpRight className="size-3" />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </footer>
      </article>

      <Footer footer={content.footer} general={content.general} />
    </main>
  )
}
