import { MetadataRoute } from 'next'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { defaultContent } from '@/lib/default-content'

export default async function robots(): Promise<MetadataRoute.Robots> {
  let allowIndexing = true
  let baseUrl = 'https://victormaina.mjinidigital.co.ke/'

  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
    if (convexUrl) {
      const data = await fetchQuery(api.content.get, {})
      if (data?.seo) {
        if (data.seo.allowIndexing !== undefined) {
          allowIndexing = Boolean(data.seo.allowIndexing)
        }
        if (data.seo.canonicalUrl) {
          baseUrl = data.seo.canonicalUrl.replace(/\/$/, '')
        }
      }
    }
  } catch {
    allowIndexing = defaultContent.seo.allowIndexing
    baseUrl = defaultContent.seo.canonicalUrl.replace(/\/$/, '')
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: allowIndexing ? '/' : undefined,
        disallow: allowIndexing ? ['/admin/', '/api/', '/auth/'] : ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
