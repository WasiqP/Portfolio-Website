import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Stack } from '@/components/sections/Stack'
import { Services } from '@/components/sections/Services'
import CinematicChain from '@/components/cinematic/CinematicChain'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Sticky hero — mobile peeks About/video below; sheet rises on scroll */}
      <div className="relative z-0 sticky top-[var(--nav-h)]">
        <Hero />
      </div>

      <div className="hero-rise relative z-10 rounded-t-[var(--radius-shell)] border-t border-accent/35 bg-bg shadow-[var(--overlay-shadow)]">
        <div aria-hidden className="flex w-full justify-center pt-3 sm:pt-5">
          <span className="h-1.5 w-12 rounded-full bg-accent" />
        </div>
        <About />
        <div className="bg-bg">
          <Stack />
          <Services />
        </div>
      </div>

      {/* Company-style cinematic chain (Domain → Work → Full Services → Process → FAQ) */}
      <CinematicChain />

      <div className="relative z-20 bg-bg">
        <Contact />
      </div>
    </div>
  )
}
