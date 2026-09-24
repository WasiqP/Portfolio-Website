export type Project = {
  slug: string
  title: string
  tagline: string
  description: string
  role: string
  year: string
  stack: string[]
  outcomes: string[]
  links?: {
    live?: string
    case?: string
  }
  /** Optional local preview path under /videos — compress before shipping */
  video?: string
  accent: string
}

export const projects: Project[] = [
  {
    slug: 'adpilot',
    title: 'AdPilot',
    tagline: 'AI-powered Meta Ads co-pilot',
    description:
      'An agentic workflow that drafts, scores, and iterates Meta ad creatives so performance marketers spend less time guessing and more time shipping winners.',
    role: 'AI Engineer · Product',
    year: '2025',
    stack: ['Next.js', 'FastAPI', 'Claude API', 'Supabase'],
    outcomes: [
      'Cut creative iteration cycles from days to minutes',
      'Structured prompting pipeline for ad variants',
      'Human-in-the-loop review before publish',
    ],
    accent: '#0a0a0a',
  },
  {
    slug: 'groovytake',
    title: 'GroovyTake',
    tagline: 'AI-driven ASO platform',
    description:
      'App Store Optimization tooling that turns keyword research, competitor gaps, and listing copy into actionable ASO playbooks.',
    role: 'Full-Stack · AI',
    year: '2025',
    stack: ['Next.js', 'FastAPI', 'Claude API', 'PostgreSQL'],
    outcomes: [
      'Keyword clustering with intent scoring',
      'Listing copy generation with brand voice controls',
      'Competitor snapshot dashboards',
    ],
    accent: '#ff2e00',
  },
  {
    slug: 'project-mojo',
    title: 'Project Mojo',
    tagline: 'FP&A automation agent',
    description:
      'A finance agent that ingests spreadsheets, reconciles anomalies, and drafts narrative summaries for FP&A teams who would rather not live in Excel forever.',
    role: 'AI Engineer',
    year: '2024',
    stack: ['Python', 'FastAPI', 'Claude API', 'Supabase'],
    outcomes: [
      'Automated variance commentary drafts',
      'Anomaly flags across recurring reports',
      'Export-ready board pack narratives',
    ],
    accent: '#1a1a1a',
  },
  {
    slug: 'talentdrobe',
    title: 'TalentDrobe',
    tagline: 'Job seeker platform with AI career copilot',
    description:
      'A Next.js job platform with an AI career copilot that coaches applications, rewrites resumes, and keeps candidates moving.',
    role: 'Full-Stack Lead',
    year: '2024',
    stack: ['Next.js', 'Supabase', 'Claude API', 'Tailwind'],
    outcomes: [
      'AI resume and cover letter coaching',
      'Application tracking with smart reminders',
      'Role-fit scoring against job descriptions',
    ],
    accent: '#2a2a2a',
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
