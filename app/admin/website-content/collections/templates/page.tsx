'use client'

import { useState } from 'react'
import {
  Plus,
  Trash2,
  Pencil,
  LayoutTemplate,
  ExternalLink,
  Download,
  Star,
  Check
} from 'lucide-react'
import { GithubIcon } from '@/components/ui/icons'
import { useWebsiteContent } from '@/hooks/use-website-content'
import { useToast } from '@/components/ui/toast'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { ContentHeader } from '@/components/admin/ContentHeader'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { CollectionSeoSection } from '@/components/admin/CollectionSeoSection'
import { TemplateItem } from '@/lib/types/content'

export default function TemplatesCollectionPage() {
  const { content, saving, lastSaved, updateSection } = useWebsiteContent()
  const { toast } = useToast()

  const [editingTemplate, setEditingTemplate] = useState<TemplateItem | null>(null)
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
  const [newTagInput, setNewTagInput] = useState('')
  const [newFeatureInput, setNewFeatureInput] = useState('')

  const templatesData = content.templates || {
    sectionLabel: 'Templates & Systems',
    title: 'Starter Kits & Code',
    subtitle: 'Production-ready starter systems, boilerplate repositories, and components.',
    items: []
  }

  const handleOpenNewTemplate = () => {
    setEditingTemplate({
      id: `template-${Date.now().toString(36)}`,
      title: '',
      category: 'Next.js Starter',
      description: '',
      summary: '',
      content: '',
      tags: ['Next.js 15', 'Convex', 'Tailwind CSS'],
      price: 'Free / Open Source',
      liveDemoUrl: '',
      githubUrl: '',
      downloadUrl: '',
      previewImage: '',
      features: ['TypeScript strict mode', 'Pre-configured Authentication', 'Responsive Dark UI'],
      featured: true
    })
    setIsTemplateDialogOpen(true)
  }

  const handleSaveTemplateItem = async () => {
    if (!editingTemplate || !editingTemplate.title.trim()) {
      toast({ title: 'Title required', description: 'Please enter a template title.', variant: 'destructive' })
      return
    }

    const items = [...(templatesData.items || [])]
    const index = items.findIndex((t) => t.id === editingTemplate.id)
    if (index >= 0) {
      items[index] = editingTemplate
    } else {
      items.unshift(editingTemplate)
    }

    const updated = { ...templatesData, items }
    const res = await updateSection('templates', updated)
    if (res.success) {
      toast({ title: 'Template saved', description: `${editingTemplate.title} has been updated.` })
      setIsTemplateDialogOpen(false)
      setEditingTemplate(null)
    }
  }

  const handleDeleteTemplate = async (id: string) => {
    const items = (templatesData.items || []).filter((t) => t.id !== id)
    const updated = { ...templatesData, items }
    const res = await updateSection('templates', updated)
    if (res.success) {
      toast({ title: 'Template removed' })
    }
  }

  return (
    <div className="space-y-6">
      <ContentHeader
        title="Templates Collection"
        description="Manage pre-built developer starter kits, UI boilerplates, live preview links, and GitHub repositories."
        badge={`${templatesData.items?.length || 0} Templates`}
        saving={saving}
        lastSaved={lastSaved}
        liveRoute="/templates"
      >
        <Button onClick={handleOpenNewTemplate} size="sm" className="gap-1.5 text-xs font-semibold">
          <Plus className="size-3.5" />
          <span>Add Template</span>
        </Button>
      </ContentHeader>

      {/* Section Meta Settings */}
      <Card className="border-border/80 bg-card/60">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-bold">Section Header Settings</CardTitle>
          <CardDescription className="text-xs">Labels displayed above the templates grid on pages.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs">Section Label</Label>
              <Input
                value={templatesData.sectionLabel}
                onChange={(e) => updateSection('templates', { ...templatesData, sectionLabel: e.target.value })}
                className="mt-1 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Section Title</Label>
              <Input
                value={templatesData.title}
                onChange={(e) => updateSection('templates', { ...templatesData, title: e.target.value })}
                className="mt-1 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Subtitle</Label>
              <Input
                value={templatesData.subtitle}
                onChange={(e) => updateSection('templates', { ...templatesData, subtitle: e.target.value })}
                className="mt-1 text-xs"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templatesData.items?.map((template) => (
          <Card key={template.id} className="border-border/80 bg-card/60 flex flex-col justify-between hover:border-primary/40 transition-colors">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {template.category}
                  </Badge>
                  {template.featured && (
                    <Badge className="bg-primary/10 text-primary border border-primary/20 text-[10px]">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      setEditingTemplate({ ...template })
                      setIsTemplateDialogOpen(true)
                    }}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
              <CardTitle className="mt-2 text-base font-bold text-foreground">{template.title}</CardTitle>
              {template.price && (
                <p className="font-mono text-xs font-semibold text-emerald-500 mt-0.5">{template.price}</p>
              )}
              <CardDescription className="text-xs line-clamp-2 mt-1">{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-3">
              {template.previewImage && (
                <div className="relative h-28 w-full overflow-hidden rounded-lg border border-border bg-muted/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={template.previewImage} alt={template.title} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="flex flex-wrap gap-1">
                {template.tags?.map((tag) => (
                  <span key={tag} className="rounded-md bg-muted/70 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add / Edit Template Dialog */}
      {editingTemplate && (
        <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
          <DialogContent
            className="w-[75vw] max-w-6xl max-h-[90vh] overflow-y-auto"
            onClose={() => setIsTemplateDialogOpen(false)}
          >
            <DialogHeader>
              <DialogTitle>{editingTemplate.title ? `Edit ${editingTemplate.title}` : 'Add Template Kit'}</DialogTitle>
              <DialogDescription>Configure template features, preview screenshots, and source code links.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <Label className="text-xs">Template Title *</Label>
                  <Input
                    value={editingTemplate.title}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                    placeholder="e.g. Next.js 15 SaaS Dashboard"
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Pricing Tag</Label>
                  <Input
                    value={editingTemplate.price || ''}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, price: e.target.value })}
                    placeholder="e.g. Free / Open Source"
                    className="mt-1 text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs">Category</Label>
                <Input
                  value={editingTemplate.category}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, category: e.target.value })}
                  placeholder="e.g. Full-Stack Starter, Portfolio, Component Kit"
                  className="mt-1 text-sm"
                />
              </div>

              <div>
                <Label className="text-xs">Short Description</Label>
                <Textarea
                  value={editingTemplate.description}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, description: e.target.value })}
                  placeholder="Brief overview of the template..."
                  className="mt-1 text-sm"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs">Live Demo Link</Label>
                  <Input
                    value={editingTemplate.liveDemoUrl || ''}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, liveDemoUrl: e.target.value })}
                    placeholder="https://demo..."
                    className="mt-1 text-sm font-mono"
                  />
                </div>
                <div>
                  <Label className="text-xs">GitHub Repo Link</Label>
                  <Input
                    value={editingTemplate.githubUrl || ''}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="mt-1 text-sm font-mono"
                  />
                </div>
                <div>
                  <Label className="text-xs">Direct Download Link</Label>
                  <Input
                    value={editingTemplate.downloadUrl || ''}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, downloadUrl: e.target.value })}
                    placeholder="https://..."
                    className="mt-1 text-sm font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  id="featured-template-switch"
                  checked={editingTemplate.featured || false}
                  onCheckedChange={(checked) => setEditingTemplate({ ...editingTemplate, featured: checked })}
                />
                <Label htmlFor="featured-template-switch" className="text-xs cursor-pointer">
                  Highlight as Featured Template
                </Label>
              </div>

              {/* Preview Image */}
              <div>
                <Label className="text-xs mb-1 block">Preview Mockup Image</Label>
                <ImageUploader
                  value={editingTemplate.previewImage || ''}
                  onChange={(url) => setEditingTemplate({ ...editingTemplate, previewImage: url })}
                  placeholder="Upload or paste preview screenshot URL"
                />
              </div>

              {/* Tags */}
              <div>
                <Label className="text-xs">Tags & Tech</Label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {editingTemplate.tags?.map((tag, idx) => (
                    <span key={idx} className="flex items-center gap-1 rounded-md bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs text-primary font-medium">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingTemplate({
                            ...editingTemplate,
                            tags: editingTemplate.tags.filter((_, i) => i !== idx)
                          })
                        }
                        className="text-primary/60 hover:text-primary"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <Input
                    placeholder="Add technology tag..."
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newTagInput.trim()) {
                        e.preventDefault()
                        setEditingTemplate({
                          ...editingTemplate,
                          tags: [...(editingTemplate.tags || []), newTagInput.trim()]
                        })
                        setNewTagInput('')
                      }
                    }}
                    className="text-xs h-8"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs"
                    onClick={() => {
                      if (newTagInput.trim()) {
                        setEditingTemplate({
                          ...editingTemplate,
                          tags: [...(editingTemplate.tags || []), newTagInput.trim()]
                        })
                        setNewTagInput('')
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Rich Text Documentation Content */}
              <div>
                <Label className="text-xs mb-1 block">Template Documentation & Setup Guide</Label>
                <RichTextEditor
                  value={editingTemplate.content || ''}
                  onChange={(val) => setEditingTemplate({ ...editingTemplate, content: val })}
                  placeholder="Include getting started commands, features breakdown, and environment variables..."
                />
              </div>

              {/* Dedicated SEO & Social Sharing Section */}
              <CollectionSeoSection
                seo={editingTemplate.seo}
                onChange={(seo) => setEditingTemplate({ ...editingTemplate, seo })}
                defaultTitle={editingTemplate.title}
                defaultDescription={editingTemplate.summary || editingTemplate.description || editingTemplate.content}
                defaultImage={editingTemplate.previewImage}
                defaultKeywords={editingTemplate.tags?.length ? editingTemplate.tags.join(', ') : 'Starter Template, Next.js Boilerplate, Open Source'}
                itemPath={`/templates/${editingTemplate.id}`}
                itemType="template"
                siteName="Victor Maina"
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveTemplateItem}>Save Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
