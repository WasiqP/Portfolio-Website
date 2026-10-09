// ───────────────────────────────────────────────────────────────────────────
// CINEMATIC CHAIN CONTENT — FEATURED_PROJECTS, FULL_SERVICE_PILLARS,
// SERVICE_SPINE_ITEMS, PROCESS_STEPS, FAQ_ITEMS. Edit copy here; the chain
// component (`CinematicChain.tsx`) only renders this data + hardcoded labels.
// ───────────────────────────────────────────────────────────────────────────

export type ServicePillarIcon = "zap" | "server" | "pen";

/** How long each lane auto-rotates in the Selected Work section. */
export const WORK_LANE_ROTATE_MS = 10_000;

export type ProjectMetric = { value: string; label: string; hint: string };

export type FeaturedProject = {
  id: string;
  title: string;
  category: string;
  year: string;
  desc: string;
  pillarId: string;
  scope: string;
  gradient: string;
  href: string;
  video?: string;
  metric?: ProjectMetric;
  highlights: string[];
  stack: string[];
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "berryhelp",
    title: "BerryHelp",
    category: "AI & Data Science",
    year: "2024",
    desc: "React 19 web app with a cinematic marketing landing and an AI chat consultant covering US, UK, Canada, Schengen, and more—with document checklists and official source links.",
    pillarId: "ai-data",
    scope: "AI Immigration Consultant Web App",
    gradient: "linear-gradient(145deg, #0a0a0a 0%, #ccff8b 85%)",
    href: "/projects/berryhelp",
    video: "https://res.cloudinary.com/euquvsnk/video/upload/v1791541672/BerryHelp.mp4",
    highlights: [
      "Cinematic marketing landing with GSAP + Lenis",
      "AI chat consultant with structured visa knowledge base",
      "Document checklists and official source links for US, UK, Canada, Schengen+",
    ],
    stack: ["React", "JavaScript", "Web Design", "AI Chatbot", "AI Agent Development"],
  },
  {
    id: "scopeshield",
    title: "ScopeShield",
    category: "AI & Data Science",
    year: "2024",
    desc: "Complete SaaS MVP that helps freelancers catch scope creep before unpaid work—AI risk scores, severity flags, and change-order drafts from pasted client messages.",
    pillarId: "ai-data",
    scope: "AI SaaS for Freelancer Scope Creep Detection",
    gradient: "linear-gradient(160deg, #141414 0%, #a8e063 100%)",
    href: "/projects/scopeshield",
    video: "https://res.cloudinary.com/euquvsnk/video/upload/v1791541662/ScopeSheild2.mp4",
    highlights: [
      "Landing, JWT auth, dashboard, and AI engine with demo mode",
      "Risk scores, severity flags, and change-order drafts",
      "Portfolio-ready MVP with pricing tiers and full workflow",
    ],
    stack: ["TypeScript", "REST API", "PostgreSQL", "Full-Stack Development", "SaaS Development"],
  },
  {
    id: "teachtrack",
    title: "TeachTrack",
    category: "IT & Software",
    year: "2024",
    desc: "AI-assisted EdTech platform unifying class management, attendance, quizzes, homework, and grading—web and React Native mobile in one teacher-first workspace.",
    pillarId: "it-software",
    scope: "EdTech SaaS for Teachers",
    gradient: "linear-gradient(145deg, #0a0a0a 40%, #ccff8b 100%)",
    href: "/projects/teachtrack",
    video: "https://res.cloudinary.com/euquvsnk/video/upload/v1791541648/teach-track.mp4",
    highlights: [
      "Unified web + React Native teacher workspace",
      "One-tap attendance, quiz builder, and grade reports",
      "AI-assisted lesson planning in the product flow",
    ],
    stack: ["React", "React Native", "Web Development", "Mobile App Development", "SaaS Development"],
  },
  {
    id: "coffee-crew-berry",
    title: "Coffee Crew Berry",
    category: "IT & Software",
    year: "2024",
    desc: "Production headless commerce on Shopify Storefront GraphQL—Next.js 14, optimistic cart via Zustand, and motion-rich UI tuned for conversion and Core Web Vitals.",
    pillarId: "it-software",
    scope: "Custom Headless E-Commerce Engine on Shopify",
    gradient: "linear-gradient(155deg, #1a1a1a 0%, #ccff8b 70%)",
    href: "/projects/coffee-crew-berry",
    video: "https://res.cloudinary.com/euquvsnk/video/upload/v1791541668/coffee-crew-berry.mp4",
    highlights: [
      "Headless Next.js 14 storefront on Shopify Storefront GraphQL",
      "Optimistic cart via Zustand + RSC App Router architecture",
      "Motion-rich UI with GSAP, Lenis, and reduced-motion support",
    ],
    stack: ["Next.js", "Shopify", "GraphQL", "TypeScript", "GSAP"],
  },
  {
    id: "luxury-jewelry",
    title: "Luxury Jewelry E-Commerce",
    category: "Branding & Marketing",
    year: "2024",
    desc: "Cinematic boutique storefront—hero video, workshop films, full shop flow, and localStorage cart—built in Next.js 15 with CSS-only motion for lean bundles.",
    pillarId: "creative-media",
    scope: "Cinematic Boutique Website",
    gradient: "linear-gradient(145deg, #050505 0%, #ccff8b 90%)",
    href: "/projects/luxury-jewelry",
    video: "https://res.cloudinary.com/euquvsnk/video/upload/v1791541630/jewellry-website.mp4",
    highlights: [
      "Cinematic homepage with workshop films and editorial imagery",
      "Full shop flow: catalog, PDPs, localStorage cart drawer",
      "CSS-only motion for smaller bundles and smoother scroll",
    ],
    stack: ["Next.js", "JavaScript", "Front-End Development", "Web Design", "Shopify"],
  },
  {
    id: "cold-drink-ecommerce",
    title: "Cold Drink E-Commerce",
    category: "Branding & Marketing",
    year: "2024",
    desc: "Fully responsive beverage storefront from scratch—product listings, category filtering, and conversion-friendly layout optimized for desktop and mobile.",
    pillarId: "creative-media",
    scope: "Full-Stack Web Development",
    gradient: "linear-gradient(150deg, #0a0a0a 25%, #b8ff6a 100%)",
    href: "/projects/cold-drink-ecommerce",
    video: "https://res.cloudinary.com/euquvsnk/video/upload/v1791541616/cola-next-video.mp4",
    highlights: [
      "Responsive storefront with listings and category filtering",
      "Fast load times and conversion-friendly layout",
      "Brand identity tailored to the beverage niche",
    ],
    stack: ["React", "Web Design", "UI/UX Prototyping", "Web Development", "Front-End Development"],
  },
];

