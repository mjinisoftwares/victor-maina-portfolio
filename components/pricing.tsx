"use client";

import NumberFlow from "@number-flow/react";
import { CircleCheck, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingContent, PricingPlan } from "@/lib/types/content";
import * as LucideIcons from "lucide-react";

type BillingPeriod = "monthly" | "yearly";

const YEARLY_DISCOUNT_PERCENTAGE = 20;

const Pricing = ({ pricing }: { pricing?: PricingContent }) => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("yearly");

  const plans = pricing?.plans ?? [];

  if (!plans.length) return null;

  const handleBillingPeriodChange = (value: string) => {
    setBillingPeriod(value as BillingPeriod);
  };

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          {pricing?.sectionLabel || "Pricing"}
        </p>
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
          {pricing?.title || "Simple, transparent pricing"}
        </h2>
        {pricing?.subtitle && (
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            {pricing.subtitle}
          </p>
        )}
      </div>

      <Tabs
        className="mx-auto"
        defaultValue="yearly"
        onValueChange={handleBillingPeriodChange}
        value={billingPeriod}
      >
        <TabsList>
          <TabsTrigger className="px-4" value="monthly">
            Monthly
          </TabsTrigger>
          <TabsTrigger className="px-4" value="yearly">
            Yearly
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard billingPeriod={billingPeriod} key={plan.id || plan.name} plan={plan} />
        ))}
      </div>
    </section>
  );
};

const PlanCard = ({
  plan,
  billingPeriod,
}: {
  plan: PricingPlan;
  billingPeriod: BillingPeriod;
}) => {
  const price =
    billingPeriod === "yearly"
      ? Math.floor((plan.price * (100 - YEARLY_DISCOUNT_PERCENTAGE)) / 100)
      : plan.price;

  const Icon = (plan.icon && (LucideIcons as any)[plan.icon]) || Zap;

  return (
    <div
      className={cn("rounded-lg bg-card p-6 shadow-xs/3 ring ring-border/85", {
        "relative bg-primary/5 ring-2 ring-primary": plan.isRecommended,
      })}
    >
      {plan.isRecommended && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}
      <Icon className="mb-4 text-primary" />
      <div className="flex items-center gap-1">
        <h3 className="font-medium text-2xl tracking-tight">{plan.name}</h3>
      </div>
      <p className="mt-2 min-h-[2lh] text-muted-foreground">
        {plan.description}
      </p>
      <p className="mt-4 font-semibold text-4xl">
        <NumberFlow className="font-satoshi" prefix="$" value={price} />
        <span className="ms-0.5 font-normal text-lg text-muted-foreground tracking-tight">
          /month
        </span>
      </p>
      <Button className="mt-6 mb-8 h-10 w-full" size="lg">
        Get Started
      </Button>
      <ul className="space-y-2">
        {plan.features.map((feature, idx) => (
          <li className="flex items-center gap-2" key={idx}>
            <CircleCheck className="size-4 shrink-0 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pricing;
