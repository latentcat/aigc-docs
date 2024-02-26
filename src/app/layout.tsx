import glob from 'fast-glob'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import {type Metadata, Viewport} from 'next'
import { type Section } from '@/components/SectionProvider'

import { Inter } from 'next/font/google'
import {cx} from "class-variance-authority";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s - AIGC All in One',
    default: 'AIGC All in One',
  },
}

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  height: 'device-height',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
    <head>
      <link rel="manifest" href="/manifest.json"/>
      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <meta content="yes" name="apple-mobile-web-app-capable"/>
      <meta name="theme-color" content="#000000"/>
    </head>
    <body className={cx(
      "flex min-h-full bg-background antialiased",
      inter.className
    )}>
    <Providers>
      <div className="w-full">
        <Layout allSections={allSections}>{children}</Layout>
      </div>
    </Providers>
    </body>
    </html>
  )
}
