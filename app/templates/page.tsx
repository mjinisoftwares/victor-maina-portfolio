'use client'

import { useWebsiteContent } from '@/hooks/use-website-content'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageBlockRenderer } from '@/components/PageBlockRenderer'

export default function TemplatesPage() {
  const { content } = useWebsiteContent()

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 mt-6 pb-20">
      <Navbar navigation={content.navigation} />
      <PageBlockRenderer path="/templates" content={content} />
      <Footer footer={content.footer} general={content.general} />
    </main>
  )
}
