import type { Metadata } from 'next'
import { ThemeProvider } from '@/hooks/useTheme'
import { themeInitScript } from '@/lib/theme'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { InteractiveLayer } from '@/components/interactive/InteractiveLayer'
import { profile } from '@/data/profile'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  metadataBase: new URL('https://wasiq.dev'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-bg text-fg antialiased">
        <ThemeProvider>
          <div className="flex min-h-dvh flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <InteractiveLayer />
        </ThemeProvider>
      </body>
    </html>
  )
}
