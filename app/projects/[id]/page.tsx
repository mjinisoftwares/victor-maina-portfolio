'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { useWebsiteContent } from '@/hooks/use-website-content'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RichTextRenderer } from '@/components/ui/rich-text-renderer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GithubIcon } from '@/components/ui/icons'
import { getProjectJsonLd, getBreadcrumbJsonLd } from '@/lib/structured-data'
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  ArrowUpRight,
  Briefcase,
  ArrowRight
} from 'lucide-react'

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { content } = useWebsiteContent()

  const project = content.projects.items.find((p) => p.id === id || p.link === id)
  const relatedProjects = content.projects.items
    .filter((p) => p.id !== project?.id)
    .slice(0, 3)

  if (!project) {
    return (
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 mt-6 pb-20">
        <Navbar navigation={content.navigation} />
        <div className="py-24 text-center space-y-4">
          <Briefcase className="mx-auto size-12 text-muted-foreground/50" />
          <h1 className="text-2xl font-bold">Project Not Found</h1>
          <p className="text-sm text-muted-foreground">
            This project does not exist or has been removed.
          </p>
          <Link href="/projects">
            <Button variant="outline" className="rounded-xl">
              <ArrowLeft className="size-4 mr-1.5" /> Back to Projects
            </Button>
          </Link>
        </div>
        <Footer footer={content.footer} general={content.general} />
      </main>
    )
  }

  const projectJsonLd = getProjectJsonLd(project, content)
  const breadcrumbJsonLd = getBreadcrumbJsonLd(
    [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: project.title, path: `/projects/${project.id}` },
    ],
    content
  )

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 mt-6 pb-20">
      {/* Schema.org JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar navigation={content.navigation} />

      <article className="mx-auto max-w-4xl py-12 sm:py-16">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="size-3.5" />
          Back to all projects
        </Link>

        {/* Project Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default" className="text-xs font-semibold px-3 py-1">
              {project.type}
            </Badge>
            {project.category && (
              <Badge variant="outline" className="text-xs font-mono">
                {project.category}
              </Badge>
            )}
            {project.featured && (
              <Badge variant="accent" className="text-xs">
                Featured
              </Badge>
            )}
            {project.completionDate && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                <Calendar className="size-3.5" />
                {project.completionDate}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
            {project.title}
          </h1>

          {project.summary && (
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal">
              {project.summary}
            </p>
          )}

          {/* Tags & Links Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-border py-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <GithubIcon className="size-3.5" /> View Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Launch <ExternalLink className="size-3" />
                </a>
              )}
            </div>
          </div>

          {/* Cover Image */}
          {project.image && (
            <div className="relative aspect-[1.8/1] w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="size-full object-cover"
              />
            </div>
          )}
        </header>

        {/* Project Rich Text Body */}
        <section className="mt-12">
          {project.content ? (
            <RichTextRenderer content={project.content} />
          ) : (
            <div className="space-y-4">
              <p className="text-base text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
          )}
        </section>

        {/* Footer CTA */}
        <footer className="mt-16 border-t border-border pt-12 space-y-12">
          {/* Author / Contact CTA */}
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="size-16 shrink-0 overflow-hidden rounded-2xl border border-primary/30 shadow-lg">
                <img
                  src={content.general.avatarUrl}
                  alt={content.general.displayName}
                  className="size-full object-cover"
                />
              </div>
              <div className="space-y-1.5 flex-1">
                <p className="font-bold text-lg">{content.general.displayName}</p>
                <p className="text-xs font-mono text-primary uppercase tracking-wider">{content.general.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {content.general.shortBio}
                </p>
                <div className="pt-2">
                  <Link href="/contact">
                    <Button size="sm" className="rounded-xl text-xs font-semibold">
                      Start a Project Together <ArrowRight className="size-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold tracking-tight">More Projects</h3>
              <div className="grid gap-6 sm:grid-cols-3">
                {relatedProjects.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/projects/${rel.id}`}
                    className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl"
                  >
                    {rel.image && (
                      <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-4 space-y-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-primary">{rel.type}</span>
                      <h4 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-1">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {rel.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs font-semibold text-primary pt-1">
                        <span>View project</span>
                        <ArrowUpRight className="size-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </footer>
      </article>

      <Footer footer={content.footer} general={content.general} />
    </main>
  )
}
