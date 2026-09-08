import React, { useState } from 'react'
import Link from 'next/link'
import { WebsiteContent, PageComponentBlock, ServiceItem, TemplateItem } from '@/lib/types/content'
import { Hero } from '@/components/Hero'
import { TechStack } from '@/components/TechStack'
import { Logos } from '@/components/Logos'
import { Projects } from '@/components/Projects'
import { Process } from '@/components/Process'
import { Contact } from '@/components/Contact'
import FAQ from '@/components/faq'
import Features from '@/components/features'
import Pricing from '@/components/pricing'
import Stats from '@/components/stats'
import CodeBlock from '@/components/code-block'
import Blog from '@/components/blog'
import { RichTextRenderer } from '@/components/ui/rich-text-renderer'
import { GithubIcon } from '@/components/ui/icons'
import { Sparkles, Check, Code2, ArrowUpRight, Calendar, Clock, ArrowRight, ExternalLink, FileText, X } from 'lucide-react'

interface PageBlockRendererProps {
  path: string
  content: WebsiteContent
}

// Fixed block types: always render from global collections, not per-page data
const FIXED_BLOCKS = new Set(['projects', 'services', 'templates', 'blog', 'logos'])

export function PageBlockRenderer({ path, content }: PageBlockRendererProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null)

  const pageConfig = content.pageLayouts?.[path]
  const blocks: PageComponentBlock[] = pageConfig?.blocks?.filter(b => b.enabled) || []

  if (!blocks.length) return null

  return (
    <div className="space-y-16 sm:space-y-24">
      {blocks.map((block) => {
        // For editable blocks, deep-merge block.data over global section data
        const d = (block.data && !FIXED_BLOCKS.has(block.type)) ? block.data : {}

        switch (block.type) {
          case 'hero': {
            const heroData = { ...content.hero, ...d }
            return (
              <section key={block.id} id={`hero-${block.id}`}>
                <Hero hero={heroData} socials={content.contact.socials} />
              </section>
            )
          }

          case 'techStack': {
            const data = { ...content.techStack, ...d }
            return (
              <section key={block.id} id={`techStack-${block.id}`}>
                <TechStack techStack={data} />
              </section>
            )
          }

          case 'logos':
            return (
              <section key={block.id} id={`logos-${block.id}`}>
                <Logos logos={content.logos} />
              </section>
            )

          case 'projects':
            return (
              <section key={block.id} id={`projects-${block.id}`}>
                <Projects projects={content.projects} />
              </section>
            )

          case 'process': {
            const data = { ...content.process, ...d }
            return (
              <section key={block.id} id={`process-${block.id}`}>
                <Process process={data} />
              </section>
            )
          }

          case 'services':
            return (
              <section key={block.id} id={`services-${block.id}`} className="py-8">
                <div className="max-w-2xl">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{content.services.sectionLabel}</p>
                  <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">{content.services.title}</h2>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">{content.services.subtitle}</p>
                </div>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {content.services.items.map((service) => (
                    <div key={service.id} className={`flex flex-col justify-between rounded-3xl border p-6 transition-all ${service.popular ? 'border-primary bg-primary/5 shadow-xl shadow-primary/5' : 'border-border bg-card'}`}>
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="rounded-2xl bg-primary/10 p-3 text-primary"><Code2 className="size-6" /></div>
                          {service.popular && <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Most Popular</span>}
                        </div>
                        <Link href={`/services/${service.id}`} className="group/title block">
                          <h3 className="mt-6 text-xl font-bold tracking-tight group-hover/title:text-primary transition-colors">{service.title}</h3>
                        </Link>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                        
                        {service.summary && (
                          <p className="mt-3 text-xs text-foreground/90 font-medium bg-primary/5 rounded-xl p-2.5 border border-primary/10">
                            {service.summary}
                          </p>
                        )}

                        <div className="mt-6 border-t border-border pt-4">
                          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">What&apos;s Included</p>
                          <ul className="mt-3 space-y-2.5">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                                <Check className="size-4 text-primary shrink-0 mt-0.5" /><span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border space-y-4">
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/services/${service.id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
                          >
                            <FileText className="size-3.5" /> View Scope & Details
                          </Link>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-mono text-xs text-muted-foreground">Investment</span>
                            <p className="text-lg font-bold text-foreground">{service.price || 'Custom scope'}</p>
                          </div>
                          <Link href="/contact" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                            Inquire Now <ArrowUpRight className="size-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )

          case 'templates':
            return (
              <section key={block.id} id={`templates-${block.id}`} className="py-8">
                <div className="max-w-2xl">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{content.templates?.sectionLabel || 'Templates & Kits'}</p>
                  <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">{content.templates?.title || 'Starter Kits & Templates'}</h2>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">{content.templates?.subtitle || 'Speed up your workflow with production-ready templates and kits.'}</p>
                </div>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {(content.templates?.items || []).map((tmpl) => (
                    <div key={tmpl.id} className="flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl">
                      <div>
                        {tmpl.previewImage && (
                          <Link href={`/templates/${tmpl.id}`} className="block">
                            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                              <img src={tmpl.previewImage} alt={tmpl.title} className="size-full object-cover transition-transform duration-500 hover:scale-105" />
                            </div>
                          </Link>
                        )}
                        <div className="p-6">
                          <div className="flex items-center justify-between gap-2">
                            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary font-mono">
                              {tmpl.category}
                            </span>
                            {tmpl.price && (
                              <span className="font-bold text-sm text-foreground">{tmpl.price}</span>
                            )}
                          </div>
                          <Link href={`/templates/${tmpl.id}`} className="group/title block">
                            <h3 className="mt-3 text-xl font-bold tracking-tight group-hover/title:text-primary transition-colors">{tmpl.title}</h3>
                          </Link>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tmpl.description}</p>
                          
                          {tmpl.summary && (
                            <p className="mt-3 text-xs text-foreground/80 font-medium bg-secondary/50 rounded-xl p-2.5 border border-border/50">
                              {tmpl.summary}
                            </p>
                          )}

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {tmpl.tags.map((t) => (
                              <span key={t} className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] text-secondary-foreground">
                                {t}
                              </span>
                            ))}
                          </div>

                          {tmpl.features?.length > 0 && (
                            <div className="mt-5 border-t border-border pt-4">
                              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Key Highlights</p>
                              <ul className="space-y-1.5">
                                {tmpl.features.slice(0, 3).map((feat, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Check className="size-3 text-primary shrink-0" />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-6 pt-0 border-t border-border mt-4 flex items-center justify-between gap-2">
                        <Link
                          href={`/templates/${tmpl.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                        >
                          <FileText className="size-3.5" /> Details & Overview
                        </Link>

                        <div className="flex items-center gap-2">
                          {tmpl.githubUrl && (
                            <a href={tmpl.githubUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-border p-2 text-muted-foreground hover:text-foreground">
                              <GithubIcon className="size-3.5" />
                            </a>
                          )}
                          {tmpl.liveDemoUrl && (
                            <a href={tmpl.liveDemoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                              Demo <ExternalLink className="size-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )

          case 'blog':
            return (
              <section key={block.id} id={`blog-${block.id}`}>
                <Blog blog={content.blog} />
              </section>
            )

          case 'features': {
            const data = d.items ? { ...content.features, ...d } : { ...content.features, ...d }
            return (
              <section key={block.id} id={`features-${block.id}`}>
                <Features features={data as any} />
              </section>
            )
          }

          case 'pricing': {
            const data = d.plans ? { ...content.pricing, ...d } : { ...content.pricing, ...d }
            return (
              <section key={block.id} id={`pricing-${block.id}`}>
                <Pricing pricing={data as any} />
              </section>
            )
          }

          case 'stats': {
            const data = d.items ? { ...content.stats, ...d } : { ...content.stats, ...d }
            return (
              <section key={block.id} id={`stats-${block.id}`}>
                <Stats stats={data as any} />
              </section>
            )
          }

          case 'codeBlock': {
            const data = d.files ? { ...content.codeBlock, ...d } : { ...content.codeBlock, ...d }
            return (
              <section key={block.id} id={`codeBlock-${block.id}`}>
                <CodeBlock codeBlock={data as any} />
              </section>
            )
          }

          case 'contact': {
            const data = { ...content.contact, ...d }
            return (
              <section key={block.id} id={`contact-${block.id}`}>
                <Contact contact={data} phone={content.general?.phone} />
              </section>
            )
          }

          case 'faq': {
            const data = d.items ? { ...content.faq, ...d } : { ...content.faq, ...d }
            return (
              <section key={block.id} id={`faq-${block.id}`}>
                <FAQ faqs={data} />
              </section>
            )
          }

          case 'ctaBanner':
            return (
              <section key={block.id} className="my-12">
                <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-background p-8 sm:p-12 text-center shadow-xl">
                  <div className="mx-auto max-w-2xl">
                    <Sparkles className="mx-auto size-8 text-primary animate-pulse" />
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      {d.title || block.title || 'Ready to start your next project?'}
                    </h2>
                    <p className="mt-3 text-base text-muted-foreground">
                      {d.description || "Let's collaborate to build something performant, elegant, and effective."}
                    </p>
                    <div className="mt-8 flex justify-center">
                      <Link href={d.ctaLink || '/contact'} className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-105">
                        <span>{d.ctaText || 'Get in Touch'}</span>
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )

          case 'customHtml':
            return (
              <section key={block.id} className="my-12 rounded-3xl border border-border bg-card p-6 sm:p-8">
                <h3 className="text-xl font-bold tracking-tight text-foreground">{d.title || block.title}</h3>
                {d.description && <p className="mt-2 text-sm text-muted-foreground">{d.description}</p>}
                {d.html && (
                  <div className="prose prose-neutral dark:prose-invert mt-6 max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: d.html }} />
                )}
              </section>
            )

          default:
            return null
        }
      })}

      {/* Service Scope & Deliverables Modal (if modal fallback triggered) */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-background p-6 sm:p-8 shadow-2xl max-h-[88vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">Service Scope & Deliverables</span>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-foreground">{selectedService.title}</h3>
                {selectedService.summary && (
                  <p className="mt-2 text-sm text-muted-foreground">{selectedService.summary}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {selectedService.content ? (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <RichTextRenderer content={selectedService.content} />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedService.description}</p>
            )}

            {selectedService.features?.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Key Deliverables</p>
                <ul className="space-y-2">
                  {selectedService.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <Check className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <span className="font-mono text-xs text-muted-foreground">Pricing</span>
                <p className="text-lg font-bold text-foreground">{selectedService.price || 'Custom scope'}</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Inquire for this Service <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Template Details Modal (if modal fallback triggered) */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-background p-6 sm:p-8 shadow-2xl max-h-[88vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">{selectedTemplate.category}</span>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-foreground">{selectedTemplate.title}</h3>
                {selectedTemplate.summary && (
                  <p className="mt-2 text-sm text-muted-foreground">{selectedTemplate.summary}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedTemplate(null)}
                className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {selectedTemplate.previewImage && (
              <div className="overflow-hidden rounded-2xl border border-border aspect-video">
                <img src={selectedTemplate.previewImage} alt={selectedTemplate.title} className="size-full object-cover" />
              </div>
            )}

            {selectedTemplate.content ? (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <RichTextRenderer content={selectedTemplate.content} />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedTemplate.description}</p>
            )}

            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <span className="font-mono text-xs text-muted-foreground">Price</span>
                <p className="text-lg font-bold text-foreground">{selectedTemplate.price || 'Free'}</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedTemplate.githubUrl && (
                  <a href={selectedTemplate.githubUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
                    GitHub
                  </a>
                )}
                {selectedTemplate.liveDemoUrl && (
                  <a href={selectedTemplate.liveDemoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                    Live Demo <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
