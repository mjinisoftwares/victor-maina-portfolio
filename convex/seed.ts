import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const initialContentData = {
  general: {
    siteName: "Victor Maina",
    siteTagline: "Full-stack web developer building high-performing digital experiences",
    displayName: "Victor Maina",
    role: "Full-stack developer",
    shortBio: "I turn ambitious ideas into solutions that help businesses grow and serve their customers better.",
    avatarUrl: "https://res.cloudinary.com/dcxqwes9x/image/upload/v1738001955/new_jkuh2v.png",
    location: "Nairobi, Kenya",
    email: "vickdev@mjinidigital.co.ke",
    phone: "+254 729 396962",
    resumeUrl: "#",
    availableForWork: true,
    statusBadge: "Available for projects",
  },
  navigation: {
    brandName: "Victor",
    brandAccent: "Maina",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/projects" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  hero: {
    badge: "Full-stack developer",
    titleLine1: "I build",
    titleHighlight1: "websites & apps",
    titleLine2: "that drive business",
    titleHighlight2: "growth.",
    bio: "I'm Victor Maina, a full-stack web developer who turns ambitious ideas into solutions that help businesses grow and serve their customers better.",
    primaryCtaText: "See my work",
    primaryCtaLink: "/projects",
    secondaryCtaText: "Let's talk",
    secondaryCtaLink: "/contact",
    locationText: "Nairobi, Kenya",
    avatarUrl: "https://res.cloudinary.com/dcxqwes9x/image/upload/v1738001955/new_jkuh2v.png",
    statusCardLabel: "Currently crafting",
    statusCardText: "The next big thing",
    statusCardHighlight: ".",
  },
  techStack: {
    sectionLabel: "Trusted toolkit",
    subtitle: "The tools behind the work",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Prisma",
      "Docker",
    ],
  },
  logos: {
    sectionLabel: "Built with intention",
    title: "Tools that move ideas forward.",
    subtitle: "A flexible stack for shipping thoughtful products from first sketch to final pixel.",
    items: [
      "Convex",
      "Express",
      "Payload CMS",
      "Strapi",
      "Webflow",
      "Shopify",
      "WordPress",
      "Supabase",
    ],
  },
  projects: {
    sectionLabel: "Selected work",
    title: "A few things I've shipped.",
    ctaText: "Start a project",
    ctaLink: "/contact",
    items: [
      {
        id: "proj-1",
        title: "Maji Labs",
        type: "Product platform",
        description: "A clean operations workspace that helps distributed teams turn messy workflows into momentum.",
        tags: ["Next.js", "Convex", "Tailwind"],
        accent: "bg-primary",
        link: "https://github.com",
        featured: true,
        category: "Web Application",
        liveUrl: "https://example.com/maji-labs",
        githubUrl: "https://github.com",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "proj-2",
        title: "Nuru Commerce",
        type: "E-commerce experience",
        description: "A fast, conversion-focused storefront designed to make every product feel considered.",
        tags: ["Shopify", "React", "Storefront API"],
        accent: "bg-foreground",
        link: "https://github.com",
        featured: true,
        category: "E-Commerce",
        liveUrl: "https://example.com/nuru-commerce",
        githubUrl: "https://github.com",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "proj-3",
        title: "Kora Studio",
        type: "Brand & web system",
        description: "A flexible visual system and content engine for a modern creative practice.",
        tags: ["Webflow", "Strapi", "GSAP"],
        accent: "bg-muted-foreground",
        link: "https://github.com",
        featured: true,
        category: "Branding & Web",
        liveUrl: "https://example.com/kora-studio",
        githubUrl: "https://github.com",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "proj-4",
        title: "Pulse Analytics",
        type: "SaaS Platform",
        description: "Real-time user engagement and performance analytics dashboard with custom reporting.",
        tags: ["Next.js", "TypeScript", "ClickHouse"],
        accent: "bg-emerald-600",
        link: "https://github.com",
        featured: false,
        category: "SaaS",
        liveUrl: "https://example.com/pulse",
        githubUrl: "https://github.com",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  },
  process: {
    sectionLabel: "How I work",
    title: "From rough idea to real-world impact.",
    steps: [
      {
        id: "proc-1",
        stepNumber: "01",
        title: "Clarify",
        description: "We define the sharpest version of the problem and the smallest path to value.",
      },
      {
        id: "proc-2",
        stepNumber: "02",
        title: "Create",
        description: "I design and build a durable system that feels simple to use and easy to grow.",
      },
      {
        id: "proc-3",
        stepNumber: "03",
        title: "Launch",
        description: "We ship, learn from real users, and keep improving what matters most.",
      },
    ],
  },
  services: {
    sectionLabel: "What I do",
    title: "Engineering & Design Services",
    subtitle: "Tailored solutions built with modern technology, obsessive performance, and attention to detail.",
    items: [
      {
        id: "serv-1",
        title: "Full-Stack Web Development",
        description: "Custom Next.js & React applications built from scratch with clean architecture, high speed, and scalability.",
        icon: "Code2",
        price: "Custom scope",
        popular: true,
        features: [
          "Next.js & TypeScript architecture",
          "Database modeling & API integration",
          "Responsive mobile-first layout",
          "SEO & Core Web Vitals optimization",
        ],
      },
      {
        id: "serv-2",
        title: "E-Commerce & Digital Storefronts",
        description: "High-converting online stores that provide smooth checkout journeys and frictionless user experiences.",
        icon: "ShoppingBag",
        price: "From $1,500",
        popular: false,
        features: [
          "Shopify & Headless storefronts",
          "Payment gateway integrations",
          "Inventory & Order management",
          "Fast checkout flow optimization",
        ],
      },
      {
        id: "serv-3",
        title: "UI/UX Design Systems",
        description: "Design systems, brand guidelines, and interactive Figma prototypes that turn complex products into intuitive software.",
        icon: "Palette",
        price: "From $1,200",
        popular: false,
        features: [
          "Figma design systems & UI kits",
          "Interactive clickable prototypes",
          "Micro-interactions & animations",
          "Design-to-code token alignment",
        ],
      },
    ],
  },
  blog: {
    sectionLabel: "Thoughts & Insights",
    title: "Writing on code, design, and product.",
    subtitle: "Reflections from shipping products, architectural patterns, and lessons learned along the way.",
    posts: [
      {
        id: "post-1",
        slug: "building-performant-nextjs-apps",
        title: "Building High-Performance Next.js Web Apps in 2026",
        excerpt: "A deep dive into server components, caching strategies, and streaming rendering for speed.",
        date: "Feb 24, 2026",
        readTime: "6 min read",
        category: "Engineering",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
        published: true,
        content: `Building for the modern web requires balancing rapid iteration with obsessive runtime performance. In this article, we break down core architectural decisions when building production Next.js apps.

## 1. Server Components vs. Client Boundaries

React Server Components (RSC) allow components to fetch data right where they live without shipping runtime JavaScript bundles to the browser.

:::callout[tip]
Keep client boundaries at the leaves of your component tree to minimize client bundle sizes.
:::

\`\`\`typescript
// Server Component Example
export default async function ProductOverview({ productId }: { productId: string }) {
  const product = await db.products.findById(productId);
  return <ProductCard item={product} />;
}
\`\`\`

## 2. Watch the Video Breakdown

Here is a visual walkthrough demonstrating streaming UI and optimistic state:

:::youtube[SqcY0GlETPk]:::

## 3. Realtime Reactive Architecture

When combined with Convex, queries are automatically subscribed to real-time WebSockets, guaranteeing that UI states never fall out of sync with your database.

- **Zero API boilerplate**: Direct typed queries and mutations
- **Atomic transactions**: Consistent ACID guarantees
- **Instant sync**: Zero manual cache invalidation needed

> "Great engineering is not about writing more code; it's about creating systems that stay fast and simple as they grow."`,
      },
      {
        id: "post-2",
        slug: "why-design-systems-accelerate-teams",
        title: "Why Modern Design Systems Accelerate Startup Momentum",
        excerpt: "How tokenized components and thoughtful design rules cut development time in half.",
        date: "Jan 15, 2026",
        readTime: "4 min read",
        category: "Design Systems",
        coverImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop",
        published: true,
        content: `A good design system is not just about visual polish; it is a shared grammar that accelerates communication between engineers, founders, and designers.

## From Tokens to Reusable UI Primitives

By standardizing tokens for spacing, typography, and color schemes, new features can be composed in minutes rather than days.

\`\`\`typescript
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-semibold transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/20",
        outline: "border border-border bg-card hover:bg-muted",
      },
    },
  }
);
\`\`\`

:::callout[info]
Tokenization allows seamless light/dark mode switching and custom branding themes without touching individual component files.
:::

> Consistency builds trust with users, and speed builds momentum for product teams.`,
      },
    ],
  },
  contact: {
    sectionLabel: "Have a good idea?",
    title: "Let's make it feel inevitable.",
    subtitle: "Tell me what you're building, where you're stuck, or what could be better. I'll bring clarity, craft, and momentum.",
    email: "vickdev@mjinidigital.co.ke",
    ctaText: "Start a conversation",
    location: "Nairobi, Kenya",
    socials: [
      {
        id: "soc-1",
        platform: "GitHub",
        label: "GitHub",
        url: "https://github.com",
        icon: "Github",
        username: "@victormaina",
      },
      {
        id: "soc-2",
        platform: "LinkedIn",
        label: "LinkedIn",
        url: "https://linkedin.com",
        icon: "Linkedin",
        username: "Victor Maina",
      },
      {
        id: "soc-3",
        platform: "Twitter",
        label: "Twitter / X",
        url: "https://twitter.com",
        icon: "Twitter",
        username: "@victormaina_dev",
      },
    ],
  },
  seo: {
    title: "Victor Maina — Full-stack web developer",
    description: "Victor Maina is a full-stack web developer building thoughtful, high-performing digital experiences.",
    keywords: "Victor Maina, Full-stack developer, Next.js, React, TypeScript, Kenya developer, UI/UX",
    canonicalUrl: "https://victormaina.mjinidigital.co.ke/",
    ogImage: "https://res.cloudinary.com/dcxqwes9x/image/upload/v1738001955/new_jkuh2v.png",
    twitterCard: "summary_large_image",
    allowIndexing: true,
    pages: {
      "/": {
        path: "/",
        pageName: "Home Page",
        title: "Victor Maina — Full-Stack Web Developer & Designer",
        description: "Building high-performance web applications, digital platforms, and thoughtful user interfaces.",
        keywords: "Victor Maina, Full-stack developer, React, Next.js, UI/UX design",
        canonicalUrl: "https://victormaina.mjinidigital.co.ke/",
        noIndex: false,
      },
      "/projects": {
        path: "/projects",
        pageName: "Projects & Portfolio",
        title: "Selected Works & Case Studies — Victor Maina",
        description: "Explore full-stack web apps, e-commerce storefronts, and open-source software built by Victor Maina.",
        keywords: "Victor Maina Portfolio, Web applications, React projects, Next.js showcase",
        canonicalUrl: "https://victormaina.mjinidigital.co.ke//projects",
        noIndex: false,
      },
      "/services": {
        path: "/services",
        pageName: "Services & Offerings",
        title: "Engineering & Design Services — Victor Maina",
        description: "Full-stack engineering, custom UI/UX design systems, and fast digital commerce solutions.",
        keywords: "Web development services, Next.js consulting, UI/UX design systems",
        canonicalUrl: "https://victormaina.mjinidigital.co.ke//services",
        noIndex: false,
      },
      "/blog": {
        path: "/blog",
        pageName: "Blog & Articles",
        title: "Thoughts & Technical Articles — Victor Maina",
        description: "Deep dives into modern frontend architecture, Next.js performance, and design systems.",
        keywords: "Technical blog, Next.js tutorials, Frontend architecture",
        canonicalUrl: "https://victormaina.mjinidigital.co.ke//blog",
        noIndex: false,
      },
      "/contact": {
        path: "/contact",
        pageName: "Contact & Hire",
        title: "Get in Touch — Victor Maina",
        description: "Let’s discuss your next digital project, contract opportunities, or technical consulting.",
        keywords: "Hire Victor Maina, Contact full-stack developer, Kenya developer inquiry",
        canonicalUrl: "https://victormaina.mjinidigital.co.ke//contact",
        noIndex: false,
      },
    },
    apis: {
      googleSiteVerification: "",
      googleAnalyticsId: "",
      googleTagManagerId: "",
      bingVerification: "",
      customHeadScript: "",
    },
  },
  footer: {
    copyright: "© 2026 Victor Maina. Built with care.",
    links: [
      { label: "Back to top", href: "#top" },
      { label: "Work", href: "/projects" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "Email me", href: "mailto:vickdev@mjinidigital.co.ke" },
    ],
  },
  faq: {
    sectionLabel: "Got questions?",
    title: "Frequently Asked Questions",
    subtitle: "Everything you might want to know before we work together. Can't find the answer? Just reach out.",
    items: [
      {
        id: "faq-1",
        order: 1,
        question: "What kind of projects do you take on?",
        answer: "I work on a wide range — from SaaS products and internal tools to portfolio sites and e-commerce platforms. My sweet spot is full-stack web applications where I can own both the backend logic and the user-facing experience.",
      },
      {
        id: "faq-2",
        order: 2,
        question: "What technologies do you work with?",
        answer: "My primary stack includes TypeScript, React, Next.js, and Node.js on the backend. For databases I commonly use PostgreSQL and Convex. I also work with Tailwind CSS, Prisma, Docker, and various third-party APIs.",
      },
      {
        id: "faq-3",
        order: 3,
        question: "How long does a typical project take?",
        answer: "It depends on the scope. A simple landing page or portfolio can be ready in 1–2 weeks. A fully custom web application with auth, a database, and a CMS usually takes 4–12 weeks. I always share a clear timeline in the proposal before we start.",
      },
      {
        id: "faq-4",
        order: 4,
        question: "How do you price your work?",
        answer: "I offer both fixed-price project quotes and hourly/retainer arrangements. Fixed-price works best when scope is well defined. For ongoing work or evolving requirements, a monthly retainer keeps things flexible. We will agree on the right model before signing anything.",
      },
      {
        id: "faq-5",
        order: 5,
        question: "Do you work with clients outside Kenya?",
        answer: "Absolutely. Most of my clients are remote. I work across time zones using async communication via email and Slack, with scheduled video calls for key milestones. I accept payments internationally via PayPal, Wise, and bank transfer.",
      },
      {
        id: "faq-6",
        order: 6,
        question: "Will I own the code when the project is done?",
        answer: "Yes — full ownership is transferred to you upon final payment. You receive the complete source code, deployment credentials, and documentation so you are never locked in. I use GitHub to manage code handoffs cleanly.",
      },
      {
        id: "faq-7",
        order: 7,
        question: "Do you offer post-launch support or maintenance?",
        answer: "Yes. I offer a free 14-day bug-fix window after every launch. Beyond that, you can opt into a monthly maintenance retainer that covers updates, security patches, performance monitoring, and minor feature additions.",
      },
      {
        id: "faq-8",
        order: 8,
        question: "How involved do I need to be during the project?",
        answer: "As much or as little as you prefer. I send weekly progress updates and only need your input at key decision points — design approval, content review, and final sign-off. I handle the rest so you can focus on running your business.",
      },
      {
        id: "faq-9",
        order: 9,
        question: "Can you redesign or improve my existing website?",
        answer: "Definitely. Redesigns and performance overhauls are a big part of what I do. I start with an audit of your current site — speed, accessibility, design, and code quality — then propose targeted improvements that deliver the most value for your investment.",
      },
      {
        id: "faq-10",
        order: 10,
        question: "How do I get started?",
        answer: "Send me a message via the contact form or email me directly. Tell me a bit about your project — what you want to build, your timeline, and your budget range. I will reply within 24 hours with questions or a proposal, and we can take it from there.",
      },
    ],
  },
  lastUpdated: new Date().toISOString(),
};

export const seedWebsiteContent = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("websiteContent")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();

    if (!existing) {
      await ctx.db.insert("websiteContent", {
        key: "main",
        content: initialContentData,
        lastUpdated: new Date().toISOString(),
      });
      return { seeded: true, content: initialContentData };
    }

    return { seeded: false, content: existing.content };
  },
});
