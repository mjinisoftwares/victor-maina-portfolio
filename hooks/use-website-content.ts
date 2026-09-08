'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { WebsiteContent } from '@/lib/types/content'
import { defaultContent } from '@/lib/default-content'

export function useWebsiteContent(initialData?: WebsiteContent) {
  const convexData = useQuery(api.content.get)
  const updateSectionMutation = useMutation(api.content.updateSection)
  const saveAllMutation = useMutation(api.content.saveAll)
  const resetMutation = useMutation(api.content.resetToDefault)

  const [localContent, setLocalContent] = useState<WebsiteContent>(initialData || defaultContent)
  const [saving, setSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Merge convex data with defaultContent to ensure all keys exist
  const mergedContent: WebsiteContent = useMemo(() => {
    if (!convexData) return initialData || defaultContent
    return {
      ...defaultContent,
      ...convexData,
      general: { ...defaultContent.general, ...convexData?.general },
      navigation: { ...defaultContent.navigation, ...convexData?.navigation },
      hero: { ...defaultContent.hero, ...convexData?.hero },
      techStack: { ...defaultContent.techStack, ...convexData?.techStack },
      logos: { ...defaultContent.logos, ...convexData?.logos },
      projects: { ...defaultContent.projects, ...convexData?.projects },
      process: { ...defaultContent.process, ...convexData?.process },
      services: { ...defaultContent.services, ...convexData?.services },
      templates: convexData?.templates || defaultContent.templates,
      blog: { ...defaultContent.blog, ...convexData?.blog },
      contact: { ...defaultContent.contact, ...convexData?.contact },
      seo: { ...defaultContent.seo, ...convexData?.seo },
      footer: { ...defaultContent.footer, ...convexData?.footer },
      faq: { ...defaultContent.faq, ...convexData?.faq },
      pageLayouts: convexData?.pageLayouts || defaultContent.pageLayouts,
    }
  }, [convexData, initialData])

  const seedMutation = useMutation(api.seed.seedWebsiteContent)

  useEffect(() => {
    if (convexData === null) {
      // Database not seeded yet, seed it automatically
      seedMutation().catch((err) => console.error('Seed error:', err))
    }
  }, [convexData, seedMutation])

  useEffect(() => {
    if (convexData) {
      setLocalContent(mergedContent)
    }
  }, [convexData, mergedContent])

  const loading = convexData === undefined && !initialData

  const updateSection = useCallback(
    async <K extends keyof WebsiteContent>(section: K, data: WebsiteContent[K]) => {
      try {
        setSaving(true)
        setError(null)

        const updated = {
          ...localContent,
          [section]: data,
          lastUpdated: new Date().toISOString(),
        }
        setLocalContent(updated)

        await updateSectionMutation({
          section: section as string,
          data,
        })

        setLastSaved(new Date())
        return { success: true, data: updated }
      } catch (err: any) {
        console.error('Convex updateSection error:', err)
        setError(err?.message || 'Failed to save section')
        return { success: false, error: err?.message }
      } finally {
        setSaving(false)
      }
    },
    [localContent, updateSectionMutation]
  )

  const saveAll = useCallback(
    async (fullContent: WebsiteContent) => {
      try {
        setSaving(true)
        setError(null)
        setLocalContent(fullContent)

        await saveAllMutation({
          content: fullContent,
        })

        setLastSaved(new Date())
        return { success: true, data: fullContent }
      } catch (err: any) {
        console.error('Convex saveAll error:', err)
        setError(err?.message || 'Failed to save content')
        return { success: false, error: err?.message }
      } finally {
        setSaving(false)
      }
    },
    [saveAllMutation]
  )

  const resetToDefault = useCallback(async () => {
    try {
      setSaving(true)
      setError(null)
      setLocalContent(defaultContent)

      await resetMutation({
        defaultContent,
      })

      setLastSaved(new Date())
      return { success: true, data: defaultContent }
    } catch (err: any) {
      console.error('Convex reset error:', err)
      setError(err?.message || 'Failed to reset')
      return { success: false, error: err?.message }
    } finally {
      setSaving(false)
    }
  }, [resetMutation])

  return {
    content: localContent,
    setContent: setLocalContent,
    loading,
    saving,
    error,
    lastSaved,
    fetchContent: () => {},
    updateSection,
    saveAll,
    resetToDefault,
  }
}
