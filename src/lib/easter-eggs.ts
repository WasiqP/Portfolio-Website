export type EasterEgg = {
  id: string
  type: 'terminal' | 'konami' | 'mascot' | 'hover'
  title: string
  message: string
}

export const easterEggs: EasterEgg[] = [
  {
    id: 'cheatcode',
    type: 'terminal',
    title: 'cheatcode',
    message: 'Unlocked: unlimited coffee. Side effects include shipping before standup.',
  },
  {
    id: 'konami',
    type: 'konami',
    title: 'Konami',
    message: '↑↑↓↓←→←→BA — you absolute legend. Have a virtual high-five.',
  },
  {
    id: 'mascot-pet',
    type: 'mascot',
    title: 'Mascot',
    message: 'Stop poking me. I am debugging in my head.',
  },
  {
    id: 'hover-hire',
    type: 'hover',
    title: 'Hire CTA',
    message: 'Yes, I actually reply.',
  },
  {
    id: 'hover-stack',
    type: 'hover',
    title: 'Stack label',
    message: 'Yes, I have used Excel. No, I will not go back.',
  },
  {
    id: 'hover-location',
    type: 'hover',
    title: 'Location',
    message: 'Karachi timezone. Caffeine timezone.',
  },
]

export const terminalCommands: Record<
  string,
  { output: string[]; action?: 'theme-light' | 'theme-dark' | 'clear' | 'egg' }
> = {
  help: {
    output: [
      'Available commands:',
      '  help        — you are here',
      '  whoami      — identity dump',
      '  projects    — selected work',
      '  stack       — tools of the trade',
      '  contact     — how to reach me',
      '  theme light — white background',
      '  theme dark  — black / lime brand',
      '  cheatcode   — classified',
      '  clear       — wipe the screen',
      '  exit        — close terminal',
    ],
  },
  whoami: {
    output: [
      'Wasiq Patel — SaaS & AI Product Developer',
      'Karachi, Pakistan · Raviro · Available for hire',
    ],
  },
  projects: {
    output: [
      'berryhelp · scopeshield · teachtrack · coffee-crew-berry · luxury-jewelry · cold-drink-ecommerce',
      'Type: open <slug>  (or just scroll like a normal person)',
    ],
  },
  stack: {
    output: [
      'React · Next.js · TypeScript · React Native · FastAPI · Python · PostgreSQL · OpenAI',
    ],
  },
  contact: {
    output: ['email: wasiqpatel224@gmail.com', 'Also: Upwork · GitHub · LinkedIn'],
  },
  cheatcode: {
    output: [
      '*** CHEAT CODE ACCEPTED ***',
      'Unlocked: unlimited coffee. Side effects include shipping before standup.',
    ],
    action: 'egg',
  },
  clear: {
    output: [],
    action: 'clear',
  },
  exit: {
    output: ['Bye. Try not to break production.'],
  },
}
