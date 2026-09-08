'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, Moon, Sun } from 'lucide-react'
import { NavigationContent } from '@/lib/types/content'
import { defaultContent } from '@/lib/default-content'
import { Button } from './ui/button'
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface NavbarProps {
  navigation?: NavigationContent
}

export function Navbar({ navigation = defaultContent.navigation }: NavbarProps) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(document.documentElement.classList.contains('dark') || prefersDark)
  }, [])

  function toggleTheme() {
    const nextIsDark = !isDark
    setIsDark(nextIsDark)
    document.documentElement.classList.toggle('dark', nextIsDark)
  }
  
   const {isAuthenticated, isLoading} = useConvexAuth();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
  const handleSignOut = async () => {
    startTransition(async () => {
      const { error } = await authClient.signOut();
      if (error) {
        toast.add({
          title: "Logout failed",
          description: error.message || "Something went wrong",
        });
        return;
      }
      toast.add({
        title: "Logout",
        description: "Logged out successfully",
      });
      router.push("/");
      router.refresh();
    });
  };
  return (
    <header className="flex items-center justify-between border-b border-border pb-5">
      <Link href="/" className="font-mono text-2xl sm:text-3xl font-bold tracking-tight">
        {navigation.brandName}
        <span className="text-primary">{navigation.brandAccent ? ` ${navigation.brandAccent}` : ''}</span>
      </Link>
      <div className="flex items-center gap-5">
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-sm text-muted-foreground sm:flex sm:gap-8">
          {navigation.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
                 
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary cursor-pointer"
        >
          {mounted && isDark ? (
            <Sun className="size-4" aria-hidden="true" />
          ) : (
            <Moon className="size-4" aria-hidden="true" />
          )}
        </button>
        {isLoading ? null : isAuthenticated ? (
                <Button onClick={handleSignOut} disabled={isPending}>{isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"  /> Signing out...</> : "Logout"}</Button>
              ) : (
                <>
                  <Button variant="outline" size="default" render={<a href="/auth/login" />} nativeButton={false}>Login</Button>
                  <Button variant="default" size="default" render={<a href="/auth/sign-up" />} nativeButton={false}>Signup</Button>
                </>
              )}

     
      </div>
    </header>
  )
}