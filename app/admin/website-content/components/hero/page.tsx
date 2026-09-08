'use client'

import { useState } from 'react'
import { Sparkles, Save, Upload, ExternalLink } from 'lucide-react'
import { useWebsiteContent } from '@/hooks/use-website-content'
import { useToast } from '@/components/ui/toast'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ContentHeader } from '@/components/admin/ContentHeader'
import { ImageUploader } from '@/components/ui/image-uploader'

export default function HeroComponentPage() {
  const { content, saving, lastSaved, updateSection } = useWebsiteContent()
  const { toast } = useToast()

  const heroData = content.hero || {
    badge: 'Senior Full Stack & Systems Engineer',
    titleLine1: 'Engineering High-Performance',
    titleHighlight1: 'Web Systems',
    titleLine2: 'With Scalable',
    titleHighlight2: 'Cloud Architecture',
    bio: 'Specializing in reactive full-stack web applications, real-time database architecture, and polished developer experiences.',
    primaryCtaText: 'View Selected Work',
    primaryCtaLink: '#projects',
    secondaryCtaText: 'Get in Touch',
    secondaryCtaLink: '#contact',
    locationText: 'Nairobi, Kenya (Available Worldwide / Remote)',
    avatarUrl: '/images/avatar.jpg',
    statusCardLabel: 'Current Focus',
    statusCardText: 'Building Real-time Reactive Web Apps',
    statusCardHighlight: 'Open to High-Impact Opportunities'
  }

  const [formData, setFormData] = useState(heroData)

  const handleSave = async () => {
    const res = await updateSection('hero', formData)
    if (res.success) {
      toast({ title: 'Hero section saved', description: 'Hero configuration updated successfully.' })
    }
  }

  return (
    <div className="space-y-6">
      <ContentHeader
        title="Hero Section Component"
        description="Customize the main headline, glowing keywords, intro biography, call-to-action buttons, avatar, and floating status card."
        badge="Hero Section"
        saving={saving}
        lastSaved={lastSaved}
        liveRoute="/"
        onSave={handleSave}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Headline & Bio */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/80 bg-card/60">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-base font-bold">Headline & Badge</CardTitle>
              <CardDescription className="text-xs">The primary impact banner text visible above the fold.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-2 space-y-4">
              <div>
                <Label className="text-xs">Badge Tagline</Label>
                <Input
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g. Senior Full Stack & Systems Engineer"
                  className="mt-1 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Title Line 1 (Standard)</Label>
                  <Input
                    value={formData.titleLine1}
                    onChange={(e) => setFormData({ ...formData, titleLine1: e.target.value })}
                    placeholder="Engineering High-Performance"
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Highlight 1 (Gradient / Colored)</Label>
                  <Input
                    value={formData.titleHighlight1}
                    onChange={(e) => setFormData({ ...formData, titleHighlight1: e.target.value })}
                    placeholder="Web Systems"
                    className="mt-1 text-sm font-semibold text-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Title Line 2 (Standard)</Label>
                  <Input
                    value={formData.titleLine2}
                    onChange={(e) => setFormData({ ...formData, titleLine2: e.target.value })}
                    placeholder="With Scalable"
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Highlight 2 (Gradient / Colored)</Label>
                  <Input
                    value={formData.titleHighlight2}
                    onChange={(e) => setFormData({ ...formData, titleHighlight2: e.target.value })}
                    placeholder="Cloud Architecture"
                    className="mt-1 text-sm font-semibold text-primary"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs">Introduction Bio</Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Short paragraph describing your expertise..."
                  className="mt-1 text-sm"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-xs">Location & Availability String</Label>
                <Input
                  value={formData.locationText}
                  onChange={(e) => setFormData({ ...formData, locationText: e.target.value })}
                  placeholder="Nairobi, Kenya (Available Worldwide / Remote)"
                  className="mt-1 text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons & Links */}
          <Card className="border-border/80 bg-card/60">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-base font-bold">Call to Action Buttons</CardTitle>
              <CardDescription className="text-xs">Primary and secondary action buttons rendered in the hero.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 rounded-xl border border-border/70 p-3.5 bg-muted/10">
                  <p className="text-xs font-semibold text-primary">Primary Button</p>
                  <div>
                    <Label className="text-xs">Button Label</Label>
                    <Input
                      value={formData.primaryCtaText}
                      onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })}
                      placeholder="View Selected Work"
                      className="mt-1 text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Target Link</Label>
                    <Input
                      value={formData.primaryCtaLink}
                      onChange={(e) => setFormData({ ...formData, primaryCtaLink: e.target.value })}
                      placeholder="/projects or #projects"
                      className="mt-1 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2 rounded-xl border border-border/70 p-3.5 bg-muted/10">
                  <p className="text-xs font-semibold text-muted-foreground">Secondary Button</p>
                  <div>
                    <Label className="text-xs">Button Label</Label>
                    <Input
                      value={formData.secondaryCtaText}
                      onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
                      placeholder="Get in Touch"
                      className="mt-1 text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Target Link</Label>
                    <Input
                      value={formData.secondaryCtaLink}
                      onChange={(e) => setFormData({ ...formData, secondaryCtaLink: e.target.value })}
                      placeholder="/contact or #contact"
                      className="mt-1 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Avatar & Floating Status Card */}
        <div className="space-y-6">
          <Card className="border-border/80 bg-card/60">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-base font-bold">Hero Avatar Image</CardTitle>
              <CardDescription className="text-xs">Your profile portrait displayed in the hero section.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-2">
              <ImageUploader
                value={formData.avatarUrl || ''}
                onChange={(url) => setFormData({ ...formData, avatarUrl: url })}
                placeholder="Upload or paste avatar image URL"
              />
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card/60">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-base font-bold">Floating Status Card</CardTitle>
              <CardDescription className="text-xs">Interactive badge overlay shown on top of the avatar.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-2 space-y-3">
              <div>
                <Label className="text-xs">Status Label</Label>
                <Input
                  value={formData.statusCardLabel}
                  onChange={(e) => setFormData({ ...formData, statusCardLabel: e.target.value })}
                  placeholder="Current Focus"
                  className="mt-1 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">Main Status Text</Label>
                <Input
                  value={formData.statusCardText}
                  onChange={(e) => setFormData({ ...formData, statusCardText: e.target.value })}
                  placeholder="Building Real-time Reactive Web Apps"
                  className="mt-1 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">Highlight Subtext</Label>
                <Input
                  value={formData.statusCardHighlight}
                  onChange={(e) => setFormData({ ...formData, statusCardHighlight: e.target.value })}
                  placeholder="Open to High-Impact Opportunities"
                  className="mt-1 text-xs"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
