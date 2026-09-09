'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowUpRight, ExternalLink, FileText, X } from 'lucide-react'
import { GithubIcon } from '@/components/ui/icons'
import Link from 'next/link'
import { ProjectsContent, ProjectItem } from '@/lib/types/content'
import { defaultContent } from '@/lib/default-content'
import { RichTextRenderer } from '@/components/ui/rich-text-renderer'

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
}

interface ProjectsProps {
  projects?: ProjectsContent
}

export function Projects({ projects = defaultContent.projects }: ProjectsProps) {
  const reduceMotion = useReducedMotion()
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  return (
    <motion.section
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.2 }}
      variants={reveal}
      id="work"
      className="border-t border-border py-20 sm:py-28"
      aria-labelledby="work-title"
    >
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            {projects.sectionLabel}
          </p>
          <h2 id="work-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {projects.title}
          </h2>
        </div>
        <Link
          href={projects.ctaLink}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          {projects.ctaText}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {projects.items.map((project) => (
          <motion.article
            whileHover={reduceMotion ? {} : { y: -6 }}
            key={project.id || project.title}
            className="group overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <Link href={`/projects/${project.id}`} className="block">
                <div className={`relative flex aspect-[1.25] items-end p-5 overflow-hidden ${project.accent || 'bg-primary'}`}>
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover opacity-35 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  )}
                  <div className="relative z-10 w-full rounded-2xl border border-background/20 bg-background/20 p-4 backdrop-blur-md">
                    <p className="font-mono text-xs uppercase tracking-widest text-primary-foreground/80">{project.type}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-primary-foreground">{project.title}</p>
                  </div>
                </div>
              </Link>
              <div className="p-5">
                <p className="text-sm leading-6 text-muted-foreground">{project.description}</p>
                {project.summary && (
                  <p className="mt-2.5 text-xs text-foreground/80 font-medium bg-secondary/50 rounded-xl p-2.5 border border-border/50">
                    {project.summary}
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                href={`/projects/${project.id}`}
                className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
              >
                <FileText className="size-3.5" aria-hidden="true" /> Read Case Study &amp; Overview
              </Link>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0" aria-label="Project technologies">
                  {project.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[10px] text-secondary-foreground">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${project.title} source code on GitHub`}
                    >
                      <GithubIcon className="size-4" aria-hidden="true" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground transition-colors group-hover:text-primary"
                      aria-label={`Open ${project.title} live project`}
                    >
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-3xl rounded-3xl border border-border bg-background p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                  {selectedProject.type}
                </span>
                <h3 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {selectedProject.title}
                </h3>
                {selectedProject.summary && (
                  <p className="mt-2 text-sm text-muted-foreground">{selectedProject.summary}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            {selectedProject.image && (
              <div className="relative overflow-hidden rounded-2xl border border-border aspect-video">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}

            {selectedProject.content ? (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <RichTextRenderer content={selectedProject.content} />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
              <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
                {selectedProject.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                    aria-label="View source code on GitHub"
                  >
                    <GithubIcon className="size-3.5" aria-hidden="true" /> View Code
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    aria-label="Launch live project"
                  >
                    Launch Project <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  )
}
