'use client'

import { useWebsiteContent } from '@/hooks/use-website-content'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageBlockRenderer } from '@/components/PageBlockRenderer'

interface PageShellProps {
  path: string
  className?: string
}

/**
 * Shared client shell for all list/index pages.
 * Keeps the `'use client'` boundary in one place so every page file
 * can be a server component that delegates here.
 */
export function PageShell({
  path,
  className = 'mx-auto max-w-7xl ml-2.5 md:ml-0 px-4 sm:px-6 md:px-8 lg:px-12 mt-6',
}: PageShellProps) {
  const { content } = useWebsiteContent()

  return (
    <main className={className}>
      <Navbar navigation={content.navigation} />
      <PageBlockRenderer path={path} content={content} />
      <Footer footer={content.footer} general={content.general} />
    </main>
  )
}
