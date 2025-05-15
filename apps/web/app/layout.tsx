import type { Metadata } from 'next'
// import localFont from 'next/font/local'
import { Toaster } from 'react-hot-toast'
import '@shortify/ui/globals.css'


export const metadata: Metadata = {
  title: 'Shortify',
  description: 'Shorten your url',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        {children}
        <Toaster
          position='bottom-right'
          reverseOrder={false}
        />
      </body>
    </html>
  )
}
