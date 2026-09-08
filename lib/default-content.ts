import { WebsiteContent, PageConfig } from './types/content'

export const defaultPageLayouts: Record<string, PageConfig> = {
  '/': {
    id: 'page-home',
    name: 'Home Page',
    path: '/',
    description: 'Main landing page of the portfolio',
    enabled: true,
    blocks: [
      { id: 'blk-home-hero', type: 'hero', title: 'Hero Section', enabled: true },
      { id: 'blk-home-tech', type: 'techStack', title: 'Tech Stack', enabled: true },
      { id: 'blk-home-logos', type: 'logos', title: 'Logos & Tools', enabled: true },
      { id: 'blk-home-projects', type: 'projects', title: 'Selected Projects', enabled: true },
      { id: 'blk-home-process', type: 'process', title: 'Process Steps', enabled: true },
      { id: 'blk-home-contact', type: 'contact', title: 'Contact Section', enabled: true },
      { id: 'blk-home-faq', type: 'faq', title: 'FAQ Section', enabled: true },
    ]
  },
  '/projects': {
    id: 'page-projects',
    name: 'Projects Page',
    path: '/projects',
    description: 'Full work portfolio & case studies',
    enabled: true,
    blocks: [
      { id: 'blk-proj-grid', type: 'projects', title: 'Full Portfolio Showcase', enabled: true },
      {
        id: 'blk-proj-cta',
        type: 'ctaBanner',
        title: 'Start a Project Banner',
        description: 'Ready to build something exceptional?',
        enabled: true,
        data: {
          description: 'Ready to build something exceptional?',
          ctaText: "Let's talk",
          ctaLink: '/contact',
        },
      }
    ]
  },
  '/services': {
    id: 'page-services',
    name: 'Services Page',
    path: '/services',
    description: 'Engineering & Design Services',
    enabled: true,
    blocks: [
      { id: 'blk-serv-grid', type: 'services', title: 'Engineering & Design Services', enabled: true },
      { id: 'blk-serv-process', type: 'process', title: 'Development Process', enabled: true },
      { id: 'blk-serv-faq', type: 'faq', title: 'Services FAQ', enabled: true }
    ]
  },
  '/templates': {
    id: 'page-templates',
    name: 'Templates Page',
    path: '/templates',
    description: 'Pre-built templates, starter kits & systems',
    enabled: true,
    blocks: [
      { id: 'blk-tmpl-grid', type: 'templates', title: 'Starter Kits & Code', enabled: true },
      {
        id: 'blk-tmpl-cta',
        type: 'ctaBanner',
        title: 'Need a Custom System?',
        description: 'Have specific requirements or need help customizing a template?',
        enabled: true,
        data: {
          description: 'Have specific requirements or need help customizing a template?',
          ctaText: 'Get in Touch',
          ctaLink: '/contact',
        },
      }
    ]
  },
  '/blog': {
    id: 'page-blog',
    name: 'Blog Page',
    path: '/blog',
    description: 'Thoughts & Articles',
    enabled: true,
    blocks: [
      { id: 'blk-blog-posts', type: 'blog', title: 'Writing & Articles', enabled: true }
    ]
  },
  '/contact': {
    id: 'page-contact',
    name: 'Contact Page',
    path: '/contact',
    description: 'Contact form & direct details',
    enabled: true,
    blocks: [
      { id: 'blk-contact-main', type: 'contact', title: 'Contact & Inquiries', enabled: true },
      { id: 'blk-contact-faq', type: 'faq', title: 'Quick Answers FAQ', enabled: true }
    ]
  }
}


