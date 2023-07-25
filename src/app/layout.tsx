'use client';

import '/node_modules/normalize.css/normalize.css';
import './globals.css';

import { Shadows_Into_Light } from 'next/font/google';
import Link from 'next/link';
import Head from 'next/head';
import Search from '../components/search';

import { usePathname } from 'next/navigation';

const shadowsIntoLight = Shadows_Into_Light({ weight: '400', subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const views = [
  //   {
  //     href: '/',
  //     name: 'Home'
  //   },
  //   { 
  //     href: '/books',
  //     name: 'Books'
  //   }
  // ];

  // Don't show banner search if on the home page
  const pathname = usePathname();
  function showGlobalSearch() {
    if (pathname == '/books') {
      return (<Search route="books" />);
    }
  }

  return (
    <html lang="en">
      <Head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
        <meta name="theme-color" content="#2a3544" />
        <meta name="description" content="A search engine for banned books" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="subject" content="School book bans" />
        <meta name="rating" content="General" />
        <link rel="icon" sizes="192x192" href="/icon.png" />
        <title>School Book Bans</title>
      </Head>
      <body>
        <header>
          <Link href="/">
            <h1 className={shadowsIntoLight.className}>School Book Bans</h1>
          </Link>
          {showGlobalSearch()}
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
