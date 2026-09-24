'use client'

import { useState } from 'react'
import Link from 'next/link'
import { projects, type Project } from '@/data/projects'
import { Reveal } from '@/components/ui/Reveal'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

function WorkRow({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  return (
    <article className="group border-t border-border last:border-b">
      <button
        type="button"
        onClick={onOpen}
        className="grid w-full grid-cols-1 gap-6 py-8 text-left md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center md:gap-10 md:py-10"
      >
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-[calc(var(--radius-shell)-0.35rem)]"
          style={{ background: project.accent }}
        >
          <div className="absolute inset-0 flex items-end justify-between p-5 sm:p-6">
            <span className="type-mono text-xs text-white/75">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="type-mono text-xs text-white/75">{project.year}</span>
          </div>
          <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100">
            <span className="rounded-[var(--radius-pill)] bg-fg-inverse px-5 py-2.5 type-mono text-[0.65rem] uppercase tracking-[0.14em] text-bg-inverse">
              Open case
            </span>
          </div>
        </div>

        <div className="px-1 md:pr-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="type-heading text-3xl sm:text-4xl md:text-5xl">
              {project.title}
            </h3>
            <span className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-subtle">
              {project.role}
            </span>
          </div>
          <p className="type-description mt-4 max-w-md text-base">
            {project.tagline}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-[var(--radius-pill)] border border-border px-3 py-1 type-mono text-[0.65rem] text-fg-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </button>
    </article>
  )
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="work" className="py-[var(--section-y)]">
      <div className="page-pad">
        <Reveal>
          <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
            <h2 className="type-display max-w-3xl text-[clamp(2.75rem,8vw,5.5rem)]">
              Selected
              <br />
              Work.
            </h2>
            <p className="type-description max-w-sm text-base md:pb-2">
              Four products. Real constraints. Ask for the full walkthrough — I
              demo faster than I write case studies.
            </p>
          </div>
        </Reveal>

        <div>
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <WorkRow
                project={project}
                index={i}
                onOpen={() => setActive(project)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title}
      >
        {active && (
          <div className="space-y-6">
            <div
              className="aspect-[16/9] w-full rounded-[calc(var(--radius-shell)-0.5rem)]"
              style={{ background: active.accent }}
            />
            <p className="type-subheading text-xl">{active.tagline}</p>
            <p className="type-body text-fg-muted">{active.description}</p>
            <ul className="space-y-2">
              {active.outcomes.map((item) => (
                <li key={item} className="type-body flex gap-3 text-sm">
                  <span className="text-accent">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button href={`/projects/${active.slug}`}>Full case study</Button>
              <Button variant="secondary" onClick={() => setActive(null)}>
                Close
              </Button>
              <Link
                href={`/projects/${active.slug}`}
                className="sr-only"
              >
                Case study
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
