'use client';
 
import { usePathname } from 'next/navigation';
import Link from 'next/link';
 
export default function Navigation({ navLinks }) {
  const pathname = usePathname();

  return (
    <nav>
      {navLinks.map((link) => {
        const isActive = pathname.endsWith(link.href);
 
        return (
          <Link
            className={isActive ? 'active' : ''}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        )
      })}
    </nav>
  )
}
