export type Service = {
  id: string
  title: string
  summary: string
  description: string
  bestFor: string
  deliverables: string[]
  stack: string[]
}

export const services: Service[] = [
  {
    id: 'saas',
    title: 'SaaS Products',
    summary:
      'Production-ready SaaS platforms with auth, dashboards, and room to grow.',
    description:
      'I design and ship full SaaS products end-to-end — from the first schema to the admin panel your team actually uses. That includes multi-tenant foundations, role-based access, billing-ready auth, REST/GraphQL APIs, and dashboards that stay fast as usage grows. The goal is a maintainable product you can sell and extend, not a fragile prototype.',
    bestFor:
      'Founders and teams launching a B2B or B2C product that needs real accounts, data, and admin tooling.',
    deliverables: [
      'Multi-tenant architecture with clear org / user boundaries',
      'Auth, roles, sessions, and invite flows',
      'Admin dashboards for ops, content, and metrics',
      'API layer ready for web, mobile, and integrations',
      'Billing-ready foundations when you need paid plans',
    ],
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Prisma'],
  },
  {
    id: 'ai',
    title: 'AI-Powered Applications',
    summary:
      'Chat consultants, agents, and OpenAI-powered workflows that ship — not slideware.',
    description:
      'I build AI features that sit inside real products: chat consultants with structured knowledge bases, risk-scoring agents, lesson planners, automation pipelines, and OpenAI integrations with demo modes and production guardrails. The focus is useful behavior, clear UX, and systems you can monitor — not a chatbot demo that dies after the pitch.',
    bestFor:
      'Products that need AI copilots, consultants, scoring engines, or automation wired into existing workflows.',
    deliverables: [
      'OpenAI / LLM integrations with prompt and tool design',
      'Knowledge-base agents with sources and checklists',
      'Risk scores, drafts, and structured AI outputs',
      'Demo modes for pitching without burning API spend',
      'Guardrails, logging, and fallbacks for production use',
    ],
    stack: ['OpenAI APIs', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL'],
  },
  {
    id: 'web',
    title: 'Web Applications',
    summary:
      'Custom web apps and marketing sites on React, Next.js, and TypeScript.',
    description:
      'From cinematic landing pages to full product dashboards, I build web apps that feel intentional. Next.js App Router, React Server Components, TypeScript, motion (GSAP / Framer), and conversion-focused UI — with accessibility and Core Web Vitals treated as part of the build, not a later cleanup.',
    bestFor:
      'Startups and brands that need a polished web product, marketing site, or client portal that performs.',
    deliverables: [
      'App Router architectures with React Server Components',
      'Marketing landings with scroll motion and Lenis where it fits',
      'Authenticated app shells and dashboards',
      'Responsive layouts tuned for desktop and mobile',
      'Performance work: bundle size, LCP, and scroll smoothness',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP'],
  },
  {
    id: 'mobile',
    title: 'Mobile Applications',
    summary:
      'React Native apps with clean architecture and store-ready polish.',
    description:
      'I build cross-platform mobile apps in React Native that share product logic with web when it helps — attendance flows, quizzes, teacher tools, consumer apps — with UX that feels native enough for App Store and Play releases. Clean screens, reliable navigation, and APIs that stay in sync with the rest of your stack.',
    bestFor:
      'Teams that need iOS + Android from one codebase without sacrificing product clarity.',
    deliverables: [
      'React Native apps for iOS and Android',
      'Shared API contracts with your web product',
      'One-tap flows for high-frequency actions (e.g. attendance)',
      'Navigation, auth states, and offline-friendly patterns when needed',
      'Store-ready polish: spacing, feedback, and release-ready builds',
    ],
    stack: ['React Native', 'TypeScript', 'REST APIs', 'Firebase'],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Platforms',
    summary:
      'Headless Shopify, boutique storefronts, and conversion-friendly product flows.',
    description:
      'I ship storefronts that sell — headless Shopify on Next.js with Storefront GraphQL, custom catalogs and PDPs, optimistic carts, and brand-led UI for coffee, jewelry, beverage, and DTC niches. Template themes get replaced with a performance-minded design system built for conversion and Core Web Vitals.',
    bestFor:
      'Brands that have outgrown template themes and need a custom commerce experience.',
    deliverables: [
      'Headless Next.js storefronts on Shopify Storefront GraphQL',
      'Product catalogs, PDPs, collections, and cart / checkout flows',
      'Optimistic cart updates and mock-data local environments',
      'Motion-rich, accessible UI with reduced-motion support',
      'Brand identity tailored to luxury, beverage, or DTC niches',
    ],
    stack: ['Next.js', 'Shopify', 'GraphQL', 'TypeScript', 'Zustand'],
  },
  {
    id: 'mvp',
    title: 'Startup MVPs',
    summary:
      'From idea to maintainable MVP — scoped to ship, not to inflate a roadmap.',
    description:
      'I help founders turn a messy idea into a scoped, shippable MVP: landing page, auth, core workflow, and enough polish to put in front of real users. Product thinking sits next to engineering — what to cut, what to keep, and how to leave the codebase ready for the next version instead of a rewrite.',
    bestFor:
      'Early-stage founders who need a credible first version in weeks, not a bloated quarter-long build.',
    deliverables: [
      'Scoped MVP plans with clear must-haves vs later',
      'Landing + auth + core product loop in one build',
      'API integrations and third-party glue (payments, email, AI)',
      'Maintainable structure so you can iterate after launch',
      'Walkthroughs and handoff so you can demo with confidence',
    ],
    stack: ['Next.js', 'React', 'Python', 'PostgreSQL', 'OpenAI'],
  },
]
