export type Project = {
  slug: string
  title: string
  tagline: string
  /** Human problem this product solves — used in Selected Work */
  problem: string
  description: string
  role: string
  year: string
  stack: string[]
  outcomes: string[]
  links?: {
    live?: string
    case?: string
  }
  /** Preview video URL (Cloudinary) */
  video?: string
  accent: string
}

export const projects: Project[] = [
  {
    slug: 'berryhelp',
    title: 'BerryHelp',
    tagline: 'AI Immigration Consultant Web App',
    problem: 'Visa answers without paying for basic guidance',
    description:
      'Goals: Help immigrants and travelers get clear visa answers without paying for basic guidance. Solution: BerryHelp — a React 19 web app with a cinematic marketing landing page (GSAP scroll animations, Lenis smooth scroll) and a modern AI chat consultant. The agent uses a structured knowledge base covering US, UK, Canada, Schengen, and more, with document checklists and official source links. Impact: Turned a complex consultancy idea into a polished, user-friendly MVP ready for real users.',
    role: 'Full-Stack Developer & UI Designer',
    year: '2024',
    stack: ['React', 'JavaScript', 'Web Design', 'AI Chatbot', 'AI Agent Development'],
    outcomes: [
      'Cinematic marketing landing with GSAP + Lenis',
      'AI chat consultant with structured visa knowledge base',
      'Document checklists and official source links for US, UK, Canada, Schengen+',
    ],
    video:
      'https://res.cloudinary.com/euquvsnk/video/upload/v1791541672/BerryHelp.mp4',
    accent: '#000000',
  },
  {
    slug: 'scopeshield',
    title: 'ScopeShield',
    tagline: 'AI SaaS for Freelancer Scope Creep Detection',
    problem: 'Catch scope creep before it becomes unpaid work',
    description:
      'Designed, built, and shipped a complete SaaS MVP that helps freelancers catch scope creep before unpaid work. Users set a scope baseline, paste client messages from email/Slack/Upwork, and get AI risk scores, severity flags, and change-order drafts. Built with Next.js 15, TypeScript, Tailwind CSS 4, Framer Motion, GSAP, Prisma, REST API, PostgreSQL, and optional GPT-4o-mini. Includes landing page, JWT auth, project dashboard, AI engine with demo mode, pricing tiers, and end-to-end workflow.',
    role: 'Full-Stack Developer & Product Designer',
    year: '2024',
    stack: ['TypeScript', 'REST API', 'PostgreSQL', 'Full-Stack Development', 'SaaS Development'],
    outcomes: [
      'Landing, JWT auth, dashboard, and AI engine with demo mode',
      'Risk scores, severity flags, and change-order drafts',
      'Portfolio-ready MVP with pricing tiers and full workflow',
    ],
    video:
      'https://res.cloudinary.com/euquvsnk/video/upload/v1791541662/ScopeSheild2.mp4',
    accent: '#000000',
  },
  {
    slug: 'teachtrack',
    title: 'TeachTrack',
    tagline: 'EdTech SaaS for Teachers',
    problem: 'Teachers losing hours to admin across disconnected tools',
    description:
      'Teachers lose hours to admin across disconnected tools and spreadsheets. TeachTrack is an AI-assisted EdTech platform that unifies class management, attendance, quizzes, homework, and grading into one teacher-first workspace. Built a React/Vite web app, React Native mobile app, and marketing site — with one-tap attendance, quiz builder with share links, grade reports, and AI lesson planning so teachers plan faster and spend more time teaching.',
    role: 'Full-stack developer — React web, React Native mobile, UI/UX & product',
    year: '2024',
    stack: ['React', 'React Native', 'Web Development', 'Mobile App Development', 'SaaS Development'],
    outcomes: [
      'Unified web + React Native teacher workspace',
      'One-tap attendance, quiz builder, and grade reports',
      'AI-assisted lesson planning in the product flow',
    ],
    video:
      'https://res.cloudinary.com/euquvsnk/video/upload/v1791541648/teach-track.mp4',
    accent: '#000000',
  },
  {
    slug: 'coffee-crew-berry',
    title: 'Coffee Crew Berry',
    tagline: 'Custom Headless E-Commerce Engine on Shopify',
    problem: 'A premium coffee brand stuck on template Shopify themes',
    description:
      'Architected and shipped a production-grade headless commerce platform for a premium coffee brand, replacing template-driven Shopify themes with a custom Next.js 14 frontend. Designed the full data layer on Shopify Storefront GraphQL. Built a performant App Router architecture with React Server Components, optimistic cart updates via Zustand, and a mock-data dev environment for zero-config local builds. Delivered a motion-rich, accessible UI (GSAP ScrollTrigger, Lenis, reduced-motion support) on a Tailwind CSS 4 design system — optimized for conversion and Core Web Vitals.',
    role: 'Full-Stack Frontend Engineer — headless commerce, GraphQL, checkout flows',
    year: '2024',
    stack: ['Next.js', 'Shopify', 'GraphQL', 'TypeScript', 'GSAP'],
    outcomes: [
      'Headless Next.js 14 storefront on Shopify Storefront GraphQL',
      'Optimistic cart via Zustand + RSC App Router architecture',
      'Motion-rich UI with GSAP, Lenis, and reduced-motion support',
    ],
    video:
      'https://res.cloudinary.com/euquvsnk/video/upload/v1791541668/coffee-crew-berry.mp4',
    accent: '#000000',
  },
  {
    slug: 'luxury-jewelry',
    title: 'Luxury Jewelry E-Commerce',
    tagline: 'Cinematic Boutique Website',
    problem: 'A jewelry boutique that needed a cinematic storefront',
    description:
      'Built a luxury jewelry e-commerce site with a cinematic homepage, full shop flow, and cart/checkout. Redesigned the home page around 8 workshop films and editorial imagery—hero video, sticky chapter cards, atelier mosaic, product rail, and collections index—using CSS-only motion (no heavy scroll libraries). Implemented product catalog, PDPs, localStorage cart drawer, and responsive layouts in Next.js 15 and React 19. Removed third-party animation deps to cut bundle size and improve scroll performance.',
    role: 'Full-stack front-end developer — design, build, and UX',
    year: '2024',
    stack: ['Next.js', 'JavaScript', 'Front-End Development', 'Web Design', 'Shopify'],
    outcomes: [
      'Cinematic homepage with workshop films and editorial imagery',
      'Full shop flow: catalog, PDPs, localStorage cart drawer',
      'CSS-only motion for smaller bundles and smoother scroll',
    ],
    video:
      'https://res.cloudinary.com/euquvsnk/video/upload/v1791541630/jewellry-website.mp4',
    accent: '#000000',
  },
  {
    slug: 'cold-drink-ecommerce',
    title: 'Cold Drink E-Commerce',
    tagline: 'Full-Stack Web Development',
    problem: 'A beverage brand needing a storefront built from scratch',
    description:
      'Designed and developed a fully responsive cold drink e-commerce website from scratch. The project featured a modern UI with product listings, category filtering, and a seamless shopping experience optimized for both desktop and mobile. Built with React/Next.js on the frontend, the site focused on fast load times, clean visual design, and conversion-friendly layout. Delivered a complete, production-ready storefront with smooth animations, intuitive navigation, and a brand identity tailored to the beverage niche.',
    role: 'Full-Stack Web Developer',
    year: '2024',
    stack: ['React', 'Web Design', 'UI/UX Prototyping', 'Web Development', 'Front-End Development'],
    outcomes: [
      'Responsive storefront with listings and category filtering',
      'Fast load times and conversion-friendly layout',
      'Brand identity tailored to the beverage niche',
    ],
    video:
      'https://res.cloudinary.com/euquvsnk/video/upload/v1791541616/cola-next-video.mp4',
    accent: '#000000',
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
