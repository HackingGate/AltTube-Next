import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/app/components/NavBar'
import { ContextProvider } from '@/app/components/ContextProvider'
import AuthButton from '@/app/components/AuthButton'
import { Suspense } from 'react'
import UserTokenProvider from '@/app/components/UserTokenProvider'

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
          <Suspense fallback={<div>Loading...</div>}>
            <NavBar />
          </Suspense>
          <UserTokenProvider>
            <AuthButton />
            {children}
          </UserTokenProvider>
        </ContextProvider>
      </body>
    </html>
  )
}
