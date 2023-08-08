import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `About | School Book Bans`
}

export default function SearchLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  );
}
