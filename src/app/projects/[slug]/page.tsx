import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject, projects } from '@/data/projects'
import { Button } from '@/components/ui/Button'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Project' }
  return {
    title: project.title,
    description: project.tagline,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <article className="pb-[var(--section-y)]">
      <div className="page-pad pt-4">
        <div
          className="overflow-hidden rounded-[var(--radius-shell)]"
          style={{ background: project.accent }}
        >
          <div className="px-6 py-14 sm:px-10 sm:py-20 md:px-14">
            <Link
              href="/#work"
              className="type-mono text-xs text-white/75 transition-opacity hover:text-white"
            >
              ← Back to work
            </Link>
            <h1 className="type-display mt-8 text-[clamp(2.75rem,8vw,5.5rem)] text-white">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              {project.tagline}
            </p>
            <p className="type-mono mt-8 text-xs uppercase tracking-[0.12em] text-white/65">
              {project.role} · {project.year}
            </p>
          </div>
        </div>
      </div>

      <div className="page-pad mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="space-y-8">
          <section>
            <h2 className="type-mono mb-4 text-xs uppercase tracking-[0.14em] text-fg-subtle">
              Overview
            </h2>
            <p className="type-body max-w-2xl text-lg text-fg-muted">
              {project.description}
            </p>
          </section>
          <section>
            <h2 className="type-mono mb-4 text-xs uppercase tracking-[0.14em] text-fg-subtle">
              Outcomes
            </h2>
            <ul className="space-y-3">
              {project.outcomes.map((item) => (
                <li key={item} className="flex gap-3 type-body text-fg">
                  <span className="text-accent">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="h-fit rounded-[var(--radius-shell)] border border-border bg-bg-soft p-6">
          <h2 className="type-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">
            Stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-[var(--radius-pill)] border border-border bg-bg px-3 py-1 type-mono text-[0.7rem] text-fg-muted"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <Button href="/#contact">Discuss a similar build</Button>
            <Button href="/#work" variant="secondary">
              More projects
            </Button>
          </div>
        </aside>
      </div>
    </article>
  )
}
