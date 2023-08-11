import '/node_modules/normalize.css/normalize.css';
import './globals.css';

import { Shadows_Into_Light } from 'next/font/google';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
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
  children
}: {
  children: React.ReactNode
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-JSWH99V87Q" />
        <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JSWH99V87Q');
          `}
        </Script>
      </body>
    </html>
  )
}
