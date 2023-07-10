import '@styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Assistant',
  description: 'App Next with AI assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </head>
      <body className={inter.className}>{children}
      <footer className='flex items-center justify-center py-16'>
                <p>Made with ❤️ by <a href="http://kevinocampo.vercel.app" target='_blank' className='text-purple-600'>Kev</a></p>
      </footer></body>
    
    </html>
  )
}
