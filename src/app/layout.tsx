import '/node_modules/normalize.css/normalize.css';
import './globals.css';

import Link from 'next/link';
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
      href: '/search',
      name: 'Search'
    }
  ];

  return (
    <html lang="en">
      <body>
        <header>
          <h1>Banned Books</h1>
        </header>
        <Navigation navLinks={views} />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
