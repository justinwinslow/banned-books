import '/node_modules/normalize.css/normalize.css';
import './globals.css';

import { Shadows_Into_Light } from 'next/font/google';
import Link from 'next/link';
import Head from 'next/head';
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'School Book Bans',
  description: 'A search engine for banned books in US schools',
  icons: {
    icon: {
      url: '/icon.png',
      type: 'image/png',
    }
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
}

const shadowsIntoLight = Shadows_Into_Light({ weight: '400', subsets: ['latin'] });

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: {
    page: string,
    id: string
  }
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">
            <h1 className={shadowsIntoLight.className}>School Book Bans</h1>
          </Link>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
