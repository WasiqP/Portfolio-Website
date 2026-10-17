import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Stack } from '@/components/sections/Stack'
import { Services } from '@/components/sections/Services'
import CinematicChain from '@/components/cinematic/CinematicChain'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <div className="relative">
      {/*
        Sticky hero + rising sheet share a parent so the white panel
        slides over the hero. Knob floats above the sheet edge so only
        it peeks into the first viewport — no white chrome.
      */}
      <div className="hero-cover">
        <div className="hero-cover-sticky">
          <Hero />
        </div>

        <div className="hero-rise relative z-10 rounded-t-[var(--radius-shell)] border-t border-accent/35 bg-bg shadow-[var(--overlay-shadow)]">
          <div className="hero-rise-lip" aria-hidden>
            <span className="hero-rise-knob" />
          </div>
          <About />
          <div className="bg-bg">
            <Stack />
            <Services />
          </div>
        </div>
      </div>

      <CinematicChain />

      <div className="relative z-20 bg-bg">
        <Contact />
      </div>
    </div>
  )
}
