'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { authClient } from '@/lib/auth-client'
import { ShieldAlert, Loader2, ArrowLeft, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const session = authClient.useSession()
  const [synced, setSynced] = useState(false)

  // Query Convex profile only when authenticated session exists
  const userProfile = useQuery(
    api.users.getCurrentUserWithProfile,
    session.data?.user ? {} : 'skip'
  )
  const syncUser = useMutation(api.users.syncUser)

  // Auto redirect to login if not authenticated once session check completes
  useEffect(() => {
    if (!session.isPending && !session.data?.user) {
      const redirectParam = pathname ? `?redirect=${encodeURIComponent(pathname)}` : ''
      router.replace(`/auth/login${redirectParam}`)
    }
  }, [session.isPending, session.data?.user, pathname, router])

  // When session is available, sync to Convex users table to guarantee role and profile
  useEffect(() => {
    if (session.data?.user && !synced) {
      syncUser({
        userId: session.data.user.id,
        email: session.data.user.email || '',
        name: session.data.user.name || '',
        image: session.data.user.image || undefined,
      })
        .then(() => setSynced(true))
        .catch((err) => console.error('Error syncing user to Convex:', err))
    }
  }, [session.data?.user, synced, syncUser])

  // 1. Loading State or Unauthenticated (Redirecting) State
  if (session.isPending || !session.data?.user || (session.data?.user && userProfile === undefined)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
        <div className="relative flex flex-col items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-lg shadow-primary/20 backdrop-blur-md">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {!session.isPending && !session.data?.user
                ? 'Redirecting to Login...'
                : 'Verifying Administrator Access'}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {!session.isPending && !session.data?.user
                ? 'Please wait while we transfer you to authentication.'
                : 'Checking authentication and security credentials...'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // 3. Authenticated but NOT an Admin
  const role = userProfile?.role || 'user'
  if (role !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <Card className="w-full max-w-lg border-destructive/30 bg-card shadow-2xl backdrop-blur-md">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/10 text-destructive">
              <ShieldAlert className="size-7" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <CardTitle className="text-xl font-bold">Access Restricted</CardTitle>
              <Badge variant="destructive" className="uppercase text-[10px]">
                {role}
              </Badge>
            </div>
            <CardDescription className="text-xs mt-1">
              Your account (<strong>{session.data.user.email}</strong>) does not have administrator privileges.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-2 text-xs text-muted-foreground text-center">
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <p>
                Only users assigned the <span className="font-mono font-semibold text-primary">admin</span> role in
                the Convex database are allowed into this panel.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="outline"
              className="w-full text-xs"
              onClick={async () => {
                await authClient.signOut()
                router.push('/auth/login')
              }}
            >
              <LogOut className="size-3.5 mr-1.5" />
              Sign Out / Switch Account
            </Button>
            <Button variant="default" className="w-full text-xs" onClick={() => router.push('/')}>
              <ArrowLeft className="size-3.5 mr-1.5" />
              Return to Website
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // 4. Authorized Admin
  return <>{children}</>
}
