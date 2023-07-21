'use client';

import '/node_modules/normalize.css/normalize.css';
import './globals.css';

import Link from 'next/link';
import Search from '../components/search';
import Navigation from '../components/navigation';

import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const views = [
    {
      href: '/',
      name: 'Home'
    },
    { 
      href: '/books',
      name: 'Books'
    }
  ];

  const pathname = usePathname();
  // Don't show banner search if on the home page
  function showGlobalSearch() {
    if (pathname != '/') {
      return (<Search route="books" />);
    }
  }

  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">
            <h1>Banned Books</h1>
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
