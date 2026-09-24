import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Services } from '@/components/sections/Services'
import { Stack } from '@/components/sections/Stack'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <Stack />
      <About />
      <Contact />
    </>
  )
}
