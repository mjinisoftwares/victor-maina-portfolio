'use client'

import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroContent, SocialLink } from '@/lib/types/content'
import { defaultContent } from '@/lib/default-content'
import { useState } from "react";

interface Hero2Props {
  hero?: HeroContent
  socials?: SocialLink[]
}

export function Hero2({
  hero = defaultContent.hero,
  socials = defaultContent.contact.socials,
}: Hero2Props) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-12">
      <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="flex">
            <Link 
              href={hero.primaryCtaLink}
              className={cn(badgeVariants({ variant: "secondary" }), "rounded-full border-border py-1 px-4")}
            >
              {hero.badge} <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </div>
          <h1 className="mt-6 font-medium text-4xl leading-[1.2]! tracking-[-0.04em] md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
            {hero.titleLine1}{' '}
            <span className="text-primary">{hero.titleHighlight1}</span>
            <br />
            {hero.titleLine2}{' '}
            <span className="text-primary">{hero.titleHighlight2}</span>
          </h1>
          <p className="mt-4 max-w-[60ch] text-foreground/60 text-lg sm:mt-6 sm:text-xl/normal">
            {hero.bio}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-12">
            <Link 
              href={hero.primaryCtaLink}
              className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
            >
              {hero.primaryCtaText} <ArrowUpRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href={hero.secondaryCtaLink}
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full shadow-none")}
            >
              <Mail className="mr-2 h-5 w-5" /> {hero.secondaryCtaText}
            </Link>
          </div>
        </div>
        <div className="mt-auto aspect-video w-full rounded-xl bg-accent overflow-hidden border flex items-center justify-center">
           {!imgError && hero.avatarUrl ? (
             <img 
               src={hero.avatarUrl} 
               alt={hero.titleLine1}
               onError={() => setImgError(true)}
               className="w-full h-full object-cover"
             />
           ) : (
             <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                <span className="text-4xl font-bold">VM</span>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
