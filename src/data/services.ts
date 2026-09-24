export type Service = {
  id: string
  title: string
  description: string
  bullets: string[]
}

export const services: Service[] = [
  {
    id: 'ai',
    title: 'AI / LLM products',
    description:
      'RAG systems, agents, and copilots that actually ship — not slideware.',
    bullets: [
      'RAG pipelines & retrieval quality',
      'Tool-using agents with guardrails',
      'Claude / OpenAI product integrations',
    ],
  },
  {
    id: 'saas',
    title: 'SaaS & MVP builds',
    description:
      'From napkin sketch to paying users. FastAPI backends, Next.js fronts, Supabase glue.',
    bullets: [
      'Auth, billing, and multi-tenant foundations',
      'Admin dashboards that do not suck',
      'Ship-ready MVPs in weeks, not quarters',
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile apps',
    description:
      'React Native and Flutter apps with clean architecture and store-ready polish.',
    bullets: [
      'Cross-platform React Native / Flutter',
      'Offline-first patterns when it matters',
      'App Store & Play release pipelines',
    ],
  },
]
