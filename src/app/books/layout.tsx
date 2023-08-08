import type { Metadata } from 'next';

export function generateMetadata(
  {}: {},
): Metadata {
  return {
    title: `Search | School Book Bans`
  }
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
