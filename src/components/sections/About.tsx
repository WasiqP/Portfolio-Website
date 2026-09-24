'use client'

import { profile } from '@/data/profile'
import { Reveal } from '@/components/ui/Reveal'
import { CoffeeCounter } from '@/components/interactive/CoffeeCounter'
import { MoodSwitcher } from '@/components/interactive/MoodSwitcher'
import { Mascot } from '@/components/interactive/Mascot'

export function About() {
  return (
    <section id="about" className="border-t border-border py-[var(--section-y)]">
      <div className="page-pad grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="type-mono mb-4 text-xs uppercase tracking-[0.16em] text-fg-subtle">
              About
            </p>
            <h2 className="type-display text-[clamp(2.5rem,7vw,4.5rem)]">
              Short version.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="type-subheading mt-8 max-w-xl text-xl text-fg sm:text-2xl">
              {profile.aboutLead}
            </p>
          </Reveal>

          <div className="mt-8 space-y-5">
            {profile.about.map((para, i) => (
              <Reveal key={para} delay={0.1 + i * 0.05}>
                <p className="type-body max-w-xl text-base text-fg-muted sm:text-lg">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-wrap gap-8 border-t border-border pt-8">
              <div>
                <p className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-subtle">
                  Currently
                </p>
                <p className="type-subheading mt-2 text-base">
                  {profile.current.title}
                </p>
                <p className="type-description text-sm">
                  {profile.current.company}
                </p>
              </div>
              <div>
                <p className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-subtle">
                  Agency
                </p>
                <p className="type-subheading mt-2 text-base">
                  {profile.agency.name}
                </p>
                <p className="type-description text-sm">{profile.agency.blurb}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          <Reveal delay={0.1}>
            <div className="flex justify-center rounded-[var(--radius-shell)] bg-bg-soft p-6 sm:p-8">
              <Mascot className="max-w-[16rem]" />
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <CoffeeCounter />
          </Reveal>
          <Reveal delay={0.18}>
            <MoodSwitcher />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