export type ServicePillar = {
  id: string;
  num: string;
  icon: ServicePillarIcon;
  title: string;
  coverLine: string;
  spotlight: string;
  lede: string;
  outcomes: string[];
  deliverables: string[];
  engagements: string;
};

export const FULL_SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "ai-data",
    num: "01",
    icon: "zap",
    title: "AI & Data Science",
    coverLine: "Models, pipelines, MLOps, and interfaces your team can run.",
    spotlight:
      "radial-gradient(60% 60% at 50% 40%, rgba(204, 255, 139, 0.32) 0%, rgba(204, 255, 139, 0.14) 45%, rgba(255, 255, 255, 0) 75%)",
    lede: "Decision systems, not slide decks. I connect your data to models and interfaces your team can trust, monitor, and extend.",
    outcomes: [
      "Clear baselines and success metrics before a single line of model code",
      "Pipelines that survive real traffic, drift, and messy inputs",
      "Documentation and handover so you are not dependent on a black box",
    ],
    deliverables: [
      "ML & deep learning prototypes through production",
      "ETL / ELT, warehousing patterns, and analytics layers",
      "MLOps, evaluation harnesses, and observability hooks",
      "LLM / agent workflows with guardrails and cost controls",
      "Dashboards and APIs that expose predictions responsibly",
    ],
    engagements: "Audits & PoCs · MVP models · Production rollouts",
  },
  {
    id: "it-software",
    num: "02",
    icon: "server",
    title: "IT & Software Services",
    coverLine: "Cloud, apps, APIs, integrations—built to scale and hand over cleanly.",
    spotlight:
      "radial-gradient(60% 60% at 50% 40%, rgba(204, 255, 139, 0.28) 0%, rgba(204, 255, 139, 0.12) 45%, rgba(255, 255, 255, 0) 75%)",
    lede: "Reliable products and platforms underneath the brand. Architecture, implementation, and operations as one thread, handled personally—not handed off between vendors.",
    outcomes: [
      "Systems you can deploy, scale, and hand to an internal team",
      "Security and performance considered from day one, not as a retrofit",
      "Honest estimates tied to milestones you can plan around",
    ],
    deliverables: [
      "Web & mobile apps (React, Next.js, Flutter, native where needed)",
      "APIs, microservices, and integration layers",
      "Cloud on AWS / GCP / Azure—infra as code, CI/CD",
      "Databases, caching, messaging, and search",
      "Legacy modernization and incremental rewrites",
    ],
    engagements: "Greenfield builds · Platform hardening · Ongoing SRE-style support",
  },
  {
    id: "creative-media",
    num: "03",
    icon: "pen",
    title: "Production, Marketing & Branding",
    coverLine: "Identity, campaigns, motion, and content tied to real launches.",
    spotlight:
      "radial-gradient(60% 60% at 50% 40%, rgba(204, 255, 139, 0.26) 0%, rgba(204, 255, 139, 0.11) 45%, rgba(255, 255, 255, 0) 75%)",
    lede: "Creative that matches the product story. Identity, campaigns, and content engineered to convert—not just win awards.",
    outcomes: [
      "Brand and product narratives that engineering can actually ship against",
      "Campaign assets ready for every channel you own",
      "Guidelines your team can apply without me in the room",
    ],
    deliverables: [
      "Brand strategy, naming, and visual identity systems",
      "UX / UI for web and product surfaces",
      "Campaign creative, social, and paid media suites",
      "Photo, video, motion, and launch storytelling",
      "Design systems tied to real components where it helps",
    ],
    engagements: "Launches & relaunches · Retainers for always-on content",
  },
];

