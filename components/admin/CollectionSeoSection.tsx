'use client'

import React, { useState, useMemo } from 'react'
import {
  Sparkles,
  Globe,
  Share2,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Image as ImageIcon,
  ExternalLink,
  Eye,
  X,
  Code2,
  Copy,
  Check,
  RotateCcw,
  FileCode2,
  ShieldCheck
} from 'lucide-react'
import { CollectionItemSeo, CollectionStructuredDataType } from '@/lib/types/content'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ImageUploader } from '@/components/ui/image-uploader'
import { validateJsonLd, formatJsonLd, getDefaultSchemaTemplate } from '@/lib/structured-data'

interface CollectionSeoSectionProps {
  seo?: CollectionItemSeo
  onChange: (seo: CollectionItemSeo) => void
  defaultTitle?: string
  defaultDescription?: string
  defaultImage?: string
  defaultKeywords?: string
  itemPath?: string
  itemType?: 'article' | 'project' | 'service' | 'template'
  siteName?: string
}

export function CollectionSeoSection({
  seo = {},
  onChange,
  defaultTitle = '',
  defaultDescription = '',
  defaultImage = '',
  defaultKeywords = '',
  itemPath = '/item-slug',
  itemType = 'article',
  siteName = 'Victor Maina'
}: CollectionSeoSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<'metadata' | 'structuredData'>('metadata')
  const [previewTab, setPreviewTab] = useState<'google' | 'social' | 'schema'>('google')
  const [keywordInput, setKeywordInput] = useState('')
  const [copiedSchema, setCopiedSchema] = useState(false)

  const activeTitle = seo.metaTitle || defaultTitle || 'Untitled Item'
  const displayTitle = activeTitle ? `${activeTitle} — ${siteName}` : siteName
  const activeDescription = seo.metaDescription || defaultDescription || 'No description provided.'
  const activeImage = seo.metaImage || defaultImage || ''
  const activeKeywords = seo.keywords ?? defaultKeywords ?? ''

  // Keyword array parsing
  const keywordList = activeKeywords
    ? activeKeywords.split(',').map((k) => k.trim()).filter(Boolean)
    : []

  const handleFieldChange = (field: keyof CollectionItemSeo, value: any) => {
    onChange({
      ...seo,
      [field]: value
    })
  }

  const handleAddKeyword = () => {
    if (!keywordInput.trim()) return
    const newItems = keywordInput
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean)
    const combined = Array.from(new Set([...keywordList, ...newItems]))
    handleFieldChange('keywords', combined.join(', '))
    setKeywordInput('')
  }

  const handleRemoveKeyword = (keywordToRemove: string) => {
    const updated = keywordList.filter((k) => k !== keywordToRemove)
    handleFieldChange('keywords', updated.join(', '))
  }

  const handleAutoGenerate = () => {
    const cleanDesc = defaultDescription
      .replace(/<[^>]*>?/gm, '')
      .replace(/#+\s/g, '')
      .replace(/[*_`]/g, '')
      .slice(0, 155)
      .trim()

    const cleanTitle = defaultTitle.slice(0, 60).trim()

    onChange({
      ...seo,
      metaTitle: cleanTitle,
      metaDescription: cleanDesc,
      metaImage: defaultImage || seo.metaImage || '',
      keywords: defaultKeywords || seo.keywords || ''
    })
  }

  // Determine default Schema.org type based on itemType
  const defaultSchemaType = useMemo(() => {
    switch (itemType) {
      case 'article':
        return 'BlogPosting'
      case 'project':
        return 'SoftwareApplication'
      case 'service':
        return 'Service'
      case 'template':
        return 'SoftwareApplication'
      default:
        return 'CreativeWork'
    }
  }, [itemType])

  const selectedSchemaType = seo.structuredDataType || 'default'

  // Generate resolved live schema for preview
  const liveSchemaObj = useMemo(() => {
    if (seo.structuredDataCustomJson?.trim()) {
      const parsed = validateJsonLd(seo.structuredDataCustomJson)
      if (parsed.valid && parsed.parsed) {
        return parsed.parsed
      }
    }

    const type = selectedSchemaType === 'default' ? defaultSchemaType : selectedSchemaType
    try {
      const templateJson = getDefaultSchemaTemplate(type, {
        title: activeTitle,
        description: activeDescription,
        url: `https://victormaina.dev${itemPath.startsWith('/') ? '' : '/'}${itemPath}`,
        image: activeImage,
        siteName,
      })
      return JSON.parse(templateJson)
    } catch {
      return {
        '@context': 'https://schema.org',
        '@type': type,
        name: activeTitle,
      }
    }
  }, [seo.structuredDataCustomJson, selectedSchemaType, defaultSchemaType, activeTitle, activeDescription, itemPath, activeImage, siteName])

  const liveSchemaString = useMemo(() => {
    return JSON.stringify(liveSchemaObj, null, 2)
  }, [liveSchemaObj])

  // Custom JSON validation state
  const customValidation = useMemo(() => {
    if (!seo.structuredDataCustomJson) return { valid: true }
    return validateJsonLd(seo.structuredDataCustomJson)
  }, [seo.structuredDataCustomJson])

  const handlePreloadTemplate = () => {
    const type = selectedSchemaType === 'default' ? defaultSchemaType : selectedSchemaType
    const template = getDefaultSchemaTemplate(type, {
      title: activeTitle,
      description: activeDescription,
      url: `https://victormaina.dev${itemPath.startsWith('/') ? '' : '/'}${itemPath}`,
      image: activeImage,
      siteName,
    })
    handleFieldChange('structuredDataCustomJson', template)
  }

  const handleFormatCustomJson = () => {
    if (!seo.structuredDataCustomJson) return
    const formatted = formatJsonLd(seo.structuredDataCustomJson)
    handleFieldChange('structuredDataCustomJson', formatted)
  }

  const handleCopySchema = () => {
    navigator.clipboard.writeText(liveSchemaString)
    setCopiedSchema(true)
    setTimeout(() => setCopiedSchema(false), 2000)
  }

  const titleLength = (seo.metaTitle || '').length
  const descLength = (seo.metaDescription || '').length

  // SEO Score calculation
  const hasGoodTitle = titleLength >= 30 && titleLength <= 65
  const hasGoodDesc = descLength >= 80 && descLength <= 165
  const hasImage = Boolean(activeImage)
  const hasKeywords = keywordList.length >= 2
  const hasValidSchema = customValidation.valid

  const seoScore = [hasGoodTitle, hasGoodDesc, hasImage, hasKeywords, hasValidSchema].filter(Boolean).length

  return (
    <div className="space-y-6 rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur-sm">
      {/* Header with Title & Auto-generate */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Globe className="size-4" />
            </div>
            <h4 className="text-sm font-bold tracking-tight text-foreground">SEO & Structured Data Optimization</h4>
            <Badge
              variant={seoScore >= 4 ? 'default' : seoScore >= 3 ? 'outline' : 'secondary'}
              className="text-[10px] px-2 py-0.5 font-medium ml-1"
            >
              {seoScore >= 4
                ? '✨ Fully Optimized'
                : seoScore >= 2
                ? '⚡ Good Progress'
                : '⚠️ Needs Attention'}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Configure how this {itemType} appears across Google search results, social shares, and Schema.org JSON-LD.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAutoGenerate}
          className="gap-1.5 text-xs font-medium border-primary/20 bg-primary/5 hover:bg-primary/10 hover:text-primary transition-all self-start sm:self-auto"
        >
          <Sparkles className="size-3.5 text-primary" />
          <span>Auto-fill from Content</span>
        </Button>
      </div>

      {/* Primary Sub-Tabs: Meta Tags vs Structured Data */}
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab('metadata')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'metadata'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
            }`}
          >
            <Globe className="size-3.5" />
            <span>Search & Social Meta</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveSubTab('structuredData')
              setPreviewTab('schema')
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'structuredData'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
            }`}
          >
            <Code2 className="size-3.5" />
            <span>Structured Data (JSON-LD)</span>
            <Badge variant="secondary" className="text-[9px] px-1 py-0 font-mono">
              Schema.org
            </Badge>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="space-y-4 lg:col-span-7">
          {activeSubTab === 'metadata' ? (
            <>
              {/* Meta Title */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <span>Meta Title</span>
                    <span className="text-[10px] text-muted-foreground font-normal">(Search headline)</span>
                  </Label>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span
                      className={`font-mono font-medium ${
                        titleLength === 0
                          ? 'text-muted-foreground'
                          : titleLength >= 30 && titleLength <= 60
                          ? 'text-emerald-500 font-semibold'
                          : titleLength > 60
                          ? 'text-amber-500 font-semibold'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {titleLength}/60 chars
                    </span>
                    {titleLength > 60 && (
                      <span className="text-amber-500 hidden sm:inline">(May truncate)</span>
                    )}
                  </div>
                </div>
                <Input
                  value={seo.metaTitle || ''}
                  onChange={(e) => handleFieldChange('metaTitle', e.target.value)}
                  placeholder={defaultTitle ? `Default: ${defaultTitle}` : 'e.g. Building High-Scale Distributed Web Services'}
                  className="text-xs h-9 bg-background/50 focus:bg-background"
                />
                <p className="text-[11px] text-muted-foreground">
                  Shown in browser tabs and search engine headlines. Keep between 40–60 characters.
                </p>
              </div>

              {/* Meta Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <span>Meta Description</span>
                    <span className="text-[10px] text-muted-foreground font-normal">(Search summary)</span>
                  </Label>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span
                      className={`font-mono font-medium ${
                        descLength === 0
                          ? 'text-muted-foreground'
                          : descLength >= 120 && descLength <= 160
                          ? 'text-emerald-500 font-semibold'
                          : descLength > 160
                          ? 'text-amber-500 font-semibold'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {descLength}/160 chars
                    </span>
                    {descLength > 160 && (
                      <span className="text-amber-500 hidden sm:inline">(May truncate)</span>
                    )}
                  </div>
                </div>
                <Textarea
                  rows={3}
                  value={seo.metaDescription || ''}
                  onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
                  placeholder={defaultDescription ? `Default: ${defaultDescription.slice(0, 100)}...` : 'e.g. A comprehensive deep-dive into engineering high-performance reactive backends with Next.js and Convex...'}
                  className="text-xs resize-none bg-background/50 focus:bg-background"
                />
                <p className="text-[11px] text-muted-foreground">
                  Crucial for click-through rate. Summarize value proposition in 140–160 characters.
                </p>
              </div>

              {/* Meta Image / OG Image */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <span>Meta Social Share Image</span>
                    <span className="text-[10px] text-muted-foreground font-normal">(OG Image)</span>
                  </Label>
                  {activeImage === defaultImage && defaultImage && !seo.metaImage && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                      Using default cover image
                    </Badge>
                  )}
                </div>

                <ImageUploader
                  value={seo.metaImage || ''}
                  onChange={(url) => handleFieldChange('metaImage', url)}
                  placeholder="Paste social card image URL or upload image (1200x630px recommended)"
                  aspectRatio="video"
                  className="bg-background/40"
                />
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold flex items-center gap-1.5">
                  <span>Keywords & Tags</span>
                  <span className="text-[10px] text-muted-foreground font-normal">(Comma-separated)</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddKeyword()
                      }
                    }}
                    placeholder="e.g. Next.js, Full Stack, TypeScript, Cloud Architecture"
                    className="text-xs h-9 bg-background/50"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleAddKeyword}
                    className="text-xs h-9 px-3"
                  >
                    Add
                  </Button>
                </div>

                {keywordList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {keywordList.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-[11px] gap-1 pl-2 pr-1 py-0.5 bg-background/60 hover:bg-background transition-colors"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(tag)}
                          className="rounded-full hover:bg-muted p-0.5 text-muted-foreground hover:text-foreground"
                        >
                          <X className="size-2.5" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Advanced / Indexing Options */}
              <div className="pt-2 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Switch
                    id="noindex-toggle"
                    checked={seo.noIndex || false}
                    onCheckedChange={(checked) => handleFieldChange('noIndex', checked)}
                  />
                  <Label htmlFor="noindex-toggle" className="text-xs font-medium cursor-pointer">
                    Hide from search engines & sitemap <span className="text-muted-foreground font-normal">(noindex)</span>
                  </Label>
                </div>

                <div className="flex items-center gap-1.5">
                  <Label htmlFor="canonical-override" className="text-[11px] text-muted-foreground whitespace-nowrap">
                    Canonical:
                  </Label>
                  <Input
                    id="canonical-override"
                    value={seo.canonicalUrl || ''}
                    onChange={(e) => handleFieldChange('canonicalUrl', e.target.value)}
                    placeholder="Auto (inherits route URL)"
                    className="text-[11px] h-7 w-48 bg-background/40"
                  />
                </div>
              </div>
            </>
          ) : (
            /* Structured Data Tab */
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold">Schema.org Entity Type</Label>
                  <span className="text-[10px] text-muted-foreground">Google Rich Results target</span>
                </div>
                <select
                  value={selectedSchemaType}
                  onChange={(e) => handleFieldChange('structuredDataType', e.target.value as CollectionStructuredDataType)}
                  className="w-full text-xs h-9 rounded-xl border border-input bg-background px-3 py-1 font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="default">Default Auto ({defaultSchemaType})</option>
                  {itemType === 'article' && (
                    <>
                      <option value="BlogPosting">BlogPosting (Standard blog articles)</option>
                      <option value="Article">Article (General editorial piece)</option>
                      <option value="TechArticle">TechArticle (Technical tutorials & specs)</option>
                    </>
                  )}
                  {itemType === 'project' && (
                    <>
                      <option value="SoftwareApplication">SoftwareApplication (Web apps, SaaS)</option>
                      <option value="WebApplication">WebApplication (Interactive web platform)</option>
                      <option value="CreativeWork">CreativeWork (Design, portfolio showcase)</option>
                    </>
                  )}
                  {itemType === 'service' && (
                    <>
                      <option value="Service">Service (Consulting & engineering services)</option>
                    </>
                  )}
                  {itemType === 'template' && (
                    <>
                      <option value="SoftwareApplication">SoftwareApplication (Starters & code)</option>
                      <option value="Product">Product (Digital downloadable product)</option>
                    </>
                  )}
                  <option value="Custom">Custom JSON-LD (Fully custom Schema)</option>
                </select>
                <p className="text-[11px] text-muted-foreground">
                  By default, Google-compliant Schema.org data is automatically generated from this item&apos;s title, excerpt, and image.
                </p>
              </div>

              {/* Custom JSON-LD Editor Section */}
              <div className="space-y-2 pt-2 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Label className="text-xs font-semibold">Custom Schema Override (JSON-LD)</Label>
                    {customValidation.valid ? (
                      <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/30 gap-1 py-0">
                        <CheckCircle2 className="size-2.5" /> Valid
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-[10px] gap-1 py-0">
                        <AlertTriangle className="size-2.5" /> Syntax Error
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handlePreloadTemplate}
                      className="text-[10px] h-6 px-2 text-primary hover:bg-primary/10"
                      title="Load default schema as template into editor"
                    >
                      <Sparkles className="size-3 mr-1" /> Load Template
                    </Button>
                    {seo.structuredDataCustomJson && (
                      <>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleFormatCustomJson}
                          className="text-[10px] h-6 px-2 hover:bg-muted"
                        >
                          Format
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFieldChange('structuredDataCustomJson', '')}
                          className="text-[10px] h-6 px-2 text-muted-foreground hover:text-destructive"
                          title="Reset to auto-generated schema"
                        >
                          <RotateCcw className="size-3 mr-1" /> Reset to Auto
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <Textarea
                  rows={8}
                  value={seo.structuredDataCustomJson || ''}
                  onChange={(e) => handleFieldChange('structuredDataCustomJson', e.target.value)}
                  placeholder={`Optional: Paste custom Schema.org JSON-LD object here...\nClick "Load Template" above to prefill with ${defaultSchemaType} schema.`}
                  className="font-mono text-[11px] leading-relaxed resize-y bg-background/70 focus:bg-background"
                />

                {!customValidation.valid && (
                  <p className="text-[11px] text-destructive flex items-center gap-1">
                    <AlertTriangle className="size-3 shrink-0" />
                    <span>{customValidation.error}</span>
                  </p>
                )}

                <p className="text-[11px] text-muted-foreground">
                  Leave blank to automatically generate structured data. If provided, this JSON object replaces the default schema.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live SERP, Social & Schema Previews (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold flex items-center gap-1.5 text-muted-foreground">
              <Eye className="size-3.5" />
              <span>Live Search & Schema Preview</span>
            </Label>
          </div>

          <Tabs value={previewTab} onValueChange={(v) => setPreviewTab(v as any)} className="w-full">
            <TabsList className="grid grid-cols-3 h-8 p-0.5 bg-muted/60 rounded-lg">
              <TabsTrigger value="google" className="text-[11px] h-7 gap-1">
                <Search className="size-3" /> SERP
              </TabsTrigger>
              <TabsTrigger value="social" className="text-[11px] h-7 gap-1">
                <Share2 className="size-3" /> Social
              </TabsTrigger>
              <TabsTrigger value="schema" className="text-[11px] h-7 gap-1">
                <Code2 className="size-3" /> JSON-LD
              </TabsTrigger>
            </TabsList>

            {/* Google SERP Preview */}
            <TabsContent value="google" className="mt-3">
              <div className="rounded-xl border border-border/80 bg-background/95 p-4 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono truncate">
                  <div className="size-4 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary shrink-0">
                    V
                  </div>
                  <span className="truncate">victormaina.dev › {itemPath.replace(/^\//, '')}</span>
                </div>
                <h5 className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer line-clamp-1 leading-tight">
                  {displayTitle}
                </h5>
                <p className="text-xs text-muted-foreground/90 line-clamp-2 leading-relaxed">
                  {activeDescription}
                </p>
                {keywordList.length > 0 && (
                  <div className="flex items-center gap-1.5 pt-1 text-[10px] text-muted-foreground">
                    <span className="font-semibold text-foreground/70">Tags:</span>
                    <span className="truncate">{keywordList.slice(0, 3).join(' · ')}</span>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Social Share Preview (Twitter / LinkedIn) */}
            <TabsContent value="social" className="mt-3">
              <div className="rounded-xl border border-border/80 bg-background/95 overflow-hidden shadow-sm">
                {activeImage ? (
                  <div className="aspect-[1.91/1] w-full bg-muted overflow-hidden relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeImage}
                      alt={activeTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[1.91/1] w-full bg-muted/40 flex flex-col items-center justify-center gap-2 text-muted-foreground p-4 text-center">
                    <ImageIcon className="size-8 opacity-40" />
                    <span className="text-[11px]">No social preview image set</span>
                  </div>
                )}
                <div className="p-3.5 space-y-1 bg-card/60">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                    VICTORMAINA.DEV
                  </span>
                  <h6 className="text-xs font-bold text-foreground line-clamp-1">
                    {activeTitle}
                  </h6>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">
                    {activeDescription}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Schema JSON-LD Inspector */}
            <TabsContent value="schema" className="mt-3 space-y-2">
              <div className="rounded-xl border border-border/80 bg-background/95 p-3 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Badge variant="outline" className="font-mono text-[10px] text-primary">
                      @{liveSchemaObj['@type'] || 'Thing'}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {seo.structuredDataCustomJson ? 'Custom override' : 'Auto-generated'}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-6 text-muted-foreground hover:text-foreground"
                    onClick={handleCopySchema}
                    title="Copy JSON-LD"
                  >
                    {copiedSchema ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                  </Button>
                </div>
                <pre className="p-2.5 rounded-lg bg-muted/50 font-mono text-[10px] text-foreground/90 overflow-x-auto max-h-56 leading-relaxed border border-border/50">
                  {liveSchemaString}
                </pre>
              </div>

              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-2 text-xs text-foreground hover:bg-muted transition-colors"
              >
                <span className="text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-primary" />
                  <span>Google Rich Results Validator</span>
                </span>
                <ExternalLink className="size-3 text-muted-foreground" />
              </a>
            </TabsContent>
          </Tabs>

          {/* Quick SEO Health Checklist */}
          <div className="rounded-xl border border-border/60 bg-muted/30 p-3 space-y-2 text-[11px]">
            <span className="font-semibold text-foreground block">SEO & Schema Checklist</span>
            <ul className="space-y-1 text-muted-foreground">
              <li className="flex items-center gap-1.5">
                {hasGoodTitle ? (
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                ) : (
                  <AlertTriangle className="size-3.5 text-amber-500 shrink-0" />
                )}
                <span>Title length between 30–60 characters</span>
              </li>
              <li className="flex items-center gap-1.5">
                {hasGoodDesc ? (
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                ) : (
                  <AlertTriangle className="size-3.5 text-amber-500 shrink-0" />
                )}
                <span>Description length between 80–160 characters</span>
              </li>
              <li className="flex items-center gap-1.5">
                {hasImage ? (
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                ) : (
                  <Info className="size-3.5 text-muted-foreground shrink-0" />
                )}
                <span>OpenGraph image available for social cards</span>
              </li>
              <li className="flex items-center gap-1.5">
                {hasValidSchema ? (
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                ) : (
                  <AlertTriangle className="size-3.5 text-amber-500 shrink-0" />
                )}
                <span>Schema.org JSON-LD valid for Google crawlers</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
