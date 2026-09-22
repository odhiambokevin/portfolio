import type { Metadata, Viewport } from 'next'
import { Toaster } from "sonner"
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'kevin',
  description: 'data enginer building pipelines, reliable data systems, geospatial products, and digital infrastructure.',
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest", 
}

export const viewport: Viewport = { colorScheme: 'light dark', themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f2f0eb' }, { media: '(prefers-color-scheme: dark)', color: '#121413' }] }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
          <Header />
            {children}
          <Toaster position="bottom-right" richColors />
          <Footer />
      </body>
    </html>)
}
