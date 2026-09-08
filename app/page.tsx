'use client'

import { useWebsiteContent } from '@/hooks/use-website-content'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageBlockRenderer } from '@/components/PageBlockRenderer'

export default function HomePage() {
  const { content } = useWebsiteContent()

  return (
    <main className="mx-auto max-w-7xl ml-2.5 md:ml-0 px-4 sm:px-6 md:px-8 lg:px-12 mt-6">
      <Navbar navigation={content.navigation} />
      <PageBlockRenderer path="/" content={content} />
      <Footer footer={content.footer} general={content.general} />
    </main>
  )
}

