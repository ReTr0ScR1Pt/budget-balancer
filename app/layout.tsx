import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Budget Balancer',
  description: 'Monthly Budget Tracking Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

