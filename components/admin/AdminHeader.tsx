'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { authClient } from '@/lib/auth-client'
import {
  Menu,
  Moon,
  Sun,
  Globe2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  LogOut,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminHeaderProps {
  onToggleMobile: () => void
}

export function AdminHeader({ onToggleMobile }: AdminHeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const session = authClient.useSession()
  const [dark, setDark] = useState(true)

  const userProfile = useQuery(
    api.users.getCurrentUserWithProfile,
    session.data?.user ? {} : 'skip'
  )

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDark(isDark)
  }, [])

  const switchTheme = () => {
    const nextDark = !dark
    setDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
  }

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Overview Dashboard'
    if (pathname.includes('/admin/website-content')) return 'Website Content Editor'
    if (pathname.includes('/admin/users')) return 'User Management & Roles'
    if (pathname.includes('/admin/seo')) return 'Search Engine Optimization (SEO)'
    if (pathname.includes('/admin/socials')) return 'Social Profiles & Channels'
    if (pathname.includes('/admin/settings')) return 'General Site Settings'
    return 'Admin Panel'
  }

  const displayName = userProfile?.profile?.name || userProfile?.user?.name || 'Administrator'
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  const profilePic = userProfile?.profile?.profilePic || userProfile?.user?.image

  return (
    <header className="sticky top-0 z-30 flex h-20 shrink-0 items-center justify-between border-b border-border bg-background/80 px-5 backdrop-blur-md sm:px-8 lg:px-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="rounded-xl border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>

        <div>
          <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
            <span>Admin</span>
            <ChevronRight className="size-3 text-muted-foreground" />
            <span className="text-foreground">{pathname.replace('/admin', '').replace('/', '') || 'overview'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-xs"
        >
          <Globe2 className="size-3.5 text-primary" />
          <span>View Site</span>
          <ExternalLink className="size-3 text-muted-foreground" />
        </Link>

        <button
          onClick={switchTheme}
          className="rounded-xl border border-border bg-card p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shadow-xs"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="size-4 text-amber-500" /> : <Moon className="size-4 text-indigo-500" />}
        </button>

        <div className="hidden items-center gap-3 border-l border-border pl-4 sm:flex">
          <div className="relative flex size-9 items-center justify-center overflow-hidden rounded-full border border-border bg-primary font-mono text-xs font-bold text-primary-foreground shadow-sm shadow-primary/30">
            {profilePic ? (
              <img src={profilePic} alt={displayName} className="size-full object-cover" />
            ) : (
              initials || 'AD'
            )}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold leading-none">{displayName}</p>
              <ShieldCheck className="size-3 text-emerald-500" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground leading-none capitalize">
              {userProfile?.role || 'Admin'}
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await authClient.signOut()
              router.push('/auth/login')
            }}
            title="Sign out"
            className="ml-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
