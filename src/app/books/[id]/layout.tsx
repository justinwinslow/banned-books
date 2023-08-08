import type { Metadata } from 'next';
import { kebabCase } from 'lodash';
import fixName from '../../../util/fix-name';

import books from '../../../store/books';

interface Book {
  Author: string,
  Title: string
}

export function generateMetadata(
  { params }: {params: { id: string }},
): Metadata {
  const book: Book = (books.find((b) => kebabCase(`${b.Title}-${b.Author}`) == params.id) || {Author: '', Title: ''});
  return {
    title: `${book.Title} by ${fixName(book.Author)} | School Book Bans`
  }
}

export default function DetailLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { id: string }
}) {
  return (
    <>{children}</>
  );
}