export const defaultContent: WebsiteContent = {
  general: {
    siteName: 'Victor Maina',
    siteTagline: 'Full-stack web developer building high-performing digital experiences',
    displayName: 'Victor Maina',
    role: 'Website Developer & SEO Expert',
    shortBio: 'Website Developer & SEO Expert based in Nairobi, Kenya. Crafting high-performance web systems and digital platforms for clients in Kenya, the US, and the UK.',
    avatarUrl: 'https://res.cloudinary.com/dcxqwes9x/image/upload/v1738001955/new_jkuh2v.png',
    location: 'Nairobi, Kenya',
    primaryLocation: 'Nairobi, Kenya',
    areasServed: [
      'Nairobi, Kenya (Main Headquarters)',
      'Kenya (All 47 Counties)',
      'United States (Nationwide & Top Tech Hubs)',
      'United Kingdom (London & Major Cities)',
      'Worldwide (Remote Delivery)',
    ],
    email: 'vickdev@mjinidigital.co.ke',
    phone: '+254 729 396962',
    resumeUrl: '#',
    availableForWork: true,
    statusBadge: 'Available for projects'
  },
  navigation: {
    brandName: 'Victor',
    brandAccent: 'Maina',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Work', href: '/projects' },
      { label: 'Services', href: '/services' },
      { label: 'Templates', href: '/templates' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  hero: {
    badge: 'Full-stack developer',
    titleLine1: 'I build',
    titleHighlight1: 'websites & apps',
    titleLine2: 'that drive business',
    titleHighlight2: 'growth.',
    bio: "I'm Victor Maina, a full-stack web developer who turns ambitious ideas into solutions that help businesses grow and serve their customers better.",
    primaryCtaText: 'See my work',
    primaryCtaLink: '/projects',
    secondaryCtaText: "Let's talk",
    secondaryCtaLink: '/contact',
    locationText: 'Nairobi, Kenya',
    avatarUrl: 'https://res.cloudinary.com/dcxqwes9x/image/upload/v1738001955/new_jkuh2v.png',
    statusCardLabel: 'Currently crafting',
    statusCardText: 'The next big thing',
    statusCardHighlight: '.'
  },
  techStack: {
    sectionLabel: 'Trusted toolkit',
    subtitle: 'The tools behind the work',
    items: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Prisma', 'Docker']
  },
  logos: {
    sectionLabel: 'Built with intention',
    title: 'Tools that move ideas forward.',
    subtitle: 'A flexible stack for shipping thoughtful products from first sketch to final pixel.',
    items: ['Convex', 'Express', 'Payload CMS', 'Strapi', 'Webflow', 'Shopify', 'WordPress', 'Supabase']
  },
  projects: {
    sectionLabel: 'Selected work',
    title: "A few things I've shipped.",
    ctaText: 'Start a project',
    ctaLink: '/contact',
    items: [
      {
        id: 'proj-1',
        title: 'Maji Labs',
        type: 'Product platform',
        description: 'A clean operations workspace that helps distributed teams turn messy workflows into momentum.',
        summary: 'Cloud collaboration platform designed for distributed async teams, featuring real-time workspaces and document sync.',
        content: `### Problem & Context

Distributed product teams frequently lose momentum across scattered tooling and fragmented documentation. Maji Labs unified task orchestration, real-time whiteboards, and lightweight project roadmaps into a single responsive application.

#### Architecture Highlights:
- **Next.js App Router** with nested server component streaming.
- **Convex Reactive Backend** for sub-30ms state synchronizations.
- **Optimistic Mutation UI** providing instant local feedback.

:::callout[tip]
Achieved sub-100ms cold start latency and handled 10,000+ daily active collaborative document updates during peak beta testing.
:::`,
        tags: ['Next.js', 'Convex', 'Tailwind'],
        accent: 'bg-primary',
        link: 'https://github.com',
        featured: true,
        category: 'Web Application',
        liveUrl: 'https://example.com/maji-labs',
        githubUrl: 'https://github.com',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 'proj-2',
        title: 'Nuru Commerce',
        type: 'E-commerce experience',
        description: 'A fast, conversion-focused storefront designed to make every product feel considered.',
        summary: 'Custom headless e-commerce storefront with optimized mobile checkouts and sub-second catalog search.',
        content: `### E-Commerce Performance Overhaul

Re-engineered an omnichannel retail brand from a monolithic slow theme to an ultrafast headless React storefront.

#### Key Results:
- **Conversion Rate**: +34% uplift on mobile checkout completions.
- **Page Load Time**: Reduced from 4.2s to 0.7s average First Contentful Paint.
- **Global Payments**: Integrated localized payment methods alongside standard credit card processing.`,
        tags: ['Shopify', 'React', 'Storefront API'],
        accent: 'bg-foreground',
        link: 'https://github.com',
        featured: true,
        category: 'E-Commerce',
        liveUrl: 'https://example.com/nuru-commerce',
        githubUrl: 'https://github.com',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 'proj-3',
        title: 'Kora Studio',
        type: 'Brand & web system',
        description: 'A flexible visual system and content engine for a modern creative practice.',
        tags: ['Webflow', 'Strapi', 'GSAP'],
        accent: 'bg-muted-foreground',
        link: 'https://github.com',
        featured: true,
        category: 'Branding & Web',
        liveUrl: 'https://example.com/kora-studio',
        githubUrl: 'https://github.com',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 'proj-4',
        title: 'Pulse Analytics',
        type: 'SaaS Platform',
        description: 'Real-time user engagement and performance analytics dashboard with custom reporting.',
        tags: ['Next.js', 'TypeScript', 'ClickHouse'],
        accent: 'bg-emerald-600',
        link: 'https://github.com',
        featured: false,
        category: 'SaaS',
        liveUrl: 'https://example.com/pulse',
        githubUrl: 'https://github.com',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop'
      }
    ]
  },
  process: {
    sectionLabel: 'How I work',
    title: 'From rough idea to real-world impact.',
    steps: [
      {
        id: 'proc-1',
        stepNumber: '01',
        title: 'Clarify',
        description: 'We define the sharpest version of the problem and the smallest path to value.'
      },
      {
        id: 'proc-2',
        stepNumber: '02',
        title: 'Create',
        description: 'I design and build a durable system that feels simple to use and easy to grow.'
      },
      {
        id: 'proc-3',
        stepNumber: '03',
        title: 'Launch',
        description: 'We ship, learn from real users, and keep improving what matters most.'
      }
    ]
  },
  services: {
    sectionLabel: 'What I do',
    title: 'Engineering & Design Services',
    subtitle: 'Tailored solutions built with modern technology, obsessive performance, and attention to detail.',
    items: [
      {
        id: 'serv-1',
        title: 'Full-Stack Web Development',
        description: 'Custom Next.js & React applications built from scratch with clean architecture, high speed, and scalability.',
        icon: 'Code2',
        price: 'Custom scope',
        popular: true,
        features: [
          'Next.js & TypeScript architecture',
          'Database modeling & API integration',
          'Responsive mobile-first layout',
          'SEO & Core Web Vitals optimization'
        ],
        summary: 'Production-ready full-stack applications with high performance, secure auth, and scalable database backends.',
        content: `### Complete Full-Stack Web Development

Turn complex product requirements into resilient web applications with modern architecture and delightful UX.

#### Core Deliverables:
- **Application Architecture**: Type-safe Next.js 15+ application with server components and edge rendering.
- **Backend & Database**: Convex or PostgreSQL database schema design, reactive mutations, and API integrations.
- **State & Authentication**: Production-grade auth flow, session management, and role-based access control.
- **Testing & Deployment**: Automated CI/CD pipelines, Vercel optimization, and Lighthouse 95+ performance scores.

:::callout[tip]
Every full-stack project includes 14 days of complimentary post-launch support and handoff documentation.
:::`,
      },
      {
        id: 'serv-2',
        title: 'E-Commerce & Digital Storefronts',
        description: 'High-converting online stores that provide smooth checkout journeys and frictionless user experiences.',
        icon: 'ShoppingBag',
        price: 'From $1,500',
        popular: false,
        features: [
          'Shopify & Headless storefronts',
          'Payment gateway integrations',
          'Inventory & Order management',
          'Fast checkout flow optimization'
        ],
        summary: 'Modern headless commerce platforms engineered for rapid conversions, localized currencies, and instant page loads.',
        content: `### High-Converting Digital Storefronts

Build a unique shopping experience that stands out from generic templates and converts visitors into loyal customers.

#### Key Capabilities:
- **Headless Commerce**: Shopify Storefront API or Stripe checkout integrations with sub-second page loads.
- **Custom Product Filtering**: Instant faceted search, variant selectors, and dynamic inventory badges.
- **Global Payments**: Multi-currency checkout, mobile money (M-Pesa), credit card processing, and localized tax calculations.`,
      },
      {
        id: 'serv-3',
        title: 'UI/UX Design Systems',
        description: 'Design systems, brand guidelines, and interactive Figma prototypes that turn complex products into intuitive software.',
        icon: 'Palette',
        price: 'From $1,200',
        popular: false,
        features: [
          'Figma design systems & UI kits',
          'Interactive clickable prototypes',
          'Micro-interactions & animations',
          'Design-to-code token alignment'
        ],
        summary: 'Scalable design systems and component libraries that align engineering teams and elevate brand consistency.',
        content: `### Design Systems & Product Strategy

Bridge the gap between design and engineering with a reusable token-driven design system.

#### Deliverables:
- **Figma Component Library**: Comprehensive components with auto-layout, light/dark themes, and design tokens.
- **Interactive Prototyping**: Clickable flows to validate user journeys before writing a single line of code.
- **Tailwind / CSS Integration**: Seamless translation of Figma tokens directly into clean React code.`,
      }
    ]
  },
  templates: {
    sectionLabel: 'Starter Kits & Code',
    title: 'Pre-built Templates & Systems',
    subtitle: 'Production-ready web templates, design systems, and developer starter kits to accelerate your next launch.',
    items: [
      {
        id: 'tmpl-1',
        title: 'SaaS Platform Starter Kit',
        slug: 'saas-starter-kit',
        category: 'Next.js & Convex',
        description: 'Complete multi-tenant SaaS foundation with authentication, billing, dashboard layouts, and dark mode.',
        summary: 'Production boilerplate equipped with Convex reactive backend, Better Auth, and Stripe subscription billing.',
        tags: ['Next.js', 'Convex', 'Tailwind CSS', 'TypeScript'],
        price: '$49',
        liveDemoUrl: 'https://example.com/saas-demo',
        githubUrl: 'https://github.com',
        previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
        features: [
          'Full-stack Next.js App Router + TypeScript',
          'Convex reactive database and server functions',
          'Authentication with OAuth and email magic links',
          'Tailwind CSS design system with custom tokens',
          'Responsive dashboard and administration analytics'
        ],
        featured: true,
        content: `### SaaS Platform Starter Kit

Launch your SaaS in days rather than months with a battle-tested architecture.

#### Highlights:
- **Type-Safe Backend**: Powered by Convex with automatic end-to-end schema synchronization.
- **Production UI**: Over 25 pre-built components including metrics widgets, data tables, and settings tabs.
- **Ready for Monetization**: Integrated Stripe webhooks and subscription management.

:::callout[info]
Includes lifetime updates, GitHub repository access, and commercial license for unlimited personal and client projects.
:::`
      },
      {
        id: 'tmpl-2',
        title: 'Minimalist Portfolio & Blog',
        slug: 'minimal-portfolio',
        category: 'Portfolio',
        description: 'Ultra-fast portfolio template for software engineers, designers, and tech creators with a markdown-powered CMS.',
        summary: 'Clean, typography-driven portfolio with light/dark theme switching and project case study layouts.',
        tags: ['React', 'Next.js', 'Framer Motion'],
        price: '$29',
        liveDemoUrl: 'https://example.com/portfolio-demo',
        githubUrl: 'https://github.com',
        previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
        features: [
          'Obsessive typography and smooth page transitions',
          'Markdown and rich-text rendering for case studies',
          'SEO optimized with dynamic OpenGraph generation',
          'Lighthouse 100/100 performance across all metrics'
        ],
        featured: true,
        content: `### Minimalist Portfolio & Blog

Showcase your craft with an understated, elegant portfolio designed to highlight your work and writing.

#### What is Included:
- **Project Case Studies**: Rich markdown layout supporting code snippets, responsive images, and video embeds.
- **Client Testimonials & Services**: Structured sections ready to customize with your offerings.
- **Contact Form**: Plug-and-play email inquiry form with validation.`
      }
    ]
  },
  blog: {
    sectionLabel: 'Thoughts & Insights',
    title: 'Writing on code, design, and product.',
    subtitle: 'Reflections from shipping products, architectural patterns, and lessons learned along the way.',
    posts: [
      {
        id: 'post-1',
        slug: 'building-performant-nextjs-apps',
        title: 'Building High-Performance Next.js Web Apps in 2026',
        excerpt: 'A deep dive into server components, caching strategies, and streaming rendering for speed.',
        date: 'Feb 24, 2026',
        readTime: '6 min read',
        category: 'Engineering',
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
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
        id: 'post-2',
        slug: 'why-design-systems-accelerate-teams',
        title: 'Why Modern Design Systems Accelerate Startup Momentum',
        excerpt: 'How tokenized components and thoughtful design rules cut development time in half.',
        date: 'Jan 15, 2026',
        readTime: '4 min read',
        category: 'Design Systems',
        coverImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop',
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
    ]
  },
  contact: {
    sectionLabel: 'Have a good idea?',
    title: "Let's make it feel inevitable.",
    subtitle: "Tell me what you're building, where you're stuck, or what could be better. I'll bring clarity, craft, and momentum.",
    email: 'vickdev@mjinidigital.co.ke',
    ctaText: 'Start a conversation',
    location: 'Nairobi, Kenya',
    socials: [
      {
        id: 'soc-1',
        platform: 'GitHub',
        label: 'GitHub',
        url: 'https://github.com',
        icon: 'Github',
        username: '@victormaina'
      },
      {
        id: 'soc-2',
        platform: 'LinkedIn',
        label: 'LinkedIn',
        url: 'https://linkedin.com',
        icon: 'Linkedin',
        username: 'Victor Maina'
      },
      {
        id: 'soc-3',
        platform: 'Twitter',
        label: 'Twitter / X',
        url: 'https://twitter.com',
        icon: 'Twitter',
        username: '@victormaina_dev'
      }
    ]
  },
  seo: {
    title: 'Victor Maina — Website Developer & SEO Expert',
    description: 'Professional Website Developer & SEO Expert based in Nairobi, Kenya, serving clients across all 47 Kenya counties, the United States, the United Kingdom, and worldwide.',
    keywords: 'Website Developer Nairobi, SEO Expert Kenya, Web Developer Kenya 47 Counties, Website Developer USA, SEO Expert UK, Next.js Developer Nairobi, Full-Stack Developer Kenya, WordPress to Next.js Migration',
    canonicalUrl: 'https://victormaina.dev',
    ogImage: 'https://res.cloudinary.com/dcxqwes9x/image/upload/v1738001955/new_jkuh2v.png',
    twitterCard: 'summary_large_image',
    allowIndexing: true,
    primaryLocation: 'Nairobi, Kenya',
    areasServed: [
      'Nairobi, Kenya (Main Headquarters)',
      'Kenya (All 47 Counties)',
      'United States (Top States & Tech Hubs)',
      'United Kingdom (London & Major Cities)',
      'Worldwide',
    ],
    pages: {
      '/': {
        path: '/',
        pageName: 'Home Page',
        title: 'Victor Maina — Website Developer & SEO Expert | Nairobi, Kenya',
        description: 'Building high-performance web applications, digital platforms, and SEO-optimized web systems in Nairobi, Kenya, USA, UK, and worldwide.',
        keywords: 'Victor Maina, Website Developer Nairobi, SEO Expert Kenya, Next.js developer, Web design Kenya',
        canonicalUrl: 'https://victormaina.dev',
        noIndex: false,
      },
      '/projects': {
        path: '/projects',
        pageName: 'Projects & Portfolio',
        title: 'Selected Works & Case Studies — Victor Maina',
        description: 'Explore full-stack web apps, e-commerce storefronts, and open-source software built by Victor Maina.',
        keywords: 'Victor Maina Portfolio, Web applications, React projects, Next.js showcase',
        canonicalUrl: 'https://victormaina.dev/projects',
        noIndex: false,
      },
      '/services': {
        path: '/services',
        pageName: 'Services & Offerings',
        title: 'Engineering & Design Services — Victor Maina',
        description: 'Full-stack engineering, custom UI/UX design systems, and fast digital commerce solutions.',
        keywords: 'Web development services, Next.js consulting, UI/UX design systems',
        canonicalUrl: 'https://victormaina.dev/services',
        noIndex: false,
      },
      '/templates': {
        path: '/templates',
        pageName: 'Templates & Starter Kits',
        title: 'Templates & Starter Kits — Victor Maina',
        description: 'Production-ready web templates, design systems, and developer starter kits.',
        keywords: 'Next.js templates, Convex starter kits, SaaS boilerplates, UI kits',
        canonicalUrl: 'https://victormaina.dev/templates',
        noIndex: false,
      },
      '/blog': {
        path: '/blog',
        pageName: 'Blog & Articles',
        title: 'Thoughts & Technical Articles — Victor Maina',
        description: 'Deep dives into modern frontend architecture, Next.js performance, and design systems.',
        keywords: 'Technical blog, Next.js tutorials, Frontend architecture',
        canonicalUrl: 'https://victormaina.dev/blog',
        noIndex: false,
      },
      '/contact': {
        path: '/contact',
        pageName: 'Contact & Hire',
        title: 'Get in Touch — Victor Maina',
        description: 'Let’s discuss your next digital project, contract opportunities, or technical consulting.',
        keywords: 'Hire Victor Maina, Contact full-stack developer, Kenya developer inquiry',
        canonicalUrl: 'https://victormaina.dev/contact',
        noIndex: false,
      },
    },
    apis: {
      googleSiteVerification: '',
      googleAnalyticsId: '',
      googleTagManagerId: '',
      bingVerification: '',
      customHeadScript: '',
    },
  },
  footer: {
    copyright: '© 2026 Victor Maina. Built with care.',
    links: [
      { label: 'Back to top', href: '#top' },
      { label: 'Work', href: '/projects' },
      { label: 'Services', href: '/services' },
      { label: 'Templates', href: '/templates' },
      { label: 'Blog', href: '/blog' },
      { label: 'Email me', href: 'mailto:vickdev@mjinidigital.co.ke' }
    ]
  },
  faq: {
    sectionLabel: 'Got questions?',
    title: 'Frequently Asked Questions',
    subtitle: "Everything you might want to know before we work together. Can't find the answer? Just reach out.",
    items: [
      {
        id: 'faq-1',
        order: 1,
        question: 'What kind of projects do you take on?',
        answer: 'I work on a wide range — from SaaS products and internal tools to portfolio sites and e-commerce platforms. My sweet spot is full-stack web applications where I can own both the backend logic and the user-facing experience.',
      },
      {
        id: 'faq-2',
        order: 2,
        question: 'What technologies do you work with?',
        answer: 'My primary stack includes TypeScript, React, Next.js, and Node.js on the backend. For databases I commonly use PostgreSQL and Convex. I also work with Tailwind CSS, Prisma, Docker, and various third-party APIs.',
      },
      {
        id: 'faq-3',
        order: 3,
        question: 'How long does a typical project take?',
        answer: 'It depends on the scope. A simple landing page or portfolio can be ready in 1–2 weeks. A fully custom web application with auth, a database, and a CMS usually takes 4–12 weeks. I always share a clear timeline in the proposal before we start.',
      },
      {
        id: 'faq-4',
        order: 4,
        question: 'How do you price your work?',
        answer: 'I offer both fixed-price project quotes and hourly/retainer arrangements. Fixed-price works best when scope is well defined. For ongoing work or evolving requirements, a monthly retainer keeps things flexible. We will agree on the right model before signing anything.',
      },
      {
        id: 'faq-5',
        order: 5,
        question: 'Do you work with clients outside Kenya?',
        answer: 'Absolutely. Most of my clients are remote. I work across time zones using async communication via email and Slack, with scheduled video calls for key milestones. I accept payments internationally via PayPal, Wise, and bank transfer.',
      },
      {
        id: 'faq-6',
        order: 6,
        question: 'Will I own the code when the project is done?',
        answer: 'Yes — full ownership is transferred to you upon final payment. You receive the complete source code, deployment credentials, and documentation so you are never locked in. I use GitHub to manage code handoffs cleanly.',
      },
      {
        id: 'faq-7',
        order: 7,
        question: 'Do you offer post-launch support or maintenance?',
        answer: 'Yes. I offer a free 14-day bug-fix window after every launch. Beyond that, you can opt into a monthly maintenance retainer that covers updates, security patches, performance monitoring, and minor feature additions.',
      },
      {
        id: 'faq-8',
        order: 8,
        question: 'How involved do I need to be during the project?',
        answer: 'As much or as little as you prefer. I send weekly progress updates and only need your input at key decision points — design approval, content review, and final sign-off. I handle the rest so you can focus on running your business.',
      },
      {
        id: 'faq-9',
        order: 9,
        question: 'Can you redesign or improve my existing website?',
        answer: 'Definitely. Redesigns and performance overhauls are a big part of what I do. I start with an audit of your current site — speed, accessibility, design, and code quality — then propose targeted improvements that deliver the most value for your investment.',
      },
      {
        id: 'faq-10',
        order: 10,
        question: 'How do I get started?',
        answer: "Send me a message via the contact form or email me directly. Tell me a bit about your project — what you want to build, your timeline, and your budget range. I will reply within 24 hours with questions or a proposal, and we can take it from there.",
      },
    ],
  },
  pageLayouts: defaultPageLayouts
}


