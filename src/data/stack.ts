export type StackItem = {
  name: string
  category: 'backend' | 'frontend' | 'mobile' | 'ai' | 'data'
  note: string
}

export const stack: StackItem[] = [
  { name: 'FastAPI', category: 'backend', note: 'APIs that stay fast under load' },
  { name: 'Next.js', category: 'frontend', note: 'App Router, RSC, ship velocity' },
  { name: 'Supabase', category: 'data', note: 'Auth, Postgres, realtime without drama' },
  { name: 'Claude API', category: 'ai', note: 'Agents, RAG, and product copilots' },
  { name: 'React Native', category: 'mobile', note: 'One codebase, two stores' },
  { name: 'Flutter', category: 'mobile', note: 'When native feel is non-negotiable' },
]
