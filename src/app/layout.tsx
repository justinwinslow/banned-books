'use client';

import '/node_modules/normalize.css/normalize.css';
import './globals.css';

import { Arvo, Shadows_Into_Light } from 'next/font/google';
import Link from 'next/link';
import Search from '../components/search';
import Navigation from '../components/navigation';

import { usePathname } from 'next/navigation';

const arvo = Arvo({ weight: '400', subsets: ['latin'] });
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
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
        <meta name="theme-color" content="#2a3544" />
        <meta name="description" content="A search engine for banned books" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="subject" content="School book bans" />
        <meta name="rating" content="General" />
        <title>School Book Bans</title>
      </head>
      <body>
        <header>
          <Link href="/">
            <h1 className={shadowsIntoLight.className}>School Book Bans</h1>
          </Link>
          {showGlobalSearch()}
        </header>
        {/*<Navigation navLinks={views} />*/}
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
