'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowUpRight, BriefcaseBusiness, Code2, Mail, MapPin, Sparkles, Globe } from 'lucide-react'
import Link from 'next/link'
import { HeroContent, SocialLink } from '@/lib/types/content'
import { defaultContent } from '@/lib/default-content'

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
}

interface HeroProps {
  hero?: HeroContent
  socials?: SocialLink[]
}

export function Hero({
  hero = defaultContent.hero,
  socials = defaultContent.contact.socials,
}: HeroProps) {
  const reduceMotion = useReducedMotion()
  const [imgError, setImgError] = useState(false)

  return (
    <motion.section
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.2 }}
      variants={reveal}
      className="md:mt-12 grid items-center gap-14 py-16 md:grid-cols-[1.08fr_0.92fr] lg:gap-16"
      aria-label="Introduction"
    >
      <div className="max-w-5xl">
        <p className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
          <Sparkles className="size-4 text-primary" aria-hidden="true" />
          {hero.badge}
        </p>
        <h1 className="max-w-5xl text-5xl font-bold leading-[0.98] tracking-[-0.06em] lg:text-7xl">
          {hero.titleLine1} <span className="text-primary">{hero.titleHighlight1}</span>{' '}
          {hero.titleLine2} <span className="text-primary">{hero.titleHighlight2}</span>
        </h1>
        <p className="mt-8 max-w-xl text-pretty text-sm leading-7 text-muted-foreground sm:leading-8">
          {hero.bio}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href={hero.primaryCtaLink}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-muted dark:text-white/90 transition-transform hover:-translate-y-0.5"
          >
            {hero.primaryCtaText}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
          <Link
            href={hero.secondaryCtaLink}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary"
          >
            {hero.secondaryCtaText}
            <Mail className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <motion.div
        animate={reduceMotion ? {} : { y: [0, -10, 0] }}
        transition={reduceMotion ? {} : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative mx-auto w-full max-w-md lg:ml-auto"
      >
        <div className="absolute -inset-5 rounded-full border border-primary/10 sm:-inset-9" aria-hidden="true" />
        <div className="absolute -inset-10 rounded-full border border-dashed border-primary/15 sm:-inset-16" aria-hidden="true" />
        <div className="relative aspect-square overflow-hidden rounded-full border-[10px] border-primary bg-primary/10 shadow-[0_24px_80px_-24px_color-mix(in_oklab,var(--primary),transparent_35%)] flex items-center justify-center">
          {hero.avatarUrl && !imgError ? (
            <Image
              src={hero.avatarUrl}
              alt={hero.badge || 'Profile avatar'}
              fill
              priority
              sizes="(max-width: 768px) 320px, 448px"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/30 to-primary/10 font-bold text-5xl text-primary">
              VM
            </div>
          )}
        </div>
        <div className="absolute -top-5 -left-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-xl sm:-left-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {hero.statusCardLabel}
          </p>
          <p className="mt-1 text-sm font-semibold">
            {hero.statusCardText}
            <span className="text-primary">{hero.statusCardHighlight}</span>
          </p>
        </div>
        <nav className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground" aria-label="Location and social links">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            {hero.locationText}
          </span>
          {socials.map((soc) => (
            <span key={soc.id} className="inline-flex items-center gap-3">
              <span className="h-4 w-px bg-border" aria-hidden="true" />
              <a
                href={soc.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                aria-label={soc.label || soc.platform}
              >
                {soc.platform.toLowerCase().includes('github') ? (
                  <Code2 className="size-4" aria-hidden="true" />
                ) : soc.platform.toLowerCase().includes('linkedin') ? (
                  <BriefcaseBusiness className="size-4" aria-hidden="true" />
                ) : (
                  <Globe className="size-4" aria-hidden="true" />
                )}
                {soc.label || soc.platform}
              </a>
            </span>
          ))}
        </nav>
      </motion.div>
    </motion.section>
  )
}
