import {
  ArrowUpRight,
  Smile,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { FeaturesContent } from "@/lib/types/content";
import * as LucideIcons from "lucide-react";

const Features = ({ features }: { features?: FeaturesContent }) => {
  const items = features?.items ?? [];

  if (!items.length) return null;

  return (
    <div className="mx-auto flex max-w-7xl flex-col px-6 py-20">
      <h2 className="text-pretty text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
        {features?.title || "Designed to scale"}
      </h2>
      <p className="mt-3 text-center text-muted-foreground text-xl -tracking-[0.01em] sm:text-2xl">
        {features?.subtitle || "Spend less time configuring and more time creating"}
      </p>

      <div className="mt-20 grid grid-cols-1 bg-card sm:grid-cols-2 lg:grid-cols-3">
        <div className="-mr-px flex h-16 items-center border px-6 font-medium text-lg sm:col-span-2 md:col-span-1">
          <Smile className="mr-4 text-primary" /> {features?.sectionLabel || "Features that make you happy"}
        </div>
        <div className="-mr-px hidden h-16 border bg-[repeating-linear-gradient(315deg,var(--muted)_0,var(--muted)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed md:block lg:col-span-2" />
        {items.map((feature, index) => {
          const Icon = (feature.icon && (LucideIcons as any)[feature.icon]) || Zap;
          return (
          <div
            className="-mt-px -mr-px border border-border/75 px-5 pt-7 pb-5"
            key={feature.id || index}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/7 text-primary dark:bg-primary/10">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-lg tracking-[-0.005em]">
                {feature.title}
              </h3>
            </div>
            <p className="mt-4 text-foreground/80">{feature.description}</p>

            <Button className="mt-4 px-0!" variant="link" render={<Link href="#" target="_blank" />} nativeButton={false}>Learn more <ArrowUpRight /></Button>
          </div>
        )})}
      </div>
    </div>
  );
};

export default Features;
