import '/node_modules/normalize.css/normalize.css';
import './globals.css';

import Link from 'next/link';
import Search from '../components/search';
import Navigation from '../components/navigation';

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

  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">
            <h1>Banned Books</h1>
          </Link>
          <Search route="books" />
        </header>
        <Navigation navLinks={views} />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
