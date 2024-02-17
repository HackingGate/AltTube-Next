import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/app/components/NavBar'
import { ContextProvider } from '@/app/components/ContextProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AltTube by HackingGate',
  description: 'A YouTube alternative by HackingGate',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <div>
            <NavBar />
            {children}
          </div>
        </ContextProvider>
      </body>
    </html>
  )
}
