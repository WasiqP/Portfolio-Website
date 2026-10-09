import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject, projects } from '@/data/projects'
import { profile } from '@/data/profile'

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

  const index = projects.findIndex((p) => p.slug === project.slug)
  const prev = index > 0 ? projects[index - 1] : projects[projects.length - 1]
  const next =
    index < projects.length - 1 ? projects[index + 1] : projects[0]

  return (
    <article className="bg-bg pb-[var(--section-y)]">
      {/* Persistent back bar */}
      <div className="sticky top-[var(--nav-h)] z-40 border-b border-border bg-bg/95 backdrop-blur-md">
        <div className="page-pad flex h-14 items-center justify-between gap-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-fg transition-colors hover:bg-bg-inverse hover:text-fg-inverse"
          >
            <span aria-hidden>←</span>
            Back to work
          </Link>
          <p className="hidden type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-subtle sm:block">
            {project.title}
          </p>
          <Link
            href="/"
            className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-muted transition-colors hover:text-fg"
          >
            Home
          </Link>
        </div>
      </div>

      {/* Cinema hero */}
      <header className="page-pad pt-4 md:pt-6">
        <div className="overflow-hidden rounded-[var(--radius-shell)] bg-bg-inverse text-fg-inverse">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-8">
            <p className="type-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/45">
              Case study
            </p>
            <p className="type-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/45">
              Case {String(index + 1).padStart(2, '0')} /{' '}
              {String(projects.length).padStart(2, '0')}
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-between gap-10 p-6 sm:p-8 md:p-12 lg:p-14">
              <div>
                <p className="type-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">
                  {project.role}
                </p>
                <h1 className="type-display mt-4 text-[clamp(2.15rem,8vw,5rem)] !leading-[1.05]">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-xl text-lg text-white/70 sm:text-xl">
                  {project.tagline}
                </p>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-6">
                <dl className="flex flex-wrap gap-8">
                  <div>
                    <dt className="type-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/40">
                      Year
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-white/85">
                      {project.year}
                    </dd>
                  </div>
                  <div>
                    <dt className="type-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/40">
                      Focus
                    </dt>
                    <dd className="mt-1 max-w-[14rem] text-sm font-medium text-white/85">
                      {project.stack.slice(0, 2).join(' · ')}
                    </dd>
                  </div>
                </dl>
                <a
                  href={profile.links.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-accent-fg transition-opacity hover:opacity-90"
                >
                  Hire on Upwork
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>

            <div
              className="relative min-h-[16rem] border-t border-white/10 lg:min-h-[28rem] lg:border-l lg:border-t-0"
              style={{ background: project.accent }}
            >
              {project.video ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={project.video}
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="metadata"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center type-mono text-xs uppercase tracking-[0.14em] text-white/50">
                  Preview coming soon
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Stack strip */}
      <div className="page-pad mt-6">
        <div className="flex flex-wrap items-center gap-2 rounded-[var(--radius-shell)] border border-border bg-bg-soft px-5 py-4 sm:px-6">
          <span className="type-mono mr-2 text-[0.65rem] uppercase tracking-[0.14em] text-fg-subtle">
            Stack
          </span>
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-bg px-3 py-1.5 type-mono text-[0.65rem] text-fg-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Narrative */}
      <div className="page-pad mt-14 md:mt-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
          <section>
            <p className="type-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
              Overview
            </p>
            <h2 className="type-display mt-3 max-w-2xl text-[clamp(1.85rem,4vw,3rem)]">
              What was built
              <span className="text-accent">.</span>
            </h2>
            <p className="type-body mt-8 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
              {project.description}
            </p>
          </section>

          <section className="lg:pt-12">
            <p className="type-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
              Outcomes
            </p>
            <ul className="mt-6 space-y-0 border-t border-border">
              {project.outcomes.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-4 border-b border-border py-5"
                >
                  <span className="type-mono shrink-0 text-[0.65rem] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base leading-snug text-fg sm:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* CTA band */}
      <div className="page-pad mt-16 md:mt-24">
        <div className="overflow-hidden rounded-[var(--radius-shell)] bg-accent px-6 py-12 text-accent-fg sm:px-10 sm:py-16 md:px-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="type-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent-fg/70">
                Next step
              </p>
              <h2 className="type-display mt-3 text-[clamp(2rem,5vw,3.75rem)] !leading-[1.08]">
                Want something
                <br />
                in this lane?
              </h2>
              <p className="mt-4 max-w-md text-base text-accent-fg/80">
                Tell {profile.name} about your product — SaaS, AI, mobile, or
                ecommerce. Same builder energy as {project.title}.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
              <a
                href={profile.links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-bg-inverse px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-fg-inverse transition-opacity hover:opacity-90 sm:w-auto sm:px-7"
              >
                Hire on Upwork
                <span aria-hidden>↗</span>
              </a>
              <Link
                href="/#work"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent-fg/35 px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-accent-fg transition-colors hover:bg-accent-fg/10 sm:w-auto sm:px-7"
              >
                Back to work
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Adjacent cases */}
      <div className="page-pad mt-10 md:mt-14">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="type-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
            Continue browsing
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <Link
            href={`/projects/${prev.slug}`}
            className="group overflow-hidden rounded-[var(--radius-shell)] border border-border bg-bg-soft p-6 transition-colors hover:border-border-strong sm:p-8"
          >
            <p className="type-mono text-[0.6rem] uppercase tracking-[0.14em] text-fg-subtle">
              Previous
            </p>
            <p className="type-heading mt-3 text-2xl transition-colors group-hover:text-accent sm:text-3xl">
              {prev.title}
            </p>
            <p className="mt-2 text-sm text-fg-muted">{prev.tagline}</p>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group overflow-hidden rounded-[var(--radius-shell)] border border-border bg-bg-soft p-6 transition-colors hover:border-border-strong sm:p-8"
          >
            <p className="type-mono text-[0.6rem] uppercase tracking-[0.14em] text-fg-subtle">
              Next
            </p>
            <p className="type-heading mt-3 text-2xl transition-colors group-hover:text-accent sm:text-3xl">
              {next.title}
            </p>
            <p className="mt-2 text-sm text-fg-muted">{next.tagline}</p>
          </Link>
        </div>
      </div>
    </article>
  )
}
