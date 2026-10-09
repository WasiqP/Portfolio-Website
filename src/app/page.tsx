import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Stack } from '@/components/sections/Stack'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Sticky cover only on large screens — mobile/tablet scroll normally */}
      <div className="relative z-0 lg:sticky lg:top-[var(--nav-h)]">
        <Hero />
      </div>

      <div className="relative z-10 rounded-t-[var(--radius-shell)] border-t border-accent/35 bg-bg shadow-[var(--overlay-shadow)]">
        <div aria-hidden className="flex w-full justify-center pt-3 sm:pt-5">
          <span className="h-1.5 w-12 rounded-full bg-accent" />
        </div>
        <About />
        <div className="bg-bg">
          <Stack />
          <Services />
          <Projects />
          <Contact />
        </div>
      </div>
    </div>
  )
}