export const SERVICE_SPINE_ITEMS = [
  "Discovery & roadmapping",
  "Solution architecture",
  "UX research & prototyping",
  "Design systems",
  "Quality & test strategy",
  "DevOps & release management",
  "Analytics & attribution",
  "Training & handover",
] as const;

export const FAQ_ITEMS = [
  {
    id: "pricing",
    q: "How do you structure pricing and engagements?",
    a: "I scope from outcomes: a fixed estimate for discovery and a proposal, then milestone-based delivery for build. You always know what ships next, what it costs, and who owns the decision—not an open-ended retainer unless you explicitly want one for ongoing work.",
  },
  {
    id: "timeline",
    q: "What does a realistic timeline look like?",
    a: "Small products or campaign systems often land in weeks to a couple of months; larger platforms or multi-surface brands take longer by design. I front-load alignment so estimates reflect engineering, data, and creative together—not a disconnected guess.",
  },
  {
    id: "remote",
    q: "Do you work fully remote or on-site?",
    a: "I'm remote-first, based in Pakistan with overlap-friendly hours for international teams. I'm happy to join calls, workshops, or the occasional on-site visit when it materially reduces risk—never for theater.",
  },
  {
    id: "ip",
    q: "Who owns the code and creative when the project ships?",
    a: "You own your IP. Repos, environments, and brand assets are transferred with clear handover docs. I don't gatekeep access behind proprietary black boxes—I want you operating independently after launch.",
  },
  {
    id: "after",
    q: "What happens after launch—support and iteration?",
    a: "I offer structured post-launch support: fixes, monitoring where relevant, and a sane backlog for improvements. You choose the level of ongoing partnership; I don't force lock-in.",
  },
  {
    id: "start",
    q: "What do I need from you to get started?",
    a: "A short intake on goals, constraints, and stakeholders; access to whatever systems or brand materials exist today; and a single accountable contact on your side. From there I propose a concrete first milestone—usually within days of the first call.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    id: "discover",
    title: "Discover",
    body: "I listen, research, and map the problem space. Stakeholder interviews, competitive audits, and technical feasibility—so the brief is airtight before a single pixel moves.",
  },
  {
    id: "design",
    title: "Design",
    body: "Strategy becomes structure. Wireframes, prototypes, and visual systems shaped by user insight—iterated until the direction feels inevitable.",
  },
  {
    id: "build",
    title: "Build",
    body: "Design and engineering run in parallel, even solo. Focused sprints, transparent progress, and continuous integration keep quality high and surprises low.",
  },
  {
    id: "launch",
    title: "Launch",
    body: "Staging, QA, migration, and go-live. I handle the infrastructure and the launch plan so your launch day is a celebration, not a crisis.",
  },
  {
    id: "measure",
    title: "Measure",
    body: "Dashboards, analytics, and retrospectives. I track what matters, learn what worked, and feed insights back into the next iteration.",
  },
] as const;
