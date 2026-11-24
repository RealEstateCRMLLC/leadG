import type { Metadata } from 'next'
import { Syne, DM_Mono } from 'next/font/google'
import './globals.css'
import { SessionProvider } from './SessionProvider'

// Self-hosted via next/font: the previous runtime <link> to
// fonts.googleapis.com took ~11s to load in the browser, and a
// pending stylesheet blocks every script on the page — LeadG looked
// dead and its forms submitted natively (no React handlers) until
// the font CSS finally arrived. next/font downloads at build time
// and serves the fonts from our own origin.
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
})
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
})

export const metadata: Metadata = {
  title: 'VoiceForge AI — Autonomous Sales Agent Platform',
  description: 'AI-powered voice agents for lead generation, qualification, and sales automation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable}`}>
      <body><SessionProvider>{children}</SessionProvider></body>
    </html>
  )
}
