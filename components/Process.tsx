'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ProcessContent } from '@/lib/types/content'
import { defaultContent } from '@/lib/default-content'

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
}

interface ProcessProps {
  process?: ProcessContent
}

export function Process({ process = defaultContent.process }: ProcessProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.2 }}
      variants={reveal}
      className="grid gap-10 border-t border-border py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]"
      aria-labelledby="services-title"
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
          {process.sectionLabel}
        </p>
        <h2 id="services-title" className="mt-3 max-w-sm text-3xl font-semibold tracking-tight sm:text-4xl">
          {process.title}
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {process.steps.map((step) => (
          <div key={step.id || step.stepNumber} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-mono text-sm font-bold text-primary">{step.stepNumber}</p>
            <h3 className="mt-4 font-semibold text-lg">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
