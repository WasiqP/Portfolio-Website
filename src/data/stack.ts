export type StackItem = {
  name: string
  category: 'framework' | 'library' | 'tool' | 'language' | 'platform'
  note: string
}

/** Industry-standard shortlist — frameworks, libraries, languages, platforms, tools */
export const stack: StackItem[] = [
  // Frameworks
  { name: 'React', category: 'framework', note: 'Composable UIs that stay fast' },
  { name: 'Next.js', category: 'framework', note: 'App Router, RSC, ship velocity' },
  { name: 'React Native', category: 'framework', note: 'One codebase, two stores' },
  { name: 'FastAPI', category: 'framework', note: 'APIs that stay fast under load' },
  // Languages
  { name: 'TypeScript', category: 'language', note: 'Fewer surprises as products grow' },
  { name: 'Python', category: 'language', note: 'Services, automation, and AI glue' },
  { name: 'JavaScript', category: 'language', note: 'The runtime behind every ship' },
  // Libraries
  { name: 'Tailwind CSS', category: 'library', note: 'Design systems without the drag' },
  { name: 'Prisma', category: 'library', note: 'Typed data layer for SaaS' },
  { name: 'Framer Motion', category: 'library', note: 'UI motion with intent' },
  { name: 'GSAP', category: 'library', note: 'Scroll stories that feel cinematic' },
  { name: 'Zustand', category: 'library', note: 'Client state without ceremony' },
  // Platforms / data
  { name: 'PostgreSQL', category: 'platform', note: 'Relational backbone for SaaS' },
  { name: 'Firebase', category: 'platform', note: 'Auth and realtime when speed matters' },
  { name: 'Shopify', category: 'platform', note: 'Headless storefronts that convert' },
  { name: 'OpenAI', category: 'platform', note: 'Chat, agents, and product copilots' },
  // Tools
  { name: 'Vite', category: 'tool', note: 'Fast builds when the app stays lean' },
  { name: 'GraphQL', category: 'tool', note: 'Precise data for headless commerce' },
  { name: 'Figma', category: 'tool', note: 'Wireframe to polish with the team' },
  { name: 'Git', category: 'tool', note: 'Clean history, clear reviews' },
]
