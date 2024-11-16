import { Metadata } from 'next'

import ReduxProvider from '@/components/common/ReduxProvider'

import './globals.css'

export const metadata: Metadata = {
  title: 'Survey App',
  description: 'A dynamic survey application',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
